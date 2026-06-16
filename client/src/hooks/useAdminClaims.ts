import { useEffect, useState } from "react";
import type { AdminClaim } from "../types/claim";

function useAdminClaims() {
  const [claims, setClaims] = useState<AdminClaim[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/admin/claims`)
      .then((response) => response.json())
      .then((data: AdminClaim[]) => setClaims(data));
  }, []);

  return claims;
}

export default useAdminClaims;
