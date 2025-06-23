import Image from "next/image";
import styles from "./racket.module.css";
import { getRacketById } from "@/services/get-racket-by-id";
import { Suspense } from "react";
import notFound from "./not-found";
import { IRacket } from "@/types/racket";
import { getRackets } from "@/services/get-rackets";
import { Metadata } from "next";
import { getMetaRacketById } from "@/services/get-meta-racket-by-id";

type Props = {
  params: Promise<{ racketId: string }>;
};

export const generateStaticParams = async () => {
  const { data: rackets } = await getRackets({});
  const result: { racketId: string }[] =
    rackets?.map((racket: IRacket) => ({
      racketId: racket.id.toString(),
    })) || [];
  return result;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { racketId } = await params;

  const result = await getMetaRacketById({ id: racketId });

  if (result.isError || !result.data) {
    return {
      title: "tennis racket",
      description: "racket description"
    };
  }

  return {
    title: result.data.name,
    description: result.data.description
  };
};

export default async function RacketPage({ params }: Props) {
  const { racketId } = await params;
  const { data: racket } = await getRacketById({ id: racketId });
  const { data: racketMeta, isError: isRacketMetaError} = await getMetaRacketById({ id: racketId });

  if (isRacketMetaError) {
    throw new Error("error");
  }

  if (!racketMeta) {
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
}
