import React, { useMemo } from "react";
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, Input, Link, MenuItem, TextField, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { getList } from "country-list-with-dial-code-and-flag";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { Select } from "../../../components/select";
import klarna from "../../../assets/img/klarna.svg";
import MessageBox from "../../../components/MessageBox";
import { useNavigate } from "react-router";

const BASE = import.meta.env.VITE_BASE_URL;
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

const StripeInstallments = ({ userToken, product, user }) => {
  const StripeIcon = () => (
    <svg width="4rem" height="3rem" viewBox="0 0 93 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.0588 3.42523L17.805 4.75398L17.7761 25.3207C17.7761 29.1192 20.6358 31.5745 24.4343 31.5745C26.543 31.5745 28.0884 31.1845 28.9405 30.7223V25.8406C28.1173 26.1728 24.0732 27.3571 24.0732 23.5731V14.4452H28.9405V8.98575H24.0732L24.0588 3.42523ZM36.9274 10.8778L36.5375 8.98575H30.9914V31.1123H37.3896V16.2217C38.9061 14.2285 41.4625 14.6185 42.2858 14.8785V8.98575C41.4192 8.68245 38.4295 8.11918 36.9274 10.8778ZM50.2582 0.435547L43.8167 1.80762V7.03596L50.2582 5.66388V0.435547ZM6.71286 15.4995C6.71286 14.5029 7.55055 14.113 8.89374 14.0985C10.8435 14.0985 13.3277 14.6907 15.2775 15.745V9.7079C13.1544 8.87021 11.0313 8.53802 8.90818 8.53802C3.70873 8.53802 0.242432 11.2533 0.242432 15.7884C0.242432 22.8943 9.9914 21.7388 9.9914 24.8007C9.9914 25.9851 8.96595 26.375 7.5361 26.375C5.413 26.375 2.66884 25.494 0.516847 24.3241V30.1013C2.89993 31.1267 5.31189 31.56 7.52166 31.56C12.8511 31.56 16.5196 29.278 16.5196 24.6563C16.5196 17.016 6.71286 18.3881 6.71286 15.4995ZM92.6626 20.309C92.6626 13.7375 89.4852 8.55246 83.3903 8.55246C77.2954 8.55246 73.5835 13.7375 73.5835 20.2657C73.5835 27.9926 77.9598 31.56 84.1991 31.56C87.261 31.56 89.5574 30.8668 91.305 29.8991V25.0752C89.5574 25.9562 87.5499 26.4906 85.0079 26.4906C82.5093 26.4906 80.314 25.6095 80.0251 22.6054H92.576C92.6049 22.2732 92.6626 20.93 92.6626 20.309ZM79.9673 17.8826C79.9673 14.994 81.7438 13.7808 83.347 13.7808C84.9212 13.7808 86.5966 14.994 86.5966 17.8826H79.9673ZM63.6613 8.55246C61.1482 8.55246 59.5306 9.73678 58.6351 10.56L58.3029 8.97131H52.6558V38.5504L59.0684 37.1928L59.0829 29.9424C60.0072 30.6212 61.3793 31.56 63.6179 31.56C68.2108 31.56 72.3992 28.2093 72.3992 20.0635C72.4137 12.6109 68.1675 8.55246 63.6613 8.55246ZM62.1303 26.245C60.6283 26.245 59.7328 25.6962 59.1118 25.0318L59.0684 15.4995C59.7328 14.7629 60.6571 14.2285 62.1303 14.2285C64.4701 14.2285 66.0877 16.8571 66.0877 20.2079C66.1021 23.6598 64.5134 26.245 62.1303 26.245ZM43.8311 31.1123H50.2727V8.98575H43.8311V31.1123Z"
        fill="#8065C9"
      />
    </svg>
  );

  const countryList = useMemo(
    () =>
      getList().map((item) => {
        return {
          label: `${item.name}`,
          value: item.code,
        };
      }),
    []
  );

  const [message, setMessage] = React.useState(false);
  const [cardHolderDetails, setCardHolderDetails] = React.useState(null);
  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);
  const [error, setError] = React.useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();

  const checkErrors = async () => {
    let errors = {};
    if (cardHolderDetails?.nome_titolare_carta == undefined || cardHolderDetails?.nome_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        nome_titolare_carta: "Il nome del titolare è richiesto",
      };
    } else {
      delete errors?.nome_titolare_carta;
    }

    if (cardHolderDetails?.cognome_titolare_carta == undefined || cardHolderDetails?.cognome_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        cognome_titolare_carta: "Il cognome del titolare è richiesto",
      };
      setError((prev) => ({ ...prev }));
    } else {
      delete errors?.cognome_titolare_carta;
    }

    if (cardHolderDetails?.email_titolare_carta == undefined || cardHolderDetails?.email_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        email_titolare_carta: "La mail del titolare è richiesta",
      };
    } else {
      delete errors?.email_titolare_carta;
    }

    if (cardHolderDetails?.nazione == undefined || cardHolderDetails?.nazione?.trim() == "") {
      errors = {
        ...errors,
        nazione: "La nazione di residenza è richiesta",
      };
    } else {
      delete errors?.nazione;
    }

    if (errors?.nome_titolare_carta == undefined && errors?.cognome_titolare_carta == undefined && errors?.email_titolare_carta == undefined) {
      setError(false);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  React.useEffect(() => {
    if (cardHolderDetails == null) return;
  }, [cardHolderDetails]);

  const handleChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    setError(false);

    if (["nome_titolare_carta", "cognome_titolare_carta"].includes(name)) {
      val = val.strCapitalization();
    }

    setCardHolderDetails((prev) => ({ ...prev, [name]: val }));
  };

  const savePayment = async () => {
    const { error, data } = await axios
      .post(BASE + "v1/checkout/save-payment", {
        product: product.token,
        token: userToken,
        type: "stripe",
      })
      .catch(function (error) {
        return { error: error.response.data.error };
      });

    if (data) {
      navigate("/thank-you", { replace: true });
    }

    if (error) {
      setMessage({ type: "error", message: error });
    }
  };

  const handleSubmit = async () => {
    const errors = await checkErrors();
    //
    if (errors) return;

    setMessage(false);
    if (!stripe || !elements) return;

    setIsLoadingPayment(true);

    let clientSecret;

    try {
      const { error: backendError, data } = await axios.post(BASE + "v1/checkout/stripe/create-intent", {
        product: product.token,
        user_token: userToken,
        customer: cardHolderDetails,
        payment_method_type: "klarna",
      });

      clientSecret = data.clientSecret;
    } catch (error) {}

    console.log(window.location.origin);

    const return_url = `${window.location.origin}/user/thank-you-klarna?product=${product.token}&user_token=${userToken}`;

    const { error: stripeError, paymentIntent } = await stripe.confirmKlarnaPayment(clientSecret, {
      payment_method: {
        billing_details: {
          email: cardHolderDetails?.email_titolare_carta.trim(),
          address: {
            country: cardHolderDetails?.nazione,
          },
        },
      },
      return_url,
    });

    console.log({ stripeError, paymentIntent });

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

  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: error ? "0rem" : "1rem",
          ".MuiInputBase-root": {
            margin: "0.2rem",
          },
          ".MuiInputBase-root input": {
            fontSize: "1.4rem",
            color: "#2D224C",
          },
        }}
        className=""
      >
        <FormControl fullWidth>
          <Input className="w-full" error={error?.nome_titolare_carta ? true : false} name="nome_titolare_carta" variant="standard" color="primary" value={cardHolderDetails?.nome_titolare_carta ?? ""} placeholder="Nome titolare carta" sx={{}} onChange={handleChange} />
          <FormHelperText>{error?.nome_titolare_carta ? <small>{error?.nome_titolare_carta}</small> : null}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <Input className="w-full" error={error?.cognome_titolare_carta ? true : false} name="cognome_titolare_carta" variant="standard" color="primary" value={cardHolderDetails?.cognome_titolare_carta ?? ""} placeholder="Cognome titolare carta" sx={{}} onChange={handleChange} />
          <FormHelperText>{error?.cognome_titolare_carta ? <small>{error?.cognome_titolare_carta}</small> : null}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <Input className="w-full" error={error?.email_titolare_carta ? true : false} name="email_titolare_carta" variant="standard" color="primary" value={cardHolderDetails?.email_titolare_carta ?? ""} placeholder="Email titolare carta" sx={{}} onChange={handleChange} />
          <FormHelperText>{error?.email_titolare_carta ? <small>{error?.email_titolare_carta}</small> : null}</FormHelperText>
        </FormControl>

        {/* <CardElement id="card-element" className="text-edu-100" options={cardElementOptions} /> */}

        <FormControl fullWidth>
          <Select options={countryList} error={error?.nazione} name="nazione" variant="standard" color="primary" value={cardHolderDetails?.nazione ?? ""} label="Nazione residenza" sx={{}} onChange={handleChange} />
          <FormHelperText>{error?.nazione ? <small>{error?.nazione}</small> : null}</FormHelperText>
        </FormControl>
      </Box>

      <Box sx={{ height: "!fit-content", flexDirection: "row" }} className={"flex max-w-full items-end justify-end flex-auto"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box className="flex flex-row items-center justify-center gap-2 mb-2">
            <Typography color="secondary">Powered by </Typography>
            <img src={klarna} className="w-[20%] lg:w-auto" />
          </Box>

          <LoadingButton type="submit" color="buttonGreen" sx={{ mt: 0, width: "100%" }} size="large" variant="contained" disabled={isLoadingPayment || error} loading={isLoadingPayment} onClick={() => handleSubmit()} loadingPosition="end">
            PAGA
          </LoadingButton>
        </Box>
        {message ? <MessageBox type={message.type} message={message.message} /> : null}
      </Box>
    </>
  );
};

export default StripeInstallments;
