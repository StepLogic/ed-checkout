import { Button, Typography, useMediaQuery, Grid, LinearProgress } from "@mui/material";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { CircleStartForm, Razzo, SciaRazzo } from "@assets/svg/Svg";

import Footer from "@components/Footer";
import Header from "@components/Header";
import axios from "axios";

const BASE = import.meta.env.VITE_BASE_URL;

const ThankYouInstallment = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [status, setStatus] = React.useState(null);
  const savePayment = async (payload) => {
    const { error, data } = await axios.post(BASE + "v1/checkout/save-payment", payload).catch(function (error) {
      return { error: error.response.data.error };
    });

    setIsLoading(false);

    console.log({ error, data });

    if (data) {
      setStatus(data.success);
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.get("user_token") || !urlParams.get("payment_intent") || !urlParams.get("product")) return;
    const data = {
      token: urlParams.get("user_token"),
      payment_intent_klarna: urlParams.get("payment_intent"),
      product: urlParams.get("product"),
      type: "stripe",
    };

    savePayment(data);

    console.log({ data });
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className="startForm_page">
      <Header white={false} logo={true} select={false} form={false} ita={true}></Header>
      <main className="relative w-full startForm">
        <div className="hidden md:block absolute left-[2%] xl:left-[10%] top-[50%]">
          <CircleStartForm />
        </div>
        <div className="hidden md:block absolute right-[2%] xl:right-[10%] md:bottom-[-10%] max:bottom-0 ">
          <Razzo />
          <div style={{ marginTop: "-50px", zIndex: "1", position: "relative" }}>
            <SciaRazzo />
          </div>
        </div>

        {status ? (
          <Grid container rowSpacing={{ xs: 1, md: 3, xxxl: 5, max: 7 }} maxWidth={{ lg: 700, xxl: 900, xxxl: 1100, max: 1500 }} alignItems="center" justifyContent="center" px={3}>
            <Grid item xs={11} md={12}>
              <Typography
                fontWeight="700"
                color="secondary"
                className="text-center"
                fontSize={{
                  xs: "24px",
                  md: "30px",
                  lg: "36px",
                  xxl: "46px",
                  xxxl: "58px",
                  max: "80px",
                }}
              >
                Il pagamento del saldo è andato a buon fine!
              </Typography>
            </Grid>
            <Grid item xs={9} md={12}>
              <Typography
                fontSize={{
                  xs: "14px",
                  md: "18px",
                  lg: "20px",
                  xxl: "25px",
                  xxxl: "30px",
                  max: "40px",
                }}
                color="secondary"
                className="text-center"
              >
                Potrai scaricare la ricevuta direttamente della piattaforma una volta iniziato il percorso.
              </Typography>
            </Grid>
            <Grid item xs={9} md={12}>
              <Typography
                fontSize={{
                  xs: "14px",
                  md: "18px",
                  lg: "20px",
                  xxl: "25px",
                  xxxl: "30px",
                  max: "40px",
                }}
                color="secondary"
                className="text-center"
              >
                Ti contatteremo per darti le informazioni sull'accesso alla piattaforma e l'inizio del percorso entro i prossimi 10 giorni.
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container rowSpacing={{ xs: 1, md: 3, xxxl: 5, max: 7 }} maxWidth={{ lg: 700, xxl: 900, xxxl: 1100, max: 1500 }} alignItems="center" justifyContent="center" px={3}>
            <Grid item xs={11} md={12}>
              <Typography
                fontWeight="700"
                color="secondary"
                className="text-center"
                fontSize={{
                  xs: "24px",
                  md: "30px",
                  lg: "36px",
                  xxl: "46px",
                  xxxl: "58px",
                  max: "80px",
                }}
              >
                Qualcosa è andato storto riprova piu' tardi o contatta l'assistenza!
              </Typography>
            </Grid>
          </Grid>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default ThankYouInstallment;
