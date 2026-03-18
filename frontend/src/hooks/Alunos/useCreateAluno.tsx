import { useState } from "react";
import type { Aluno } from "../../types/aluno";
import { createAluno as createAlunoService } from "../../services/AlunoService";
import axios from "axios";
import { type CreateAlunoRequest } from "../../types/aluno";

export function useCreateAluno() {
  const [createAlunoLoading, setCreateAlunoLoading] = useState(false);
  const [createAlunoError, setCreateAlunoError] = useState<string | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);

  async function createAluno(alunoData: Omit<Aluno, "id_aluno">) {
    try {
      setCreateAlunoLoading(true);

      if (!alunoData.usuario.senha) {
        setCreateAlunoError("A senha é obrigatória para criar um aluno.");
        return;
      }

      const aluno: CreateAlunoRequest = {
        nome: alunoData.usuario.nome,
        email: alunoData.usuario.email,
        data_nascimento: alunoData.data_nascimento,
        observacao: alunoData.observacao,
        senha: alunoData.usuario.senha,
      };

      const createdAluno = await createAlunoService(aluno);
      setAluno(createdAluno);
    } catch (err) {
      let error: string | null = null;

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message;
      }

      setCreateAlunoError(error ?? "Ocorreu um erro ao tentar criar o Aluno.");
    } finally {
      setCreateAlunoLoading(false);
    }
  }

  return {
    createAluno,
    createAlunoLoading,
    createAlunoError,
    aluno,
  };
}
