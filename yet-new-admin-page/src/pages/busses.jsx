import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import { useGetBusesQuery, useCreateBusMutation } from "../app/api/apiSlice";
import SideBar from "../components/sidebar";

const BussesPage = () => {
  const [createBus] = useCreateBusMutation();
  const [formData, setFormData] = useState({
    bus_number: "",
    plate_number: "",
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const {
    data: buses,
    error: busesError,
    isLoading: isLoadingBuses,
  } = useGetBusesQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createBus(formData).unwrap();
      alert("Bus created successfully!");
      setFormData({ bus_number: "", plate_number: "" });
      setFormVisible(false);
    } catch (error) {
      console.error("Failed to create bus:", error);
      alert("Error creating bus. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoadingBuses) return <p>Loading buses...</p>;
  if (busesError) return <p>Error fetching buses: {busesError.message}</p>;

  return (
    <SideBar>
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="toggle-form-button"
      >
        {isFormVisible ? "Cancel" : "Create Bus"}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bus-form">
          <div>
            <label htmlFor="bus_number">Bus Number:</label>
            <input
              type="text"
              id="bus_number"
              name="bus_number"
              value={formData.bus_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="plate_number">Plate Number:</label>
            <input
              type="text"
              id="plate_number"
              name="plate_number"
              value={formData.plate_number}
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
        <h3>Buses</h3>
        <ul>
          {buses?.data &&
            buses.data.map((bus) => (
              <li key={bus._id}>
                <p>Bus Number: {bus.busNumber}</p>
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
