import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Daftar", href: "#cara-daftar" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(14,58,140,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <span className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-blue-900 text-lg leading-none block">
                Lumea
              </span>
              <span className="text-[10px] text-blue-400 font-medium tracking-wide">
                Sistem Pendaftaran Siswa
              </span>
            </div>
          </span>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm cursor-pointer font-medium text-blue-700 hover:text-blue-800 transition-colors"
            >
              Masuk
            </button>
            <button
              onClick={() => navigate("/registrasi")}
              className="px-5 py-2.5 cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl hover:from-blue-600 hover:to-blue-800 shadow-md shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              Daftar Sekarang
            </button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-blue-50`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3">
            <a
              onClick={() => navigate("/login")}
              className="px-4 py-2.5 text-center text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Masuk
            </a>
            <span
              onClick={() => navigate("/registrasi")}
              className="px-4 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl"
            >
              Daftar Sekarang
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
