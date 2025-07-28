import { Input } from "../components/inputs"

export function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1>Login</h1>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" label="Username" required/>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" label="Password" required/>
        </div>
    )
}
        
