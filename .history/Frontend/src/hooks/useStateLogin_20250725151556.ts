//Hook para gerenciar o estado de login do usuário.
import { useState } from "react";

export function useStateLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, valau} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return {
        formData,
        handleChange
    }
}