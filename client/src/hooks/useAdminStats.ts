import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type AdminStats = {
  occupancy_rate: number;
  bookings_count: number;
  active_members: number;
};

function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    occupancy_rate: 0,
    bookings_count: 0,
    active_members: 0,
  });

  useEffect(() => {
    apiFetch("/api/dashboard/admin/stats")
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setStats(data);
        }
      });
  }, []);

  return stats;
}

export default useAdminStats;
