import type { Usuario } from "./usuario";

export interface Personal {
  id_personal: number;
  telefone: string;
  cref: string | null;
  usuario: Usuario;
  dth_criacao?: string;
  dth_atualizacao?: string;
}

export interface CreatePersonalRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cref: string;
}

export interface UpdatePersonalRequest {
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  cref?: string;
}
