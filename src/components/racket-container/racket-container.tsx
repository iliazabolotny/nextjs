import { FC } from "react";
import { notFound } from "next/navigation";
import { getRacketById } from "@/services/get-racket-by-id";
import Image from "next/image";
import styles from "./racket.module.css";

type Props = {
  racketId: string;
};

export const RacketContainer: FC<Props> = async ({ racketId }) => {
  const { data, isError } = await getRacketById({ id: racketId });

  if (isError) {
    return "someError";
  }

  if (!data) {
    return notFound();
  }

  return (
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
  );
};
