import { Checkbox, Typography, Button, Box } from "@mui/material";
import React from "react";
import Header from "@components/Header";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Bottom from "./Bottom.jsx";
import { useNavigate, useLocation } from "react-router-dom";
const ThankYou = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "100px auto",
        height: "calc(var(--vh, 1vh) * 100)",
        overflowX: "hidden",
        backgroundColor: "#d9daf3",
      }}
    >
      <Header
        white={false}
        logo={true}
        select={false}
        form={false}
        ita={false}
        notDefault={true}
        Value={() => (
          <>
            <span className="text-xs font-regular md:text-base">Serve aiuto?</span>
            <WhatsApp className="pb-1" fontSize={"small"} />
          </>
        )}
      />
      <div className="flex h-full flex-col items-center justify-center gap-[min(max(6vh,1rem),2rem)] max-w-[862px] mx-auto my-auto">
        <h1 className="text-[#2D224C] leading-[100%] font-semibold text-center  text-[24px] lg:text-[48px]">
          Il pagamento è andato <br className="lg:hidden" /> a buon fine!
        </h1>
        <p className="max-w-[80%] text-[#2D224C] text-center font-medium text-[16px]  lg:text-[20px] leading-[100%]">
          {location?.state?.iva
            ? `Ti abbiamo inviato via email la ricevuta del pagamento. 
La fattura elettronica sarà emessa entro i 12 giorni previsti dalla legge italiana.
Siamo davvero felici che inizierai un percorso con noi!`
            : `    Ti abbiamo inviato via email la ricevuta del pagamento. Siamo davvero
          felici che inizierai un percorso con noi!`}
        </p>
        <p className="max-w-[63%] text-[#2D224C] mt-[2vh] text-center font-medium text-[16px]  lg:text-[20px] leading-[100%]">
          Ti faremo qualche domanda per conoscerti meglio.
          <br className="lg:hidden" /> Ci vogliono solo
          <b className="text-[#D4145A]"> 2 minuti</b>
        </p>
        <h2 className=" text-[24px] lg:text-[32px] text-[#2D224C] font-bold mt-[4vh]">Vogliamo iniziare?</h2>
        <Button color={"button"} variant="contained" size="large" className="w-[70%]">
          Let's Go
        </Button>
        <Box
          sx={{
            ["@media (min-width:736px)"]: {
              minHeight: "81px",
            },
            minHeight: "46px",
            width: "70%",
            position: "relative",
            background: "#FFFFFF",
            borderRadius: "9px",
            paddingLeft: "22px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            "&::before": {
              content: `''`,
              display: "block",
              width: "22px",
              height: "46px",
              ["@media (min-width:736px)"]: {
                height: "81px",
              },
              background: "#8065C9",
              position: "absolute",
              left: 0,
              borderRadius: "9px 0px 0px 9px",
            },
          }}
        >
          <p className="text-[#8065C9] text-[12px] leading-[100%] lg:text-[18px] font-medium px-4">Questo step è fondamentale per finalizzare la tua registrazione.</p>
        </Box>
      </div>
      {/* <div className="flex w-full relative">
        <Bottom className="absolute bottom-0 w-full" />
      </div> */}
    </Box>
  );
};
export default ThankYou;
