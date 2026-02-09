import { collection, getDocs, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Ders verileri
let dersler = [];

// Firestore'dan verileri çek
async function dersleriYukle() {
  try {
    const querySnapshot = await getDocs(collection(window.db, "dersler"));
    dersler = [];
    querySnapshot.forEach((doc) => {
      dersler.push({ id: doc.id, ...doc.data() });
    });
    dersleriGoster();
  } catch (error) {
    console.error("Veri yükleme hatası:", error);
    // Firebase bağlantısı yoksa örnek veri göster
    ornekVeriGoster();
  }
}

// Örnek veri (Firebase yoksa)
function ornekVeriGoster() {
  dersler = [
    { id: "1", ad: "Devre Teorisi", devamsizlik: 2, toplam: 42 },
    { id: "2", ad: "Diferansiyel Denklemler", devamsizlik: 5, toplam: 42 },
    { id: "3", ad: "Fizik II", devamsizlik: 8, toplam: 42 },
    { id: "4", ad: "Programlama", devamsizlik: 1, toplam: 42 },
    { id: "5", ad: "Elektromanyetik", devamsizlik: 10, toplam: 42 },
    { id: "6", ad: "Sinyal ve Sistemler", devamsizlik: 3, toplam: 42 }
  ];
  dersleriGoster();
}

// Dersleri ekrana yazdır
function dersleriGoster() {
  const grid = document.getElementById("dersler-grid");
  grid.innerHTML = "";

  dersler.forEach((ders) => {
    const kalan = ders.toplam - ders.devamsizlik;
    const yuzde = ((ders.devamsizlik / ders.toplam) * 100).toFixed(1);
    
    let durum = "ok";
    if (ders.devamsizlik >= 10) durum = "tehlike";
    else if (ders.devamsizlik >= 7) durum = "uyari";

    const kartHTML = `
      <div class="ders-kart ${durum}">
        <h3>${ders.ad}</h3>
        <div class="sayilar">
          <div>
            <span class="etiket">DEVAMSIZLIK</span>
            <strong>${ders.devamsizlik}</strong>
          </div>
          <div>
            <span class="etiket">TOPLAM</span>
            <strong>${ders.toplam}</strong>
          </div>
          <div>
            <span class="etiket">KALAN</span>
            <strong>${kalan}</strong>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${durum}" style="width: ${yuzde}%"></div>
        </div>
        <div class="yuzde-text">${yuzde}% Devamsızlık</div>
        <div class="butonlar">
          <button class="ekle" onclick="devamsizlikEkle('${ders.id}')">+ Ekle</button>
          <button class="geri" onclick="devamsizlikAzalt('${ders.id}')">- Geri Al</button>
        </div>
      </div>
    `;
    grid.innerHTML += kartHTML;
  });
}

// Devamsızlık ekle
window.devamsizlikEkle = async function(id) {
  const ders = dersler.find(d => d.id === id);
  if (ders && ders.devamsizlik < ders.toplam) {
    ders.devamsizlik++;
    
    try {
      await updateDoc(doc(window.db, "dersler", id), {
        devamsizlik: ders.devamsizlik
      });
    } catch (error) {
      console.log("Firebase güncelleme hatası (offline mode)");
    }
    
    dersleriGoster();
  }
};

// Devamsızlık azalt
window.devamsizlikAzalt = async function(id) {
  const ders = dersler.find(d => d.id === id);
  if (ders && ders.devamsizlik > 0) {
    ders.devamsizlik--;
    
    try {
      await updateDoc(doc(window.db, "dersler", id), {
        devamsizlik: ders.devamsizlik
      });
    } catch (error) {
      console.log("Firebase güncelleme hatası (offline mode)");
    }
    
    dersleriGoster();
  }
};

// Sayfa yüklendiğinde çalıştır
dersleriYukle();