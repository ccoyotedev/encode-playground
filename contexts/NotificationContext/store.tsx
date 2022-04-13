import { GlobalNotification } from "types";

export interface State {
  notifications: GlobalNotification[];
  inventoryUpdates: number[];
}

export const initialState: State = {
  notifications: [],
  inventoryUpdates: [],
};
