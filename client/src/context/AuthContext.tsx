// src/context/AuthContext.tsx
import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext<{
  id: number;
  email: string;
  role: string;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
