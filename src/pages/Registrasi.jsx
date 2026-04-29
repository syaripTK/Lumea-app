import React, { useState, useEffect } from "react";
import { notyfError, notyfSuccess, notyfWarning } from "../utils/notyf";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  IdCard,
  Phone,
  MapPin,
  Globe,
  Map,
  Navigation,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const InputWrapper = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
        {Icon}
      </div>
      {children}
    </div>
  </div>
);

const Registrasi = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nama_lengkap: "",
    nisn: "",
    telepon: "",
    alamat: "",
    provinsi_id: "",
    kota_id: "",
    kecamatan_id: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    }
  }, [formData.kota_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      notyfWarning("Harap lengkapi semua data akun Anda.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      notyfWarning("Password dan Konfirmasi Password tidak cocok");
      return false;
    }
    if (formData.password.length < 6) {
      notyfWarning("Password minimal 6 karakter");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        payload,
      );
      notyfSuccess("Pendaftaran berhasil!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server";
      notyfError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Akun", icon: <Lock size={18} /> },
    { id: 2, title: "Profil", icon: <User size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <GraduationCap size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter">Lumea</span>
          </div>

          <div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Langkah Awal <br />
              <span className="text-blue-300">Masa Depan</span> <br />
              Dimulai Di Sini.
            </h2>
            <p className="text-lg text-blue-100/80 leading-relaxed max-w-md">
              Bergabunglah dengan ribuan pelajar lainnya untuk mengembangkan
              potensi dan meraih prestasi terbaik bersama platform Lumea.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`/ava${i}.jpeg`}
                  alt={`User Avatar ${i}`}
                  className="w-10 h-10 rounded-full border-2 border-blue-600 bg-slate-200 object-cover"
                />
              ))}
            </div>
            <span>+500 Siswa Terdaftar Hari Ini</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center py-12 px-6 sm:px-12 lg:px-20 bg-slate-50">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm mb-12 transition-colors cursor-pointer w-fit"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Kembali ke Beranda
          </button>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Registrasi Akun
            </h1>
            <p className="text-slate-500 font-medium">
              Silakan lengkapi formulir pendaftaran di bawah ini.
            </p>
          </div>

          <div className="mb-12 flex items-center justify-center lg:justify-start gap-4">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${step >= s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" : "bg-white text-slate-400 border border-slate-200"}`}
                  >
                    {step > s.id ? <CheckCircle2 size={24} /> : s.icon}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${step >= s.id ? "text-blue-600" : "text-slate-400"}`}
                  >
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 rounded-full transition-colors duration-500 ${step > s.id ? "bg-blue-600" : "bg-slate-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100"
          >
            {step === 1 ? (
              <div className="space-y-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputWrapper label="Password" icon={<Lock size={18} />}>
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
                      className="absolute right-4 inset-y-0 flex items-center text-slate-400 hover:text-blue-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </InputWrapper>

                  <InputWrapper
                    label="Konfirmasi Password"
                    icon={<Lock size={18} />}
                  >
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 inset-y-0 flex items-center text-slate-400 hover:text-blue-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </InputWrapper>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputWrapper label="Nama Lengkap" icon={<User size={18} />}>
                    <input
                      type="text"
                      name="nama_lengkap"
                      value={formData.nama_lengkap}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                      placeholder="Nama sesuai ijazah"
                      required
                    />
                  </InputWrapper>

                  <InputWrapper label="NISN" icon={<IdCard size={18} />}>
                    <input
                      type="text"
                      name="nisn"
                      value={formData.nisn}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                      placeholder="10 digit NISN"
                      required
                    />
                  </InputWrapper>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputWrapper
                    label="Nomor Telepon"
                    icon={<Phone size={18} />}
                  >
                    <input
                      type="tel"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                      placeholder="0812..."
                      required
                    />
                  </InputWrapper>

                  <InputWrapper
                    label="Alamat Lengkap"
                    icon={<MapPin size={18} />}
                  >
                    <input
                      type="text"
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                      placeholder="Jl. Merdeka No. 1"
                      required
                    />
                  </InputWrapper>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <InputWrapper label="Provinsi" icon={<Globe size={18} />}>
                    <select
                      name="provinsi_id"
                      value={formData.provinsi_id}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none"
                      required
                    >
                      <option value="">Pilih</option>
                      {provinces.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>

                  <InputWrapper label="Kota" icon={<Map size={18} />}>
                    <select
                      name="kota_id"
                      value={formData.kota_id}
                      onChange={handleChange}
                      disabled={!formData.provinsi_id}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none disabled:opacity-50"
                      required
                    >
                      <option value="">Pilih</option>
                      {regencies.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>

                  <InputWrapper
                    label="Kecamatan"
                    icon={<Navigation size={18} />}
                  >
                    <select
                      name="kecamatan_id"
                      value={formData.kecamatan_id}
                      onChange={handleChange}
                      disabled={!formData.kota_id}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none disabled:opacity-50"
                      required
                    >
                      <option value="">Pilih</option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 flex justify-center items-center gap-2 py-4 px-6 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                >
                  <ArrowLeft size={18} />
                  Kembali
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] flex justify-center items-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 1
                      ? "Lanjutkan Ke Profil"
                      : "Selesaikan Pendaftaran"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      {isLoading && step === 2 && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-500">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full" />
              <Loader2
                size={80}
                className="text-blue-600 animate-spin absolute top-0 left-0"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-800 mb-2">
                Harap Tunggu
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Sedang memproses pendaftaran Anda. Mohon tidak menutup halaman
                ini.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registrasi;
