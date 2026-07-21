import { FC } from "react";
import { getTop10 } from "@/services/get-top-10";
import { Top10Container } from "@/components/top-10-container/top-10-container";
import styles from './top-10.module.css';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Top 10',
  description: 'Top 10 notebooks',
}

const Top10Page: FC = async () => {
  const getTop10Promise = getTop10();

  return (
    <div>
      <h1 className={styles.header}>Top 10</h1>
      <Top10Container promiseForResolve={getTop10Promise} />
    </div>
  );
};

export default Top10Page;
