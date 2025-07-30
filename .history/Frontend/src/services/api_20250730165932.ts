// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste a URL para seu backend
});

export default api;
