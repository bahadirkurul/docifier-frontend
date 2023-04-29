import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import jwt_decode from 'jwt-decode'

export const AuthGuard = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuthContext() as any;
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  function parseJwt (token) {
    return jwt_decode(token)
}
  
  useEffect(() => {
    if (ignore.current) {
      return;
    } else {
      setChecked(true);
    }
  
    ignore.current = true;

    const sessionLocalStorage = localStorage.getItem('session')
    const sessionJson = JSON.parse(sessionLocalStorage as string)
    
    const userLocalStorage = localStorage.getItem('session')
    const userJson = JSON.parse(userLocalStorage as string)
    
    const accessTokenData = parseJwt(sessionJson?.accessToken) as any
    const tokenExpired = accessTokenData.exp < Date.now() / 1000
    
    if (!sessionJson || !userJson || tokenExpired) {
      console.log('Not authenticated, redirecting');
      navigate("/auth/login")
    }
  }, [isAuthenticated, navigate])

  if (!checked) {
    return null;
  }

  return children
}
