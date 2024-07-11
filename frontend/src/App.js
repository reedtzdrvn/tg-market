import React from "react";
import { Routes, Route } from "react-router-dom";

let tg = window.Telegram.WebApp;
tg.expand();

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/*" element={<div>Лол</div>} />
      </Routes>
    </div>
  );
}

export default App;
