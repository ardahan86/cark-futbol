# Çark Futbol – Koruma ve takas düzeltmesi

GitHub deposundaki yalnızca mevcut `app.js` dosyasını bu paketteki `app.js` ile değiştirin. `players.json`, `firebase-config.js`, `index.html`, `styles.css` ve Firestore kurallarını değiştirmeyin.

Koruma aşamasında birden fazla oyuncu adına tıklayarak toplu seçim yapılır. Seçimler, doğrudan **Koruma seçimini tamamla** düğmesine basıldığında kaydedilir ve oyuncunun aşama onayı tamamlanır. Böylece ayrı bir “Seçilenleri koru” düğmesine basmak gerekmez. Koruma hakkı olmayan oyuncular da aynı düğmeyle aşamayı tamamlar.

Takas aşaması tüm oyuncular koruma aşamasını bitirince eşzamanlı açılır. Takas talepleri herkes onaylayınca birlikte değerlendirilir.

JavaScript syntax check: `node --check app.js` başarılı. Canlı Firebase ortamında test edilmemiştir.
