# Lumea - Digital Registration System

![Lumea Banner](https://img.shields.io/badge/Lumea-Education-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

Lumea adalah platform digital modern yang dirancang untuk menyederhanakan proses pendaftaran siswa secara online (PPDB). Dengan antarmuka yang elegan, fitur analitik real-time untuk admin, dan integrasi pembayaran otomatis, Lumea memberikan pengalaman pendaftaran yang transparan, cepat, dan profesional.

## Fitur Utama

### Untuk Siswa
- **Landing Page Interaktif**: Desain premium dengan animasi GSAP yang halus.
- **Pendaftaran Mandiri**: Formulir pendaftaran multi-step yang responsif.
- **Dashboard Siswa**: Pantau status seleksi berkas dan tagihan pendaftaran.
- **Integrasi Pembayaran**: Pembayaran otomatis via **Midtrans Snap** (QRIS, VA, Credit Card, dll).
- **Notifikasi Real-time**: Feedback instan untuk setiap aksi pengguna.

### Untuk Admin
- **Dashboard Analitik**: Visualisasi data pendaftaran menggunakan **Chart.js**.
- **Tren Pendaftaran**: Grafik pertumbuhan pendaftaran bulanan.
- **Manajemen Program**: CRUD program pendidikan, biaya, dan kuota.
- **Verifikasi Berkas**: Proses kurasi dokumen pendaftaran siswa.
- **KPI Cards**: Ringkasan pendapatan, total user, dan pendaftaran dalam satu tampilan.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Animation**: GSAP (GreenSock Animation Platform)
- **Visualisasi Data**: Chart.js & react-chartjs-2
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Komunikasi Data**: Axios Instance
- **UI Components**: Lucide React Icons, Notyf, SweetAlert2
- **Data Wilayah**: Integrasi API Wilayah Indonesia (Emsifa)

## Instalasi & Penggunaan

### Prasyarat
- Node.js (Versi 18 ke atas)
- npm atau yarn

### Langkah-langkah
1. **Clone Repository**
   ```bash
   git clone https://github.com/username/lumea-frontend.git
   cd lumea-frontend
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di direktori root dan masukkan konfigurasi berikut:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_MIDTRANS_CLIENT_KEY=your_client_key_here
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```

## Struktur Proyek

```text
src/
├── components/     # Komponen UI reusable (Navbar, Footer, Hero, dll)
├── hooks/          # Custom React hooks (useMidtransSnap)
├── pages/          # Halaman utama (Home, Login, Dashboard, dll)
├── utils/          # Fungsi utility (axiosInstance, notyf configuration)
├── assets/         # Aset statis (Gambar, Logo)
└── App.jsx         # Konfigurasi Routing
```

## Kontribusi
Lumea terbuka untuk kontribusi. Jika Anda menemukan bug atau ingin menambahkan fitur baru, silakan buka Issue atau kirimkan Pull Request.

---
Developed by Ahmad S Syarip - PeTIK Depok
