import { useEffect, useState } from "react";

import type { Participants } from "../types/participants";
import { apiFetch } from "./apiFetch";

function useParticipants() {
  const [participants, setParticipants] = useState<Participants[]>([]);
  useEffect(() => {
    apiFetch("/api/events/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, []);
  return participants;
}

export default useParticipants;
