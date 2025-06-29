import { UserProvider } from "../../providers/user";
import { getUser } from "@/services/get-user";
import { FC, PropsWithChildren } from "react";
import { Layout } from "../../components/layout/layout";

const App: FC<PropsWithChildren> = async ({ children }) => {
  const { data } = await getUser();

  return <UserProvider user={data ?? null}><Layout>{children}</Layout></UserProvider>;
};

export default App;