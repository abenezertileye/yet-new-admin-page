import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ children }) => {
  return (
    <div className="admin-layout">
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/schedules">Schedules</NavLink>
          </li>
          <li>
            <NavLink to="/drivers">Drivers</NavLink>
          </li>
          <li>
            <NavLink to="/helpers">Helpers</NavLink>
          </li>
          <li>
            <NavLink to="/buses">Buses</NavLink>
          </li>
          <li>
            <NavLink to="/routes">Routes</NavLink>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
