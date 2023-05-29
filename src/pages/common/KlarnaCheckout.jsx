import React from "react";
import Api from "@api/Api";
import { Box, CircularProgress } from "@mui/material";
import MessageBox from "@components/MessageBox";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import useCheckout from "../hooks/useCheckout";

const KlarnaCheckout = ({ product, userToken, iva, userInfo }) => {
  const [message, setMessage] = React.useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [authorizing, setAuthorizing] = React.useState(false);
  const navigate = useNavigate();
  const { data: checkoutData } = useCheckout({ session: 1 });

  const quantity = userInfo?.quantity ?? 1;

  const priceData = {
    no_iva: product?.discount ? product?.original_price_no_iva : product?.no_iva,
    iva: product?.discount ? product?.original_price_iva : product?.iva,
    discount: product?.discount ? product?.discount : 0,
    price: product?.price,
  };

  const datetime = moment().format("YYYYMMDD-HHmmss");
  const post = {
    purchase_country: "IT",
    purchase_currency: "EUR",
    locale: "it-IT",
    order_amount: priceData.price * quantity,
    order_tax_amount: 0,
    order_lines: [
      {
        type: "digital",
        reference: `${userInfo.id}-${datetime}`,
        name: "Edusogno Academy",
        quantity: quantity,
        unit_price: priceData.price,
        tax_rate: 0,
        total_amount: priceData.price * quantity,
        total_discount_amount: 0,
        total_tax_amount: 0,
        product_url: "https://www.edusogno.com/",
        image_url: "https://edusogno.com/wp-content/uploads/2021/02/website-image-squared.png",
      },
    ],
  };

  const authorizePayment = () => {
    setError(false);
    setMessage(false);
    setAuthorizing(true);

    Klarna.Payments.authorize(
      {
        payment_method_category: "pay_later",
      },
      {
        ...post,
      },
      async function (res) {
        if (res.approved == true) {
          var auth = res.authorization_token;

          const { error, data } = await Api.post("v2/checkout/klarna/create-order", {
            product: product.token,
            auth,
            token: userToken,
            user: userInfo,
            post,
            discount_code: checkoutData?.product?.discount_code,
          }).catch(function (error) {
            return { error: error.response.data.error };
          });

          if (data?.success) {
            setMessage({
              type: "success",
              message: "Pagamento avvenuto con successo a breve verrai reindirizzato",
            });
            setAuthorizing(false);
            navigate("/thank-you", { replace: true, state: { iva } });
          }
        } else {
          setAuthorizing(false);
          setMessage({ type: "error", message: "errorr" });
        }
      }
    );
  };

  const klarnaAsyncCallback = (client_token) => {
    Klarna.Payments.init({
      client_token,
    });

    Klarna.Payments.load(
      {
        container: "#klarna_container",
        payment_method_category: "pay_later",
      },
      function (res) {
        setIsLoadingCheckout(false);
      }
    );
  };

  const startSession = async () => {
    const { error, data } = await Api.post("v2/checkout/klarna/start-session", {
      product: product.token,
      user_token: userToken,
      post,
      discount_code: checkoutData?.product?.discount_code,
    }).catch(function (error) {
      return { error: error.response.data.error };
    });

    if (data) {
      klarnaAsyncCallback(data.client_token);
    }
  };

  React.useEffect(() => {
    if (product) startSession();
  }, [product]);

  return (
    <div className="flex flex-col h -full">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <div id="klarna_container">{isLoadingCheckout ? <CircularProgress /> : null}</div>
      </Box>
      <Box className="flex flex-row mt-auto w-full">
        <Box className=" !h-fit w-full mt-auto flex items-center flex-row">
          <LoadingButton loading={false} color="buttonGreen" variant="contained" sx={{ mt: 0, width: "100%", height: "59px" }} size="large" onClick={() => authorizePayment()}>
            Paga
          </LoadingButton>
        </Box>
        {message ? <MessageBox type={message.type} message={message.message} /> : null}
      </Box>
    </div>
  );
};

export default KlarnaCheckout;
