import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, runTransaction, serverTimestamp, collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig, ADMIN_UID } from "./firebase-config.js";

const app = initializeApp(firebaseConfig), auth = getAuth(app), db = getFirestore(app);
const $ = id => document.getElementById(id);
const badges = [
{id:"shield-lime",icon:"🛡️",label:"Yeşil Kalkan"},{id:"lion-gold",icon:"🦁",label:"Altın Aslan"},
{id:"eagle-blue",icon:"🦅",label:"Mavi Kartal"},{id:"wolf-red",icon:"🐺",label:"Kızıl Kurt"},
{id:"crown-purple",icon:"👑",label:"Mor Taç"},{id:"falcon-silver",icon:"🦅",label:"Gümüş Şahin"},
{id:"dragon-teal",icon:"🐉",label:"Turkuaz Ejder"},{id:"tiger-orange",icon:"🐯",label:"Turuncu Kaplan"},
{id:"star-navy",icon:"🌟",label:"Lacivert Yıldız"},{id:"phoenix-red",icon:"🔥",label:"Ateş Anka"},
{id:"bull-black",icon:"🐂",label:"Siyah Boğa"},{id:"comet-cyan",icon:"☄️",label:"Buz Kuyruklu Yıldız"}];
const status = $("status-message");
let statusTimer, registering = false, roomsUnsubscribe = null;

function showMessage(message,type="success"){
  if(!status)return; status.textContent=message; status.className=`status-message ${type}`;
  clearTimeout(statusTimer); statusTimer=setTimeout(()=>status.classList.add("hidden"),6000);
}
function firebaseError(e){
  const map={"auth/email-already-in-use":"Bu e-posta ile hesap zaten var.","auth/invalid-email":"E-posta adresini kontrol et.","auth/weak-password":"Şifre en az 6 karakter olmalı.","auth/invalid-credential":"E-posta veya şifre hatalı.","auth/network-request-failed":"İnternet bağlantısını kontrol et.","permission-denied":"Firestore izni reddedildi. Kuralları ve Publish işlemini kontrol et."};
  return map[e?.code] || e?.message || e?.code || "Bilinmeyen hata";
}
function busy(form,on){
  const b=form?.querySelector('button[type="submit"]'); if(!b)return;
  if(!b.dataset.original)b.dataset.original=b.textContent;
  b.disabled=on; b.textContent=on?"Lütfen bekle…":b.dataset.original;
}
function loggedOut(){
  $("welcome")?.classList.remove("hidden"); $("auth-section")?.classList.remove("hidden");
  $("dashboard")?.classList.add("hidden"); $("admin-panel")?.classList.add("hidden");
  if(roomsUnsubscribe){roomsUnsubscribe();roomsUnsubscribe=null;}
}
function loggedIn(user,p){
  $("welcome")?.classList.add("hidden"); $("auth-section")?.classList.add("hidden"); $("dashboard")?.classList.remove("hidden");
  $("display-username").textContent=p.username||"Oyuncu"; $("profile-name").textContent=p.username||"Oyuncu";
  const badge=badges.find(b=>b.id===p.badgeId)||badges[0];
  $("chosen-badge").textContent=p.badgeIcon||badge.icon; $("chosen-badge").title=p.badgeLabel||badge.label;
  $("admin-panel")?.classList.toggle("hidden",user.uid!==ADMIN_UID);
  listenRooms();
}
$("signup-form")?.addEventListener("submit",async e=>{
  e.preventDefault(); const form=e.currentTarget; busy(form,true);
  const username=$("signup-username").value.trim(), key=username.toLowerCase(), email=$("signup-email").value.trim(), password=$("signup-password").value;
  if(!/^[A-Za-z0-9_]{3,18}$/.test(username)){showMessage("Kullanıcı adı 3–18 karakter olmalı; harf, sayı ve alt çizgi kullan.","error");busy(form,false);return;}
  const badge=badges[Math.floor(Math.random()*badges.length)]; let cred;
  registering=true;
  try{
    cred=await createUserWithEmailAndPassword(auth,email,password);
    await runTransaction(db,async tx=>{
      const ur=doc(db,"usernames",key), us=await tx.get(ur);
      if(us.exists())throw new Error("USERNAME_TAKEN");
      tx.set(ur,{uid:cred.user.uid,username,createdAt:serverTimestamp()});
      tx.set(doc(db,"users",cred.user.uid),{uid:cred.user.uid,username,usernameLower:key,email:cred.user.email,badgeId:badge.id,badgeIcon:badge.icon,badgeLabel:badge.label,createdAt:serverTimestamp()});
    });
    form.reset(); window.location.reload();
  }catch(err){
    if(err.message==="USERNAME_TAKEN"){showMessage("Bu kullanıcı adı zaten kullanılıyor.","error");if(cred?.user)try{await cred.user.delete()}catch{}}
    else showMessage(`${err.code||"HATA"}: ${firebaseError(err)}`,"error");
  }finally{registering=false;busy(form,false);}
});
$("login-form")?.addEventListener("submit",async e=>{
  e.preventDefault();const f=e.currentTarget;busy(f,true);
  try{await signInWithEmailAndPassword(auth,$("login-email").value.trim(),$("login-password").value);f.reset();}
  catch(err){showMessage(firebaseError(err),"error")}finally{busy(f,false)}
});
$("reset-password")?.addEventListener("click",async()=>{
  const email=$("login-email").value.trim();if(!email){showMessage("Önce e-posta alanını doldur.","error");return}
  try{await sendPasswordResetEmail(auth,email);showMessage("Şifre sıfırlama bağlantısı gönderildi.")}catch(e){showMessage(firebaseError(e),"error")}
});
$("logout-button")?.addEventListener("click",async()=>{if(roomsUnsubscribe){roomsUnsubscribe();roomsUnsubscribe=null}try{await signOut(auth)}catch(e){showMessage(firebaseError(e),"error")}});
onAuthStateChanged(auth,async user=>{
  if(registering)return;if(!user){loggedOut();return}
  try{const s=await getDoc(doc(db,"users",user.uid));if(!s.exists()){showMessage("Bu hesap için kullanıcı profili bulunamadı.","error");loggedOut();return}loggedIn(user,s.data())}
  catch(e){showMessage(firebaseError(e),"error");loggedOut()}
});

$("create-room-form")?.addEventListener("submit",async e=>{
  e.preventDefault();const f=e.currentTarget,user=auth.currentUser;
  if(!user||user.uid!==ADMIN_UID){showMessage("Oda oluşturmak için yönetici hesabıyla giriş yapmalısın.","error");return}
  const name=$("room-name").value.trim(),capacity=Number($("room-capacity").value);
  if(!name||!Number.isInteger(capacity)||capacity<2||capacity>6){showMessage("Oda adını ve 2–6 oyuncu kapasitesini kontrol et.","error");return}
  const b=f.querySelector('button[type="submit"]');if(b)b.disabled=true;
  try{
    const ps=await getDoc(doc(db,"users",user.uid));if(!ps.exists())throw new Error("Yönetici profili bulunamadı.");
    const code=Math.random().toString(36).slice(2,8).toUpperCase();
    await addDoc(collection(db,"games"),{name,code,capacity,status:"waiting",createdBy:user.uid,createdAt:serverTimestamp(),players:[{uid:user.uid,username:ps.data().username||"Yönetici"}]});
    f.reset();showMessage(`Oda oluşturuldu. Oda kodu: ${code}`);
  }catch(err){showMessage(firebaseError(err),"error")}finally{if(b)b.disabled=false}
});

function listenRooms(){
  const list=$("room-list"),user=auth.currentUser;if(!list||!user)return;
  if(roomsUnsubscribe)roomsUnsubscribe();
  roomsUnsubscribe=onSnapshot(query(collection(db,"games"),where("status","==","waiting")),snap=>{
    list.replaceChildren();
    if(snap.empty){const p=document.createElement("p");p.className="muted";p.textContent="Henüz açık oyun odası yok.";list.append(p);return}
    snap.forEach(rd=>{
      const r=rd.data(),players=Array.isArray(r.players)?r.players:[],cap=Number(r.capacity)||2;
      const item=document.createElement("div");item.className="room-item";
      const title=document.createElement("strong");title.textContent=r.name||"İsimsiz oda";
      const info=document.createElement("p");info.className="muted";info.textContent=`Kod: ${r.code||"—"} · Oyuncu: ${players.length}/${cap}`;
      const btn=document.createElement("button");btn.type="button";btn.className="btn btn-primary";
      const joined=players.some(p=>p.uid===user.uid);
      if(joined){btn.textContent="Odadasın";btn.disabled=true}
      else if(players.length>=cap){btn.textContent="Oda dolu";btn.disabled=true}
      else{btn.textContent="Odaya Katıl";btn.addEventListener("click",()=>joinRoom(rd.id,btn))}
      item.append(title,info,btn);list.append(item);
    });
  },e=>showMessage(firebaseError(e),"error"));
}
async function joinRoom(roomId,button){
  const user=auth.currentUser;if(!user){showMessage("Önce giriş yapmalısın.","error");return}button.disabled=true;
  try{
    await runTransaction(db,async tx=>{
      const ref=doc(db,"games",roomId),rs=await tx.get(ref);if(!rs.exists())throw new Error("Oda bulunamadı.");
      const r=rs.data(),players=Array.isArray(r.players)?r.players:[],cap=Number(r.capacity)||2;
      if(r.status!=="waiting")throw new Error("Bu oda artık katılıma açık değil.");
      if(players.some(p=>p.uid===user.uid))throw new Error("Zaten bu odadasın.");
      if(players.length>=cap)throw new Error("Oda dolmuş.");
      const ps=await tx.get(doc(db,"users",user.uid));if(!ps.exists())throw new Error("Kullanıcı profilin bulunamadı.");
      tx.update(ref,{players:[...players,{uid:user.uid,username:ps.data().username||"Oyuncu"}]});
    });showMessage("Odaya başarıyla katıldın.");
  }catch(e){showMessage(firebaseError(e),"error")}finally{button.disabled=false}
}
