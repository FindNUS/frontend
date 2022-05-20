import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "../pages/Home";
import ComponentsView from "../pages/ComponentsView";
import Login from "../pages/Login";

function App() {
  useEffect(() => {
    document.title = "FindNUS";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/components" element={<ComponentsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
