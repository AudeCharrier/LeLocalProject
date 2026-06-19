import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";
import { apiFetch } from "./apiFetch";

function useEventsClient(userId: number, type: "past" | "upcoming") {
  const [events, setEvents] = useState<Activity[]>([]);

  useEffect(() => {
    apiFetch(`/api/dashboard/client/${userId}/events/${type}`)

      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []));
  }, [userId, type]);

  return events;
}

export default useEventsClient;
