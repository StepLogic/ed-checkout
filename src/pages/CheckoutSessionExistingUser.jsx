import { Box, Button, FormControlLabel, RadioGroup, Radio, FormControl, FormGroup, Checkbox, Link, Typography } from "@mui/material";
import React from "react";
import bgCheckout from "../../assets/img/bgCheckout.svg";
import klarna from "../../assets/img/klarna.svg";
import bgCheckoutMobile from "../../assets/img/bgCheckoutMobile.svg";

import "../../utils";
import { useWindowSize } from "./LandingPaymentPage";
import StripeCheckout from "./checkout_existing_user/StripeCheckout";
import KlarnaCheckout from "./checkout_existing_user/KlarnaCheckout";
import TopNav from "./TopNav";
import PDFviewer from "./pdf/PDFviewer";
import StripeInstallments from "./checkout_existing_user/StripeInstallments";

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

const CheckoutSessionExistingUser = ({ data }) => {
  const { product, user } = data;
  const [width] = useWindowSize();
  const [paymentType, setPaymentType] = React.useState("Stripe");
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [price, setPrice] = React.useState(null);

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
      no_iva: product?.discount ? product?.original_price_no_iva : product?.no_iva,
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
            <h1 className="font-semibold leading-none text-white text-[24px] text-center lg:text-start lg:text-3xl 3xl:text-4xl max:text-6xl">Il tuo percorso prevede:</h1>
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
                {/* <div className="flex items-center justify-between">
                  <div>Prezzo del percorso</div>
                  <div className="md:ml-10">{product.no_iva.toDecimalsEuro()}</div>
                </div>
                <div className="flex items-center justify-between my-3">
                  <div>IVA (22%)</div>
                  <div>{product.iva.toDecimalsEuro()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Prezzo IVA inclusa</div>
                  <div className="font-bold">{product.price.toDecimalsEuro()}</div>
                </div> */}
                <Box sx={priceItemStyle}>
                  <p>Prezzo del percorso</p>
                  <b>
                    {price?.no_iva?.integer}
                    <Typography component={"em"}>{price?.no_iva?.decimal} €</Typography>
                  </b>
                </Box>
                <Box sx={priceItemStyle}>
                  <p>IVA (22%)</p>
                  <b>
                    {price?.iva?.integer}
                    <Typography component={"em"}>{price?.iva?.decimal} €</Typography>
                  </b>
                </Box>
                {price?.discount?.integer > 0 ? (
                  <Box sx={priceItemStyle}>
                    <p>Iscrizione pagata</p>
                    <b>
                      -{price?.discount?.integer}
                      <Typography component={"em"}>{price?.discount?.decimal} €</Typography>
                    </b>
                  </Box>
                ) : null}
                <Box sx={priceItemStyle}>
                  <p className="!font-bold">Totale da pagare</p>
                  <Typography component={"b"} sx={{}} className="!font-bold">
                    {price?.price?.integer}
                    <Typography component={"em"} sx={{}} className="!font-bold">
                      {price?.price?.decimal} €
                    </Typography>
                  </Typography>
                </Box>
              </Box>

              {/* <div className="my-2 italic font-bold">*Questo costo verrà detratto dal prezzo del percorso</div> */}
            </Box>
            <Button
              color="primary"
              onClick={() => setShowPDF((r) => !r)}
              sx={{
                border: "1px solid #D9DAF3",
                color: "#D9DAF3!important",
              }}
              variant="outlined"
            >
              VIEW THE PRODUCT
            </Button>
          </Box>
        </Box>

        <Box
          // className="px-4"
          // className="px-4 pt-8 pb-8  lg:pt-8 bg-no-repeat bg-cover md:pl-32 md:p-10 lg:min-h-screen"
          className="pb-8 px-4"
          style={{
            backgroundImage: `url('${width < 768 ? bgCheckoutMobile : bgCheckout}')`,
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
                <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">Scegli il metodo di pagamento</h1>
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
                  {!showPaymentForm ? (
                    <>
                      <Box className="grid grid-cols-1">
                        <RadioGroup className="grid grid-cols-1 gap-4  h-fit" sx={{ gridAutoRows: "min(95px,20vh)" }} aria-labelledby="demo-radio-buttons-group-label" onChange={(e) => setPaymentType(e.target.value)} value={paymentType} name="radio-buttons-group">
                          <div className="py-3 my-1 flex flex-row items-center rounded-lg bg-edu-light-blue">
                            <FormControlLabel value="Stripe" control={<Radio className="md:ml-8 ml-6 md:mr-4" />} label={<span className=" text-edu-900">PAGA TUTTO SUBITO</span>} />
                          </div>

                          <div className="py-3 my-1  flex  flex-row  items-center rounded-lg bg-edu-light-blue">
                            <FormControlLabel
                              value="Klarna"
                              control={<Radio className="md:ml-8 ml-6 md:mr-4" />}
                              label={
                                <div className="flex items-center text-edu-900">
                                  PAGA IN 3 RATE CON <img src={klarna} className="ml-2 w-[20%] lg:w-auto" />
                                </div>
                              }
                            />
                          </div>
                        </RadioGroup>
                      </Box>
                      <Box className={"flex flex-col max-w-full justify-end flex-auto"}>
                        <FormControlLabel
                          className="mb-[8px] lg:mb-[10px] ml-0 w-full "
                          control={<Checkbox id="checkbox" checked={checked} onClick={() => setChecked((prev) => !prev)} />}
                          labelPlacement={"end"}
                          label={
                            <div className="text-edu-900 text-[14px] md:text-base">
                              Accetto i&nbsp;
                              <Link target={"_blank"} href={product.links.terms}>
                                Termini e le Condizioni
                              </Link>{" "}
                              del servizio e la{" "}
                              <Link target={"_blank"} href={product.links.policy}>
                                Privacy Policy
                              </Link>
                            </div>
                          }
                        />
                        <Button
                          type="button"
                          color="buttonGreen"
                          variant="contained"
                          disabled={!checked}
                          sx={{ mt: 0, width: "100%" }}
                          size="large"
                          // className="min-w-full px-[20px] py-[14px] font-semibold text-[16px] md:text[18px]"
                          onClick={() => setShowPaymentForm(true)}
                        >
                          procedi
                        </Button>
                      </Box>
                    </>
                  ) : paymentType === "Stripe" ? (
                    <StripeCheckout product={product} showFormSelect={setShowPaymentForm} userToken={user.token} />
                  ) : (
                    <KlarnaCheckout showFormSelect={setShowPaymentForm} product={product} user={user.token} />
                    // <StripeInstallments showFormSelect={setShowPaymentForm} product={product} userToken={user.token} user={user} />
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

export default CheckoutSessionExistingUser;
