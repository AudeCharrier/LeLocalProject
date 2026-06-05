import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";

function useUpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<Activity[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/`)
      .then((res) => res.json())
      .then((data) => setUpcomingEvents(data));
  }, []);
  return upcomingEvents;
}

export default useUpcomingEvents;
