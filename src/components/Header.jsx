import { ExpandMore, WhatsApp } from "@mui/icons-material";
import { Box, Grid, MenuItem, Select, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import logoEdu from "../assets/img/logoEdu.svg";
import logoEduBianco from "../assets/img/logoEduBianco.svg";

import AuthContext from "../context/Authcontext";

const text = { italiano: "Hai bisogno di aiuto?", english: "Need help?" };
const classMenu = {
  "&:hover": {
    backgroundColor: "#d9daf3",
    color: "#8065c9",
  },
  "&.Mui-selected": {
    // backgroundColor: "#d9daf3",
    // color: "#8065c9",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#d9daf3",
    color: "#8065c9",
  },
  ["@media (min-width:1024px)"]: {
    // eslint-disable-line no-useless-computed-key
    fontSize: "0.875rem",
  },
  ["@media (min-width:1280px)"]: {
    // eslint-disable-line no-useless-computed-key
    fontSize: "1rem",
  },

  ["@media (min-width:2300px)"]: {
    // eslint-disable-line no-useless-computed-key
    fontSize: "1.25rem",
  },
  ["@media (min-width:3500px)"]: {
    // eslint-disable-line no-useless-computed-key
    fontSize: "2.25rem",
  },
};
const Header = (props) => {
  const { setLanguage, language } = useContext(AuthContext);

  const selectChange = (event) => {
    setLanguage(event.target.value);
  };

  const sizeXXXL = useMediaQuery("(min-width:2300px)");

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const classesNav = props.form ? "img_sfondo_top_form" : "img_sfondo_top";
  return (
    <Box sx={{ position: "relative" }} className={classesNav}>
      <nav className="mb-10">
        <Grid container justifyContent="space-between" alignItems="center">
          {props.logo && (
            <Grid item md={4}>
              <div className="logo">
                {props.white ? (
                  <img src={logoEduBianco} alt="Logo Edusogno" />
                ) : (
                  <img src={logoEdu} alt="Logo Edusogno" />
                )}
              </div>
            </Grid>
          )}
          {props.select && (
            <Grid item>
              <Select
                className="underline"
                IconComponent={ExpandMore}
                color="white"
                variant="standard"
                value={language}
                onChange={selectChange}
                sx={{
                  fontSize: "16px",
                  color: "currentColor",
                  "-webkit-text-fill-color": "currentColor!important",
                  "& .MuiSelect-select": {
                    "-webkit-text-fill-color": "currentColor!important",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:hover:not(.Mui-disabled):after": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                  },
                  ["@media (min-width:768px)"]: {
                    // eslint-disable-line no-useless-computed-key
                    fontSize: "16px",
                  },

                  ["@media (min-width:2300px)"]: {
                    // eslint-disable-line no-useless-computed-key
                    fontSize: "24px",
                    paddingRight: "5px",
                  },
                  ["@media (min-width:3500px)"]: {
                    // eslint-disable-line no-useless-computed-key
                    fontSize: "36px",
                    paddingRight: "30px",
                  },

                  "& .MuiSelect-icon": {
                    color: "currentColor",
                    fontSize: "16px",
                    ["@media (min-width:768px)"]: {
                      // eslint-disable-line no-useless-computed-key
                      fontSize: "16px",
                    },

                    ["@media (min-width:2300px)"]: {
                      // eslint-disable-line no-useless-computed-key
                      fontSize: "24px",
                    },
                    ["@media (min-width:3500px)"]: {
                      // eslint-disable-line no-useless-computed-key
                      fontSize: "50px",
                    },
                  },
                }}
              >
                <MenuItem sx={classMenu} value="english">
                  English
                </MenuItem>
                <MenuItem sx={classMenu} value="italiano">
                  Italiano
                </MenuItem>
              </Select>
            </Grid>
          )}
          <Grid item md={4}>
            <div className="relative ml-auto w-fit help 3xl:text-2xl max:text-4xl z-40">
              <a
                className="no-underline"
                onClick={() =>
                  openInNewTab("https://api.whatsapp.com/send?phone=3715467005")
                }
              >
                {props?.notDefault ? (
                  <>{props.Value()}</>
                ) : (
                  <>
                    {props.ita ? text["italiano"] : text[language]}
                    <WhatsApp
                      className="pb-1"
                      fontSize={sizeXXXL ? "large" : "small"}
                    />
                  </>
                )}
              </a>
              <div className="absolute left-0 line bottom-1"></div>
            </div>
          </Grid>
        </Grid>
      </nav>
      {props.children}
    </Box>
  );
};

export default Header;
