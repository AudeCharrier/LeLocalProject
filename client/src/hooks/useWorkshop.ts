import { useEffect, useState } from "react";
import type { Space } from "../types/space";
import { apiFetch } from "./apiFetch";

function useWorkshop() {
  const [workshop, setWorkshop] = useState<Space[]>([]);
  useEffect(() => {
    apiFetch("/api/spaces?category=Atelier")

      .then((res) => res.json())
      .then((data) => setWorkshop(data));
  }, []);

  return workshop;
}

export default useWorkshop;
