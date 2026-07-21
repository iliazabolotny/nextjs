"use client";

import { FC, use } from "react";

import styles from "./product-card.module.css";
import { IProduct } from "@/types/product";
import { UserContext } from "@/providers/user";
import {
  useHydrateFavorite,
  useIsFavoriteById,
} from "@/providers/favorite/hooks";
import Image from "next/image";
import Link from "../link-container/link";
import { FavoriteButton } from "../favorite-button/favorite-button";

type Props = {
  product: IProduct;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { user } = use(UserContext);

  const { imageUrl, name, id, userData } = product;

  useHydrateFavorite({ productId: id, isFavorite: userData?.isFavorite });

  const isFavorite = useIsFavoriteById({
    id,
    isFavoriteInitial: userData?.isFavorite,
  });

  return (
    <div key={product.id} className={styles.productCard}>
      {isFavorite && (
        <Image
          src="http://localhost:4000/bookmark.png"
          alt="bookmark"
          width={32}
          height={32}
          className={styles.favoriteIcon}
        />
      )}
      <Image alt={name} src={imageUrl} width={500} height={500} />
      <Link href={`/products/${id}`}>{name}</Link>
      {user && <FavoriteButton productId={id} isFavoriteInitial={isFavorite} />}
    </div>
  );
};
