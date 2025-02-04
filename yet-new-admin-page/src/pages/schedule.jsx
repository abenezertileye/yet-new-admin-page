import React, { useState } from "react";
import {
  useGetSchedulesQuery,
  useCreateScheduleMutation,
  useGetDriversQuery,
  useGetHelpersQuery,
  useGetBusesQuery,
  useGetRoutesQuery,
} from "../app/api/apiSlice";
import SideBar from "../components/SideBar";

const SchedulesPage = () => {
  const { data: schedules, error, isScheduleLoading } = useGetSchedulesQuery();
  const { data: drivers } = useGetDriversQuery();
  const { data: helpers } = useGetHelpersQuery();
  const { data: buses } = useGetBusesQuery();
  const { data: routes } = useGetRoutesQuery();
  const [createSchedule] = useCreateScheduleMutation();

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    schedule_name: "",
    driverId: "",
    helperId: "",
    routeId: "",
    busId: "",
    laps: "",
    expected_income: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSchedule(formData).unwrap();
      alert("Schedule created successfully!");

      setFormData({
        schedule_name: "",
        driverId: "",
        helperId: "",
        routeId: "",
        busId: "",
        laps: "",
        expected_income: "",
      });
      setFormVisible(false);
    } catch (err) {
      console.error("Failed to create schedule:", err);
    }
  };

  if (isScheduleLoading) {
    return <div className="loading">Loading schedules...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error loading schedules. Please try again later.
      </div>
    );
  }

  return (
    <SideBar>
      <section className="schedules">
        <button onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? "Hide Create Schedule Form" : "Create Schedule"}
        </button>
        <h3>Schedules</h3>

        {formVisible && (
          <form onSubmit={handleFormSubmit} className="create-schedule-form">
            <div>
              <label>Schedule Name:</label>
              <input
                type="text"
                name="schedule_name"
                value={formData.schedule_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Driver:</label>
              <select
                name="driverId"
                value={formData.driverId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Driver</option>
                {drivers?.data.map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.first_name} {driver.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Helper:</label>
              <select
                name="helperId"
                value={formData.helperId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Helper</option>
                {helpers?.data.map((helper) => (
                  <option key={helper._id} value={helper._id}>
                    {helper.first_name} {helper.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Bus:</label>
              <select
                name="busId"
                value={formData.busId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Bus</option>
                {buses?.data.map((bus) => (
                  <option key={bus._id} value={bus._id}>
                    {bus.name} ({bus.plateNumber})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Route:</label>
              <select
                name="routeId"
                value={formData.routeId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Route</option>
                {routes?.data.map((route) => (
                  <option key={route._id} value={route._id}>
                    {route.routeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Laps:</label>
              <input
                type="number"
                name="laps"
                value={formData.laps}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Expected Income:</label>
              <input
                type="number"
                name="expected_income"
                value={formData.expected_income}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Create Schedule</button>
          </form>
        )}

        <ul>
          {schedules?.data &&
            schedules.data.map((schedule) => (
              <li key={schedule._id}>
                <p>Schedule Name: {schedule.schedule_name}</p>
                <p>Date: {new Date(schedule.date).toLocaleDateString()}</p>
                <p>Laps: {schedule.laps}</p>
                <p>Expected Income: ${schedule.expected_income}</p>
              </li>
            ))}
        </ul>
      </section>
    </SideBar>
  );
};

export default SchedulesPage;
