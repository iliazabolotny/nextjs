import { FC, Suspense } from "react";
import { RacketsContainer } from "./container";
import { SWRConfig } from "swr";
import { LIMIT } from "./constants";
import { getRackets } from "@/services/get-rackets";
import { getFilters } from "@/services/get-filters";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ racketId: string }>;
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { page = "1" } = await searchParams;

  const filters = getFilters();

  let pageNumber = 1;
  if (typeof page === "string") {
    pageNumber = parseInt(page) || 1;
  }

  return (
    <Suspense fallback='Loading ...'>
      <SWRConfig
        value={{
          fallback: {
            [`products?page=${page}&limit=${LIMIT}`]: getRackets({
              page: pageNumber,
              limit: LIMIT,
            }),
          },
        }}
      >
        <RacketsContainer filters={filters} />
      </SWRConfig>
    </Suspense>
  );
};

export default Page;