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

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

  try {
    await addDoc(collection(db, "keuangan"), transaksi);

    alert("Data berhasil disimpan.");

    form.reset();

    tampilkanData();
  } catch (error) {
    alert("Data gagal disimpan. Silakan coba kembali.");
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
      where("uid", "==", auth.currentUser.uid),
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
                    <td>
                        Rp ${nominal.toLocaleString("id-ID")}
                    </td>
                    <td>
                        <button
                            class="hapus"
                            onclick="hapusData('${docSnap.id}')">
                            Hapus
                        </button>
                        <button
                            class="update"
                            onclick="updateData('${docSnap.id}')">
                            update
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
    alert("Data keuangan gagal dimuat. Silakan coba kembali.");
  }
}

// =======================
// Update Data
// =======================
window.updateData = async (id) => {
  const tanggal = prompt("Masukkan tanggal baru:");
  const jenis = prompt("Masukkan jenis baru (Pemasukan/Pengeluaran):");
  const keterangan = prompt("Masukkan keterangan baru:");
  const nominal = prompt("Masukkan nominal baru:");

  // Jika pengguna membatalkan
  if (
    tanggal === null ||
    jenis === null ||
    keterangan === null ||
    nominal === null
  ) {
    return;
  }

  // Validasi data
  if (!tanggal || !jenis || !keterangan || !nominal) {
    alert("Semua data harus diisi.");
    return;
  }

  if (!confirm("Yakin ingin memperbarui data ini?")) {
    return;
  }

  try {
    await updateDoc(doc(db, "keuangan", id), {
      tanggal: tanggal,
      jenis: jenis,
      keterangan: keterangan,
      nominal: Number(nominal)
    });

    alert("Data berhasil diperbarui.");

    tampilkanData();

  } catch (error) {
    console.error("Error update:", error);
    alert("Data gagal diupdate. Silakan coba kembali.");
  }
};

// =======================
// Hapus Data
// =======================
window.hapusData = async (id) => {
  if (!confirm("Yakin ingin menghapus data ini?")) {
    return;
  }

  try {
    await deleteDoc(doc(db, "keuangan", id));

    tampilkanData();
  } catch (error) {
    alert("Data gagal dihapus. Silakan coba kembali.");
  }
};

