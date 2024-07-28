import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";
import CategorySearch from "./components/CategorySearch/categorysearch";
import CatalogArtist from "./components/CatalogArtist/catalogartist";
import CatalogApplications from "./components/CatalogApplications/catalogapplications";
import ApplicationDetails from "./components/ApplicationDetails/ApplicationDetails";

let tg = window.Telegram.WebApp;
tg.expand();

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/category-artist" element={<CategorySearch />} />
        <Route path="/catalog-artist" element={<CatalogArtist />} />
        <Route path="/catalog-applications" element={<CatalogApplications />} />
        <Route path="/application-details/:id" element={<ApplicationDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
