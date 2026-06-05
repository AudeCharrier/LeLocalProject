import { useEffect, useState } from "react";

type SumParticipants = {
  activity_id: number;
  name: string;
  sum_participants: number;
  capacity: number;
};
function useSumParticipants() {
  const [participants, setParticipants] = useState<SumParticipants[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/participants`)
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, []);
  return participants;
}

export default useSumParticipants;
