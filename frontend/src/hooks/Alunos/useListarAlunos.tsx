import { useState } from "react";
import axios from "axios";
import { getAllAlunos } from "../../services/AlunoService";
import type { Aluno } from "../../types/aluno";

export function useListarAlunos() {
  const [alunosLoading, setAlunosLoading] = useState(false);
  const [alunosError, setAlunosError] = useState<string | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  async function getAlunos(): Promise<void> {
    try {
      setAlunosLoading(true);

      const alunos = await getAllAlunos();
      setAlunos(alunos);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setAlunosError(error ?? "Ocorreu um erro ao tentar fazer Alunos.");
    } finally {
      setAlunosLoading(false);
    }
  }

  return {
    getAlunos,
    alunosLoading,
    alunosError,
    alunos,
  };
}
