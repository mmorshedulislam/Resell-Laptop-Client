import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_PORT}/users/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.isSeller);
          setBuyerLoading(false);
        });
    }
  }, [email, isSeller]);
  return [isSeller, sellerLoading];
};

export default useSeller;
