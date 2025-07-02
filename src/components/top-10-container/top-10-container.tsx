"use client";
import { FC, use } from "react";
import { notFound } from "next/navigation";
import { IRacket } from "@/types/racket";
import { Response } from "@/types/response";
import styles from "./top-10.module.css";
import { RacketCard } from "../racket-card/racket-card";

type Props = {
  promiseForResolve: Promise<Response<IRacket[]>>;
};

export const Top10Container: FC<Props> = ({ promiseForResolve }) => {
  const { data, isError } = use(promiseForResolve);

  if (isError) {
    throw new Error("Top 10 error");
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
