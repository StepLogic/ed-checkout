import {
  Box,
  Button,
  Link,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Input,
  FormHelperText,
  FormControl,
} from "@mui/material";
import React from "react";
import bgCheckout from "../../assets/img/bgCheckout.svg";
import bgCheckoutMobile from "../../assets/img/bgCheckoutMobile.svg";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../../utils";
import { useWindowSize } from "./LandingPaymentPage";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import MessageBox from "../../components/MessageBox";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";

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
      history.replaceState(
        null,
        document.title,
        location.pathname + "#!/stealingyourhistory"
      );
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

    if (
      [
        "nome",
        "cognome",
        "nome_titolare_carta",
        "cognome_titolare_carta",
      ].includes(name)
    ) {
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
    if (
      formData?.nome_titolare_carta == undefined ||
      formData?.nome_titolare_carta?.trim() == ""
    ) {
      errors = {
        ...errors,
        nome_titolare_carta: "Il nome del titolare è richiesto",
      };
    } else {
      delete errors?.nome_titolare_carta;
    }

    if (
      formData?.cognome_titolare_carta == undefined ||
      formData?.cognome_titolare_carta?.trim() == ""
    ) {
      errors = {
        ...errors,
        cognome_titolare_carta: "Il cognome del titolare è richiesto",
      };
      setError((prev) => ({ ...prev }));
    } else {
      delete errors?.cognome_titolare_carta;
    }

    if (
      formData?.email_titolare_carta == undefined ||
      formData?.email_titolare_carta?.trim() == ""
    ) {
      errors = {
        ...errors,
        email_titolare_carta: "La mail del titolare è richiesta",
      };
    } else {
      delete errors?.email_titolare_carta;
    }

    if (
      errors?.nome_titolare_carta == undefined &&
      errors?.cognome_titolare_carta == undefined &&
      errors?.email_titolare_carta == undefined
    ) {
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
      const { error: backendError, data } = await axios.post(
        BASE + "v1/checkout/stripe/create-intent",
        { product: product.token, user_token: user.token, customer: formData }
      );

      clientSecret = data.clientSecret;
    } catch (error) {
      setIsLoadingPayment(false);
      setMessage({
        type: "error",
        message: "Qualcosa è andato storto contatta l'assistenza",
      });
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
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

    if (
      errors?.nome == undefined &&
      errors?.cognome == undefined &&
      errors?.email == undefined
    ) {
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

  return (
    <section className="h-full text-white bg-edu-900">
      <div className="h-full min-h-screen">
        <div className="grid h-full md:grid-flow-col md:auto-cols-auto min-h-screen">
          <div className="h-full p-8 md:p-10 flex flex-col justify-center  lg:max-w-[450px] md:max-w-[350px]">
            <TopNav hiddenLink={width > 768 ? true : false} />

            <h1 className="font-semibold leading-none text-white text-2xl lg:text-3xl 3xl:text-4xl max:text-6xl">
              Il tuo percorso prevede:
            </h1>

            <ul className="my-10 text-base">
              {product?.product_details?.map((det, i) => {
                return (
                  <li key={i}>
                    &bull;<span className="ml-2">{det}</span>
                  </li>
                );
              })}
            </ul>

            <div>
              <Box className="w-full p-4 mt-20 bg-edu-100 text-edu-900 rounded-xl md:max-w-fit">
                <div className="flex justify-between">
                  <div>Prezzo del percorso</div>
                  <div className="md:ml-10">
                    {product.no_iva.toDecimalsEuro()}
                  </div>
                </div>
                <div className="flex justify-between my-3">
                  <div>IVA (22%)</div>
                  <div>{product.iva.toDecimalsEuro()}</div>
                </div>
                <div className="flex justify-between">
                  <div>Prezzo IVA inclusa</div>
                  <div className="font-bold">
                    {product.price.toDecimalsEuro()}
                  </div>
                </div>
              </Box>
              <div className="my-2 italic font-semibold">
                *Questo costo verrà detratto dal prezzo del percorso
              </div>
            </div>
          </div>

          <Box
            component={"form"}
            className="w-full h-full p-8 bg-no-repeat bg-cover md:pl-32 lg:pl-48 md:p-10"
            onSubmit={handleSubmit}
            style={{
              backgroundImage: `url('${
                width < 768 ? bgCheckoutMobile : bgCheckout
              }')`,
              paddingTop: width < 768 ? 150 : 0,
              backgroundPosition: width < 768 ? "top  center" : "center left",
              backgroundColor: "#2D224C",
            }}
            sx={{ display: "grid", gridTemplateRows: ["", "1fr 1fr 5fr"] }}
          >
            <TopNav hiddenLogo={true} hiddenLink={width > 768 ? false : true} />

            <h1 className="font-semibold leading-none  text-edu-900  text-2xl lg:text-3xl 3xl:text-4xl max:text-6xl">
              Prenota il posto e inizia quando vuoi
            </h1>

            <Box className="flex flex-col w-full">
              {!nextStep ? (
                <Box className="flex flex-col max-w-[500px]">
                  <FormControl>
                    <Input
                      error={error?.nome ? true : false}
                      className="w-full"
                      required
                      name="nome"
                      variant="standard"
                      sx={{ color: "#2D224C", my: 2 }}
                      color="primary"
                      value={
                        formData?.nome ?? user?.name.strCapitalization() ?? ""
                      }
                      placeholder="nome"
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.nome ? <small>{error?.nome}</small> : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <Input
                      className="w-full"
                      error={error?.cognome ? true : false}
                      required
                      name="cognome"
                      variant="standard"
                      color="primary"
                      value={
                        formData?.cognome ??
                        user?.lname.strCapitalization() ??
                        ""
                      }
                      placeholder="cognome"
                      sx={{ color: "#2D224C", my: 2 }}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.cognome ? <small>{error?.cognome}</small> : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <Input
                      error={error?.email ? true : false}
                      className="w-full"
                      required
                      name="email"
                      variant="standard"
                      color="primary"
                      value={formData?.email ?? user?.email ?? ""}
                      placeholder="email"
                      sx={{ color: "#2D224C", my: 2 }}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.email ? <small>{error?.email}</small> : null}
                    </FormHelperText>
                  </FormControl>

                  <FormGroup className="w-full my-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          id="checkbox"
                          checked={checked}
                          onClick={() => setChecked((prev) => !prev)}
                        />
                      }
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
                  <Button
                    disabled={!checked}
                    type="button"
                    color="buttonGreen"
                    className="min-w-full my-10 px-[20px] py-[14px] font-semibold text-[16px] md:text[18px]"
                    variant="contained"
                    onClick={() => checkNextStep()}
                  >
                    procedi
                  </Button>
                </Box>
              ) : (
                <Box className="flex flex-col max-w-[500px]">
                  <FormControl>
                    <Input
                      className="w-full"
                      error={error?.nome_titolare_carta ? true : false}
                      name="nome_titolare_carta"
                      variant="standard"
                      color="primary"
                      value={formData?.nome_titolare_carta ?? ""}
                      placeholder="Nome titolare carta"
                      sx={{ color: "#2D224C", my: 2 }}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.nome_titolare_carta ? (
                        <small>{error?.nome_titolare_carta}</small>
                      ) : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <Input
                      className="w-full"
                      error={error?.cognome_titolare_carta ? true : false}
                      name="cognome_titolare_carta"
                      variant="standard"
                      color="primary"
                      value={formData?.cognome_titolare_carta ?? ""}
                      placeholder="Cognome titolare carta"
                      sx={{ color: "#2D224C", my: 2 }}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.cognome_titolare_carta ? (
                        <small>{error?.cognome_titolare_carta}</small>
                      ) : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <Input
                      className="w-full"
                      error={error?.email_titolare_carta ? true : false}
                      name="email_titolare_carta"
                      variant="standard"
                      color="primary"
                      value={formData?.email_titolare_carta ?? ""}
                      placeholder="Email titolare carta"
                      sx={{ color: "#2D224C", my: 2 }}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {error?.email_titolare_carta ? (
                        <small>{error?.email_titolare_carta}</small>
                      ) : null}
                    </FormHelperText>
                  </FormControl>
                  <CardElement
                    id="card-element"
                    className="py-3 text-edu-100"
                    options={cardElementOptions}
                  />

                  <Box sx={{ my: 2 }}>
                    <LoadingButton
                      type="submit"
                      color="buttonGreen"
                      variant="contained"
                      className="min-w-full my-10 px-[20px] py-[14px] font-semibold text-[16px] md:text[18px]"
                      disabled={isLoadingPayment}
                      loading={isLoadingPayment}
                      loadingPosition="end"
                    >
                      PAGA
                    </LoadingButton>
                    {message ? (
                      <MessageBox
                        type={message.type}
                        message={message.message}
                      />
                    ) : null}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSession;
