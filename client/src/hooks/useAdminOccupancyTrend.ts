import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type OccupancyTrendPoint = {
  day: string;
  rate: number;
};

function useAdminOccupancyTrend(selectedDate: string) {
  const [trend, setTrend] = useState<OccupancyTrendPoint[]>([]);

  useEffect(() => {
    apiFetch(`/api/dashboard/admin/occupancy-trend?date=${selectedDate}`)
      .then((response) => response.json())
      .then((data: OccupancyTrendPoint[]) =>
        setTrend(Array.isArray(data) ? data : []),
      );
  }, [selectedDate]);

  return trend;
}

export default useAdminOccupancyTrend;
