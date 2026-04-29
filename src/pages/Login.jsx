import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { notyfSuccess, notyfError } from "../utils/notyf";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  LogIn,
  ArrowLeft,
} from "lucide-react";

const InputWrapper = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
        {Icon}
      </div>
      {children}
    </div>
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
      );
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        const role = response.data?.user?.role;
        notyfSuccess("Login berhasil! Mengalihkan...");

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin/reports/stats");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        notyfError("Gagal mendapatkan token sesi.");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Terjadi kesalahan pada server";
      notyfError(msg);
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Similar to Registration */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 opacity-90" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <GraduationCap size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter">Lumea</span>
          </Link>

          <div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Selamat Datang <br />
              <span className="text-blue-300">Kembali</span> <br />
              di Lumea.
            </h2>
            <p className="text-lg text-blue-100/80 leading-relaxed max-w-md">
              Lanjutkan perjalanan akademik Anda, akses materi pembelajaran, dan
              pantau perkembangan prestasi Anda dengan mudah.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-blue-600 bg-slate-200"
                />
              ))}
            </div>
            <span>Bergabung dengan +2,500 Pengguna Aktif</span>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center py-12 px-6 sm:px-12 lg:px-20 bg-slate-50">
        <div className="w-full max-w-lg">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm mb-12 transition-colors cursor-pointer"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Kembali ke Beranda
          </button>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Masuk Akun
            </h1>
            <p className="text-slate-500 font-medium">
              Silakan masukkan email dan password Anda untuk masuk.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 space-y-6"
          >
            <InputWrapper label="Alamat Email" icon={<Mail size={18} />}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                placeholder="nama@email.com"
                required
              />
            </InputWrapper>

            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
              <InputWrapper icon={<Lock size={18} />}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 inset-y-0 flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </InputWrapper>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Masuk ke Platform</span>
                    <LogIn size={18} />
                  </>
                )}
              </button>
            </div>

            <div className="pt-6 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Belum memiliki akun?{" "}
                <Link
                  to="/registrasi"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
