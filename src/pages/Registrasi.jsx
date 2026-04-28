import React, { useState, useEffect, createRef } from "react";
import { notyfError, notyfSuccess } from "../utils/notyf";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Registrasi = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nama_lengkap: "",
    nisn: "",
    telepon: "",
    alamat: "",
    provinsi_id: "",
    kota_id: "",
    kecamatan_id: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Error fetching provinces:", err));
  }, []);

  useEffect(() => {
    if (formData.provinsi_id) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${formData.provinsi_id}.json`,
      )
        .then((res) => res.json())
        .then((data) => setRegencies(data))
        .catch((err) => console.error("Error fetching regencies:", err));

      setFormData((prev) => ({ ...prev, kota_id: "", kecamatan_id: "" }));
      setDistricts([]);
    } else {
      setRegencies([]);
      setDistricts([]);
      setFormData((prev) => ({ ...prev, kota_id: "", kecamatan_id: "" }));
    }
  }, [formData.provinsi_id]);

  useEffect(() => {
    if (formData.kota_id) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${formData.kota_id}.json`,
      )
        .then((res) => res.json())
        .then((data) => setDistricts(data))
        .catch((err) => console.error("Error fetching districts:", err));

      setFormData((prev) => ({ ...prev, kecamatan_id: "" }));
    } else {
      setDistricts([]);
      setFormData((prev) => ({ ...prev, kecamatan_id: "" }));
    }
  }, [formData.kota_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
      );
      notyfSuccess("Pendaftaran berhasil!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server";

      notyfError(errorMessage);

      console.error("Register Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900">
        <div className="absolute inset-0 bg-brand-900/30 z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/bgg.jpg"
          alt="Siswa belajar"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent flex flex-col justify-end p-12 xl:p-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Masa Depanmu <br />
            Dimulai di Sini.
          </h2>
          <p className="text-xl text-brand-100 max-w-lg">
            Bergabunglah dengan ribuan pelajar lainnya untuk mengembangkan
            potensi dan meraih prestasi terbaik bersama Lumea.
          </p>
        </div>
      </div>

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
              Buat Akun Lumea
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Lengkapi data diri Anda di bawah ini untuk memulai.
            </p>
          </div>

          <form
            className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="nama_lengkap"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama_lengkap"
                  id="nama_lengkap"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                  placeholder="Masukkan nama lengkap.."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nisn"
                  className="block text-sm font-semibold text-gray-700"
                >
                  NISN
                </label>
                <input
                  type="text"
                  name="nisn"
                  id="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                  placeholder="Masukkan NISN.."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="telepon"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Telepon
                </label>
                <input
                  type="tel"
                  name="telepon"
                  id="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                  placeholder="Masukkan nomor telepon.."
                  required
                />
              </div>

              <div className="md:col-span-2">
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

              <div className="md:col-span-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
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

              <div className="md:col-span-2">
                <label
                  htmlFor="alamat"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  name="alamat"
                  id="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors bg-gray-50/50"
                  placeholder="Masukkan alamat.."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="provinsi_id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Provinsi
                </label>
                <select
                  name="provinsi_id"
                  id="provinsi_id"
                  value={formData.provinsi_id}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Pilih Provinsi
                  </option>
                  {provinces.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="kota_id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Kota/Kabupaten
                </label>
                <select
                  name="kota_id"
                  id="kota_id"
                  value={formData.kota_id}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                  required
                  disabled={!formData.provinsi_id}
                >
                  <option value="" disabled>
                    Pilih Kota/Kabupaten
                  </option>
                  {regencies.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {reg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="kecamatan_id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Kecamatan
                </label>
                <select
                  name="kecamatan_id"
                  id="kecamatan_id"
                  value={formData.kecamatan_id}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-brand-500 focus:outline-none sm:text-sm transition-colors disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                  required
                  disabled={!formData.kota_id}
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-4 px-4 cursor-pointer border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="font-semibold text-brand-600 hover:text-brand-500 transition-colors cursor-pointer"
                >
                  Masuk di sini
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrasi;
