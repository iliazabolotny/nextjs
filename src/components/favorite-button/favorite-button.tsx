"use client";

import { useIsFavoriteById, useSetIsFavorite } from "@/providers/favorite/hooks";
import { IRacket } from "@/types/racket";
import { FC } from "react";
import { handleFavorite } from "./handle-favorite";

interface Props {
  isFavoriteInitial?: boolean;
  racketId: IRacket["id"];
}


export const FavoriteButton: FC<Props> = ({isFavoriteInitial, racketId}) => {
   const isFavorite = useIsFavoriteById({ id: racketId, isFavoriteInitial });
  const setIsFavorite = useSetIsFavorite();

    const handleClick = async (isFavorite: boolean) => {
    setIsFavorite({ id: racketId, isFavorite: !isFavorite });
    await handleFavorite({ isFavorite, racketId });;
  };
  return <button onClick={() => handleClick(isFavorite)}> {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</button>;
};
