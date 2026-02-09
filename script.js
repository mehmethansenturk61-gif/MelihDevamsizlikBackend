import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 👤 KULLANICI (Document ID)
const USER_ID = "Melih";

// 📚 DERSLER
const dersListesi = [
  { ad: "Devreler II", limit: 8 },
  { ad: "Mühendislikte İngilizce II", limit: 8 },
  { ad: "Sayısal Çözümleme", limit: 8 },
  { ad: "Elektronik I", limit: 8 },
  { ad: "Mühendislik Matematiği", limit: 8 },
  { ad: "Elektromanyetik Dalgalar", limit: 8 },
  { ad: "Güç Sistemleri", limit: 8 }
];

const container = document.getElementById("dersler");

// 🔄 YÜKLE
async function yukle() {
  container.innerHTML = "";

  for (const ders of dersListesi) {
    const ref = doc(
      window.db,
      "devamsizlik",
      USER_ID,
      "dersler",
      ders.ad
    );

    const snap = await getDoc(ref);

    let yapilan = 0;

    if (snap.exists()) {
      yapilan = snap.data().yapilan;
    } else {
      await setDoc(ref, {
        yapilan: 0,
        limit: ders.limit
      });
    }

    const kalan = ders.limit - yapilan;
    const durum =
      kalan <= 0 ? "tehlike" :
      kalan <= 2 ? "uyari" : "ok";

    const div = document.createElement("div");
    div.className = "ders";

    div.innerHTML = `
      <h3>${ders.ad}</h3>
      <p>Kalan: <strong class="${durum}">${kalan}</strong></p>
      <div class="butonlar">
        <button onclick="degistir('${ders.ad}', -1)">➖</button>
        <button onclick="degistir('${ders.ad}', 1)">➕</button>
      </div>
    `;

    container.appendChild(div);
  }
}

// ➕➖ GÜNCELLE
window.degistir = async function (dersAdi, miktar) {
  const ref = doc(
    window.db,
    "devamsizlik",
    USER_ID,
    "dersler",
    dersAdi
  );

  const snap = await getDoc(ref);
  let yapilan = snap.data().yapilan;
  const limit = snap.data().limit;

  if (miktar > 0 && yapilan < limit) yapilan++;
  if (miktar < 0 && yapilan > 0) yapilan--;

  await updateDoc(ref, { yapilan });
  yukle();
};

yukle();
