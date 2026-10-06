# WasteToWealth — Platform Edukasi, Inovasi & Peta Matchmaking Limbah Industri

> **Status Prototipe / Demo Tester (Client-Side Simulation)**  
> WasteToWealth adalah platform ekonomi sirkular terpadu yang mentransformasi limbah industri lokal menjadi produk bernilai guna dan berdaya ekonomi tinggi. Mengusung pendekatan **5M Kurikulum Merdeka (Mengenali, Mengeksplorasi, Menginovasi, Mengomunikasikan, dan Mengevaluasi)** berlandaskan standar regulasi nasional.

---

## 🌟 Kerangka 5M & Fitur Utama

### 1. Kamus & Literasi Limbah (1M: Mengenali & Memahami)
- Klasifikasi limbah mengacu pada **PP No. 22 Tahun 2021** (Lampiran IX & XIV) dan **Permen LHK No. 19/2021**:
  - **Non-B3 (Dapat Dimanfaatkan Sesuai Kondisi & SOP)**: Ampas tebu, serbuk gergaji kayu sengon/jati, kain perca garmen, ampas kopi industri, kulit singkong tapioka, dll.
  - **Non-B3 Kondisi Khusus & Terdaftar**: Minyak jelantah, Fly Ash & Bottom Ash (FABA PLTU terkontrol).
  - **Khusus / Berbahaya (Limbah B3)**: Oli bekas mesin (B105d), sludge IPAL tekstil (B337-1), aki bekas asam timbal (A102d).
- Rincian lembar keselamatan (*MSDS ringkas*), SOP penanganan, larangan bahaya, APD wajib (*respirator, kacamata goggle, sarung tangan*), dan tautan langsung ke katalog inovasi terkait.

### 2. Pusat Pemanfaatan Limbah Industri (2M: Mengeksplorasi)
- Direktori sentra **Pusat Pemanfaatan Limbah Industri** *(Data Demo Prototipe)* di berbagai kawasan industri.
- Edukasi mesin industri pengolah limbah: *Dual-Shaft Shredder, Extrusion Pelletizer, Mesin Press Hidrolik Paving K-300, Mesin Garnetting Tekstil*.
- **Simulasi Pengajuan Kunjungan Edukatif**: Formulir jadwal kunjungan/study tour yang tersimpan secara lokal ke dalam riwayat akun.

### 3. Marketplace Edukasi & Ide (3M: Menginovasi)
- Katalog panduan langkah-demi-langkah (*blueprint SOP*) produk daur ulang kreatif:
  - *Panel Akustik Peredam Suara Ramah Lingkungan*
  - *Lilin Aromaterapi Mewah dari Jelantah Terpurifikasi*
  - *Bioplastik Ramah Lingkungan dari Pati Kulit Singkong*
  - *Tote Bag & Pouch Etnik Multifungsi Kain Perca*
  - *Bio-Slurry & Pupuk Organik Cair Ampas Kopi*
  - *Paving Block Ramah Lingkungan FABA K-300*
- Simulasi pemutar video tutorial langkah dan kalkulator modal vs estimasi harga jual.
- **Ajukan Inovasi Baru**: Inovator dapat mengajukan rancangan baru dengan status awal *pending* (rating 0 ulasan).
- **Moderasi Admin**: Admin kurator dapat meninjau rincian blueprint (bahan, alat, langkah, tips K3), menyetujui, atau menolak dengan catatan revisi yang dapat diperbaiki dan diajukan ulang oleh pemilik ide.

### 4. Peta Penghubung (4M: Mengomunikasikan / Matchmaking)
- Peta interaktif Leaflet menghubungkan dua sisi ekosistem sirkular:
  - **Penyedia Bahan Baku (Pabrik Industri)**: Menyediakan limbah non-B3 terpilah berkala.
  - **Pencari Bahan Baku (UMKM & Komunitas Daur Ulang)**: Membutuhkan suplai bahan mentah sekunder.
- **Skor Kompatibilitas Cerdas**: Menghitung kesesuaian jenis material, kapasitas volume, dan kecocokan kota/wilayah.
- **Pengajuan Permohonan Kemitraan**: Tersimpan persisten ke sistem data lokal dengan pembagian tab *Semua*, *Permintaan Masuk*, dan *Permintaan Saya*.
- **Privasi Kontak**: Informasi kontak telepon/email hanya terbuka bagi pihak yang terlibat setelah permohonan disetujui.

### 5. Evaluasi & Ulasan Komunitas (5M: Mengevaluasi)
- Penilaian produk aktual pasca praktik pembuatan:
  - *"Apakah produk ini mudah dibuat / digunakan?"*
  - *"Apakah berhasil pembuatannya?"*
- **Kalkulasi Metrik Dinamis**: Rata-rata rating bintang, jumlah ulasan, dan persentase tingkat keberhasilan (*success rate*) dihitung ulang secara otomatis di seluruh katalog berdasarkan ulasan yang masuk.
- Sistem pencegahan spam ulasan ganda dan anti-spam like.

---

## 🚀 Panduan Menjalankan Aplikasi

### Persyaratan Awal
- **Node.js**: Versi 18.x atau yang lebih baru
- **NPM**: Versi 9.x atau yang lebih baru

### 1. Instalasi Dependensi
Jalankan salah satu perintah berikut di direktori proyek:
```bash
npm ci
# atau
npm install
```

### 2. Menjalankan Development Server
```bash
npm run dev
```
Buka browser di alamat yang tertera pada terminal (biasanya `http://localhost:5173/`).

### 3. Menjalankan Pemeriksaan Tipe & Build Produksi
```bash
npm run build
```
File bundle siap rilis akan dihasilkan di folder `dist/`.

---

## ℹ️ Catatan Arsitektur & Ketergantungan Jaringan
1. **Penyimpanan Lokal (Local Persistence)**:
   Aplikasi tester ini menggunakan lapisan mock service API yang menyimpan data ke `localStorage` browser (`w2w_innovations_v2`, `w2w_reviews_v2`, `w2w_supply_requests_v2`, `w2w_facility_bookings_v2`, dll.). Tidak memerlukan backend server terpisah untuk tahap pengujian fungsionalitas ini.
2. **Koneksi Internet**:
   Aplikasi membutuhkan akses internet untuk memuat tile peta OpenStreetMap (`tile.openstreetmap.org`), stylesheet Leaflet, serta web font Inter dari Google Fonts CDN.

---

## 🎨 Desain & UI
- **Design Tokens**: Menggunakan sistem variabel CSS terpadu di `src/index.css` (warna daun alami `#10B981`, `#059669`, `#064E3B`, aksen amber `#F59E0B`).
- **Aksesibilitas**: Label semantik ARIA (`aria-label`, `role="dialog"`, `aria-modal="true"`) pada modal dan kontrol tombol.
- **Responsif**: Layout grid adaptif untuk layar desktop maupun smartphone.
