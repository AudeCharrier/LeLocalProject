import { useEffect, useState } from "react";
import type { BookingHistory } from "../types/booking";

function useInvoice(bookingId: number) {
  const [invoice, setInvoice] = useState<BookingHistory | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/invoice/${bookingId}`)
      .then((res) => res.json())
      .then((date: BookingHistory) => setInvoice(date));
  }, [bookingId]);

  return invoice;
}

export default useInvoice;
