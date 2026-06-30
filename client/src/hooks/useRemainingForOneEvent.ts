import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

function useRemainingForOneEvent() {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    apiFetch("/api/events/:id/remaining")
      .then((response) => response.json())
      .then((data: number) => setRemaining(data));
  }, []);

  return remaining;
}

export default useRemainingForOneEvent;
