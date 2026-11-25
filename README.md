# QueenFurni — Web Katalog & Penjualan Furnitur Modern

Aplikasi web e-commerce furnitur modern berbasis **Node.js** dan **Express.js** yang dirancang untuk menampilkan kurasi koleksi furnitur rumah tangga dengan antarmuka bersih, responsif, dan bernuansa *warm earth-tone*.

**Live Demo:** [https://project-4-web-furniture-sederhana.vercel.app/](https://project-4-web-furniture-sederhana.vercel.app/)  
**Repository:** [https://github.com/nyndaa/Project-4-Web-Furniture-Sederhana](https://github.com/nyndaa/Project-4-Web-Furniture-Sederhana)

---

## Fitur Utama

- **Halaman Beranda (`/`):** Menampilkan *hero banner* utama, sorotan produk pilihan yang dirender dinamis dari data JSON, keunggulan layanan, serta testimoni pelanggan.
- **Katalog & Pencarian Interaktif (`/katalog`):** Dilengkapi fitur pencarian produk secara *real-time* berdasarkan kata kunci dan filter kategori (Semua, Sofa, Kursi, Meja, Lemari, Rak, Tempat Tidur, dan Lampu Tidur).
- **Keranjang Belanja (`/keranjang`):** Manajemen item belanja beserta ringkasan total pembayaran.
- **Tentang Kami (`/tentang-kami`):** Halaman profil dan filosofi desain *QueenFurni* bergaya editorial.
- **Kontak & Informasi Toko (`/kontak`):** Informasi alamat ruang pamer, jam operasional, kontak layanan pelanggan, dan formulir pesan langsung.
- **Modular View Architecture:** Pemisahan komponen antarmuka (`navbar.html` dan `footer.html`) yang digabungkan secara dinamis melalui *routing* server Express.

---

## Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Font Awesome
- **Penyimpanan Data:** Local JSON (`data/products.json`)
- **Package Manager:** pnpm / npm
- **Deployment:** Vercel

---

## Struktur Proyek

```text
Project-4-Web-Furniture-Sederhana/
├── data/
│   └── products.json        # Data daftar produk furnitur
├── public/
│   ├── image/               # Aset gambar produk, banner, dan testimoni
│   └── style.css            # Stylesheet utama aplikasi
├── views/
│   ├── footer.html          # Komponen footer modular
│   ├── index.html           # Halaman utama (Home)
│   ├── katalog.html         # Halaman katalog dengan filter & pencarian
│   ├── keranjang.html       # Halaman keranjang belanja
│   ├── kontak.html          # Halaman informasi & formulir kontak
│   ├── navbar.html          # Komponen navigasi utama
│   └── TentangKami.html     # Halaman profil brand QueenFurni
├── package.json             # Konfigurasi dependensi proyek
├── pnpm-lock.yaml           # Lockfile dependensi pnpm
├── server.js                # Entry point server Express & routing halaman
└── README.md                # Dokumentasi proyek
```

---

## Cara Mengakses & Menjalankan Proyek

### 1. Akses Langsung (Online)
Buka tautan berikut melalui browser tanpa perlu instalasi:
> [https://project-4-web-furniture-sederhana.vercel.app/](https://project-4-web-furniture-sederhana.vercel.app/)

### 2. Menjalankan di Komputer Lokal (Local Development)

Pastikan **Node.js** sudah terpasang di perangkat Anda, lalu ikuti langkah berikut:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/nyndaa/Project-4-Web-Furniture-Sederhana.git
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd Project-4-Web-Furniture-Sederhana
   ```

3. **Install dependensi:**
   Gunakan `pnpm` (direkomendasikan sesuai lockfile) atau `npm`:
   ```bash
   pnpm install
   ```
   atau
   ```bash
   npm install
   ```

4. **Jalankan server:**
   ```bash
   node server.js
   ```

5. **Buka di browser:**
   Akses alamat berikut pada browser Anda:
   ```text
   http://localhost:3000
   ```

---

## Daftar Rute Halaman

| Rute URL | File View | Keterangan |
| :--- | :--- | :--- |
| `/` | `views/index.html` | Halaman utama & produk unggulan |
| `/katalog` | `views/katalog.html` | Katalog lengkap dengan filter kategori & pencarian |
| `/keranjang` | `views/keranjang.html` | Halaman daftar belanja & ringkasan transaksi |
| `/tentang-kami` | `views/TentangKami.html` | Profil, filosofi desain, dan nilai brand |
| `/kontak` | `views/kontak.html` | Alamat showroom & formulir kirim pesan |

---

## Pengembang

Dikembangkan oleh **Raharjian Sustanadia Wijayanti**  
GitHub: [@nyndaa](https://github.com/nyndaa)