import { IRacket } from "@/types/racket";
import { BASE_API_URL } from "../constants/api";
import { Response } from "../types/response";
import { cookies } from "next/headers";

type Params = {
  limit?: number;
  page?: number;
  brand?: string;
};

export const getRackets = async ({
  limit = 1,
  page = 1,
  brand,
}: Params): Promise<Response<IRacket[]>> => {
  const cookieStore = await cookies();
  const result = brand
    ? await fetch(
        `${BASE_API_URL}/products?page=${page}&limit=${limit}&brand=${brand}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        }
      )
    : await fetch(`${BASE_API_URL}/products?page=${page}&limit=${limit}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: IRacket[] = await result.json();

  return { isError: false, data };
};
