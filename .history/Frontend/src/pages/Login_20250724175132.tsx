import { Input } from "../components/inputs"

export function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Input label="Email" type="email" />
            
            <Input label="Password" type="password" />
        </div>
    )
}
        
