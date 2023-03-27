import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { theme } from "./assets/theme/theme";
import "./index.css";

import { LinearProgress, ThemeProvider } from "@mui/material";
import AuthProvider from "@context/AuthProvider";
import CheckoutForm from "./pages/checkout-session-new/CheckoutForm";

// const StartForm = React.lazy(() => import("@pages/StartForm"));
// const Rejection = React.lazy(() => import("@pages/Rejection"));

import NotificationPage from "./pages/checkout-session-new/NotificationPage";

import LayoutPage from "./pages/LayoutPage";

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
            <Route path="/" element={<LayoutPage />}>
              <Route
                path="form-one/:productTk/:userTk"
                element={<CheckoutForm />}
              />
              <Route path="new/notification" element={<NotificationPage />} />

              {/* <Route path="start-form/:token" element={<StartForm />} />

              <Route path="payment/rejected/:token" element={<Rejection />} /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
};

export default App;
