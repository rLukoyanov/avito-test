import { Form, Input } from "antd";
import { CategorySelect } from "./CategoriesSelect";
import { Advertisement } from "../types/api";
import { ChangeEvent } from "react";

type Props = {
  register: (
    name: keyof Advertisement,
    type?: "select" | "text"
  ) => { onChange: (value: string | ChangeEvent<HTMLInputElement>) => void };
};

export const FormFirstStep = ({ register }: Props) => {
  return (
    <>
      <Form.Item>
        <Input
          {...register("name")}
          placeholder="Введите название объявления"
        />
      </Form.Item>
      <Form.Item>
        {/** @ts-expect-error: HTMLInputElement */}
        <Input.TextArea
          {...register("description")}
          placeholder="Введите описание"
          rows={4}
        />
      </Form.Item>
      <Form.Item>
        <Input {...register("description")} placeholder="Введите локацию" />
      </Form.Item>
      <Form.Item>
        <Input {...register("photo")} placeholder="URL фото (необязательно)" />
      </Form.Item>
      <Form.Item>
        <CategorySelect
          {...register("type", "select")}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </>
  );
};
