import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "babel-polyfill";

import { store } from "./helpers";
import { App } from "./App";
import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
