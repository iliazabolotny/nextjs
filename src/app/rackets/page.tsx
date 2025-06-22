import styles from "./rackets.module.css";
import { getRackets } from "@/services/get-rackets";
import { RacketsContainer } from "@/components/rackets-container/rackets-container";

export default function Rackets() {
  const getRacketsPromise = getRackets({ limit: "20" });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.pageTitle}>Rackets Brands</div>
      <RacketsContainer promiseForResolve={getRacketsPromise} />
    </div>
  );
}
