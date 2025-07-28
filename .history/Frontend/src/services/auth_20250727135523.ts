//Aqui vamos o algoritmo de configuração das rotas de login e register em axios


import api from "./api";

interface User {
    email: string;
    password: string;
    name: string;
}

interface LoginResponse {
    user: User;
}



export async function LoginAPI({email, password}: {email: string; password: string}): Promise<LoginResponse> {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function Register({email, password, name}: {email: string; password: string; name: string}): Promise<LoginResponse> {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer registro:', error);
    throw error;
  }
}
