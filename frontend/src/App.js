import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";
import CategorySearch from "./components/CategorySearch/categorysearch";
import CatalogArtist from "./components/CatalogArtist/catalogartist";
import CatalogApplications from "./components/CatalogApplications/catalogapplications";
import ApplicationDetails from "./components/ApplicationDetails/ApplicationDetails";
import { CategoryProvider } from "./context/categoryContext";

let tg = window.Telegram.WebApp;
tg.expand();

function App() {
  return (
    <CategoryProvider>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/category-artist" element={<CategorySearch />} />
        <Route path="/catalog-artist" element={<CatalogArtist />} />
        <Route
          path="/catalog-applications"
          element={<CatalogApplications />}
        />
        <Route
          path="/application-details/:id"
          element={<ApplicationDetails />}
        />
      </Routes>
      <Footer />
    </CategoryProvider>
  );
}

export default App;
