import { Box } from "@mui/material";
import React from "react";
import bgCheckout from "@assets/img/bgCheckout.svg";
import bgCheckoutMobile from "@assets/img/bgCheckoutMobile.svg";
import bgCheckoutIpad from "@assets/img/bgCheckoutIpad.svg";
import { useWindowSize } from "../hooks/useWindowSize.jsx";
import PDFviewer from "../common/pdf/PDFviewer";
import TopNav from "./TopNav.jsx";
import useCheckout from "../hooks/useCheckout.jsx";

const Content = ({ children, showPDF = false }) => {
  const { data } = useCheckout({ session: 1 });
  const product = data?.product;

  const [width] = useWindowSize();

  return (
    <Box
      className="pb-8 lg:pb-0 px-4"
      sx={{
        display: "flex",

        backgroundRepeat: "no",
        backgroundSize: "cover",
        backgroundPosition: "top  center",
        flexDirection: "column",
        paddingTop: "10vh",
        backgroundImage: `url('${bgCheckoutMobile}')`,
        ["@media (min-width:1180px)"]: {
          gridTemplateRows: "70px auto!important",
          paddingLeft: "calc(10vw + 10vh)",
        },
        // ["@media (min-width:763px)"]: {
        //   paddingLeft: "16vh",
        // },
        // ["@media (min-width:1180px) and (min-height:763px)"]: {
        //   gridTemplateRows: "90px auto!important",
        // },
        // ["@media (min-width:1180px) and (min-height:790px)"]: {
        //   gridTemplateRows: "124px auto!important",
        // },

        ["@media (min-width:1024px)"]: {
          display: "grid",
          gridTemplateRows: ["1fr 10fr"],
          backgroundImage: `url('${bgCheckout}')`,
          backgroundPosition: "center left",
          height: "100%",
          paddingLeft: "calc(5vw + 10vh)!important",
          borderRadius: 0,
          paddingTop: "3rem",
        },
        // ["@media (min-width:763px)  and (max-width:1180px)"]: {
        //   gridTemplateRows: ["124px 10.8fr"],
        //   backgroundImage: `url('${bgCheckoutIpad}')`,
        //   // backgroundPosition: "center left",
        //   paddingLeft: "calc(6vw + 5vh)!important",
        // },
      }}
    >
      <TopNav
        hiddenLogo={true}
        hiddenLink={width > 1024 ? false : true}
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
          },
          // ["@media (min-width:763px)  and (max-width:1180px)"]: {
          //   paddingBottom: "unset",
          // },
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
            ["@media (min-width:736px)"]: {
              "& .swiper": {
                width: "63vw!important",
                "& .thumbnail": {
                  maxWidth: "10.5rem!important",
                },
              },
              "& .react-pdf__Page__canvas": {
                width: "63vw!important",
              },
            },
            ["@media (min-width:1022px)"]: {
              "& .swiper": {
                width: "43vw!important",
              },
              "&  .swiper .thumbnail .react-pdf__Page__canvas": {
                maxWidth: "10.5rem!important",
              },

              "& .react-pdf__Page__canvas": {
                width: "43vw!important",
              },
            },
            ["@media (min-width:1280px)"]: {
              "&  .swiper .thumbnail .react-pdf__Page__canvas": {
                maxWidth: "9.5rem!important",
              },
            },

            ["@media (min-width:1600px)"]: {
              my: "auto",
              "& .swiper": {
                width: "600px!important",
              },
              "&  .swiper .thumbnail .react-pdf__Page__canvas": {
                maxWidth: "9.5rem!important",
              },
              "& .react-pdf__Page__canvas": {
                width: "600px!important",
              },
            },
            ["@media (min-width:2350px)"]: {
              my: "auto",
              "& .swiper": {
                width: "700px!important",
                "& .thumbnail": {
                  maxWidth: "9.5rem!important",
                },
              },
              "& .react-pdf__Page__canvas": {
                width: "700px!important",
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
            width: "100%",
            ["@media (min-width:2050px)"]: {
              width: "1050px!important",
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
