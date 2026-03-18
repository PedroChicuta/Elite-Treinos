import type { Treino } from "./treino";

export interface TreinoExercicioPivot {
  id_treino: number;
  id_exercicio: number;
  ordem_exercicio: number;
  series: string;
  repeticoes_tempo: string;
  observacao?: string | null;
  dth_criacao?: string;
  dth_atualizacao?: string | null;
}

export interface Exercicio {
  id_exercicio: number;
  nome_exercicio: string;
  treinos?: Treino[];
  pivot?: TreinoExercicioPivot;
  dth_criacao?: string;
  dth_atualizacao?: string | null;
}

export interface CreateExercicioRequest {
  nome_exercicio: string;
}

export type UpdateExercicioRequest = Partial<CreateExercicioRequest>;