import { useEffect, useState } from "react";
import type { TimeSlot } from "../types/time-slot";

function useTimeSlot() {
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/timeslots`)
      .then((res) => res.json())
      .then((data) => setTimeSlot(data));
  }, []);

  return timeSlot;
}

export default useTimeSlot;
