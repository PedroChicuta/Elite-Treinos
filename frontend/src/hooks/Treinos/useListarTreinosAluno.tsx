import { useState } from "react";
import axios from "axios";
import { getTreinosByAlunoId } from "../../services/TreinoService";
import type { Treino } from "../../types/treino";

export function useListarTreinosAluno() {
  const [treinosAlunoLoading, setTreinosAlunoLoading] = useState(false);
  const [treinosAlunoError, setTreinosAlunoError] = useState<string | null>(
    null,
  );
  const [treinosAluno, setTreinosAluno] = useState<Treino[]>([]);

  async function getTreinosAluno(idAluno: string): Promise<void> {
    try {
      setTreinosAlunoLoading(true);

      const treinos = await getTreinosByAlunoId(idAluno);
      setTreinosAluno(treinos);
      setTreinosAlunoError(null);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setTreinosAlunoError(
        error ?? "Ocorreu um erro ao tentar buscar os treinos do aluno.",
      );
    } finally {
      setTreinosAlunoLoading(false);
    }
  }

  return {
    getTreinosAluno,
    treinosAluno,
    treinosAlunoLoading,
    treinosAlunoError,
  };
}
