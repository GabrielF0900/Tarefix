// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tarefix-frontend-7id8.onrender.com', // Ajuste a URL para seu backend
});

export default api;
