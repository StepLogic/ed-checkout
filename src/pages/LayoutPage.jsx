import React from "react";

import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useMyContext";
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
      <Outlet />
    </>
  );
};

export default LayoutPage;
