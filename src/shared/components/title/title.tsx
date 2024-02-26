import styles from "./title.module.scss";
import { FC } from "react";

interface Props {
  text: string;
}

const Title: FC<Props> = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default Title;
