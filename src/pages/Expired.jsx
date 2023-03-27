import React from "react";
import { Box, Button } from "@mui/material";
import heroCheckoutLanding from "@assets/img/heroCheckoutLanding.svg";
import logoEduWhite from "@assets/img/logoEduWhite.svg";
import { capitalize } from "lodash";
import { WhatsApp } from "@mui/icons-material";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const TopNav = ({ hiddenLogo = false, hiddenLink = false }) => {
  return (
    <div className="flex items-center justify-between mb-14">
      <Box>
        <img
          src={logoEduWhite}
          alt=""
          className={classNames(hiddenLogo && "opacity-0")}
        />
      </Box>
      <div
        className={classNames(
          hiddenLink && "opacity-0",
          "relative ml-auto h-fit w-fit help 3xl:text-2xl max:text-4xl text-white no-underline "
        )}
      >
        <a
          className="no-underline"
          href="https://api.whatsapp.com/send?phone=3715467005"
          target={"_blank"}
        >
          <span className="text-xs font-semibold md:text-base">
            Hai bisogno di aiuto?
          </span>
          <WhatsApp className="pb-1" fontSize={"small"} />
        </a>
        <div className="absolute left-0 bg-white line bottom-1"></div>
      </div>
    </div>
  );
};

const Expired = ({ data }) => {
  return (
    <Box className="flex flex-col flex-grow min-h-screen bg-edu-100">
      <section className="text-white ">
        <div
          className="p-5 bg-bottom bg-no-repeat bg-cover md:p-10"
          style={{ backgroundImage: `url('${heroCheckoutLanding}')` }}
        >
          <TopNav />

          <div className="container flex flex-col items-center w-full mx-auto mt-10 text-center md:w-1/2">
            <h1 className="text-4xl font-bold leading-none sm:text-4xl">
              {capitalize(data?.name)}, il tempo è scaduto! ⏱
            </h1>
            <p className="px-8 py-8 text-[16px] font-light">
              Riassegnamo continuamente i posti e se non ci avvisi, c’è il
              rischio che assegnamo il tuo posto ad uno studente o a una
              studentessa in lista d’attesa.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-grow">
        <div className="flex flex-grow">
          <div className="flex flex-col items-center justify-center w-full h-full gap-10 text-center text-edu-900">
            <div className="pb-4 text-4xl font-extrabold leading-none sm:text-4xl">
              Contattaci al piu presto
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=3715467005"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" color="button" size="large">
                scrivici su whatsapp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Expired;
