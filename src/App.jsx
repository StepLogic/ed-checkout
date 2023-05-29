import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { theme } from "./assets/theme/theme";
import "./index.css";

import { LinearProgress, ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import LayoutPage from "./pages/common/LayoutPage.jsx";
// import ExistingSubscriber from "./pages/ExistingSubscriber.jsx";
import NewSubscriber from "./pages/NewSubscriber.jsx";
import NewUser from "./pages/NewUser.jsx";
import ExistingUser from "./pages/ExistingUser.jsx";
import ThankYou from "./pages/thank-you";
import NoPage from "./pages/NoPage.jsx";

// TODO: new-subscriber : is the one who has to pay 49.90
//       new-user : is the one who has to pay the entire amount

const queryDefaultOptions = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryDefaultOptions);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="not-found" element={<NoPage />} />
            <Route path="/" element={<LayoutPage />}>
              {/* <Route path="existing-subscriber/:productTk/:userTk" element={<ExistingSubscriber />} /> */}
              <Route path="new-subscriber/:productTk/:userTk" element={<NewSubscriber />} />
              <Route path="new-user/:productTk/" element={<NewUser />} />
              <Route path="existing-user/:productTk/:userTk" element={<ExistingUser />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
