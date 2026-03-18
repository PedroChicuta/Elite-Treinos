import { useState } from "react";
import axios from "axios";
import { getAlunosByPersonalId } from "../../services/PersonalService";
import type { Aluno } from "../../types/aluno";

export function useListarAlunosPersonal() {
  const [alunosPersonalLoading, setAlunosPersonalLoading] = useState(false);
  const [alunosPersonalError, setAlunosPersonalError] = useState<string | null>(
    null,
  );
  const [alunosPersonal, setAlunosPersonal] = useState<Aluno[]>([]);

  async function getAlunosPersonal(id: string): Promise<void> {
    try {
      setAlunosPersonalLoading(true);

      const alunos = await getAlunosByPersonalId(id);
      setAlunosPersonal(alunos);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setAlunosPersonalError(
        error ?? "Ocorreu um erro ao tentar buscar os alunos do personal.",
      );
    } finally {
      setAlunosPersonalLoading(false);
    }
  }

  return {
    getAlunosPersonal,
    alunosPersonalLoading,
    alunosPersonalError,
    alunosPersonal,
  };
}
