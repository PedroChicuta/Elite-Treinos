import type {
  Personal,
  CreatePersonalRequest,
  UpdatePersonalRequest,
} from "../types/personal";
import type { Aluno } from "../types/aluno";
import { api } from "./api";

export async function getAllPersonals(): Promise<Personal[]> {
  const response = await api.get("/trainers");
  return response.data;
}

export async function createPersonal(
  data: CreatePersonalRequest,
): Promise<Personal> {
  const response = await api.post("/trainers", data);
  return response.data;
}

export async function getPersonalById(id: string): Promise<Personal> {
  const response = await api.get(`/trainers/${id}`);
  return response.data;
}

export async function updatePersonal(
  id: string,
  data: UpdatePersonalRequest,
): Promise<Personal> {
  const response = await api.put(`/trainers/${id}`, data);
  return response.data;
}

export async function deletePersonal(id: string): Promise<void> {
  await api.delete(`/trainers/${id}`);
}

export async function getAlunosByPersonalId(id: string): Promise<Aluno[]> {
  const response = await api.get(`/trainers/${id}/alunos`);

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data?.alunos ?? [];
}
