import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// import CheckoutSession from "./CheckoutSession";
import { LinearProgress } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutSessionExistingUser from "./CheckoutSessionExistingUser";
import NoPage from "../NoPage";
const BASE = import.meta.env.VITE_BASE_URL;
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
import "./index.css";
import LandingPaymentPage from "./landing";
import CheckoutSessionNew from "./checkout-session-new/CheckoutSessionNew";
document.title = "Checkout";
const CheckoutSession = React.lazy(() => import("./CheckoutSession"));
const CheckoutSessionExistingUser = React.lazy(() =>
  import("./CheckoutSessionExistingUser")
);
const CheckoutWrapper = ({ session }) => {
  const { productTk, userTk } = useParams();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [startCheckoutSession, setStartCheckoutSession] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  const userData = async () => {
    const { error, data } = await axios
      .post(BASE + "v1/checkout/start-session", {
        product: productTk,
        user: userTk,
      })
      .catch((error) => {
        //

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

    // if (session == 1) {
    //   setStartCheckoutSession(true);
    // }

    setData((prev) => ({
      user: data?.user,
      product: data?.product,
      initialPayment: data?.initialPayment,
    }));
  };

  React.useEffect(() => {
    userData();
  }, []);

  if (isError) {
    return <NoPage />;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  const stripe = loadStripe(STRIPE_PK);

  const getPageForSection = (key) => {
    console.log("data", data);
    switch (key) {
      case 2:
        return <CheckoutSessionExistingUser data={data} />;
      case 3:
        return <CheckoutSessionNew data={data} />;
      default:
        return <CheckoutSession data={data} goBack={setStartCheckoutSession} />;
    }
  };
  return (
    <>
      {!startCheckoutSession && session == 1 ? (
        <LandingPaymentPage
          data={data}
          startSession={setStartCheckoutSession}
        />
      ) : (
        <Elements stripe={stripe}>{getPageForSection(session)}</Elements>
      )}
    </>
  );
};

export default CheckoutWrapper;
