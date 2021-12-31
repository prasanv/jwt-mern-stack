import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues });

  const loginNewUser = async (inputData = {}) => {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await res.json();
    return data;
  };

  const mutation = useMutation("/signup", loginNewUser);

  if (mutation.data?.user) {
    router.push({
      pathname: "/",
    });
  }

  const onSubmit = (data) => {
    reset(defaultValues);
    mutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email Address</label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9\.-_]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/,
          })}
        />
        {errors.email && (
          <span className={styles.error}>Email field is required</span>
        )}
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <span className={styles.error}>Password field is required</span>
        )}
        <button type="submit">Log in</button>
      </form>
      {mutation.data?.errors?.errMsg && (
        <div style={{ textAlign: "center" }}>
          <span className={styles.specialError}>
            {mutation.data?.errors?.errMsg}
          </span>
        </div>
      )}
    </>
  );
};

export default Login;
