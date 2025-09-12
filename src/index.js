import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import mainStore from "./reducer/reduxStore";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// import { mainStore } from "./reducer/State";

// let onlyForRendering = mainStore.state;
const root = ReactDOM.createRoot(document.getElementById("root"));
// const renderTree = () => {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={mainStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
// };

// mainStore.subscribe(() => {
//   renderTree();
// });
// renderTree(mainStore.getState());
