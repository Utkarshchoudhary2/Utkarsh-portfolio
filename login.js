import { app } from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email) { alert("Enter your email"); return; }
    if (!password) { alert("Enter your password"); return; }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        window.location.href = "home.html";
      })
      .catch(err => alert("Login failed: " + err.message));
  });
});
