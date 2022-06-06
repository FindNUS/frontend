import React from "react";
import { Link } from "react-router-dom";
import {
  ROUTE_DASHBOARD_ITEMS,
  ROUTE_DASHBOARD_MANAGE,
  ROUTE_DASHBOARD_PROFILE,
} from "../../constants";

const DashboardNav: React.FC = function () {
  return (
    <section className="dashboard-nav">
      <ul className="dashboard-nav__list">
        <li className="dashboard-nav__item">
          <Link to={ROUTE_DASHBOARD_PROFILE} className="link--wrapper">
            Profile
          </Link>
        </li>
        <li className="dashboard-nav__item">
          <Link to={ROUTE_DASHBOARD_ITEMS} className="link--wrapper">
            Items
          </Link>
        </li>
        <li className="dashboard-nav__item">
          <Link to={ROUTE_DASHBOARD_MANAGE} className="link--wrapper">
            Manage
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default DashboardNav;
