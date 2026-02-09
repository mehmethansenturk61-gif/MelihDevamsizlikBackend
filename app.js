// Derslerin verilerini tutan dizi
const dersler = [
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 },
    { devamsizlik: 0, toplamDers: 14, maxDevamsizlik: 8 }
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Tüm ders kartlarını bul
    const dersKartlari = document.querySelectorAll('.ders-kart');
    
    dersKartlari.forEach((kart, index) => {
        const ekleBtn = kart.querySelector('.ekle');
        const geriBtn = kart.querySelector('.geri');
        
        // + EKLE butonuna tıklandığında
        ekleBtn.addEventListener('click', function() {
            if (dersler[index].devamsizlik < dersler[index].maxDevamsizlik) {
                dersler[index].devamsizlik++;
                guncelle(kart, index);
            }
        });
        
        // - GERİ AL butonuna tıklandığında
        geriBtn.addEventListener('click', function() {
            if (dersler[index].devamsizlik > 0) {
                dersler[index].devamsizlik--;
                guncelle(kart, index);
            }
        });
    });
    
    // LocalStorage'dan verileri yükle (sayfa yenilendiğinde kaybolmasın)
    yukleVeri();
});

// Kartı güncelle
function guncelle(kart, index) {
    const ders = dersler[index];
    const devamsizlikSpan = kart.querySelector('.devamsizlik');
    const kalanSpan = kart.querySelector('.kalan');
    
    // Sayıları güncelle
    devamsizlikSpan.textContent = ders.devamsizlik;
    kalanSpan.textContent = ders.maxDevamsizlik - ders.devamsizlik;
    
    // Renk durumunu güncelle
    kart.classList.remove('ok', 'uyari', 'tehlike');
    
    const kalanHak = ders.maxDevamsizlik - ders.devamsizlik;
    
    if (kalanHak >= 4) {
        kart.classList.add('ok');
    } else if (kalanHak >= 2) {
        kart.classList.add('uyari');
    } else {
        kart.classList.add('tehlike');
    }
    
    // LocalStorage'a kaydet
    kaydetVeri();
}

// Verileri kaydet
function kaydetVeri() {
    localStorage.setItem('devamsizlikVerileri', JSON.stringify(dersler));
}

// Verileri yükle
function yukleVeri() {
    const kaydedilmisVeri = localStorage.getItem('devamsizlikVerileri');
    if (kaydedilmisVeri) {
        const yuklenenVeri = JSON.parse(kaydedilmisVeri);
        yuklenenVeri.forEach((ders, index) => {
            dersler[index].devamsizlik = ders.devamsizlik;
            const kart = document.querySelector(`[data-ders="${index}"]`);
            if (kart) {
                guncelle(kart, index);
            }
        });
    }
}