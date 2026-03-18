import { useState } from "react";
import axios from "axios";
import { vincularTreinoAoAluno } from "../../services/TreinoService";

export function useVincularTreinoAluno() {
  const [vinculoLoading, setVinculoLoading] = useState(false);
  const [vinculoError, setVinculoError] = useState<string | null>(null);

  async function vincularTreino(idAluno: string, idTreino: string) {
    try {
      setVinculoLoading(true);
      setVinculoError(null);
      await vincularTreinoAoAluno(idAluno, idTreino);
      return true;
    } catch (err) {
      let error = "Ocorreu um erro ao tentar vincular o treino ao aluno.";

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message ?? error;
      }

      setVinculoError(error);
      return false;
    } finally {
      setVinculoLoading(false);
    }
  }

  return {
    vincularTreino,
    vinculoLoading,
    vinculoError,
  };
}
