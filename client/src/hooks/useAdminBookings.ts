import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";

function useAdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/admin/bookings`)
      .then((response) => response.json())
      .then((data: Booking[]) => setBookings(data));
  }, []);

  return bookings;
}

export default useAdminBookings;
