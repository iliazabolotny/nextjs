import Image from "next/image";
import styles from "./racket.module.css";
import { getRacketById } from "@/services/get-racket-by-id";
import { Suspense } from "react";
import notFound from "./not-found";

type Props = {
  params: Promise<{ racketId: string }>;
};

export default async function RacketPage({ params }: Props) {
  const { racketId } = await params;
  const { data, isError } = await getRacketById({ id: racketId });

  if (isError) {
    return "someError";
  }

  if (!data) {
    return notFound();
  }

  return (
    <Suspense>
      <div className={styles.contentContainer}>
        <div className={styles.descriptionContainer}>
          <div>{data?.brand?.name}</div>
          <div>{data?.model}</div>
          <div>{data?.description}</div>
        </div>
        {data && (
          <Image
            unoptimized
            src={data?.imageUrl}
            width={500}
            height={500}
            alt="Racket Image"
          />
        )}
        <div>
          {data?.price}
          &#8364;
        </div>
      </div>
    </Suspense>
  );
}

export const genarateStaticParams = () => {
  return [{ racketId: "1" }, { racketId: "2" }, { productId: "3" }];
};
