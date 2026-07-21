"use client";

import { IProduct } from "@/types/product";
import { useContext, useEffect } from "react";
import { FavoriteContext } from ".";

export const useSetIsFavorite = () => {
  const { setFavorite } = useContext(FavoriteContext);

  return setFavorite;
};

export const useHydrateFavorite = ({
  productId,
  isFavorite,
}: {
  productId: IProduct["id"];
  isFavorite?: boolean;
}) => {
  const setIsFavorite = useSetIsFavorite();

  useEffect(() => {
    if (typeof isFavorite === "boolean") {
      setIsFavorite({
        isFavorite: isFavorite,
        id: productId,
      });
    }
  }, [productId, isFavorite, setIsFavorite]);
};

export const useIsFavoriteById = ({
  id,
  isFavoriteInitial,
}: {
  id: IProduct["id"];
  isFavoriteInitial?: boolean;
}): boolean => {
  const { favorites } = useContext(FavoriteContext);
  const isFavoriteGlobal = favorites[id] ?? null;

  const isFavorite = isFavoriteGlobal ?? isFavoriteInitial;

  return Boolean(isFavorite);
};