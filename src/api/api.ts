import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: process.env.API_URL || "localhost:3000",
  timeout: 5000,
});

export default api;
