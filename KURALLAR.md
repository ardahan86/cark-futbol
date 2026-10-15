# Çark Futbol — oyun kuralları

## 1. Kullanıcılar ve odalar
- Oyuna 2–6 kişi katılabilir.
- Ziyaretçiler üyelik oluşturmadan kullanıcı adı ve oda koduyla katılır.
- Oda kodu yalnızca 6 rakamdan oluşur.
- Oda oluşturma ve oda kapatma yalnızca tanımlı admin hesabına açıktır.
- Oda taslak/draft başlamadan önce katılımcı kabul eder; oda kapasitesi dolduğunda yeni katılımcı alınmaz.
- Oda sahibi veya admin draftı başlatabilir.

## 2. Çark
- Çark 23 dilimden oluşur: 15 kulüp, 2 PAS, 4 KORUMA ve 2 TAKAS.
- Kulüp havuzu adları: Galatasaray, Fenerbahçe, Beşiktaş, Trabzonspor, Barcelona, Real Madrid, Inter, PSG, Bayern Münih, Manchester City, Arsenal, Liverpool, Atlético Madrid, Juventus ve Manchester United.
- Her çevirmede sıra sahibi çarkı bir kez çevirir.
- PAS gelirse oyuncu seçilmez ve sıra sonraki uygun oyuncuya geçer.
- KORUMA hakları kişi başına en fazla 3, TAKAS hakları toplamda en fazla 3 olabilir. Draft başladığında her oyuncuya 1 kullanılabilir takas hakkı otomatik verilir; çarktan kazanılan her TAKAS hakkı bu toplam sınırına dahildir. İlgili hak sınırı dolmuşken aynı dilim gelirse sonuç PAS sayılır.

## 3. Futbolcu seçimi ve ilk 11
- Oyuncu verilerinin kaynağı `players.json` dosyasıdır; puanlar kullanıcı onayı olmadan değiştirilmez.
- Her futbolcu oyun genelinde yalnızca bir kez seçilebilir.
- Çarkta gelen kulüpten, o oyuncunun boş ilk 11 yuvalarından birine doğal mevki olarak uyduğu bir futbolcu seçilir.
- Kaleciden başlama zorunluluğu yoktur; her seçim uygun boş yuvaya otomatik yerleştirilir.
- Sabit diziliş 4-2-3-1 ve yuva sırası şöyledir: kaleci, sağ bek, stoper, stoper, sol bek, merkez orta saha, merkez orta saha, ofansif orta saha, sağ kanat, sol kanat, santrfor.
- Bir oyuncu aynı mevki için tanımlı boş yuva kalmadığında o mevkiye ikinci/ek futbolcu yerleştiremez. İki stoper ve iki merkez orta saha yuvası vardır.
- Gelen kulüpte kullanılmamış ve boş doğal mevkiye uyabilecek futbolcu yoksa sonuç PAS sayılır; sıra geçer.
- Futbolcu seçimi için süre sınırı yoktur. Oyuncu seçimini tamamlayana kadar sıra kendisinde kalır.
- İlk 11'ini tamamlayan oyuncu seçim yapamaz; diğer oyuncuların ilk 11'lerini tamamlamasını bekler. Tüm oyuncuların 11'i tamamlandığında draft biter.
- Yedek oyuncu seçimi yoktur.
- Futbolcu güç/puan değerleri seçim ekranında gösterilmez; maç motorunda kullanılır.

## 4. Koruma
- KORUMA sonucu bir koruma hakkı kazandırır; kişi başına toplam 3 hak kazanılabilir.
- Korunacak futbolcu, tüm oyuncuların ilk 11 kadroları tamamlandıktan sonra seçilir.
- Her koruma hakkı için kendi kadrosundan bir futbolcu seçilebilir; aynı futbolcu birden fazla kez korunamaz.

## 5. Takas
- Her oyuncu başlangıçta 1 kullanılabilir takas hakkına sahiptir. TAKAS sonucu bir ek hak kazandırır; başlangıç hakkı dahil toplam hak sayısı 3 ile sınırlıdır. Çarkta 2 TAKAS dilimi bulunur.
- Takas yalnızca tüm ilk 11'ler tamamlandıktan sonra yapılabilir.
- Takas, oyuncunun kendi kadrosundaki bir futbolcu ile rakip kadrodaki aynı doğal mevkideki futbolcu arasında yapılır.
- Hedeflenen rakip futbolcu korumalıysa takas gerçekleşmez ancak kullanılan takas hakkı harcanır.
- Takas yapılabilecek aynı mevkide kendi futbolcusu yoksa işlem yapılmaz.

## 6. Taktikler ve lig
- Diziliş sabit 4-2-3-1'dir.
- Taktik seçenekleri: Dengeli, Hücum, Savunma, Önde pres ve Topa sahip olma.
- Tüm kadrolar tamamlandıktan sonra çift devreli lig fikstürü oluşturulabilir.
- Maçları admin veya oda sahibi maç maç simüle eder.
- Maç sonucu, goller, beklenen gol (xG), topa sahip olma, şut ve isabetli şut verileri raporlanır.
- Puan tablosu 3 puan galibiyet, 1 puan beraberlik sistemiyle güncellenir; sıralamada puan, averaj ve atılan gol dikkate alınır.

## 7. Veri ve erişim
- `players.json` futbolcu havuzunun tek kaynağıdır.
- Gerçek `firebase-config.js` dosyası kullanıcıya ait proje ayarlarını içerir ve örnek yapılandırmayla değiştirilmemelidir.
- Firestore güvenlik kuralları Firebase Console'da ayrıca yayımlanmalıdır; GitHub'a bir kural dosyası yüklemek tek başına Firebase kurallarını değiştirmez.
