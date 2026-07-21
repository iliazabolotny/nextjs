"use client";
import { FC, use } from "react";
import { notFound } from "next/navigation";
import { IProduct } from "@/types/product";
import { Response } from "@/types/response";
import styles from "./products.module.css";
import { ProductCard } from "@/components/product-card/product-card";

type Props = {
  promiseForResolve: Promise<Response<IProduct[]>>;
};

export const ProductsContainer: FC<Props> = ({ promiseForResolve }) => {
  const { data } = use(promiseForResolve);

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.cardsContainer}>
        {data?.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
    </div>
  );
};
