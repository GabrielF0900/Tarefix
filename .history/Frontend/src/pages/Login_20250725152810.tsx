
import { useStateLogin } from "../hooks/useStateLogin";
import { Input } from "../components/inputs";
import { useNavigation } from "../hooks/useNavigation";



export function Login() {
    const { goToRegister } = useNavigation();
    const { formData, handleChange } = useStateLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <Input id="username" name="username" type="text" label="Username" required  value/>
        <Input id="password" name="password" type="password" label="Password" required />

        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Não tem uma conta? <a onClick={goToRegister} className="text-blue-500 hover:underline">Registrar</a>
        </p>
      </div>
    </div>
  );
}
