import { Input } from "../components/inputs"

export function Login() {
    return (
        <div className="">
            <h1>Login</h1>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" label="Username" required/>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" label="Password" required/>
        </div>
    )
}
        
