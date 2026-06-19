import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";
import { apiFetch } from "./apiFetch";

function useUpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<Activity[]>([]);
  useEffect(() => {
    apiFetch("/api/events/")
      .then((res) => res.json())
      .then((data) => setUpcomingEvents(data));
  }, []);
  return upcomingEvents;
}

export default useUpcomingEvents;
