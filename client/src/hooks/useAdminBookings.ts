import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";
import { apiFetch } from "./apiFetch";

function useAdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    apiFetch("/api/dashboard/admin/bookings")
      .then((response) => response.json())
      .then((data: Booking[]) => setBookings(Array.isArray(data) ? data : []));
  }, []);

  return bookings;
}

export default useAdminBookings;
