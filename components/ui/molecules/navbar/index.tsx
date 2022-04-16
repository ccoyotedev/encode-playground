import styles from "./styles.module.scss";
import { NavItem } from "types";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  navOptions: Array<NavItem>;
}

export const Navbar = ({ navOptions }: Props) => {
  const { pathname } = useRouter();

  return (
    <div className={styles["container"]}>
      <Link href="/" passHref>
        <a>
          <div className={styles["logo-container"]}>Encode</div>
        </a>
      </Link>
      <nav className={styles["nav-container"]}>
        <ul>
          {navOptions.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={i} passHref>
                <li
                  className={`${styles["nav-item"]} ${
                    isActive ? styles["active"] : ""
                  }`}
                >
                  <a>{item.title}</a>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className={styles["socials-container"]}></div>
    </div>
  );
};
