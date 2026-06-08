import { useEffect, useState } from "react";
import type { Space } from "../types/space";

function useSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/spaces`)
      .then((res) => res.json())
      .then((data) => setSpaces(data));
  }, []);
  console.log(spaces);
  return spaces;
}

export default useSpaces;
