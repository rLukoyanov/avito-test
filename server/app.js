const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Categories = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// In-memory хранилище для объявлений и пользователей
let items = [];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, photos = [], ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case Categories.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case Categories.AUTO:
      if (!rest.brand || !rest.model || !rest.year) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case Categories.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    photos, // Добавляем фотографии
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений с пагинацией и фильтрацией
app.get("/items", (req, res) => {
  const { page = 1, limit = 5, search = "", category = "" } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  let filteredItems = items;

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filteredItems = filteredItems.filter((item) => item.type === category);
  }

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  res.json({
    total: filteredItems.length,
    page: pageNumber,
    limit: limitNumber,
    items: paginatedItems,
  });
});

app.get("/categories", (req, res) => {
  res.json(Object.values(Categories));
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    const item = items[itemIndex];
    items.splice(itemIndex, 1);
    req.user.items = req.user.items.filter((id) => id !== item.id); // Удаляем ID из списка пользователя
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const initialItems = [
  {
    id: itemsIdCounter(),
    name: "Квартира в центре",
    description: "Уютная квартира с видом на город",
    location: "Москва",
    type: Categories.REAL_ESTATE,
    photo: "data:image/jpeg;base64,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",
    propertyType: "Квартира",
    area: 50,
    rooms: 2,
    price: 10000000,
  },
  {
    id: itemsIdCounter(),
    name: "Квартира в центре",
    description: "Уютная квартира с видом на город",
    location: "Москва",
    type: Categories.REAL_ESTATE,
    photo: "",
    propertyType: "Квартира",
    area: 50,
    rooms: 2,
    price: 10000000,
  },
  {
    id: itemsIdCounter(),
    name: "Квартира в центре",
    description: "Уютная квартира с видом на город",
    location: "Москва",
    type: Categories.REAL_ESTATE,
    photo: "",
    propertyType: "Квартира",
    area: 50,
    rooms: 2,
    price: 10000000,
  },
  {
    id: itemsIdCounter(),
    name: "Toyota Camry",
    description: "Надежный автомобиль для всей семьи",
    location: "Санкт-Петербург",
    type: Categories.AUTO,
    photo: "data:image/jpeg;base64,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",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 60000,
  },
  {
    id: itemsIdCounter(),
    name: "Toyota Camry",
    description: "Надежный автомобиль для всей семьи",
    location: "Санкт-Петербург",
    type: Categories.AUTO,
    photo: "",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 60000,
  },
  {
    id: itemsIdCounter(),
    name: "Toyota Camry",
    description: "Надежный автомобиль для всей семьи",
    location: "Санкт-Петербург",
    type: Categories.AUTO,
    photo: "",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 60000,
  },
];
items.push(...initialItems);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
