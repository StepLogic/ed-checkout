import "../../utils";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, Link, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import bgCheckout from "../../assets/img/bgCheckout.svg";
import bgCheckoutMobile from "../../assets/img/bgCheckoutMobile.svg";
import { CaBackground } from "../../components/Icons";
import MessageBox from "../../components/MessageBox";
import { useWindowSize } from "./LandingPaymentPage";
import TopNav from "./TopNav";

///IMG
const BASE = import.meta.env.VITE_BASE_URL;
const cardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#2D224C",
      color: "#2D224C",
      fontWeight: "500",
      fontSize: "24px",
      "::placeholder": {
        color: "#2D224Cba",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const CheckoutSession = ({ data, goBack }) => {
  const [formData, setFormData] = React.useState();
  const { product, user } = data;
  const [nextStep, setNextStep] = React.useState(false);
  const [width] = useWindowSize();
  const elements = useElements();
  const stripe = useStripe();
  const [checked, setChecked] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);

  React.useEffect(() => {
    (function (window, location) {
      history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
      history.pushState(null, document.title, location.pathname);

      window.addEventListener(
        "popstate",
        function () {
          if (location.hash === "#!/stealingyourhistory") {
            history.replaceState(null, document.title, location.pathname);
            setTimeout(function () {
              location.replace(location.href);
            }, 0);
          }
        },
        false
      );
    })(window, location);
  }, []);

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

  const handleChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;

    if (["nome", "cognome", "nome_titolare_carta", "cognome_titolare_carta"].includes(name)) {
      val = val.strCapitalization();
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const newUser = async (pi) => {
    let userData = { ...formData, token: user.token, cell: user?.phone };
    const { error, data } = await axios
      .post(BASE + "v1/checkout/create-user", {
        product: product.token,
        paymentIntent: pi,
        userData,
        type: "stripe",
      })
      .catch(function (error) {
        return { error: error.response.data.error };
      });

    if (data) {
      navigate("/start-form/" + user.token);
    }

    if (error) {
      setMessage({ type: "error", message: error });
    }
  };

  const checkErrorsBlockTwo = async () => {
    let errors = {};
    if (formData?.nome_titolare_carta == undefined || formData?.nome_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        nome_titolare_carta: "Il nome del titolare è richiesto",
      };
    } else {
      delete errors?.nome_titolare_carta;
    }

    if (formData?.cognome_titolare_carta == undefined || formData?.cognome_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        cognome_titolare_carta: "Il cognome del titolare è richiesto",
      };
      setError((prev) => ({ ...prev }));
    } else {
      delete errors?.cognome_titolare_carta;
    }

    if (formData?.email_titolare_carta == undefined || formData?.email_titolare_carta?.trim() == "") {
      errors = {
        ...errors,
        email_titolare_carta: "La mail del titolare è richiesta",
      };
    } else {
      delete errors?.email_titolare_carta;
    }

    if (errors?.nome_titolare_carta == undefined && errors?.cognome_titolare_carta == undefined && errors?.email_titolare_carta == undefined) {
      setError(false);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await checkErrorsBlockTwo();

    if (errors) return;

    setMessage(false);
    if (!stripe || !elements) return;

    setIsLoadingPayment(true);

    let clientSecret;

    try {
      const { error: backendError, data } = await axios.post(BASE + "v1/checkout/stripe/create-intent", { product: product.token, user_token: user.token, customer: formData });

      clientSecret = data.clientSecret;
    } catch (error) {
      setIsLoadingPayment(false);
      setMessage({
        type: "error",
        message: "Qualcosa è andato storto contatta l'assistenza",
      });
    }

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
      newUser(paymentIntent.id);
      return;
    }
  };

  const checkErrors = async () => {
    let errors = {};
    if (formData?.nome?.trim() == "") {
      errors = { ...errors, nome: "Il nome è richiesto" };
    } else {
      delete errors?.nome;
    }

    if (formData?.cognome?.trim() == "") {
      errors = { ...errors, cognome: "Il cognome è richiesto" };
      setError((prev) => ({ ...prev }));
    } else {
      delete errors?.cognome;
    }

    if (formData?.email?.trim() == "") {
      errors = { ...errors, email: "La mail è richiesta" };
    } else {
      delete errors?.email;
    }

    if (errors?.nome == undefined && errors?.cognome == undefined && errors?.email == undefined) {
      setError(false);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const checkNextStep = async () => {
    const errors = await checkErrors();

    if (!errors && checked) {
      setMessage(false);

      if (!formData?.nome) {
        setFormData((prev) => ({
          ...prev,
          nome: user.name.strCapitalization(),
        }));
      }

      if (!formData?.cognome) {
        setFormData((prev) => ({
          ...prev,
          cognome: user.lname.strCapitalization(),
        }));
      }

      if (!formData?.email) {
        setFormData((prev) => ({ ...prev, email: user.email }));
      }

      setNextStep(true);
    } else if (!checked) {
      setMessage({
        type: "error",
        message: "Devi accettare i termini e le condizioni",
      });
      return;
    }
  };
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
  /////Elvis Modifications
  const [price, setPrice] = React.useState(null);

  React.useEffect(() => {
    if (!product) return;

    const priceData = {
      no_iva: product?.discount ? product?.original_price_no_iva : product?.no_iva,
      iva: product?.discount ? product?.original_price_iva : product?.iva,
      discount: product?.discount ? product?.discount : null,
      price: product?.price,
    };

    const priceDataFormatted = {
      // no_iva: {
      //   integer: Math.floor(Number(priceData.no_iva) / 100),
      //   decimal: (Number(priceData.no_iva) % 100).toString().padStart(2, "0"),
      // },
      // iva: {
      //   integer: Math.floor(Number(priceData.iva) / 100),
      //   decimal: (Number(priceData.iva) % 100).toString().padStart(2, "0"),
      // },
      // discount: {
      //   integer: Math.floor(Number(priceData.discount) / 100),
      //   decimal: (Number(priceData.discount) % 100).toString().padStart(2, "0"),
      // },
      price: {
        integer: Math.floor(Number(priceData.price) / 100),
        decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
      },
    };

    setPrice(priceDataFormatted);
  }, []);

  return (
    <>
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
            overflowX: "hidden",
            overflowY: "auto",
            ["@media (min-width:1180px)"]: {
              height: "calc(var(--vh, 1vh) * 100)",
            },
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
              overflowY: "visible",
              height: "auto",
              ["@media (min-width:768px)"]: {
                gridTemplateRows: ["", "3.2fr 10fr"],
                paddingLeft: "calc(10vw + 10vh)",
                height: "100vh",
              },
              ["@media (min-width:763px)  and (max-width:1180px)"]: {
                gridTemplateRows: ["2fr 10.8fr"],
                paddingLeft: "calc(10vw + 10vh)",
              },

              flexDirection: ["column"],
            }}
            className="pt-[3rem] px-[1rem] w-full lg-p-8 md:p-10 lg:max-w-[42vw] md:max-w-[550px]"
          >
            <TopNav
              sx={{
                alignItems: "flex-start!important",
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
                  height: "100%",
                  ["@media (min-width:1180px)"]: {
                    // gridTemplateRows: ["17vh 280px"],
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
                <div>
                  <Box
                    sx={{
                      backgroundColor: "#D9DAF3",
                      borderRadius: "9px",
                      py: "2vh",
                      px: "min(1vw,8px)",
                      position: "relative",

                      ["@media (min-width:1180px)"]: {
                        maxWidth: "413px",
                      },
                      ["@media (max-width:1180px)"]: {
                        minWidth: "290px",
                      },
                      marginRight: "auto",
                      height: "180px",
                    }}
                  >
                    <Box sx={{ gridTemplateColumns: "35% 65%" }} className="flex flex-row justify-evenly items-center w-full">
                      <Typography
                        component={"p"}
                        color={"secondary"}
                        sx={{
                          fontSize: "18px",
                          ["@media (max-width:762px)"]: {
                            fontSize: "calc(14px + 1vw)",
                          },
                        }}
                        className="!font-semibold  text-center lg:text-left"
                      >
                        Iscrizione
                      </Typography>
                      <Typography
                        component={"p"}
                        color={"secondary"}
                        sx={{
                          fontSize: "36px",
                          ["@media (max-width:762px)"]: {
                            fontSize: "calc(28px + 1vw)",
                          },
                        }}
                        className="!font-semibold text-left"
                      >
                        €&nbsp;
                        {`${price?.price?.integer},${price?.price?.decimal}`}
                      </Typography>
                    </Box>
                    <div className="my-2 italic text-[15px] !text-[#2D224C] lg:text-[18px] font-semibold text-center">*Questo prezzo verrà detratto dal prezzo del percorso</div>
                  </Box>
                </div>
                {/* <div className="my-2 italic font-bold">*Questo costo verrà detratto dal prezzo del percorso</div> */}
              </Box>
            </Box>
          </Box>

          <Box
            component={"form"}
            onSubmit={handleSubmit}
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
              <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">Il tuo percorso prevede:</h1>
              <Box
                sx={{
                  display: ["grid"],
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                  gridTemplateRows: ["3fr 2fr"],
                  ["@media (min-width:1180px)"]: {
                    gridTemplateRows: ["minmax(18.5rem,30vh) minmax(3rem,15vh)"],
                    gap: "0px",
                  },
                }}
                className=" "
              >
                {!nextStep ? (
                  <Box className="flex flex-col max-w-[500px]">
                    <FormControl>
                      <Input error={error?.nome ? true : false} className="w-full" required name="nome" variant="standard" sx={{ color: "#2D224C", my: 2 }} color="primary" value={formData?.nome ?? user?.name.strCapitalization() ?? ""} placeholder="nome" onChange={handleChange} />
                      <FormHelperText>{error?.nome ? <small>{error?.nome}</small> : null}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Input className="w-full" error={error?.cognome ? true : false} required name="cognome" variant="standard" color="primary" value={formData?.cognome ?? user?.lname.strCapitalization() ?? ""} placeholder="cognome" sx={{ color: "#2D224C", my: 2 }} onChange={handleChange} />
                      <FormHelperText>{error?.cognome ? <small>{error?.cognome}</small> : null}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Input error={error?.email ? true : false} className="w-full" required name="email" variant="standard" color="primary" value={formData?.email ?? user?.email ?? ""} placeholder="email" sx={{ color: "#2D224C", my: 2 }} onChange={handleChange} />
                      <FormHelperText>{error?.email ? <small>{error?.email}</small> : null}</FormHelperText>
                    </FormControl>

                    <FormGroup className="w-full my-3">
                      <FormControlLabel
                        control={<Checkbox required id="checkbox" checked={checked} onClick={() => setChecked((prev) => !prev)} />}
                        labelPlacement={"end"}
                        label={
                          <div className="text-edu-900 text-[14px] md:text-base">
                            Ho letto e accetto i{" "}
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
                    </FormGroup>
                    <Button disabled={!checked} type="button" color="buttonGreen" className="min-w-full my-10 px-[20px] py-[14px] font-semibold text-[16px] md:text[18px]" variant="contained" onClick={() => checkNextStep()}>
                      procedi
                    </Button>
                  </Box>
                ) : (
                  <Box className="flex flex-col max-w-[500px]">
                    <FormControl>
                      <Input className="w-full" error={error?.nome_titolare_carta ? true : false} name="nome_titolare_carta" variant="standard" color="primary" value={formData?.nome_titolare_carta ?? ""} placeholder="Nome titolare carta" sx={{ color: "#2D224C", my: 2 }} onChange={handleChange} />
                      <FormHelperText>{error?.nome_titolare_carta ? <small>{error?.nome_titolare_carta}</small> : null}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Input className="w-full" error={error?.cognome_titolare_carta ? true : false} name="cognome_titolare_carta" variant="standard" color="primary" value={formData?.cognome_titolare_carta ?? ""} placeholder="Cognome titolare carta" sx={{ color: "#2D224C", my: 2 }} onChange={handleChange} />
                      <FormHelperText>{error?.cognome_titolare_carta ? <small>{error?.cognome_titolare_carta}</small> : null}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Input className="w-full" error={error?.email_titolare_carta ? true : false} name="email_titolare_carta" variant="standard" color="primary" value={formData?.email_titolare_carta ?? ""} placeholder="Email titolare carta" sx={{ color: "#2D224C", my: 2 }} onChange={handleChange} />
                      <FormHelperText>{error?.email_titolare_carta ? <small>{error?.email_titolare_carta}</small> : null}</FormHelperText>
                    </FormControl>
                    <CardElement id="card-element" className="py-3 text-edu-100" options={cardElementOptions} />

                    <Box sx={{ my: 2 }}>
                      <LoadingButton type="submit" color="buttonGreen" variant="contained" className="min-w-full my-10 px-[20px] py-[14px] font-semibold text-[16px] md:text[18px]" disabled={isLoadingPayment} loading={isLoadingPayment} loadingPosition="end">
                        PAGA
                      </LoadingButton>
                      {message ? <MessageBox type={message.type} message={message.message} /> : null}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutSession;
