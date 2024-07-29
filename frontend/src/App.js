import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";
import CategorySearch from "./components/CategorySearch/categorysearch";
import CatalogArtist from "./components/CatalogArtist/catalogartist";
import CatalogApplications from "./components/CatalogApplications/catalogapplications";
import ApplicationDetails from "./components/ApplicationDetails/ApplicationDetails";
import { useUser } from "./context/userContext";

let tg = window.Telegram.WebApp;
tg.expand();

let userId = "";

if (!tg.initDataUnsafe.user) {
  userId = "703999322";
} else {
  userId = tg.initDataUnsafe.user?.id;
}

function App() {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <Header />
      <Routes>
        {user?.role === 'artist' ? <Route exact path="/" element={< CatalogApplications/>} /> : user?.role === 'customer' ? <Route exact path="/" element={<CategorySearch />} /> : <Route exact path="/" element={<Main />} />} 
        <Route path="/category-artist" element={<CategorySearch />} />
        <Route path="/catalog-artist" element={<CatalogArtist />} />
        <Route path="/catalog-applications" element={<CatalogApplications />} />
        <Route
          path="/application-details/:id"
          element={<ApplicationDetails />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
