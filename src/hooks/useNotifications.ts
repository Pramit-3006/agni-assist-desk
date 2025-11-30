import { useState, useEffect } from "react";

interface UseNotificationsReturn {
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (title: string, options?: NotificationOptions) => void;
  isSupported: boolean;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const isSupported = "Notification" in window;

  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) return "denied";

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return "denied";
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== "granted") return;

    new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options,
    });
  };

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported,
  };
};
