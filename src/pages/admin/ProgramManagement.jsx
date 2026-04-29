import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { notyfSuccess, notyfError } from "../../utils/notyf";
import Modal from "../../components/admin/Modal";
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [programCounts, setProgramCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  const [formData, setFormData] = useState({
    nama_program: "",
    deskripsi: "",
    biaya_pendaftaran: "",
    kuota: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [progRes, statsRes] = await Promise.all([
        axiosInstance.get("/programs"),
        axiosInstance.get("/reports/stats").catch(() => ({ data: { data: { registrationsByProgram: [] } } }))
      ]);

      setPrograms(progRes.data?.data || []);
      
      const counts = {};
      const regByProg = statsRes.data?.data?.registrationsByProgram || [];
      regByProg.forEach(item => {
        counts[item.program_id] = item.count;
      });
      setProgramCounts(counts);
    } catch (error) {
      console.error("Failed to fetch programs", error);
      notyfError("Gagal memuat data program.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (mode, program = null) => {
    setModalMode(mode);
    if (mode === "edit" && program) {
      setSelectedProgram(program);
      setFormData({
        nama_program: program.nama_program,
        deskripsi: program.deskripsi,
        biaya_pendaftaran: program.biaya_pendaftaran,
        kuota: program.kuota,
      });
    } else {
      setSelectedProgram(null);
      setFormData({
        nama_program: "",
        deskripsi: "",
        biaya_pendaftaran: "",
        kuota: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      biaya_pendaftaran: parseInt(formData.biaya_pendaftaran, 10),
      kuota: parseInt(formData.kuota, 10)
    };

    try {
      if (modalMode === "create") {
        await axiosInstance.post("/programs", payload);
        notyfSuccess("Program berhasil ditambahkan!");
      } else if (modalMode === "edit" && selectedProgram) {
        await axiosInstance.patch(`/programs/${selectedProgram.id}`, payload);
        notyfSuccess("Program berhasil diperbarui!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal menyimpan program.";
      notyfError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (programId) => {
    const count = programCounts[programId] || 0;
    
    if (count > 0) {
      Swal.fire({
        icon: "error",
        title: "Aksi Ditolak",
        text: `Program ini tidak dapat dihapus karena sudah memiliki ${count} pendaftar. Menghapus program ini akan merusak integritas data pendaftaran.`,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus Program?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/programs/${programId}`);
        notyfSuccess("Program berhasil dihapus.");
        fetchData();
      } catch (error) {
        notyfError("Gagal menghapus program.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Program</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola program pendidikan dan kuota pendaftaran.</p>
        </div>
        <button
          onClick={() => handleOpenModal("create")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          Tambah Program
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold tracking-wide">
                <th className="py-4 px-6">Nama Program</th>
                <th className="py-4 px-6">Biaya</th>
                <th className="py-4 px-6">Kuota</th>
                <th className="py-4 px-6 text-center">Pendaftar</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    Tidak ada data program ditemukan.
                  </td>
                </tr>
              ) : (
                programs.map((program) => {
                  const count = programCounts[program.id] || 0;
                  const isFull = count >= program.kuota;
                  return (
                    <tr key={program.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800">{program.nama_program}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs" title={program.deskripsi}>
                          {program.deskripsi}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Rp {Number(program.biaya_pendaftaran).toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {program.kuota} Siswa
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-sm font-medium border ${isFull ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                          {count}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenModal("edit", program)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Edit Program"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(program.id)}
                          disabled={count > 0}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          title={count > 0 ? "Tidak dapat dihapus (ada pendaftar)" : "Hapus Program"}
                        >
                          <Trash2 size={16} />
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        title={modalMode === "create" ? "Tambah Program Baru" : "Edit Program"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Program</label>
            <input
              type="text"
              name="nama_program"
              value={formData.nama_program}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Biaya (Rp)</label>
              <input
                type="number"
                name="biaya_pendaftaran"
                value={formData.biaya_pendaftaran}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Kuota</label>
              <input
                type="number"
                name="kuota"
                value={formData.kuota}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting && <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>}
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProgramManagement;
