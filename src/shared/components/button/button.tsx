import { FC, ReactNode } from "react";
import styles from "./button.module.scss";

interface Props {
  type: "submit";
  children: ReactNode;
  disabled: boolean;
}

const Button: FC<Props> = ({ type, children, disabled }) => {
  return (
    <button disabled={disabled} className={styles.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
