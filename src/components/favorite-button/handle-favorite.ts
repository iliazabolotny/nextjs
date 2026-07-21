import { BASE_API_URL } from "@/constants/api";
import { IProduct } from "@/types/product";

export const handleFavorite = async ({
  isFavorite,
  productId,
}: {
  isFavorite: boolean;
  productId: IProduct["id"];
}) => {
  const url = `${BASE_API_URL}/product/${productId}/favorite`;

  return isFavorite
    ? fetch(url, {
        credentials: "include",
        method: "DELETE",
      })
    : fetch(url, {
        credentials: "include",
        method: "POST",
      });
};