import { useState } from "react";
import axios from "axios";
import { getAllPersonals } from "../../services/PersonalService";
import type { Personal } from "../../types/personal";

export function useListarPersonals() {
  const [personalsLoading, setPersonalsLoading] = useState(false);
  const [personalsError, setPersonalsError] = useState<string | null>(null);
  const [personals, setPersonals] = useState<Personal[]>([]);

  async function getPersonals(): Promise<void> {
    try {
      setPersonalsLoading(true);

      const personals = await getAllPersonals();
      setPersonals(personals);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setPersonalsError(error ?? "Ocorreu um erro ao tentar fazer Personals.");
    } finally {
      setPersonalsLoading(false);
    }
  }

  return {
    getPersonals,
    personalsLoading,
    personalsError,
    personals,
  };
}
