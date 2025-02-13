import React, { useState } from "react";
import { Button, notification, Result, Steps } from "antd";
import { FormFirstStep } from "../components/FormFirstStep";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../store/formSlice";
import { FormSecondStep } from "../components/FormSecondStep";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createItem, updateItem } from "../api/items";
import { RootState } from "../store/store";

const steps = [
  {
    title: "Основная информация",
  },
  {
    title: "Информация об категории",
  },
];

const FormPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = params.get("id");

  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const formSteps = useSelector((state: RootState) => state.formReducer);

  const onFinish = async () => {
    const item = Object.values(formSteps).reduce((acc, value) => {
      return { ...acc, ...value };
    }, {});

    try {
      setLoading(true);
      if (id) {
        await updateItem(id, item);
      } else {
        await createItem(item);
      }

      api.success({
        message: "Обьявление успешно создано",
        duration: 0,
      });
    } catch (error) {
      api.error({
        message: "Ошибка создания обьявления:",
        description: String(error),
        duration: 0,
      });
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Steps current={current} items={items} />
      <br />
      {current === 0 && (
        <FormFirstStep
          onSubmit={(data) => {
            dispatch(setFormStep({ step: 1, value: data }));
            next();
          }}
        />
      )}
      {current === 1 && (
        <FormSecondStep
          onSubmit={(data) => {
            dispatch(setFormStep({ step: 2, value: data }));
            next();
          }}
        />
      )}
      {current === 2 && (
        <Result
          status="success"
          title="Подтвердите создание обьявления"
          extra={[
            <Button loading={loading} onClick={onFinish}>
              Завершить
            </Button>,
            <Button onClick={() => navigate("/")}>Отменить</Button>,
          ]}
        />
      )}
    </div>
  );
};

export default FormPage;
