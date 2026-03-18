import type { Aluno } from "./aluno";
import type { Exercicio } from "./exercicio";

export type CodigoTreino = "A" | "B" | "C" | "D";

export interface AlunoTreinoPivot {
  id_aluno: number;
  id_treino: number;
  dth_criacao?: string;
  dth_atualizacao?: string | null;
}

export interface Treino {
  id_treino: number;
  codigo_treino: CodigoTreino;
  nome_treino: string;
  objetivo: string;
  exercicios?: Exercicio[];
  alunos?: Aluno[];
  pivot?: AlunoTreinoPivot;
  dth_criacao?: string;
  dth_atualizacao?: string | null;
}

export interface CreateTreinoRequest {
  codigo_treino: CodigoTreino;
  nome_treino: string;
  objetivo: string;
}

export type UpdateTreinoRequest = Partial<CreateTreinoRequest>;
