import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";

function useWorkshop() {
  const [workshop, setWorkshop] = useState<Activity[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activity`)

      .then((res) => res.json())
      .then((data) => setWorkshop(data));
  }, []);

  return workshop;
}

export default useWorkshop;
