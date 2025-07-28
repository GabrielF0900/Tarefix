import { useNavigation } from "../hooks/useNavigation";
import { Input } from "../components/inputs";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../services/auth"; // ✅ Correto agora

const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export function Login() {
  const { goToRegister } = useNavigation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState("");

  const loginData = { email, password };

  function validateLogin() {
    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((error) => {
        if (error.path.includes("email")) {
          fieldErrors.email = error.message;
        } else if (error.path.includes("password")) {
          fieldErrors.password = error.message;
        }
      });
      setErrors(fieldErrors);
      console.log("Validação falhou:", fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  // ✅ Corrigido: async + uso de LoginAPI
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    if (!validateLogin()) return;

    try {
      const result = await LoginAPI(loginData);
      console.log("Login feito com sucesso:", result);
      // localStorage.setItem("token", result.token);
      if (result.email) {
        localStorage.setItem("userEmail", result.email);
      } else {
        localStorage.setItem("userEmail", loginData.email);
      }
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Email ou senha inválidos");
      } else {
        setErrorMessage("Erro inesperado. Tente novamente.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="text"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />


          {errorMessage && (
            <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Entrar
          </button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Não tem uma conta?{" "}
            <a
              onClick={goToRegister}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Registrar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
