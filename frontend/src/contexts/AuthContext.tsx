// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect } from "react";
import type { Me } from "../types/usuario";
import { useMe } from "../hooks/useMe";

interface AuthContextType {
  usuario: Me | null;
  loading: boolean;
  setUsuario: (usuario: Me | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchMe, meLoading, usuario, setUsuario } = useMe();

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading: meLoading, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
