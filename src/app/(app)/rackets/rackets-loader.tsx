import { FC, Suspense } from "react";
import { SWRConfig } from "swr";
import { getRackets } from "@/services/get-rackets";
import { LIMIT } from "./constants";
import { getKey } from "./get-key";
import { notFound } from "next/navigation";
import { unstable_serialize } from "swr/infinite";
import { RacketsContainerClient } from "./rackets-container-client";

export const RacketsLoader: FC = async () => {
  const { data } = await getRackets({ page: 1, limit: LIMIT });

  if (!data) {
    return notFound();
  }

  return (
    <Suspense fallback="rackets loading...">
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(getKey(data))]: data,
          },
          revalidateOnFocus: false,
        }}
      >
        <RacketsContainerClient initialData={data} />
      </SWRConfig>
    </Suspense>
  );
};
