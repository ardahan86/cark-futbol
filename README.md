# Çark Futbol – Koruma ve takas düzeltmesi

Bu yama yalnızca `app.js` ve açıklama dosyalarını içerir. `players.json`, `firebase-config.js`, `index.html`, `styles.css` veya Firestore kurallarını değiştirmez.

## Kurulum
1. ZIP içindeki `app.js` dosyasını GitHub deposundaki mevcut `app.js` ile değiştir.
2. `players.json`, `firebase-config.js` ve diğer çalışan dosyalara dokunma.
3. Siteyi açıp `Ctrl+F5` ile önbelleği yenile.
4. Yeni bir test odasında en az iki oyuncuyla akışı dene.

## Akış
- Kadrolar tamamlanınca koruma aşaması açılır.
- Herkes koruma seçimini tamamladığında takas aşaması aynı anda açılır.
- Her oyuncu takas taleplerini oluşturup onaylar.
- Herkes onaylamadan takaslar uygulanmaz.
- Bir oyuncu herhangi bir takas talebinde birden fazla kez kullanılmışsa o futbolcuyla ilişkili talepler iptal edilir; ilgili haklar harcanır.
- Korunan oyuncuya yönelen takas iptal edilir ve talep hakkı geri verilmez.

Bu paket için JavaScript sözdizimi kontrolü yapılmıştır. Gerçek Firebase projesinde canlı test yapılmamıştır.
