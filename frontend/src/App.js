import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";

let tg = window.Telegram.WebApp;
tg.expand();

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
