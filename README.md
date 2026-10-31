# Mahasin Hadiyatulloh — Jasa Konsultasi

<p align="center">
  <img src="public/images/mahasin-portrait-640.webp" alt="Mahasin Hadiyatulloh" width="240" style="border-radius: 12px; margin: 16px 0;" />
</p>

Website portofolio dan layanan konsultasi **Marketing · Data · AI** oleh Mahasin Hadiyatulloh.

Dibangun dengan React + Vite + TypeScript + Tailwind CSS v4.

## Cara Menjalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

## Build untuk Production

```bash
npm run build
npm run preview
```

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| UI Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Font | Manrope · Newsreader · IBM Plex Mono (Google Fonts) |
| Contact | WhatsApp (tidak ada backend) |

## Struktur Proyek

```
src/
  App.tsx           # Komponen utama — semua konten dan layout
  index.css         # Design system & Tailwind config
  main.tsx          # Entry point React
  usePageMotion.ts  # Hook untuk scroll, animasi, dan reading progress
public/
  images/           # Foto portrait (WebP, responsive)
  favicon.svg
index.html          # HTML shell
```

## Fitur

- **Diagnosis masalah bisnis** — tool interaktif 3 langkah
- **Katalog layanan** — 10 layanan dengan harga transparan dan accordion detail
- **Brief form** — form kontak yang terhubung langsung ke WhatsApp
- **Responsif** — mobile-first, semua ukuran layar
- **Aksesibel** — skip link, ARIA attributes, keyboard navigation
- **Performa** — animasi dengan `prefers-reduced-motion`, lazy reveal, reading progress

## Deploy

Bisa di-deploy ke mana saja yang mendukung static site:

- **Vercel**: `vercel --prod`
- **Netlify**: drag & drop folder `dist/`
- **GitHub Pages**: gunakan GitHub Actions

---

© 2026 Mahasin Hadiyatulloh · Bandung, Indonesia
