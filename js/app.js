\
// Firebase config (integrated)
window.__FIREBASE_CONF = {
  apiKey: "AIzaSyB1NtsmihmojQsWzOwqRo-286cv12spgdE",
  authDomain: "utkarshchaudhary-portfolio.firebaseapp.com",
  projectId: "utkarshchaudhary-portfolio",
  storageBucket: "utkarshchaudhary-portfolio.firebasestorage.app",
  messagingSenderId: "487685457505",
  appId: "1:487685457505:web:11c6575582ae018bc1cc20",
  measurementId: "G-7V964SHVM1"
};
function initFirebaseCompat(){ try{ if(window.firebase && !window.__FIREBASE_APP_INITIALIZED){ firebase.initializeApp(window.__FIREBASE_CONF); window.__FIREBASE_APP_INITIALIZED=true; console.log('Firebase initialized'); } }catch(e){ console.error(e); } }
function showToast(text, ok=true){ const wrap=document.getElementById('toast-wrap')||(function(){ const d=document.createElement('div'); d.id='toast-wrap'; document.body.appendChild(d); return d; })(); const t=document.createElement('div'); t.className='toast'; t.textContent=text; if(!ok) t.style.background='linear-gradient(90deg,#ff9b9b,#ff8b8b)'; wrap.appendChild(t); setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=> t.remove(),400); }, 3000); }
function getAuth(){ initFirebaseCompat(); return firebase.auth(); }
function isValidEmail(e){ return /\S+@\S+\.\S+/.test(e); }

// Tab switching
document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'tab-login'){
    document.getElementById('login-form').style.display='block';
    document.getElementById('signup-form').style.display='none';
    e.target.classList.add('active');
    document.getElementById('tab-signup').classList.remove('active');
  }
  if(e.target && e.target.id === 'tab-signup'){
    document.getElementById('signup-form').style.display='block';
    document.getElementById('login-form').style.display='none';
    e.target.classList.add('active');
    document.getElementById('tab-login').classList.remove('active');
  }
});




// Login (button-based, no auto form reload)
document.getElementById('loginBtn').addEventListener('click', function(e){
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pw = document.getElementById('login-password').value.trim();
  if(!isValidEmail(email)){ showToast("Enter valid email", false); return; }
  if(pw.length < 6){ showToast("Password too short", false); return; }

  getAuth().signInWithEmailAndPassword(email, pw)
    .then(userCredential => {
      showToast("Login successful!", true);
      setTimeout(()=> window.location.href = "home.html", 1000);
    })
    .catch(err => {
      console.error(err);
      showToast(err.message, false);
    });
});



// Signup (button-based)
document.getElementById('signupBtn').addEventListener('click', function(e){
  e.preventDefault();
  const fullName = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value.trim();
  const cpw = document.getElementById('confirmPassword').value.trim();

  if(!fullName){ showToast("Enter your full name", false); return; }
  if(!isValidEmail(email)){ showToast("Enter valid email", false); return; }
  if(pw.length < 6){ showToast("Password too short", false); return; }
  if(pw !== cpw){ showToast("Passwords do not match", false); return; }

  getAuth().createUserWithEmailAndPassword(email, pw)
    .then(userCredential => {
      showToast("Signup successful!", true);
      setTimeout(()=> window.location.href = "home.html", 1000);
    })
    .catch(err => {
      console.error(err);
      showToast(err.message, false);
    });
});
