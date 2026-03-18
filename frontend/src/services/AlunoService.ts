import type {
  Aluno,
  CreateAlunoRequest,
  UpdateAlunoRequest,
} from "../types/aluno";
import { api } from "./api";

export async function getAllAlunos(): Promise<Aluno[]> {
  const response = await api.get("/alunos");
  return response.data;
}

export async function createAluno(data: CreateAlunoRequest): Promise<Aluno> {
  const response = await api.post("/alunos", data);
  return response.data;
}

export async function getAlunoById(id: string): Promise<Aluno> {
  const response = await api.get(`/alunos/${id}`);
  return response.data;
}

export async function updateAluno(
  id: string,
  data: UpdateAlunoRequest,
): Promise<Aluno> {
  const response = await api.put(`/alunos/${id}`, data);
  return response.data;
}

export async function deleteAluno(id: string): Promise<void> {
  await api.delete(`/alunos/${id}`);
}
