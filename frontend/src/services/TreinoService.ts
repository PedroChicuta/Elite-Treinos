import type { Treino } from "../types/treino";
import { api } from "./api";

export async function getAllTreinos(): Promise<Treino[]> {
  const response = await api.get("/treinos");
  return response.data;
}

export async function getTreinosByAlunoId(idAluno: string): Promise<Treino[]> {
  const response = await api.get(`/alunos/${idAluno}/treinos`);
  return response.data;
}

export async function vincularTreinoAoAluno(
  idAluno: string,
  idTreino: string,
): Promise<Treino> {
  const response = await api.post(`/alunos/${idAluno}/treinos/${idTreino}`);
  return response.data;
}

export async function desvincularTreinoDoAluno(
  idAluno: string,
  idTreino: string,
): Promise<{ message: string }> {
  const response = await api.delete(`/alunos/${idAluno}/treinos/${idTreino}`);
  return response.data;
}
