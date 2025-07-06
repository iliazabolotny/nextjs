"use client";

import { BASE_API_URL } from "@/constants/api";
import { useSearchParams } from "next/navigation";
import { FC, use } from "react";
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
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "") || 1;
  const { data: filtersData } = use(filters);

  const { data, error, isLoading } = useSWR(
    `products?page=${page}&limit=${LIMIT}`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const updatePage = (page: number) => {
    window.history.pushState({}, "", `?page=${page}&limit=${LIMIT}`);
    // router.push(`/rackets-paginated?page=${page}&limit=${LIMIT}`);
  };

  const rackets = data?.data;

  if (error) {
    return "error";
  }

  if (isLoading && !rackets?.length) {
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
          <div className={styles.filtersAll}>All</div>
          <ul className={styles.filtersContainer}>
            {filtersData?.map((filter) => (
              <li className={styles.filterItem} key={filter.id}>{filter.name}</li>
            ))}
          </ul>
        </div>
        <RacketsGrid data={rackets} />
      </div>
      <div>
        {page > 1 && <button onClick={() => updatePage(page - 1)}>prev</button>}
        <span>{page}</span>
        {rackets.length >= LIMIT && (
          <button onClick={() => updatePage(page + 1)}>next</button>
        )}
      </div>
    </div>
  );
};
