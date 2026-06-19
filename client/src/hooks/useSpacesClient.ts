import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";
import { apiFetch } from "./apiFetch";

function useSpacesClient(userId: number, type: "past" | "upcoming") {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    apiFetch(`/api/dashboard/client/${userId}/bookings/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
      });
  }, [userId, type]);

  return bookings;
}

export default useSpacesClient;
