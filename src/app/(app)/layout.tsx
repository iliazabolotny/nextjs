import { UserProvider } from "../../providers/user";
import { getUser } from "@/services/get-user";
import { FC, PropsWithChildren } from "react";

const App: FC<PropsWithChildren> = async ({ children }) => {
  const { data } = await getUser();

  return <UserProvider user={data ?? null}>{children}</UserProvider>;
};

export default App;