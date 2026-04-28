import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  NotebookText,
  PartyPopper,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notyfError } from "../utils/notyf";

const highlights = [
  "Formulir digital 100% online",
  "Proses verifikasi cepat",
  "Notifikasi real-time",
];

const Hero = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
      );

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          listRef.current.children,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );

      gsap.to(cardRef.current, {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDaftar = () => {
    notyfError(
      "Mohon maaf fitur pendaftaran belum tersedia, silahkan daftar melalui WhatsApp",
    );
  };

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 pt-20"
    >
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #1a56db 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Penerimaan Siswa Baru 2026/2027
          </div>

          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
          >
            Daftar Sekolah{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Lebih Mudah
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 9C50 4 100 2 150 3C200 4 250 7 298 9"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="underline-gradient"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                  >
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            & Transparan
          </h1>

          <p
            ref={subRef}
            className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg"
          >
            Platform digital pendaftaran siswa baru yang memudahkan calon siswa,
            orang tua, dan pihak sekolah dalam satu sistem yang terintegrasi.
          </p>

          <ul ref={listRef} className="flex flex-col gap-3 mb-10">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600 font-medium"
              >
                <CheckCircle
                  size={18}
                  className="text-blue-500 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <span
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-7 py-3.5 cursor-pointer text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Mulai Pendaftaran
              <ArrowRight size={16} />
            </span>
            <span
              onClick={handleDaftar}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm cursor-pointer font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-2xl transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Play size={12} className="text-blue-600 translate-x-0.5" />
              </div>
              Lihat Cara Daftar
            </span>
          </div>
        </div>

        <div ref={cardRef} className="hidden lg:block relative">
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-6 border border-blue-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Status Pendaftaran
                </p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">
                  Ahmad Rizki F.
                </h3>
              </div>
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                ● Diterima
              </span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              {["Formulir", "Dokumen", "Seleksi", "Pengumuman"].map(
                (step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 flex-1 last:flex-none"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-blue-600 text-white" : i === 3 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[9px] font-medium text-slate-400 whitespace-nowrap">
                        {step}
                      </span>
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-0.5 mb-4 rounded ${i < 3 ? "bg-blue-200" : "bg-slate-100"}`}
                      />
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="space-y-3">
              {[
                { label: "Sekolah Tujuan", value: "SMA Negeri 1 Jakarta" },
                { label: "Jalur", value: "Zonasi" },
                { label: "No. Pendaftaran", value: "PSB-2025-004821" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2.5 border-b border-slate-50"
                >
                  <span className="text-xs text-slate-400 font-medium">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">
                  <PartyPopper size={14} className="text-blue-600" />
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-800">Selamat!</p>
                <p className="text-[11px] text-blue-600 mt-0.5">
                  Kamu diterima di SMA Negeri 1 Jakarta
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -left-8 bg-white rounded-2xl shadow-lg shadow-blue-100/60 px-4 py-3 border border-blue-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-base">
                <NotebookText size={18} className="text-blue-600" />
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">
                1.240 Pendaftar
              </p>
              <p className="text-[10px] text-slate-400">Tahun ini</p>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-lg shadow-blue-100/60 px-4 py-3 border border-blue-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              <span className="text-base">
                <BadgeCheck size={18} className="text-emerald-600" />
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">
                98% Tepat Waktu
              </p>
              <p className="text-[10px] text-slate-400">Proses verifikasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
