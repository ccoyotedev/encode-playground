import styles from "./styles.module.scss";

interface Props {
  size?: number;
}

export const Loader = ({ size = 10 }: Props) => {
  return (
    <div className={styles.loader} style={{ fontSize: `${size}px` }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
