import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type AdminStats = {
  occupancy_rate: number;
  bookings_count: number;
  active_members: number;
  claims_count: number;
};

function useAdminStats(selectedDate: string) {
  const [stats, setStats] = useState<AdminStats>({
    occupancy_rate: 0,
    bookings_count: 0,
    active_members: 0,
    claims_count: 0,
  });

  useEffect(() => {
    apiFetch(`/api/dashboard/admin/stats?date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setStats(data);
        }
      });
  }, [selectedDate]);

  return stats;
}

export default useAdminStats;
