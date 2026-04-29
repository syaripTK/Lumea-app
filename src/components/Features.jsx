import { useFadeInUp, useStaggerChildren } from "../hooks/useScrollAnimation";
import {
  FileText,
  Bell,
  ShieldCheck,
  LayoutDashboard,
  Clock,
  Users,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Formulir Digital",
    desc: "Isi formulir pendaftaran secara online kapan saja dan di mana saja tanpa perlu datang ke sekolah.",
    color: "blue",
  },
  {
    icon: Bell,
    title: "Notifikasi Real-time",
    desc: "Dapatkan notifikasi langsung via email dan SMS untuk setiap perubahan status pendaftaran.",
    color: "cyan",
  },
  {
    icon: ShieldCheck,
    title: "Dokumen Terverifikasi",
    desc: "Unggah dan verifikasi dokumen persyaratan secara digital dengan sistem keamanan terjamin.",
    color: "indigo",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Lengkap",
    desc: "Pantau progres pendaftaran secara real-time melalui dashboard yang informatif dan mudah dipahami.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    desc: "Rata-rata hanya 3 menit untuk menyelesaikan seluruh proses pengisian formulir pendaftaran.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Multi Jalur",
    desc: "Dukung berbagai jalur penerimaan: Zonasi, Afirmasi, Perpindahan Tugas, dan Prestasi.",
    color: "indigo",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50 group-hover:bg-blue-100",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-600",
  },
  cyan: {
    bg: "bg-cyan-50 group-hover:bg-cyan-100",
    icon: "text-cyan-600",
    badge: "bg-cyan-100 text-cyan-600",
  },
  indigo: {
    bg: "bg-indigo-50 group-hover:bg-indigo-100",
    icon: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-600",
  },
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const c = colorMap[color];
  return (
    <div className="stagger-child group p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4 transition-colors duration-200`}
      >
        <Icon size={22} className={c.icon} />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

const Features = () => {
  const titleRef = useFadeInUp();
  const gridRef = useStaggerChildren(".stagger-child", { stagger: 0.1 });

  return (
    <section id="fitur" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Semua yang Kamu Butuhkan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Ada di Sini
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Platform kami dirancang untuk membuat proses pendaftaran siswa baru
            menjadi lebih mudah, cepat, dan transparan untuk semua pihak.
          </p>
        </div>

        {}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
