import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// =======================
// Element HTML
// =======================
const form = document.getElementById("formKeuangan");
const tabel = document.getElementById("dataKeuangan");

// =======================
// Cek Login
// =======================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  console.log("User Login:", user.email);
  console.log("UID:", user.uid);

  tampilkanData();
});

// =======================
// Simpan Data
// =======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("Silakan login terlebih dahulu.");
    return;
  }

  const transaksi = {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    tanggal: document.getElementById("tanggal").value,
    jenis: document.getElementById("jenis").value,
    keterangan: document.getElementById("keterangan").value,
    nominal: Number(document.getElementById("nominal").value),
  };

  console.log("Data yang akan disimpan:", transaksi);

  try {
    await addDoc(collection(db, "keuangan"), transaksi);

    alert("Data berhasil disimpan.");

    form.reset();

    tampilkanData();
  } catch (error) {
    console.error("Error lengkap:", error);
    console.error("Code:", error.code);
    console.error("Message:", error.message);

    alert(
        "Code: " + error.code +
        "\nMessage: " + error.message
    );
}
  }
});

// =======================
// Tampilkan Data
// =======================
async function tampilkanData() {
  if (!auth.currentUser) return;

  tabel.innerHTML = "";

  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  try {
    const q = query(
      collection(db, "keuangan"),
      where("uid", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const nominal = Number(data.nominal || 0);

      if (data.jenis === "Pemasukan") {
        totalPemasukan += nominal;
      } else {
        totalPengeluaran += nominal;
      }

      tabel.innerHTML += `
        <tr>
          <td>${data.tanggal}</td>
          <td>${data.jenis}</td>
          <td>${data.keterangan}</td>
          <td>Rp ${nominal.toLocaleString("id-ID")}</td>
          <td>
            <button
              class="hapus"
              onclick="hapusData('${docSnap.id}')">
              Hapus
            </button>
          </td>
        </tr>
      `;
    });

    document.getElementById("totalPemasukan").textContent =
      "Rp " + totalPemasukan.toLocaleString("id-ID");

    document.getElementById("totalPengeluaran").textContent =
      "Rp " + totalPengeluaran.toLocaleString("id-ID");

    document.getElementById("saldo").textContent =
      "Rp " + (totalPemasukan - totalPengeluaran).toLocaleString("id-ID");

  } catch (error) {
    console.error(error);
  }
}

// =======================
// Hapus Data
// =======================
window.hapusData = async (id) => {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    await deleteDoc(doc(db, "keuangan", id));

    tampilkanData();

  } catch (error) {
    console.error(error);

    alert(
      "Code : " +
        error.code +
        "\nMessage : " +
        error.message
    );
  }
};
