import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {is} from "date-fns/locale";

export default function useCheckout({ session }) {
  const { productTk, userTk } = useParams();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_BASE_URL;
  const userData = async () => {
    const { error, data } = await axios
      .post(BASE + "v1/checkout/start-session", {
        product: productTk,
        user: userTk,
      })
      .catch((error) => {
        return { error: error.response.data.message };
      });

    if (data?.user?.token && session == 1) {
      setIsLoading(false);
      if (data?.user?.created_account) {
        navigate("/dashboard");
        return;
      } else if (data?.user?.created_account == false) {
        navigate("/register/" + data?.user?.token);
        return;
      }
    } else if (data?.user?.token && session === 3) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }

    if (error) {
      setIsLoading(false);
      setIsError(true);
    }

    setData((prev) => ({
      user: data?.user,
      product: data?.product,
      initialPayment: data?.initialPayment,
    }));
  };

  React.useEffect(() => {
    userData();
  }, []);
  if(isError) navigate("not-found",{replace:true})
  // if(isError) navigate("not-found",{replace:true})
  return { data, isError, isLoading };
}
