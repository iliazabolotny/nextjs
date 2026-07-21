import { getOGProductDataById } from "../../../../services/get-og-product-data-by-id";
import { IProduct } from "@/types/product";
import { ImageResponse } from "next/og";
import { FC } from "react";
import Image from "next/image";

export const alt = "OG image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ productId: string }>;
};

const ProductImage: FC<{
  product: IProduct;
}> = ({ product }) => {
  return (
    <div style={{ display: "flex" }}>
      <Image
        src={product.imageUrl}
        alt='OG Image'
        width={800}
        height={800}
      />
      <div>{product.name}</div>
    </div>
  );
};

const OGImage = async ({ params }: Props) => {
  const { productId } = await params;
  const { data } = await getOGProductDataById({ id: productId });

  if (!data) {
    return null;
  }

  return new ImageResponse(<ProductImage product={data} />, {
    ...size,
  });
};

export default OGImage;