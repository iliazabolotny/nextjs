import { FC, Suspense } from "react";
import { RacketsContainer } from "./container";
import { SWRConfig } from "swr";
import { LIMIT } from "./constants";
import { getRackets } from "@/services/get-rackets";
import { getBrands } from "@/services/get-brands";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ racketId: string }>;
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { page = "1", brand } = await searchParams;

  const filters = getBrands();

  const productsKey = brand
    ? `products?page=${page}&limit=${LIMIT}&brand=${brand}`
    : `products?page=${page}&limit=${LIMIT}`;

  let pageNumber = 1;
  if (typeof page === "string") {
    pageNumber = parseInt(page) || 1;
  }

  return (
    <Suspense fallback="Loading ...">
      <SWRConfig
        value={{
          fallback: {
            [productsKey]: getRackets({
              page: pageNumber,
              limit: LIMIT,
              brand: brand
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
