import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  LogOut,
  Menu,
  X,
  RocketIcon,
} from "lucide-react";

const SiswaLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Program Studi", path: "/programs", icon: <BookOpen size={18} /> },
    {
      name: "Pendaftaran Saya",
      path: "/my-enrollments",
      icon: <GraduationCap size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {}
              <div className="flex-shrink-0 flex items-center gap-2 font-bold text-xl tracking-wider text-slate-800">
                <RocketIcon size={24} className="text-blue-600" />
                <span>
                  Lu<span className="text-blue-600">mea</span>
                </span>
              </div>

              {}
              <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex items-center gap-3 mr-4 border-r border-slate-200 pr-4">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-800">
                    Siswa Area
                  </span>
                  <span className="text-xs text-slate-500">
                    Portal Pendaftaran
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  S
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {}
        <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1 px-4 border-t border-slate-100">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 mt-4 cursor-pointer"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SiswaLayout;
