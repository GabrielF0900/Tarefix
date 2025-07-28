//Algoritmo para gerenciar os estados de Register do usuário.
import { useState } from 'react';

export function useStateRegister() {
    const [updateRegister, setUpdateRegister] = useState(0);

    function incrementRegister() {
        setUpdateRegister(prev => prev + 1);
    }

    return {
        updateRegister}
}