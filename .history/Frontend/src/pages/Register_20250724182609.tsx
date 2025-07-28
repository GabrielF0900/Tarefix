import React, { useState } from "react";
import { z } from "zod";
import { useNavigation } from "../hooks/useNavigation";
import { Input } from "../components/inputs";

const registrationSchema = z.object({
  username: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export function Register() {
  const { goToLogin } = useNavigation();

  // Estados para controlar os inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Estado para erros
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Validação usando safeParse (não lança erro, retorna resultado)
    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      // Pega os erros e coloca no estado para mostrar na UI
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      // Dados válidos - pode enviar para backend ou outra lógica
      setErrors({});
      alert("Registro válido! Dados: " + JSON.stringify(result.data));
      // Aqui você pode chamar sua API, redirecionar, etc.
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

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
