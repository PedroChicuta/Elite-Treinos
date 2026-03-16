import { useState } from "react";
import type { LoginRequest } from "../types/loginRequest";
import axios from "axios";
import { login } from "../services/authenticationService";
import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
  const { setUsuario } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  async function submitLogin(loginRequestFields: LoginRequest): Promise<void> {
    try {
      setLoginLoading(true);
      const usuario = await login(loginRequestFields);

      setUsuario(usuario);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setLoginError(error ?? "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoginLoading(false);
    }
  }

  return {
    submitLogin,
    loginLoading,
    loginError,
  };
}
