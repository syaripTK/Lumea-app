import { useCountUp, useStaggerChildren } from "../hooks/useScrollAnimation";
import { GraduationCap, Star, Building2, Clock } from "lucide-react";

const stats = [
  {
    value: 12400,
    suffix: "+",
    label: "Total Pendaftar",
    icon: <GraduationCap size={24} className="text-blue-600" />,
  },
  {
    value: 98,
    suffix: "%",
    label: "Tingkat Kepuasan",
    icon: <Star size={24} className="text-yellow-600" />,
  },
  {
    value: 150,
    suffix: "+",
    label: "Sekolah Mitra",
    icon: <Building2 size={24} className="text-emerald-600" />,
  },
  {
    value: 3,
    suffix: " Menit",
    label: "Rata-rata Waktu Daftar",
    icon: <Clock size={24} className="text-purple-600" />,
  },
];

const StatCard = ({ value, suffix, label, icon }) => {
  const countRef = useCountUp(value, suffix);

  return (
    <div className="stagger-child text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl text-2xl mb-4 transition-colors duration-200">
        {icon}
      </div>
      <div
        ref={countRef}
        className="text-4xl font-extrabold text-slate-900 mb-1 tabular-nums"
      >
        0{suffix}
      </div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
    </div>
  );
};

const Stats = () => {
  const wrapperRef = useStaggerChildren(".stagger-child", { stagger: 0.15 });

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={wrapperRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
