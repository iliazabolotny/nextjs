"use client";

import { IRacket } from "@/types/racket";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

type SetFavotiteParams = {
  id: IRacket["id"];
  isFavorite: boolean;
};

interface FavoriteContextType {
  favorites: Record<IRacket["id"], boolean>;
  setFavorite: (params: SetFavotiteParams) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: {},
  setFavorite: () => {},
});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteContextType["favorites"]>(
    {}
  );

  const setFavorite = useCallback(({ id, isFavorite }: SetFavotiteParams) => {
    setFavorites((prev) => {
      if (prev[id] === isFavorite) {
        return prev;
      }

      return {
        ...prev,
        [id]: isFavorite,
      };
    });
  }, []);

  return (
    <FavoriteContext value={{ favorites, setFavorite }}>
      {children}
    </FavoriteContext>
  );
};