import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import smoothie from "../public/smoothie.png";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const Smoothies = (props) => {
  const router = useRouter();

  const fetchSmoothies = async () => {
    const response = await fetch("http://localhost:8080/user_smoothies", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return {
      resData: data,
      resCode: response.status,
    };
  };

  const info = useQuery("/smoothies", fetchSmoothies, {
    cacheTime: 0,
  });

  // console.log(info);

  if (info.data?.resCode === 400) {
    router.push({
      pathname: "/login",
    });
  }

  return (
    <div>
      {info.isLoading && "Loading..."}
      {info.data?.resCode === 200 && (
        <div>
          <h3>
            Welcome, {info.data?.resData?.email} here are our products for you{" "}
          </h3>
          <ul className={styles.recipes}>
            {info.data?.resData?.products?.map((ind) => (
              <li className={styles.recipe} key={ind.id}>
                <Image src={smoothie} alt="smoothie-image" />
                <h4>{ind.name}</h4>
                <p>{ind.ingredients}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Smoothies;
