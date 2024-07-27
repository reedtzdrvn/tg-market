import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";
import CategorySearch from "./components/CategorySearch/categorysearch";
import CatalogArtist from "./components/CatalogArtist/catalogartist";
import CatalogApplications from "./components/CatalogApplications/catalogapplications";

let tg = window.Telegram.WebApp;
tg.expand();

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/categoryartist" element={<CategorySearch />} />
        <Route path="/catalogartist" element={<CatalogArtist />} />
        <Route path="/catalog-applications" element={<CatalogApplications />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
