"use client";

import { BASE_API_URL } from "@/constants/api";
import { useSearchParams } from "next/navigation";
import { FC, use, useState } from "react";
import useSWR from "swr";
import { LIMIT } from "./constants";
import { RacketsGrid } from "../../../components/rackets-grid/rackets-grid";
import { IFilter } from "@/types/filter";
import { Response } from "@/types/response";
import styles from "./rackets-paginated.module.css";

const fetcher = async (path: string) => {
  if (path.split("=")[3] === "undefined") {
    const newPath = path.replace("&brand=undefined", "");
    const response = await fetch(`${BASE_API_URL}/${newPath}`, {
      credentials: "include",
    });
    const result = await response.json();

    return { data: result };
  } else {
    const response = await fetch(`${BASE_API_URL}/${path}`, {
      credentials: "include",
    });
    const result = await response.json();

    return { data: result };
  }
};

type Props = {
  filters: Promise<Response<IFilter[]>>;
};

export const RacketsContainer: FC<Props> = ({ filters }) => {
  const searchParams = useSearchParams();
  const [currentBrand, setCurrentBrand] = useState<string | undefined>();
  const page = parseInt(searchParams.get("page") || "") || 1;
  const { data: filtersData } = use(filters);

  const { data, error, isLoading } = useSWR(
    `products?page=${page}&limit=${LIMIT}&brand=${currentBrand}`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const updatePage = (page: number, brand?: string) => {
    if (!!brand) {
      setCurrentBrand(brand);
      window.history.pushState(
        {},
        "",
        `?page=${page}&limit=${LIMIT}&brand=${brand}`
      );
    } else {
      window.history.pushState({}, "", `?page=${page}&limit=${LIMIT}`);
    }
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
          <div onClick={() => updatePage(page, undefined)} className={styles.filtersAll}>
            All
          </div>
          <ul className={styles.filtersContainer}>
            {filtersData?.map((filter) => (
              <li
                className={styles.filterItem}
                key={filter.id}
                onClick={() => updatePage(page, filter.name)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
        <RacketsGrid data={rackets} />
      </div>
      <div>
        {page > 1 && <button onClick={() => updatePage(page - 1, currentBrand)}>prev</button>}
        <span>{page}</span>
        {rackets.length >= LIMIT && (
          <button onClick={() => updatePage(page + 1, currentBrand)}>next</button>
        )}
      </div>
    </div>
  );
};
