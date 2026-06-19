import { useEffect, useState } from "react";

import type { SumParticipants } from "../types/sumparticipants";
import { apiFetch } from "./apiFetch";

function useSumParticipants() {
  const [participants, setParticipants] = useState<SumParticipants[]>([]);
  useEffect(() => {
    apiFetch("/api/events/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, []);
  return participants;
}

export default useSumParticipants;
