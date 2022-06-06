import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { selectAuthIsLoggedIn } from "./features/auth/authSlice";
import {
  ROUTE_COMPONENTS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_HOME,
  ROUTE_DASHBOARD_INNER_ITEMS,
  ROUTE_DASHBOARD_INNER_MANAGE,
  ROUTE_DASHBOARD_INNER_PROFILE,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SEARCH,
  ROUTE_SUBMIT_ITEM,
} from "./constants";

// Components
import Home from "./pages/Home";
import ComponentsView from "./pages/ComponentsView";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardItems from "./pages/dashboard/DashboardItems";
import DashboardManage from "./pages/dashboard/DashboardManage";
import SubmitItemPage from "./pages/SubmitItemPage";
import "./app/App.scss";

function App() {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    document.title = "FindNUS";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        {!isLoggedIn && <Route path={ROUTE_LOGIN} element={<Login />} />}
        {isLoggedIn && (
          <Route path={ROUTE_DASHBOARD} element={<Dashboard />}>
            <Route
              path={ROUTE_DASHBOARD_INNER_PROFILE}
              element={<DashboardProfile />}
            />
            <Route
              path={ROUTE_DASHBOARD_INNER_ITEMS}
              element={<DashboardItems />}
            />
            <Route
              path={ROUTE_DASHBOARD_INNER_MANAGE}
              element={<DashboardManage />}
            />
            <Route
              path="*"
              element={<Navigate to={ROUTE_DASHBOARD_HOME} replace />}
            />
          </Route>
        )}
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
        <Route path={ROUTE_COMPONENTS} element={<ComponentsView />} />
        <Route path={ROUTE_SUBMIT_ITEM} element={<SubmitItemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
