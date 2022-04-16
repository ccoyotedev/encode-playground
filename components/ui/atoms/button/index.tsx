import styles from "./styles.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
