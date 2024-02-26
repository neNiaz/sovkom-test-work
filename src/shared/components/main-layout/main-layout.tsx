import { FC, ReactNode } from "react";
import styles from "./main-layout.module.scss";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainLayout;
