// src/hooks/useAuth.ts
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const getUser = () => {
  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (!token) return null;
  return jwtDecode<{
    id: number;
    email: string;
    role: string;
    firstname: string;
  }>(token);
};
export function useAuth() {
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    const handleStorage = () => setUser(getUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return user;
}
