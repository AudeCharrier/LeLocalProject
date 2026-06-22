import { useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";

type AdminNotification = {
  id: number;
  title: string;
  detail: string;
  variant: "warning";
};

function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    apiFetch("/api/dashboard/admin/claims")
      .then((response) => response.json())
      .then((data: AdminNotification[]) => setNotifications(data));
  }, []);

  return notifications;
}

export default useAdminNotifications;
