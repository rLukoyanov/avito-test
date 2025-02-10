import {
  Button,
  ConfigProvider,
  Form,
  Input,
  notification,
  Select,
} from "antd";
import { AllFieldsOfAdvertisements, Categories } from "../types/api";
import { FormActions, useStepForm } from "../store/FormContext";
import { useState } from "react";
import { createItem } from "../api/items";

const validateMessages = {
  required: "Пожалуйста, укажите ${label}!",
};

export const SecondStep = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useStepForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleChange = (
    value: string,
    fieldName: AllFieldsOfAdvertisements
  ) => {
    dispatch({
      type: FormActions.updateField,
      newValue: value,
      fieldName,
    });
  };

  const publish = async () => {
    setLoading(true);
    try {
      await createItem(state);
    } catch (error) {
      api.error({
        message: "Ошибка создания обьявления:",
        description: String(error),
        duration: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!state.type) {
    return <div>Ни одна категория не выбрана</div>;
  }

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form form={form} layout="vertical" onFinish={publish}>
        {contextHolder}
        {/* Поля для недвижимости */}
        {state.type === Categories.REAL_ESTATE && (
          <>
            <Form.Item
              name="type"
              label="Тип недвижимости"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Выберите тип"
                onChange={(v) => handleChange(v, "propertyType")}
              >
                <Select.Option value="apartment">Квартира</Select.Option>
                <Select.Option value="house">Дом</Select.Option>
                <Select.Option value="cottage">Коттедж</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="area"
              label="Площадь (кв. м)"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Введите площадь"
                onChange={(e) => handleChange(e.target.value, "area")}
              />
            </Form.Item>
            <Form.Item
              name="rooms"
              label="Количество комнат"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Введите количество комнат"
                onChange={(e) => handleChange(e.target.value, "rooms")}
              />
            </Form.Item>
            <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
              <Input
                type="number"
                placeholder="Введите цену"
                onChange={(e) => handleChange(e.target.value, "price")}
              />
            </Form.Item>
          </>
        )}

        {/* Поля для авто */}
        {state.type === Categories.AUTO && (
          <>
            <Form.Item name="brand" label="Марка" rules={[{ required: true }]}>
              <Input
                placeholder="Введите марку автомобиля"
                onChange={(e) => handleChange(e.target.value, "brand")}
              />
            </Form.Item>
            <Form.Item name="model" label="Модель" rules={[{ required: true }]}>
              <Input
                placeholder="Введите модель автомобиля"
                onChange={(e) => handleChange(e.target.value, "model")}
              />
            </Form.Item>
            <Form.Item
              name="year"
              label="Год выпуска"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Введите год выпуска"
                onChange={(e) => handleChange(e.target.value, "year")}
              />
            </Form.Item>
            <Form.Item name="mileage" label="Пробег (км)">
              <Input
                type="number"
                placeholder="Введите пробег"
                onChange={(e) => handleChange(e.target.value, "mileage")}
              />
            </Form.Item>
          </>
        )}

        {/* Поля для услуг */}
        {state.type === Categories.SERVICES && (
          <>
            <Form.Item
              name="serviceType"
              label="Тип услуги"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Введите тип услуги"
                onChange={(e) => handleChange(e.target.value, "serviceType")}
              />
            </Form.Item>
            <Form.Item
              name="experience"
              label="Опыт работы (лет)"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Введите опыт работы"
                onChange={(e) => handleChange(e.target.value, "experience")}
              />
            </Form.Item>
            <Form.Item
              name="cost"
              label="Стоимость"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Введите стоимость услуги"
                onChange={(e) => handleChange(e.target.value, "cost")}
              />
            </Form.Item>
            <Form.Item name="schedule" label="График работы">
              <Input
                placeholder="Введите график работы"
                onChange={(e) => handleChange(e.target.value, "workSchedule")}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Разместить обьявление
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
