import {
  Box,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormGroup,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import bgCheckout from "../../assets/img/bgCheckout.svg";
import klarna from "../../assets/img/klarna.svg";
import bgCheckoutMobile from "../../assets/img/bgCheckoutMobile.svg";
import { CaBackground } from "../../components/Icons";

import "../../utils";
import { useWindowSize } from "./LandingPaymentPage";
import StripeCheckout from "./checkout_existing_user/StripeCheckout";
import KlarnaCheckout from "./checkout_existing_user/KlarnaCheckout";
import TopNav from "./TopNav";
import PDFviewer from "./pdf/PDFviewer";

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
  // console.log("product", product);
  const [width] = useWindowSize();
  const [paymentType, setPaymentType] = React.useState("Stripe");
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [showPDF, setShowPDF] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [price, setPrice] = React.useState(null);

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
    display: "grid",
    gap: "3px",
    gridTemplateColumns: "8fr 0.5fr 5fr",
    ["@media (min-width:1180px)"]: {
      gridTemplateColumns: "13fr 0.5fr 5fr",
    },
    width: "100%",
    my: 1,
    "& p": {
      lineHeight: "100%",
      fontSize: "calc(16px + 0.4vw)!important",
      fontWeight: "400",
      textAlign: "end",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "end",
      ["@media (max-width:1180px)"]: {
        fontSize: "calc(19px + 0.4vw)!important",
      },
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(15px + 0.175vw)!important",
      },
    },
    "& b": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontWeight: "600",
      lineHeight: "100%",

      ["@media (max-width:1180px)"]: {
        fontSize: "calc(19px + 0.4vw)!important",
      },
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(15px + 0.175vw)!important",
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
      totale: {
        integer: Math.floor(Number(priceData.price) / 100),
        decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
      },
      discount: {
        integer: Math.floor(Number(priceData.discount) / 100),
        decimal: (Number(priceData.discount) % 100).toString().padStart(2, "0"),
      },
      price: {
        integer: Math.floor(Number(priceData.price) / 100),
        decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
      },
      rimanente: {
        integer: Math.floor(
          Number(priceData.price - (priceData?.discount || 0)) / 100
        ),
        decimal: (Number(priceData.price - (priceData?.discount || 0)) % 100)
          .toString()
          .padStart(2, "0"),
      },
    };

    setPrice(priceDataFormatted);
  }, []);

  return (
    <Box
      component={"section"}
      sx={{
        height: "fit-content",
        overflowX: "hidden",
        overflowY: "auto",
        ["@media (min-width:768px)"]: {
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
          height: "100%",
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
            height: ["auto", "100%"],
            flexDirection: ["column"],
          }}
          className="pt-[3rem] px-[1rem] w-full lg:p-8 md:p-10 lg:max-w-[42vw] md:max-w-[550px]"
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
                  gridTemplateRows: ["17vh 280px"],
                  gap: "1rem",
                },
                ["@media (max-width:1180px) and (min-width:763px)"]: {
                  gridTemplateRows: ["30vh 280px"],
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
              {/* <Box
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
                  <p className="!font-bold">Totale da pagare</p>
                  <Typography component={"b"} sx={{}} className="!font-bold">
                    {price?.price?.integer}
                    <Typography component={"em"} sx={{}} className="!font-bold">
                      {price?.price?.decimal} €
                    </Typography>
                  </Typography>
                </Box>
              </Box> */}

              <div>
                <Box
                  sx={{
                    backgroundColor: "#D9DAF3",
                    borderRadius: "9px",
                    pb: "2vh",
                    position: "relative",
                    minWidth: "318px",
                    ["@media (min-width:1180px)"]: {
                      maxWidth: "413px",
                    },
                    marginRight: "auto",
                    height: "260px",
                    ["@media (max-width:1180px)"]: {
                      height: "212px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "188px",
                      ["@media (max-width:1180px)"]: {
                        height: "142px",
                      },
                    }}
                    className="relative rounded-[9px] w-full"
                  >
                    <CaBackground className="absolute w-full h-full" />
                    <Box
                      sx={{
                        position: "relative",
                        ["@media (min-width:763px)  and (max-width:1180px)"]: {
                          padding:
                            "min(2vh,38px) min(1vw,1.2rem) 0 min(5vw,1.5rem)",
                        },
                        ["@media (min-width:1064px)"]: {
                          padding:
                            "min(2vh,38px) min(3vw,1.5rem) 0 min(5vw,1.5rem)",
                        },

                        zIndex: 6,
                        height: "165px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        flexDirection: "column",
                        ["@media (max-width:1180px)"]: {
                          height: "115px",
                          paddingTop: "1rem",
                        },
                        // gap: "min(4vh,2rem)",
                      }}
                    >
                      <Box sx={priceItemStyle}>
                        <p>
                          Totale:
                          <em className="normal font-medium not-italic">{`€${price?.no_iva?.integer} + IVA =`}</em>
                        </p>
                        <div />
                        <b>
                          €
                          {`${price?.totale?.integer},${price?.totale?.decimal}`}
                        </b>
                      </Box>
                      <Box sx={priceItemStyle}>
                        <p>Meno l'acconto:</p>
                        <b>-</b>
                        <b>
                          €
                          {`${price?.discount?.integer},${price?.discount?.decimal}`}
                        </b>
                      </Box>

                      <Box sx={priceItemStyle}>
                        <p>Rimanente:</p>
                        <div />
                        <b>
                          €
                          {`${price?.rimanente?.integer},${price?.rimanente?.decimal}`}
                        </b>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      ["@media (max-width:1180px) and (min-height:763px)"]: {
                        fontSize: "calc(14px + 0.4vh)!important",
                      },
                    }}
                    className="text-base xl:text-[20px] mt-1 leading-[120%] text-center text-[#2D224C] font-regular px-[min(1.5vw,1rem)]"
                  >
                    Da pagare in un’unica soluzione <br /> o In 3 rate da
                    €177,72 con KLARNA
                  </Typography>
                </Box>
              </div>
              <Button
                // color="primary"
                onClick={() => setShowPDF((r) => !r)}
                sx={{
                  border: "1px solid #D9DAF3",
                  color: "#D9DAF3",
                  minWidth: "318px",
                  ["@media (min-width:1180px)"]: {
                    maxWidth: "413px",
                  },
                }}
                variant="outlined"
              >
                VIEW THE PRODUCT
              </Button>
              {/* <div className="my-2 italic font-bold">*Questo costo verrà detratto dal prezzo del percorso</div> */}
            </Box>

            {/* <div className="my-2 italic font-bold">*Questo costo verrà detratto dal prezzo del percorso</div> */}
            {/* </Box> */}
          </Box>
        </Box>

        <Box
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
            ["@media (min-width:768px)"]: {
              gridTemplateRows: "3.2fr 10fr!important",
              paddingLeft: "calc(10vw + 10vh)!important",
              height: ["calc(var(--vh, 1vh) * 100)"],
            },
            ["@media (min-width:763px)"]: {
              paddingTop: "32px",
              display: "grid",
              gridTemplateRows: ["2fr 10fr"],
              paddingLeft: "calc(10vw + 5vh)!important",
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
            {/* {!showPaymentForm ? (
                <> */}
            {/* <Box className="grid grid-cols-1">
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
                          control={<Radio className="md:ml-8 ml-6 md:mr-4" />}
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
                          control={<Radio className="md:ml-8 ml-6 md:mr-4" />}
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
                    className={"flex flex-col max-w-full justify-end flex-auto"}
                  >
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
                </> */}
            {/* ) : paymentType === "Stripe" ? ( */}

            {showPDF ? (
              <div>
                <PDFviewer fileBase64={product.slides} />
              </div>
            ) : (
              <>
                <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
                  Scegli il metodo di pagamento
                </h1>
                <Box
                  sx={{
                    display: ["grid"],
                    gridTemplateColumns: "1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                    gridTemplateRows: ["30vh 20vh"],
                    ["@media (min-width:1180px)"]: {
                      gridTemplateRows: [
                        "minmax(18.5rem,30vh) minmax(3rem,15vh)",
                      ],
                      gap: "0px",
                    },
                  }}
                >
                  <StripeCheckout
                    product={product}
                    // showFormSelect={setShowPaymentForm}
                    userToken={user.token}
                  />
                </Box>
              </>
            )}
            {/* ) : (
                <KlarnaCheckout
                  showFormSelect={setShowPaymentForm}
                  product={product}
                  user={user.token}
                />
              )} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutSessionExistingUser;
