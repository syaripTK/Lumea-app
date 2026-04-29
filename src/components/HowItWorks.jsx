import { User, NotebookText, FileText, Clock, ArrowRight } from "lucide-react";
import { useFadeInUp, useSlideIn } from "../hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Buat Akun",
    desc: "Daftarkan diri dengan email aktif. Verifikasi akun hanya membutuhkan beberapa detik.",
    icon: <User size={24} className="text-blue-600" />,
    detail: ["Email aktif", "Nomor HP orang tua", "Verifikasi OTP"],
  },
  {
    number: "02",
    title: "Isi Formulir",
    desc: "Lengkapi data diri, nilai rapor, dan pilih sekolah tujuan sesuai jalur yang diinginkan.",
    icon: <NotebookText size={24} className="text-blue-600" />,
    detail: ["Data diri lengkap", "Nilai akademik", "Pilih sekolah & jalur"],
  },
  {
    number: "03",
    title: "Upload Dokumen",
    desc: "Unggah dokumen persyaratan dalam format digital. Sistem akan memverifikasi secara otomatis.",
    icon: <FileText size={24} className="text-blue-600" />,
    detail: ["Ijazah SMA", "Nilai rapor"],
  },
  {
    number: "04",
    title: "Pantau & Tunggu",
    desc: "Lacak status pendaftaran secara real-time. Terima notifikasi hasil seleksi langsung di akun kamu.",
    icon: <Clock size={24} className="text-blue-600" />,
    detail: ["Status real-time", "Notifikasi email & SMS", "Pengumuman resmi"],
  },
];

const StepCard = ({ step, index }) => {
  const ref = useFadeInUp({ delay: index * 0.1 });
  const navigate = useNavigate();

  return (
    <div ref={ref} className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-200 flex-shrink-0">
          {step.number}
        </div>
        {index < steps.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-200 to-transparent mt-2 min-h-12" />
        )}
      </div>

      <div className="pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{step.icon}</span>
          <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {step.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.detail.map((d) => (
            <span
              key={d}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const titleRef = useFadeInUp();
  const rightRef = useSlideIn("right");

  return (
    <section id="cara-daftar" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div ref={titleRef} className="mb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Cara Mendaftar
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                4 Langkah{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Mudah
                </span>{" "}
                Mendaftar
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Proses pendaftaran yang simpel dan terstruktur agar tidak ada
                langkah yang terlewat.
              </p>
            </div>

            <div>
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>

          <div ref={rightRef} className="lg:sticky lg:top-28">
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <p className="text-blue-200 text-sm font-semibold mb-1">
                  Jadwal Pendaftaran
                </p>
                <h3 className="text-2xl font-bold mb-6">
                  Tahun Ajaran 2025/2026
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      jalur: "Jalur Afirmasi",
                      start: "3 Juni",
                      end: "14 Juni 2025",
                      active: true,
                    },
                    {
                      jalur: "Jalur Zonasi",
                      start: "17 Juni",
                      end: "28 Juni 2025",
                      active: false,
                    },
                    {
                      jalur: "Jalur Prestasi",
                      start: "1 Juli",
                      end: "10 Juli 2025",
                      active: false,
                    },
                    {
                      jalur: "Jalur Perpindahan",
                      start: "1 Juli",
                      end: "10 Juli 2025",
                      active: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.jalur}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        item.active
                          ? "bg-white/15 border border-white/20"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.jalur}</p>
                        <p className="text-xs text-blue-200 mt-0.5">
                          {item.start} – {item.end}
                        </p>
                      </div>
                      {item.active && (
                        <span className="px-2.5 py-1 bg-emerald-400 text-emerald-900 text-[10px] font-bold rounded-full">
                          BUKA
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/registrasi")}
                  className="mt-6 w-full flex items-center cursor-pointer justify-center gap-2 py-3.5 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Daftar Sekarang
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
