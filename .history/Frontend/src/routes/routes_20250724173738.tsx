//Algoritmo que cuidará de rotas.
import { Login } from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes as RoutesRoutes } from 'react-router-dom';


export function Routes() {
    return (
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Adicione outras rotas aqui conforme necessário */}
            </Routes>
            </BrowserRouter>
    )
    }