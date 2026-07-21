import { cookies } from "next/headers";
import { BASE_API_URL } from "@/constants/api";
import { IProduct } from "@/types/product";
import { Response } from "@/types/response";

type Params = {
  id: string;
};

export const getProductById = async ({
  id,
}: Params): Promise<Response<IProduct>> => {
  const cookieStore = await cookies();
  const result = await fetch(`${BASE_API_URL}/product/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    next: {
      tags: [`getById-${id}`],
    },
  });

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: { product: IProduct } = await result.json();

  return { isError: false, data: data.product };
};
