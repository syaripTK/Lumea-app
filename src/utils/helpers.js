/**
 * helpers.js
 * ---------------------
 * Kumpulan fungsi utilitas umum yang digunakan di seluruh aplikasi.
 * Berisi formatter tanggal, mata uang, generator ID unik, dan truncate teks.
 */

export const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const baseUrl = import.meta.env.VITE_API_URL;
  // Ambil hanya nama filenya jika path berupa path lengkap dari database
  const cleanPath = path.replace(/\\/g, "/").split("/").pop();
  return `${baseUrl}/uploads/${cleanPath}`;
};
