import styles from "./styles.module.scss";
import Image from "next/image";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  icon: string;
}

export const Sidetray = ({ icon, children }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={`${styles.sidebarContainer} ${open ? styles.open : ""}`}>
      <button className={styles.toggle} onClick={toggleSidebar}>
        <Image src={icon} alt="toggle" />
      </button>
      <div className={styles.sidetray}>{children}</div>
    </div>
  );
};
