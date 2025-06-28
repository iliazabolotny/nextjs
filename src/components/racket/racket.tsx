"use client";

import { IRacket } from "@/types/racket";
import { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import { FavoriteButton } from "../favorite-button/favorite-button";
import { IUser } from "@/types/user";

type Props = {
  racket: IRacket;
  user: IUser | null;
};

export const Racket: FC<Props> = ({ racket, user }) => {
  return (
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
      {user && <FavoriteButton />}
    </div>
  );
};
