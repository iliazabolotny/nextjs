import { FC, Suspense } from "react";
import Image from "next/image";
import { getRacketById } from "@/services/get-racket-by-id";
import { notFound } from "next/navigation";
import styles from "./racket.module.css";

type Props = {
  params: Promise<{ racketId: string }>;
};

const RacketPage: FC<Props> = async ({ params }) => {
  const { racketId } = await params;
  const { data: racket, isError } = await getRacketById({ id: racketId });

  if (isError) {
    throw new Error("error");
  }

  if (!racket) {
    return notFound();
  }

  return (
    <Suspense>
      <div className={styles.contentContainer}>
        <div className={styles.descriptionContainer}>
          <div>{racket?.brand?.name}</div>
          <div>{racket?.model}</div>
          <div>{racket?.description}</div>
        </div>
        {racket && (
          <Image
            unoptimized
            src={racket?.imageUrl}
            width={500}
            height={500}
            alt="Racket Image"
          />
        )}
        <div>
          {racket?.price}
          &#8364;
        </div>
      </div>
    </Suspense>
  );
};

export default RacketPage;