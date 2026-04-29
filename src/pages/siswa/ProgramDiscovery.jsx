import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { BookOpen, Users, ArrowRight, Wallet } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ProgramDiscovery = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axiosInstance.get("/programs");
        setPrograms(response.data?.data || []);
      } catch (error) {
        console.error("Failed to load programs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  useGSAP(() => {
    if (!isLoading && programs.length > 0) {

      gsap.from(".program-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        clearProps: "all"
      });
    }
  }, [isLoading, programs]);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-medium tracking-wide animate-pulse">Memuat Daftar Program...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Program Pendidikan</h1>
        <p className="text-slate-500 mt-2 text-lg">Pilih program unggulan yang sesuai dengan minat Anda.</p>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">Belum Ada Program</h2>
          <p className="text-slate-500 mt-2">Saat ini belum ada program yang dibuka untuk pendaftaran.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const isFull = program.kuota <= 0;
            return (
              <div
                key={program.id}
                className="program-card bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {}
                <div className="h-40 bg-gradient-to-br from-blue-600 to-indigo-800 relative flex flex-col justify-center items-center text-white overflow-hidden p-6 text-center">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
                  <BookOpen size={36} className="mb-2 opacity-80" />
                  <h3 className="text-xl font-bold leading-tight relative z-10">{program.nama_program}</h3>
                </div>

                {}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">
                    {program.deskripsi || "Tidak ada deskripsi tersedia untuk program ini."}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Wallet size={18} className="text-emerald-500" />
                        <span className="text-sm font-medium">Biaya</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-700">
                        Rp {Number(program.biaya_pendaftaran).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Users size={18} className={isFull ? "text-red-500" : "text-blue-500"} />
                        <span className="text-sm font-medium">Sisa Kuota</span>
                      </div>
                      <span className={`text-sm font-bold ${isFull ? "text-red-600" : "text-blue-700"}`}>
                        {program.kuota} Kursi
                      </span>
                    </div>
                  </div>

                  {}
                  <button
                    onClick={() => navigate(`/apply/${program.id}`)}
                    disabled={isFull}
                    className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-base font-bold transition-all ${
                      isFull
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                    }`}
                  >
                    {isFull ? "Kuota Penuh" : "Daftar Sekarang"}
                    {!isFull && <ArrowRight size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProgramDiscovery;
