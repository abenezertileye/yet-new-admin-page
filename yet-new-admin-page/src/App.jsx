import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_page";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SchedulesPage from './pages/schedule';
import DriversPage from "./pages/drivers";
import HelpersPage from "./pages/helpers";
import BussesPage from "./pages/busses";
import RoutesPage from "./pages/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      <Route path="/schedules" element={<SchedulesPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/helpers" element={<HelpersPage />} />
      <Route path="/buses" element={<BussesPage />} />
      <Route path="/routes" element={<RoutesPage />} />
   </Routes>
  );
}

export default App;
