import type { Exercicio } from "../types/exercicio";
import type { Treino } from "../types/treino";

type TreinoCardProps = {
  treino: Treino;
};

function formatarData(data?: string | null): string {
  if (!data) {
    return "-";
  }

  const dataSemHora = data.substring(0, 10);
  const [ano, mes, dia] = dataSemHora.split("-");

  if (!ano || !mes || !dia) {
    return "-";
  }

  return `${dia}/${mes}/${ano}`;
}

function renderExercicioDetalhes(exercicio: Exercicio): string {
  const detalhes: string[] = [];

  if (exercicio.pivot?.ordem_exercicio) {
    detalhes.push(`ordem ${exercicio.pivot.ordem_exercicio}`);
  }

  if (exercicio.pivot?.series) {
    detalhes.push(`series ${exercicio.pivot.series}`);
  }

  if (exercicio.pivot?.repeticoes_tempo) {
    detalhes.push(`repeticoes/tempo ${exercicio.pivot.repeticoes_tempo}`);
  }

  if (exercicio.pivot?.observacao) {
    detalhes.push(`obs: ${exercicio.pivot.observacao}`);
  }

  if (detalhes.length === 0) {
    return "";
  }

  return ` (${detalhes.join(" | ")})`;
}

export function TreinoCard({ treino }: TreinoCardProps) {
  return (
    <article className="w-full rounded-2xl shadow-md border border-yellow-500 bg-white overflow-hidden">
      <div className="bg-yellow-400 px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold">Treino {treino.codigo_treino}</span>
        <span className="text-white text-sm font-semibold">
          {treino.exercicios?.length ?? 0} exercicio(s)
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{treino.nome_treino}</h3>

        <div>
          <p className="text-sm text-gray-500 font-semibold">Objetivo</p>
          <p className="text-gray-800">{treino.objetivo}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-semibold">Exercicios</p>
          {treino.exercicios && treino.exercicios.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-800 space-y-1">
              {treino.exercicios.map((exercicio) => (
                <li key={exercicio.id_exercicio}>
                  {exercicio.nome_exercicio}
                  {renderExercicioDetalhes(exercicio)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Nenhum exercicio vinculado.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500 font-semibold">Criado em</p>
            <p className="text-gray-800">{formatarData(treino.dth_criacao)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Atualizado em</p>
            <p className="text-gray-800">{formatarData(treino.dth_atualizacao)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}