export interface NavItem {
  href: string;
  title: string;
}

export interface Notification {
  title: string;
  message: string;
}

export interface GlobalNotification extends Notification {
  id: string;
}
