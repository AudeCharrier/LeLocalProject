import type { Claim } from "../types/claim";
import { apiFetch } from "./apiFetch";

function useCreateClaim() {
  async function createClaim(userId: number, data: Claim) {
    const response = await apiFetch(`/api/dashboard/client/${userId}/claims`, {
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
