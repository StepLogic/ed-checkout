import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { theme } from "./assets/theme/theme";
import "./index.css";

import { LinearProgress, ThemeProvider } from "@mui/material";
import AuthProvider from "@context/AuthProvider";

// const StartForm = React.lazy(() => import("@pages/StartForm"));
// const Rejection = React.lazy(() => import("@pages/Rejection"));

// import Index from "./pages/checkout-session-new/Index";

import LayoutPage from "./pages/LayoutPage";
import ExistingSubscriber from "./pages/existing-subscriber/";
import NewSubscriber from "./pages/new-subscriber/index.jsx";

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
                    path="existing-subscriber/:productTk/:userTk"
                    element={<ExistingSubscriber />}
                  /><Route
                    path="new-subscriber/:productTk/:userTk"
                    element={<NewSubscriber />}
                  />
              {/* <Route path="new/notification" element={<Index />} /> */}

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
