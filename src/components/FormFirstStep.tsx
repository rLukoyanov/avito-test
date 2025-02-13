import { Button, Form, Input } from "antd";
import { CategorySelect } from "./CategoriesSelect";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { fetchItemById } from "../api/items";


type FormState = {
  name: string;
  description: string;
  location: string;
  photo: string;
  type: string;
};

export const FormFirstStep = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<FormState>;
}) => {
  const [params] = useSearchParams();
  const id = params.get("id");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: async () =>
      id ? await fetchItemById(id || "") : null,
  });

  return (
    <Form layout="vertical">
      <Form.Item label="Название" required>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Введите название объявления!" }}
          render={({ field }) => (
            <Input {...field} placeholder="Введите название объявления" />
          )}
        />
        {errors.name ? (
          <span style={{ color: "red" }}>{errors.name.message}</span>
        ) : null}
      </Form.Item>
      <Form.Item label="Описание" required>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Введите описание!" }}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              
              placeholder="Введите описание"
              rows={4}
            />
          )}
        />
        {errors.description ? (
          <span style={{ color: "red" }}>{errors.description.message}</span>
        ) : null}
      </Form.Item>
      <Form.Item label="Локация" required>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Введите локацию!" }}
          render={({ field }) => (
            <Input {...field} placeholder="Введите локацию" />
          )}
        />
        {errors.location ? (
          <span style={{ color: "red" }}>{errors.location.message}</span>
        ) : null}
      </Form.Item>
      <Form.Item label="Фото">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="URL фото (необязательно)" />
          )}
        />
        {errors.photo ? (
          <span style={{ color: "red" }}>{errors.photo.message}</span>
        ) : null}
      </Form.Item>
      <Form.Item label="Категория" required>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Выберите категорию!" }}
          render={({ field }) => (
            <CategorySelect {...field} style={{ width: "100%" }} />
          )}
        />
        {errors.type ? (
          <span style={{ color: "red" }}>{errors.type.message}</span>
        ) : null}
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Далее
        </Button>
      </Form.Item>
    </Form>
  );
};
