# PROMPT: Website Girlfriend Day Interaktif — untuk "Cel"

Gunakan prompt di bawah ini secara utuh (copy-paste) ke AI code generator (Claude Code, Cursor, v0.dev, Bolt, dll). Bagian yang ditandai `[ISI DI SINI]` wajib kamu lengkapi dulu sebelum dikirim — semakin detail isinya, semakin personal & "sempurna" hasilnya.

---

## PROMPT UTAMA

```
Kamu adalah senior frontend engineer + creative director berpengalaman 15+ tahun,
spesialis membuat micro-experience website React yang emosional, interaktif, dan
tidak generik (bukan template "happy anniversary" pasaran).

TUJUAN
Buatkan SATU website React (single-page, bisa multi-section/scroll-based) untuk
merayakan "Girlfriend Day" (1 Agustus) yang didedikasikan untuk pacar saya.

DATA PERSONALISASI
- Nama pacar: Dannisa Winaris
- Panggilan sayang kami berdua: "Cel"
- Tanggal spesial: 1 Agustus (Girlfriend Day)
- [ISI DI SINI] Tanggal jadian / lama pacaran (contoh: "jadian 14 Februari 2023")
- [ISI DI SINI] 3-5 momen/kenangan penting (contoh: pertama ketemu, first date,
  liburan bareng, momen lucu/receh berdua, momen dia support saya pas susah)
- [ISI DI SINI] 3-5 alasan spesifik kenapa sayang dia (bukan generik "cantik/baik",
  tapi hal spesifik: kebiasaan lucu dia, cara dia perhatian, hal receh yang cuma
  kalian berdua ngerti)
- [ISI DI SINI] Inside joke / bahasa kode / panggilan lain selain "Cel" (kalau ada)
- [ISI DI SINI] Warna favorit dia / aesthetic yang dia suka (pastel, dark
  moody, minimalis, dsb)
- [ISI DI SINI] Lagu favorit kalian berdua (untuk referensi mood, BUKAN untuk
  reproduksi lirik)
- [ISI DI SINI] Foto-foto yang mau dipakai (siapkan array placeholder path,
  saya akan ganti manual)

TECH STACK
- React 18+ dengan Vite
- Tailwind CSS untuk styling
- Framer Motion untuk semua animasi & transisi (WAJIB, jangan pakai CSS animation biasa)
- React Router tidak perlu — buat sebagai satu halaman scroll experience
- Gunakan komponen fungsional + hooks
- Struktur file rapi per section (components/HeroSection.jsx, dst)

PRINSIP DESAIN — INI YANG BIKIN BEDA DARI WEBSITE UCAPAN PASARAN
1. JANGAN pakai template klise: hindari confetti generik, hindari font Pacifico/
   Great Vibes yang sudah terlalu sering dipakai di website cinta-cintaan, hindari
   layout "hero besar + teks di tengah + tombol like".
2. Bangun website ini sebagai NARASI/PERJALANAN, bukan kumpulan section acak.
   Contoh struktur: Opening (misteri/teaser) → Timeline interaktif kenangan →
   Reveal alasan sayang (scroll-triggered reveal satu per satu, bukan list biasa)
   → Interactive love letter / puzzle → Big final reveal / pesan penutup → CTA
   personal (misal tombol yang trigger pesan suara/lagu/hadiah).
3. Setiap section punya "signature interaction" sendiri — bukan cuma scroll +
   fade in yang sama berulang. Variasikan: drag interaction, hover reveal, klik
   untuk buka amplop, mini-game ringan, parallax custom, cursor-follow element, dll.
4. Micro-interactions di semua elemen: hover state, tap feedback, easter egg
   tersembunyi (misal klik logo/nama 5x memunculkan sesuatu).
5. Sound design opsional: gunakan Web Audio API atau file audio kecil untuk
   feedback halus (klik lembut, chime saat reveal) — dengan toggle mute.
6. Dark mode / light mode dengan tema warna yang mencerminkan preferensi dia,
   bukan default merah muda pasaran.
7. Responsive penuh — prioritaskan mobile-first karena kemungkinan besar dia
   buka dari HP.

FITUR INTERAKTIF WAJIB (pilih & kembangkan minimal 5 dari ini)
- Interactive timeline kenangan yang bisa di-scroll horizontal/drag, tiap poin
  bisa diklik untuk expand cerita + foto
- "Amplop digital" yang harus diklik/di-drag untuk dibuka, isinya surat cinta
  personal dengan efek animasi tulisan muncul huruf per huruf (typewriter effect)
- Quiz interaktif ringan "seberapa kenal kamu sama Cel" dengan pertanyaan lucu
  seputar hubungan kalian, hasil akhirnya funny/sweet
- Reveal counter "sudah berapa lama kita bersama" real-time (hari, jam, menit,
  detik) dihitung dari tanggal jadian
- Mini interactive scrapbook / polaroid gallery yang bisa di-drag-drag posisinya
  di layar (seperti menyusun foto di meja)
- Hidden easter egg: elemen tersembunyi yang baru muncul kalau discroll/diklik
  dengan cara tertentu (reward: pesan spesial atau animasi khusus)
- Final section: big reveal pesan penutup dengan animasi cinematic (misal
  particle/confetti custom yang dibuat sendiri, bukan library confetti standar)

KUALITAS KODE
- Kode harus production-ready, terorganisir, dan mudah di-maintain (misal kalau
  saya mau ganti foto atau teks nanti, cukup edit satu file data/content.js)
- Buat file terpisah untuk semua "content" (teks, path foto, data timeline) agar
  gampang diedit tanpa utak-atik logic komponen
- Optimalkan performa: lazy load gambar, jangan render animasi berat di elemen
  yang belum terlihat (pakai whileInView dari Framer Motion)
- Comment di bagian-bagian kode yang kompleks

OUTPUT YANG DIHARAPKAN
1. Struktur folder project lengkap
2. Semua kode komponen React
3. File content/data terpisah yang sudah saya isi placeholder-nya agar tinggal saya edit
4. Instruksi singkat cara run project (npm install, npm run dev)

Sebelum mulai coding, tanyakan ke saya dulu kalau ada bagian [ISI DI SINI] yang
belum saya lengkapi dan kamu butuh untuk membuat konten section tertentu.
```

---

## TIPS SEBELUM PAKAI PROMPT INI

1. **Isi semua bagian `[ISI DI SINI]` dulu** — ini kunci utama biar hasilnya kerasa personal buat Cel, bukan template kosong. Semakin spesifik detail momennya (bukan "kita jalan-jalan" tapi "kita nyasar 2 jam nyari warung bakso itu terus malah ketawa-ketawa"), semakin "hidup" websitenya.
2. Kalau kamu pakai **Claude Code**, kamu bisa langsung paste prompt ini di terminal/project dan foto-fotonya taruh di folder `public/images` sebelum run.
3. Kalau mau versi lebih simpel dulu (tanpa install macam-macam), saya juga bisa langsung buatkan versi HTML/React single-file yang bisa langsung jalan di browser — tinggal bilang aja.
4. Jangan lupa ganti placeholder lagu/audio dengan file yang kamu punya hak pakainya (misal rekaman suara sendiri), biar aman secara hak cipta.

---

*Mau saya langsung buatkan website-nya sekarang juga (bukan cuma prompt-nya)? Saya bisa build langsung di sini kalau kamu isi detail kenangan & alasan sayangnya.*
