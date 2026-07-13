import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// =======================
// REGISTER
// =======================
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validasi
  if (!email || !password || !confirmPassword) {
    alert("Semua field harus diisi.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password dan Konfirmasi Password tidak sama.");
    return;
  }

  try {
    // Membuat akun di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Mengambil data user yang baru dibuat
    const user = userCredential.user;

    // Menyimpan profil user ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",
      createdAt: new Date(),
    });

    alert("Pendaftaran berhasil!");

    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

// =======================
// LOGIN
// =======================
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email dan Password wajib diisi.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login berhasil!");

    window.location.href = "facePage.html";
  } catch (error) {
    alert("Email atau Password salah.");
  }
};

// =======================
// LOGOUT
// =======================
window.logout = async function () {
  try {
    await signOut(auth);

    alert("Logout berhasil.");

    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};

// =======================
// FORGOT PASSWORD
// =======================
window.forgotPassword = async function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Masukkan email terlebih dahulu.");

    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    alert("Link reset password telah dikirim ke email Anda.");
  } catch (error) {
    alert(error.message);
  }
};

// =======================
// CEK STATUS LOGIN
// =======================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User Login :", user.email);
  } else {
    console.log("Belum Login");
  }
});
