import { useEffect, useState } from "react";

type AdminNotification = {
  id: number;
  title: string;
  detail: string;
  variant: "warning";
};

function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/admin/claims`)
      .then((response) => response.json())
      .then((data: AdminNotification[]) => setNotifications(data));
  }, []);

  return notifications;
}

export default useAdminNotifications;
