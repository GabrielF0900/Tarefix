//Algoritmo que cuidará de rotas.
import { Login } from '../pages/Login';
import { BrowserRouter, Route } from 'react-router-dom';


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