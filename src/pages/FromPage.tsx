import React, { useState } from "react";
import { Button, Steps } from "antd";
import { FirstStep } from "../components/FirstStep";
import { SecondStep } from "../components/SecondStep";
import { useStepForm } from "../store/FormContext";

const steps = [
  {
    title: "Основная информация",
    content: <FirstStep />,
  },
  {
    title: "Информация об категории",
    content: <SecondStep />,
  },
];

const FormPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { isSecondStepDisabled } = useStepForm();

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
      <div style={{ margin: "24px 0" }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} disabled={isSecondStepDisabled}>
            Далее
          </Button>
        )}
        {current > 0 && <Button onClick={prev}>На прошлый этап</Button>}
      </div>
      <div>{steps[current].content}</div>
    </div>
  );
};

export default FormPage;
