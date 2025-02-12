import React, { useState } from "react";
import { Button, Steps } from "antd";
import { FormFirstStep } from "../components/FormFirstStep";
import { useDispatch } from "react-redux";
import { setFormStep } from "../store/formSlice";

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
  const dispatch = useDispatch();

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
      {current === 0 && (
        <FormFirstStep
          onSubmit={(data) => {
            dispatch(setFormStep({ step: 1, value: data }));
            next()
          }}
        />
      )}
      {/* {current === 1 && <FormFirstStep />} */}
      {current === 0 && <Button onClick={next}>Дальше</Button>}
      {current === 1 && <Button onClick={prev}>На прошлый этап</Button>}
    </div>
  );
};

export default FormPage;
