"use client";
import Link from "../link-container/link";
import { UserContext } from "@/providers/user";
import { use, useTransition } from "react";
import { BASE_API_URL } from "@/constants/api";
import styles from "./user-options.module.css";

const handleLogout = async () => {
  await fetch(`${BASE_API_URL}/auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });

  location.assign("/");
};

const UserOptions = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = use(UserContext);

  return (
    <div>
      <Link href="/registry">Register</Link>
      {user ? (
        <button
          disabled={isPending}
          onClick={() => startTransition(handleLogout)}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserOptions;
