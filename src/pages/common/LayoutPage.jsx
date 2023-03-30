import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useMyContext.jsx";
import { useEffect } from "react";
const LayoutPage = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Box
        component={"section"}
        sx={{
          height: "fit-content",
          overflow: "hidden",
          ["@media (min-width:1180px)"]: {
            height: "calc(var(--vh, 1vh) * 100)",
          },
        }}
        className="w-full  text-white bg-edu-900"
      >
        <Box
          sx={{
            display: ["grid"],
            gridTemplateColumns: ["1fr"],
            ["@media (min-width:763px)"]: {
              gridTemplateColumns: ["4fr 7fr"],
            },
            height: "fit-content",
          }}
          className=""
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default LayoutPage;
