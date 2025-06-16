import Image from "next/image";
import { rackets } from "../../../materials/mock";
import styles from './rackets.module.css';

export default function Rackets() {
    return (
    <div className={styles.homeContainer}>
      <div className={styles.pageTitle}>
        Rackets Brands
      </div>
      <div className={styles.cardsContainer}>
        {rackets?.map((item) => (
          <div key={item.id}>
            <Image
              unoptimized
              alt={item.model}
              src={item.imageUrl}
              width={500}
              height={600}
            />
            <div className={styles.model}>
              {item.model}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}