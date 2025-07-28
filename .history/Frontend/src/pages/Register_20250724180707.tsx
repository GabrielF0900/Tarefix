import { useNavigat } from "../hooks/useNavigation";
import { Input } from "../components/inputs";

export function Register() {
  const { goToLogin } = useNavegate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form>
          <Input id="username" type="text" label="Username" required />
          <Input id="email" type="email" label="Email" required />
          <Input id="password" type="password" label="Password" required />

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
