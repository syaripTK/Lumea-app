import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { notyfSuccess, notyfError } from "../../utils/notyf";
import { UploadCloud, FileImage, X, AlertCircle } from "lucide-react";
import { gsap } from "gsap";

/**
 * EnrollmentForm
 * Handles the enrollment process, including multipart/form-data upload
 * and instant image preview using URL.createObjectURL.
 */
const EnrollmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [isLoadingProgram, setIsLoadingProgram] = useState(true);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);
  const spinnerRef = useRef(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await axiosInstance.get(`/programs/${id}`);
        setProgram(response.data?.data);
      } catch (error) {
        try {
          const res = await axiosInstance.get("/programs");
          const found = res.data?.data?.find(
            (p) => p.id.toString() === id.toString(),
          );
          if (found) setProgram(found);
          else throw new Error("Program tidak ditemukan");
        } catch (err) {
          notyfError("Gagal memuat detail program.");
          navigate("/programs");
        }
      } finally {
        setIsLoadingProgram(false);
      }
    };

    fetchProgramDetails();
  }, [id, navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        notyfError("Harap unggah file berupa gambar (JPG, PNG).");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB
        notyfError("Ukuran file maksimal adalah 5MB.");
        return;
      }

      setFile(selectedFile);

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      notyfError("Mohon lampirkan file Ijazah Anda.");
      return;
    }

    setIsSubmitting(true);

    gsap.to(overlayRef.current, { opacity: 1, display: "flex", duration: 0.3 });
    gsap.fromTo(
      spinnerRef.current,
      { scale: 0.5 },
      { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
    );

    const formData = new FormData();
    formData.append("program_id", id);
    formData.append("ijazah", file);

    try {
      await axiosInstance.post("/pendaftar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notyfSuccess("Pendaftaran berhasil diajukan!");

      setTimeout(() => {
        navigate("/my-enrollments");
      }, 1000);
    } catch (error) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
      setIsSubmitting(false);

      const msg =
        error.response?.data?.message || "Gagal mengirim pendaftaran.";
      notyfError(msg);
    }
  };

  if (isLoadingProgram) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm hidden flex-col items-center justify-center opacity-0"
      >
        <div ref={spinnerRef} className="flex flex-col items-center">
          <div className="relative flex justify-center items-center">
            <div className="absolute animate-ping w-24 h-24 rounded-full bg-blue-500/50"></div>
            <div className="relative w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
            <UploadCloud className="absolute text-blue-500" size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mt-8 tracking-wide">
            Mengunggah Dokumen...
          </h2>
          <p className="text-slate-300 mt-2 text-sm">
            Mohon tunggu, sedang memproses pendaftaran Anda.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Formulir Pendaftaran
        </h1>
        <p className="text-slate-500 mt-2">
          Silakan unggah persyaratan yang diminta untuk mendaftar program.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-blue-100">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-1">
            Mendaftar Untuk
          </h2>
          <h3 className="text-2xl font-bold text-slate-800">
            {program?.nama_program}
          </h3>
          <div className="mt-2 text-slate-600 font-medium">
            Biaya Pendaftaran:{" "}
            <span className="text-slate-900">
              Rp{" "}
              {Number(program?.biaya_pendaftaran || 0).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileImage className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold text-slate-800">
                Dokumen Ijazah
              </h3>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-6">
              <AlertCircle
                className="text-amber-600 shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-sm text-amber-800">
                Dokumen harus asli atau legalisir basah. Gambar harus jelas
                terbaca, tidak terpotong, dan berformat JPG/PNG. Maksimal 5MB.
              </p>
            </div>

            {!previewUrl ? (
              <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-colors relative">
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500 mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <h4 className="text-base font-semibold text-slate-700">
                    Klik atau seret file ke area ini
                  </h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Hanya mendukung format JPG, JPEG, atau PNG
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 group">
                <img
                  src={previewUrl}
                  alt="Preview Ijazah"
                  className="w-full max-h-[500px] object-contain"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg cursor-pointer"
                  >
                    <X size={18} />
                    Hapus Foto
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/programs")}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!file || isSubmitting}
              className="px-8 py-3 rounded-xl font-bold text-white cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Ajukan Pendaftaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
