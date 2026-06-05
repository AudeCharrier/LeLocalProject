import { useEffect, useState } from "react";
import type { BookingHistory } from "../types/booking";

function useBillingClient(userId: number) {
  const [billing, setBilling] = useState<BookingHistory[]>([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/dashboard/client/${userId}/billing`,
    )
      .then((res) => res.json())
      .then((data) => setBilling(data));
  }, [userId]);

  return billing;
}

export default useBillingClient;
