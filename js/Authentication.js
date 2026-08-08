import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// =======================
// REGISTER
// =======================
window.register = async function () {
  const email = document.getElementById("email").value.trim();
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
    // Membuat akun Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    // Menyimpan profil pengguna
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",
      createdAt: new Date(),
    });

    alert("Pendaftaran berhasil!");

    window.location.href = "login.html";
  } catch (error) {
    alert("Pendaftaran gagal. Silakan coba kembali.");
  }
};

// =======================
// LOGIN
// =======================
window.login = async function () {
  const email = document.getElementById("email").value.trim();
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

    window.location.href = "register.html";
  } catch (error) {
    alert("Logout gagal. Silakan coba kembali.");
  }
};

// =======================
// FORGOT PASSWORD
// =======================
window.forgotPassword = async function () {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Masukkan email terlebih dahulu.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    alert(
      "Jika email tersebut terdaftar, " + "link reset password akan dikirim.",
    );
  } catch (error) {
    alert(
      "Jika email tersebut terdaftar, " + "link reset password akan dikirim.",
    );
  }
};
