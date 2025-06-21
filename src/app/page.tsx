import styles from "./main.module.css";
import { getRackets } from "@/services/get-rackets";
import { getTop10 } from "@/services/get-top-10";
import { Suspense } from "react";
import { RacketsContainer } from "@/components/rackets-container/rackets-container";
import { Top10Container } from "@/components/top-10-container/top-10-container";

export default function Home() {
  const getRacketsPromise = getRackets({ limit: "10" });
  const getTop10RacketsPromise = getTop10();
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.pageTitle}>Rackets</h1>
      <Suspense fallback={<div>Loading rackets...</div>}>
        <RacketsContainer promiseForResolve={getRacketsPromise} />
      </Suspense>
      <h1>Top 10</h1>
      <Suspense fallback={<div>Loading top-10...</div>}>
        <Top10Container promiseForResolve={getTop10RacketsPromise} />
      </Suspense>
    </div>
  );
}
