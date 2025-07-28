//Hook para gerenciar o estado de login do usuário.
import { useState } from "react";

export function useStateLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
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

{/*Temos aqui uma função chamada useStateLogin que é a criaçao do hook para gerenciamento de estados do arquivo Login.tsx
    
    dentro dessa funçãao eu tenho o estado que se chama formData e temos o nome da função que atuliza o estado que é setFormData
    que irá atualizar os estados digitados pelo usuario.
    
    Temos também a funçaao handleChange que tem a variavel temporaria event que tem aa tipagem React.ChangeEvent<HTMLInputElement>
    </HTMLInputElement>. Ou seja, estou tipando o event que é a variavel temporaria com o elemento HTML input
    
    Eu criei também  a const que estou desestruturando o name e o value que será digitado pelo usuario e será alterado pela função que irá
    alterar o estado e estamos pegaando de event.target.
    
    Depois, estamos chamando a função que atulaiza o estado setFormData e estamos criando uma notação de arrow functioon
    e atribuimos uma varivel temporaria chamada prevState e depois dentro da função  estamos despejando as propriedades de prevState*/}