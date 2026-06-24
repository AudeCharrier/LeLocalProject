import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type EventRequest = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  space_name: string;
  start_hour: string;
  end_hour: string;
  firstname: string;
  lastname: string;
};

function useAdminEventRequests() {
  const [requests, setRequests] = useState<EventRequest[]>([]);

  useEffect(() => {
    apiFetch("/api/dashboard/admin/event-requests")
      .then((res) => res.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []));
  }, []);

  return { requests, setRequests };
}

export default useAdminEventRequests;
