import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Element HTML
// =======================
const form = document.getElementById("formKeuangan");
const tabel = document.getElementById("dataKeuangan");



import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
});

// =======================
// Simpan Data
// =======================
form.addEventListener("submit", async function (e) {
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

    alert("Data berhasil disimpan!");

    form.reset();

    tampilkanData();

} catch (error) {
    console.error("Error Firestore:", error);
    alert(
        "Code : " + error.code +
        "\nMessage : " + error.message
    );
}
});

// =======================
// Tampilkan Data
// =======================
async function tampilkanData() {

    if (!auth.currentUser) return;

    tabel.innerHTML = "";

    const q = query(
        collection(db, "keuangan"),
        where("uid", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    let totalPemasukan = 0;
    let totalPengeluaran = 0;

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        if (data.jenis === "Pemasukan") {
            totalPemasukan += data.nominal;
        } else {
            totalPengeluaran += data.nominal;
        }

        tabel.innerHTML += `
        <tr>
            <td>${data.tanggal}</td>
            <td>${data.jenis}</td>
            <td>${data.keterangan}</td>
            <td>Rp${data.nominal.toLocaleString("id-ID")}</td>
            <td>
                <button onclick="hapusData('${docSnap.id}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalPemasukan").textContent =
        "Rp" + totalPemasukan.toLocaleString("id-ID");

    document.getElementById("totalPengeluaran").textContent =
        "Rp" + totalPengeluaran.toLocaleString("id-ID");

    document.getElementById("saldo").textContent =
        "Rp" + (totalPemasukan - totalPengeluaran).toLocaleString("id-ID");
}
// =======================
// Hapus Data
// =======================
window.hapusData = async function (id) {

    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {

        await deleteDoc(doc(db, "keuangan", id));

        tampilkanData();

    } catch (error) {
        console.error(error);
        alert("Gagal menghapus data.");
    }
};
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    tampilkanData();
});
