import type { Usuario } from "./usuario";

export interface SuperAdmin {
  id_super_admin: number;
  usuario: Usuario;
  dth_criacao?: string;
  dth_atualizacao?: string;
}
