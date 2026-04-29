import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Menu,
  ChevronLeft,
  RocketIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("adminSidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("adminSidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(sidebarRef.current, {
        width: isCollapsed ? 80 : 256,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(mainRef.current, {
        marginLeft: isCollapsed ? 80 : 256,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(".chevron-icon", {
        rotation: isCollapsed ? 180 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      if (isCollapsed) {
        gsap.to(".nav-label, .logo-text", {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(".nav-label, .logo-text", { display: "none" });
          },
        });
      } else {
        gsap.set(".nav-label", { display: "block" });
        gsap.set(".logo-text", { display: "inline" });
        gsap.to(".nav-label, .logo-text", {
          opacity: 1,
          duration: 0.3,
          delay: 0.2,
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(sidebarRef.current, { width: 256 });
      gsap.set(mainRef.current, { marginLeft: 0 });
      gsap.set(".nav-label", { display: "block", opacity: 1 });
      gsap.set(".logo-text", { display: "inline", opacity: 1 });
    });

    return () => mm.revert();
  }, [isCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/reports/stats",
      icon: <LayoutDashboard size={20} className="min-w-[20px]" />,
    },
    {
      name: "Programs",
      path: "/admin/programs",
      icon: <BookOpen size={20} className="min-w-[20px]" />,
    },
    {
      name: "Enrollment",
      path: "/admin/pendaftar",
      icon: <Users size={20} className="min-w-[20px]" />,
    },
  ];

  return (
    <div className="flex bg-slate-50 font-sans min-h-screen overflow-hidden">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 flex flex-col transform transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 font-bold text-xl text-white tracking-wider border-b border-slate-800 shrink-0 whitespace-nowrap overflow-hidden">
          <span className="text-blue-500 mr-2">
            <RocketIcon size={28} className="ms-1 min-w-[30px]" />
          </span>
          <span className="logo-text">Lumea</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                    : "hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              <span className="nav-label">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center justify-center">
              <LogOut size={20} className="min-w-[20px]" />
            </div>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <main ref={mainRef} className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button
              className="hidden md:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft size={24} className="chevron-icon" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              A
            </div>
            <span className="text-sm font-medium text-slate-600 hidden sm:block">
              Administrator
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
