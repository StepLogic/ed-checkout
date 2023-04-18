import { Box, Button, Typography } from "@mui/material";
import React from "react";
import klarna from "../../assets/img/klarna.svg";
import bgCheckout from "@assets/img/bgCheckout.svg";
import bgCheckoutMobile from "@assets/img/bgCheckoutMobile.svg";
import { useWindowSize } from "../hooks/useWindowSize.jsx";
import PDFviewer from "../common/pdf/PDFviewer";
import TopNav from "./TopNav.jsx";
import useCheckout from "../hooks/useCheckout.jsx";
import IVAForm from "../common/IVAForm.jsx";
import PaymentOption from "../common/PaymentOptions";
import PaymentForm from "../common/PaymentForm";

const Content = ({ children, showPDF = false }) => {
  const {
    data: { user, product },
    isError,
    isLoading,
  } = useCheckout({ session: 1 });

  const [width] = useWindowSize();

  return (
    <Box
      className="pb-8 lg:pb-0 px-4"
      style={{
        backgroundImage: `url('${
          width < 768 ? bgCheckoutMobile : bgCheckout
        }')`,
        // paddingTop: width < 768 ? 0 : 0,
        backgroundRepeat: "no",
        backgroundSize: "cover",
        backgroundPosition: width < 768 ? "top  center" : "center left",
        backgroundColor: "#fffff",
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "10vh",
        ["@media (min-width:1180px)"]: {
          gridTemplateRows: "70px auto!important",
          paddingLeft: "calc(10vw + 10vh)",
        },
        ["@media (min-width:1180px) and (min-height:763px)"]: {
          gridTemplateRows: "90px auto!important",
        },
        ["@media (min-width:1180px) and (min-height:790px)"]: {
          gridTemplateRows: "124px auto!important",
        },
        ["@media (min-width:763px)"]: {
          display: "grid",
          gridTemplateRows: ["1fr 10fr"],
          paddingLeft: "calc(10vw + 5vh)!important",
          paddingTop: "40px",
          height: ["calc(var(--vh, 1vh) * 100)"],
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
          maxWidth: ["100vw", "1000px"],
          display: "flex",
          flexDirection: "column",
          height: "auto",
          gap: "1rem",
          paddingBottom: "2rem",
          ["@media (min-width:1180px)"]: {
            gap: "2rem",
            paddingBottom: "unset",
          },

          ["@media (min-width:2050px)"]: {
            // maxWidth: ",
            height: "50vh",
            my: "auto",
            mx: "auto",
          },
        }}
      >
        <Box
          sx={{
            display: showPDF ? "block" : "none",
            "& .swiper": {
              width: "80vw!important",
            },

            "& .react-pdf__Page__canvas": {
              width: "80vw!important",
              maxHeight: "calc(300px + 5vw)",
            },
            ["@media (min-width:1280px)"]: {
              "& .swiper": {
                width: "30vw!important",
              },
              "& .react-pdf__Page__canvas": {
                width: "30vw!important",
              },
            },

            ["@media (min-width:736px)"]: {
              "& .swiper": {
                width: "43vw!important",
                "& .thumbnail": {
                  maxWidth: "9.5rem!important",
                },
              },
              "& .react-pdf__Page__canvas": {
                width: "43vw!important",
              },
            },
            ["@media (min-width:1600px)"]: {
              my: "auto",
              "& .swiper": {
                width: "600px!important",
                "& .thumbnail": {
                  maxWidth: "9.5rem!important",
                },
              },
              "& .react-pdf__Page__canvas": {
                width: "600px!important",
              },
            },
            ["@media (min-width:2050px)"]: {
              my: "auto",
              "& .swiper": {
                width: "1000px!important",
                "& .thumbnail": {
                  maxWidth: "9.5rem!important",
                },
              },
              "& .react-pdf__Page__canvas": {
                width: "1000px!important",
              },
            },
          }}
        >
          <PDFviewer fileBase64={product?.slides} />
        </Box>

        <Box
          sx={{
            display: showPDF ? "none" : "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "38px auto",
            gap: "1rem",
            marginBottom: "1rem",

            ["@media (min-width:2050px)"]: {
              gridTemplateRows: "4rem auto",
            },
          }}
          className=" h-full"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
