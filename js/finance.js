import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

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
localStorage.clear();

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

    // Mendukung field huruf kecil maupun huruf besar
    const tanggal = item.tanggal ?? item.Tanggal ?? "-";
    const jenis = item.jenis ?? item.Jenis ?? "-";
    const keterangan = item.keterangan ?? item.Keterangan ?? "-";
    const nominal = Number(item.nominal ?? item.Nominal ?? 0);

    if (jenis === "Pemasukan") {
      pemasukan += nominal;
    } else {
      pengeluaran += nominal;
    }

    tabel.innerHTML += `
      <tr>
        <td>${tanggal}</td>
        <td>${jenis}</td>
        <td>${keterangan}</td>
        <td>Rp ${nominal.toLocaleString("id-ID")}</td>
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
    "Rp " + pemasukan.toLocaleString("id-ID");

  document.getElementById("totalPengeluaran").textContent =
    "Rp " + pengeluaran.toLocaleString("id-ID");

  document.getElementById("saldo").textContent =
    "Rp " + (pemasukan - pengeluaran).toLocaleString("id-ID");
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
