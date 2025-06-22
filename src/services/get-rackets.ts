import { IRacket } from "@/types/racket";
import { BASE_API_URL } from "../constants/api";
import { Response } from "../types/response";

type Params = {
  limit?: string;
};

export const getRackets = async ({
  limit,
}: Params): Promise<Response<IRacket[]>> => {
  const result = !!limit ? await fetch(`${BASE_API_URL}/products?limit=${limit}`)
    : await fetch(`${BASE_API_URL}/products`);

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data = await result.json();

  return { isError: false, data };
};
