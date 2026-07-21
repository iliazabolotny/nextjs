import { IProduct } from "@/types/product";
import { LIMIT } from "./constants";

export const getKey = (initialData: IProduct[]) => {
  return (page: number) => {
    if (page === 0 && typeof window !== undefined && initialData) {
      return initialData;
    }

    return `products?page=${page + 1}&limit=${LIMIT}`;
  };
};