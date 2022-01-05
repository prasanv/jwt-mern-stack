import { useForm } from "react-hook-form";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
    security_question: "",
    security_answer: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues });

  const addNewUser = async (inputData = {}) => {
    const res = await fetch("http://localhost:8080/signup", {
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

  const mutation = useMutation("/signup", addNewUser);

  if (mutation.data?.user) {
    router.push({
      pathname: "/smoothies",
    });
  }

  if (mutation.data?.errors) {
    console.log(mutation.data?.errors);
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
        <label>Security Question</label>
        <input
          {...register("security_question", { required: true, minLength: 6 })}
        />
        {errors.security_question && (
          <span className={styles.error}>
            Security Question field is required
          </span>
        )}
        <label>Security Answer</label>
        <input
          type="password"
          {...register("security_answer", { required: true, minLength: 2 })}
        />
        {errors.security_answer && (
          <span className={styles.error}>
            Security Answer field is required
          </span>
        )}
        <button type="submit">Sign up</button>
      </form>
      {mutation.data?.errors?.email && (
        <div style={{ textAlign: "center" }}>
          <span className={styles.specialError}>
            {mutation.data?.errors?.email}
          </span>
        </div>
      )}
    </>
  );
};

export default Signup;
