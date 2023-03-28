import { Box, Button, Checkbox, Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { TextField } from "@components/textfield";
import { useNavigate } from "react-router-dom";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PaymentForm = ({ iva }) => {
  const navigate = useNavigate();
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
  return (
    <Elements stripe={loadStripe(STRIPE_PK)}>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Effettua il pagamento
      </h1>
      <Box
        sx={{
          display: ["grid"],
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "1rem",
          gridTemplateRows: ["30vh 20vh"],
          ["@media (min-width:1180px)"]: {
            gridTemplateRows: ["minmax(18.5rem,30vh) minmax(3rem,15vh)"],
            gap: "0px",
          },
        }}
        className=" "
      >
        <Box
          component="form"
          sx={{
            height: "100%",
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
          }}
          className="flex flex-col gap-8"
        >
          <TextField placeholder="Nome titolare carta" />
          <TextField placeholder="Cognome titolare carta" />
          <TextField placeholder="Email titolare carta" />
          <CardElement
            id="card-element"
            className="text-edu-100"
            options={cardElementOptions}
          />
        </Box>

        <Button
          color="green"
          sx={{
            height: "59px",
          }}
          variant="contained"
          className="mt-8"
          onClick={() => {
            navigate("/thank-you", {
              state: {
                iva,
              },
            });
          }}
        >
          Procedi
        </Button>
      </Box>
    </Elements>
  );
};
export default PaymentForm;
