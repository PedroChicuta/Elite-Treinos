import { useState } from "react";
import type { Personal } from "../../types/personal";
import { createPersonal as createPersonalService } from "../../services/PersonalService";
import axios from "axios";
import { type CreatePersonalRequest } from "../../types/personal";

export function useCreatePersonal() {
  const [createPersonalLoading, setCreatePersonalLoading] = useState(false);
  const [createPersonalError, setCreatePersonalError] = useState<string | null>(
    null,
  );
  const [personal, setPersonal] = useState<Personal | null>(null);

  async function createPersonal(personalData: Omit<Personal, "id_personal">) {
    try {
      setCreatePersonalLoading(true);

      if (!personalData.usuario.senha) {
        setCreatePersonalError("A senha é obrigatória para criar um personal.");
        return;
      }

      const personal: CreatePersonalRequest = {
        nome: personalData.usuario.nome,
        email: personalData.usuario.email,
        senha: personalData.usuario.senha,
        telefone: personalData.telefone,
        cref: personalData.cref ?? "",
      };

      const createdPersonal = await createPersonalService(personal);
      setPersonal(createdPersonal);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setCreatePersonalError(
        error ?? "Ocorreu um erro ao tentar criar o Personal.",
      );
    } finally {
      setCreatePersonalLoading(false);
    }
  }

  return {
    createPersonal,
    createPersonalLoading,
    createPersonalError,
    personal,
  };
}
