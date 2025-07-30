// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: "https://tarefix-backend.onrender.com/api", // Ajuste a URL para seu backend
});

export default api;
