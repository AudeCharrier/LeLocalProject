import { useEffect, useState } from "react";

type EventParticipant = {
  id_activity: number;
  name: string;
  sum_participants: string;
  capacity: number;
};

function useEventParticipants() {
  const [participants, setParticipants] = useState<EventParticipant[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/participants`)
      .then((response) => response.json())
      .then((data: EventParticipant[]) => setParticipants(data));
  }, []);

  return participants;
}

export default useEventParticipants;
