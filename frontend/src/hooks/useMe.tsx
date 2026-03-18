// src/hooks/useMe.ts
import { useState } from "react";
import axios from "axios";
import { me } from "../services/authenticationService";
import type { Me } from "../types/usuario";

export function useMe() {
  const [meLoading, setMeLoading] = useState(true);
  const [meError, setMeError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Me | null>(null);

  async function fetchMe(): Promise<void> {
    try {
      setMeLoading(true);
      const usuario = await me();
      setUsuario(usuario);
    } catch (err) {
      setUsuario(null);
      if (axios.isAxiosError(err)) {
        setMeError(err.response?.data.message ?? "Erro ao verificar sessão.");
      }
    } finally {
      setMeLoading(false);
    }
  }

  return {
    fetchMe,
    meLoading,
    meError,
    usuario,
    setUsuario,
  };
}
