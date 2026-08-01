# 💖 Website Girlfriend Day — Special for Dannisa Winaris ("Cel")

Website mikro-interaktif React + Vite + Tailwind CSS + Framer Motion yang didedikasikan khusus untuk merayakan **Girlfriend Day (1 Agustus)** untuk **Dannisa Winaris ("Cel")**.

---

## 🌟 Fitur Interaktif Utama

1. **Narrative Storyline Flow**: Pengalaman scroll mengalir dari Teaser misteri $\rightarrow$ Real-time Together Counter $\rightarrow$ Timeline kenangan $\rightarrow$ Meja Polaroid Polaroid Scrapbook $\rightarrow$ Reveal Alasan Sayang $\rightarrow$ Fun Quiz $\rightarrow$ Wax Seal Surat Cinta Digital $\rightarrow$ Pesta Kembang Api Finale.
2. **Real-time Together Counter**: Menghitung hari, jam, menit, dan detik secara presisi dari tanggal jadian.
3. **Interactive Timeline Kenangan**: Geser/drag horizontal cerita dengan modal popup baca selengkapnya & foto.
4. **Draggable Polaroid Scrapbook Desk**: Meja kerja interaktif dengan foto polaroid yang bisa digeser, disusun ulang, dan di-zoom.
5. **Wax Seal Digital Envelope & Typewriter Letter**: Buka segel lilin digital untuk membaca surat cinta animasi huruf per huruf.
6. **Quiz "Seberapa Kenal Kamu Sama Cel?"**: Quiz 4 pertanyaan lucu seputar hubungan dengan sistem skor & hadiah lencana.
7. **Easter Egg Rahasia**: Klik logo atau nama "Dannisa Winaris" 5 kali untuk membuka popup pesan rahasia tambahan!
8. **Web Audio API Sound Effects**: Efek suara UI halus (klik, chime reveal, pop segel) dengan tombol mute toggle.

---

## 📝 Cara Edit Teks, Foto, dan Tanggal

Semua konten teks, tanggal, quiz, dan foto terpusat di **SATU FILE**:
👉 **`src/data/content.js`**

Anda cukup membuka file tersebut dan mengganti isi variabel tanpa perlu mengubah logika kode React:
- Tanggal jadian: `specialDate` (format: `"YYYY-MM-DDTHH:mm:ss"`)
- Timeline: Edit array `timeline`
- Foto Polaroid: Edit array `polaroidPhotos` (simpan foto Anda di folder `public/images/` dan ganti path gambarnya)
- Surat Cinta: Edit array `loveLetter.paragraphs`
- Quiz: Edit array `quiz.questions`

---

## 🚀 Cara Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Dev Server
```bash
npm run dev
```
Buka URL di browser (biasanya `http://localhost:3000`).

### 3. Build Production
```bash
npm run build
```
