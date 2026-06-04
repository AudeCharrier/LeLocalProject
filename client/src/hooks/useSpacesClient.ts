import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";

function useBookingsClient(userId: number, type: "past" | "upcoming") {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/dashboard/client/${userId}/bookings/${type}`,
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [userId, type]);

  return bookings;
}

export default useBookingsClient;
