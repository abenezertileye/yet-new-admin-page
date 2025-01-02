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
const BussesPage = () => {
  const {
    data: buses,
    error: busesError,
    isLoading: isLoadingBuses,
  } = useGetBusesQuery();

  return (
    <SideBar>
      <section className="routes">
        <h3>Buses</h3>
        <ul>
          {buses?.data &&
            buses.data.map((bus) => (
              <li key={bus._id}>
                <p>Bus Number: {bus.name}</p>
                <p>Plate Number: {bus.plateNumber}</p>
                <p>State: {bus.state}</p>
              </li>
            ))}
        </ul>
      </section>
    </SideBar>
  );
};

export default BussesPage;
