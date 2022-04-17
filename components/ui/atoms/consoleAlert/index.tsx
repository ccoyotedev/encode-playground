import styles from "./styles.module.scss";
import Image from "next/image";
import { ServerIcon, ChainIcon } from "assets/icons";

interface Props {
  children: React.ReactNode;
  type: "DB" | "CHAIN";
}

export const ConsoleAlert = ({ children, type }: Props) => {
  return (
    <div className={styles["console-container"]}>
      <div className={styles["icon-container"]}>
        <Image
          src={type === "DB" ? ServerIcon : ChainIcon}
          alt="Console alert"
        />
      </div>
      {children}
    </div>
  );
};
