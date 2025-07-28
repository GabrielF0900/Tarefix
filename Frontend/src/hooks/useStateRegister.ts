//Algoritmo para gerenciar os estados de Register do usuário.
import { useState } from 'react';

export function useStateRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
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