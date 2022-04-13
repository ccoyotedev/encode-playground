export interface NavItem {
  href: string;
  title: string;
}

export interface Notification {
  type: "info" | "success" | "error" | "warning";
  title: string;
  message: string;
  options?: NotificationOptions;
}

export interface GlobalNotification extends Notification {
  id: string;
}
