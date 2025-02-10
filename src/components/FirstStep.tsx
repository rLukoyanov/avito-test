import { Form, Input } from "antd";
import { CategorySelect } from "./CategoriesSelect";
import { AllFieldsOfAdvertisements, Categories } from "../types/api";
import { FormActions, useStepForm } from "../store/FormContext";

export const FirstStep = () => {
  const { dispatch, state } = useStepForm();
  console.log(state)

  const handleChange = (
    value: Categories | string,
    fieldName: AllFieldsOfAdvertisements
  ) => {
    dispatch({
      type: FormActions.updateField,
      newValue: value,
      fieldName,
    });
  };

  return (
    <Form
      layout="vertical"
    >
      {/* Название */}
      <Form.Item
        name="name"
        label="Название"
        rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
      >
        <Input defaultValue={state.name} placeholder="Введите название объявления" onChange={(e) => handleChange(e.target.value, 'name')} />
      </Form.Item>

      {/* Описание */}
      <Form.Item
        name="description"
        label="Описание"
        rules={[{ required: true, message: "Пожалуйста, введите описание!" }]}
      >
        <Input.TextArea defaultValue={state.description} placeholder="Введите описание" rows={4} onChange={(e) => handleChange(e.target.value, 'description')} />
      </Form.Item>

      {/* Локация */}
      <Form.Item
        name="location"
        label="Локация"
        rules={[{ required: true, message: "Пожалуйста, укажите локацию!" }]}
      >
        <Input placeholder="Введите локацию" defaultValue={state.location} onChange={(e) => handleChange(e.target.value, 'location')} />
      </Form.Item>

      {/* Фото */}
      <Form.Item name="photo" label="Фото">
        <Input placeholder="URL фото (необязательно)" defaultValue={state.photo} onChange={(e) => handleChange(e.target.value, 'photo')}/>
      </Form.Item>

      {/* Категория */}
      <Form.Item
        name="type"
        label="Категория"
        rules={[{ required: true, message: "Пожалуйста, выберите категорию!" }]}
      >
        <CategorySelect
          style={{ width: "100%" }}
          defaultValue={state.type}
          onChange={(value) => handleChange(value, 'type')}
        />
      </Form.Item>
    </Form>
  );
};
