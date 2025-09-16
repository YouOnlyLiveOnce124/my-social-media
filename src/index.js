import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import mainStore from "./reducer/reduxStore";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={mainStore}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
