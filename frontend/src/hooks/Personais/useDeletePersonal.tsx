import { useState } from "react";
import { deletePersonal } from "../../services/PersonalService";

export function useDeletePersonal() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deletePersonalById = async (id: string) => {
    try {
      setLoading(true);
      await deletePersonal(id);
      setError(null);
    } catch (err) {
      setError("Falha ao excluir o personal.");
    } finally {
      setLoading(false);
    }
  };

  return { deletePersonalById, error, loading };
}
