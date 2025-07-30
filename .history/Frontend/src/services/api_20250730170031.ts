// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ajuste a URL para seu backend
});

export default api;
