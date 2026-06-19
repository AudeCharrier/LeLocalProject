// src/hooks/useAuth.ts
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (!token) return null;
  return jwtDecode<{ id: number; email: string; role: string }>(token);
}
