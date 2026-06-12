import { useEffect, useState } from "react";

type AdminStats = {
  occupancy_rate: number;
  bookings_count: number;
  active_members: number;
  claims_count: number;
};

function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    occupancy_rate: 0,
    bookings_count: 0,
    active_members: 0,
    claims_count: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/admin/stats`)
      .then((response) => response.json())
      .then((data: AdminStats) => setStats(data));
  }, []);

  return stats;
}

export default useAdminStats;
