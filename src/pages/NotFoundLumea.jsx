

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundLumea = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-blue-50 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-cyan-50 opacity-60 blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a56db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="w-52 h-52 rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/40 flex flex-col items-center justify-center mb-10 overflow-hidden group hover:border-blue-400 transition-colors duration-200">
          <img
            src="/error-page.png"
            alt="404"
            className="w-full h-full object-cover"
          />

          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.5"
            className="mb-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-xs text-blue-300 font-medium">
            Tambahkan foto di sini
          </span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          404 — Halaman Tidak Ditemukan
        </span>

        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-3">
          Halaman ini{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            tidak ada
          </span>
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs">
          Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau
          URL-nya salah.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 px-7 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <ArrowLeft size={15} />
          Kembali ke Halaman Sebelumnya
        </button>

        <p className="mt-12 text-xs text-slate-300 font-semibold tracking-widest uppercase">
          Lumea
        </p>
      </div>
    </div>
  );
};

export default NotFoundLumea;
