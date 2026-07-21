import styles from "./main.module.css";
import { getProducts } from "@/services/get-products";
import { getTop10 } from "@/services/get-top-10";
import { ProductsContainer } from "@/components/products-container/products-container";
import { Top10Container } from "@/components/top-10-container/top-10-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Main',
  description: 'Main page. The list of 10 notebooks and its top',
}

export default function Home() {
  const getProductsPromise = getProducts({ limit: 10 });
  const getTop10ProductsPromise = getTop10();
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Notebooks</h1>
      <ProductsContainer promiseForResolve={getProductsPromise} />
      <h1 className={styles.pageTitle}>Top 10</h1>
      <Top10Container promiseForResolve={getTop10ProductsPromise} />
    </div>
  );
}
