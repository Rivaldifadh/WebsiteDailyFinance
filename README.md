# 💰 Website Daily Finance

**Website Daily Finance** adalah aplikasi web untuk membantu pengguna mencatat dan mengelola pemasukan serta pengeluaran keuangan pribadi secara sederhana dan terstruktur.

Project ini dikembangkan sebagai **prototype sistem informasi pengelolaan keuangan pribadi berbasis web** dengan memanfaatkan **Firebase Authentication** untuk autentikasi pengguna dan **Cloud Firestore** untuk penyimpanan data transaksi.

---

## 📌 Tentang Project

Website Daily Finance dibuat untuk memberikan solusi sederhana bagi pengguna dalam melakukan pencatatan keuangan sehari-hari.

Pengguna dapat membuat akun, melakukan login, mencatat transaksi pemasukan maupun pengeluaran, serta melihat data keuangan yang tersimpan pada database.

Project ini juga menjadi media pembelajaran dalam penerapan:

* HTML
* CSS
* JavaScript
* Firebase Authentication
* Cloud Firestore
* Responsive Web Design

---

## ✨ Fitur

### 🔐 Autentikasi Pengguna

* Registrasi akun menggunakan email dan password
* Login menggunakan email dan password
* Logout
* Reset password melalui email
* Pengelolaan status login pengguna

### 💰 Pengelolaan Keuangan

* Menambahkan transaksi pemasukan
* Menambahkan transaksi pengeluaran
* Menyimpan tanggal transaksi
* Menyimpan keterangan transaksi
* Menyimpan nominal transaksi
* Menampilkan daftar transaksi
* Menghapus transaksi
* Menghitung total pemasukan
* Menghitung total pengeluaran

### ☁️ Firebase

Project menggunakan Firebase sebagai layanan backend:

* **Firebase Authentication** untuk autentikasi pengguna
* **Cloud Firestore** untuk menyimpan data transaksi
* Data transaksi dikaitkan dengan **UID pengguna** sehingga data dapat diidentifikasi berdasarkan akun yang sedang login.

### 📱 Responsive Design

Tampilan website dirancang agar dapat digunakan pada:

* 💻 Desktop
* 📱 Smartphone
* 📲 Tablet

---

## 🛠️ Teknologi yang Digunakan

| Teknologi               | Kegunaan                       |
| ----------------------- | ------------------------------ |
| HTML5                   | Struktur halaman website       |
| CSS3                    | Tampilan dan responsive design |
| JavaScript              | Logika dan interaksi website   |
| Firebase Authentication | Registrasi dan login pengguna  |
| Cloud Firestore         | Penyimpanan data transaksi     |
| Git & GitHub            | Version control dan repository |

---

## 📂 Struktur Project

```text
WebsiteDailyFinance/
│
├── assets/
│   └── ...
│
├── css/
│   └── ...
│
├── js/
│   ├── Authentication.js
│   ├── finance.js
│   └── firebase.js
│
├── dashboard.html
├── facePage.html
├── forgot.html
├── index.html
├── register.html
│
└── README.md
```

### Penjelasan File

**`index.html`**
Halaman utama/login aplikasi.

**`register.html`**
Halaman untuk membuat akun baru.

**`forgot.html`**
Halaman untuk melakukan reset password.

**`facePage.html`**
Halaman utama setelah pengguna berhasil melakukan autentikasi.

**`dashboard.html`**
Halaman dashboard untuk menampilkan dan mengelola data keuangan.

**`js/Authentication.js`**
Mengatur proses registrasi, login, logout, reset password, dan pemantauan status autentikasi.

**`js/finance.js`**
Mengatur proses pencatatan, pengambilan, penampilan, dan penghapusan transaksi keuangan.

**`js/firebase.js`**
Berisi konfigurasi dan inisialisasi Firebase yang digunakan oleh aplikasi.

**`css/`**
Berisi stylesheet untuk mengatur tampilan dan responsive design website.

---

## 🔄 Alur Penggunaan

```text
              ┌─────────────────┐
              │   Halaman Awal  │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  Login / Daftar │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Firebase Auth   │
              └────────┬────────┘
                       │
                 Berhasil Login
                       │
              ┌────────▼────────┐
              │     Dashboard   │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Input Transaksi │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Cloud Firestore │
              └─────────────────┘
```

---

## 🔥 Konfigurasi Firebase

Sebelum menjalankan project, buat project pada Firebase dan aktifkan:

1. Firebase Authentication
2. Email/Password Authentication
3. Cloud Firestore

Kemudian konfigurasi Firebase pada:

```text
js/firebase.js
```

Contoh struktur konfigurasi:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

## 🗄️ Struktur Data Firestore

Data transaksi disimpan di Cloud Firestore dan dapat dikaitkan dengan UID pengguna.

Contoh data transaksi:

```text
keuangan
│
├── document-id-1
│   ├── uid
│   ├── email
│   ├── tanggal
│   ├── jenis
│   ├── keterangan
│   └── nominal
│
├── document-id-2
│   ├── uid
│   ├── email
│   ├── tanggal
│   ├── jenis
│   ├── keterangan
│   └── nominal
```

Penggunaan `uid` memungkinkan aplikasi mengidentifikasi pemilik transaksi berdasarkan akun Firebase Authentication yang sedang login.

---

## 🔒 Keamanan

Aplikasi menggunakan Firebase Authentication untuk memastikan pengguna harus melakukan autentikasi sebelum mengakses fitur keuangan.

Cloud Firestore Security Rules juga perlu digunakan untuk membatasi akses data berdasarkan UID pengguna.

Contoh konsep aturan:

```text
Pengguna Login
      │
      ▼
Firebase Authentication
      │
      ▼
Mendapatkan UID
      │
      ▼
Firestore Rules
      │
      ├── UID sesuai → Izinkan
      │
      └── UID berbeda → Tolak
```

---

## Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan pada versi berikutnya:

* [ ] Edit transaksi
* [ ] Filter transaksi berdasarkan tanggal
* [ ] Filter pemasukan dan pengeluaran
* [ ] Grafik keuangan
* [ ] Laporan keuangan bulanan
* [ ] Export laporan keuangan ke PDF
* [ ] Export data ke Excel
* [ ] Fitur kategori transaksi
* [ ] Pencarian transaksi
* [ ] Dashboard statistik yang lebih lengkap
* [ ] Peningkatan keamanan Firestore Rules

---

## Tujuan Project

Project ini dibuat sebagai prototype untuk mempelajari pengembangan aplikasi web yang terintegrasi dengan layanan backend berbasis cloud.

Selain itu, project ini diharapkan dapat menjadi dasar pengembangan **Sistem Informasi Pengelolaan Keuangan Pribadi Berbasis Web** yang lebih lengkap.

---

## Author

**Rivaldi Fadilah**


## License

Project ini dibuat untuk keperluan pembelajaran dan pengembangan pribadi.

---
