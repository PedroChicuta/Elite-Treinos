import { useState } from "react";
import axios from "axios";
import { getAlunoById } from "../../services/AlunoService";
import type { Aluno } from "../../types/aluno";

export function useGetAlunoById() {
  const [alunoLoading, setAlunoLoading] = useState(false);
  const [alunoError, setAlunoError] = useState<string | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);

  async function getAluno(id: string): Promise<void> {
    try {
      setAlunoLoading(true);
      const fetchedAluno = await getAlunoById(id);
      setAluno(fetchedAluno);
    } catch (err) {
      let error: string | null = null;
      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }
      setAlunoError(error ?? "Ocorreu um erro ao buscar o aluno.");
    } finally {
      setAlunoLoading(false);
    }
  }

  return {
    getAluno,
    alunoLoading,
    alunoError,
    aluno,
  };
}
