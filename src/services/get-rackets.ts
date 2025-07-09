import { IRacket } from "@/types/racket";
import { BASE_API_URL } from "../constants/api";
import { Response } from "../types/response";
import { cookies } from "next/headers";

type Params = {
  limit?: number;
  page?: number;
};

export const getRackets = async ({
  limit = 1,
  page = 1,
}: Params): Promise<Response<IRacket[]>> => {
  const cookieStore = await cookies();
  const result = await fetch(
    `${BASE_API_URL}/products?page=${page}&limit=${limit}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: IRacket[] = await result.json();

  return { isError: false, data };
};
