import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import Loader from "../../components/Loader";
import { useListarTreinos } from "../../hooks/Treinos/useListarTreinos";
import { useListarTreinosAluno } from "../../hooks/Treinos/useListarTreinosAluno";
import { useVincularTreinoAluno } from "../../hooks/Treinos/useVincularTreinoAluno";
import { useDesvincularTreinoAluno } from "../../hooks/Treinos/useDesvincularTreinoAluno";

const MAX_TREINOS_VINCULADOS = 2;

export function ListarTreinosAluno() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  const { getTreinos, treinos, treinosError, treinosLoading } =
    useListarTreinos();
  const {
    getTreinosAluno,
    treinosAluno,
    treinosAlunoError,
    treinosAlunoLoading,
  } = useListarTreinosAluno();
  const { vincularTreino, vinculoLoading, vinculoError } =
    useVincularTreinoAluno();
  const { desvincularTreino, desvinculoLoading, desvinculoError } =
    useDesvincularTreinoAluno();

  const idsTreinosVinculados = useMemo(
    () => new Set(treinosAluno.map((treino) => treino.id_treino)),
    [treinosAluno],
  );
  const limiteVinculosAtingido = useMemo(
    () => treinosAluno.length >= MAX_TREINOS_VINCULADOS,
    [treinosAluno],
  );

  useEffect(() => {
    if (!id) {
      setError("Aluno nao informado.");
      return;
    }

    setError(null);
    getTreinos();
    getTreinosAluno(id);
  }, [id]);

  const handleVincularTreino = async (idTreino: number) => {
    if (!id) {
      setError("Aluno nao informado.");
      return;
    }

    if (limiteVinculosAtingido) {
      return;
    }

    const vinculou = await vincularTreino(id, idTreino.toString());

    if (vinculou) {
      getTreinosAluno(id);
    }
  };

  const handleDesvincularTreino = async (idTreino: number) => {
    if (!id) {
      setError("Aluno nao informado.");
      return;
    }

    const desvinculou = await desvincularTreino(id, idTreino.toString());

    if (desvinculou) {
      getTreinosAluno(id);
    }
  };

  const formatarExercicios = (nomesExercicios: string[] | undefined) => {
    if (!nomesExercicios || nomesExercicios.length === 0) {
      return "-";
    }

    return nomesExercicios.join(", ");
  };

  if (treinosLoading || treinosAlunoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || treinosError || treinosAlunoError) {
    return <p>{error ?? treinosError ?? treinosAlunoError}</p>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vincular treinos ao aluno</h1>
        <Link
          to="/alunos"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Voltar para alunos
        </Link>
      </div>

      {vinculoError && <p className="mb-4 text-red-600">{vinculoError}</p>}
      {desvinculoError && (
        <p className="mb-4 text-red-600">{desvinculoError}</p>
      )}
      {limiteVinculosAtingido && (
        <p className="mb-4 text-yellow-700">
          Limite de {MAX_TREINOS_VINCULADOS} treinos vinculados atingido. Para
          vincular um novo treino, desvincule outro antes.
        </p>
      )}

      <DataTable
        columns={[
          {
            header: "Codigo",
            accessor: "codigo_treino",
          },
          {
            header: "Nome",
            accessor: "nome_treino",
          },
          {
            header: "Objetivo",
            accessor: "objetivo",
          },
          {
            header: "Exercicios",
            render: (treino) =>
              formatarExercicios(
                treino.exercicios?.map((exercicio) => exercicio.nome_exercicio),
              ),
          },
          {
            header: "Acoes",
            render: (treino) => {
              const treinoVinculado = idsTreinosVinculados.has(
                treino.id_treino,
              );
              const acaoLoading = vinculoLoading || desvinculoLoading;
              const bloquearNovoVinculo =
                !treinoVinculado && limiteVinculosAtingido;

              return (
                <button
                  onClick={() =>
                    treinoVinculado
                      ? handleDesvincularTreino(treino.id_treino)
                      : handleVincularTreino(treino.id_treino)
                  }
                  disabled={acaoLoading || bloquearNovoVinculo}
                  className={`px-3 py-1 rounded text-white font-semibold ${
                    bloquearNovoVinculo
                      ? "bg-gray-400 cursor-not-allowed"
                      : treinoVinculado
                        ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                        : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                  }`}
                >
                  {treinoVinculado ? "Desvincular" : "Vincular"}
                </button>
              );
            },
          },
        ]}
        data={treinos}
      />
    </div>
  );
}
