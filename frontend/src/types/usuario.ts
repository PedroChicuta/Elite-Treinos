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
  id_aluno?: number | null;
  id_personal?: number | null;
  id_super_admin?: number | null;
  nome: string;
  email: string;
  tipo_usuario: string;
  is_super_admin: boolean;
  is_personal: boolean;
  is_aluno: boolean;
}
