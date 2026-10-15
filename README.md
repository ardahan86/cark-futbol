# Çark Futbol — yeniden düzenlenmiş tam site paketi

## Dosyalar
- `index.html`: giriş, oda katılımı, oda yönetimi, çark, kadro, lig ekranları.
- `styles.css`: arayüz stilleri.
- `app.js`: Firebase, oda, 20 dilimli çark, 30 saniye seçim süresi, ilk 11 draftı, koruma/takas ve lig simülasyonu.
- `players.json`: kullanıcının sağladığı 300 oyunculuk kaynak dosya; oyuncu puanları değiştirilmedi.
- `firestore.rules`: oda oluşturma/kapama admin yetkisi, katılım ve oyun durumu kuralları.
- `firebase-config.example.js`: yalnızca örnek; gerçek `firebase-config.js` yerine yüklenmemelidir.

## En son kurallar
- 2–6 oyuncu, oda kodu tam 6 rakam.
- Oda oluşturma ve kapatma yalnızca admin hesabında.
- 20 dilim: 15 kulüp (`Galatasaray`, `Fenerbahçe`, `Beşiktaş`, `Trabzonspor`, `Barcelona`, `Real Madrid`, `Inter`, `PSG`, `Bayern Münih`, `Manchester City`, `Arsenal`, `Liverpool`, `Atlético Madrid`, `Juventus`, `Manchester United`) + 2 PAS + 2 KORUMA + 1 TAKAS.
- İlk 11: GK, RB, CB, CB, LB, CM, CM, CAM, RW, LW, ST; doğal mevkiye göre otomatik yerleşim. Kaleciden başlama şartı yoktur.
- Yedek seçimi yok. Her oyuncu 11 oyuncusunu tamamlayınca otomatik atlanır; draft tüm ilk 11'ler tamamlanınca biter.
- Kulüp sonucunda boş mevkiye uygun kullanılmamış oyuncu yoksa PAS sayılır. Futbolcu seçimi için 30 saniye; süre dolarsa PAS ve sıra geçer.
- Koruma ve takas hakları en fazla iki kez kazanılır; haklar/korunan futbolcular draft bitene kadar gizli. Takas yalnızca draft bittikten sonra aynı mevkide yapılır. Korumalı oyuncu hedeflenirse hak harcanır ama takas gerçekleşmez.
- Puanlar seçim arayüzünde gösterilmez; maç motorunda kullanılmaya devam eder.
- 4-2-3-1, taktik, çift devreli fikstür, maç simülasyonu ve puan tablosu korunur.

## GitHub'a yükleme
1. ZIP'i aç.
2. `index.html`, `styles.css`, `app.js`, `players.json` dosyalarını GitHub deposunun köküne yükle.
3. `firebase-config.example.js` dosyasını `firebase-config.js` diye yeniden adlandırıp yükleme. Depodaki mevcut ve gerçek Firebase değerlerini içeren `firebase-config.js` dosyasını koru.
4. Firebase Console > Firestore Database > Rules alanına `firestore.rules` içeriğini yapıştırıp yayınla. `isAdmin()` içindeki UID, `firebase-config.js` içindeki `ADMIN_UID` ile aynı olmalıdır.
5. Authentication içinde Anonymous ve Email/Password girişleri etkin olmalıdır.

## Önemli doğrulama notu
Bu paket kod düzeyinde kontrol edildi; senin canlı Firebase projen üzerinde burada uçtan uca test yapılamadı. Özellikle oda oluşturma hatası devam ederse, Firebase Console > Firestore > Rules ve tarayıcı Console'daki hata mesajı belirleyici olur. Gerçek `firebase-config.js` korunmalıdır.
