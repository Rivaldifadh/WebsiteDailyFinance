import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

// =======================
// Firebase Configuration
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyDeRGq8Ax6VkjrDJ4zBVUJb3ip2OUYugJw",
  authDomain: "websitedailyfinance.firebaseapp.com",
  projectId: "websitedailyfinance",
  storageBucket: "websitedailyfinance.firebasestorage.app",
  messagingSenderId: "131234044538",
  appId: "1:131234044538:web:67c5dc8e23fd15e88939c3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =======================
// Element HTML
// =======================
const form = document.getElementById("formKeuangan");
const tabel = document.getElementById("dataKeuangan");

// =======================
// Tampilkan data saat website dibuka
// =======================
tampilkanData();

// =======================
// Simpan Data
// =======================
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const transaksi = {
    tanggal: document.getElementById("tanggal").value,
    jenis: document.getElementById("jenis").value,
    keterangan: document.getElementById("keterangan").value,
    nominal: Number(document.getElementById("nominal").value),
  };

  try {
    await addDoc(collection(db, "keuangan"), transaksi);

    form.reset();

    tampilkanData();
  } catch (error) {
    console.error(error);
    alert("Gagal menyimpan data!");
  }
});

// =======================
// Menampilkan Data
// =======================
async function tampilkanData() {
  tabel.innerHTML = "";

  let pemasukan = 0;
  let pengeluaran = 0;

  const snapshot = await getDocs(collection(db, "keuangan"));

  snapshot.forEach((docs) => {
    const item = docs.data();

    if (item.jenis === "Pemasukan") {
      pemasukan += item.nominal;
    } else {
      pengeluaran += item.nominal;
    }

    tabel.innerHTML += `

        <tr>

            <td>${item.tanggal}</td>

            <td>${item.jenis}</td>

            <td>${item.keterangan}</td>

            <td>Rp ${item.nominal.toLocaleString()}</td>

            <td>

                <button
                    class="hapus"
                    onclick="hapusData('${docs.id}')">

                    Hapus

                </button>

            </td>

        </tr>

        `;
  });

  document.getElementById("totalPemasukan").textContent =
    "Rp " + pemasukan.toLocaleString();

  document.getElementById("totalPengeluaran").textContent =
    "Rp " + pengeluaran.toLocaleString();

  document.getElementById("saldo").textContent =
    "Rp " + (pemasukan - pengeluaran).toLocaleString();
}

// =======================
// Hapus Data
// =======================
window.hapusData = async function (id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    await deleteDoc(doc(db, "keuangan", id));

    tampilkanData();
  }
};
