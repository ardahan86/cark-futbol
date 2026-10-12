ÇARK FUTBOL — BAŞLANGIÇ DOSYALARI

Bu paket ilk aşamayı içerir:
- E-posta/şifre ile kayıt ve giriş
- Kullanıcı adı ayırma
- Kullanıcıya kalıcı takım arması atama
- Profil ekranı
- Yönetici alanı için UID kontrolü (UID ayarlanınca görünür)
- Başlangıç Firestore kuralları

Henüz ülke çarkı, oda kurma/iptal, futbolcu seçimi, kadro, lig ve maç motoru eklenmedi. Futbolcu veritabanı, yeni Excel dosyan gelene kadar hazırlanmayacak.

ÖNEMLİ
Bu yeni oyun için AYRI bir Firebase projesi oluştur. Önceki Futbol Draft projesinin (futbol-draft-f596c) Firestore Rules bölümüne bu dosyadaki kuralları doğrudan yayımlama; eski oyunun erişimini bozabilir.

GITHUB'A YÜKLEME
1) ZIP dosyasını bilgisayarına indir ve içeriğini bir klasöre çıkar.
2) GitHub'da cark-futbol deposunu aç.
3) Add file > Upload files seçeneğine tıkla.
4) ZIP'ten çıkardığın dosyaların tamamını (index.html, styles.css, app.js, firebase-config.js, firestore.rules, README.txt) yükleme alanına sürükle.
5) Commit changes düğmesine bas.

FIREBASE KURULUMU (sonraki adımda birlikte yapacağız)
1) Firebase Console'da yeni bir proje oluştur ve bir Web App ekle.
2) Web App ayarlarından firebaseConfig değerlerini kopyala; firebase-config.js içindeki BURAYA_... alanlarını değiştir.
3) Authentication > Sign-in method bölümünde Email/Password yöntemini etkinleştir.
4) Firestore Database oluştur. firestore.rules içeriğini Rules sekmesine dikkatlice yerleştir ve Publish et.
5) Kendi hesabını oluşturduktan sonra Firebase Authentication bölümünden UID değerini kopyala.
6) UID'yi app.js içindeki ADMIN_UID ve firestore.rules içindeki ADMIN_UID_BURAYA alanlarına yaz. Firestore Rules'u tekrar Publish et.

GÜVENLİK
- Admin UID'yi app.js ve Firestore Rules içinde aynı gir.
- Firebase web config bilgileri istemci tarafında görünür olabilir; güvenlik Firestore Rules ile sağlanmalıdır.
- Şifreyi hiçbir zaman Firestore profil belgesine yazma.
- Yönetici UID'si ayarlanmadan önce yönetici alanı görünmez.

YAYINLAMA
Dosyalar yüklendikten sonra GitHub deposunda Settings > Pages bölümünden Deploy from a branch seç; branch olarak main, klasör olarak /(root) seç ve kaydet. Firebase bağlantısını yapılandırmadan önce site ekranı görünebilir, ancak kayıt/giriş özellikleri çalışmaz.
