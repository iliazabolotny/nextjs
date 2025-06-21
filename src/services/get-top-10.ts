import { IRacket } from "@/types/racket";
import { BASE_API_URL } from "../constants/api";
import { Response } from "../types/response";

export const getTop10 = async (): Promise<Response<IRacket[]>> => {
  const result = await fetch(`${BASE_API_URL}/top-10`);

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data = await result.json();

  return { isError: false, data };
};
