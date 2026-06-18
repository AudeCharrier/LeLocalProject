import type { Claim } from "../types/claim";
import { apiFetch } from "./apiFetch";

function useCreateClaim() {
  async function createClaim(data: Claim) {
    const response = await apiFetch("/api/dashboard/client/2/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return { createClaim };
}

export default useCreateClaim;
