import React, { createContext, useReducer, useContext } from "react";
import { State, initialState } from "./store";
import { Action, reducer } from "./reducer";

const NotificationContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => null,
]);

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = (): [State, React.Dispatch<Action>] =>
  useContext(NotificationContext);

export default NotificationContextProvider;
export { useNotification };
