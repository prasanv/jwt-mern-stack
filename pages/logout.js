import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  const postLogout = async () => {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  const info = useQuery("/logout", postLogout, {
    cacheTime: 0,
  });

  if (info.isSuccess) {
    router.push({
      pathname: "/login",
    });
  }

  return <></>;
};

export default Logout;
