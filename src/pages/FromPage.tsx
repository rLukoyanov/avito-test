import React, { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import { useSearchParams } from "react-router-dom";
import { fetchItemById } from "../api/items";
import { FormFirstStep } from "../components/FormFirstStep";
import { setFirstStep } from "../store/formSlice";
import { Advertisement } from "../types/api";
import { useDispatch } from "react-redux";

const steps = [
  {
    title: "Основная информация",
  },
  {
    title: "Информация об категории",
  },
];

const FormPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const registerField = (
    name: keyof Advertisement,
    type: "text" | "select" = "text"
  ) => ({
    onChange: (value: string | React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        type === "select"
          ? (value as string)
          : (value as React.ChangeEvent<HTMLInputElement>).target.value;
      dispatch(setFirstStep({ fieldName: name, value: newValue }));
    },
  });

  useEffect(() => {
    (async () => {
      const id = params.get("id");

      if (id) {
        const data = await fetchItemById(id);
        console.log(data);
      }
    })();
  }, [params]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ padding: 24 }}>
      <Steps current={current} items={items} />
      {current === 0 && <FormFirstStep register={registerField} />}
      {current === 1 && <FormFirstStep register={registerField} />}
      {current === 0 && <Button onClick={next}>Дальше</Button>}
      {current === 1 && <Button onClick={prev}>На прошлый этап</Button>}
    </div>
  );
};

export default FormPage;
