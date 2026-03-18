import { useState } from "react";
import { deleteAluno } from "../../services/AlunoService";

export function useDeleteAluno() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteAlunoById = async (id: string) => {
    try {
      setLoading(true);
      await deleteAluno(id);
      setError(null);
    } catch (err) {
      setError("Falha ao excluir o aluno.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteAlunoById, error, loading };
}
