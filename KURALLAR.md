# Çark Futbol – Koruma ve takas akışı

1. Her oyuncunun ilk 11'i tamamlanınca koruma aşaması otomatik başlar.
2. Oyuncular koruma hakkı kadar futbolcu adını tıklayarak korur ve ardından **Koruma seçimini tamamla** düğmesine basar. Koruma hakkı olmayan oyuncular da aşamayı tamamlar.
3. Herkes koruma aşamasını tamamladığında takas aşaması tüm oyuncular için aynı anda açılır.
4. Oyuncular, takas hakları kadar aynı mevkideki rakip/kendi futbolcularını eşleştirerek talep oluşturur. Taleplerini **Takaslarımı onayla** ile kesinleştirir.
5. Tüm oyuncular onaylayınca takaslar birlikte değerlendirilir. Herhangi bir talepte kullanılan futbolcu başka bir taleple de kullanılmışsa, o futbolcuyla ilişkili tüm talepler iptal edilir.
6. Korunan rakip futbolcuya yapılan takaslar da iptal edilir. Oluşturulmuş her takas talebi için hak harcanır; iptal edilen taleplerin hakkı geri verilmez.
7. Geçerli ve çakışmayan takaslar uygulanır. Korunan futbolcular, takaslar tamamlanana kadar diğer oyunculara gösterilmez.

## Otomatik çark ve otomatik oyuncu seçimi
8. Draft başladığında her oyuncunun sırası için 30 saniyelik süre başlar.
9. Oyuncu 30 saniye içinde çarkı çevirmediyse, odada bağlantısı açık istemcilerden biri süreyi algılayıp o oyuncu adına çarkı otomatik çevirir. İşlem Firestore işlemiyle doğrulanır; aynı sıra için birden fazla otomatik çevirme yapılmaz.
10. Çarkta bir kulüp geldiğinde sistem, o kulüpten seçilmemiş ve oyuncunun henüz dolmamış doğal mevkilerinden birine uygun futbolcuyu otomatik seçer.
11. Gelen kulüpte uygun futbolcu yoksa seçim PAS gibi değerlendirilir ve sıra sonraki oyuncuya geçer.
12. PAS, KORUMA ve TAKAS dilimleri mevcut hak kurallarına göre uygulanır; hak üst sınırı 3'tür.
