import { useEffect, useState } from "react";

type Stats = {
  bookings_count: number;
  events_count: string;
  total_spent: string;
};

function useStatsClient(userId: number) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/dashboard/client/${userId}/stats`,
    )
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [userId]);

  return stats;
}

export default useStatsClient;
