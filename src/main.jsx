import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { TWThemeProvider } from "./provider/ThemeProvider";
import { ContextProvider } from "./provider/ContextsProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TranslationProvider from "./provider/TranslationProvider";
// import { GlobalDataProvider } from "./Context/GlobalDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TranslationProvider>
      <ContextProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        {/* <GlobalDataProvider> */}
        <TWThemeProvider>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </TWThemeProvider>
        {/* </GlobalDataProvider> */}
      </ContextProvider>
    </TranslationProvider>
  </React.StrictMode>
);
