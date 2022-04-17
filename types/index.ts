import React from "react";

export interface NavItem {
  href: string;
  title: string;
}

export interface Notification {
  title: string;
  body: string | React.ReactNode;
  clipboard?: string;
  time: Date;
  type?: "DB" | "CHAIN";
}

export interface GlobalNotification extends Notification {
  id: string;
}
