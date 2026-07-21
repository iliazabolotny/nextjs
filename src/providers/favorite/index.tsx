"use client";

import { IProduct } from "@/types/product";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

type SetFavoriteParams = {
  id: IProduct["id"];
  isFavorite: boolean;
};

interface FavoriteContextType {
  favorites: Record<IProduct["id"], boolean>;
  setFavorite: (params: SetFavoriteParams) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: {},
  setFavorite: () => {},
});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteContextType["favorites"]>(
    {}
  );

  const setFavorite = useCallback(({ id, isFavorite }: SetFavoriteParams) => {
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