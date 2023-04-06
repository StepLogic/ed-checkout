import { Box, Button, Typography } from "@mui/material";
import React from "react";
import klarna from "../../assets/img/klarna.svg";
import bgCheckout from "@assets/img/bgCheckout.svg";
import bgCheckoutMobile from "@assets/img/bgCheckoutMobile.svg";
import { useWindowSize } from "../hooks/useWindowSize.jsx";
import PDFviewer from "../common/pdf/PDFviewer";
import TopNav from "./TopNav.jsx";
import useCheckout from "../hooks/useCheckout.jsx";
import IVAForm from "../common/IVAForm.jsx";
import PaymentOption from "../common/PaymentOptions";
import PaymentForm from "../common/PaymentForm";
import Counter from "./Counter";
Number.prototype.toDecimalsEuro = function () {
  let parsed = parseFloat(this / 100)
    .toFixed(2)
    .split(".");

  return (
    <div className="flex">
      <div className="text-3xl">
        {parsed[0]},{parsed[1]}€
      </div>
      {/* <div>{parsed[1]}€</div> */}
    </div>
  );
};
const SideBar = ({
  onProductQuantityChange,
  setShowPDF,
  enableViewProduct,
  enableDiscount,
  enableCounter,
  isNewSubscriber = false,
}) => {
  const {
    data: { user, product },
    isError,
    isLoading,
  } = useCheckout({ session: 1 });

  const [width] = useWindowSize();
  const [price, setPrice] = React.useState(null);
  const [productQuantity, setProductQuantity] = React.useState(1);

  const [state, setState] = React.useState(0);
  const [iva, setIva] = React.useState(false);

  const bulletTextStyle = {
    display: "flex",
    flexDirection: "column",
    "& li": {
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(14px + calc(0.175vh + 0.15vh))",
      },

      fontSize: "calc(16px + 0.2vh)",
    },
  };

  const priceItemStyle = {
    color: "#2D224C",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    ["@media (min-width:1180px)"]: {
      my: 1,
    },
    "& p": {
      lineHeight: "100%",
      fontWeight: "600",
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(10.5px + 0.175vw)",
      },
    },
    "& b": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "calc(32px + 0.2vh)",
      lineHeight: "100%",
      ["@media (min-width:1180px)"]: {
        fontSize: "24px!important",
      },
      "& em": {
        fontSize: "calc(8px + 0.2vh)",
        mb: "auto",
        lineHeight: "100%",
        fontWeight: "600",
        fontStyle: "normal",
        whiteSpace: "nowrap",
      },
    },
  };
  React.useEffect(() => {
    if (!product) return;

    const priceData = {
      no_iva: product?.discount
        ? product?.original_price_no_iva
        : product?.no_iva,
      iva: product?.discount ? product?.original_price_iva : product?.iva,
      discount: product?.discount ? product?.discount : null,
      price: product?.price,
    };

    const priceDataFormatted = {
      no_iva: {
        integer: Math.floor(Number(priceData.no_iva) / 100),
        decimal: (Number(priceData.no_iva) % 100).toString().padStart(2, "0"),
      },
      iva: {
        integer: Math.floor(Number(priceData.iva) / 100),
        decimal: (Number(priceData.iva) % 100).toString().padStart(2, "0"),
      },
      discount: {
        integer: Math.floor(Number(priceData.discount) / 100),
        decimal: (Number(priceData.discount) % 100).toString().padStart(2, "0"),
      },
      price: {
        integer: Math.floor(Number(priceData.price) / 100),
        decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
      },
    };

    setPrice(priceDataFormatted);
  }, [product]);

  return (
    <Box
      sx={{
        display: ["flex", "grid"],

        ["@media (min-width:1180px)"]: {
          gridTemplateRows: ["", "3.2fr 10fr"],
          paddingLeft: "calc(10vw + 10vh)",
        },
        ["@media (min-width:763px)  and (max-width:1180px)"]: {
          gridTemplateRows: ["2fr 10.8fr"],
          paddingLeft: "calc(10vw + 10vh)",
        },
        height: ["auto", "100vh"],
        flexDirection: ["column"],
      }}
      className="pt-[3rem] px-[1rem] w-full lg-p-8 md:p-10 lg:max-w-[42vw] md:max-w-[550px]"
    >
      <TopNav
        sx={{
          alignItems: "flex-start!important",
          // maxHeight: "54px",
          // minHeight: "54px",

          ["@media (max-width:1180px)"]: {
            "& img": { width: "94px", height: "43px" },
          },
          ["@media (min-width:1180px)"]: {
            mb: "3vh!important",
            flexDirection: "row",
          },
          ["@media (min-width:763px)"]: {
            mb: "3vh!important",
            flexDirection: "row",
          },
        }}
        hiddenLink={width > 768 ? true : false}
        className={""}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          ["@media (min-width:1180px)"]: {},
        }}
      >
        <h1 className="font-semibold leading-none text-white text-[24px] text-center lg:text-start lg:text-3xl 3xl:text-4xl max:text-6xl">
          Il tuo percorso prevede:
        </h1>
        <Box
          sx={{
            display: ["grid"],
            gridTemplateColumns: "1fr",
            gap: "3rem",
            ["@media (min-width:1180px)"]: {
              gridTemplateRows: ["8fr 5fr"],
              gap: "1rem",
            },
          }}
        >
          <Box component={"ul"} sx={bulletTextStyle}>
            {product?.product_details.map((det, i) => {
              return (
                <li key={i}>
                  &bull;<span className="ml-2">{det}</span>
                </li>
              );
            })}
          </Box>
          <div className="flex flex-col gap-4">
            <Button
              color="primary"
              onClick={() => setShowPDF((r) => !r)}
              sx={{
                pointerEvents: enableViewProduct ? "auto" : "none",
                opacity: enableViewProduct ? "100%" : "0",
                border: "1px solid #ffffff",
                color: "#ffffff!important",
                height: "39px",
              }}
              variant="outlined"
            >
              VIEW THE PRODUCT
            </Button>
            <Counter
              enableCounter={enableCounter}
              onChange={(v) => {
                onProductQuantityChange && onProductQuantityChange(v);
                setProductQuantity(v);
              }}
            />
          </div>
          <Box
            sx={{
              backgroundColor: "#D9DAF3",
              height: "fit-content",
              borderRadius: "9px",
              py: "min(2vh,8px)",
              px: "min(2vw,1.5rem)",
              gap: "1vh",
              ["@media (min-height:763px)"]: {
                gap: "0.5rem",
              },
              display: "grid",
              gridTemplateColumns: "1fr",
              // color: "#2D224C",
            }}
          >
            {!isNewSubscriber && (
              <>
                <Box sx={priceItemStyle}>
                  <p>Prezzo del percorso</p>
                  <b>
                    {price?.no_iva?.integer}
                    <Typography component={"em"}>
                      {price?.no_iva?.decimal} €
                    </Typography>
                  </b>
                </Box>
                <Box sx={priceItemStyle}>
                  <p>IVA (22%)</p>
                  <b>
                    {price?.iva?.integer}
                    <Typography component={"em"}>
                      {price?.iva?.decimal} €
                    </Typography>
                  </b>
                </Box>

                {price?.discount?.integer > 0 && (
                  <Box sx={priceItemStyle}>
                    <p>Meno iscrizione</p>
                    <b>
                      -{price?.iva?.integer}
                      <Typography component={"em"}>
                        {price?.iva?.decimal} €
                      </Typography>
                    </b>
                  </Box>
                )}
                <Box
                  sx={{
                    borderRadius: "9px",
                    height: "min(62px,5vh)",
                    ["@media (min-height:763px)"]: {
                      height: "62px",
                    },
                    position: "relative",
                    pointerEvents: enableDiscount ? "auto" : "none",
                    opacity: enableDiscount ? "100%" : "0",
                    "& input": {
                      borderRadius: "9px",
                      background: "#ffffff",
                      height: "100%",
                      width: "100%",
                      paddingLeft: "10px",
                      paddingRight: "100px",
                    },
                    "& input::placeholder": {
                      fontStyle: "italic",
                      fontWeight: "400",
                      fontSize: "24px",
                      lineHeight: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "#B4B4B4",
                    },
                    "& input:focus": {
                      outline: "none",
                      border: "none",
                    },
                    "& button": {
                      width: "79px",
                      height: "31.76px",
                      borderRadius: "6px",
                      border: "2px solid #2D224C",
                      color: "#2D224C",
                      fontSize: "14px",
                      position: "absolute",
                      top: "10%",
                      right: "14px",
                      ["@media (min-height:763px)"]: {
                        top: "14px",
                      },
                    },
                  }}
                >
                  <input
                    className={"mr-auto font-semibold text-2xl text-[#2D224C]"}
                    placeholder={"Discount code"}
                  />
                  <button className={"font-semibold active:invert"}>
                    APPLICA
                  </button>
                </Box>
              </>
            )}

            {isNewSubscriber ? (
              <Box sx={priceItemStyle}>
                <p className="!font-normal italic">Iscrizione</p>
                <Typography component={"b"} sx={{}} className="">
                  € {price?.price?.integer * productQuantity}
                  {","}
                  {price?.price?.decimal}
                </Typography>
              </Box>
            ) : (
              <Box sx={priceItemStyle}>
                <p className="">Totale</p>
                <Typography component={"b"} sx={{}} className="!text-[40px]">
                  € {price?.price?.integer * productQuantity}
                  {","}
                  {price?.price?.decimal}
                </Typography>
              </Box>
            )}
            {isNewSubscriber && (
              <div className="text-[#2D224C] text-center font-semibold">
                *Questo costo verrà detratto dal prezzo del percorso
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
