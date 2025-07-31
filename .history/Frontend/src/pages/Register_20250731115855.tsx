import React, { useState } from "react";
import { useStateRegister } from "../hooks/useStateRegister";
import { useNavigation } from "../hooks/useNavigation";
import { Input } from "../components/inputs";
import { RegisterAPI as registerUser } from "../services/auth"; // ✅ nome da função corrigido
import axios from "axios"; // ✅ necessário para checar se é erro do axios

export function Register() {
  const { goToLogin } = useNavigation();
  const { formData, handleChange } = useStateRegister();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      console.log("Usuário registrado:", response);
      goToLogin(); // redirecionar ao login após sucesso
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Erro ao registrar.");
      } else {
        setErrorMessage("Erro inesperado. Tente novamente.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-2 sm:px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Crie sua conta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Nome"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage && (
            <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-base sm:text-lg"
          >
            Registrar
          </button>
          <p className="mt-4 text-center text-sm text-gray-400">
            Já tem conta?{' '}
            <a
              onClick={goToLogin}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
