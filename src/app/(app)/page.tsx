import styles from "./main.module.css";
import { getRackets } from "@/services/get-rackets";
import { getTop10 } from "@/services/get-top-10";
import { RacketsContainer } from "@/components/rackets-container/rackets-container";
import { Top10Container } from "@/components/top-10-container/top-10-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Rackets Home page. The list of 10 rackets and its top',
}

export default function Home() {
  const getRacketsPromise = getRackets({ limit: 10 });
  const getTop10RacketsPromise = getTop10();
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.pageTitle}>Rackets</h1>
      <RacketsContainer promiseForResolve={getRacketsPromise} />
      <h1 className={styles.pageTitle}>Top 10</h1>
      <Top10Container promiseForResolve={getTop10RacketsPromise} />
    </div>
  );
}
