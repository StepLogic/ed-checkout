import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";

import { TextField } from "@components/textfield";
const IVAForm = (props) => {
  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Fornisci le informazioni della Partita IVA
      </h1>
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
        <Box
          component="form"
          sx={{
            height: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#8065C9",
            },
            "scrollbar-width": "thin",
            "scrollbar-color": "#8065C9 green",
          }}
          className="flex flex-col gap-8"
        >
          <TextField placeholder="Denominazione e Ragione Sociale " />
          <TextField placeholder="Partita IVA" />
          <TextField placeholder="Codice Destinatario" />
          <TextField placeholder="Città, indirizzo e CAP" />
          <TextField placeholder="PEC Destinatatio" />
          <TextField placeholder="CAP" />
        </Box>

        <Button
          color="green"
          sx={{
            height: "59px",
          }}
          variant="contained"
          className="mt-8"
          onClick={() => {
            props?.next && props?.next();
          }}
        >
          Procedi
        </Button>
      </Box>
    </>
  );
};

export default IVAForm;
