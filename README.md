# Çark Futbol — tam site dosyaları

Bu paket, Çark Futbol'un GitHub Pages üzerinde yayınlanması için gereken site kaynaklarını ve Firestore güvenlik kurallarını içerir.

## Paket içeriği
- `index.html` — giriş, admin paneli, oda listesi, çark, ilk 11, taktikler ve lig arayüzü.
- `styles.css` — site tasarımı.
- `app.js` — Firebase bağlantı kodu, kullanıcı girişleri, oda yönetimi, draft, çark, 30 saniyelik seçim süresi, koruma/takas ve lig simülasyonu.
- `players.json` — güncel 300 futbolculuk veri dosyası. Oyuncu isimleri, kulüpleri ve puanları değiştirilmemiştir.
- `firestore.rules` — Firebase Firestore güvenlik kuralları.
- `firebase-config.example.js` — örnek yapılandırma şablonu; gerçek bağlantı bilgisi değildir.
- `KURALLAR.md` — oyunun uygulanan kurallarının tam listesi.

## Kurulum
1. ZIP'i bilgisayarında aç.
2. GitHub deposu `ardahan86/cark-futbol` kök dizinine `index.html`, `styles.css`, `app.js` ve `players.json` dosyalarını yükle; eski dosyaların üzerine yaz.
3. **Mevcut gerçek `firebase-config.js` dosyanı koru.** Bu paketteki `firebase-config.example.js` dosyasını `firebase-config.js` diye yeniden adlandırıp yükleme. Örnek dosya gerçek anahtarları içermez.
4. Firebase Console → Firestore Database → Rules bölümünde `firestore.rules` içeriğini yayımla.
5. Firestore kurallarındaki yönetici UID'si ile gerçek `firebase-config.js` dosyasındaki `ADMIN_UID` aynı olmalıdır. Bu paketteki kural dosyası mevcut proje için UID `niWBY7pf8FbJG76yqsv219dMEdR2` kullanır.
6. Firebase Authentication içinde Email/Password ve Anonymous sağlayıcıları açık olmalıdır.
7. GitHub Pages dağıtımı tamamlandıktan sonra siteyi `Ctrl + F5` ile yenile.

## Kontrol edilenler
- `app.js` için Node.js JavaScript sözdizimi kontrolü.
- `players.json` için JSON doğrulaması, 300 oyuncu sayısı ve gerekli alanlar.
- HTML'de kullanılan temel arayüz kimliklerinin JavaScript dosyasında bulunması.
- ZIP arşivinin bütünlük kontrolü.

## Sınır
Bu ortamdan senin Firebase projenin canlı oturumuna bağlanıp gerçek admin girişi, oda oluşturma ve misafir katılımını uçtan uca çalıştırmak mümkün değil. Bu nedenle paket için “canlı sistemde hatasız çalıştığı garanti edildi” iddiasında bulunmuyorum. Canlı davranış ayrıca Firebase yapılandırmasına ve yayımlanmış Firestore kurallarına bağlıdır.


Son güncelleme: Futbolcu seçimi zaman sınırı kaldırıldı. Her oyuncu oda oluşturma/katılım sırasında 1 takas hakkıyla başlar; çarktan en fazla 2 ek hak kazanabilir ve toplam üst sınır 3’tür.
