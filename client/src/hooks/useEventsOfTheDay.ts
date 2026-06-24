import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";
import { apiFetch } from "./apiFetch";

function useEventsOfTheDay(dateFormatted: string | null) {
  const [eventsOfTheDay, setEventsOfTheDay] = useState<Activity[]>([]);

  useEffect(() => {
    if (!dateFormatted) {
      setEventsOfTheDay([]);
      return;
    }

    apiFetch(`/api/events/${dateFormatted}`)
      .then((res) => res.json())
      .then((data) => setEventsOfTheDay(data))
      .catch((err) => console.error("Erreur fetch events:", err));
  }, [dateFormatted]);

  return eventsOfTheDay;
}

export default useEventsOfTheDay;
