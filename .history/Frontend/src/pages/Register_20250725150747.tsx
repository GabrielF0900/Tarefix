import { useStateRegister } from "../hooks/useStateRegister";
import { useNavigation } from "../hooks/useNavigation";
import { Input } from "../components/inputs";

// Define the schema for registration validation




  
export function Register() {
    const { goToLogin } = useNavigation();
    const { formData, handleChange } = useStateRegister();

    

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // Handle registration logic here
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="username" name="name" type="text" label="Username" required  value={formData.name} onChange={handleChange} />
          <Input id="email" name="email" type="email" label="Email" required value={formData.email} onChange={handleChange} />
          <Input id="password" name="password" type="password" label="Password" required value={formData.password} onChange={handleChange} />

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
