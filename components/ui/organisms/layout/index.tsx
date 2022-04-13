import styles from "./styles.module.scss";
import Head from "next/head";
import { Navbar } from "components/ui/molecules";
import { navItems } from "data/sitemap";
import { ConsoleTray } from "components/sections";

interface Props {
  children: React.ReactNode;
  metadetails: {
    title: string;
    description: string;
  };
}

export const Layout = ({ children, metadetails }: Props) => {
  return (
    <>
      <Head>
        <title>{metadetails.title}</title>
        <meta name="description" content={metadetails.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles["nav-container"]}>
          <Navbar navOptions={navItems} />
        </div>
        <div className={styles.content}>{children}</div>
        <ConsoleTray />
      </div>
    </>
  );
};
