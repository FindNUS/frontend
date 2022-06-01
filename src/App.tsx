import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import ComponentsView from "./pages/ComponentsView";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import { useAppSelector } from "./hooks";
import { selectAuthIsLoggedIn } from "./features/auth/authSlice";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    document.title = "FindNUS";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/components" element={<ComponentsView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
