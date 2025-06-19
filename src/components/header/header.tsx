"use client";

import styles from "./header.module.css";
import Link from "../link-container/link";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLinks}>
        <Link href="/">Главная</Link>
        <Link href="/rackets">Ракетки</Link>
      </div>
      <div className={styles.title}>TENNIS STORE</div>
    </div>
  );
};

export default Header;
