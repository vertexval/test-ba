import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import isMobile from 'is-mobile';

import "./index.css";
import App from "./App";
import store from "./store/store";

document.body.classList.add(isMobile()?'mobile':'desktop')

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
