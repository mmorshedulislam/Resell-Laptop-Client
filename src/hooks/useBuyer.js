import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [buyerLoading, setBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_PORT}/users/buyer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsBuyer(data.isBuyer);
          setBuyerLoading(false);
        });
    }
  }, [email, isBuyer]);
  return [isBuyer, buyerLoading];
};

export default useBuyer;
