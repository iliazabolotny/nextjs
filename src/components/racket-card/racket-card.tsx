"use client";

import { FC, use } from "react";

import styles from "./racket-card.module.css";
import { IRacket } from "@/types/racket";
import { UserContext } from "@/providers/user";
import {
  useHydrateFavorite,
  useIsFavoriteById,
} from "@/providers/favorite/hooks";
import Image from "next/image";
import Link from "../link-container/link";
import { FavoriteButton } from "../favorite-button/favorite-button";

type Props = {
  racket: IRacket;
};

export const RacketCard: FC<Props> = ({ racket }) => {
  const { user } = use(UserContext);

  const { imageUrl, name, id, userData } = racket;

  useHydrateFavorite({ racketId: id, isFavorite: userData?.isFavorite });

  const isFavorite = useIsFavoriteById({
    id,
    isFavoriteInitial: userData?.isFavorite,
  });

  return (
    <div key={racket.id} className={styles.racketCard}>
      {isFavorite && (
        <Image
          unoptimized
          src="http://localhost:4000/bookmark.png"
          alt="bookmark"
          width={32}
          height={32}
          className={styles.favoriteIcon}
        />
      )}
      <Image  unoptimized alt={name} src={imageUrl} width={500} height={500} />
      <Link href={`/rackets/${id}`}>{name}</Link>
      {user && <FavoriteButton racketId={id} isFavoriteInitial={isFavorite} />}
    </div>
  );
};
