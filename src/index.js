import React from "react";
import { render } from "react-dom";
import App from "./app.js";
import StoreProvider from "./store.js";

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("app")
);
