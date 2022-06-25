import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ROUTE_DASHBOARD_ITEMS,
  ROUTE_DASHBOARD_MANAGE,
  ROUTE_DASHBOARD_PROFILE,
} from "../../constants";

const DashboardNav: React.FC = function () {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(ROUTE_DASHBOARD_PROFILE);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.match(ROUTE_DASHBOARD_PROFILE))
      return setCurrentPath("profile");
    if (pathname.match(ROUTE_DASHBOARD_ITEMS)) return setCurrentPath("items");
    if (pathname.match(ROUTE_DASHBOARD_MANAGE)) return setCurrentPath("manage");
  }, [location]);

  return (
    <section className="dashboard-nav">
      <ul className="dashboard-nav__list">
        <li
          className={`dashboard-nav__item ${
            currentPath === "profile" ? "dashboard-nav__item--current" : ""
          }`}
        >
          <Link to={ROUTE_DASHBOARD_PROFILE} className="link--wrapper">
            Profile
          </Link>
        </li>
        <li
          className={`dashboard-nav__item ${
            currentPath === "items" ? "dashboard-nav__item--current" : ""
          }`}
        >
          <Link to={ROUTE_DASHBOARD_ITEMS} className="link--wrapper">
            Items
          </Link>
        </li>
        {/* <li
          className={`dashboard-nav__item ${
            currentPath === "manage" ? "dashboard-nav__item--current" : ""
          }`}
        >
          <Link to={ROUTE_DASHBOARD_MANAGE} className="link--wrapper">
            Manage
          </Link>
        </li> */}
      </ul>
    </section>
  );
};

export default DashboardNav;
