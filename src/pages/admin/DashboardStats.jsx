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
  BarChart3
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
import { Line, Doughnut, Bar } from "react-chartjs-2";

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
          fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json").then(res => res.json())
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

  useGSAP(() => {
    if (!isLoading && analytics) {
      gsap.from(".animate-up", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "all"
      });
    }
  }, { dependencies: [isLoading, analytics], scope: containerRef });

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
    const province = provinces.find(p => p.id === id.toString());
    return province ? province.name : `Provinsi ${id}`;
  };

  const kpis = [
    {
      label: "Total Terdaftar",
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
      label: "Menunggu Verifikasi",
      value: analytics.kpi_cards?.pending_document_reviews || 0,
      icon: <Clock size={24} />,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const trendData = {
    labels: (analytics?.monthly_registration_trend || []).map(item => item.month || "Unknown"),
    datasets: [
      {
        fill: true,
        label: "Pendaftar",
        data: (analytics?.monthly_registration_trend || []).map(item => Number(item.count) || 0),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
    ],
  };

  const distributionData = {
    labels: (analytics.program_distribution || []).map(item => item.name),
    datasets: [
      {
        label: "Pendaftar",
        data: (analytics.program_distribution || []).map(item => item.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };

  const ratioData = {
    labels: (analytics.payment_ratio || []).map(item => item.status_pembayaran?.toUpperCase() || "TIDAK DIKETAHUI"),
    datasets: [
      {
        label: "Status",
        data: (analytics.payment_ratio || []).map(item => item.count),
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
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "Inter, sans-serif", size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        displayColors: false,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { type: "category", grid: { display: false } },
    },
  };

  return (
    <div ref={containerRef} className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analitik Admin</h2>
          <p className="text-slate-500 mt-1">Visualisasi data real-time dari platform pendaftaran.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-600 shadow-sm">
          <Clock size={16} className="text-blue-500" />
          Terakhir diperbarui: {new Date().toLocaleTimeString()}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div 
            key={index}
            className="animate-up relative overflow-hidden bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/60 transition-transform hover:scale-[1.02] duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-5 -mr-8 -mt-8 rounded-full`} />
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${kpi.color} text-white shadow-lg`}>
                {kpi.icon}
              </div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
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
        <div className="animate-up lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={22} />
              Tren Pendaftaran
            </h3>
            <select className="bg-slate-50 border-none text-sm font-semibold text-slate-600 rounded-xl px-4 py-2 outline-none cursor-pointer">
              <option>6 Bulan Terakhir</option>
              <option>Setahun Terakhir</option>
            </select>
          </div>
          <div className="h-[350px]">
            {analytics?.monthly_registration_trend?.length > 0 ? (
              <Line data={trendData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">
                Data tren pendaftaran tidak tersedia.
              </div>
            )}
          </div>
        </div>
        <div className="animate-up bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
            <PieIcon className="text-purple-500" size={22} />
            Distribusi Program
          </h3>
          <div className="h-[300px] relative">
            <Doughnut 
              data={distributionData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { position: "bottom" }
                },
                cutout: "70%",
              }} 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-800">{analytics.program_distribution.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Program</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        <div className="animate-up bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
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
                  legend: { display: false }
                }
              }} 
            />
          </div>
        </div>

        {}
        <div className="animate-up bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
            <MapPin className="text-orange-500" size={22} />
            Wilayah Terpopuler
          </h3>
          <div className="space-y-4">
            {stats.registrationsByProvince?.slice(0, 4).map((prov, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{getProvinceName(prov.provinsi_id)}</p>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Data Geografis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">{prov.count}</p>
                  <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">Siswa</p>
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
