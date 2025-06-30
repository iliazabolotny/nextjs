"use client";

import { IRacket } from "@/types/racket";
import { useContext, useEffect } from "react";
import { FavoriteContext } from ".";

export const useSetIsFavorite = () => {
  const { setFavorite } = useContext(FavoriteContext);

  return setFavorite;
};

export const useHydrateFavorite = ({
  racketId,
  isFavorite,
}: {
  racketId: IRacket["id"];
  isFavorite?: boolean;
}) => {
  const setIsFavorite = useSetIsFavorite();

  useEffect(() => {
    if (typeof isFavorite === "boolean") {
      setIsFavorite({
        isFavorite: isFavorite,
        id: racketId,
      });
    }
  }, [racketId, isFavorite, setIsFavorite]);
};

export const useIsFavoriteById = ({
  id,
  isFavoriteInitial,
}: {
  id: IRacket["id"];
  isFavoriteInitial?: boolean;
}): boolean => {
  const { favorites } = useContext(FavoriteContext);
  const isFavoriteGlobal = favorites[id] ?? null;

  const isFavorite = isFavoriteGlobal ?? isFavoriteInitial;

  return Boolean(isFavorite);
};