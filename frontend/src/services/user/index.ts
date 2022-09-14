import { AxiosResponse } from "axios";
import api from "..";

export const login = (username: string, password: string) =>
  api.post<{ access_token: string }>("/auth/login", { username, password });

export const signUp = (
  username: string,
  password: string
): Promise<AxiosResponse<any>> =>
  api.post("/auth/create", { username, password });
