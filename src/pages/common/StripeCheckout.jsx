import React from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "@components/textfield";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import Api from "@api/Api";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;

import { LoadingButton } from "@mui/lab";

import MessageBox from "@components/MessageBox";
import { useNavigate, useLocation } from "react-router";

const cardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#2D224C",
      color: "#2D224C",
      fontWeight: "500",
      fontSize: "22.2px",
      "::placeholder": {
        color: "#9691A6",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const StripeCheckout = ({ userToken, product, iva, userInfo }) => {
  const StripeIcon = () => (
    <svg width="4rem" height="3rem" viewBox="0 0 93 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.0588 3.42523L17.805 4.75398L17.7761 25.3207C17.7761 29.1192 20.6358 31.5745 24.4343 31.5745C26.543 31.5745 28.0884 31.1845 28.9405 30.7223V25.8406C28.1173 26.1728 24.0732 27.3571 24.0732 23.5731V14.4452H28.9405V8.98575H24.0732L24.0588 3.42523ZM36.9274 10.8778L36.5375 8.98575H30.9914V31.1123H37.3896V16.2217C38.9061 14.2285 41.4625 14.6185 42.2858 14.8785V8.98575C41.4192 8.68245 38.4295 8.11918 36.9274 10.8778ZM50.2582 0.435547L43.8167 1.80762V7.03596L50.2582 5.66388V0.435547ZM6.71286 15.4995C6.71286 14.5029 7.55055 14.113 8.89374 14.0985C10.8435 14.0985 13.3277 14.6907 15.2775 15.745V9.7079C13.1544 8.87021 11.0313 8.53802 8.90818 8.53802C3.70873 8.53802 0.242432 11.2533 0.242432 15.7884C0.242432 22.8943 9.9914 21.7388 9.9914 24.8007C9.9914 25.9851 8.96595 26.375 7.5361 26.375C5.413 26.375 2.66884 25.494 0.516847 24.3241V30.1013C2.89993 31.1267 5.31189 31.56 7.52166 31.56C12.8511 31.56 16.5196 29.278 16.5196 24.6563C16.5196 17.016 6.71286 18.3881 6.71286 15.4995ZM92.6626 20.309C92.6626 13.7375 89.4852 8.55246 83.3903 8.55246C77.2954 8.55246 73.5835 13.7375 73.5835 20.2657C73.5835 27.9926 77.9598 31.56 84.1991 31.56C87.261 31.56 89.5574 30.8668 91.305 29.8991V25.0752C89.5574 25.9562 87.5499 26.4906 85.0079 26.4906C82.5093 26.4906 80.314 25.6095 80.0251 22.6054H92.576C92.6049 22.2732 92.6626 20.93 92.6626 20.309ZM79.9673 17.8826C79.9673 14.994 81.7438 13.7808 83.347 13.7808C84.9212 13.7808 86.5966 14.994 86.5966 17.8826H79.9673ZM63.6613 8.55246C61.1482 8.55246 59.5306 9.73678 58.6351 10.56L58.3029 8.97131H52.6558V38.5504L59.0684 37.1928L59.0829 29.9424C60.0072 30.6212 61.3793 31.56 63.6179 31.56C68.2108 31.56 72.3992 28.2093 72.3992 20.0635C72.4137 12.6109 68.1675 8.55246 63.6613 8.55246ZM62.1303 26.245C60.6283 26.245 59.7328 25.6962 59.1118 25.0318L59.0684 15.4995C59.7328 14.7629 60.6571 14.2285 62.1303 14.2285C64.4701 14.2285 66.0877 16.8571 66.0877 20.2079C66.1021 23.6598 64.5134 26.245 62.1303 26.245ZM43.8311 31.1123H50.2727V8.98575H43.8311V31.1123Z"
        fill="#8065C9"
      />
    </svg>
  );
  const [message, setMessage] = React.useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location?.pathname;

  const formik = useFormik({
    initialValues: {
      nome: "",
      cognome: "",
      email: "",
    },
    isInitialValid: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome richiesto"),
      cognome: Yup.string().required("Cognome richiesto"),
      email: Yup.string().email("Email non valido").required("Email richiesta"),
    }),
  });

  const savePayment = async (paymentIntentId) => {
    if (path.indexOf("new-subscriber") > -1) {
      // new-subscriber
      const { error, data } = await Api.post("v2/checkout/create-user", {
        product: product.token,
        userData: {
          nome: userInfo.name,
          cognome: userInfo.lname,
          email: userInfo.email,
          token: userToken,
        },
        paymentIntent: paymentIntentId,
        type: "stripe",
      }).catch(function (error) {
        return { error: error.response.data.error };
      });

      if (data) {
        navigate("/thank-you", { replace: true, state: { iva } });
      }

      if (error) {
        setMessage({ type: "error", message: error });
      }
    } else if (path.indexOf("existing-user") > -1) {
      // existing-user
      const { error, data } = await Api.post("v2/checkout/save-payment", {
        product: product.token,
        token: userToken,
        paymentIntent: paymentIntentId,
        type: "stripe",
      }).catch(function (error) {
        return { error: error.response.data.error };
      });

      if (data) {
        navigate("/thank-you", { replace: true, state: { iva } });
      }

      if (error) {
        setMessage({ type: "error", message: error });
      }
    }
  };
  //uncomment during integration
  const handleSubmit = async () => {
    // navigate("/thank-you", { state: { iva: iva } });

    if (elements == null) {
      return;
    }

    setIsLoadingPayment(true);
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${formik.values.nome} ${formik.values.cognome}`,
        email: formik.values.email,
      },
    });

    if (result?.error?.message) {
      setMessage({ type: "error", message: result?.error?.message });
      setIsLoadingPayment(false);
      return;
    } else {
      setMessage(false);
    }

    let clientSecret;

    try {
      const { error: backendError, data } = await Api.post("v2/checkout/stripe/create-intent", {
        product: product.token,
        user_token: userToken,
        user: userInfo,
        customer: {
          nome_titolare_carta: formik.values.nome,
          cognome_titolare_carta: formik.values.cognome,
          email_titolare_carta: formik.values.email,
        },
      });

      clientSecret = data.clientSecret;
    } catch (error) {}

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setMessage({ type: "error", message: stripeError.message });
      setIsLoadingPayment(false);
    }

    if (paymentIntent) {
      setIsLoadingPayment(false);
      setMessage({
        type: "success",
        message: "Pagamento avvenuto con successo a breve verrai reindirizzato",
      });
      savePayment(paymentIntent.id);
    }
  };

  console.log({ userInfo });

  return (
    <>
      <Box
        component="form"
        sx={{
          height: "100%",
          ["@media (min-width:736px)"]: {
            maxHeight: "50vh",
          },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8065C9",
          },
          "scrollbar-width": "thin",
          "scrollbar-color": "#8065C9 green",
          ".MuiInputBase-root input": {
            fontSize: ["20px", "1.4rem"],
            color: "#2D224C",
          },
          ".MuiFormHelperText-root ": {
            // height: "10px!important",
          },
        }}
        className="flex flex-col gap-8 overflow-x-hidden"
      >
        <TextField className="w-full" placeholder="Nome titolare carta" name="nome" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.nome} error={formik.errors.nome && formik.touched.nome} helperText={formik.touched.nome && formik.errors.nome} />
        <TextField className="w-full" placeholder="Cognome titolare carta" name="cognome" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.cognome} error={formik.errors.cognome && formik.touched.cognome} helperText={formik.touched.cognome && formik.errors.cognome} />

        <TextField className="w-full" placeholder="Email titolare carta" name="email" type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} helperText={formik.touched.email && formik.errors.email} error={formik.touched.email && formik.errors.email} />

        <CardElement id="card-element" className="text-edu-100" options={cardElementOptions} />
      </Box>

      <Box sx={{ height: "!fit-content", flexDirection: "row" }} className={"flex max-w-full items-end justify-end flex-auto mt-auto"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box className="flex flex-row items-center justify-center gap-2">
            <Typography color="secondary">Powered by </Typography>
            <StripeIcon />
          </Box>

          <LoadingButton
            type="button"
            color="buttonGreen"
            sx={{
              height: "59px",
              width: "100%",
              mt: 0,
            }}
            size="large"
            variant="contained"
            disabled={Object.values(formik.errors).length !== 0}
            loading={false}
            onClick={() => handleSubmit()}
          >
            PAGA
          </LoadingButton>
        </Box>
        {message ? <MessageBox type={message.type} message={message.message} /> : null}
      </Box>
    </>
  );
};

export default (props) => (
  <Elements stripe={loadStripe(STRIPE_PK)}>
    <StripeCheckout {...props} />
  </Elements>
);
