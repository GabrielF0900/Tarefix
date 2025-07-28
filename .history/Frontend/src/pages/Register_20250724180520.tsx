    

export function Register() {
    return (
        <div>
            <h1>Register</h1>
            <Input id="username" type="text" label="Username" required />
            <Input id="email" type="email" label="Email" required />
            <Input id="password" type="password" label="Password" required />

            <button
                type="submit"
                className="w-full mt-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
            >
                Registrar
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
                Já tem uma conta? <a onClick={goToLogin} className="text-blue-500 hover:underline">Login</a>
            </p>
        </div>
    )
}