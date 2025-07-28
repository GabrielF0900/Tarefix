import { Input } from "../components/inputs"

export function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" label="Username" required/>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" label="Password" required/>
        </div>
    )
}
        
