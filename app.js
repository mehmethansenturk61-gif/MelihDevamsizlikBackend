// Ders isimleri (Firestore'da kayıt için)
const dersIsimleri = [
    "Devreler II",
    "Mühendislikte İngilizce II", 
    "Sayısal Çözümleme",
    "Elektronik I",
    "Mühendislik Matematiği",
    "Elektromanyetik Dalgalar",
    "Güç Sistemleri"
];

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
    // Firebase'den verileri yükle
    yukleVeri();
    
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
    
    // Firebase'e kaydet
    kaydetVeri(index);
}

// Firebase'e kaydet
function kaydetVeri(index) {
    const dersAdi = dersIsimleri[index];
    
    db.collection('Melih').doc('dersler').collection('liste').doc(dersAdi).set({
        devamsizlik: dersler[index].devamsizlik,
        toplamDers: dersler[index].toplamDers,
        maxDevamsizlik: dersler[index].maxDevamsizlik
    })
    .then(() => {
        console.log("✅ " + dersAdi + " kaydedildi!");
    })
    .catch((error) => {
        console.error("❌ Hata:", error);
    });
}

// Firebase'den verileri yükle
function yukleVeri() {
    db.collection('Melih').doc('dersler').collection('liste').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const dersAdi = doc.id;
            const data = doc.data();
            const index = dersIsimleri.indexOf(dersAdi);
            
            if (index !== -1) {
                dersler[index].devamsizlik = data.devamsizlik;
                dersler[index].toplamDers = data.toplamDers;
                dersler[index].maxDevamsizlik = data.maxDevamsizlik;
                
                const kart = document.querySelector(`[data-ders="${index}"]`);
                if (kart) {
                    guncelle(kart, index);
                }
            }
        });
        console.log("✅ Veriler Firebase'den yüklendi!");
    })
    .catch((error) => {
        console.log("⚠️ İlk açılış, veriler yükleniyor...");
    });
}