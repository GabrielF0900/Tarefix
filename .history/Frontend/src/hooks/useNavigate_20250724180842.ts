import { useNavigate as useRouterNavigate } from 'react-router-dom';

export function useNavigation() {
  const navigate = useRouterNavigate();

  function goToLogin() {
    navigate('/login');
  }

  function goToRegister() {
    navigate('/register');
  }

  function goToDashboard() {
    navigate('/dashboard');
  }

  return { goToLogin, goToRegister, goToDashboard };
}
