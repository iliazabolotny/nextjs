"use client";

import { useIsFavoriteById, useSetIsFavorite } from "@/providers/favorite/hooks";
import { IRacket } from "@/types/racket";
import { FC } from "react";
import { handleFavoriteAction } from "./handle-favorite-action";

interface Props {
  isFavoriteInitial?: boolean;
  racketId: IRacket["id"];
}


export const FavoriteButton: FC<Props> = ({isFavoriteInitial = false, racketId}) => {
   const isFavorite = useIsFavoriteById({ id: racketId, isFavoriteInitial });
  const setIsFavorite = useSetIsFavorite();
  console.log(isFavorite)

    const handleClick = async (isFavorite: boolean) => {
    setIsFavorite({ id: racketId, isFavorite: !isFavorite });
    await handleFavoriteAction({ isFavorite, racketId });
  };
  return <button onClick={() => handleClick(isFavorite)}> {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</button>;
};
