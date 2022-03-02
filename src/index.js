// IE11 対応
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "index.css";
import reportWebVitals from "reportWebVitals";
import { GlobalContextProvider } from "context";
import App from "apps/App/App";
import Flaskr from "apps/flaskr/route";
import QrcodeReader from "apps/qrcodeReader";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/flaskr/*" element={<Flaskr />} />
          <Route path="/qrr/*" element={<QrcodeReader />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
