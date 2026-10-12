Milli Takım Draft — düzeltilmiş paket

Dosyalar:
- index.html: Sayfa yapısı düzeltildi; yinelenen status-message kaldırıldı.
- app.js: Üyelik/giriş, yönetici paneli, oda oluşturma, açık odaları listeleme ve Odaya Katıl işlemi.
- styles.css: Bu HTML için stil dosyası.
- firestore.rules: Yeni yönetici UID ve bekleme odasına katılma izinleri.

Kurulum:
1) Mevcut firebase-config.js dosyanı koru; pakette bilerek yok. Firebase ayarların silinmesin.
2) firebase-config.js içindeki ADMIN_UID değeri niWBY7pf8FbJG76yqsv219dMEdR2 olmalı.
3) index.html, app.js ve styles.css dosyalarını GitHub deposunda bu pakettekilerle değiştir ve Commit changes yap.
4) firestore.rules içeriğini Firebase Console > Firestore Database > Rules bölümüne koyup Publish et.
5) Siteyi Ctrl+F5 ile yenile. Yönetici hesabıyla oda oluştur, başka hesapla Odaya Katıl düğmesini dene.

Not: Bu paket mevcut futbolcu veritabanını değiştirmez. Oda sistemi Firestore'da games koleksiyonunu kullanır.
