import { LoginData, RegisterData } from "../context/AuthProvider";
import { UserAttributes } from "../models/user.model";
import { api } from "./api";

const API_URL = "/auth";

export const registerUser = async (user: RegisterData): Promise<void> => {
  await api.post(`${API_URL}/register`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const loginUser = async (
  user: LoginData
): Promise<{ accessToken: string; user: UserAttributes }> => {
  const response = await api.post<{
    accessToken: string;
    user: UserAttributes;
  }>(`${API_URL}/login`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};
