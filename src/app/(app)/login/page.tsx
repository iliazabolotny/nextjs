"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "./login-action";
import { LoginState } from "@/types/login";
import styles from "./login.module.css";

const Login = () => {
  const [{ error, redirectTo }, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(loginAction, {
    error: "",
    redirectTo: "",
  });

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);

  return (
    <div className={styles.formContainer}>
      <form action={formAction} className={styles.form}>
        <div className={styles.formElements}>
          <div>
            <label htmlFor="login">Login: </label>
            <input name="login" type="text" />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input name="password" type="password" />
          </div>

          {error && <div>{error}</div>}

          <button disabled={isPending} className={styles.formBtn}>login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
