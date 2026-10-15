ÇARK FUTBOL - GÜNCELLENEN DOSYALAR

Bu pakette:
- Misafir kullanıcı adı + oda kodu formu
- Oda kodu ile odaya katılma
- Dizilişin 4-2-3-1 olarak sabitlenmesi
- Mevki gruplarına göre ilk 11 seçim kutuları ve 7 yedek yuvası
- 300 futbolculuk players.json (veri değerleri değiştirilmedi)

ÖNEMLİ YÜKLEME TALİMATI:
GitHub deposunda yalnızca index.html ve app.js dosyalarını bu pakettekilerle değiştirin.
styles.css ve players.json bu pakette uyumluluk için bulunur; değiştirmek zorunda değilsiniz.
firebase-config.js dosyasını bu paketten yüklemeyin/değiştirmeyin; kendi Firebase API anahtarlarınız ve ADMIN_UID değerinizin bulunduğu mevcut dosyayı koruyun.
firestore.rules dosyasını da değiştirmeyin.

Uygulama GitHub Pages üzerinde canlı Firebase projesiyle uçtan uca test edilmemiştir. Yükleme sonrası misafir girişi, oda kodu ve draft işlemleri test edilmelidir.

Güncelleme: Oda kodları 6 rakamdan oluşur. Katılım alanı yalnızca rakam kabul eder. Çarkta kulüp geldikten sonra futbolcu seçimi için 30 saniye verilir; süre dolarsa seçim PAS sayılır ve sıra sonraki oyuncuya geçer.
