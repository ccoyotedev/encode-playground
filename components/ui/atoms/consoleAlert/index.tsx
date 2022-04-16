import styles from "./styles.module.scss";
import Image from "next/image";
import { ServerIcon } from "assets/icons";

interface Props {
  children: React.ReactNode;
}

export const ConsoleAlert = ({ children }: Props) => {
  return (
    <div className={styles["console-container"]}>
      <div className={styles["icon-container"]}>
        <Image src={ServerIcon} alt="Console alert" />
      </div>
      {children}
    </div>
  );
};
