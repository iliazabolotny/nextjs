import styles from "./rackets.module.css";
import { getRackets } from "@/services/get-rackets";
import { Suspense } from "react";
import { RacketsContainer } from "@/components/rackets-container/rackets-container";

export default function Rackets() {
  const getRacketsPromise = getRackets({ limit: "20" });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.pageTitle}>Rackets Brands</div>
      <Suspense fallback={<div>Loading rackets...</div>}>
        <RacketsContainer promiseForResolve={getRacketsPromise} />
      </Suspense>
    </div>
  );
}
