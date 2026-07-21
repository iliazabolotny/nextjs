"use client";

import { FC } from "react";

type Props = {
  reset: () => void;
};

const GlobalError: FC<Props> = ({ reset }) => {
  return (
    <html lang='en'>
      <body>
        <button onClick={reset}>Please, refresh</button>
      </body>
    </html>
  );
};

export default GlobalError;