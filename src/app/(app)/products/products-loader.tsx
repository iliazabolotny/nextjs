import { FC } from "react";
import { SWRConfig } from "swr";
import { getProducts } from "@/services/get-products";
import { LIMIT } from "./constants";
import { getKey } from "./get-key";
import { notFound } from "next/navigation";
import { unstable_serialize } from "swr/infinite";
import { ProductsContainerClient } from "./products-container-client";

export const ProductsLoader: FC = async () => {
  const { data } = await getProducts({ page: 1, limit: LIMIT });

  if (!data) {
    return notFound();
  }

  return (
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(getKey(data))]: data,
          },
          revalidateOnFocus: false,
        }}
      >
        <ProductsContainerClient initialData={data} />
      </SWRConfig>
  );
};
