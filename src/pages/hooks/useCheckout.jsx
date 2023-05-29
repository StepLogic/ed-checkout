import { useLocation, useNavigate, useParams } from "react-router-dom";
import Api from "@api/Api";
import { useQuery } from "react-query";
import React from "react";

export default function useCheckout({ session }) {
  const { productTk, userTk } = useParams();
  const [data, setData] = React.useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.pathname;

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
    let submitData = {
      product: productTk,
      user: userTk,
    };

    if (path.indexOf("new-user") > -1) {
      if (!submitData.hasOwnProperty("whole_amount")) {
        submitData = {
          ...submitData,
          whole_amount: true,
        };
      }
    }
    return await Api.post("v2/checkout/start-session", submitData);
  };

  React.useEffect(() => {
    if (!checkoutData) return;

    console.log({ checkoutData });

    setData(checkoutData);
  }, [checkoutData]);

  return { data, setData };
}
