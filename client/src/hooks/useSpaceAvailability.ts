import { useEffect, useState } from "react";
import type { SpaceAvailability } from "../types/availability";

function useSpaceAvailability(
  spaceId: number | undefined,
  date: string,
  timeSlotId: string | number | undefined,
  endDate?: string,
) {
  const [availability, setAvailability] = useState<SpaceAvailability | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasSlotMode = Boolean(timeSlotId);
    const hasRangeMode = Boolean(endDate);

    if (!spaceId || !date || (!hasSlotMode && !hasRangeMode)) {
      setAvailability(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ date });
    if (hasRangeMode) {
      params.set("endDate", endDate as string);
    } else {
      params.set("timeSlotId", String(timeSlotId));
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/api/spaces/${spaceId}/availability?${params.toString()}`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok)
          throw new Error("Impossible de récupérer les disponibilités");
        return res.json();
      })
      .then((data: SpaceAvailability) => setAvailability(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [spaceId, date, timeSlotId, endDate]);

  return { availability, loading, error };
}

export default useSpaceAvailability;
