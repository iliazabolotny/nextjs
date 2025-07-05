import { UserProvider } from "../../providers/user";
import { getUser } from "@/services/get-user";
import { FC, PropsWithChildren } from "react";
import { Layout } from "../../components/layout/layout";
import { FavoriteProvider } from "@/providers/favorite";

const App: FC<PropsWithChildren> = async ({ children }) => {
  const { data } = await getUser();

  return (
    <FavoriteProvider>
      <UserProvider user={data ?? null}>
        <Layout>{children}</Layout>
      </UserProvider>
    </FavoriteProvider>
  );
};

export default App;
