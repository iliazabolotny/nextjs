"use client";
import { IProduct } from "@/types/product";
import { FC, use } from "react";
import Image from "next/image";
import styles from "./product.module.css";
import { FavoriteButton } from "@/components/favorite-button/favorite-button";
import { UserContext } from "@/providers/user";

type Props = {
  product: IProduct;
};

export const Product: FC<Props> = ({ product }) => {
  const { user } = use(UserContext);

  return (
    <section className={styles.contentContainer}>
      <div className={styles.descriptionContainer}>
        <div className={styles.productProperty}>Brand:</div>
        <div>{product?.brand?.name}</div>
        <div className={styles.productProperty}>Model:</div>
        <div>{product?.model}</div>
        <div className={styles.productProperty}>Description:</div>
        <div>{product?.description}</div>
      </div>
      {product && (
        <Image
          src={product?.imageUrl}
          width={500}
          height={500}
          alt="Notebook Image"
        />
      )}
      <div>
        {product?.price}
        &#165;
      </div>
      {user && <FavoriteButton productId={product.id} isFavoriteInitial={product?.userData?.isFavorite} />}
    </section>
  );
};
