import { BASE_API_URL } from "@/constants/api";
import { IRacket } from "@/types/racket";

export const handleFavorite = async ({
  isFavorite,
  racketId,
}: {
  isFavorite: boolean;
  racketId: IRacket["id"];
}) => {
  const url = `${BASE_API_URL}/product/${racketId}/favorite`;

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