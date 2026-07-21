import { FC } from "react";
import { IProduct } from "@/types/product";
import { ProductCard } from "@/components/product-card/product-card";
import styles from "./products-grid.module.css";

type Props = {
  data: IProduct[];
};

export const ProductsGrid: FC<Props> = ({ data }) => {
  return (
   <div className={styles.cardsContainer}>
        {data?.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
  );
};