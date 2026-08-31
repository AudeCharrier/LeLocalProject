// src/context/AuthContext.tsx
import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
const TOKEN_EVENT = "authTokenChange";
// Centralise l'écriture du token + prévient le contexte
export function setToken(token: string, persist: boolean) {
  if (persist) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

export function clearToken() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

const AuthContext = createContext<{
  id: number;
  email: string;
  role: string;
  firstname: string;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
