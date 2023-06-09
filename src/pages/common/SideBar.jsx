import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useWindowSize } from "../hooks/useWindowSize.jsx";
import TopNav from "./TopNav.jsx";
import useCheckout from "../hooks/useCheckout.jsx";
import Counter from "./Counter";
import Skeleton from "@mui/material/Skeleton";
import Api from "@api/Api";
import { LoadingButton } from "@mui/lab";
import { queryClient } from "../../App.jsx";

Number.prototype.toDecimalsEuro = function () {
  let parsed = parseFloat(this / 100)
    .toFixed(2)
    .split(".");

  return (
    <div className="flex">
      <div className="text-3xl">
        {parsed[0]},{parsed[1]}€
      </div>
    </div>
  );
};
const SideBar = ({
  onProductQuantityChange,
  setShowPDF,
  enableViewProduct,
  enableDiscount,
  showCounter = true,
  enableCounter,
  isNewSubscriber = false,
  showPdf = false,
}) => {
  const { data, setData } = useCheckout({ session: 1 });

  const product = data?.product;
  // console.log("🚀 ~ file: SideBar.jsx:38 ~ product:", product);

  const [width] = useWindowSize();
  const [price, setPrice] = React.useState(null);
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [discountError, setDiscountError] = React.useState(false);
  const discountInputRef = React.useRef(null);
  const [isLoadingDiscount, setIsLoadingDiscount] = React.useState(false);
  const [iva, setIva] = React.useState(false);

  const getDiscount = (code) => {
    return Api.post("v2/checkout/get-discount", {
      product: data?.product?.token,
      user: data?.user?.token,
      discount_code: code,
    });
  };

  const validateDiscountCode = async () => {
    let code = discountInputRef.current.value;
    code = code.toUpperCase();

    if (!code) return false;

    setIsLoadingDiscount(true);

    const { data } = await getDiscount(code).catch((e) => {
      return { data: null };
    });

    if (data?.product) {
      setDiscountError(false);

      setData((prev) => {
        let newData = {
          ...prev,
          product: {
            ...prev.product,
            ...data.product,
            discount_code: code,
          },
        };

        queryClient.setQueryData(["checkout", data?.product?.token], newData);

        return newData;
      });
    } else {
      setDiscountError(true);
    }

    setIsLoadingDiscount(false);
  };

  const bulletTextStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    "& li": {
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(14px + calc(0.175vh + 0.15vh))",
      },
      fontSize: "calc(14px + 0.1vh)",
      ["@media (min-width:2050px)"]: {
        fontSize: "28px",
      },
    },
  };

  const priceItemStyle = {
    color: "#2D224C",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (min-width:1180px)"]: {
      my: 1,
      alignItems: "unset",
    },
    "& p": {
      lineHeight: "100%",
      fontWeight: "600",
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "18px",
        // fontSize: "calc(10.5px + 0.175vw)",
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
        fontSize: "16px",
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
      no_iva: product?.original_price_no_iva * productQuantity,
      iva: product?.original_price_iva * productQuantity,
      discount: product?.discount ? product?.discount : null,
      discountCodeAmount: product?.discount_code_amount
        ? product?.discount_code_amount
        : null,
      price:
        productQuantity > 1
          ? product?.original_price * productQuantity - product.discount
          : product?.price,
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
      discountCodeAmount: {
        integer: Math.floor(Number(priceData.discountCodeAmount) / 100),
        decimal: (Number(priceData.discountCodeAmount) % 100)
          .toString()
          .padStart(2, "0"),
      },
      price: {
        integer: Math.floor(Number(priceData.price) / 100),
        decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
      },
    };

    setPrice(priceDataFormatted);
  }, [product, productQuantity, data]);

  return (
    <Box
      sx={{
        display: ["flex", "grid"],

        ["@media (min-width:1180px)"]: {
          gridTemplateRows: ["", "70px auto"],
          paddingLeft: "calc(10vw + 10vh)",
        },
        ["@media (min-width:1180px) and (min-height:763px)"]: {
          gridTemplateRows: ["", "90px auto"],
        },
        ["@media (min-width:1180px) and (min-height:790px)"]: {
          gridTemplateRows: ["", "124px auto"],
        },
        ["@media (min-width:763px)  and (max-width:1180px)"]: {
          gridTemplateRows: ["124px 10.8fr"],
          paddingLeft: "calc(10vw + 10vh)",
        },
        height: ["auto", "100%"],
        flexDirection: ["column"],
      }}
      className="pt-[3rem] px-[1rem] w-full lg:pb-0 md:p-10"
      // className="pt-[3rem] px-[1rem] w-full lg:pb-0 md:p-10 lg:max-w-[42vw] md:max-w-[550px]"
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
            // mb: "3vh!important",
            flexDirection: "row",
          },
          // ["@media (min-width:763px)"]: {
          //   // mb: "3vh!important",
          //   flexDirection: "row",
          // },
        }}
        hiddenLink={width >= 1024 ? true : false}
        className={""}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // ["@media (min-width:1600px)"]: {
          //   height: "50vh",
          //   my: "auto",
          // },
          ["@media (min-width:2050px)"]: {
            height: "55vh",
            my: "auto",
          },
        }}
      >
        <h1 className="font-semibold leading-none text-white text-[24px] md:text-xl truncate text-center lg:text-start lg:text-3xl 3xl:text-4xl max:text-6xl">
          Il tuo percorso prevede:
        </h1>
        <Box
          sx={{
            display: ["grid"],
            gridTemplateColumns: "1fr",
            gap: "3rem",
            height: "100%",
            ["@media (min-width:1180px)"]: {
              gridTemplateRows: ["25fr 39px 40fr"],
              gap: "1rem",
            },
            ["@media (min-width:2050px)"]: {
              gridTemplateRows: ["350px 39px auto"],
              paddingBottom: "1rem",
            },
          }}
        >
          <Box component={"ul"} sx={bulletTextStyle}>
            {product
              ? product?.product_details.map((det, i) => {
                  return (
                    <li key={i}>
                      &bull;<span className="ml-2">{det}</span>
                    </li>
                  );
                })
              : Array.from({ length: 6 }).map((r, i) => (
                  <Skeleton
                    key={"sk-" + i}
                    variant="rectangular"
                    width={[200, 400]}
                    height={24}
                    component={"li"}
                  />
                ))}
          </Box>

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
            {showPdf ? "CLOSE SLIDES" : "VIEW SLIDES"}
          </Button>

          <Box
            sx={{
              backgroundColor: "#D9DAF3",
              height: "fit-content",
              borderRadius: "9px",
              py: "min(2vh,8px)",
              px: "min(2vw,1.5rem)",
              gap: "1vh",
              ["@media (min-height:1024px)"]: {
                gap: "0.5rem",
              },
              ["@media (min-width:2050px)"]: {
                mt: "auto",
              },
              display: "grid",
              gridTemplateColumns: "1fr",
              // color: "#2D224C",
            }}
          >
            {!isNewSubscriber && (
              <>
                <Counter
                  enable_quantity={product?.enable_quantity}
                  showCounter={showCounter}
                  enableCounter={enableCounter}
                  onChange={(v) => {
                    onProductQuantityChange && onProductQuantityChange(v);
                    setProductQuantity(v);
                  }}
                />
                <Box sx={priceItemStyle}>
                  <p>Prezzo del percorso</p>
                  <b>
                    {!price?.no_iva ? (
                      <Skeleton />
                    ) : (
                      <>
                        {price?.no_iva?.integer}
                        <Typography component={"em"}>
                          {price?.no_iva?.decimal} €
                        </Typography>
                      </>
                    )}
                  </b>
                </Box>
                <Box sx={priceItemStyle}>
                  <p>IVA (22%)</p>
                  <b>
                    {!price?.iva ? (
                      <Skeleton />
                    ) : (
                      <>
                        {price?.iva?.integer}
                        <Typography component={"em"}>
                          {price?.iva?.decimal} €
                        </Typography>
                      </>
                    )}
                  </b>
                </Box>

                {price?.discount?.integer > 0 && (
                  <Box sx={priceItemStyle}>
                    <p>Meno iscrizione</p>
                    <b>
                      {!price?.iva ? (
                        <Skeleton />
                      ) : (
                        <>
                          -{price?.discount?.integer}
                          <Typography component={"em"}>
                            {price?.discount?.decimal} €
                          </Typography>
                        </>
                      )}
                    </b>
                  </Box>
                )}
                <div className="flex flex-col">
                  {data?.product?.discount_code ? (
                    <Box sx={priceItemStyle}>
                      <p>Sconto</p>
                      <Typography component={"b"} sx={{}} className="">
                        -{price?.discountCodeAmount?.integer}
                        <Typography component={"em"}>
                          {price?.discountCodeAmount?.decimal} €
                        </Typography>
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        borderRadius: "9px",
                        // height: "min(62px,5vh)",
                        // ["@media (min-height:763px)"]: {
                        height: "62px",
                        // },
                        position: "relative",
                        pointerEvents: enableDiscount ? "auto" : "none",
                        opacity: enableDiscount ? "100%" : "30%",
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
                          right: "14px",
                          top: "14px",
                        },
                      }}
                    >
                      <input
                        ref={discountInputRef}
                        className={
                          "mr-auto font-semibold text-2xl text-[#2D224C] uppercase"
                        }
                        defaultValue={data?.product?.discount_code ?? ""}
                        placeholder={"Discount code"}
                      />

                      <LoadingButton
                        loading={isLoadingDiscount}
                        color="secondary"
                        onClick={() => validateDiscountCode()}
                        className={
                          "font-semibold !text-[#2D224C] active:text-[#B4B4B4] active:border-[#B4B4B4]"
                        }
                      >
                        APPLICA
                      </LoadingButton>
                      {discountError && enableDiscount && (
                        <p className="text-[#E90000] h-2 absolute bottom-[13px] !text-[12px] !font-semibold pl-4">
                          Codice non valido
                        </p>
                      )}
                    </Box>
                  )}
                </div>
              </>
            )}

            {isNewSubscriber ? (
              <Box sx={priceItemStyle}>
                <p className="!font-normal italic">Iscrizione</p>

                <Typography component={"b"} sx={{}} className="">
                  {!price?.price ? (
                    <Skeleton />
                  ) : (
                    <>
                      € {price?.price?.integer}
                      {","}
                      {price?.price?.decimal}
                    </>
                  )}
                </Typography>
              </Box>
            ) : (
              <Box sx={priceItemStyle}>
                <p>Totale</p>
                <Typography component={"b"} sx={{}} className="!text-[40px]">
                  {!price?.price ? (
                    <Skeleton />
                  ) : (
                    <>
                      {price?.price?.integer}
                      <em> {price?.price?.decimal} €</em>
                    </>
                  )}
                </Typography>
              </Box>
            )}
            {isNewSubscriber && (
              <div className="text-[#2D224C] text-center font-semibold">
                *Questo costo verrà detratto <br /> dal prezzo del percorso
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
