import type { LoginRequest } from "../types/loginRequest";
import type { Me, Usuario } from "../types/usuario";
import { api } from "./api";

export async function login(loginInputs: LoginRequest): Promise<Usuario> {
  const response = await api.post("/login", loginInputs);
  return response.data.user;
}

export async function me(): Promise<Me> {
  const response = await api.get("/me");
  return response.data;
}

export async function logout(): Promise<string> {
  const response = await api.post("/logout");
  return response.data;
}
