//Algoritmo de navegaação

import { useNavigate } from 'react-router-dom';

export function useNavegate() {
  const navigate = useNavigate();

  function goToLogin() {
    navigate('/login');
  }

  function goToRegister() {
    navigate('/register');
  }

  function goToDashboard() {
    navigate('/dashboard');
  }

  return { goToLogin, goToRegister };
}