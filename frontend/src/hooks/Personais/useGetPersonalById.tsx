import { useState } from "react";
import axios from "axios";
import { getPersonalById } from "../../services/PersonalService";
import type { Personal } from "../../types/personal";

export function useGetPersonalById() {
  const [personalLoading, setPersonalLoading] = useState(false);
  const [personalError, setPersonalError] = useState<string | null>(null);
  const [personal, setPersonal] = useState<Personal | null>(null);

  async function getPersonal(id: string): Promise<void> {
    try {
      setPersonalLoading(true);
      const fetchedPersonal = await getPersonalById(id);
      setPersonal(fetchedPersonal);
    } catch (err) {
      let error: string | null = null;
      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }
      setPersonalError(error ?? "Ocorreu um erro ao buscar o personal.");
    } finally {
      setPersonalLoading(false);
    }
  }

  return {
    getPersonal,
    personalLoading,
    personalError,
    personal,
  };
}
