import { useEffect, useState } from "react";
import type { AdminClaim } from "../types/claim";
import { apiFetch } from "./apiFetch";

function useAdminClaims() {
  const [claims, setClaims] = useState<AdminClaim[]>([]);

  useEffect(() => {
    apiFetch("/api/dashboard/admin/claims")
      .then((response) => response.json())
      .then((data: AdminClaim[]) => setClaims(Array.isArray(data) ? data : []));
  }, []);

  return claims;
}

export default useAdminClaims;
