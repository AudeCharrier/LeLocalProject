import { useEffect, useState } from "react";
import type { Space } from "../types/space";
import { apiFetch } from "./apiFetch";

function useSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  useEffect(() => {
    apiFetch("/api/spaces")
      .then((res) => res.json())
      .then((data) => setSpaces(data));
  }, []);
  return spaces;
}

export default useSpaces;
