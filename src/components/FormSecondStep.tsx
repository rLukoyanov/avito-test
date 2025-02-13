import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { RootState } from "../store/store";
import { AllTypesOfAdvertisements, Categories } from "../types/api";
import { fetchItemById } from "../api/items";

type Field = {
  name: string;
  label: string;
  type: "select" | "number" | "text";
  options?: string[];
  required?: boolean;
};

const realEstateFields: Field[] = [
  {
    name: "realEstateType",
    label: "Тип недвижимости",
    type: "select",
    options: ["Квартира", "Дом", "Коттедж"],
  },
  { name: "area", label: "Площадь (кв. м)", type: "number", required: true },
  { name: "rooms", label: "Количество комнат", type: "number", required: true },
  { name: "price", label: "Цена", type: "number", required: true },
];

const autoFields: Field[] = [
  {
    name: "brand",
    label: "Марка",
    type: "select",
    options: ["Toyota", "BMW", "Ford"],
  },
  { name: "model", label: "Модель", type: "text", required: true },
  { name: "year", label: "Год выпуска", type: "number", required: true },
  { name: "mileage", label: "Пробег (км)", type: "number" },
];

const serviceFields: Field[] = [
  {
    name: "serviceType",
    label: "Тип услуги",
    type: "select",
    options: ["Ремонт", "Уборка", "Доставка"],
  },
  {
    name: "experience",
    label: "Опыт работы (лет)",
    type: "number",
    required: true,
  },
  { name: "cost", label: "Стоимость", type: "number", required: true },
  { name: "schedule", label: "График работы", type: "text" },
];

const categoryFields: Record<Categories, Field[]> = {
  [Categories.REAL_ESTATE]: realEstateFields,
  [Categories.AUTO]: autoFields,
  [Categories.SERVICES]: serviceFields,
};

type RenderFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  type: "select" | "number" | "text";
  options?: string[];
};

const RenderField = ({ field, type, options }: RenderFieldProps) => {
  switch (type) {
    case "select":
      return (
        <Select
          {...field}
          options={options?.map((opt) => ({ value: opt, label: opt }))}
        />
      );
    case "number":
      return <InputNumber {...field} style={{ width: "100%" }} />;
    default:
      return <Input {...field} />;
  }
};

type Props = {
  onSubmit: SubmitHandler<Partial<AllTypesOfAdvertisements>>;
};

export const FormSecondStep = ({ onSubmit }: Props) => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const type = useSelector(
    (state: RootState) => state.formReducer[1].type as Categories
  );

  const fields = categoryFields[type] || [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () =>
      id ? await fetchItemById(id || "") : null,
  });

  return (
    <Form layout="vertical">
      {fields.map(({ name, label, type, options, required }) => (
        <Form.Item key={name} label={label} required={required}>
          <Controller
            name={name}
            control={control}
            rules={
              required ? { required: `Введите ${label.toLowerCase()}!` } : {}
            }
            render={({ field }) => (
              <RenderField field={field} type={type} options={options} />
            )}
          />
          {errors[name] && (
            <span style={{ color: "red" }}>{String(errors[name].message)}</span>
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Далее
        </Button>
      </Form.Item>
    </Form>
  );
};
