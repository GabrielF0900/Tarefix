//Aqui vamos o algoritmo de configuração das rotas de login e register em axios


import api from "./api";

interface User {
    email: string;
    password: string;
}

interface LoginResponse {



export async function Login({email, password}: {email: string; password: string}): Promise<any> {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}
