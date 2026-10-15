# Çark Futbol — güncellenmiş sürüm

## İçerik
- `index.html`, `styles.css`, `app.js`: web uygulaması.
- `players.json`: kullanıcının yüklediği `players(8).json` dosyasının aynısı (300 kayıt; kaynak veriye dokunulmadı).
- `firebase-config.js`: Firebase Web uygulama ayarları ve admin UID.
- `firestore.rules`: oda oluşturma/kapama ve gizli koruma kayıtları için Firestore kuralları.

## Kurallar
- Çark 20 dilimden oluşur: 15 kulüp, 2 PAS, 2 KORUMA, 1 TAKAS.
- Kulüp havuzu boşsa seçim yapılmaz ve sıra geçer. Aynı futbolcu iki kadroya seçilemez.
- PAS oyuncu seçmeden sırayı geçirir.
- KORUMA ve TAKAS hakkı kişi başına en fazla iki kez kazanılır; limit dolduktan sonra gelen aynı sonuç PAS sayılır.
- Koruma seçimleri `roomSecrets` koleksiyonunda kullanıcı bazında saklanır; draft tamamlanmadan diğer oyuncular okuyamaz.
- Draft bittikten sonra aynı mevkide takas yapılabilir. Hedef futbolcu korumalıysa hak harcanır, takas yapılmaz.
- Oda oluşturma ve kapatma yalnızca `ADMIN_UID` sahibi yönetici tarafından yapılabilir.
- Mevcut maç simülasyonu, taktik/diziliş, çift devreli fikstür ve puan tablosu kodu korunmuştur. Oyuncu listesinde `technique` ve `rating` alanları bulunmadığı için uygulama içinde maç motoruyla uyumlu türetilmiş alanlar kullanılır; `players.json` değerleri değiştirilmez.

## Firebase kurulumu
1. Firebase Console → Authentication → Sign-in method bölümünde **Anonymous** girişini etkinleştirin.
2. Yönetici hesabının e-posta/şifre ile giriş yapabildiğinden emin olun. Admin UID `niWBY7pf8FbJG76yqsv219dMEdR2` olarak ayarlı.
3. `firebase-config.js` içindeki `BURAYA_API_KEY`, `BURAYA_MESSAGING_SENDER_ID`, `BURAYA_APP_ID` alanlarını kendi `cark-futbol` projenizin Web App config değerleriyle doldurun.
4. Firestore → Rules bölümünde `firestore.rules` içeriğini yayınlayın.
5. Dosyaları GitHub Pages deposuna yükleyin.

> Not: Firebase bağlantısı, canlı Firestore projesine erişim olmadan burada uçtan uca doğrulanamaz. ZIP içindeki config alanları hâlâ yer tutucudur; gerçek değerler eklenmeden site Firebase'e bağlanmaz. Firestore kuralları üyelerin yalnızca belirli oyun alanlarını güncellemesini sağlar; tüm oyun kurallarına karşı sunucu taraflı hile önleme için ayrıca güvenilir backend/Cloud Functions gerekir.


## Kulüp adları düzeltmesi
Çarktaki 15 kulüp adı, `players.json` dosyasındaki `club` alanlarından birebir alınmıştır. Özel dilimler kulüplerin arasına karıştırılmıştır.
