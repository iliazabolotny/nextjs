import { FC } from "react";
import { IRacket } from "@/types/racket";
import { RacketCard } from "../racket-card/racket-card";
import styles from "./rackets-grid.module.css";

type Props = {
  data: IRacket[];
};

export const RacketsGrid: FC<Props> = ({ data }) => {
  return (
   <div className={styles.cardsContainer}>
        {data?.map((item) => (
          <RacketCard racket={item} key={item.id} />
        ))}
      </div>
  );
};