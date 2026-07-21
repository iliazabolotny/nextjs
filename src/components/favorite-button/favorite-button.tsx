"use client";

import { useIsFavoriteById, useSetIsFavorite } from "@/providers/favorite/hooks";
import { IProduct } from "@/types/product";
import { FC } from "react";
import { handleFavorite } from "./handle-favorite";

interface Props {
  isFavoriteInitial?: boolean;
  productId: IProduct["id"];
}


export const FavoriteButton: FC<Props> = ({isFavoriteInitial, productId}) => {
   const isFavorite = useIsFavoriteById({ id: productId, isFavoriteInitial });
  const setIsFavorite = useSetIsFavorite();

    const handleClick = async (isFavorite: boolean) => {
    setIsFavorite({ id: productId, isFavorite: !isFavorite });
    await handleFavorite({ isFavorite, productId });;
  };
  return <button onClick={() => handleClick(isFavorite)}> {isFavorite ? "Not favorite" : "Is favorite"}</button>;
};
