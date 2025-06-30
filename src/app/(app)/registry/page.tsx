"use client";

import { useActionState, useEffect } from "react";
import { registryAction } from "./registry-action";
import { LoginState } from "@/types/login";

import styles from "./registry.module.css";

const RegistryPage = () => {
  const [{ error, redirectTo }, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(registryAction, {
    error: "",
    redirectTo: "",
  });

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);

  return (
    <div>
      <h1 className={styles.header}>Register new user</h1>
      <form action={formAction} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="login">Login:</label>
          <input name="login" id="login" type="text" />
        </div>

        <div>
          <label className={styles.login} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.password}
            name="password"
            id="password"
            type="password"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button disabled={isPending} className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistryPage;
