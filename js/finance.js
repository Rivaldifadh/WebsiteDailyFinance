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

const q = query(
    collection(db, "keuangan"),
    where("uid", "==", auth.currentUser.uid)
);

const snapshot = await getDocs(q);

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

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
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    tanggal: document.getElementById("tanggal").value,
    jenis: document.getElementById("jenis").value,
    keterangan: document.getElementById("keterangan").value,
    nominal: Number(document.getElementById("nominal").value),
  };
