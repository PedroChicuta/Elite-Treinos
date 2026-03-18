import { useState } from "react";
import type { Aluno, UpdateAlunoRequest } from "../../types/aluno";
import { updateAluno as updateAlunoService } from "../../services/AlunoService";
import axios from "axios";

export function useUpdateAluno() {
  const [updateAlunoLoading, setUpdateAlunoLoading] = useState(false);
  const [updateAlunoError, setUpdateAlunoError] = useState<string | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);

  async function updateAluno(
    id: string,
    alunoData: Partial<Omit<Aluno, "id_aluno">>,
  ) {
    try {
      setUpdateAlunoLoading(true);

      const aluno: Partial<UpdateAlunoRequest> = {
        nome: alunoData.usuario?.nome,
        email: alunoData.usuario?.email,
        data_nascimento: alunoData.data_nascimento,
        observacao: alunoData.observacao,
        senha: alunoData.usuario?.senha,
      };

      const updatedAluno = await updateAlunoService(id, aluno);

      setAluno(updatedAluno);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setUpdateAlunoError(
        error ?? "Ocorreu um erro ao tentar atualizar o Aluno.",
      );
    } finally {
      setUpdateAlunoLoading(false);
    }
  }

  return {
    updateAluno,
    updateAlunoLoading,
    updateAlunoError,
    aluno,
  };
}
