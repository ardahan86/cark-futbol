// Firebase Console > Project settings > Your apps bölümündeki config bilgilerini buraya yapıştır.
export const firebaseConfig = {
  apiKey: "BURAYA_API_KEY",
  authDomain: "BURAYA_PROJECT_ID.firebaseapp.com",
  projectId: "BURAYA_PROJECT_ID",
  storageBucket: "BURAYA_PROJECT_ID.appspot.com",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID",
  appId: "BURAYA_APP_ID"
};

// İlk yönetici hesabını oluşturup giriş yaptıktan sonra Firebase Authentication'dan UID değerini al.
// Aynı UID'yi app.js içindeki ADMIN_UID ve firestore.rules içindeki ADMIN_UID alanlarına yaz.
export const ADMIN_UID = "ADMIN_UID_BURAYA";
