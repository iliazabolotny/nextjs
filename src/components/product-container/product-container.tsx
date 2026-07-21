import { FC } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/get-product-by-id";
import { Product } from "../product/product";

type Props = {
  productId: string;
};

export const ProductContainer: FC<Props> = async ({ productId }) => {
  const { data, isError } = await getProductById({ id: productId });

  if (isError) {
    return "Product container error";
  }

  if (!data) {
    return notFound();
  }

  return <Product product={data} />;
};
