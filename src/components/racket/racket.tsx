"use client";
import { IRacket } from "@/types/racket";
import { FC, use } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import { FavoriteButton } from "../favorite-button/favorite-button";
import { UserContext } from "@/providers/user";

type Props = {
  racket: IRacket;
};

export const Racket: FC<Props> = ({ racket }) => {
  const { user } = use(UserContext);
  console.log(user);

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
