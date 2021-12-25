import React from "react";
import { useQuery } from "react-query";

const Test = () => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/");
    const data = await res.json();
    return data;
  };
  const result = useQuery("test", fetchData);

  return (
    <div>
      <p>{result.isSuccess && result.data.name}</p>
    </div>
  );
};

export default Test;
