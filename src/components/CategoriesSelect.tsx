import { useState, useEffect } from 'react';
import { Select, SelectProps, Spin } from 'antd';
import { fetchCategories } from '../api/items';  // Импортируем функцию для получения категорий с сервера
import { Categories } from '../types/api';

const { Option } = Select;

type Props = SelectProps & {
  onChange: (value: Categories) => void;
}

export const CategorySelect = ({ onChange, ...rest }: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        setError('Не удалось загрузить категории');
        console.error('Ошибка загрузки категорий:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <Select
      placeholder="Категория"
      onChange={onChange}
      allowClear
      style={{ width: 200 }}
      loading={loading}
      {...rest}
    >
      {loading ? (
        <Spin size="small" />
      ) : error ? (
        <Option disabled>{error}</Option>
      ) : (
        categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))
      )}
    </Select>
  );
};
