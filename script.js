/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* BODY */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  min-height: 100vh;
  color: #222;
}

/* APP */
#app {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

/* HEADER */
.header {
  margin-bottom: 25px;
}

.profil-kart {
  background: white;
  border-radius: 22px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff3e0;
  color: #f57c00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.profil-bilgi h1 {
  font-size: 22px;
  margin-bottom: 5px;
}

.bolum {
  font-size: 14px;
  color: #555;
}

.sinif {
  font-size: 13px;
  color: #777;
}

/* BAŞLIK */
.sayfa-baslik {
  margin-bottom: 20px;
}

.sayfa-baslik h2 {
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #444;
}

.sayfa-baslik span {
  font-size: 12px;
  color: #777;
}

/* GRID */
#dersler-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

/* KART */
.ders-kart {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: transform 0.15s ease;
}

.ders-kart:hover {
  transform: translateY(-2px);
}

.ders-kart h3 {
  font-size: 16px;
  margin-bottom: 15px;
}

/* SAYILAR */
.sayilar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.sayilar div {
  text-align: center;
}

.etiket {
  font-size: 11px;
  color: #777;
  display: block;
}

.sayilar strong {
  font-size: 16px;
}

/* DURUMLAR */
.ders-kart.ok strong:last-child { color: #2e7d32; }
.ders-kart.uyari strong:last-child { color: #ed6c02; }
.ders-kart.tehlike strong:last-child { color: #d32f2f; }

/* BUTONLAR */
.butonlar {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.ekle {
  background: #1976d2;
  color: white;
}

.geri {
  background: #9e9e9e;
  color: white;
}
