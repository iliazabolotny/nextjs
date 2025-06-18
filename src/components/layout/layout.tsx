import { PropsWithChildren, FC } from "react";

import Header from "../header/header";
import Footer from "../footer/footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
