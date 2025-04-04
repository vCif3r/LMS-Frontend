import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import {jwtDecode} from "jwt-decode"; // Importación correcta de jwt-decode

// Definición de los tipos para el contexto
type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
  handleLogin: (newToken: string) => void;
  handleLogout: () => void;
}

// Definición del tipo UserData
interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
}

// Crear el contexto con un tipo inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Obtener los datos del usuario del localStorage
    const storedData = localStorage.getItem('data_user');
    if (storedData) {
      try {
        const { userToken } = JSON.parse(storedData);
        if (userToken) {
          // Decodificar el token para obtener los datos del usuario
          const decoded = jwtDecode<UserData>(userToken);
          setToken(userToken);
          setUserData(decoded);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('data_user', JSON.stringify({ userToken: newToken }));
    const decoded = jwtDecode<UserData>(newToken);
    setToken(newToken);
    setUserData(decoded);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('data_user');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, userData, handleLogin, handleLogout }}>
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
