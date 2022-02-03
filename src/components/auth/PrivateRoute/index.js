import React from 'react';
import { Navigate } from 'react-router-dom';

// cria uma rota privada
const PrivateRoute = ({children}) => {
    // se o local storage tiver com usuário logado renderiza o component senão redireciona o usuário para a tela de login
    return localStorage.getItem('user') ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;