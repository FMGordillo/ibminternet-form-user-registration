import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root")
);

serviceWorker.register();
