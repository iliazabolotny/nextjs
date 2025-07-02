"use client";
import { FC, use } from "react";
import { notFound } from "next/navigation";
import { IRacket } from "@/types/racket";
import { Response } from "@/types/response";
import styles from "./rackets.module.css";
import { RacketCard } from "../racket-card/racket-card";

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
          <RacketCard racket={item} key={item.id} />
        ))}
      </div>
  );
};
