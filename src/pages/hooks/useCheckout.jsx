import { useNavigate, useParams } from "react-router-dom";
import Api from "@api/Api";
import { useQuery } from "react-query";
import React from "react";

export default function useCheckout({ session }) {
  const { productTk, userTk } = useParams();
  const [data, setData] = React.useState(undefined);
  const navigate = useNavigate();

  const { data: checkoutData } = useQuery(
    ["checkout", productTk],
    async () => {
      const { data } = await userData();
      return data;
    },
    {
      keepPreviousData: true,
      onError: () => {
        navigate("/not-found", { replace: true });
      },
    }
  );

  const userData = async () => {
    return await Api.post("v2/checkout/start-session", {
      product: productTk,
      user: userTk,
    });
  };

  React.useEffect(() => {
    if (!checkoutData) return;

    console.log({ checkoutData });

    setData(checkoutData);
  }, [checkoutData]);

  return { data, setData };
}
