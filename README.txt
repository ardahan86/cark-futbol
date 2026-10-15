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


Yeni draft kuralları:
- İlk 11 mevki yuvaları doğal pozisyona göre otomatik dolar; kaleciden başlama sırası zorunlu değildir.
- Her oyuncu yalnızca kendi ilk 11'indeki boş doğal mevki için futbolcu seçebilir. Sağ ve sol kanat ayrı ilk 11 mevkiidir; stoper ve merkez orta sahada ikişer yuva vardır.
- Bir oyuncu 11 ilk 11 yuvasını tamamlayınca diğer oyuncuların ilk 11'leri tamamlanana kadar sırası otomatik atlanır.
- Bütün ilk 11'ler tamamlanmadan yedek seçimi başlayamaz.
- Yedek aşamasında her oyuncu yedi ayrı yedek grubundan birer futbolcu seçebilir.
- Çarktan gelen takımda oyuncunun o aşamada doldurabileceği boş mevkiye uygun futbolcu yoksa el PAS sayılır.
- PAS, KORUMA, TAKAS ve 30 saniyelik seçim zaman aşımında sıra, ilk 11'ini/kadrosunu tamamlamış oyuncuları otomatik atlayarak ilerler.
