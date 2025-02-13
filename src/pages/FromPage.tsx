import React, { useState } from "react";
import { Button, notification, Result, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormFirstStep } from "../components/FormFirstStep";
import { FormSecondStep } from "../components/FormSecondStep";
import { setFormStep } from "../store/formSlice";
import { createItem, updateItem } from "../api/items";
import { RootState } from "../store/store";

const steps = ["Основная информация", "Информация об категории", "Подтверждение"];

const FormPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = params.get("id");
  
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const formSteps = useSelector((state: RootState) => state.formReducer);

  const handleSubmit = async () => {
    const item = Object.assign({}, ...Object.values(formSteps));

    try {
      setLoading(true);
      if (id) {
        await updateItem(id, item);
      } else {
        await createItem(item);
      }
      api.success({ message: "Объявление успешно создано", duration: 0 });
    } catch (error) {
      api.error({ message: "Ошибка создания объявления", description: String(error), duration: 0 });
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const handleNext = (data: Record<string, unknown>) => {
    dispatch(setFormStep({ step: current + 1, value: data }));
    setCurrent((prev) => prev + 1);
  };

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Steps current={current} items={steps.map((title) => ({ key: title, title }))} />
      <br />
      {current === 0 && <FormFirstStep onSubmit={handleNext} />}
      {current === 1 && <FormSecondStep onSubmit={handleNext} />}
      {current === 2 && (
        <Result
          status="success"
          title="Подтвердите создание объявления"
          extra={[
            <Button key="submit" loading={loading} onClick={handleSubmit}>Завершить</Button>,
            <Button key="cancel" onClick={() => navigate("/")}>Отменить</Button>
          ]}
        />
      )}
    </div>
  );
};

export default FormPage;
