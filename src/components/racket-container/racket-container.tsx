import { FC } from "react";
import { notFound } from "next/navigation";
import { getRacketById } from "@/services/get-racket-by-id";
import { Racket } from "../racket/racket";
import { getUser } from "@/services/get-user";

type Props = {
  racketId: string;
};

export const RacketContainer: FC<Props> = async ({ racketId }) => {
  const { data, isError } = await getRacketById({ id: racketId });

    const { data: user } = await getUser();

  if (isError) {
    return "someError";
  }

  if (!data) {
    return notFound();
  }

  return <Racket racket={data} user={user!} />;
};
