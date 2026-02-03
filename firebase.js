import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { 
  getFirestore, collection, addDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "ضع_apiKey_هنا",
  authDomain: "dz-gram.firebaseapp.com",
  projectId: "dz-gram",
  storageBucket: "dz-gram.appspot.com",
  messagingSenderId: "975512793382",
  appId: "1:975512793382:web:1867177f0e316fdb2191e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// إظهار / إخفاء كلمة المرور
window.togglePassword = function() {
  const p1 = document.getElementById("password");
  const p2 = document.getElementById("confirmPassword");
  p1.type = p1.type === "password" ? "text" : "password";
  p2.type = p2.type === "password" ? "text" : "password";
};

// تسجيل بالبريد
window.registerEmail = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if(password !== confirm){
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("تم إنشاء الحساب ✅"))
    .catch(e => alert(e.message));
};

// تسجيل الدخول
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("تم الدخول ✅"))
    .catch(e => alert(e.message));
};

// تسجيل برقم الهاتف
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {size:'normal'});

window.sendCode = function(){
  const phone = document.getElementById("phone").value;
  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("تم إرسال الرمز 📩");
    })
    .catch(e => alert(e.message));
};

window.verifyCode = function(){
  const code = document.getElementById("smsCode").value;
  window.confirmationResult.confirm(code)
    .then(() => alert("تم التسجيل بالهاتف ✅"))
    .catch(e => alert("رمز غير صحيح"));
};

// رفع الصور
document.getElementById("uploadBtn").addEventListener("click", async () => {
  const file = document.getElementById("postImage").files[0];
  if(!file){ alert("اختر صورة"); return; }

  const storageRef = ref(storage, "posts/" + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "posts"), { imageUrl: url, timestamp: Date.now() });
  document.getElementById("uploadMessage").innerText = "تم رفع الصورة ✅";
  loadPosts();
});

// تحميل البوستات
async function loadPosts(){
  const container = document.getElementById("postsContainer");
  const postsSnapshot = await getDocs(collection(db, "posts"));
  let html = '';
  postsSnapshot.forEach(doc => {
    const data = doc.data();
    html += `
      <div class="post">
        <img src="${data.imageUrl}" alt="post">
        <div class="actions">❤️ 💬 🔄</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// إظهار feed بعد تسجيل الدخول
onAuthStateChanged(auth, user => {
  if(user){
    document.getElementById('auth').style.display = "none";
    document.getElementById('feed').style.display = "block";
    loadPosts();
  } else {
    document.getElementById('auth').style.display = "block";
    document.getElementById('feed').style.display = "none";
  }
});
