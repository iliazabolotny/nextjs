"use client";

import { BASE_API_URL } from "@/constants/api";
import { IProduct } from "@/types/product";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import { getKey } from "./get-key";
import { LIMIT } from "./constants";
import { ProductsGrid } from "@/components/products-grid/products-grid";
import styles from "./products-container-client.module.css";

const fetcher = async (path: string | IProduct[] | undefined) => {
  if (typeof path !== "string" && path !== undefined) {
    return path;
  }

  const result = await fetch(`${BASE_API_URL}/${path}`, {
    credentials: "include",
  });

  return result.json();
};

interface Props {
  initialData: IProduct[];
}

export const ProductsContainerClient: FC<Props> = ({ initialData }) => {
  const { data, error, isLoading, size, setSize } = useSWRInfinite<IProduct[]>(
    getKey(initialData),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      parallel: true,
    }
  );

  const products: IProduct[] = data ? ([] as IProduct[]).concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  if (error) {
    return "products data error";
  }

  if (isLoading && !products.length) {
    return "isInitialLoading...";
  }

  if (isEmpty) {
    return "no products";
  }

  return (
    <div>
      <ProductsGrid data={products} />
      {!isReachingEnd && (
        <div className={styles.loadContainer}>
          <button
            className={styles.loadBtn}
            disabled={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsContainerClient;
