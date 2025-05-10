
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from localStorage on component mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // This is a simple implementation - in a real app, you'd validate against a server
    if (username === 'admin' && password === 'password') {
      const newToken = 'sample_token_' + Date.now();
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    localStorage.removeItem('auth_token');
    setToken(null);
  };

  const isLoggedIn = (): boolean => {
    return !!token;
  };

  return {
    token,
    login,
    logout,
    isLoggedIn
  };
};
