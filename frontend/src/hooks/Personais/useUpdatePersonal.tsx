import { useState } from "react";
import type { Personal, UpdatePersonalRequest } from "../../types/personal";
import { updatePersonal as updatePersonalService } from "../../services/PersonalService";
import axios from "axios";

export function useUpdatePersonal() {
  const [updatePersonalLoading, setUpdatePersonalLoading] = useState(false);
  const [updatePersonalError, setUpdatePersonalError] = useState<string | null>(
    null,
  );
  const [personal, setPersonal] = useState<Personal | null>(null);

  async function updatePersonal(
    id: string,
    personalData: Partial<Omit<Personal, "id_personal">>,
  ) {
    try {
      setUpdatePersonalLoading(true);

      const personal: Partial<UpdatePersonalRequest> = {
        nome: personalData.usuario?.nome,
        email: personalData.usuario?.email,
        senha: personalData.usuario?.senha,
        telefone: personalData.telefone,
        cref: personalData.cref ?? "",
      };

      const updatedPersonal = await updatePersonalService(id, personal);

      setPersonal(updatedPersonal);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setUpdatePersonalError(
        error ?? "Ocorreu um erro ao tentar atualizar o Personal.",
      );
    } finally {
      setUpdatePersonalLoading(false);
    }
  }

  return {
    updatePersonal,
    updatePersonalLoading,
    updatePersonalError,
    personal,
  };
}
