import { useState } from "react";
import axios from "axios";
import { getAllTreinos } from "../../services/TreinoService";
import type { Treino } from "../../types/treino";

export function useListarTreinos() {
  const [treinosLoading, setTreinosLoading] = useState(false);
  const [treinosError, setTreinosError] = useState<string | null>(null);
  const [treinos, setTreinos] = useState<Treino[]>([]);

  async function getTreinos(): Promise<void> {
    try {
      setTreinosLoading(true);

      const treinos = await getAllTreinos();
      setTreinos(treinos);
      setTreinosError(null);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setTreinosError(error ?? "Ocorreu um erro ao tentar buscar os treinos.");
    } finally {
      setTreinosLoading(false);
    }
  }

  return {
    getTreinos,
    treinos,
    treinosLoading,
    treinosError,
  };
}
