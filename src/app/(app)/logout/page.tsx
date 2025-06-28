"use client";

import { use, useTransition } from "react";
import { BASE_API_URL } from "@/constants/api";
import { UserContext } from "@/providers/user";

const handleLogout = async () => {
  await fetch(`${BASE_API_URL}/auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });

  location.assign("/");
};

const LogOut = () => {
  const { user } = use(UserContext);

  const [isPending, startTransition] = useTransition();

  if (!user) {
    return;
  }

  return (
    <button disabled={isPending} onClick={() => startTransition(handleLogout)}>
      logout
    </button>
  );
};

export default LogOut;