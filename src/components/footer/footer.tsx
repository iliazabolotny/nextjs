import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTitle}>NOTEBOOKS STORE</div>
      <div className={styles.footerDescription}>
        &#9426; 2026 Notebooks Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
