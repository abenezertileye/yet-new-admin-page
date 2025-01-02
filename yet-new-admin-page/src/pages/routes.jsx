import React from "react";
import "../styles/AdminDashboard.css";
import {
  useGetSchedulesQuery,
  useGetDriversQuery,
  useGetHelpersQuery,
  useGetBusesQuery,
  useGetRoutesQuery,
} from "../app/api/apiSlice";
import SideBar from "../components/sidebar";
const RoutesPage = () => {
  const {
    data: routes,
    error: routesError,
    isLoading: isLoadingRoutes,
  } = useGetRoutesQuery();

  return (
    <SideBar>
      <section className="routes">
        <h3>Routes</h3>
        <ul>
          {routes?.data &&
            routes.data.map((route) => (
              <li key={route._id}>
                <p>Route Name: {route.routeName}</p>
                <p>Start Location: {route.route}</p>
              </li>
            ))}
        </ul>
      </section>
    </SideBar>
  );
};

export default RoutesPage;
