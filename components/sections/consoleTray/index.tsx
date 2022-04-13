import { Sidetray } from "components/ui/molecules";
import { ServerIcon } from "assets/icons";
import { useNotification } from "contexts/NotificationContext";
import styles from "./styles.module.scss";

export const ConsoleTray = () => {
  const [{ notifications }] = useNotification();

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Sidetray icon={ServerIcon}>
      <div>
        <h2>Console</h2>
        {notifications.map((item) => {
          return (
            <div
              key={item.id}
              className={styles["notification-card"]}
              onClick={() => copyToClipboard(item.message)}
            >
              <h4>{item.title}</h4>
              <p>{item.message}</p>
            </div>
          );
        })}
      </div>
    </Sidetray>
  );
};
