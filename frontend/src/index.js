import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./context/categoryContext";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
