export interface Usuario {
  id_usuario?: number;
  nome: string;
  email: string;
  senha?: string;
  dth_criacao?: string;
  dth_atualizacao?: string;
}

export interface Me {
  id_usuario: string;
  nome: string;
  email: string;
  tipo_usuario: string;
  is_super_admin: boolean;
  is_personal: boolean;
  is_aluno: boolean;
}