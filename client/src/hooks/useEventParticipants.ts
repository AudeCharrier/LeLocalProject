import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type EventParticipant = {
  id_activity: number;
  name: string;
  sum_participants: string;
  capacity: number;
};

function useEventParticipants() {
  const [participants, setParticipants] = useState<EventParticipant[]>([]);

  useEffect(() => {
    apiFetch("/api/events/participants")
      .then((response) => response.json())
      .then((data: EventParticipant[]) => setParticipants(data));
  }, []);

  return participants;
}

export default useEventParticipants;
