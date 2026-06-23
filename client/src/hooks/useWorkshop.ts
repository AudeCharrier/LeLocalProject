import { useEffect, useState } from "react";
import type { Activity } from "../types/activity";
import { apiFetch } from "./apiFetch";

function useWorkshop() {
  const [workshop, setWorkshop] = useState<Activity[]>([]);
  useEffect(() => {
    apiFetch("/api/activity")

      .then((res) => res.json())
      .then((data) => setWorkshop(data));
  }, []);

  return workshop;
}

export default useWorkshop;
