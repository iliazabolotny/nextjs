import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerTitle}>
            TENNIS STORE
        </div>
        <div className={styles.footerDescription}>
            &#9426; 2025 Tennis Store. All rights reserved.
        </div>
    </div>
  );
};

export default Footer;