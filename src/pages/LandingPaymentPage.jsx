import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import WhatsApp from "@mui/icons-material/WhatsApp";

import { Autoplay, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Player } from "@lottiefiles/react-lottie-player";
import video from "@assets/video.json";

import { capitalize } from "lodash";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import dayjs from "dayjs";

// IMG

import heroCheckoutLanding from "@assets/img/heroCheckoutLanding.svg";
import logoEduWhite from "@assets/img/logoEduWhite.svg";
import LaRepubblica from "@assets/img/LaRepubblica.svg";
import LaGazzettaDelMezzogiorno from "@assets/img/LaGazzettaDelMezzogiorno.svg";
import RTL from "@assets/img/RTL.svg";
import Today from "@assets/img/Today.svg";
import Forbes from "@assets/img/Forbes.svg";
import bgBottom from "@assets/img/bgBottom.svg";
import fireworks from "@assets/lottie-animations/fireworks.json";
import Expired from "./Expired";
import { CaBackground } from "@components/Icons";
// IMG

import PDFviewer from "./common/pdf/PDFviewer";

const pauseAll = async () => {
  let videosBox = document.querySelectorAll(".video-box");

  await [...videosBox].map((v) => {
    let video = v.querySelector("video");
    let img = v.querySelector("img");
    let icon = v.querySelector(".play-icon");
    if (!v.paused)
      video.pause(),
        video.classList.add("hidden"),
        img.classList.remove("hidden"),
        icon.classList.remove("hidden");
  });
};

const months = {
  0: "Gennaio",
  1: "Febbraio",
  2: "Marzo",
  3: "Aprile",
  4: "Maggio",
  5: "Giugno",
  6: "Luglio",
  7: "Agosto",
  8: "Settembre",
  9: "Ottobre",
  10: "Novembre",
  11: "Dicembre",
};

function useCountdown({ date, days }) {
  const [currentDate, setCurrentDate] = React.useState(undefined);
  const [targetDate, setTargetDate] = React.useState(dayjs());

  React.useEffect(() => {
    setCurrentDate(dayjs(new Date(date)).add(days, "day"));
    const timer = setInterval(() => setTargetDate(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remainingTime = currentDate?.diff(targetDate);
  let seconds = parseInt((remainingTime / 1000) % 60);
  let minutes = parseInt((remainingTime / 1000 / 60) % 60);
  let hours = parseInt((remainingTime / (1000 * 60 * 60)) % (24 * days));
  return { hours, minutes, seconds };
}

const Timer = ({ date, days }) => {
  const { hours, minutes, seconds } = useCountdown({ days: days, date: date });
  // {} h{" "}
  // {} min{" "}
  // {} sec
  const ItemBox = ({ value, label }) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "64px 26px",
        width: "90px",
        ["@media (min-width:1180px)"]: {
          gridTemplateRows: "94px 36px",
          width: "118px",
        },

        "& div": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "9px 9px 0px 0px",
          background: "#FFFFFF;",
          color: "#8065C9",
          fontWeight: "600",
          fontSize: "42px",
          ["@media (min-width:1180px)"]: {
            fontSize: "64px",
          },
        }}
      >
        {value}
      </Box>
      <Box
        sx={{
          textTransform: "uppercase",
          borderRadius: "0px 0px 9px 9px",
          background: "#8065C9",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          ["@media (min-width:1180px)"]: {
            fontSize: "16px",
          },
        }}
      >
        {label}
      </Box>
    </Box>
  );
  return (
    <Box className="flex flex-row items-center gap-4 lg:gap-[25px] w-full justify-center">
      <ItemBox value={hours < 10 ? "0" + hours : hours} label={"hours"} />
      <ItemBox value={minutes < 10 ? "0" + minutes : minutes} label="minutes" />
      <ItemBox value={seconds < 10 ? "0" + seconds : seconds} label="seconds" />
    </Box>
  );
};

const InformationBox = ({ children, prompt, index, indexText }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#2D224C",
        borderRadius: "9px",
        pb: "2vh",
        position: "relative",
        height: "379px",
        ["@media (min-width:1180px)"]: {
          height: "560px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          gap: "min(1rem,2vw)",
          alignItems: "center",
          backgroundColor: "#8065C9",
          position: "relative",
          top: "0px",
          zIndex: "4",
          height: "123px",
          ["@media (max-width:1180px)"]: {
            height: "80px",
            px: "min(2.5vw,1rem)",
          },
          borderRadius: "9px 9px 0px 0px",
          px: "min(4vw,3.5rem)",
        }}
      >
        <Box
          sx={{
            ["@media (max-width:1180px)"]: {
              minWidth: "calc(39px + 0.05vw)",
              width: "calc(39px + 0.05vw)",
              maxWidth: "calc(39px + 0.05vw)",
              height: "calc(39px + 0.05vw)",
              fontSize: "calc(19px + 0.05vw)",
            },
          }}
          className="lg:w-[51px] lg:min-w-[51px] lg:max-w-[51px] lg:h-[51px] lg:text-[32px] flex items-center justify-center rounded-[50%] border-[#ffffff] border-solid border-[3px] text-white"
        >
          {index}
        </Box>
        <Typography
          sx={{
            fontSize: "calc(16px + 0.4vw)",
            ["@media (min-width:1180px)"]: {
              fontSize: "max(24px,calc(20px + 0.1vw))",
            },
          }}
          className="font-semibold text-[white] text-left leading-[128%]"
        >
          {indexText}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "238px",
          ["@media (min-width:1180px)"]: {
            height: "347px",
          },
        }}
        className="relative rounded-[9px] w-full"
      >
        <CaBackground
          style={{ width: "100%" }}
          className="absolute h-full top-[-11px]"
        />

        {children}
      </Box>
      <p className="text-[18px] xl:text-[32px] leading-[120%] font-[Poppins]  text-center text-white font-regular px-[min(1vw,1rem)]">
        {prompt}
      </p>
    </Box>
  );
};
const LandingPaymentPage = ({ data, startSession }) => {
  const [carouselVideos, setCarouselVideos] = React.useState(video["Inglese"]);
  const [width] = useWindowSize();
  // const { product, user } = data;

  //
  const dateTimer = new Date(data.user.time_link_gen);
  const slidesCount =
    width < 576
      ? 1.4
      : width < 768
      ? 3
      : width < 1024
      ? 5
      : width < 1280
      ? 6
      : 7;

  const [file, setFile] = React.useState(data.product?.slides);

  const limitTime = dayjs(new Date(dateTimer)).add(data.product.timer, "day");

  const swiperRef = React.useRef();
  const onInit = (Swiper) => {
    swiperRef.current = Swiper;
  };
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  if (limitTime.diff(dayjs()) < 0) {
    return <Expired data={data.user} />;
  }

  ///MODIFICATIONS/////
  // const [price, setPrice] = React.useState(null);
  const steps = [
    <>
      Blocca il posto oggi <br />
      ed inizia quando vuoi
    </>,
    <>
      Inizierai a pagare il saldo <br className="xl:hidden" />
      prima dell’inizio del corso
    </>,
  ];

  const priceItemStyle = {
    color: "#2D224C",
    display: "grid",
    gap: "3px",
    gridTemplateColumns: "8fr 0.5fr 5fr",
    ["@media (min-width:763px)"]: {
      gridTemplateColumns: "6fr 0.5fr 5fr",
    },
    ["@media (max-width:600px)"]: {
      gridTemplateColumns: "4fr 0.5fr 3fr",
    },
    width: "100%",
    my: 1,
    "& p": {
      lineHeight: "100%",
      fontSize: "34px!important",
      fontWeight: "400",
      textAlign: "end",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "end",
      ["@media (max-width:1280px)"]: {
        fontSize: "29px!important",
      },
      ["@media (max-width:1180px)"]: {
        fontSize: "19px!important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "17px!important",
      },
      ["@media (max-width:350px)"]: {
        fontSize: "calc(23px - 2.5vw)!important",
      },
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(10.5px + 0.175vw)",
      },
    },
    "& b": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontWeight: "600",
      justifyContent: "start",
      textAlign: "start",
      fontSize: "34px!important",
      lineHeight: "100%",
      ["@media (max-width:1280px)"]: {
        fontSize: "29px!important",
      },

      ["@media (max-width:1180px)"]: {
        fontSize: "19px!important",
      },
      ["@media (max-width:600px)"]: {
        fontSize: "17px!important",
      },
      ["@media (max-width:350px)"]: {
        fontSize: "calc(23px - 2.5vw)!important",
      },
      ["@media (max-width:1180px) and (min-width:763px)"]: {
        fontSize: "calc(10.5px + 0.175vw)",
      },
      "& em": {
        fontSize: "15%",
      },
    },
  };

  // React.useEffect(() => {
  //   if (!product) return;

  //   const priceData = {
  //     no_iva: product?.discount
  //       ? product?.original_price_no_iva
  //       : product?.no_iva,
  //     iva: product?.discount ? product?.original_price_iva : product?.iva,
  //     discount: product?.discount ? product?.discount : null,
  //     price: product?.price,
  //   };

  //   const priceDataFormatted = {
  //     no_iva: {
  //       integer: Math.floor(Number(priceData.no_iva) / 100),
  //       decimal: (Number(priceData.no_iva) % 100).toString().padStart(2, "0"),
  //     },
  //     iva: {
  //       integer: Math.floor(Number(priceData.iva) / 100),
  //       decimal: (Number(priceData.iva) % 100).toString().padStart(2, "0"),
  //     },
  //     totale: {
  //       integer: Math.floor(Nu51%mber(priceData.iva + priceData.no_iva) / 100),
  //       decimal: (Number(priceData.iva + priceData.no_iva) % 100)
  //         .toString()
  //         .padStart(2, "0"),
  //     },
  //     price: {
  //       integer: Math.floor(Number(priceData.price) / 100),
  //       decimal: (Number(priceData.price) % 100).toString().padStart(2, "0"),
  //     },
  //     rimanente: {
  //       integer: Math.floor(
  //         Number(priceData.price - (priceData.iva + priceData.no_iva)) / 100
  //       ),
  //       decimal: (
  //         Number(priceData.price - (priceData.iva + priceData.no_iva)) % 100
  //       )
  //         .toString()
  //         .padStart(2, "0"),
  //     },
  //   };

  //   setPrice(priceDataFormatted);
  // }, []);
  return (
    <>
      <Box className="h-full overflow-x-hidden bg-edu-100">
        <section className="text-white ">
          <div
            className="p-5 bg-bottom bg-no-repeat bg-cover md:p-10"
            style={{ backgroundImage: `url('${heroCheckoutLanding}')` }}
          >
            <div className="flex items-center justify-between">
              <img src={logoEduWhite} alt="" />
              <div className="relative ml-auto h-fit w-fit help 3xl:text-2xl max:text-4xl">
                <a
                  className="no-underline"
                  href="https://api.whatsapp.com/send?phone=3714954651"
                  target={"_blank"}
                >
                  <span className="text-xs font-regular md:text-base">
                    Serve aiuto?
                  </span>
                  <WhatsApp className="pb-1" fontSize={"small"} />
                </a>
                <div className="absolute left-0 bg-white line bottom-1"></div>
              </div>
            </div>

            <div className="container relative flex flex-col items-center mx-auto mt-10 text-center">
              <h1 className="text-4xl font-semibold sm:text-5xl leading-[3rem]">
                Congratulazioni {capitalize(data?.user?.name)} !!
              </h1>
              <p className="px-8 py-8 text-lg">
                Hai tempo fino alle ore {limitTime?.hour()}:00 del{" "}
                {limitTime?.format("DD")} {months[limitTime.month()]} per
                bloccare il tuo posto
              </p>
              {/* <div className="flex px-8 text-lg font-semibold">Mancano</div> */}
              <Timer days={data.product.timer} date={dateTimer} />
              <div className="relative flex flex-wrap justify-center py-8">
                <Player
                  src={fireworks}
                  className="absolute -translate-x-1/2 pointer-events-none -translate-y-3/4 top-1/2 player left-1/2"
                  autoplay
                  speed={0.6}
                  style={{ height: "650px", width: "650px" }}
                />
                <Button
                  variant="contained"
                  size="large"
                  color="button"
                  onClick={() => startSession(true)}
                >
                  blocca il tuo posto
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <p className="my-[min(4rem,15vh)]  font-semibold leading-none text-2xl lg:text-[44px] 3xl:text-4xl max:text-6xl text-edu-900">
            Ecco gli step prima <br className="lg:hidden" /> di iniziare il
            corso
          </p>
          {/* desktop View */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",

              ["@media (max-width:763px)"]: {
                gridTemplateColumns: "1fr",
              },
            }}
            className="gap-y-4 relative gap-x-[min(3.5rem,5vw)] w-full px-[min(2rem,4vw)] items-center mx-auto max-w-[1500px]"
          >
            <InformationBox
              index={1}
              indexText={steps[0]}
              prompt={`Da pagare entro \n la scadenza sopra`}
            >
              <Box
                sx={{
                  position: "relative",
                  padding: "2vh min(2vw,1.5rem) 0 min(2vw,1.5rem)",
                  zIndex: 6,
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ["@media (min-width:1180px)"]: {
                    height: "291px",
                  },
                }}
              >
                <Typography
                  component={"b"}
                  color={"secondary"}
                  className="!font-semibold text-center xl:text-[96px] text-[64px]"
                >
                  €49,90
                </Typography>
              </Box>
            </InformationBox>
            <InformationBox
              index={2}
              indexText={steps[1]}
              prompt={`Pagabile in 3 rate da \n €177,72 con KLARNA`}
            >
              <Box
                sx={{
                  position: "relative",
                  padding: "min(6vh,46px) 1vw min(6vh,46px) min(2vw,1.5rem)",
                  zIndex: 6,
                  height: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  flexDirection: "column",
                  ["@media (min-width:1180px)"]: {
                    height: "291px",
                    padding:
                      "min(6vh,46px) min(5vw,48px) min(6vh,46px) min(2vw,1.5rem)",
                  },
                  // gap: "min(4vh,2rem)",
                }}
              >
                <Box sx={priceItemStyle}>
                  <p>Prezzo percorso:</p>
                  <div />
                  <div className="flex flex-col items-start">
                    <b>€583,00</b>
                    <em className="normal font-regular not-italic">
                      (€478 + IVA)
                    </em>
                  </div>
                </Box>
                <Box sx={priceItemStyle}>
                  <p>Meno iscrizione:</p>
                  <b>-</b>
                  <b className="relative">
                    €49,90
                    <div className="w-[51%] lg:max-w-[105px]  lg:w-full absolute my-auto h-[3px] !bg-[#861313] " />
                  </b>
                </Box>

                <Box sx={priceItemStyle}>
                  <p>Rimanente:</p>
                  <div />
                  <b>€533,16</b>
                </Box>
              </Box>
            </InformationBox>
          </Box>

          <p className="mb-10 mt-14 font-semibold leading-none text-2xl lg:text-[44px] 3xl:text-4xl max:text-6xl text-edu-900">
            Ecco cosa dicono di noi
          </p>

          <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Swiper
              onInit={onInit}
              modules={[Autoplay, Lazy]}
              autoplay={{ delay: 5000 }}
              spaceBetween={25}
              slidesPerView={slidesCount}
            >
              {carouselVideos.map((video, index) => (
                <SwiperSlide key={index}>
                  <Item item={video} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Box className="py-10 md:py-18">
              <div className="flex flex-wrap items-center justify-center gap-5 px-5">
                <div className="flex items-center justify-center py-3">
                  <a
                    href="https://forbes.it/2020/01/24/come-entrare-ad-harvard-o-a-oxford-lidea-dei-cinque-ragazzi-di-edusogno/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Forbes} className="h-[30px] md:h-[70px]" alt="" />
                  </a>
                </div>
                <div className="flex items-center justify-center py-3">
                  <a
                    href="https://bari.repubblica.it/cronaca/2020/01/16/news/oxford_cambridge_o_mit_un_app_svela_come_essere_ammessi_nelle_universita_top_a_crearla_un_25enne_barese-245920685/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LaRepubblica}
                      className="h-[30px] md:h-[70px]"
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex items-center justify-center py-3">
                  <a
                    href="https://www.lagazzettadelmezzogiorno.it/news/newsweek/1221780/ledusogno-di-domenico-da-bari-al-christ-church-per-forbes-e-tra-i-numeri-1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LaGazzettaDelMezzogiorno}
                      className="h-[30px] md:h-[70px]"
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex items-center justify-center py-3">
                  <a
                    href="https://www.today.it/innovazione/startup/come-entrare-nelle-migliori-universita-del-mondo-edusogno-oxford-harward-cambridge.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Today} className="h-[30px] md:h-[70px]" alt="" />
                  </a>
                </div>
                <div className="flex items-center justify-center py-3">
                  <a
                    href="https://www.youtube.com/watch?v=cwwYyaugSso"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={RTL} className="h-[30px] md:h-[70px]" alt="" />
                  </a>
                </div>
              </div>
            </Box>
          </Box>
        </section>
      </Box>

      <section className="pt-20 text-center">
        <h1 className="py-5 font-semibold leading-none text-2xl lg:text-[44px] 3xl:text-4xl max:text-6xl text-edu-900">
          Riguarda la presentazione del percorso
        </h1>

        <Box
          className="w-full bg-white bg-top bg-no-repeat bg-cover min-h-[300px] flex flex-col items-center overflow-x-hidden"
          style={{
            backgroundImage: `url('${bgBottom}')`,
            backgroundPositionY: width < 500 ? 100 : -150,
          }}
        >
          <Box className="">
            <PDFviewer fileBase64={file} />
          </Box>

          <div className="flex flex-wrap justify-center py-8">
            <Button
              variant="contained"
              size="large"
              color="button"
              onClick={() => startSession(true)}
            >
              blocca il tuo posto
            </Button>
          </div>
        </Box>
      </section>
    </>
  );
};

function Item(props) {
  const [width] = useWindowSize();
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <div
      style={{ overflowY: "hidden" }}
      onClick={async (e) => {
        let video = e.currentTarget.querySelector("video");
        let img = e.currentTarget.querySelector("img");
        let icon = e.currentTarget.querySelector(".play-icon");

        if (video.paused) {
          await pauseAll();
          video.play();
          setIsPlaying(true);
          video.currentTime = 0;
          video.classList.remove("hidden");
          img.classList.add("hidden");
          icon.classList.add("hidden");
        } else {
          setIsPlaying(false);
          video.pause(),
            video.classList.add("hidden"),
            img.classList.remove("hidden");
        }
      }}
      className={`relative overflow-hidden video-box h-[${
        width < 640 ? "500px" : "300px"
      }] aspect-[9/16]`}
    >
      <PlayArrowRoundedIcon
        className={`absolute text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 play-icon  ${
          isPlaying ? "hidden" : null
        }`}
        sx={{ fontSize: 75 }}
      />
      <img
        className="object-cover object-center"
        src={"https://edusogno.com/video/Inglese/" + props.item.poster}
      />
      <video
        className="hidden object-cover object-center"
        playsInline
        src={"https://edusogno.com/video/Inglese/" + props.item.video}
      ></video>
    </div>
  );
}

export function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default LandingPaymentPage;
