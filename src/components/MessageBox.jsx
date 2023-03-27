import { Grid } from "@mui/material";
import React from "react";

const PALETTE = {
  COMMON: {
    darken: "rgba(128, 101, 201, .8)",
    light: "rgba(128, 101, 201, .25)",
    text: "rgba(128, 101, 201, 1)",
  },
  SUCCESS: {
    darken: "rgba(116, 2022, 172, .8)",
    light: "rgba(116, 2022, 172, .25)",
    text: "#31602A",
  },
  ERROR: {
    darken: "rgba(212, 20, 90, .8)",
    light: "rgba(212, 20, 90, .25)",
    text: "rgba(212, 20, 90, 1)",
  },
};

const error = {
  borderLeft: "20px solid " + PALETTE.ERROR.darken,
  color: PALETTE.ERROR.text,
  backgroundColor: PALETTE.ERROR.light,
};

const success = {
  borderLeft: "20px solid " + PALETTE.SUCCESS.darken,
  color: PALETTE.SUCCESS.text,
  backgroundColor: PALETTE.SUCCESS.light,
};

const common = {
  borderLeft: "20px solid " + PALETTE.COMMON.text,
  color: PALETTE.COMMON.text,
  backgroundColor: PALETTE.COMMON.light,
};

const defaultStyle = {
  padding: "20px",
  maxWidth: "100%",
  borderRadius: "10px",
};

const MessageBox = ({ message, type }) => {
  const typeMessage = type === "error" ? error : type === "success" ? success : common;
  return (
    <Grid item xs={12} className={"my-3 w-full"}>
      <div style={{ ...typeMessage, ...defaultStyle }} className="text-xs md:text-sm xl:text-base 3xl:text-xl max:text-4xl">
        {message}
      </div>
    </Grid>
  );
};

export default MessageBox;
