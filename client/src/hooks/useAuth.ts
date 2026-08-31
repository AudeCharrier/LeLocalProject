// src/hooks/useAuth.ts
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
const TOKEN_EVENT = "authTokenChange";

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
    const handleChange = () => setUser(getUser());
    // "storage" = déclenché par les AUTRES onglets
    window.addEventListener("storage", handleChange);
    // "authTokenChange" = déclenché dans CE MÊME onglet par setToken/clearToken
    window.addEventListener(TOKEN_EVENT, handleChange);
    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener(TOKEN_EVENT, handleChange);
    };
  }, []);

  return user;
}
