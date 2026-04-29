import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Users,
  CreditCard,
  BookOpen,
  MapPin,
  TrendingUp,
  Clock,
  PieChart as PieIcon,
  BarChart3,
  ChevronRight,
  Target,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes, provincesRes] = await Promise.all([
          axiosInstance.get("/reports/stats"),
          axiosInstance.get("/dashboard/admin/analytics"),
          fetch(
            "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
          ).then((res) => res.json()),
        ]);
        setStats(statsRes.data.data);
        setAnalytics(analyticsRes.data.data);
        setProvinces(provincesRes);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics || !stats) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
        Gagal memuat data dashboard. Silakan coba lagi nanti.
      </div>
    );
  }

  const getProvinceName = (id) => {
    const province = provinces.find((p) => p.id === id.toString());
    return province ? province.name : `Provinsi ${id}`;
  };

  const kpis = [
    {
      label: "Total Akun",
      value: analytics.kpi_cards?.total_registered_users || 0,
      icon: <Users size={24} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Total Pendapatan",
      value: analytics.kpi_cards?.total_revenue || 0,
      icon: <CreditCard size={24} />,
      color: "from-emerald-400 to-teal-600",
      isCurrency: true,
    },
    {
      label: "Pendaftaran",
      value: stats.totalRegistrations || 0,
      icon: <BookOpen size={24} />,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Review Berkas",
      value: analytics.kpi_cards?.pending_document_reviews || 0,
      icon: <Clock size={24} />,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const distributionColors = [
    "rgba(59, 130, 246, 0.8)",
    "rgba(16, 185, 129, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(239, 68, 68, 0.8)",
  ];

  const distributionData = {
    labels: (analytics.program_distribution || []).map((item) => item.name),
    datasets: [
      {
        label: "Pendaftar",
        data: (analytics.program_distribution || []).map((item) => item.count),
        backgroundColor: distributionColors,
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };

  const ratioData = {
    labels: (analytics.payment_ratio || []).map(
      (item) => item.status_pembayaran?.toUpperCase() || "TIDAK DIKETAHUI",
    ),
    datasets: [
      {
        label: "Status",
        data: (analytics.payment_ratio || []).map((item) => item.count),
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "Plus Jakarta Sans, sans-serif", size: 12, weight: '600' },
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 12,
        titleFont: { size: 14, weight: "bold", family: "Plus Jakarta Sans" },
        bodyFont: { size: 13, family: "Plus Jakarta Sans" },
        displayColors: false,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { font: { family: "Plus Jakarta Sans" } } },
      x: { grid: { display: false }, ticks: { font: { family: "Plus Jakarta Sans" } } },
    },
  };

  return (
    <div ref={containerRef} className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Laporan Analitik</h2>
          <p className="text-slate-500 mt-1">
            Ringkasan data pendaftaran dan statistik program.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/60"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-5 -mr-8 -mt-8 rounded-full`} />
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${kpi.color} text-white shadow-lg`}>
                {kpi.icon}
              </div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {kpi.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold text-slate-800">
                {kpi.isCurrency ? "Rp " : ""}
                {kpi.value.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 text-left">
              <Target className="text-blue-500" size={22} />
              Statistik Per Program
            </h3>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
              {stats.registrationsByProgram?.length || 0} Program Terdaftar
            </span>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 pl-2">Nama Program</th>
                  <th className="pb-4 text-right pr-2">Total Pendaftar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(stats.registrationsByProgram || []).map((item, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 pl-2">
                      <p className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.program_name}</p>
                      <p className="text-xs text-slate-400 font-medium">ID Program: #{item.program_id}</p>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl font-black text-sm border border-blue-100/50">
                        {item.count} Siswa
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
            <PieIcon className="text-purple-500" size={22} />
            Distribusi Peminat
          </h3>
          {/* Container with relative position and flex centering */}
          <div className="h-[300px] relative">
            <Doughnut
              data={distributionData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false }, // Hide default legend for precision centering
                },
                cutout: "75%",
                maintainAspectRatio: false,
              }}
            />
            {/* Absolute centering - perfectly centered because legend is hidden */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
              <span className="text-4xl font-black text-slate-800 leading-none">
                {analytics.program_distribution.length}
              </span>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">
                Program
              </span>
            </div>
          </div>
          
          {/* Custom HTML Legend for better precision and design */}
          <div className="mt-8 space-y-3">
            {(analytics.program_distribution || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: distributionColors[idx % distributionColors.length] }} 
                  />
                  <span className="font-semibold text-slate-600 truncate max-w-[150px]">{item.name}</span>
                </div>
                <span className="font-black text-slate-800">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8 text-left">
            <BarChart3 className="text-emerald-500" size={22} />
            Rasio Status Pembayaran
          </h3>
          <div className="h-[250px]">
            <Bar
              data={ratioData}
              options={{
                ...chartOptions,
                indexAxis: "y",
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 text-left">
            <MapPin className="text-orange-500" size={22} />
            Wilayah Terpopuler
          </h3>
          <div className="space-y-4">
            {(stats.registrationsByProvince || []).slice(0, 4).map((prov, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {getProvinceName(prov.provinsi_id)}
                    </p>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Data Geografis
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">
                    {prov.count}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    Siswa
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
