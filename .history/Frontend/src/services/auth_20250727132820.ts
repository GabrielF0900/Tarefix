//Aqui vamos o algoritmo de configuração das rotas de login e register em axios


import api from "./api";

export async function Login({data}: {email: string; password: string}): Promise<any> {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}