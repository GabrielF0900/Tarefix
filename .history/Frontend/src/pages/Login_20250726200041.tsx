import { useStateLogin } from "../hooks/useStateLogin";
import { Input } from "../components/inputs";
import { useNavigation } from "../hooks/useNavigation";
import {z} from "zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export function Login() {
  const { goToRegister } = useNavigation();
  const { formData, handleChange } = useStateLogin();

  //Colocando os estados iniciais para validação do zod
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  //Criando objeto com dados do login para validar
  const loginData = {email, password};

  // Função para validar os dados do login
  function validateLogin() {
    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const fieldErrors: {email?: string; password?: string} = {};
      result.error.errors.forEach(error => {
        if (error.path.includes("email")) {
          fieldErrors.email = error.message;
        } else if (error.path.includes("password")) {
          fieldErrors.password = error.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }

  // Função que trata o envio do formulário de login
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Dados enviados", formData);
    // Lógica de login aqui
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
            value={formData.email}
            onChange={{(e) => }}
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
