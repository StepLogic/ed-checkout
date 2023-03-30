import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { theme } from "./assets/theme/theme";
import "./index.css";

import { LinearProgress, ThemeProvider } from "@mui/material";
import AuthProvider from "@context/AuthProvider";

// const StartForm = React.lazy(() => import("@pages/StartForm"));
// const Rejection = React.lazy(() => import("@pages/Rejection"));
// import Index from "./pages/checkout-session-new/Index";

import LayoutPage from "./pages/common/LayoutPage.jsx";
import ExistingSubscriber from "./pages/ExistingSubscriber.jsx";
import NewSubscriber from "./pages/NewSubscriber.jsx";
import NewUser from "./pages/NewUser.jsx";
import ExistingUser from "./pages/ExistingUser.jsx";
import ThankYou from "./pages/thank-you";
import NoPage from "./pages/NoPage.jsx";

const App = () => {
  return (
    <Suspense
      fallback={
        <div>
          <LinearProgress
            sx={{
              backgroundColor: "transparent",
              "& .MuiLinearProgress-bar1Indeterminate": {
                backgroundColor: "#8065C9!important",
              },
              "& .MuiLinearProgress-bar2Indeterminate": {
                backgroundColor: "#8065C9!important",
              },
            }}
          />
        </div>
      }
    >
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="not-found" element={<NoPage />} />
            <Route path="/" element={<LayoutPage />}>
              <Route
                path="existing-subscriber/:productTk/:userTk"
                element={<ExistingSubscriber />}
              />
              <Route
                path="new-subscriber/:productTk/:userTk"
                element={<NewSubscriber />}
              />
              <Route path="new-user/:productTk/:userTk" element={<NewUser />} />
              <Route
                path="existing-user/:productTk/:userTk"
                element={<ExistingUser />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
};

export default App;
