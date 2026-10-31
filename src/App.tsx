import { useEffect, useMemo, useState } from "react"
import { scrollToSection, usePageMotion } from "./usePageMotion"

type Group = "grow" | "decide" | "build" | "lead"

type Service = {
  id: number
  group: Group
  title: string
  description: string
  scope: string
  price: string
  deliverables: string[]
}

type PriceItem = {
  item: string
  price: string
  note?: string
}

type ServiceGroup = {
  label: string
  number: string
}

const groups: Record<Group, ServiceGroup> = {
  grow: { label: "Pertumbuhan", number: "01" },
  decide: { label: "Data & Keputusan", number: "02" },
  build: { label: "Digital & AI", number: "03" },
  lead: { label: "Manajemen", number: "04" },
}

const services: Service[] = [
  {
    id: 1,
    group: "grow",
    title: "Iklan Digital & Optimasi",
    description:
      "Iklan yang terukur, teroptimasi, dan terhubung langsung dengan target bisnis.",
    scope: "Google Ads · Meta Ads · Microsoft Ads",
    price: "Mulai Rp2,5 jt",
    deliverables: [
      "Audit akun & tracking",
      "Optimasi kampanye",
      "Dashboard performa bulanan",
    ],
  },
  {
    id: 2,
    group: "grow",
    title: "Konten Organik & SEO",
    description:
      "Bantu pelanggan menemukan bisnis Anda lewat pencarian dan konten yang konsisten.",
    scope: "SEO Lokal · Content System · Social",
    price: "Mulai Rp4 jt",
    deliverables: [
      "Strategi dan kalender konten",
      "Optimasi pencarian lokal",
      "Laporan engagement",
    ],
  },
  {
    id: 3,
    group: "grow",
    title: "Strategi & Brand",
    description:
      "Satukan arah brand, kampanye, dan prioritas pemasaran dalam satu rencana.",
    scope: "Annual Plan · Positioning · Guideline",
    price: "Mulai Rp8 jt",
    deliverables: [
      "Rencana pemasaran tahunan",
      "Brand guideline",
      "Playbook peluncuran",
    ],
  },
  {
    id: 4,
    group: "grow",
    title: "Event, Kemitraan & Loyalitas",
    description:
      "Ciptakan alasan bagi pelanggan untuk kembali dan partner untuk berkolaborasi.",
    scope: "Loyalty · Partnership · Event",
    price: "Mulai Rp4 jt",
    deliverables: [
      "Desain program loyalty",
      "Proposal kemitraan",
      "Konsep event promosi",
    ],
  },
  {
    id: 5,
    group: "decide",
    title: "Data & Analitik",
    description:
      "Satukan data yang tersebar menjadi laporan yang membantu Anda mengambil keputusan.",
    scope: "Dashboard · Data Audit · Funnel",
    price: "Mulai Rp4 jt",
    deliverables: [
      "Audit kualitas data",
      "Dashboard KPI interaktif",
      "Diagnosis funnel",
    ],
  },
  {
    id: 6,
    group: "decide",
    title: "Model Keuangan & Strategi Harga",
    description:
      "Nilai kelayakan bisnis, uji skenario keuangan, dan tentukan harga dengan asumsi yang jelas.",
    scope: "Studi Kelayakan Bisnis · Model Keuangan · Strategi Harga",
    price: "Mulai Rp5 jt",
    deliverables: [
      "Model skenario Excel",
      "Analisis kelayakan bisnis",
      "Analisis titik impas",
      "Rekomendasi harga",
    ],
  },
  {
    id: 7,
    group: "build",
    title: "Adopsi AI & Otomasi",
    description:
      "Kurangi pekerjaan berulang dengan AI dan otomasi yang sesuai kebutuhan tim.",
    scope: "AI Roadmap · Workflow · Training",
    price: "Mulai Rp4 jt",
    deliverables: [
      "Pemetaan pekerjaan manual",
      "Roadmap adopsi AI",
      "Workflow dan pelatihan",
    ],
  },
  {
    id: 8,
    group: "build",
    title: "Pengembangan Aplikasi & Produk",
    description:
      "Kembangkan aplikasi dari perumusan kebutuhan, desain, dan pengembangan hingga siap digunakan.",
    scope: "Spesifikasi · Prototipe · Pengembangan · Peluncuran",
    price: "Mulai Rp2,5 jt",
    deliverables: [
      "Spesifikasi produk",
      "Prototipe atau aplikasi siap digunakan sesuai kesepakatan",
      "Pengujian, peluncuran, dan dokumentasi sesuai lingkup",
    ],
  },
  {
    id: 9,
    group: "lead",
    title: "Kepemimpinan & Manajemen",
    description:
      "Bangun sistem agar tim tetap berjalan tanpa bergantung pada satu orang.",
    scope: "SOP · KPI · Fractional Lead",
    price: "Mulai Rp4 jt",
    deliverables: [
      "SOP proses utama",
      "Kerangka KPI & appraisal",
      "Review partner atau vendor",
    ],
  },
  {
    id: 10,
    group: "lead",
    title: "Presentasi, Naskah & Materi Kreatif",
    description:
      "Materi yang membantu audiens memahami, percaya, lalu mengambil keputusan.",
    scope: "Pitch Deck · Copywriting · Video",
    price: "Mulai Rp2,5 jt",
    deliverables: [
      "Board atau pitch deck",
      "Copy untuk kanal digital",
      "Video pendek",
    ],
  },
]

const serviceDetails: Record<number, {
  needed: string
  suitable: string
  prices: PriceItem[]
}> = {
  1: {
    needed:
      "Akses akun iklan dan analytics, target penjualan atau CPA, serta budget bulanan.",
    suitable:
      "Bisnis yang sudah atau akan beriklan di Google, Meta, atau Microsoft.",
    prices: [
      { item: "Audit akun dan tracking", price: "Rp5 jt" },
      { item: "Setup tracking", price: "Rp2,5 jt" },
      { item: "Retainer · ad spend Rp10–30 jt", price: "Rp4 jt/bulan" },
      { item: "Retainer · ad spend Rp30–100 jt", price: "Rp8 jt/bulan" },
      { item: "Retainer · ad spend di atas Rp100 jt", price: "10% dari spend" },
    ],
  },
  2: {
    needed:
      "Akses akun sosial dan Google Business Profile, serta materi brand yang sudah ada.",
    suitable:
      "Bisnis dengan lokasi fisik atau yang ingin membangun traffic tanpa membayar per klik.",
    prices: [
      { item: "SEO lokal", price: "Rp4 jt" },
      { item: "Sistem konten", price: "Rp7 jt" },
      { item: "Retainer strategi", price: "Rp6 jt/bulan" },
    ],
  },
  3: {
    needed:
      "Data penjualan dan pemasaran tahun lalu, target bisnis, dan kisaran budget.",
    suitable:
      "Brand yang membutuhkan satu arah strategis untuk menyatukan kampanye dan tim.",
    prices: [
      { item: "Rencana pemasaran tahunan", price: "Rp15 jt" },
      { item: "Brand guideline", price: "Rp12 jt" },
      { item: "Playbook peluncuran", price: "Rp8 jt" },
    ],
  },
  4: {
    needed:
      "Data pelanggan dan transaksi, daftar calon mitra jika ada, serta kisaran budget.",
    suitable:
      "Bisnis yang ingin meningkatkan repeat purchase atau menjangkau audiens baru.",
    prices: [
      { item: "Desain program loyalty", price: "Rp10 jt" },
      { item: "Proposal kemitraan", price: "Rp4 jt/mitra" },
      { item: "Konsep event", price: "Rp6 jt/event" },
    ],
  },
  5: {
    needed:
      "Data mentah dari POS, iklan, CRM, atau sumber lain dan laporan yang saat ini dipakai.",
    suitable:
      "Tim yang memiliki banyak data tetapi belum yakin apakah laporan dan keputusannya akurat.",
    prices: [
      { item: "Audit data", price: "Rp8 jt" },
      {
        item: "Dashboard KPI",
        price: "Rp8 jt",
        note: "Banyak sumber data: Rp15 jt",
      },
      { item: "Diagnosis funnel", price: "Rp4 jt" },
    ],
  },
  6: {
    needed:
      "Rencana bisnis atau investasi, data biaya, perkiraan penjualan, dan harga saat ini. Asumsi yang belum tersedia dapat disusun bersama.",
    suitable:
      "Bisnis yang ingin menguji kelayakan usaha, menilai investasi atau pembukaan cabang, menyusun model keuangan, atau meninjau struktur harga.",
    prices: [
      { item: "Break-even dan skenario", price: "Rp5 jt" },
      { item: "Studi kelayakan", price: "Rp8 jt" },
      { item: "Pricing produk, paket, atau jasa", price: "Rp6 jt" },
    ],
  },
  7: {
    needed: "Akses ke tim dan gambaran lengkap mengenai alur kerja harian.",
    suitable:
      "Tim yang banyak mengerjakan tugas manual dan ingin mulai menerapkan AI secara terarah.",
    prices: [
      {
        item: "Pelatihan tim",
        price: "Rp4 jt/sesi",
        note: "Paket 3 sesi: Rp10 jt",
      },
      { item: "Roadmap AI dan review vendor", price: "Rp10 jt" },
      { item: "Workflow otomasi", price: "Rp4 jt/alur" },
    ],
  },
  8: {
    needed:
      "Tujuan aplikasi, calon pengguna, kebutuhan fitur dan integrasi, contoh data, target waktu, serta kisaran anggaran.",
    suitable:
      "Bisnis yang membutuhkan aplikasi untuk pelanggan, alat operasional internal, atau pengembangan produk digital hingga siap digunakan.",
    prices: [
      { item: "Spesifikasi produk", price: "Rp4 jt" },
      { item: "Prototipe", price: "Rp8 jt", note: "Banyak fitur: Rp15 jt" },
      { item: "Audit prototipe", price: "Rp2,5 jt" },
      {
        item: "Pengembangan hingga peluncuran",
        price: "Penawaran khusus",
        note: "Ruang lingkup, jadwal, dan biaya disepakati sebelum pengerjaan.",
      },
    ],
  },
  9: {
    needed:
      "Struktur tim, deskripsi peran, proses yang berjalan, dan kontrak mitra bila relevan.",
    suitable:
      "Bisnis yang ingin membangun sistem kerja dan akuntabilitas tim yang lebih kuat.",
    prices: [
      { item: "SOP untuk 3–5 proses", price: "Rp7 jt" },
      { item: "KPI dan appraisal", price: "Rp10 jt" },
      { item: "Review mitra", price: "Rp4 jt/mitra" },
      { item: "Pimpinan pemasaran paruh waktu", price: "Rp8 jt/bulan" },
    ],
  },
  10: {
    needed:
      "Tujuan, audiens materi, data pendukung, dan referensi visual jika tersedia.",
    suitable:
      "Tim yang perlu meyakinkan board, investor, partner, atau pelanggan.",
    prices: [
      { item: "Deck", price: "Rp6 jt", note: "Dengan model Excel: Rp12 jt" },
      { item: "Copywriting", price: "Rp2,5 jt/paket" },
      {
        item: "Video pendek",
        price: "Rp3 jt/video",
        note: "VFX dikutip per shot",
      },
    ],
  },
}

const problems = [
  {
    title: "Iklan tidak berkinerja",
    short: "Iklan jalan terus, hasilnya tidak jelas.",
    quote:
      "“Tiap bulan iklan jalan dan tagihannya naik, tapi saya tidak tahu mana yang bikin orang beli.”",
    scene:
      "Laporan penuh angka impresi dan klik, tetapi tidak ada yang bisa menjawab berapa budget yang benar-benar menjadi penjualan.",
    signs: [
      "Laporan hanya menampilkan klik dan jangkauan",
      "Tidak ada target ROAS atau CPA",
      "Tracking konversi belum dapat dipercaya",
      "Budget naik, hasilnya tidak terasa naik",
    ],
    impact:
      "Setiap bulan tanpa jawaban berarti uang yang sama terus dibelanjakan ke tempat yang mungkin salah.",
    start:
      "Audit akun dan tracking, perbaiki kebocoran terbesar, lalu pasang dashboard.",
    recommendations: [
      ["Audit akun & tracking", "Rp5 jt"],
      ["Dashboard KPI", "Rp8 jt"],
    ],
  },
  {
    title: "Angka tidak bisa dipercaya",
    short: "Laporan dan data mentah menunjukkan hasil berbeda.",
    quote:
      "“Angka di laporan dan angka di kasir kok beda, dan tidak ada yang tahu kenapa.”",
    scene:
      "Marketing melaporkan satu angka, sistem kasir menunjukkan angka lain. Akhirnya keputusan penting kembali dibuat berdasarkan firasat.",
    signs: [
      "Total laporan tidak cocok dengan data mentah",
      "Setiap orang menyebut angka berbeda",
      "Keputusan masih mengandalkan firasat",
      "Sumber angka di laporan tidak jelas",
    ],
    impact:
      "Keputusan yang dibangun di atas angka yang salah akan salah dengan penuh percaya diri.",
    start:
      "Bandingkan data mentah dengan laporan, lalu daftar dan prioritaskan semua selisih.",
    recommendations: [["Audit data", "Rp8 jt"]],
  },
  {
    title: "Diskon besar, untung tipis",
    short: "Promo ramai, tetapi untungnya tidak terasa.",
    quote:
      "“Promo kami ramai dan omzet naik, tapi di akhir bulan untungnya tidak terasa.”",
    scene:
      "Antrean panjang dan omzet mencetak rekor, tetapi diskon yang diberikan hampir menghabiskan seluruh margin.",
    signs: [
      "Omzet naik tetapi margin turun lebih cepat",
      "Diskon rata untuk semua produk",
      "Biaya diskon tidak pernah dihitung",
      "Pelanggan hanya datang saat promo",
    ],
    impact:
      "Diskon yang tidak dihitung diam-diam menjadi biaya tetap yang terus membesar.",
    start:
      "Hitung biaya diskon tiap kampanye, lalu rancang ulang tingkat diskon dan benefit.",
    recommendations: [
      ["Audit data", "Rp8 jt"],
      ["Program loyalty", "Rp10 jt"],
    ],
  },
  {
    title: "Pelanggan datang lalu hilang",
    short: "Banyak yang datang, sedikit yang kembali.",
    quote:
      "“Setiap bulan pelanggan baru berdatangan, tapi yang kembali sedikit sekali.”",
    scene:
      "Iklan membawa pelanggan baru, kasir mencatat transaksi pertama, lalu mereka menghilang tanpa alasan untuk kembali.",
    signs: [
      "Pengunjung tidak tercatat sebagai pelanggan",
      "Tidak ada alasan khusus untuk kembali",
      "Titik kehilangan pelanggan tidak diketahui",
      "Biaya akuisisi terus naik",
    ],
    impact:
      "Mencari pelanggan baru jauh lebih mahal daripada mengajak kembali mereka yang sudah pernah datang.",
    start:
      "Temukan tahap saat pelanggan hilang, lalu rancang alasan yang relevan untuk kembali.",
    recommendations: [
      ["Diagnosis funnel", "Rp4 jt"],
      ["Program loyalty", "Rp10 jt"],
    ],
  },
  {
    title: "Brand sepi di luar iklan",
    short: "Begitu iklan berhenti, traffic ikut hilang.",
    quote:
      "“Begitu iklan dimatikan, toko dan media sosial kami langsung sepi.”",
    scene:
      "Selama iklan menyala semuanya terlihat sehat, tetapi pencarian Google dan media sosial belum memberi alasan bagi orang untuk datang secara organik.",
    signs: [
      "Traffic bergantung pada iklan berbayar",
      "Google Business belum dirawat",
      "Konten tidak punya pola atau tujuan",
      "Hasil pencarian brand belum meyakinkan",
    ],
    impact:
      "Brand yang hanya terlihat saat membayar akan menghilang saat berhenti membayar.",
    start:
      "Rapikan pencarian lokal, lalu susun sistem konten yang dapat dijalankan tim.",
    recommendations: [
      ["SEO lokal", "Rp4 jt"],
      ["Sistem konten", "Rp7 jt"],
    ],
  },
  {
    title: "Rencana tahun depan belum jelas",
    short: "Rencana baru berupa daftar keinginan.",
    quote:
      "“Akhir tahun sudah dekat, dan rencana tahun depan masih berupa daftar keinginan.”",
    scene:
      "Kalender penuh ide, tetapi belum ada yang dapat menjawab prioritas, budget yang pantas, dan rencana jika target meleset.",
    signs: [
      "Anggaran hanya meniru tahun lalu",
      "Kampanye tidak berada dalam satu kalender",
      "Belum ada budget cadangan",
      "Hasil tahun lalu belum ditinjau",
    ],
    impact:
      "Tanpa prioritas, budget terbagi rata ke semua ide—termasuk yang tidak menghasilkan.",
    start:
      "Tinjau hasil dan budget, lalu tetapkan prioritas dan kalender pemasaran.",
    recommendations: [["Rencana pemasaran tahunan", "Rp15 jt"]],
  },
  {
    title: "Semua bergantung pada saya",
    short: "Kalau Anda tidak hadir, pekerjaan berhenti.",
    quote:
      "“Kalau saya tidak ikut rapat atau tidak membalas pesan, pekerjaan tim berhenti.”",
    scene:
      "Tim terus menanyakan hal yang sama karena cara kerja hanya ada di kepala Anda. Bisnis tumbuh, dan Anda yang pertama kewalahan.",
    signs: [
      "Tim menunggu persetujuan untuk hal rutin",
      "Proses utama belum punya SOP",
      "Kinerja belum punya ukuran jelas",
      "Anggota baru lama memahami alur",
    ],
    impact:
      "Bisnis yang tumbuh di atas satu orang akan berhenti tumbuh di orang itu.",
    start:
      "Dokumentasikan proses utama, lalu tetapkan ukuran kinerja yang disepakati.",
    recommendations: [
      ["SOP 3–5 proses", "Rp7 jt"],
      ["KPI & appraisal", "Rp10 jt"],
    ],
  },
  {
    title: "Bingung mulai dengan AI",
    short: "Semua bilang harus pakai AI, tetapi mulai dari mana?",
    quote:
      "“Kami tahu AI penting, tapi belum tahu tool dan proses mana yang benar-benar berguna.”",
    scene:
      "Setiap orang mencoba tool berbeda tanpa aturan atau ukuran hasil, sementara waktu tim tetap habis untuk pekerjaan berulang.",
    signs: [
      "Banyak tugas berulang masih manual",
      "AI dipakai tanpa aturan bersama",
      "Tool yang dicoba tidak pernah melekat",
      "Bingung memilih tool atau vendor",
    ],
    impact:
      "Waktu tim terus habis untuk hal yang sebenarnya dapat dibantu mesin.",
    start:
      "Petakan pemborosan waktu, pilih tool, lalu latih tim memakai AI pada tugas nyata.",
    recommendations: [
      ["Roadmap AI & vendor", "Rp10 jt"],
      ["Pelatihan tim", "Rp4 jt/sesi"],
    ],
  },
  {
    title: "Butuh alat atau aplikasi",
    short: "Ide alat ada, tetapi belum pernah diuji.",
    quote:
      "“Saya punya ide aplikasi, tapi masih di kepala dan belum pernah diuji ke siapa pun.”",
    scene:
      "Menyewa tim developer terasa terlalu besar untuk ide yang belum terbukti, jadi tim tetap bekerja lewat spreadsheet dan chat yang tercecer.",
    signs: [
      "Ide belum tertulis sebagai spesifikasi",
      "Kerja masih tersebar di chat dan spreadsheet",
      "Belum ada prototipe",
      "Ragu berinvestasi besar terlalu dini",
    ],
    impact:
      "Ide yang tidak pernah diuji tidak pernah belajar apa pun dari penggunanya.",
    start:
      "Petakan kebutuhan, tentukan fitur utama, lalu susun tahapan pengembangan hingga aplikasi siap digunakan. Prototipe dapat menjadi tahap awal bila diperlukan.",
    recommendations: [
      ["Spesifikasi produk", "Rp4 jt"],
      ["Prototipe", "Rp8 jt"],
    ],
  },
  {
    title: "Mau investasi, belum yakin untung",
    short: "Uangnya ada, hitungan baliknya belum jelas.",
    quote:
      "“Kami mau membuka cabang, tapi belum yakin kapan investasi ini balik modal.”",
    scene:
      "Lokasi dan penawaran sudah di meja, tetapi penjualan minimum, waktu balik modal, dan skenario terburuk masih berupa perkiraan.",
    signs: [
      "Belum ada hitungan titik impas",
      "Asumsi penjualan belum diuji",
      "Harga ditentukan dari kebiasaan",
      "Belum ada skenario terburuk",
    ],
    impact:
      "Komitmen yang dibuat sebelum dihitung hanya dapat diperbaiki dengan uang.",
    start: "Tuliskan asumsi, hitung titik impas, lalu uji beberapa skenario.",
    recommendations: [
      ["Break-even & skenario", "Rp5 jt"],
      ["Studi kelayakan", "Rp8 jt"],
    ],
  },
]

const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-4 w-4 transition-transform duration-300 ${
      down ? "rotate-90" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-5-5 5 5-5 5"
    />
  </svg>
)

const Check = () => (
  <svg
    aria-hidden="true"
    className="mt-0.5 h-4 w-4 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
  </svg>
)

const whatsappLink = (message: string) =>
  `https://wa.me/6285774446364?text=${encodeURIComponent(message)}`

type BriefDraft = {
  name: string
  brand: string
  contact: string
  selectedIds: number[]
  situation: string
  start: string
  budget: string
}

const emptyBrief: BriefDraft = {
  name: "",
  brand: "",
  contact: "",
  selectedIds: [],
  situation: "",
  start: "",
  budget: "",
}

function BriefForm({
  servicesList,
  diagnosis,
}: {
  servicesList: Service[]
  diagnosis: string
}) {
  const [draft, setDraft] = useState<BriefDraft>(emptyBrief)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mahasin-brief")
      if (saved) setDraft({ ...emptyBrief, ...JSON.parse(saved) })
    } catch {
      // The form remains usable when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("mahasin-brief", JSON.stringify(draft))
  }, [draft])

  const selectedNames = servicesList
    .filter((service) => draft.selectedIds.includes(service.id))
    .map((service) => service.title)
  const message = [
    `Halo Hadi, saya ${draft.name || "[nama]"}${
      draft.brand ? ` dari ${draft.brand}` : ""
    }.`,
    diagnosis ? `Hasil diagnosis awal: ${diagnosis}` : "",
    selectedNames.length
      ? `Layanan yang saya minati: ${selectedNames.join(", ")}.`
      : "",
    `Situasi saat ini: ${draft.situation || "[belum diisi]"}`,
    draft.budget ? `Kisaran budget: ${draft.budget}.` : "",
    draft.start ? `Rencana mulai: ${draft.start}.` : "",
    `Kontak saya: ${draft.contact || "[belum diisi]"}.`,
  ]
    .filter(Boolean)
    .join("\n\n")

  const update = <K extends keyof BriefDraft>(key: K, value: BriefDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: "" }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!draft.name.trim()) next.name = "Nama perlu diisi."
    if (!draft.contact.trim())
      next.contact = "Masukkan WhatsApp atau email yang dapat dihubungi."
    if (!draft.situation.trim())
      next.situation = "Ceritakan situasi Anda secara singkat."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
  }

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form className="grid gap-6 lg:grid-cols-2" onSubmit={submit} noValidate>
      <label className="field-label">
        Nama <span aria-hidden="true">*</span>
        <input
          value={draft.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Nama Anda"
          className="form-field"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" className="field-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="field-label">
        Perusahaan atau brand
        <input
          value={draft.brand}
          onChange={(event) => update("brand", event.target.value)}
          placeholder="Opsional"
          className="form-field"
        />
      </label>
      <label className="field-label lg:col-span-2">
        WhatsApp atau email <span aria-hidden="true">*</span>
        <input
          value={draft.contact}
          onChange={(event) => update("contact", event.target.value)}
          placeholder="Contoh: 08xx atau nama@email.com"
          className="form-field"
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "contact-error" : undefined}
        />
        {errors.contact && (
          <span id="contact-error" className="field-error">
            {errors.contact}
          </span>
        )}
      </label>

      <fieldset className="lg:col-span-2">
        <legend className="field-label mb-3">
          Layanan yang ingin dibahas{" "}
          <span className="normal-case tracking-normal text-muted">
            (boleh lebih dari satu)
          </span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {servicesList.map((service) => {
            const selected = draft.selectedIds.includes(service.id)
            return (
              <label
                key={service.id}
                className={`choice-card ${selected ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() =>
                    update(
                      "selectedIds",
                      selected
                        ? draft.selectedIds.filter((id) => id !== service.id)
                        : [...draft.selectedIds, service.id],
                    )
                  }
                />
                <span className="choice-check">{selected && <Check />}</span>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.price}</small>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <label className="field-label">
        Kisaran budget
        <select
          value={draft.budget}
          onChange={(event) => update("budget", event.target.value)}
          className="form-field"
        >
          <option value="">Belum ditentukan</option>
          <option>Di bawah Rp5 jt</option>
          <option>Rp5–10 jt</option>
          <option>Rp10–25 jt</option>
          <option>Di atas Rp25 jt</option>
        </select>
      </label>
      <label className="field-label">
        Rencana mulai
        <select
          value={draft.start}
          onChange={(event) => update("start", event.target.value)}
          className="form-field"
        >
          <option value="">Belum dipilih</option>
          <option>Secepatnya</option>
          <option>Bulan ini</option>
          <option>1–3 bulan lagi</option>
          <option>Masih mencari tahu</option>
        </select>
      </label>
      <label className="field-label lg:col-span-2">
        Situasi saat ini <span aria-hidden="true">*</span>
        <textarea
          value={draft.situation}
          onChange={(event) => update("situation", event.target.value)}
          placeholder="Apa yang sedang terjadi, apa yang sudah dicoba, dan hasil apa yang Anda harapkan?"
          rows={5}
          className="form-field resize-none"
          aria-invalid={Boolean(errors.situation)}
          aria-describedby={errors.situation ? "situation-error" : undefined}
        />
        {errors.situation && (
          <span id="situation-error" className="field-error">
            {errors.situation}
          </span>
        )}
      </label>
      <div className="flex flex-col gap-4 border-t border-brand/15 pt-6 lg:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Draft tersimpan otomatis di perangkat ini. Anda dapat menyalin pesan
          atau membukanya langsung di WhatsApp.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={copyMessage}
            className="button-secondary"
            aria-live="polite"
          >
            {copied ? "Pesan tersalin" : "Salin pesan"}
          </button>
          <button type="submit" className="button-primary">
            Lanjut ke WhatsApp <Arrow />
          </button>
        </div>
      </div>
    </form>
  )
}

function ProblemFinder({
  onUseResult,
}: {
  onUseResult: (summary: string) => void
}) {
  const [step, setStep] = useState(1)
  const [active, setActive] = useState<number | null>(null)
  const [checked, setChecked] = useState<number[]>([])
  const problem = active === null ? null : problems[active]
  const matchedSigns = problem
    ? `${checked.length} dari ${problem.signs.length} tanda dipilih`
    : ""

  const chooseProblem = (index: number) => {
    setActive(index)
    setChecked([])
    setStep(2)
  }

  const reset = () => {
    setActive(null)
    setChecked([])
    setStep(1)
  }

  const summary = problem
    ? `${problem.title}. ${checked.length} dari ${problem.signs.length} tanda teridentifikasi. Rekomendasi awal: ${problem.start}`
    : ""

  return (
    <section
      id="problems"
      className="scroll-mt-20 border-y border-ink/10 bg-surface py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">
            <span className="h-px w-8 bg-brand" /> Diagnosis singkat · sekitar 2
            menit
          </p>
          <h2 className="section-title">
            Temukan titik awal dari masalah Anda.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            Belum tahu layanan yang tepat? Pilih masalah yang Anda alami, tandai
            kondisinya, lalu lihat langkah awal yang disarankan.
          </p>
        </div>

        <div
          className="mt-10 flex items-center gap-3"
          aria-label={`Langkah ${step} dari 3`}
        >
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className={`diagnosis-progress h-1.5 flex-1 rounded-full ${
                item <= step ? "bg-brand" : "bg-brand/15"
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-semibold text-muted">
            {step}/3
          </span>
        </div>

        <div
          className="mt-6 rounded-2xl bg-canvas p-5 shadow-[0_24px_70px_rgba(23,34,55,.08)] sm:p-9"
          aria-live="polite"
        >
          <div key={step} className="diagnosis-step">
            {step === 1 && (
              <>
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                    Langkah 1
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    Kalimat mana yang paling sering Anda ucapkan?
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {problems.map((item, index) => (
                    <button
                      key={item.title}
                      onClick={() => chooseProblem(index)}
                      className="problem-choice"
                    >
                      <span className="font-mono text-xs text-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.short}</small>
                      </span>
                      <Arrow />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && problem && (
              <>
                <button onClick={reset} className="back-link">
                  ← Ganti masalah
                </button>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                  Langkah 2 · Kenali tandanya
                </p>
                <blockquote className="mt-4 max-w-3xl font-serif text-3xl leading-tight italic text-brand sm:text-4xl">
                  {problem.quote}
                </blockquote>
                <p className="mt-4 max-w-3xl leading-relaxed text-body">
                  {problem.scene}
                </p>
                <fieldset className="mt-8 border-t border-ink/15 pt-7">
                  <legend className="text-sm font-semibold">
                    Mana yang sedang Anda alami?
                  </legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {problem.signs.map((sign, index) => {
                      const selected = checked.includes(index)
                      return (
                        <label
                          key={sign}
                          className={`choice-card ${
                            selected ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={selected}
                            onChange={() =>
                              setChecked((current) =>
                                selected
                                  ? current.filter((item) => item !== index)
                                  : [...current, index],
                              )
                            }
                          />
                          <span className="choice-check">
                            {selected && <Check />}
                          </span>
                          <span>{sign}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">
                    {checked.length
                      ? `${checked.length} tanda dipilih`
                      : "Pilih minimal satu tanda untuk melanjutkan."}
                  </p>
                  <button
                    disabled={!checked.length}
                    onClick={() => setStep(3)}
                    className="button-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Lihat rekomendasi <Arrow />
                  </button>
                </div>
              </>
            )}

            {step === 3 && problem && (
              <>
                <button onClick={() => setStep(2)} className="back-link">
                  ← Ubah jawaban
                </button>
                <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_.8fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                      Hasil diagnosis awal
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <h3 className="text-3xl font-semibold tracking-tight">
                        {problem.title}
                      </h3>
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                        {matchedSigns}
                      </span>
                    </div>
                    <p className="mt-5 leading-relaxed text-body">
                      {problem.impact}
                    </p>
                    <div className="mt-7 rounded-xl border border-brand/15 bg-white/50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                        Titik awal yang disarankan
                      </p>
                      <p className="mt-2 font-medium leading-relaxed">
                        {problem.start}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-brand p-5 text-white sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-inverse-muted">
                      Rekomendasi layanan
                    </p>
                    <div className="mt-4 divide-y divide-white/15 border-y border-white/15">
                      {problem.recommendations.map(([item, price]) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-4 py-3 text-sm"
                        >
                          <span>{item}</span>
                          <strong>{price}</strong>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-inverse-muted">
                      Rekomendasi ini berdasarkan jawaban Anda, bukan audit
                      menyeluruh. Kebutuhan dan harga akhir dikonfirmasi setelah
                      diskusi awal.
                    </p>
                    <button
                      onClick={() => onUseResult(summary)}
                      className="button-light mt-6 w-full"
                    >
                      Bahas rekomendasi ini <Arrow />
                    </button>
                  </div>
                </div>
                <button onClick={reset} className="back-link mt-7">
                  Mulai diagnosis baru
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { pageRef, activeSection } = usePageMotion()
  const [filter, setFilter] = useState<Group | "all">("all")
  const [openService, setOpenService] = useState<number | null>(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [diagnosis, setDiagnosis] = useState("")

  const filteredServices = useMemo(
    () =>
      filter === "all"
        ? services
        : services.filter((service) => service.group === filter),
    [filter],
  )

  const consultationLink = whatsappLink(
    "Halo Hadi, saya ingin berdiskusi mengenai kebutuhan pemasaran/bisnis saya.",
  )

  const scrollTo = (id: string) => {
    scrollToSection(id)
    setMobileNav(false)
  }

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNav(false)
    }
    document.addEventListener("keydown", closeMenu)
    document.body.style.overflow = mobileNav ? "hidden" : ""
    return () => {
      document.removeEventListener("keydown", closeMenu)
      document.body.style.overflow = ""
    }
  }, [mobileNav])

  const useDiagnosis = (summary: string) => {
    setDiagnosis(summary)
    window.setTimeout(() => scrollToSection("brief"), 50)
  }

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-canvas text-ink"
    >
      <a href="#content" className="skip-link">
        Lewati ke konten utama
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/90 backdrop-blur-xl">
        <div className="reading-progress" aria-hidden="true" />
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => scrollTo("top")}
            className="flex items-center gap-3 text-left"
            aria-label="Kembali ke atas"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-xs font-bold tracking-wider text-white">
              MH
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-semibold">Mahasin Hadiyatulloh</span>
              <span className="block text-xs text-muted">
                Marketing · Data · AI
              </span>
            </span>
          </button>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Navigasi utama"
          >
            {[
              ["Diagnosis", "problems"],
              ["Layanan", "services"],
              ["Bukti & proses", "proof"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link text-sm text-body"
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </button>
            ))}
            <a
              href={consultationLink}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Diskusikan proyek <Arrow />
            </a>
          </nav>

          <button
            onClick={() => setMobileNav((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 md:hidden"
            aria-expanded={mobileNav}
            aria-controls="mobile-navigation"
            aria-label={mobileNav ? "Tutup menu" : "Buka menu"}
          >
            <span className="space-y-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
        {mobileNav && (
          <div
            id="mobile-navigation"
            className="mobile-menu h-[calc(100vh-5rem)] border-t border-ink/10 bg-canvas px-5 py-5 md:hidden"
          >
            {[
              ["Diagnosis", "problems"],
              ["Layanan", "services"],
              ["Bukti & proses", "proof"],
              ["Kirim brief", "brief"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full border-b border-ink/10 py-3 text-left"
              >
                {label}
              </button>
            ))}
            <a
              href={consultationLink}
              target="_blank"
              rel="noreferrer"
              className="button-primary mt-5 w-full"
            >
              Diskusikan proyek <Arrow />
            </a>
          </div>
        )}
      </header>

      <div id="content">
        <section
          id="top"
          className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-48"
        >
          <div
            aria-hidden="true"
            className="hero-glow pointer-events-none absolute right-[-8rem] top-24 h-80 w-80 rounded-full bg-glow/60 blur-3xl"
          />
          <div className="hero-intro relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-7">
                <span className="h-px w-8 bg-brand" /> Marketing · Data · AI ·
                Bandung
              </p>
              <h1 className="hero-heading">
                Dari masalah bisnis
                <span className="block font-serif font-normal italic text-accent">
                  ke langkah yang jelas.
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-body sm:text-lg">
                Saya membantu Anda merapikan pemasaran, memahami data, dan
                menerapkan AI dalam pekerjaan tim. Mulai dari masalah Anda, lalu
                pilih layanan dengan hasil kerja dan harga yang jelas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("problems")}
                  className="button-primary"
                >
                  Temukan langkah awal <Arrow />
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="button-secondary"
                >
                  Lihat layanan & harga
                </button>
              </div>
            </div>
            <figure className="hero-portrait">
              <img
                src="/images/mahasin-portrait-1200.webp"
                srcSet="/images/mahasin-portrait-640.webp 640w, /images/mahasin-portrait-1200.webp 1200w"
                sizes="(min-width: 1024px) 480px, (min-width: 540px) 480px, calc(100vw - 40px)"
                width={1200}
                height={1490}
                alt="Mahasin Hadiyatulloh mengenakan jas navy dan kemeja putih dengan latar charcoal."
                fetchPriority="high"
                decoding="async"
              />
              <figcaption className="portrait-caption">
                <span>
                  <span className="portrait-name">Mahasin Hadiyatulloh</span>
                  <span className="portrait-role">Marketing · Data · AI</span>
                </span>
                <span className="portrait-index" aria-hidden="true">
                  MH.
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="relative mt-20 grid border-y border-ink/15 py-7 sm:grid-cols-3 lg:mt-28">
            {[
              ["10", "Layanan dengan harga transparan"],
              ["4–5", "Brand aktif dipimpin"],
              ["2–3", "Proyek aktif agar tetap fokus"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`flex items-baseline gap-3 py-3 sm:py-0 ${
                  index ? "sm:border-l sm:border-ink/15 sm:pl-8" : ""
                }`}
              >
                <strong className="text-3xl font-semibold tracking-tight">
                  {value}
                </strong>
                <span className="text-sm text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <ProblemFinder onUseResult={useDiagnosis} />

        <section id="services" className="bg-brand py-20 text-canvas lg:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="eyebrow mb-5 text-inverse-body">
                  <span className="h-px w-8 bg-current" /> Katalog layanan
                </p>
                <h2 className="section-title max-w-lg">
                  Sudah tahu yang Anda butuhkan?
                </h2>
              </div>
              <p className="max-w-xl self-end text-lg leading-relaxed text-inverse-body">
                Lihat hasil kerja yang Anda terima, informasi yang perlu
                disiapkan, dan harga setiap layanan. Pilih kategori, lalu buka
                detail layanan yang sesuai.
              </p>
            </div>

            <div
              className="mt-14 flex gap-2 overflow-x-auto pb-3"
              aria-label="Filter layanan"
            >
              <button
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={`filter-chip ${filter === "all" ? "active" : ""}`}
              >
                Semua
              </button>
              {(Object.entries(groups) as [Group, {
                label: string
                number: string
              }][]).map(([key, group]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={`filter-chip ${filter === key ? "active" : ""}`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            <div
              key={filter}
              className="service-results mt-6 border-t border-white/20"
            >
              {filteredServices.map((service) => {
                const isOpen = openService === service.id
                return (
                  <article
                    key={service.id}
                    className="border-b border-white/20"
                  >
                    <button
                      onClick={() => setOpenService(isOpen ? null : service.id)}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] gap-3 py-7 text-left sm:grid-cols-[4rem_1fr_11rem_2rem] sm:items-center"
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                    >
                      <span className="font-mono text-xs text-inverse-muted">
                        {String(service.id).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-sm text-inverse-muted sm:hidden">
                          {service.scope}
                        </span>
                      </span>
                      <span className="hidden text-sm text-inverse-muted sm:block">
                        {groups[service.group].label}
                      </span>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full border border-white/30 transition-colors ${
                          isOpen ? "bg-accent-soft text-brand" : ""
                        }`}
                      >
                        <Arrow down={!isOpen} />
                      </span>
                    </button>
                    <div
                      id={`service-panel-${service.id}`}
                      aria-hidden={!isOpen}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows] duration-500 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid gap-8 pb-10 pl-[3.25rem] sm:pl-16 lg:grid-cols-[1fr_1fr]">
                          <div>
                            <p className="max-w-md text-base leading-relaxed text-inverse-body">
                              {service.description}
                            </p>
                            <p className="mt-3 text-xs uppercase tracking-[.14em] text-inverse-muted">
                              {service.scope}
                            </p>
                            <div className="mt-7">
                              <p className="detail-label">Yang Anda terima</p>
                              <ul className="mt-3 space-y-2 text-sm text-inverse-body">
                                {service.deliverables.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <Check />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <p className="detail-label">Harga per item</p>
                            <div className="mt-3 border-t border-white/15">
                              {serviceDetails[service.id].prices.map(
                                (price) => (
                                  <div
                                    key={price.item}
                                    className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-white/15 py-3 text-sm"
                                  >
                                    <span className="text-inverse-body">
                                      {price.item}
                                    </span>
                                    <strong className="font-medium">
                                      {price.price}
                                    </strong>
                                    {price.note && (
                                      <span className="col-span-2 mt-1 text-xs text-inverse-muted">
                                        {price.note}
                                      </span>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                            <div className="mt-7 grid gap-5 sm:grid-cols-2">
                              <div>
                                <p className="detail-label">
                                  Yang saya butuhkan
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-inverse-body">
                                  {serviceDetails[service.id].needed}
                                </p>
                              </div>
                              <div>
                                <p className="detail-label">Cocok untuk</p>
                                <p className="mt-2 text-sm leading-relaxed text-inverse-body">
                                  {serviceDetails[service.id].suitable}
                                </p>
                              </div>
                            </div>
                            <a
                              href={whatsappLink(
                                `Halo Hadi, saya tertarik dengan layanan ${service.title}. Saya ingin mendiskusikan kebutuhan dan lingkup yang paling sesuai.`,
                              )}
                              target="_blank"
                              rel="noreferrer"
                              className="button-light mt-7"
                            >
                              Tanya layanan ini <Arrow />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="proof"
          className="border-b border-ink/10 bg-surface py-20 lg:py-28"
        >
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="eyebrow mb-5">
                  <span className="h-px w-8 bg-brand" /> Contoh dampak kerja
                </p>
                <h2 className="section-title">Bukan berhenti di dokumen.</h2>
                <p className="mt-6 max-w-md leading-relaxed text-body">
                  Contoh berikut dianonimkan untuk menjaga kerahasiaan. Fokusnya
                  adalah perubahan yang dapat dipakai tim setelah proyek
                  selesai.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Retail multi-brand",
                    "Data iklan dan transaksi tersebar",
                    "Tracking dirapikan, kampanye diprioritaskan berdasarkan kebocoran terbesar, dan laporan disatukan terhadap target.",
                  ],
                  [
                    "Bisnis hospitality",
                    "Promo ramai tetapi margin tidak jelas",
                    "Biaya promo dipetakan, asumsi dibuat transparan, dan tim mendapat model untuk menguji skenario sendiri.",
                  ],
                  [
                    "Tim operasional",
                    "Pekerjaan rutin bergantung pada satu orang",
                    "Proses utama diterjemahkan menjadi SOP, ukuran kinerja, dan alur kerja yang dapat dijalankan tim.",
                  ],
                  [
                    "Ide produk internal",
                    "Konsep masih tersebar di chat dan spreadsheet",
                    "Kebutuhan ditulis menjadi spesifikasi dan prototipe yang dapat langsung diuji pengguna.",
                  ],
                ].map(([context, problem, outcome]) => (
                  <article
                    key={context}
                    className="rounded-xl border border-brand/10 bg-canvas p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                      {context}
                    </p>
                    <h3 className="mt-5 text-lg font-semibold leading-snug">
                      {problem}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-body">
                      {outcome}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow mb-5">
                <span className="h-px w-8 bg-brand" /> Cara kerja
              </p>
              <h2 className="section-title">
                Sederhana, terbuka, dan berorientasi keputusan.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-body">
                Kita sepakati tujuan, periksa kondisi saat ini, lalu kerjakan
                prioritasnya. Anda tahu apa yang sedang dikerjakan dan langkah
                berikutnya di setiap tahap.
              </p>
            </div>
            <div className="border-t border-ink/15">
              {[
                [
                  "01",
                  "Pahami",
                  "Kita mulai dari konteks bisnis, masalah, dan hasil yang ingin dicapai.",
                ],
                [
                  "02",
                  "Ukur",
                  "Data, proses, dan asumsi diperiksa untuk menemukan kebocoran terbesar.",
                ],
                [
                  "03",
                  "Prioritaskan",
                  "Peluang diurutkan berdasarkan dampak, usaha, dan kekuatan bukti.",
                ],
                [
                  "04",
                  "Kerjakan",
                  "Solusi dikerjakan bertahap, dengan tinjauan kemajuan secara rutin.",
                ],
                [
                  "05",
                  "Serahkan",
                  "Anda menerima hasil, dokumentasi, dan langkah berikutnya yang dapat dijalankan.",
                ],
              ].map(([number, title, copy]) => (
                <div
                  key={number}
                  className="grid gap-3 border-b border-ink/15 py-7 sm:grid-cols-[4rem_10rem_1fr] sm:items-start"
                >
                  <span className="font-mono text-xs text-subtle">
                    {number}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="max-w-lg leading-relaxed text-muted">{copy}</p>
                </div>
              ))}
              <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Belum yakin proses mana yang Anda butuhkan? Mulai dari
                  percakapan singkat tentang situasi saat ini.
                </p>
                <a
                  href={consultationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary shrink-0"
                >
                  Diskusikan kebutuhannya <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-white/40 py-20 lg:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow mb-5">
                <span className="h-px w-8 bg-brand" /> Bentuk kerja sama
              </p>
              <h2 className="section-title">Tiga cara untuk memulai.</h2>
              <p className="mt-6 text-lg leading-relaxed text-body">
                Pilih format sesuai seberapa jelas kebutuhan Anda saat ini.
              </p>
            </div>
            <div className="mt-12 grid border-y border-ink/15 md:grid-cols-3">
              {[
                [
                  "01",
                  "Proyek",
                  "Untuk kebutuhan dengan hasil kerja dan ruang lingkup yang sudah jelas.",
                  "Per item, mulai Rp2,5 jt",
                ],
                [
                  "02",
                  "Pendampingan bulanan",
                  "Untuk pekerjaan berkelanjutan yang perlu dipantau dan diperbaiki secara rutin.",
                  "Rp4–8 jt per bulan",
                ],
                [
                  "03",
                  "Pemetaan masalah",
                  "Untuk menemukan akar masalah dan menyusun prioritas sebelum memulai proyek.",
                  "Rp6 jt · 1–2 minggu",
                ],
              ].map(([number, title, copy, price], index) => (
                <article
                  key={title}
                  className={`flex flex-col py-8 md:px-8 ${
                    index
                      ? "border-t border-ink/15 md:border-l md:border-t-0"
                      : "md:pl-0"
                  }`}
                >
                  <span className="font-mono text-xs text-subtle">
                    {number}
                  </span>
                  <h3 className="mt-8 text-2xl font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 min-h-20 leading-relaxed text-muted">
                    {copy}
                  </p>
                  <p className="mt-6 border-t border-ink/15 pt-4 text-sm font-semibold">
                    {price}
                  </p>
                  <button
                    onClick={() => scrollTo("brief")}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent-strong hover:underline hover:underline-offset-4"
                  >
                    Pilih format ini <Arrow />
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
              Harga akhir disepakati setelah kebutuhan dan ruang lingkupnya
              jelas. Belum termasuk anggaran iklan, pajak, biaya kru, dan
              peralatan produksi.
            </p>
          </div>
        </section>

        <section id="about" className="border-y border-ink/10 bg-surface">
          <div className="mx-auto grid max-w-[1240px] lg:grid-cols-2">
            <div className="px-5 py-20 sm:px-8 lg:py-28 lg:pr-20">
              <p className="eyebrow mb-5">
                <span className="h-px w-8 bg-brand" /> Tentang saya
              </p>
              <h2 className="section-title">
                Strategi yang dekat dengan pekerjaan sehari-hari.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
                Saya Mahasin, Group Marketing Manager yang sehari-hari memimpin
                pemasaran untuk brand ritel, fashion, dan hospitality.
                Perspektif saya sederhana: strategi harus bisa diukur,
                dijalankan tim, dan memberi dampak bisnis.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  "Google Data Analytics",
                  "Google Search Ads",
                  "Microsoft Advertising",
                  "IAB Foundations",
                ].map((credential) => (
                  <div key={credential} className="border-t border-ink/20 pt-4">
                    <p className="text-xs uppercase tracking-[.14em] text-subtle">
                      Sertifikasi
                    </p>
                    <p className="mt-1 font-medium">{credential}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-panel p-8 sm:p-12 lg:p-16">
              <span className="absolute -right-10 -top-28 font-serif text-[24rem] leading-none text-brand/5">
                M
              </span>
              <blockquote className="relative max-w-lg font-serif text-3xl leading-tight italic text-brand sm:text-4xl">
                “Percaya pada angka sebelum membelanjakan.”
              </blockquote>
              <p className="relative mt-6 text-sm text-body">
                Prinsip kerja utama dalam setiap proyek
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="text-center">
            <p className="eyebrow mb-5 justify-center">
              <span className="h-px w-8 bg-brand" /> Pertanyaan umum
            </p>
            <h2 className="section-title mx-auto">Sebelum mengirim brief.</h2>
          </div>
          <div className="mt-10 border-t border-ink/15">
            {[
              [
                "Apakah konsultasi awal berbayar?",
                "Tidak. Percakapan awal digunakan untuk memahami situasi dan memastikan kebutuhan Anda sesuai dengan area yang saya tangani.",
              ],
              [
                "Apakah harga di katalog sudah final?",
                "Harga adalah titik awal. Angka final mengikuti lingkup, jumlah data atau brand, kompleksitas, dan waktu pengerjaan yang disepakati setelah brief.",
              ],
              [
                "Berapa lama satu proyek berlangsung?",
                "Proyek kecil umumnya 1–2 minggu. Pekerjaan strategi, dashboard, atau prototipe dapat berlangsung 3–6 minggu, tergantung kesiapan data dan masukan Anda. Untuk aplikasi hingga peluncuran, jadwal disusun berdasarkan fitur, integrasi, dan kebutuhan pengujian.",
              ],
              [
                "Apakah bisa mulai dari masalah yang belum jelas?",
                "Bisa. Sesi pemetaan masalah selama 1–2 minggu membantu kita memeriksa kondisi, menguji asumsi, dan menyusun prioritas sebelum memulai proyek yang lebih besar.",
              ],
            ].map(([question, answer], index) => (
              <details key={question} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left font-semibold">
                  <span>
                    <span className="mr-4 font-mono text-xs text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {question}
                  </span>
                  <span
                    className="text-xl transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pl-10 leading-relaxed text-body">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow mb-5">
                <span className="h-px w-8 bg-brand" /> Ruang lingkup kerja
              </p>
              <h2 className="section-title">Yang saya sampaikan sejak awal.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                [
                  "Aplikasi",
                  "Pengembangan aplikasi dari perumusan kebutuhan hingga peluncuran. Fitur, integrasi, pengujian, dan dukungan setelah peluncuran disepakati sesuai kebutuhan proyek.",
                ],
                [
                  "Kontrak",
                  "Review dilakukan terhadap syarat yang sudah disepakati. Saya tidak menyusun kontrak atau memberi nasihat hukum.",
                ],
                [
                  "Finansial",
                  "Mencakup studi kelayakan bisnis, model keuangan, proyeksi arus kas, analisis titik impas, skenario investasi, dan strategi harga untuk mendukung keputusan bisnis. Layanan perpajakan tidak termasuk dalam cakupan.",
                ],
              ].map(([title, copy]) => (
                <article key={title} className="border-t-2 border-brand pt-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="brief" className="scroll-mt-24 bg-canvas pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-accent-soft px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
              <div className="absolute -bottom-44 -right-32 h-96 w-96 rounded-full border-[70px] border-brand/5" />
              <div className="relative">
                <p className="eyebrow mb-5">
                  <span className="h-px w-8 bg-brand" /> Cerita awal proyek
                </p>
                <h2 className="max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[.94] tracking-[-0.045em]">
                  Ceritakan situasi Anda.
                </h2>
                <p className="mb-10 mt-6 max-w-xl text-body">
                  Ceritakan kebutuhan dan hasil yang ingin dicapai. Formulir ini
                  menyiapkan pesan untuk dikirim lewat WhatsApp. Diskusi awal
                  gratis, tanpa kewajiban melanjutkan proyek.
                </p>
                {diagnosis && (
                  <div className="mb-8 rounded-xl border border-brand/15 bg-white/45 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">
                      Hasil diagnosis ikut dilampirkan
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {diagnosis}
                    </p>
                  </div>
                )}
                <BriefForm servicesList={services} diagnosis={diagnosis} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-ink/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Mahasin Hadiyatulloh</p>
          <p>Bandung, Indonesia · Terbuka untuk proyek yang sesuai</p>
        </div>
      </footer>
    </main>
  )
}
