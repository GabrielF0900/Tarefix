//Algoritmo para gerenciar os estados de Register do usuário.
import { useState } from 'react';
import { function } from '../../../.history/Frontend/src/routes/routes_20250724173214';

export function useStateRegister() {
    const [updateRegister, setUpdateRegister] = useState(0);

    function incrementRegister() {
        setUpdateRegister(prev => prev + 1);
    }

    return {
        updateRegister,}
}