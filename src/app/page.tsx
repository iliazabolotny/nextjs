import Image from "next/image";
import { rackets } from "../../materials/mock";

export default function Home() {
  return (
    <div>
      <div>
        Rackets
      </div>
      <div>
        {rackets?.map((item) => (
          <div key={item.id}>
            <Image
              unoptimized
              alt={item.model}
              src={item.imageUrl}
              width={400}
              height={500}
            />
            {item.model}
          </div>
        ))}
      </div>
    </div>
  );
}
