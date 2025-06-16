import Image from "next/image";
import { rackets } from "../../../../materials/mock";
import styles from "./racket.module.css";

type Props = {
  params: Promise<{ racketId: string }>;
};

export default async function RacketPage({ params }: Props) {
  const { racketId } = await params;

  return (
    <div className={styles.contentContainer}>
      <div className={styles.descriptionContainer}>
        <div>
          {
            rackets?.filter(
              (racket) => racket.id === parseInt(racketId! as string, 10)
            )[0]?.brand?.name
          }
        </div>
        <div>
          {
            rackets?.filter(
              (racket) => racket.id === parseInt(racketId! as string, 10)
            )[0]?.model
          }
        </div>
        <div>
          {
            rackets?.filter(
              (racket) => racket.id === parseInt(racketId! as string, 10)
            )[0]?.description
          }
        </div>
      </div>
      <Image
        unoptimized
        src={
          rackets?.filter(
            (racket) => racket.id === parseInt(racketId! as string, 10)
          )[0]?.imageUrl
        }
        width={500}
        height={600}
        alt="Racket Image"
      />
      <div>
        {
          rackets?.filter(
            (racket) => racket.id === parseInt(racketId! as string, 10)
          )[0]?.price
        }
        &#8364;
      </div>
    </div>
  );
}

export const genarateStaticParams = () => {
  return [{ racketId: "1" }, { racketId: "2" }, { productId: "3" }];
};
