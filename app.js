import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  getFirestore, doc, getDoc, setDoc, runTransaction, serverTimestamp,
  collection, addDoc, query, where, onSnapshot, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig, ADMIN_UID } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const badges = [
  {id:"shield-lime",icon:"🛡️",label:"Yeşil Kalkan"},
  {id:"lion-gold",icon:"🦁",label:"Altın Aslan"},
  {id:"eagle-blue",icon:"🦅",label:"Mavi Kartal"},
  {id:"wolf-red",icon:"🐺",label:"Kızıl Kurt"},
  {id:"crown-purple",icon:"👑",label:"Mor Taç"},
  {id:"falcon-silver",icon:"🦅",label:"Gümüş Şahin"},
  {id:"dragon-teal",icon:"🐉",label:"Turkuaz Ejder"},
  {id:"tiger-orange",icon:"🐯",label:"Turuncu Kaplan"},
  {id:"star-navy",icon:"🌟",label:"Lacivert Yıldız"},
  {id:"phoenix-red",icon:"🔥",label:"Ateş Anka"},
  {id:"bull-black",icon:"🐂",label:"Siyah Boğa"},
  {id:"comet-cyan",icon:"☄️",label:"Buz Kuyruklu Yıldız"}
];

const $ = (id) => document.getElementById(id);
const welcome = $("welcome");
const authSection = $("auth-section");
const dashboard = $("dashboard");
const statusMessage = $("status-message");
let statusTimer;

function showMessage(message, type="success") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => statusMessage.classList.add("hidden"), 5500);
}
function firebaseError(error) {
  const messages = {
    "auth/email-already-in-use":"Bu e-posta adresiyle zaten bir hesap var.",
    "auth/invalid-email":"E-posta adresini kontrol et.",
    "auth/weak-password":"Şifre en az 6 karakter olmalı.",
    "auth/invalid-credential":"E-posta veya şifre hatalı.",
    "auth/network-request-failed":"Bağlantı hatası. İnternetini kontrol et.",
    "permission-denied":"Firestore izni reddedildi. Güvenlik kurallarını kontrol et.",
    "already-exists":"Bu kullanıcı adı alınmış."
  };
  return messages[error.code] || `İşlem tamamlanamadı: ${error.message || error.code || "Bilinmeyen hata"}`;
}
function setBusy(form, busy) {
  const button=form.querySelector('button[type="submit"]');
  if(button){button.disabled=busy;button.dataset.original ||= button.textContent;button.textContent=busy?"Lütfen bekle…":button.dataset.original;}
}
function showLoggedIn(user, profile) {
  welcome.classList.add("hidden");
  authSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  $("display-username").textContent = profile.username;
  $("profile-name").textContent = profile.username;
  const badge = badges.find(b => b.id === profile.badgeId) || badges[0];
  $("chosen-badge").textContent = badge.icon;
  $("chosen-badge").title = badge.label;
  $("admin-panel").classList.toggle("hidden", user.uid !== ADMIN_UID || ADMIN_UID === "ADMIN_UID_BURAYA");
}
function showLoggedOut() {
  welcome.classList.remove("hidden");
  authSection.classList.remove("hidden");
  dashboard.classList.add("hidden");
}
function usernameKey(username) {
  return username.trim().toLowerCase();
}

$("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form=event.currentTarget;
  setBusy(form,true);
  const username=$("signup-username").value.trim();
  const key=usernameKey(username);
  const email=$("signup-email").value.trim();
  const password=$("signup-password").value;
  if(!/^[A-Za-z0-9_]{3,18}$/.test(username)){
    showMessage("Kullanıcı adı 3-18 karakter olmalı; İngilizce harf, sayı ve alt çizgi kullanabilirsin.","error");
    setBusy(form,false); return;
  }
  // Her hesap için rastgele bir sabit arma; hesap oluşturulduktan sonra değiştirilemez.
  const badge=badges[Math.floor(Math.random()*badges.length)];
  let userCredential;
  try {
    userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user=userCredential.user;
    await runTransaction(db, async (tx) => {
      const usernameRef=doc(db,"usernames",key);
      const usernameSnap=await tx.get(usernameRef);
      if(usernameSnap.exists()) throw new Error("USERNAME_TAKEN");
      tx.set(usernameRef,{uid:user.uid,username,createdAt:serverTimestamp()});
      tx.set(doc(db,"users",user.uid),{
        uid:user.uid,username,usernameLower:key,email:user.email,
        badgeId:badge.id,badgeIcon:badge.icon,badgeLabel:badge.label,
        createdAt:serverTimestamp()
      });
    });
    form.reset();
    showMessage("Üyeliğin oluşturuldu. Takım arman hesabına kaydedildi.","success");
  } catch(error) {
    if(error.message==="USERNAME_TAKEN") {
      showMessage("Bu kullanıcı adı zaten kullanılıyor. Başka bir ad seç.","error");
      // Firebase Auth hesabı oluşturuldu ama profil rezervasyonu başarısız olduysa hesap yine giriş yapmış olabilir.
      if(userCredential?.user) {
        try { await userCredential.user.delete(); } catch {}
      }
    } else {
    showMessage(`${error.code || "HATA"}: ${error.message || firebaseError(error)}`, "error");
    }
  } finally { setBusy(form,false); }
});

$("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form=event.currentTarget; setBusy(form,true);
  try {
    await signInWithEmailAndPassword(auth,$("login-email").value.trim(),$("login-password").value);
    form.reset();
  } catch(error) { showMessage(firebaseError(error),"error"); }
  finally { setBusy(form,false); }
});

$("reset-password").addEventListener("click", async () => {
  const email=$("login-email").value.trim();
  if(!email){showMessage("Şifre sıfırlama bağlantısı için önce e-posta alanını doldur.","error");return;}
  try { await sendPasswordResetEmail(auth,email); showMessage("Şifre sıfırlama bağlantısı e-posta adresine gönderildi."); }
  catch(error){showMessage(firebaseError(error),"error");}
});

$("logout-button").addEventListener("click", async () => {
  try { await signOut(auth); showMessage("Çıkış yapıldı."); }
  catch(error){showMessage(firebaseError(error),"error");}
});

onAuthStateChanged(auth, async (user) => {
  if(!user){showLoggedOut();return;}
  try {
    const snap=await getDoc(doc(db,"users",user.uid));
    if(!snap.exists()){
      showMessage("Hesap bulundu ancak profil kaydı eksik. Firebase/Firestore ayarlarını kontrol et.","error");
      showLoggedOut(); return;
    }
    showLoggedIn(user,snap.data());
  } catch(error) {
    showMessage(firebaseError(error),"error");
    showLoggedOut();
  }
});
// Futbol Draft oda sistemi
const createRoomForm = $("create-room-form");
const roomList = $("room-list");

if (createRoomForm && roomList) {
  createRoomForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user || user.uid !== ADMIN_UID) {
      showMessage("Oda oluşturmak için yönetici hesabıyla giriş yapmalısın.", "error");
      return;
    }

    const roomName = $("room-name").value.trim();
    const capacity = Number($("room-capacity").value);

    if (!roomName || capacity < 2 || capacity > 6) {
      showMessage("Oda adını ve oyuncu kapasitesini kontrol et.", "error");
      return;
    }

    const submitButton = createRoomForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      const roomCode = Math.random().toString(36).slice(2, 8).toUpperCase();

      await addDoc(collection(db, "games"), {
        name: roomName,
        code: roomCode,
        capacity,
        status: "waiting",
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        players: [{
          uid: user.uid,
          username: $("display-username").textContent
        }]
      });

      createRoomForm.reset();
      showMessage(`Oda oluşturuldu. Oda kodu: ${roomCode}`);
    } catch (error) {
      showMessage(firebaseError(error), "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  onSnapshot(
    query(collection(db, "games"), where("status", "==", "waiting")),
    (snapshot) => {
      roomList.replaceChildren();

      if (snapshot.empty) {
        roomList.textContent = "Henüz açık oyun odası yok.";
        return;
      }

      snapshot.forEach((roomDoc) => {
        const room = roomDoc.data();
        const item = document.createElement("div");
        item.className = "room-item";

        const title = document.createElement("strong");
        title.textContent = room.name || "İsimsiz oda";

        const details = document.createElement("p");
        details.textContent =
          `Kod: ${room.code || "—"} · Kapasite: ${room.capacity || 2} oyuncu`;

        item.append(title, details);
        roomList.appendChild(item);
      });
    },
    (error) => showMessage(firebaseError(error), "error")
  );
}
