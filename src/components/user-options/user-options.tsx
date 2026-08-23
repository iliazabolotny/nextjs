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
    <div className={styles.userOptionsContainer}>      
      {user ? (
        <button
          disabled={isPending}
          onClick={() => startTransition(handleLogout)}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      ) : (
        <div className={styles.logoutBtn}>
          <Link href="/registry">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default UserOptions;
