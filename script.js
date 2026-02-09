import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const USER_ID = "Melih";

// 📚 Dersler (sıra SABİT)
const dersListesi = [
  { ad: "Devreler II", limit: 8 },
  { ad: "Elektronik I", limit: 8 },
  { ad: "Mühendislik Matematiği", limit: 8 },
  { ad: "Sayısal Çözümleme", limit: 8 },
  { ad: "Elektromanyetik Dalgalar", limit: 8 },
  { ad: "Güç Sistemleri", limit: 8 },
  { ad: "Mühendislikte İngilizce II", limit: 8 }
];

const container = document.getElementById("dersler");

// 🔄 YÜKLE
async function yukle() {
  container.innerHTML = "";

  for (const ders of dersListesi) {
    const ref = doc(window.db, "devamsizlik", USER_ID, "dersler", ders.ad);
    const snap = await getDoc(ref);

    let yapilan = 0;

    if (snap.exists()) {
      yapilan = snap.data().yapilan;
    } else {
      await setDoc(ref, { yapilan: 0, limit: ders.limit });
    }

    const kalan = ders.limit - yapilan;
    const durum =
      kalan <= 0 ? "tehlike" :
      kalan <= 2 ? "uyari" : "ok";

    const div = document.createElement("div");
    div.className = "ders";

    div.innerHTML = `
      <h3>${ders.ad}</h3>

      <div class="bilgiler">
        <span>Toplam: <b>${ders.limit}</b></span>
        <span>Yapılan: <b class="yapilan">${yapilan}</b></span>
        <span>Kalan: <b class="kalan ${durum}">${kalan}</b></span>
      </div>

      <div class="butonlar">
        <button class="arttir">Ekle</button>
        <button class="azalt">Geri Al</button>
      </div>
    `;

    const yapilanSpan = div.querySelector(".yapilan");
    const kalanSpan = div.querySelector(".kalan");

    div.querySelector(".arttir").onclick = async () => {
      if (yapilan < ders.limit) {
        yapilan++;
        await updateDoc(ref, { yapilan });
        yapilanSpan.textContent = yapilan;
        kalanSpan.textContent = ders.limit - yapilan;
      }
    };

    div.querySelector(".azalt").onclick = async () => {
      if (yapilan > 0) {
        yapilan--;
        await updateDoc(ref, { yapilan });
        yapilanSpan.textContent = yapilan;
        kalanSpan.textContent = ders.limit - yapilan;
      }
    };

    container.appendChild(div);
  }
}

yukle();
