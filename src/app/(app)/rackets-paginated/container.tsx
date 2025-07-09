"use client";

import { BASE_API_URL } from "@/constants/api";
import { useSearchParams } from "next/navigation";
import { FC, use, useRef } from "react";
import useSWR from "swr";
import { LIMIT } from "./constants";
import { RacketsGrid } from "../../../components/rackets-grid/rackets-grid";
import { IFilter } from "@/types/filter";
import { Response } from "@/types/response";
import styles from "./rackets-paginated.module.css";

const fetcher = async (path: string) => {
  const response = await fetch(`${BASE_API_URL}/${path}`, {
    credentials: "include",
  });
  const result = await response.json();

  return { data: result };
};

type Props = {
  filters: Promise<Response<IFilter[]>>;
};

export const RacketsContainer: FC<Props> = ({ filters }) => {
  const withFilter = useRef<boolean>(false);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;
  const brand = searchParams.get("brand") || "";
  const { data: filtersData } = use(filters);

  const { data, error, isLoading } = useSWR(
    `products?page=${page}&limit=${LIMIT}`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const {
    data: brandData,
    error: brandError,
    isLoading: brandIsLoading,
  } = useSWR(`products?page=${page}&limit=${LIMIT}&brand=${brand}`, fetcher, {
    revalidateIfStale: false,
  });

  const updatePage = (page: number) => {
    withFilter.current = false;
    window.history.pushState({}, "", `?page=${page}&limit=${LIMIT}`);
  };

  const updatePageWithFilter = (page: number, brand: string) => {
    withFilter.current = true;
    window.history.pushState(
      {},
      "",
      `?page=${page}&limit=${LIMIT}&brand=${brand}`
    );
  };

  const rackets = withFilter.current ? brandData?.data : data?.data;

  if (error || brandError) {
    return "error";
  }

  if ((isLoading || brandIsLoading) && !rackets?.length) {
    return "isLoading";
  }

  if (!rackets?.length) {
    return "no data";
  }

  return (
    <div>
      <div className={styles.pageContainer}>
        <div>
          <div className={styles.filtersTitle}>Brand</div>
          <div onClick={() => updatePage(page)} className={styles.filtersAll}>
            All
          </div>
          <ul className={styles.filtersContainer}>
            {filtersData?.map((filter) => (
              <li
                className={styles.filterItem}
                key={filter.id}
                onClick={() => updatePageWithFilter(page, filter.name)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
        <RacketsGrid data={rackets} />
      </div>
      <div>
        {page > 1 && (
          <button
            onClick={() => {
              if (withFilter.current) {
                updatePageWithFilter(page - 1, brand);
              } else {
                updatePage(page - 1);
              }
            }}
          >
            prev
          </button>
        )}
        <span>{page}</span>
        {rackets.length >= LIMIT && (
          <button
            onClick={() => {
              if (withFilter.current) {
                updatePageWithFilter(page + 1, brand);
              } else {
                updatePage(page + 1);
              }
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};
