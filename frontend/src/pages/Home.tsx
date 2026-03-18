import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { TreinoCard } from "../components/TreinoCard";
import { useListarTreinosAluno } from "../hooks/Treinos/useListarTreinosAluno";

export function Home() {
  const { usuario } = useAuth();
  const {
    getTreinosAluno,
    treinosAluno,
    treinosAlunoLoading,
    treinosAlunoError,
  } = useListarTreinosAluno();

  useEffect(() => {
    if (usuario?.is_aluno && usuario.id_aluno) {
      getTreinosAluno(usuario.id_aluno.toString());
    }
  }, [usuario]);

  if (usuario?.is_aluno && treinosAlunoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (usuario?.is_aluno && !usuario.id_aluno) {
    return <p>Nao foi possivel identificar o aluno logado.</p>;
  }

  if (usuario?.is_aluno && treinosAlunoError) {
    return <p>{treinosAlunoError}</p>;
  }

  if (usuario?.is_aluno) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Bem-vindo ao Elite Treinos, {usuario.nome}!</h2>
          <p>Seu aplicativo de gerenciamento de treinos e exercicios.</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">Seus treinos</h3>

          {treinosAluno.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {treinosAluno.map((treino) => (
                <TreinoCard key={treino.id_treino} treino={treino} />
              ))}
            </div>
          ) : (
            <p>Voce ainda não possui treinos vinculados.</p>
          )}
        </section>
      </div>
    );
  }

  return (
    <div>
      <h2>Bem-vindo ao Elite Treinos, {usuario?.nome}!</h2>
      <p>Seu aplicativo de gerenciamento de treinos e exercicios.</p>
    </div>
  );
}
