"use client";

import { BASE_API_URL } from "@/constants/api";
import { IRacket } from "@/types/racket";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import { getKey } from "./get-key";
import { LIMIT } from "./constants";
import { RacketsGrid } from "@/components/rackets-grid/rackets-grid";
import styles from "./rackets-container-client.module.css";

const fetcher = async (path: string | IRacket[] | undefined) => {
  if (typeof path !== "string" && path !== undefined) {
    return path;
  }

  const result = await fetch(`${BASE_API_URL}/${path}`, {
    credentials: "include",
  });

  return result.json();
};

interface Props {
  initialData: IRacket[];
}

export const RacketsContainerClient: FC<Props> = ({ initialData }) => {
  const { data, error, isLoading, size, setSize } = useSWRInfinite<IRacket[]>(
    getKey(initialData),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      parallel: true,
    }
  );

  const products: IRacket[] = data ? ([] as IRacket[]).concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  if (error) {
    return "some error";
  }

  if (isLoading && !products.length) {
    return "isInitialLoading...";
  }

  if (isEmpty) {
    return "no products";
  }

  return (
    <div>
      <RacketsGrid data={products} />
      {!isReachingEnd && (
        <div className={styles.loadContainer}>
          <button
            className={styles.loadBtn}
            disabled={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RacketsContainerClient;
