import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { notyfSuccess, notyfError, notyfInfo } from "../../utils/notyf";
import useMidtransSnap from "../../hooks/useMidtransSnap";
import {
  CheckCircle,
  XCircle,
  FileText,
  CreditCard,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { getImageUrl } from "../../utils/helpers";

const MyEnrollments = () => {
  useMidtransSnap();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchMyEnrollments = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const response = await axiosInstance.get("/pendaftar/me");
      setEnrollments(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch enrollments", error);
      notyfError("Gagal memuat data pendaftaran Anda.");
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  const handlePayment = async (pendaftarId) => {
    setProcessingId(pendaftarId);
    try {
      const response = await axiosInstance.post("/payments/charge", {
        pendaftar_id: pendaftarId,
      });

      const snapToken = response.data?.data?.snap_token;

      if (!snapToken) {
        throw new Error("Token pembayaran tidak ditemukan.");
      }

      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: (result) => {
            notyfSuccess("Pembayaran berhasil! Memperbarui status...");
            setTimeout(() => {
              fetchMyEnrollments(true);
              setProcessingId(null);
            }, 3000);
          },
          onPending: (result) => {
            notyfInfo("Silakan selesaikan pembayaran Anda.");
            fetchMyEnrollments(true);
            setProcessingId(null);
          },
          onError: (result) => {
            notyfError("Terjadi kesalahan saat memproses transaksi.");
            setProcessingId(null);
          },
          onClose: () => {
            setProcessingId(null);
          },
        });
      } else {
        throw new Error("SDK Midtrans belum termuat. Silakan refresh halaman.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      notyfError(error.message || "Gagal memproses pembayaran.");
      setProcessingId(null);
    } finally {
      if (!window.snap) setProcessingId(null);
    }
  };

  const statusRegConfig = {
    pending: {
      label: "Berkas Sedang Direview",
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: <FileText size={16} />,
    },
    terverifikasi: {
      label: "Berkas Diterima",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: <CheckCircle size={16} />,
    },
    ditolak: {
      label: "Berkas Ditolak",
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <XCircle size={16} />,
    },
  };

  const statusPayConfig = {
    unpaid: {
      label: "Belum Bayar",
      bg: "bg-rose-100",
      text: "text-rose-700",
    },
    pending: {
      label: "Pending Payment",
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
    settlement: {
      label: "Lunas",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    paid: {
      label: "Lunas",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    expired: {
      label: "Expired",
      bg: "bg-red-100",
      text: "text-red-700",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Pendaftaran Saya
          </h1>
          <p className="text-slate-500 mt-2">
            Pantau status seleksi dokumen dan pembayaran program Anda.
          </p>
        </div>
        <button
          onClick={fetchMyEnrollments}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">
            Belum Ada Pendaftaran
          </h2>
          <p className="text-slate-500 mt-2">
            Anda belum mendaftar ke program apapun.
          </p>
          <a
            href="/programs"
            className="inline-block mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Cari Program
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {enrollments.map((enrollment) => {
            const statusReg =
              enrollment.status_pendaftaran?.toLowerCase() || "pending";
            const statusPay =
              enrollment.status_pembayaran?.toLowerCase() || "unpaid";
            const regConf =
              statusRegConfig[statusReg] || statusRegConfig.pending;
            const payConf =
              statusPayConfig[statusPay] || statusPayConfig.unpaid;
            const programName =
              enrollment.programs?.nama_program ||
              enrollment.program_name ||
              `Program #${enrollment.program_id}`;

            return (
              <div
                key={enrollment.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                  <div className="flex-1">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                      ID Pendaftaran: #{enrollment.id}
                    </h2>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">
                      {programName}
                    </h3>

                    <div className="space-y-5 text-left">
                      <div>
                        <p className="text-sm font-semibold text-slate-600 mb-2 text-left">
                          Status Dokumen
                        </p>
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${regConf.bg} ${regConf.text}`}
                        >
                          {regConf.icon}
                          {regConf.label}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-600 mb-2 text-left">
                          Status Tagihan
                        </p>
                        <div
                          className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-semibold ${payConf.bg} ${payConf.text}`}
                        >
                          {payConf.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    {(statusPay === "unpaid" || statusPay === "pending") &&
                    statusReg === "terverifikasi" ? (
                      <div className="text-left">
                        <p className="text-sm text-slate-500 mb-3 text-left">
                          Selesaikan pembayaran untuk mengamankan kursi Anda.
                        </p>
                        <button
                          onClick={() => handlePayment(enrollment.id)}
                          disabled={processingId !== null}
                          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
                        >
                          <CreditCard size={20} />
                          {processingId === enrollment.id
                            ? "Memproses..."
                            : "Bayar Sekarang"}
                        </button>
                      </div>
                    ) : (statusPay === "unpaid" || statusPay === "pending") &&
                      statusReg === "pending" ? (
                      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm border border-blue-100 flex gap-3 text-left">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <p className="text-left">
                          Pembayaran baru dapat dilakukan setelah dokumen Anda
                          diverifikasi oleh Admin.
                        </p>
                      </div>
                    ) : statusPay === "settlement" || statusPay === "paid" ? (
                      <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm font-bold border border-emerald-100 flex justify-center items-center gap-2">
                        <CheckCircle size={20} />
                        Pembayaran Lunas
                      </div>
                    ) : statusPay === "expired" ? (
                      <div>
                        <button
                          disabled
                          className="w-full flex justify-center items-center gap-2 bg-slate-200 text-slate-500 px-6 py-3.5 rounded-xl font-bold cursor-not-allowed"
                        >
                          <XCircle size={20} />
                          Pembayaran Kadaluarsa
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col bg-white">
                  {statusReg === "ditolak" && enrollment.catatan_admin && (
                    <div className="mb-6 bg-red-50 border border-red-200 p-5 rounded-2xl text-left">
                      <h4 className="flex items-center gap-2 text-red-800 font-bold mb-2 text-left">
                        <AlertCircle size={18} />
                        Catatan Penolakan
                      </h4>
                      <p className="text-sm text-red-700 leading-relaxed text-left">
                        {enrollment.catatan_admin}
                      </p>
                    </div>
                  )}

                  <h4 className="text-sm font-semibold text-slate-600 mb-3 text-left">
                    Dokumen Ijazah Terunggah
                  </h4>
                  <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center min-h-[300px] relative group">
                    {(() => {
                      const profileData =
                        enrollment.profiles || enrollment.User?.Profiles || {};
                      const profile = Array.isArray(profileData)
                        ? profileData[0]
                        : profileData;
                      const ijazahPath =
                        enrollment.ijazah_path || profile?.ijazah_path;
                      const displaySrc = ijazahPath
                        ? getImageUrl(ijazahPath)
                        : "/ijazah.jpeg";

                      return (
                        <img
                          src={displaySrc}
                          alt="Ijazah Siswa"
                          className="w-full h-full object-contain max-h-[400px] p-2 transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            if (
                              e.target.src !==
                              window.location.origin + "/ijazah.jpeg"
                            ) {
                              e.target.src = "/ijazah.jpeg";
                            }
                          }}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
