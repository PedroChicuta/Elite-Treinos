import type { Personal } from "./personal";
import type { Usuario } from "./usuario";

export interface Aluno {
  id_aluno: number;
  data_nascimento: string | null;
  observacao: string | null;
  usuario: Usuario;
  personal?: Personal | null;
  dth_criacao?: string;
  dth_atualizacao?: string;
}

export interface CreateAlunoRequest {
  nome: string;
  email: string;
  senha: string;
  id_personal?: number | null;
  data_nascimento: string | null;
  observacao?: string | null;
}

export type UpdateAlunoRequest = Partial<CreateAlunoRequest>;
