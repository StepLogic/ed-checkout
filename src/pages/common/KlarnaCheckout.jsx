import React from "react";
const BASE = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  FormHelperText,
  Link,
  Skeleton,
} from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import MessageBox from "@components/MessageBox";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";

const KlarnaCheckout = ({ product, showFormSelect, user, iva }) => {
  const [message, setMessage] = React.useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [authorizing, setAuthorizing] = React.useState(false);
  const navigate = useNavigate();

  const authorizePayment = () => {
    navigate("/thank-you", { replace: true, state: { iva } });
  };

  // const authorizePayment = () => {
  //   setError(false);
  //   setMessage(false);
  //   setAuthorizing(true);
  //   Klarna.Payments.authorize(
  //     {
  //       payment_method_category: "pay_later",
  //     },
  //     {
  //       order_amount: product.price,
  //       order_tax_amount: 0,
  //       order_lines: [
  //         {
  //           type: "digital",
  //           reference: "01",
  //           name: "Edusogno Academy",
  //           quantity: 1,
  //           unit_price: product.price,
  //           tax_rate: 0,
  //           total_amount: product.price,
  //           total_discount_amount: 0,
  //           total_tax_amount: 0,
  //         },
  //       ],
  //     },
  //     async function (res) {
  //       if (res.approved == true) {
  //         var auth = res.authorization_token;
  //
  //         const { error, data } = await axios
  //           .post(BASE + "v1/checkout/klarna/create-order", {
  //             product: product.token,
  //             auth,
  //             token: user,
  //           })
  //           .catch(function (error) {
  //             return { error: error.response.data.error };
  //           });
  //
  //         if (data?.success) {
  //           setMessage({
  //             type: "success",
  //             message: "Pagamento avvenuto con successo a breve verrai reindirizzato",
  //           });
  //           setAuthorizing(false);
  //           navigate("/thank-you", { replace: true,state:{iva} });
  //         }
  //       } else {
  //         setAuthorizing(false);
  //         setMessage({ type: "error", message: "errorr" });
  //       }
  //     }
  //   );
  // };

  // const klarnaAsyncCallback = (client_token) => {
  //   Klarna.Payments.init({
  //     client_token,
  //   });
  //
  //   Klarna.Payments.load(
  //     {
  //       container: "#klarna_container",
  //       payment_method_category: "pay_later",
  //     },
  //     function (res) {
  //
  //       setIsLoadingCheckout(false);
  //     }
  //   );
  // };

  //   const startKlarna = (client_token) => {};

  // const startSession = async () => {
  //   const { error, data } = await axios
  //     .post(BASE + "v1/checkout/klarna/start-session", {
  //       product: product.token,
  //       user_token: user,
  //     })
  //     .catch(function (error) {
  //       return { error: error.response.data.error };
  //     });
  //
  //   if (data) {
  //     klarnaAsyncCallback(data.client_token);
  //   }
  // };
  //
  // React.useEffect(() => {
  //   startSession();
  // }, []);

  return (
    <div className="flex flex-col h -full">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <div id="klarna_container">
          {isLoadingCheckout ? <CircularProgress /> : null}
        </div>
      </Box>
      <Box className="flex flex-row mt-auto w-full">
        <Box className=" !h-fit w-full mt-auto flex items-center flex-row">
          {/* <IconButton
            disabled={authorizing}
            className="mr-2 font-semibold aspect-square text-[16px] md:text[18px] rounded-full "
            color="buttonGreen"
          >
            <NavigateBeforeRoundedIcon fontSize="large" />
          </IconButton> */}

          <LoadingButton
            loadingPosition="end"
            loading={authorizing}
            color="buttonGreen"
            variant="contained"
            sx={{ mt: 0, width: "100%", height: "59px" }}
            size="large"
            onClick={() => authorizePayment()}
          >
            Paga
          </LoadingButton>
        </Box>
        {message ? (
          <MessageBox type={message.type} message={message.message} />
        ) : null}
      </Box>
    </div>
  );
};

export default KlarnaCheckout;
