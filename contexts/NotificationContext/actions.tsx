import { Action } from "./reducer";
import { Notification } from "types";
import React from "react";

const installationIdToName = (id: number) => {
  if (id === 0) return "Alchemical Aaltar";
  return `Item Id: ${id}`;
};

export const getRandomId = (): string => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
};

export const showNotificationWithTimeout = (
  dispatch: React.Dispatch<Action>,
  notification: Notification
): void => {
  const id = getRandomId();

  dispatch({
    type: "SHOW_NOTIFICATION",
    notification: {
      ...notification,
      id,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "HIDE_NOTIFICATION",
      id,
    });
  }, 5000);
};

export const showNotification = (
  dispatch: React.Dispatch<Action>,
  notification: Notification
): void => {
  const id = getRandomId();
  dispatch({
    type: "SHOW_NOTIFICATION",
    notification: {
      ...notification,
      id,
    },
  });
};

export const handleCompletedCraft = (
  dispatch: React.Dispatch<Action>,
  ids: number[]
): void => {
  const grouped = ids.reduce((acc: number[][], id) => {
    const index = acc.findIndex((array) => array.includes(id));
    if (index > -1) {
      acc[index].push(id);
    } else {
      acc.push([id]);
    }
    return acc;
  }, []);

  grouped.forEach((group) => {
    showNotificationWithTimeout(dispatch, {
      title: "Completed crafting",
      body: `${installationIdToName(group[0])}${
        group.length > 1 ? ` (x${group.length})` : ""
      }`,
      time: new Date(),
    });
  });

  dispatch({
    type: "UPDATE_INVENTORY_UPDATES",
    inventoryUpdates: ids,
  });
};
