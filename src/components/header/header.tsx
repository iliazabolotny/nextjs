import styles from "./header.module.css";
import Link from "../link-container/link";
import UserOptions from "../user-options/user-options";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <UserOptions />
      <div className={styles.headerLinks}>
        <Link href="/">Home</Link>
        <Link href="/rackets/top-10">Top 10</Link>
        <Link href="/rackets">All</Link>
        <Link href="/rackets-paginated">Choose a rakcet</Link>
      </div>
      <div className={styles.title}>TENNIS STORE</div>
    </header>
  );
};

export default Header;
