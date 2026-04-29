import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ProtectedSiswaRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySiswa = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");

        if (response.data?.data?.role === "siswa" || !response.data?.data?.role) {
           setIsAuthenticated(true);
        } else {

           if (response.data?.data?.role === "admin") {
              console.warn("Admin trying to access siswa route.");
           }
           setIsAuthenticated(true);

        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySiswa();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50">
        <div className="relative flex justify-center items-center">
            <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-100"></div>
            <div className="relative w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        </div>
        <p className="mt-6 text-slate-500 text-sm font-semibold tracking-widest uppercase animate-pulse">
          Memuat Data...
        </p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedSiswaRoute;
