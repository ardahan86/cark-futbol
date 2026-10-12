ÇARK FUTBOL — PROJE PAKETİ
==========================

İçindekiler
- index.html: Giriş, oda listesi, oyun odası, çark, kadro, taktik, lig merkezi
- app.js: Firebase Auth/Firestore bağlantısı, ülke çarkı, sıra sistemi, oyuncu seçimi, kadro ve lig simülasyonu
- styles.css: Responsive arayüz
- firebase-config.js: Firebase web yapılandırma şablonu (kendi proje bilgilerinle doldurulmalı)
- firestore.rules: Firestore güvenlik kuralları
- players.json: Belirlediğimiz yeni puanlama dosyasından çıkarılan tam 180 kişilik havuz

ÖNEMLİ: Firebase bağlantısı doldurulmadan canlı site veritabanına bağlanamaz.

KURULUM
1. firebase-config.js dosyasını aç.
2. Firebase Console > Project settings > General > Your apps > SDK setup and configuration bölümünden web uygulamasının config değerlerini al ve BURAYA_... alanlarına yaz.
3. ADMIN_UID satırındaki UID, Çark Futbol projesindeki yönetici hesabının UID'si olmalı. Önceki projede kullanılan yönetici UID'si: niWBY7pf8FbJG76yqsv219dMEdR2. Eğer yeni Firebase projesindeki yönetici hesabının UID'si farklıysa kendi UID'nle değiştir.
4. Firebase Authentication > Sign-in method bölümünde Email/Password açık olsun.
5. Firestore Database oluştur.
6. firestore.rules içeriğini Firebase Console > Firestore Database > Rules bölümüne yapıştırıp Publish et.
7. Bu klasördeki tüm dosyaları GitHub cark-futbol deposunun kök dizinine yükle ve commit et. GitHub Pages açıksa site yayınlanır.
8. Firebase Authentication'da yönetici hesabıyla giriş yap. Admin UID doğruysa oda oluşturma ve lig yönetimi görünür.

OYUN KURALLARI
- 12 ülke ve her ülkede 15 futbolcu, toplam 180 futbolcu.
- Çarkta rastgele ülke gelir; ülke havuzundan seçilen futbolcu ücretsiz alınır.
- Her futbolcu sadece bir takımca seçilebilir.
- Oyuncu başına bir tekrar çevirme ve bir pas hakkı.
- Her takım 18 oyuncu toplar; ilk 11/yedek seçimi ve diziliş/taktik ayarı bulunur.
- Kadrolar tamamlandığında çift devreli lig fikstürü oluşturulur.
- Maçları admin veya oda sahibi tek tek simüle eder; sonuçlar ve puan durumu kaydedilir.

GELİŞTİRME NOTU
Bu paket frontend ve Firestore istemci kodunu içerir. Firestore güvenlik kuralları, istemciden gelen her oyun alanını sunucu tarafında tam doğrulayan bir backend yerine temel erişim sınırları sağlar. Herkese açık rekabetçi kullanım öncesi oda durum geçişleri ve admin maç simülasyonları için Cloud Functions/Callable Functions ile sunucu tarafı doğrulama eklenmesi tavsiye edilir.
