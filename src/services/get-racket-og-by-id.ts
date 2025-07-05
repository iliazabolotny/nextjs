import { BASE_API_URL } from "@/constants/api";
import { IRacket } from "@/types/racket";
import { Response } from "@/types/response";

type Params = {
  id: string;
};

export const getRacketOgDataById = async ({
  id,
}: Params): Promise<Response<IRacket>> => {
  const result = await fetch(`${BASE_API_URL}/product/${id}`, {
    cache: "force-cache",
  });

  if (result.status === 404) {
    return { isError: false, data: undefined };
  }

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: { product: IRacket } = await result.json();

  return { isError: false, data: data.product };
};