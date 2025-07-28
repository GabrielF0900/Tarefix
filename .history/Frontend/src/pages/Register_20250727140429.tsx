import React, { useState } from "react";
import { useStateRegister } from "../hooks/useStateRegister";
import { useNavigation } from "../hooks/useNavigation";
import { Input } from "../components/inputs";
import { RegisterAPI as registerUser } from "../services/auth";

export function Register() {
  const { goToLogin } = useNavigation();
  const { formData, handleChange } = useStateRegister();
  const [errorMessage, setErrorMessage] = useState(""); // novo estado para exibir mensagens de erro

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(""); // limpa mensagens anteriores

    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      console.log("Usuário registrado:", response);
      goToLogin();
    } catch (error: any) {
      console.error("Erro no registro:", error);

      // Verifica se o backend retornou erro amigável
      if (error.response && error.response.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erro inesperado. Tente novamente.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Name"
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
            label="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          {/* Exibir mensagem de erro, se houver */}
          {errorMessage && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Registrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem uma conta?{" "}
          <button
            onClick={goToLogin}
            className="text-blue-500 hover:underline focus:outline-none"
            type="button"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
