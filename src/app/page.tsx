import Image from "next/image";
import { rackets } from "../../materials/mock";

export default function Home() {
  return (
    <div>
      {
        rackets?.map(item =>
            <div key={item.id}>
              <Image alt={item.model} src={item.imageUrl} width={300} height={300} />
              {item.model}
            </div>
        )
      }
    </div>
  );
}
