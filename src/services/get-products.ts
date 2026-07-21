import { IProduct } from "@/types/product";
import { BASE_API_URL } from "@/constants/api";
import { Response } from "@/types/response";
import { cookies } from "next/headers";

type Params = {
  limit?: number;
  page?: number;
  brand?: string | undefined;
};

export const getProducts = async ({
  limit = 1,
  page = 1,
  brand,
}: Params): Promise<Response<IProduct[]>> => {
  const cookieStore = await cookies();
  const requestKey = brand
    ? `${BASE_API_URL}/products?page=${page}&limit=${limit}&brand=${brand}`
    : `${BASE_API_URL}/products?page=${page}&limit=${limit}`;

  const result = await fetch(requestKey, {
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

  const data: IProduct[] = await result.json();

  return { isError: false, data };
};
