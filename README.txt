FUTBOL DRAFT — TAM OYUN PAKETİ

Paket; çark/draft, 11 kişilik kadro görünümü, lig/fikstür, puan tablosu ve önceki Futbol Draft sitesindeki maç motoru kodunu içerir.

Dosyalar:
- index.html
- app.js
- styles.css
- players.json
- firestore.rules

ÖNEMLİ PROJE NOTU:
Bu, dünkü Futbol Draft motorunun mevcut kaynak kodunu temel alır. app.js içinde Firebase yapılandırması futbol-draft-f596c projesine aittir. Bugün üzerinde çalıştığımız Milli Takım Draft sitesi farklı Firebase projesi (cark-futbol) ve farklı veri yapısı kullanıyor. Bu nedenle dosyaları mevcut cark-futbol projesine körlemesine yüklemeyin; aksi hâlde kullanıcı hesapları/odalar ayrı projede kalır.
Bu paket motorun tam kaynak kodunu ve arayüzünü bir arada sunar; Firebase projesi ve veri şeması birleştirmesi ayrıca yapılmalıdır.

Maç motoru önceki kaynak dosyadaki teamProfile(), simulateScore(), takım güç/defans/hücum/ülke ve kaptan bonusları, maç istatistikleri ve lig fikstür sonuç akışını korur.
Oyuncu JSON dosyası önceki projedeki kaynak veridir; değiştirilmemiştir.
