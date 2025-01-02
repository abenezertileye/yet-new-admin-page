import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import {
  useGetSchedulesQuery,
  useGetDriversQuery,
  useGetHelpersQuery,
  useGetBusesQuery,
  useGetRoutesQuery,
  useCreateHelperMutation,
} from "../app/api/apiSlice";
import SideBar from "../components/SideBar";
const HelpersPage = () => {
  const {
    data: helpers,
    error: helpersError,
    isLoading: isLoadingHelpers,
  } = useGetHelpersQuery();
  const [createHelper, { isLoading: isCreating }] = useCreateHelperMutation();

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
      await createHelper(formData).unwrap();
      alert("Helper created successfully!");
      setFormData({ first_name: "", last_name: "", email: "", password: "" });
      setFormVisible(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Failed to create helper:", error);
      alert("Error creating helper. Please try again.");
    }
  };

  return (
    <SideBar>
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="toggle-form-button"
      >
        {isFormVisible ? "Cancel" : "Create Helper"}
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
        <h3>Helpers</h3>
        <ul>
          {helpers?.data &&
            helpers.data.map((helper) => (
              <li key={helper._id}>
                <p>FName: {helper.first_name}</p>
                <p>LName: {helper.last_name}</p>
                <p>Email: {helper.email}</p>
              </li>
            ))}
        </ul>
      </section>
    </SideBar>
  );
};

export default HelpersPage;
