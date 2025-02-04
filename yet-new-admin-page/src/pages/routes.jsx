import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import { useGetRoutesQuery, useCreateRouteMutation } from "../app/api/apiSlice";
import SideBar from "../components/sidebar";

const RoutesPage = () => {
  const {
    data: routes,
    error: routesError,
    isLoading: isLoadingRoutes,
  } = useGetRoutesQuery();

  const [createRoute] = useCreateRouteMutation();

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    route_name: "",
    routes: [], // Array to hold multiple stations
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStationChange = (index, value) => {
    const updatedStations = [...formData.routes];
    updatedStations[index] = value;
    setFormData({ ...formData, routes: updatedStations });
  };

  const addStationField = () => {
    setFormData({ ...formData, routes: [...formData.routes, ""] });
  };

  const removeStationField = (index) => {
    const updatedStations = formData.routes.filter((_, i) => i !== index);
    setFormData({ ...formData, routes: updatedStations });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty stations
    const filteredStations = formData.routes.filter(
      (station) => station.trim() !== ""
    );
    if (filteredStations.length === 0) {
      alert("Please add at least one station.");
      return;
    }

    try {
      const routeData = { ...formData, routes: filteredStations };
      console.log(routeData)
      await createRoute(routeData).unwrap();
      alert("Route created successfully!");

      setFormData({ route_name: "", routes: [] });
      setFormVisible(false);
    } catch (err) {
      console.error("Failed to create route:", err);
    }
  };

  if (isLoadingRoutes) {
    return <div className="loading">Loading routes...</div>;
  }

  if (routesError) {
    return (
      <div className="error">Error loading routes. Please try again later.</div>
    );
  }

  return (
    <SideBar>
      <section className="routes">
        <button onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? "Hide Create Route Form" : "Create Route"}
        </button>

        {formVisible && (
          <form onSubmit={handleFormSubmit} className="create-schedule-form">
            <div>
              <label>Route Name:</label>
              <input
                type="text"
                name="route_name"
                value={formData.route_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div>
              <label>routes:</label>
              {formData.routes.map((station, index) => (
                <div
                  key={index}
                  className="station-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "200px", // Optional: Adds spacing between input and button
                  }}
                >
                  <input
                    type="text"
                    value={station}
                    onChange={(e) => handleStationChange(index, e.target.value)}
                    required
                    style={{ flex: 1 }} // Optional: Ensures the input takes available space
                  />
                  <button
                    type="button"
                    style={{
                      color: "black",
                      backgroundColor: "pink",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => removeStationField(index)}
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                style={{
                  color: "black",
                  backgroundColor: "lightgreen",
                  width: "150px",
                }}
                onClick={addStationField}
              >
                Add Station
              </button>
            </div>
            <br />

            <button type="submit">Create Route</button>
          </form>
        )}

        <h3>Routes</h3>
        <ul>
          {routes?.data &&
            routes.data.map((route) => (
              <li key={route._id}>
                <p>Route Name: {route.routeName}</p>
                <p>
                  routes:{" "}
                  {Array.isArray(route.route)
                    ? route.route.join(", ")
                    : "No stations available"}
                </p>
              </li>
            ))}
        </ul>
      </section>
    </SideBar>
  );
};

export default RoutesPage;
