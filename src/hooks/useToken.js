import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_PORT}/jwt`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.token);
          localStorage.setItem("accessToken", token);
        });
    }
  }, [email, token]);
  return [token];
};

export default useToken;
