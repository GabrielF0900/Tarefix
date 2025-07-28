
import { useStateLogin } from "../hooks/useStateLogin";
import { Input } from "../components/inputs";
import { useNavigation } from "../hooks/useNavigation";



export function Login() {
    const { goToRegister } = useNavigation();
    const { formData, handleChange } = useStateLogin();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // Handle login logic here
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form action="
        "></form>
      </div>
    </div>
  );
}
