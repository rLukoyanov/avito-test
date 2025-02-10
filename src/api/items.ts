import { AllTypesOfAdvertisements } from "../types/api";
import { removeFieldsByCategory } from "../utils/removeFieldsByCategory";
import api from "./api";

type SearchParams = { category: string; search: string; page: number };

// Получить список объявлений
export const fetchItems = async (params: Partial<SearchParams> = {}) => {
  const response = await api.get("/items", { params });
  return response.data;
};

// Получить объявление по ID
export const fetchItemById = async (id: number) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

// Создать новое объявление
export const createItem = async (item: Partial<AllTypesOfAdvertisements>) => {
  const clearItem = removeFieldsByCategory(item);
  const response = await api.post("/items", clearItem);
  return response.data;
};

// Обновить существующее объявление
export const updateItem = async (
  id: number,
  item: Partial<AllTypesOfAdvertisements>
) => {
  const response = await api.put(`/items/${id}`, item);
  return response.data;
};

// Удалить объявление
export const deleteItem = async (id: number) => {
  const response = await api.delete(`/items/${id}`);
  return response.status === 204;
};

export const fetchCategories = async () => {
  const response = await api.get(`/categories`);
  return response.data;
};
