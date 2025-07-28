//Algoritmo que cuidará de rotas.
import { Login } from '../pages/Login';
import { Route } from 'react-router-dom';
import { Routes as RoutesRoutes } from 'react-router-dom';
import { Register } from 'react-router-dom';

export function Routes() {
    return (
            <RoutesRoutes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <
                {/* Adicione outras rotas aqui conforme necessário */}
            </RoutesRoutes>
    )
    }