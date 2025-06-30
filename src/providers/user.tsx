"use client";

import { IUser } from "@/types/user";
import { createContext, FC, PropsWithChildren } from "react";

interface UserContextType {
  user: IUser | null;
}

export const UserContext = createContext<UserContextType>({
  user: null,
});

interface Props extends PropsWithChildren {
  user: IUser | null;
}

export const UserProvider: FC<Props> = ({ children, user }) => {
  return <UserContext value={{ user }}>{children}</UserContext>;
};