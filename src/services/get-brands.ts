import { BASE_API_URL } from "../constants/api";
import { Response } from "../types/response";
import { cookies } from "next/headers";
import { IFilter } from "@/types/filter";

export const getBrands = async (): Promise<Response<IFilter[]>> => {

    const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}/brands`, {
    headers: {
      Cookie: 
        cookieStore.toString(),
    },
    });

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: IFilter[] = await result.json();

  return { isError: false, data };
};
