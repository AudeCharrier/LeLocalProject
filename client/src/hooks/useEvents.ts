import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";

function useEvents(userId: number, type: "past" | "upcoming") {
  const [events, setEvents] = useState<Activity[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/dashboard/client/${userId}/events/${type}`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [userId, type]);

  return events;
}

export default useEvents;
