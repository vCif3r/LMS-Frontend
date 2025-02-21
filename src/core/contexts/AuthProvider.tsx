import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { jwtDecode } from "jwt-decode";

// Definición de los tipos para el contexto
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  userData: any,
  login: (newToken: string) => void;
  logout: () => void;
}

// Crear el contexto con un tipo inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('data_user');
    if (storedData) {
      const { userToken } = JSON.parse(storedData);
      const decoded = jwtDecode(userToken);
      setToken(userToken);
      setUserData(decoded);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('data_user', JSON.stringify({ userToken: newToken })); // Aquí podrías añadir datos del usuario
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('data_user');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={ { token, isAuthenticated,userData, login, logout } }>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
