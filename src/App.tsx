import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { selectAuthIsLoggedIn } from "./features/auth/authSlice";
import {
  ROUTE_COMPONENTS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_HOME,
  ROUTE_DASHBOARD_INNER_ITEMS,
  // ROUTE_DASHBOARD_INNER_MANAGE,
  ROUTE_DASHBOARD_INNER_PROFILE,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SEARCH,
  ROUTE_SUBMIT_ITEM,
  ROUTE_SUBMIT_ITEM_INNER_FORM,
  ROUTE_SUBMIT_ITEM_INNER_POST,
  ROUTE_SUBMIT_ITEM_INNER_TYPE,
  ROUTE_SUBMIT_ITEM_TYPE,
  ROUTE_VIEW_ITEM,
} from "./constants";

// Components
import Home from "./pages/Home";
import ComponentsView from "./pages/ComponentsView";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import DashboardProfile from "./features/dashboard/DashboardProfile";
import DashboardItems from "./features/dashboard/DashboardItems";
// import DashboardManage from "./features/dashboard/DashboardManage";
import SubmitItemPage from "./pages/SubmitItemPage";
import ItemSubmissionPost from "./features/item_submission/ItemSubmissionPost";
import ItemSubmissionForm from "./features/item_submission/ItemSubmissionForm";
import ViewPage from "./pages/ViewPage";
import ItemSubmissionType from "./features/item_submission/ItemSubmissionType";

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
            {/* <Route
              path={ROUTE_DASHBOARD_INNER_MANAGE}
              element={<DashboardManage />}
            /> */}
            <Route
              path="*"
              element={<Navigate to={ROUTE_DASHBOARD_HOME} replace />}
            />
          </Route>
        )}
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
        <Route path={ROUTE_VIEW_ITEM} element={<ViewPage />} />
        <Route path={ROUTE_COMPONENTS} element={<ComponentsView />} />
        <Route path={ROUTE_SUBMIT_ITEM} element={<SubmitItemPage />}>
          <Route
            path={ROUTE_SUBMIT_ITEM_INNER_FORM}
            element={<ItemSubmissionForm />}
          />
          <Route
            path={ROUTE_SUBMIT_ITEM_INNER_POST}
            element={<ItemSubmissionPost />}
          />
          <Route
            path={ROUTE_SUBMIT_ITEM_INNER_TYPE}
            element={<ItemSubmissionType />}
          />
          <Route
            path="*"
            element={<Navigate to={ROUTE_SUBMIT_ITEM_TYPE} replace />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
