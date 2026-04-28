import { useFadeInUp, useStaggerChildren } from "../hooks/useScrollAnimation";
import {
  Building,
  GraduationCap,
  Lock,
  Quote,
  ShieldCheck,
} from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Orang Tua Siswa",
    school: "SMA Negeri 3 Bandung",
    avatar: "BS",
    rating: 5,
    text: "Luar biasa! Proses pendaftaran anak saya selesai hanya dalam 10 menit. Tidak perlu antre panjang di sekolah. Semua notifikasi selalu tepat waktu.",
    color: "blue",
  },
  {
    name: "Siti Rahayu, S.Pd",
    role: "Kepala Sekolah",
    school: "SMP Negeri 7 Jakarta",
    avatar: "SR",
    rating: 5,
    text: "Platform ini sangat membantu administrasi kami. Data pendaftar tersimpan rapi, proses seleksi lebih transparan, dan tidak ada berkas yang hilang.",
    color: "indigo",
  },
  {
    name: "Rizky Maulana",
    role: "Siswa Baru",
    school: "SMA Negeri 1 Surabaya",
    avatar: "RM",
    rating: 5,
    text: "Gampang banget! Tinggal isi formulir, upload foto, dan tunggu hasilnya. Dapat notifikasi langsung di HP. Diterima di sekolah impian saya!",
    color: "cyan",
  },
];

const colorMap = {
  blue: { avatar: "bg-blue-600", accent: "border-blue-100" },
  indigo: { avatar: "bg-indigo-600", accent: "border-indigo-100" },
  cyan: { avatar: "bg-cyan-600", accent: "border-cyan-100" },
};

const TestimonialCard = ({
  name,
  role,
  school,
  avatar,
  rating,
  text,
  color,
}) => {
  const c = colorMap[color];
  return (
    <div
      className={`stagger-child bg-white rounded-2xl p-6 border ${c.accent} shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <Quote size={24} className="text-blue-200 mb-4" />
      <p className="text-sm text-slate-600 leading-relaxed mb-6">"{text}"</p>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">
            ★
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${c.avatar} flex items-center justify-center text-white text-sm font-bold`}
        >
          {avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400">
            {role} · {school}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const titleRef = useFadeInUp();
  const gridRef = useStaggerChildren(".stagger-child", { stagger: 0.15 });

  return (
    <section id="testimoni" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            Testimoni
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Apa Kata{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Mereka?
            </span>
          </h2>
          <p className="text-slate-500 text-base">
            Ribuan orang tua, siswa, dan pihak sekolah telah mempercayakan
            proses pendaftaran kepada kami.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 lg:gap-12">
          {[
            {
              label: "Kemdikbud RI",
              icon: <Building size={24} className="text-blue-600" />,
            },
            {
              label: "Dinas Pendidikan DKI",
              icon: <GraduationCap size={24} className="text-blue-600" />,
            },
            {
              label: "ISO 27001 Certified",
              icon: <ShieldCheck size={24} className="text-blue-600" />,
            },
            {
              label: "PDPA Compliant",
              icon: <Lock size={24} className="text-blue-600" />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-slate-400"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
