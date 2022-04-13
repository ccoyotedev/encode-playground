import { State } from "./store";
import { Notification } from "types";

interface GlobalNotification extends Notification {
  id: string;
}

export type Action =
  | { type: "SHOW_NOTIFICATION"; notification: GlobalNotification }
  | { type: "HIDE_NOTIFICATION"; id: string }
  | {
      type: "UPDATE_INVENTORY_UPDATES";
      inventoryUpdates: State["inventoryUpdates"];
    }
  | { type: "REMOVE_INVENTORY_NOTIFICATION" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item.id !== action.id
        ),
      };
    case "UPDATE_INVENTORY_UPDATES": {
      return {
        ...state,
        inventoryUpdates: [
          ...state.inventoryUpdates,
          ...action.inventoryUpdates,
        ],
      };
    }
    case "REMOVE_INVENTORY_NOTIFICATION": {
      return {
        ...state,
        inventoryUpdates: [],
      };
    }
    default:
      return state;
  }
};
