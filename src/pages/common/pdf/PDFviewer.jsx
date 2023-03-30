import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Box } from "@mui/material";
import s from "./index.module.css";
import "./style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import cn from "classnames";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "usehooks-ts";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const INITIALIZE_PDF = {
  maxPages: 1,
  currentPage: 1,
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const AllPages = ({ pages, currentPage, maxPages }) => {
  return (
    <>
      {pages.map((page, index) => {
        return (
          <Page
            width={1080}
            height={720}
            key={index}
            pageNumber={page}
            className={classNames(
              page === currentPage
                ? "z-20 center relative"
                : "absolute z-10 right"
            )}
          />
        );
      })}
    </>
  );
};
const PagesThumbnails = ({ pages, currentPage, setPdfDetails, setSwiper }) => {
  const { width } = useWindowSize();
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      // initialSlide={currentPage}
      breakpoints={{
        // when window width is >= 320px
        100: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1360: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1960: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      centeredSlides={true}
      centeredSlidesBounds={true}
      roundLengths={true}
      freeMode={true}
      loop={false}
      onSwiper={setSwiper}
      modules={[FreeMode, Navigation]}
      className="mySwiper w-full max-w-[90vw]  lg:max-w-[60vw] track mx-auto"
    >
      {pages.map((page, index) => {
        return (
          <SwiperSlide key={index}>
            <button
              onClick={() =>
                setPdfDetails((prev) => {
                  return { ...prev, currentPage: page };
                })
              }
              data-test-id={page}
              data-test={currentPage}
              className={cn("thumbnail  relative", {
                "active-thumbnail": index + 1 === currentPage,
              })}
            >
              <Page
                width={1080}
                height={720}
                key={index}
                pageNumber={page}
                className={cn(" absolute  z-20 top-0")}
              />
            </button>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const PDFviewer = ({ fileBase64 }) => {
  const [swiper, setSwiper] = React.useState(null);

  const [pdfDetails, setPdfDetails] = React.useState(INITIALIZE_PDF);
  const pages = Array.from(Array(pdfDetails.maxPages).keys(), (x) => x + 1);

  function onDocumentLoadSuccess({ numPages }) {
    setPdfDetails((prev) => ({ ...prev, maxPages: numPages }));
  }

  return (
    <Document
      file={`data:application/pdf;base64,${fileBase64}`}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <div className={cn("flex flex-col relative  gap-4 ", s.root)}>
        <div className="flex relative col  items-center justify-center mb-5 p-5">
          <div className="flex items-center">
            <AllPages
              pages={pages}
              currentPage={pdfDetails.currentPage}
              maxPages={pdfDetails.maxPages}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4 absolute bottom-[-2rem]">
            <button
              className={`${pdfDetails.currentPage === 1 && "opacity-50"}`}
              disabled={pdfDetails.currentPage === 1}
              // className="absolute bottom-0 left-1 lg:left-[-5vw] z-30 prev rounded-[50%]"
              onClick={() => {
                swiper.slideTo(
                  pdfDetails.currentPage - 1 <= 0
                    ? pdfDetails.maxPages
                    : pdfDetails.currentPage - 1
                );
                setPdfDetails((prev) => {
                  return pdfDetails.currentPage - 1 <= 0
                    ? { ...prev, currentPage: prev.maxPages }
                    : { ...prev, currentPage: prev.currentPage - 1 };
                });
              }}
            >
              <NavigateBeforeRoundedIcon
                fontSize="large"
                sx={{
                  color: "#74DFAC",
                  // ["@media (min-width:1180px)"]: {
                  //   width: "2em",
                  //   height: "2em",
                  // },
                }}
              />
            </button>

            <button
              className={`${
                pdfDetails.currentPage === pdfDetails.maxPages && "opacity-50"
              }`}
              disabled={pdfDetails.currentPage === pdfDetails.maxPages}
              // className="absolute bottom-0 right-1 lg:right-[-5vw] z-30 next rounded-[50%]"
              onClick={() => {
                // pdfDetails.currentPage
                swiper.slideTo(
                  pdfDetails.currentPage + 1 > pdfDetails.maxPages
                    ? 1
                    : pdfDetails.currentPage + 1
                );
                setPdfDetails((prev) => {
                  return pdfDetails.currentPage + 1 > prev.maxPages
                    ? { ...prev, currentPage: 1 }
                    : { ...prev, currentPage: prev.currentPage + 1 };
                });
              }}
            >
              <NavigateNextRoundedIcon
                fontSize="large"
                sx={{
                  color: "#74DFAC",
                  // ["@media (min-width:1180px)"]: {
                  //   width: "2em",
                  //   height: "2em",
                  // },
                }}
              />
            </button>
          </div>
        </div>

        <PagesThumbnails
          pages={pages}
          currentPage={pdfDetails.currentPage}
          setPdfDetails={setPdfDetails}
          setSwiper={setSwiper}
        />
      </div>
    </Document>
  );
};

export default PDFviewer;
