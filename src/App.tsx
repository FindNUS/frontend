import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./app/App.scss";
import Home from "./pages/Home";
import ComponentsView from "./pages/ComponentsView";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import { useAppSelector } from "./hooks";
import { selectAuthIsLoggedIn } from "./features/auth/authSlice";
import Dashboard from "./pages/Dashboard";
import {
  ROUTE_COMPONENTS,
  ROUTE_DASHBOARD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SEARCH,
  ROUTE_SUBMIT_ITEM,
  ROUTE_SUBMIT_ITEM_FORM,
  ROUTE_SUBMIT_ITEM_INNER_FORM,
  ROUTE_SUBMIT_ITEM_INNER_POST,
  ROUTE_VIEW_ITEM,
} from "./constants";
import SubmitItemPage from "./pages/SubmitItemPage";
import ItemSubmissionPost from "./features/item_submission/ItemSubmissionPost";
import ItemSubmissionForm from "./features/item_submission/ItemSubmissionForm";
import ViewPage from "./pages/ViewPage";

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
        {isLoggedIn && <Route path={ROUTE_DASHBOARD} element={<Dashboard />} />}
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
            path="*"
            element={<Navigate to={ROUTE_SUBMIT_ITEM_FORM} replace />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
