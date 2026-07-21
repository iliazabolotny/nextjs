import { IProduct } from "@/types/product";
import { BASE_API_URL, TOP_10_REQUEST_TAG } from "@/constants/api";
import { Response } from "@/types/response";
import { cookies } from "next/headers";

export const getTop10 = async (): Promise<Response<IProduct[]>> => {

    const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}/top-10`, {
    headers: {
      Cookie: 
        cookieStore.toString(),
    },
    next: { tags: [TOP_10_REQUEST_TAG] },
    });

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: IProduct[] = await result.json();

  return { isError: false, data };
};
