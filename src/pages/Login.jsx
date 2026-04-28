import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { notyfSuccess, notyfError } from "../utils/notyf";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-10 lg:px-20 xl:px-24 bg-gray-50 overflow-y-auto">
        <div className="mx-auto w-full max-w-xl">
          <div className="text-center lg:text-left mb-10">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors mb-6 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali ke Beranda
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Masuk ke Lumea
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Selamat datang kembali! Masukkan data Anda untuk melanjutkan.
            </p>
          </div>

          <form
            className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                placeholder="Masukkan email anda.."
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-brand-600 hover:text-brand-500 transition-colors"
                >
                  Lupa password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center cursor-pointer gap-2 py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Belum memiliki akun?{" "}
                <a
                  href="/registrasi"
                  className="font-semibold text-brand-600 hover:text-brand-500 transition-colors"
                >
                  Daftar di sini
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900">
        <div className="absolute inset-0 bg-brand-900/30 z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/background.jpg"
          alt="Siswa belajar"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent flex flex-col justify-end p-12 xl:p-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Selamat Datang <br />
            Kembali!
          </h2>
          <p className="text-xl text-brand-100 max-w-lg">
            Lanjutkan perjalanan belajar Anda dan raih prestasi terbaik
            bersama Lumea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
