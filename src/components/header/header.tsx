import styles from "./header.module.css";
import Link from "../link-container/link";
import UserOptions from "../user-options/user-options";

const Header = () => {

  return (
    <div className={styles.headerContainer}>
      <UserOptions />
      <div className={styles.headerLinks}>
        <Link href="/">Home</Link>
        <Link href="/rackets">Rackets</Link>
        <Link href="/rackets/top-10">Top 10</Link>
      </div>
      <div className={styles.title}>TENNIS STORE</div>
    </div>
  );
};

export default Header;
