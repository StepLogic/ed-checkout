import { Box, Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";

import { TextField } from "@components/textfield";
const UserInfo = (props) => {
  const [state, setState] = useState(false);
  return (
    <>
      <h1 className=" font-semibold text-center lg:text-start  leading-none text-edu-900 text-[24px] lg:text-3xl 3xl:text-4xl max:text-6xl w-full">
        Finalizza la tua iscrizione
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
          <TextField placeholder="Nome" />
          <TextField placeholder="Cogome" />
          <TextField placeholder="Email" />
          <TextField placeholder="Citta" />
          <TextField placeholder="Indirizo" />
          <TextField placeholder="CAP" />
          <div className="flex flex-col gap-4 my-2">
            <div className="flex flex-row gap-4 items-center">
              <Checkbox
                checked={state}
                onChange={(event) => setState(event.target?.checked)}
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "20px",
                  color: "#2D224C",
                }}
              >
                Ho la P.IVA. / Paga il corso la mia azienda
              </Typography>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Checkbox />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "20px",
                  color: "#2D224C",
                }}
              >
                Ho letto e accetto i Termini e le Condizioni del servizio e la
                Privacy Policy
              </Typography>
            </div>
          </div>
        </Box>

        <Button
          color="green"
          sx={{
            height: "59px",
          }}
          variant="contained"
          className="mt-8"
          onClick={() => {
            props?.next && props?.next(state);
          }}
        >
          Procedi
        </Button>
      </Box>
    </>
  );
};
export default UserInfo;
