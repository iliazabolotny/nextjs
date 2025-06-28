import styles from "./rackets.module.css";
import { getRackets } from "@/services/get-rackets";
import { RacketsContainer } from "@/components/rackets-container/rackets-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rackets',
  description: 'The List of rackets',
}

export default function Rackets() {
  const getRacketsPromise = getRackets({ limit: "20" });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.pageTitle}>Rackets Brands</div>
      <RacketsContainer promiseForResolve={getRacketsPromise} />
    </div>
  );
}
