import { Button } from "../button";
import { Loader } from "../loader";
import styles from "./styles.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  onSubmit?: () => void;
  fetching?: boolean;
  fullWidth?: boolean;
}

export const Input = ({
  label,
  onSubmit,
  fullWidth,
  fetching,
  ...props
}: Props) => {
  return (
    <div
      className={`${styles["input-wrapper"]} ${
        fullWidth ? styles["full-width"] : ""
      }`}
    >
      {label && <label>{label}</label>}
      <div className={styles["input-container"]}>
        <input {...props} />
        {onSubmit && (
          <Button onClick={onSubmit} disabled={!props.value}>
            {fetching ? <Loader size={4} /> : "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
};
