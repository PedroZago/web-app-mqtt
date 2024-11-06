import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Layout from "./pages/Layout";
import UnauthorizedPage from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { UserRole } from "./enums/user-role.enum";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import PublicRoute from "./components/PublicRoute";
import AnimalsPage from "./pages/Animal";
import SpeciesPage from "./pages/Specie";
import MissingPage from "./pages/Missing";
import DevicesPage from "./pages/Device";
import NotificationsPage from "./pages/Notification";
import TelemetriesPage from "./pages/Telemetry";
import UsersPage from "./pages/User";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUpPage />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.EDITOR]}
            />
          }
        >
          <Route path="home" element={<DashboardPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="telemetries" element={<TelemetriesPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
