import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type Stats = {
  bookings_count: number;
  events_count: string;
  total_spent: string;
};

function useStatsClient(userId: number) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch(`/api/dashboard/client/${userId}/stats`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setStats(data);
        }
      });
  }, [userId]);

  return stats;
}

export default useStatsClient;
