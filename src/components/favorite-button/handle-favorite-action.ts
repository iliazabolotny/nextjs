"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleFavoriteAction = async ({
  isFavorite,
  racketId,
}: {
  isFavorite: boolean;
  racketId: number;
}) => {
  const cookieStore = await cookies();

  const url = `http://localhost:4000/api/product/${racketId}/favorite`;

  await (isFavorite
    ? fetch(url, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      })
    : fetch(url, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }));

  revalidateTag(`getRacketById - ${racketId}`);
};
