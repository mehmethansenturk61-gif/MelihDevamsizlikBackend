// 🔥 FIREBASE CONFIG (BURAYI KENDİ PROJENDEN DOLDUR)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 👤 KULLANICI
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
    const ref = db
      .collection("devamsizlik")
      .doc(USER_ID)
      .collection("dersler")
      .doc(ders.ad);

    const doc = await ref.get();
    let yapilan = doc.exists ? doc.data().yapilan : 0;

    if (!doc.exists) {
      await ref.set({
        yapilan: 0,
        limit: ders.limit
      });
    }

    const kalan = ders.limit - yapilan;
    let durum = kalan <= 0 ? "tehlike" : kalan <= 2 ? "uyari" : "ok";

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
async function degistir(dersAdi, miktar) {
  const ref = db
    .collection("devamsizlik")
    .doc(USER_ID)
    .collection("dersler")
    .doc(dersAdi);

  const doc = await ref.get();
  let yapilan = doc.data().yapilan;
  const limit = doc.data().limit;

  if (miktar > 0 && yapilan < limit) yapilan++;
  if (miktar < 0 && yapilan > 0) yapilan--;

  await ref.update({ yapilan });
  yukle();
}

yukle();
