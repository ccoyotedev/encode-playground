import { Sidetray } from "components/ui/molecules";
import { ChainIcon, ServerIcon } from "assets/icons";
import { useNotification } from "contexts/NotificationContext";
import styles from "./styles.module.scss";
import { useRef } from "react";
import Image from "next/image";

export const ConsoleTray = () => {
  const [{ notifications }] = useNotification();

  const scrollContainer = useRef<HTMLDivElement>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();

    return `${hours}.${mins}.${secs}`;
  };

  return (
    <Sidetray icon={ServerIcon}>
      <div className={styles["console-tray"]}>
        <h2>Console</h2>
        <div
          className={`scrollable ${styles.scrollable}`}
          ref={scrollContainer}
        >
          {notifications.map((item) => {
            return (
              <div
                key={item.id}
                className={`${styles["notification-card"]} ${
                  item.clipboard ? styles["clipboard"] : ""
                }`}
                onClick={() =>
                  item.clipboard && copyToClipboard(item.clipboard)
                }
              >
                <div className={styles.details}>
                  <p className={styles.time}>{formatTime(item.time)}</p>
                  {item.type && (
                    <Image
                      height={18}
                      src={item.type === "DB" ? ServerIcon : ChainIcon}
                      alt="Console icon"
                    />
                  )}
                </div>
                <h4>{item.title}</h4>
                {item.body}
              </div>
            );
          })}
        </div>
      </div>
    </Sidetray>
  );
};
