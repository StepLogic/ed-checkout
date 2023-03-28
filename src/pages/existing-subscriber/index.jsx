import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import klarna from "../../assets/img/klarna.svg";
import bgCheckout from "@assets/img/bgCheckout.svg";
import bgCheckoutMobile from "@assets/img/bgCheckoutMobile.svg";
import { useWindowSize } from "../LandingPaymentPage";
import PDFviewer from "../common/pdf/PDFviewer";
import TopNav from "../TopNav";
import useCheckout from "../useCheckout";
import { LinearProgress } from "@mui/material";
import StripeCheckout from "../common/StripeCheckout.jsx";
import KlarnaCheckout from "../common/KlarnaCheckout.jsx";
import IVAForm from "../common/IVAForm.jsx";

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
const ExistingSubscriber = () => {
  const {
    data: { user, product },
    isError,
    isLoading,
  } = useCheckout({ session: 1 });

  const [width] = useWindowSize();
  const [paymentType, setPaymentType] = React.useState("Stripe");
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [price, setPrice] = React.useState(null);

  const [state, setState] = React.useState(0);
  const [iva, setIva] = React.useState(false);

  const [showPDF, setShowPDF] = React.useState(false);

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
    my: 1,
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
      fontWeight: "400",
      fontSize: "calc(16px + 0.2vh)",
      lineHeight: "100%",
      ["@media (min-width:1180px)"]: {
        fontSize: "24px!important",
      },
      "& em": {
        fontSize: "calc(8px + 0.2vh)",
        mb: "auto",
        lineHeight: "100%",

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
  }, []);

  if (isError) {
    return <NoPage />;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box
      component={"section"}
      sx={{
        height: "fit-content",
        overflow: "hidden",
        ["@media (min-width:1180px)"]: {
          height: "calc(var(--vh, 1vh) * 100)",
        },
      }}
      className="w-full  text-white bg-edu-900"
    >
      <Box
        sx={{
          display: ["grid"],
          gridTemplateColumns: ["1fr"],
          ["@media (min-width:763px)"]: {
            gridTemplateColumns: ["4fr 7fr"],
          },
          height: "fit-content",
        }}
        className=""
      >
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
              <Button
                color="primary"
                onClick={() => setShowPDF((r) => !r)}
                sx={{
                  border: "1px solid #ffffff",
                  color: "#ffffff!important",
                  height: "39px",
                }}
                variant="outlined"
              >
                VIEW THE PRODUCT
              </Button>
              <Box
                sx={{
                  backgroundColor: "#D9DAF3",
                  height: "fit-content",
                  borderRadius: "9px",
                  py: "2vh",
                  px: "min(2vw,1.5rem)",
                  gap: "2vh",
                  // color: "#2D224C",
                }}
              >
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
                <Box sx={priceItemStyle}>
                  <p>Meno iscrizione</p>
                  <b>
                    -{price?.iva?.integer}
                    <Typography component={"em"}>
                      {price?.iva?.decimal} €
                    </Typography>
                  </b>
                </Box>
                <Box
                  sx={{
                    borderRadius: "9px",

                    height: "62px",
                    position: "relative",
                    "& input": {
                      borderRadius: "9px",
                      background: "#ffffff",
                      height: "62px",
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
                    "& button": {
                      width: "79px",
                      height: "31.76px",
                      borderRadius: "6px",
                      border: "2px solid #2D224C",
                      color: "#2D224C",
                      fontSize: "14px",
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                    },
                  }}
                >
                  <input className={"mr-auto"} placeholder={"Discount code"} />
                  <button className={"semibold active:invert"}>APPLICA</button>
                </Box>
                {price?.discount?.integer > 0 ? (
                  <Box sx={priceItemStyle}>
                    <p>Iscrizione pagata</p>
                    <b>
                      -{price?.discount?.integer}
                      <Typography component={"em"}>
                        {price?.discount?.decimal} €
                      </Typography>
                    </b>
                  </Box>
                ) : null}
                <Box sx={priceItemStyle}>
                  <p className="">Totale</p>
                  <Typography component={"b"} sx={{}} className="!font-bold">
                    € {price?.price?.integer}
                    {","}
                    {price?.price?.decimal}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          // className="px-4"
          // className="px-4 pt-8 pb-8  lg:pt-8 bg-no-repeat bg-cover md:pl-32 md:p-10 lg:min-h-screen"
          className="pb-8 px-4"
          style={{
            backgroundImage: `url('${
              width < 768 ? bgCheckoutMobile : bgCheckout
            }')`,
            // paddingTop: width < 768 ? 0 : 0,
            backgroundRepeat: "no",
            backgroundSize: "cover",
            backgroundPosition: width < 768 ? "top  center" : "center left",
            backgroundColor: "#fffff",
            // paddingLeft: width < 768 && "4vw",
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "5vh",
            ["@media (min-width:1180px)"]: {
              gridTemplateRows: "3.2fr 10fr!important",
              paddingLeft: "calc(10vw + 10vh)!important",
            },
            ["@media (min-width:763px)"]: {
              paddingTop: "32px",
              display: "grid",
              gridTemplateRows: ["2fr 10fr"],
              paddingLeft: "calc(10vw + 5vh)!important",
              height: ["calc(var(--vh, 1vh) * 100)"],
            },
          }}
        >
          <TopNav
            hiddenLogo={true}
            hiddenLink={width > 768 ? false : true}
            className=" !mb-0 !h-[2rem] lg:mb-auto "
            sx={{
              maxHeight: "94px",
              ["@media (min-width:763px) and (max-width:1180px)"]: {},
              ".no-underline": {
                mb: "auto",
              },
            }}
          />
          <Box
            sx={{
              maxWidth: ["100vw", "650px"],
              display: "flex",
              flexDirection: "column",
              height: "auto",
              gap: "1rem",
              ["@media (min-width:1180px)"]: {
                gap: "2rem",
              },
              ["@media (min-width:763px) and (max-width:1180px)"]: {
                // paddingLeft: "10vw",
              },
            }}
          >
            {showPDF ? (
              <Box
                sx={{
                  "& .swiper": {
                    width: "80vw!important",
                  },
                  "& .react-pdf__Page__canvas": {
                    width: "80vw!important",
                  },
                  ["@media (min-width:1280px)"]: {
                    "& .swiper": {
                      width: "30vw!important",
                    },
                    "& .react-pdf__Page__canvas": {
                      width: "30vw!important",
                    },
                  },
                  ["@media (min-width:736px)"]: {
                    "& .swiper": {
                      width: "43vw!important",
                      "& .thumbnail .react-pdf__Page__canvas": {
                        maxWidth: "9.5rem!important",
                      },
                    },
                    "& .react-pdf__Page__canvas": {
                      width: "43vw!important",
                    },
                  },
                }}
              >
                <PDFviewer fileBase64={product.slides} />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: ["grid"],
                    gridTemplateColumns: "1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                    gridTemplateRows: ["3rem  30vh 20vh"],
                    ["@media (min-width:1180px)"]: {
                      gridTemplateRows: [
                        "3rem minmax(18.5rem,30vh) minmax(3rem,15vh)",
                      ],
                      gap: "0px",
                    },
                  }}
                  className=" "
                >
                  {!showPaymentForm ? (
                    <>
                      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
                        Scegli il metodo di pagamento
                      </h1>
                      <Box className="grid grid-cols-1">
                        <RadioGroup
                          className="grid grid-cols-1 gap-4  h-fit"
                          sx={{ gridAutoRows: "min(95px,20vh)" }}
                          aria-labelledby="demo-radio-buttons-group-label"
                          onChange={(e) => setPaymentType(e.target.value)}
                          value={paymentType}
                          name="radio-buttons-group"
                        >
                          <div className="py-3 my-1 flex flex-row items-center rounded-lg bg-edu-light-blue">
                            <FormControlLabel
                              value="Stripe"
                              control={
                                <Radio className="md:ml-8 ml-6 md:mr-4" />
                              }
                              label={
                                <span className=" text-edu-900">
                                  PAGA TUTTO SUBITO
                                </span>
                              }
                            />
                          </div>

                          <div className="py-3 my-1  flex  flex-row  items-center rounded-lg bg-edu-light-blue">
                            <FormControlLabel
                              value="Klarna"
                              control={
                                <Radio className="md:ml-8 ml-6 md:mr-4" />
                              }
                              label={
                                <div className="flex items-center text-edu-900">
                                  PAGA IN 3 RATE CON{" "}
                                  <img
                                    src={klarna}
                                    className="ml-2 w-[20%] lg:w-auto"
                                  />
                                </div>
                              }
                            />
                          </div>
                        </RadioGroup>
                      </Box>
                      <Box
                        className={
                          "flex flex-col max-w-full justify-end flex-auto"
                        }
                      >
                        <FormControlLabel
                          className="mb-[8px] lg:mb-[10px] ml-0 w-full "
                          control={
                            <Checkbox
                              id="checkbox"
                              checked={state}
                              onClick={() => setState((prev) => !prev)}
                            />
                          }
                          labelPlacement={"end"}
                          label={
                            <div className="text-edu-900 text-[14px] md:text-base">
                              Ho la P.IVA. / Paga il corso la mia azienda
                            </div>
                          }
                        />
                        <FormControlLabel
                          className="mb-[8px] lg:mb-[10px] ml-0 w-full "
                          control={
                            <Checkbox
                              id="checkbox"
                              checked={checked}
                              onClick={() => setChecked((prev) => !prev)}
                            />
                          }
                          labelPlacement={"end"}
                          label={
                            <div className="text-edu-900 text-[14px] md:text-base">
                              Ho letto e accetto i&nbsp;
                              <Link
                                target={"_blank"}
                                href={product.links.terms}
                              >
                                Termini e le Condizioni
                              </Link>
                              &nbsp; del servizio e la&nbsp;
                              <Link
                                target={"_blank"}
                                href={product.links.policy}
                              >
                                Privacy Policy
                              </Link>
                            </div>
                          }
                        />
                        <Button
                          type="button"
                          color="buttonGreen"
                          variant="contained"
                          sx={{ mt: 0, width: "100%" }}
                          size="large"
                          onClick={() => setShowPaymentForm(true)}
                        >
                          procedi
                        </Button>
                      </Box>
                    </>
                  ) : state ? (
                    <IVAForm
                      next={(v) => {
                        setState(false);
                      }}
                    />
                  ) : paymentType === "Stripe" ? (
                    <>
                      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
                        Scegli il metodo di pagamento
                      </h1>
                      <StripeCheckout
                        product={product}
                        showFormSelect={setShowPaymentForm}
                        userToken={user.token}
                      />
                    </>
                  ) : (
                    <>
                      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
                        Scegli il metodo di pagamento
                      </h1>
                      <KlarnaCheckout
                        showFormSelect={setShowPaymentForm}
                        product={product}
                        user={user.token}
                      />
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExistingSubscriber;
