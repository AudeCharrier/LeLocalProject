import { useEffect, useState } from "react";
import type { BookingHistory } from "../types/booking";
import { apiFetch } from "./apiFetch";

function useInvoice(bookingId: number) {
  const [invoice, setInvoice] = useState<BookingHistory | null>(null);

  useEffect(() => {
    apiFetch(`/api/invoice/${bookingId}`)
      .then((res) => res.json())
      .then((data: BookingHistory) => setInvoice(data));
  }, [bookingId]);

  return invoice;
}

export default useInvoice;
