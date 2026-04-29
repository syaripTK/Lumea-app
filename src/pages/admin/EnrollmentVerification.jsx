import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { notyfSuccess, notyfError } from "../../utils/notyf";
import Modal from "../../components/admin/Modal";
import { CheckCircle, XCircle, FileText, Search, Eye } from "lucide-react";
import { getImageUrl } from "../../utils/helpers";

const EnrollmentVerification = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [catatanAdmin, setCatatanAdmin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEnrollments = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/pendaftar");
      const actualData = response.data?.data?.data || response.data?.data || [];
      setEnrollments(actualData);
    } catch (error) {
      console.error("Failed to fetch enrollments", error);
      notyfError("Gagal memuat data pendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleOpenDetail = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsDetailModalOpen(true);
  };

  const handleStatusUpdate = async (id, status, catatan = "") => {
    setIsSubmitting(true);
    try {
      await axiosInstance.patch(`/pendaftar/${id}/status`, {
        status,
        catatan_admin: catatan,
      });
      notyfSuccess(`Status berhasil diubah menjadi ${status}`);
      setIsDetailModalOpen(false);
      setIsRejectModalOpen(false);
      setCatatanAdmin("");
      fetchEnrollments();
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal mengubah status.";
      notyfError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectPrompt = () => {
    setCatatanAdmin("");
    setIsRejectModalOpen(true);
  };

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const profileData =
        enrollment.profiles || enrollment.User?.Profiles || {};
      const profile = Array.isArray(profileData) ? profileData[0] : profileData;

      const nama = profile?.nama_lengkap || enrollment.nama_lengkap || "";
      const nisn = profile?.nisn || enrollment.nisn || "";

      const nameMatch = nama.toLowerCase().includes(searchTerm.toLowerCase());
      const nisnMatch = nisn.includes(searchTerm);

      const searchMatch = nameMatch || nisnMatch;
      const statusMatch =
        filterStatus === "semua" ||
        enrollment.status_pendaftaran === filterStatus;

      return searchMatch && statusMatch;
    });
  }, [enrollments, filterStatus, searchTerm]);

  const statusConfig = {
    pending: {
      label: "Pending",
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: <FileText size={14} />,
    },
    terverifikasi: {
      label: "Terverifikasi",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: <CheckCircle size={14} />,
    },
    ditolak: {
      label: "Ditolak",
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <XCircle size={14} />,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Verifikasi Pendaftar
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Tinjau dokumen dan verifikasi status pendaftaran siswa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari Nama atau NISN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-2">
        {["semua", "pending", "terverifikasi", "ditolak"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap capitalize ${
              filterStatus === status
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold tracking-wide">
                <th className="py-4 px-6">ID / NISN</th>
                <th className="py-4 px-6">Siswa</th>
                <th className="py-4 px-6">Program</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </td>
                </tr>
              ) : filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    Tidak ada data pendaftar yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((enrollment) => {
                  const profileData =
                    enrollment.profiles || enrollment.User?.Profiles || {};
                  const profile = Array.isArray(profileData)
                    ? profileData[0]
                    : profileData;

                  const programData =
                    enrollment.programs || enrollment.Program || {};
                  const program = Array.isArray(programData)
                    ? programData[0]
                    : programData;

                  const nama =
                    profile?.nama_lengkap ||
                    enrollment.nama_lengkap ||
                    "Tanpa Nama";
                  const nisn = profile?.nisn || enrollment.nisn || "-";
                  const programName =
                    program?.nama_program ||
                    enrollment.program_name ||
                    "Program Unknown";
                  const status =
                    enrollment.status_pendaftaran?.toLowerCase() || "pending";
                  const config = statusConfig[status] || statusConfig.pending;

                  return (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-900">
                          #{enrollment.id}
                        </div>
                        <div className="text-xs text-slate-500">{nisn}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800">
                          {nama}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-700">
                          {programName}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
                        >
                          {config.icon}
                          {config.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleOpenDetail(enrollment)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer text-sm font-medium"
                        >
                          <Eye size={16} />
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => !isSubmitting && setIsDetailModalOpen(false)}
        title="Detail Pendaftar"
      >
        {selectedEnrollment && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {(() => {
                const profileData =
                  selectedEnrollment.profiles ||
                  selectedEnrollment.User?.Profiles ||
                  {};
                const profile = Array.isArray(profileData)
                  ? profileData[0]
                  : profileData;
                const programData =
                  selectedEnrollment.programs ||
                  selectedEnrollment.Program ||
                  {};
                const program = Array.isArray(programData)
                  ? programData[0]
                  : programData;

                return (
                  <>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        Nama Lengkap
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {profile?.nama_lengkap ||
                          selectedEnrollment.nama_lengkap ||
                          "Tanpa Nama"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        NISN
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {profile?.nisn || selectedEnrollment.nisn || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        Telepon
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {profile?.telepon || selectedEnrollment.telepon || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        Program
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {program?.nama_program ||
                          selectedEnrollment.program_name ||
                          `ID: ${selectedEnrollment.program_id}`}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                        Alamat
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {profile?.alamat || selectedEnrollment.alamat || "-"}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                Dokumen Ijazah
              </p>
              <div className="bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[200px] border border-slate-200">
                {(() => {
                  const profileData =
                    selectedEnrollment.profiles ||
                    selectedEnrollment.User?.Profiles ||
                    {};
                  const profile = Array.isArray(profileData)
                    ? profileData[0]
                    : profileData;
                  const ijazahPath =
                    selectedEnrollment.ijazah_path || profile?.ijazah_path;
                  const displaySrc = ijazahPath
                    ? getImageUrl(ijazahPath)
                    : "/ijazah.jpeg";

                  return (
                    <img
                      src={displaySrc}
                      alt="Ijazah"
                      className="max-w-full max-h-96 object-contain p-2"
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

            {selectedEnrollment.status_pendaftaran === "pending" && (
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedEnrollment.id, "terverifikasi")
                  }
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle size={18} />
                  Verifikasi Pendaftar
                </button>
                <button
                  onClick={handleRejectPrompt}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 border border-red-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <XCircle size={18} />
                  Tolak Pendaftar
                </button>
              </div>
            )}

            {selectedEnrollment.status_pendaftaran === "ditolak" &&
              selectedEnrollment.catatan_admin && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">
                    Catatan Penolakan
                  </p>
                  <p className="text-sm text-red-800">
                    {selectedEnrollment.catatan_admin}
                  </p>
                </div>
              )}
          </div>
        )}
      </Modal>

      {}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => !isSubmitting && setIsRejectModalOpen(false)}
        title="Alasan Penolakan"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Berikan alasan mengapa pendaftaran ini ditolak. Alasan ini akan
            terlihat oleh siswa.
          </p>
          <textarea
            value={catatanAdmin}
            onChange={(e) => setCatatanAdmin(e.target.value)}
            placeholder="Contoh: Dokumen ijazah buram, silakan upload ulang."
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors resize-none"
          ></textarea>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={() =>
                handleStatusUpdate(
                  selectedEnrollment?.id,
                  "ditolak",
                  catatanAdmin,
                )
              }
              disabled={!catatanAdmin.trim() || isSubmitting}
              className="px-5 py-2.5 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Memproses..." : "Konfirmasi Penolakan"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EnrollmentVerification;
