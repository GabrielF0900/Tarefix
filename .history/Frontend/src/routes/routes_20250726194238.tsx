//Algoritmo que cuidará de rotas.
import { Login } from '../pages/Login';
import { Route } from 'react-router-dom';
import { Routes as RoutesRoutes } from 'react-router-dom';
import { Register } from '../pages/Register';
import {Dash}

export function Routes() {
    return (
            <RoutesRoutes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Adicione outras rotas aqui conforme necessário */}
            </RoutesRoutes>
    )
    }