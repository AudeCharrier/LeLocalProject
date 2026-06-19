import { useEffect, useState } from "react";
import type { TimeSlot } from "../types/time-slot";
import { apiFetch } from "./apiFetch";

function useTimeSlot() {
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  useEffect(() => {
    apiFetch("/api/timeslots")
      .then((res) => res.json())
      .then((data) => setTimeSlot(data));
  }, []);

  return timeSlot;
}

export default useTimeSlot;
