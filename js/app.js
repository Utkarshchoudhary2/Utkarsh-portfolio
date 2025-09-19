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
function initFirebaseCompat(){ try{ if(window.firebase && !window.__FIREBASE_APP_INITIALIZED){ firebase.initializeApp(window.__FIREBASE_CONF); window.__FIREBASE_APP_INITIALIZED=true; } }catch(e){console.error(e);} }
function showToast(text, ok=true){ const wrap=document.getElementById('toast-wrap')||(function(){const d=document.createElement('div');d.id='toast-wrap';document.body.appendChild(d);return d;})(); const t=document.createElement('div'); t.className='toast'; t.textContent=text; if(!ok) t.style.background='linear-gradient(90deg,#ff9b9b,#ff8b8b)'; wrap.appendChild(t); setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),400); }, 3000); }
function getAuth(){ initFirebaseCompat(); return firebase.auth(); }
function setPersistence(remember){ const auth=getAuth(); if(!auth) return Promise.resolve(); try{ if(remember) return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);}catch(e){return Promise.resolve();} }
function isValidEmail(e){ return /\S+@\S+\.\S+/.test(e); }

// UI: tabs
document.getElementById('tab-login').addEventListener('click', ()=>{ document.getElementById('login-form').style.display='block'; document.getElementById('signup-form').style.display='none'; });
document.getElementById('tab-signup').addEventListener('click', ()=>{ document.getElementById('login-form').style.display='none'; document.getElementById('signup-form').style.display='block'; });

// signup
document.getElementById('signupBtn').addEventListener('click', function(ev){ ev.preventDefault(); const fullName=document.getElementById('fullname').value.trim(); const email=document.getElementById('email').value.trim(); const pw=document.getElementById('password').value; const confirm=document.getElementById('confirmPassword').value; if(!fullName){ showToast('Enter full name', false); return;} if(!isValidEmail(email)){ showToast('Enter valid email', false); return;} if(pw.length<6){ showToast('Password min 6 chars', false); return;} if(pw!==confirm){ showToast('Passwords do not match', false); return;} const auth=getAuth(); auth.createUserWithEmailAndPassword(email,pw).then(res=>{ const user=res.user; if(user){ user.updateProfile({ displayName: fullName }).catch(()=>{}); user.sendEmailVerification().then(()=>{ showToast('📩 Verification email sent'); auth.signOut(); setTimeout(()=> window.location.href='verify.html',700); }).catch(()=> showToast('Could not send verification', false)); } }).catch(err=> showToast(err.message||'Signup failed', false)); });

// login
document.getElementById('loginBtn').addEventListener('click', function(ev){ ev.preventDefault(); const email=document.getElementById('login-email').value.trim(); const pw=document.getElementById('login-password').value; const remember=document.getElementById('rememberMe').checked; if(!isValidEmail(email)||!pw){ showToast('Enter email & password', false); return;} setPersistence(remember).then(()=>{ const auth=getAuth(); auth.signInWithEmailAndPassword(email,pw).then(res=>{ const user=res.user; if(user && !user.emailVerified){ auth.signOut(); showToast('⚠️ Please verify your email first', false); setTimeout(()=> window.location.href='verify.html',700); return; } showToast('✅ Login successful'); setTimeout(()=> window.location.href='home.html',600); }).catch(err=> showToast(err.message||'Login failed', false)); }); });

// reset (simple)
document.getElementById('resetBtn').addEventListener('click', function(ev){ ev.preventDefault(); const email=document.getElementById('login-email').value.trim(); if(!isValidEmail(email)){ showToast('Enter email to reset', false); return;} getAuth().sendPasswordResetEmail(email).then(()=> showToast('✉️ Reset email sent')).catch(err=> showToast('Reset failed', false)); });

// resend verification with cooldown
let resendCooldown = 0;
const RESEND_WAIT = 60;
document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'resendVerify'){
    const auth=getAuth();
    const user = auth.currentUser;
    if(!user){ showToast('Please login first then resend', false); return; }
    if(resendCooldown>0){ showToast('Wait '+resendCooldown+'s to resend', false); return; }
    user.sendEmailVerification().then(()=>{ showToast('📩 Verification email resent'); resendCooldown=RESEND_WAIT; const btn=document.getElementById('resendVerify'); btn.disabled=true; const timer=setInterval(()=>{ resendCooldown--; btn.textContent='Resend ('+resendCooldown+'s)'; if(resendCooldown<=0){ clearInterval(timer); btn.textContent='Resend verification'; btn.disabled=false;} },1000); }).catch(()=> showToast('Resend failed', false));
  }
});

// logout
document.addEventListener('click', function(e){
  if(e.target && (e.target.id==='logoutBtn' || e.target.id==='logoutBtn2' || e.target.id==='logoutBtn3')){
    const auth=getAuth(); auth.signOut().then(()=>{ showToast('👋 Logged out successfully'); document.body.style.transition='opacity .45s ease'; document.body.style.opacity='0.4'; setTimeout(()=> window.location.href='index.html',600); }).catch(()=> showToast('Logout failed', false));
  }
});

// modal open/close + access control
function openModalIfAuth(modalId){
  initFirebaseCompat(); const auth=firebase.auth(); const user=auth.currentUser;
  if(!user){ showToast('⚠️ Please log in or sign up to access this section.', false); setTimeout(()=> window.location.href='index.html',600); return; }
  if(!user.emailVerified){ showToast('⚠️ Please verify your email first.', false); setTimeout(()=> window.location.href='verify.html',700); return; }
  openModal(modalId);
}
function openModal(modalId){ const backdrop=document.getElementById('modal-backdrop'); const modal=document.getElementById(modalId); if(backdrop && modal){ backdrop.classList.add('show'); modal.style.display='block'; backdrop.setAttribute('aria-hidden','false'); if(modalId==='modal-resume'){ showToast('📄 Resume loaded successfully'); } } }
function closeModal(modalId){ const backdrop=document.getElementById('modal-backdrop'); const modal=document.getElementById(modalId); if(backdrop && modal){ modal.style.display='none'; const anyVisible=Array.from(document.querySelectorAll('.modal')).some(m=>m.style.display==='block'); if(!anyVisible) backdrop.classList.remove('show'); backdrop.setAttribute('aria-hidden','true'); } }
function openResumeIfAuth(){ openModalIfAuth('modal-resume'); } function openProjectsIfAuth(){ openModalIfAuth('modal-projects'); }

// resume download
document.addEventListener('click', function(e){ if(e.target && e.target.id==='download-resume'){ const a=document.createElement('a'); a.href='assets/Utkarsh_Modern_Resume.pdf'; a.download='Utkarsh_Modern_Resume.pdf'; document.body.appendChild(a); a.click(); a.remove(); } });

// projects demos created as static files already
