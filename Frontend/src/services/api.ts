// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend local
});

export default api;
