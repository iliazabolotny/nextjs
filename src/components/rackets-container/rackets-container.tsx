"use client";
import { FC, use } from "react";
import { notFound } from "next/navigation";
import { IRacket } from "@/types/racket";
import { Response } from "@/types/response";
import Image from "next/image";
import styles from "./rackets.module.css";
import Link from "../link-container/link";

type Props = {
  promiseForResolve: Promise<Response<IRacket[]>>;
};

export const RacketsContainer: FC<Props> = ({ promiseForResolve }) => {
  const { data, isError } = use(promiseForResolve);

  if (isError) {
    return "someError";
  }

  if (!data) {
    return notFound();
  }

  return (
   <div className={styles.cardsContainer}>
        {data?.map((item) => (
          <div key={item.id}>
            <Image
              unoptimized
              alt={item.model}
              src={item.imageUrl}
              width={500}
              height={600}
            />
            <div className={styles.model}><Link href={`/rackets/${item.id}`}>{item.model}</Link></div>
          </div>
        ))}
      </div>
  );
};
