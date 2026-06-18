import { useEffect, useState } from "react";
import type { BookingHistory } from "../types/booking";
import { apiFetch } from "./apiFetch";

function useBillingClient(userId: number) {
  const [billing, setBilling] = useState<BookingHistory[]>([]);

  useEffect(() => {
    apiFetch(`/api/dashboard/client/${userId}/billing`)
      .then((res) => res.json())
      .then((data) => setBilling(data));
  }, [userId]);

  return billing;
}

export default useBillingClient;
