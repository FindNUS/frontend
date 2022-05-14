import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import ComponentsView from "./pages/ComponentsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
