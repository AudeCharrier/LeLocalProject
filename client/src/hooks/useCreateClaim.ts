import type { Claim } from "../types/claim";

function useCreateClaim() {
  async function createClaim(data: Claim) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/dashboard/client/2/claims`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return response.json();
  }

  return { createClaim };
}

export default useCreateClaim;
