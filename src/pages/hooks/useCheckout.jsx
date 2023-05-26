import { useNavigate, useParams } from "react-router-dom";
import Api from "@api/Api";
import { useQuery } from "react-query";

export default function useCheckout({ session }) {
  const { productTk, userTk } = useParams();
  const navigate = useNavigate();

  const userData = () => {
    return Api.post("v2/checkout/start-session", {
      product: productTk,
      user: userTk,
    });
  };

  const keyCache = "checkout";

  return useQuery(
    [keyCache],
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
}
