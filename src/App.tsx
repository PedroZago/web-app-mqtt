import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Layout from "./pages/Layout";
import UnauthorizedPage from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { UserRole } from "./enums/user-role.enum";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import AnimalsPage from "./pages/Animal";
import SpeciesPage from "./pages/Specie";
import MissingPage from "./pages/Missing";
import DevicesPage from "./pages/Device";
import NotificationsPage from "./pages/Notification";
import TelemetriesPage from "./pages/Telemetry";
import UsersPage from "./pages/User";
import BreedPage from "./pages/Breed";
import PerfilPage from "./pages/Perfil";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes */}
        <Route
          element={
            <RequireAuth allowedRoles={[UserRole.USER, UserRole.ADMIN]} />
          }
        >
          <Route path="home" element={<DashboardPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="breeds" element={<BreedPage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="telemetries" element={<TelemetriesPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[UserRole.ADMIN]} />}>
          <Route path="users" element={<UsersPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
