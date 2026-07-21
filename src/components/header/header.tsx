import styles from "./header.module.css";
import Link from "../link-container/link";
import UserOptions from "../user-options/user-options";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <UserOptions />
      <div className={styles.headerLinks}>
        <Link href="/">Main</Link>
        <Link href="/products/top-10">Top 10</Link>
        <Link href="/products">Notebooks</Link>
        <Link href="/products-paginated">Choose your notebook</Link>
      </div>
      <div className={styles.title}>NOTEBOOKS STORE</div>
    </header>
  );
};

export default Header;
