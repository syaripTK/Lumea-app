import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  AlertCircle,
  CheckCircle2,
  UserCircle2,
  ArrowRight,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";

/**
 * SiswaDashboard
 * Onboarding screen and profile completeness guard.
 */
const SiswaDashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [provinsiName, setProvinsiName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        console.log(response);

        setProfileData(response.data?.data);
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const profiles = profileData?.profiles?.[0] || {};

  useEffect(() => {
    const resolveProvinsi = async () => {
      if (!profiles.provinsi_id) return;

      try {
        const res = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/province/${profiles.provinsi_id}.json`,
        );
        setProvinsiName(res.data.name);
      } catch (error) {
        console.error("Gagal mengambil nama provinsi:", error.message);
        setProvinsiName(profiles.provinsi_id);
      }
    };

    resolveProvinsi();
  }, [profiles.provinsi_id]);

  const completenessChecks = [
    {
      label: "Nama Lengkap",
      value: profiles.nama_lengkap,
      isComplete: !!profiles.nama_lengkap,
    },
    { label: "NISN", value: profiles.nisn, isComplete: !!profiles.nisn },
    {
      label: "Telepon",
      value: profiles.telepon,
      isComplete: !!profiles.telepon,
    },
    { label: "Alamat", value: profiles.alamat, isComplete: !!profiles.alamat },
    {
      label: "Provinsi",
      value: provinsiName || "Loading...",
      isComplete: !!profiles.provinsi_id,
    },
  ];

  const completedCount = completenessChecks.filter((c) => c.isComplete).length;
  const progressPercentage =
    Math.round((completedCount / completenessChecks.length) * 100) || 0;
  const isProfileComplete = progressPercentage === 100;

  useGSAP(() => {
    if (!isLoading && profileData) {
      const tl = gsap.timeline();

      tl.from(".welcome-text", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      })
        .from(
          ".profile-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
            clearProps: "all",
          },
          "-=0.3",
        )
        .to(
          ".progress-bar-fill",
          {
            width: `${progressPercentage}%`,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }
  }, [isLoading, profileData, progressPercentage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto mt-8">
      {/* Welcome Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="welcome-text text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Selamat Datang,{" "}
          <span className="text-blue-600">
            {profiles.nama_lengkap || "Siswa"}
          </span>
          !
        </h1>
        <p className="welcome-text text-slate-500 mt-2 text-lg">
          Kelola profil dan pendaftaran program pendidikan Anda di satu tempat.
        </p>
      </div>

      {/* Profile Guard Card */}
      <div className="profile-card bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
          <div className="progress-bar-fill h-full bg-blue-500 w-0"></div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Left: Avatar & Progress */}
            <div className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center text-blue-600 mb-4 shadow-inner">
                <UserCircle2 size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Status Profil
              </h2>
              <p className="text-slate-500 text-sm mt-1 mb-4">
                Lengkapi data untuk mendaftar
              </p>

              <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                <div className="progress-bar-fill bg-blue-500 h-full w-0"></div>
              </div>
              <div className="w-full flex justify-between text-xs font-semibold text-slate-600">
                <span>Kelengkapan</span>
                <span
                  className={
                    isProfileComplete ? "text-emerald-600" : "text-blue-600"
                  }
                >
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {/* Right: Details & Action */}
            <div className="w-full sm:w-2/3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-8 sm:pt-0 sm:pl-8">
              {!isProfileComplete ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 mb-6">
                  <AlertCircle
                    className="text-amber-600 shrink-0 mt-0.5"
                    size={24}
                  />
                  <div>
                    <h3 className="text-amber-800 font-bold">
                      Profil Belum Lengkap
                    </h3>
                    <p className="text-amber-700 text-sm mt-1">
                      Anda tidak dapat mendaftar program sebelum melengkapi
                      profil. Silakan hubungi Administrator untuk memperbarui
                      data, atau lakukan registrasi ulang.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-4 mb-6">
                  <CheckCircle2
                    className="text-emerald-600 shrink-0 mt-0.5"
                    size={24}
                  />
                  <div>
                    <h3 className="text-emerald-800 font-bold">
                      Profil Lengkap
                    </h3>
                    <p className="text-emerald-700 text-sm mt-1">
                      Data Anda sudah lengkap. Anda sekarang dapat mulai
                      mendaftar ke program-program yang tersedia!
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {completenessChecks.map((check, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-2 border-b border-slate-50"
                  >
                    <span className="text-sm text-slate-500">
                      {check.label}
                    </span>
                    {check.isComplete ? (
                      <span className="text-sm font-medium text-slate-900 truncate max-w-[120px]">
                        {check.value}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded">
                        KOSONG
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => navigate("/programs")}
                  disabled={!isProfileComplete}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Lihat Program Tersedia
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiswaDashboard;
