import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Registrasi from "./pages/Registrasi";
import Login from "./pages/Login";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardStats from "./pages/admin/DashboardStats";
import ProgramManagement from "./pages/admin/ProgramManagement";
import EnrollmentVerification from "./pages/admin/EnrollmentVerification";

import ProtectedSiswaRoute from "./components/siswa/ProtectedSiswaRoute";
import SiswaLayout from "./components/siswa/SiswaLayout";
import SiswaDashboard from "./pages/siswa/SiswaDashboard";
import ProgramDiscovery from "./pages/siswa/ProgramDiscovery";
import EnrollmentForm from "./pages/siswa/EnrollmentForm";
import MyEnrollments from "./pages/siswa/MyEnrollments";
import NotFoundLumea from "./pages/NotFoundLumea";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="reports/stats" element={<DashboardStats />} />
            <Route path="programs" element={<ProgramManagement />} />
            <Route path="pendaftar" element={<EnrollmentVerification />} />
          </Route>
        </Route>

        {/* Siswa Routes */}
        <Route path="/" element={<ProtectedSiswaRoute />}>
          <Route element={<SiswaLayout />}>
            <Route path="dashboard" element={<SiswaDashboard />} />
            <Route path="programs" element={<ProgramDiscovery />} />
            <Route path="apply/:id" element={<EnrollmentForm />} />
            <Route path="my-enrollments" element={<MyEnrollments />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundLumea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
