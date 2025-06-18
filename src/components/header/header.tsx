"use client";

import styles from "./header.module.css";
import RacketLink from "../link-container/link";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLinks}>
        <RacketLink href="/">Главная</RacketLink>
        <RacketLink href="/rackets">Ракетки</RacketLink>
      </div>
      <div className={styles.title}>TENNIS STORE</div>
    </div>
  );
};

export default Header;
