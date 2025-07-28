import { Input } from "../components/inputs"

export function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Input type="text" label="Username" />
            <Input label="Password" type="password" />
        </div>
    )
}
        
