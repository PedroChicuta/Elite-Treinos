import { useState } from "react";
import axios from "axios";
import { desvincularTreinoDoAluno } from "../../services/TreinoService";

export function useDesvincularTreinoAluno() {
  const [desvinculoLoading, setDesvinculoLoading] = useState(false);
  const [desvinculoError, setDesvinculoError] = useState<string | null>(null);

  async function desvincularTreino(idAluno: string, idTreino: string) {
    try {
      setDesvinculoLoading(true);
      setDesvinculoError(null);
      await desvincularTreinoDoAluno(idAluno, idTreino);
      return true;
    } catch (err) {
      let error = "Ocorreu um erro ao tentar desvincular o treino do aluno.";

      if (axios.isAxiosError(err)) {
        error = err.response?.data.message ?? error;
      }

      setDesvinculoError(error);
      return false;
    } finally {
      setDesvinculoLoading(false);
    }
  }

  return {
    desvincularTreino,
    desvinculoLoading,
    desvinculoError,
  };
}
