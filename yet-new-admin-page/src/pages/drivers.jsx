import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import {
  useGetDriversQuery,
  useCreateDriverMutation,
} from "../app/api/apiSlice";
import SideBar from "../components/SideBar";

const DriversPage = () => {
  const {
    data: drivers,
    error: driversError,
    isLoading: isLoadingDrivers,
  } = useGetDriversQuery();
  const [createDriver, { isLoading: isCreating }] = useCreateDriverMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [isFormVisible, setFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDriver(formData).unwrap();
      alert("Driver created successfully!");
      setFormData({ first_name: "", last_name: "", email: "", password: "" });
      setFormVisible(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Failed to create driver:", error);
      alert("Error creating driver. Please try again.");
    }
  };

  return (
    <SideBar>
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="toggle-form-button"
      >
        {isFormVisible ? "Cancel" : "Create Driver"}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="driver-form">
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Submit"}
          </button>
        </form>
      )}
      <section className="routes">
        <h3>Drivers</h3>
        {isLoadingDrivers ? (
          <p>Loading drivers...</p>
        ) : driversError ? (
          <p>Error loading drivers.</p>
        ) : (
          <ul>
            {drivers?.data &&
              drivers.data.map((driver) => (
                <li key={driver._id}>
                  <p>FName: {driver.first_name}</p>
                  <p>LName: {driver.last_name}</p>
                  <p>Email: {driver.email}</p>
                </li>
              ))}
          </ul>
        )}
      </section>
    </SideBar>
  );
};

export default DriversPage;
