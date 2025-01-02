import React from "react";
import "../styles/AdminDashboard.css";
import { useGetSchedulesQuery, useGetDriversQuery, useGetHelpersQuery, useGetBusesQuery, useGetRoutesQuery } from "../app/api/apiSlice";

const AdminDashboardPage = () => {
  // Using the hooks to fetch data
  const { data: schedules, error: schedulesError, isLoading: isLoadingSchedules } = useGetSchedulesQuery();
  const { data: drivers, error: driversError, isLoading: isLoadingDrivers } = useGetDriversQuery();
  const { data: helpers, error: helpersError, isLoading: isLoadingHelpers } = useGetHelpersQuery();
  const { data: buses, error: busesError, isLoading: isLoadingBuses } = useGetBusesQuery();
  const { data: routes, error: routesError, isLoading: isLoadingRoutes } = useGetRoutesQuery();

  // Render loading state
  if (isLoadingSchedules || isLoadingDrivers || isLoadingHelpers || isLoadingBuses || isLoadingRoutes) {
    return <div className="loading">Loading...</div>;
  }

  // Handle errors
  if (schedulesError || driversError || helpersError || busesError || routesError) {
    return <div className="error">Error loading data. Please try again later.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Displaying schedules */}
      <section className="schedules">
        <h3>Schedules</h3>
        <ul>
          {schedules?.data && schedules.data.map((schedule) => (
            <li key={schedule._id}>
              <p>Schedule Name: {schedule.schedule_name}</p>
              <p>Date: {new Date(schedule.date).toLocaleDateString()}</p> {/* Format the date */}
              <p>Laps: {schedule.laps}</p>
              <p>Expected Income: ${schedule.expected_income}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Displaying drivers */}
      <section className="drivers">
        <h3>Drivers</h3>
        <ul>
          {drivers?.data && drivers.data.map((driver) => (
            <li key={driver._id}>
              <p>FName: {driver.first_name}</p>
              <p>LName: {driver.last_name}</p>
              <p>Email: {driver.email}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Displaying helpers */}
      <section className="helpers">
        <h3>Helpers</h3>
        <ul>
          {helpers?.data && helpers.data.map((helper) => (
            <li key={helper._id}>
              <p>FName: {helper.first_name}</p>
              <p>LName: {helper.last_name}</p>
              <p>Email: {helper.email}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Displaying buses */}
      <section className="buses">
        <h3>Buses</h3>
        <ul>
          {buses?.data && buses.data.map((bus) => (
            <li key={bus._id}>
              <p>Bus Number: {bus.name}</p>
              <p>Plate Number: {bus.plateNumber}</p>
              <p>State: {bus.state}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Displaying routes */}
      <section className="routes">
        <h3>Routes</h3>
        <ul>
          {routes?.data && routes.data.map((route) => (
            <li key={route._id}>
              <p>Route Name: {route.routeName}</p>
              <p>Start Location: {route.route}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
