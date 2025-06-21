import { FC, Suspense } from "react";
import { getTop10 } from "@/services/get-top-10";
import { Top10Container } from "@/components/top-10-container/top-10-container";
import Loading from "./loading";

const Top10Page: FC = async () => {
  const getTop10RacketsPromise = getTop10();

  return (
    <div>
      <h1 style={{ padding: "0 20px" }}>Top 10</h1>
      <Suspense fallback={<Loading />}>
        <Top10Container promiseForResolve={getTop10RacketsPromise} />
      </Suspense>
    </div>
  );
};

export default Top10Page;
