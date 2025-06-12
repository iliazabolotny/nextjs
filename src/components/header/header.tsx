"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

const Header = () => {
  const pathName = usePathname();
  return (
    <div className={styles.headerContainer}>
        <div className={styles.headerLinks}>
          <Link
          href="/"
          prefetch
          style={{
            color: pathName === "/" ? "#E0C763" : "#5E5F61",
            textDecoration: "none",
            marginRight: '20px'
          }}
        >
          Главная
        </Link>
        <Link
          href="/rackets"
          prefetch
          style={{
            color: pathName === "/rackets" ? "#E0C763" : "#5E5F61",
            textDecoration: "none",
          }}
        >
          Ракетки
        </Link>
      </div>
      <div className={styles.title}>
        TENNIS STORE
      </div>
    </div>
  );
};

export default Header;
