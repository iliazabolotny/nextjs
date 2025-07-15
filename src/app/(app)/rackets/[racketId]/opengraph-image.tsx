import { getRacketOgDataById } from "../../../../services/get-racket-og-by-id";
import { IRacket } from "@/types/racket";
import { ImageResponse } from "next/og";
import { FC } from "react";

export const alt = "OG image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ racketId: string }>;
};

const Image: FC<{
  racket: IRacket;
}> = ({ racket }) => {
  return (
    <div style={{ display: "flex" }}>
      <img
        src={racket.imageUrl}
        style={{ width: "100px", height: "100px" }}
        alt=''
      />
      <div>{racket.name}</div>
    </div>
  );
};

const OGImage = async ({ params }: Props) => {
  const { racketId } = await params;
  const { data } = await getRacketOgDataById({ id: racketId });

  if (!data) {
    return null;
  }

  return new ImageResponse(<Image racket={data} />, {
    ...size,
  });
};

export default OGImage;