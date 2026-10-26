const catalogueUrl = "https://www.ut.ac.id/wp-content/uploads/2026/09/01-Katalog-NON-PENDAS-TAHUN-2026-2027-16092026.pdf";
const libraryUrl = "https://pustaka.ut.ac.id/lib/category/ruang-baca-virtual/fst/sistem-informasi-s1/";

const sources = {
  os: {
    label: "BMP MSIM4201 Sistem Operasi, Edisi 2 (2025)",
    url: "https://pustaka.ut.ac.id/lib/msim4201-sistem-operasi-edisi-2/",
    edition: "Edisi 2 · 2025",
    topics: "Konsep, sejarah, jenis, komponen, dan cara kerja sistem operasi serta interaksinya dengan perangkat keras dan aplikasi."
  },
  algo: {
    label: "BMP MSIM4203 Algoritma dan Pemrograman, Edisi 2 (2022)",
    url: "https://pustaka.ut.ac.id/lib/msim4203-algoritma-dan-pemograman-edisi-2/",
    edition: "Edisi 2 · 2022",
    topics: "Representasi algoritma, pseudocode, flowchart, struktur kontrol, dan dasar pemrograman Java termasuk tipe data, percabangan, perulangan, array, method, serta OOP."
  },
  database: {
    label: "BMP MSIM4206 Basis Data (2020)",
    url: "https://pustaka.ut.ac.id/lib/msim4206-basis-data/",
    edition: "Edisi 1 · 2020",
    topics: "Konsep dan model data, ERD, normalisasi, SQL, transaksi, basis data terdistribusi, dan pengembangan aplikasi basis data."
  }
};

const ready = (id, semester, curriculumCode, bmpCode, title, bmpTitle, credits, source, questions) => ({
  id, semester, curriculumCode, bmpCode, title, bmpTitle, credits,
  sourceLabel: source.label, sourceUrl: source.url, edition: source.edition,
  status: "ready", summary: source.topics, questions
});

const listed = (id, semester, curriculumCode, bmpCode, title, bmpTitle, credits, options = {}) => ({
  id, semester, curriculumCode, bmpCode, title, bmpTitle, credits,
  choiceGroup: options.choiceGroup || "", choiceLabel: options.choiceLabel || "",
  status: options.status || "source-needed",
  sourceLabel: options.status === "no-uas" ? "Katalog UT 2026/2027 · tanpa UAS" : "Katalog UT 2026/2027 · BMP perlu ditinjau",
  sourceUrl: catalogueUrl, edition: "Katalog Kurikulum UT 2026/2027",
  summary: options.status === "no-uas" ? "Pada katalog kurikulum UT 2026/2027, mata kuliah ini berkode waktu ujian 99 (tanpa UAS). Gunakan panduan tugas atau asesmen yang berlaku." : "",
  questions: []
});

const courses = [
  // Semester 1 (paket 17 SKS; pilih satu mata kuliah agama)
  listed("pengantar-si", 1, "STSI4101", "EMBS4321", "Pengantar Sistem Informasi", "Sistem Informasi Manajemen", 3),
  ready("sistem-operasi", 1, "STSI4103", "MSIM4201", "Sistem Operasi", "Sistem Operasi", 3, sources.os, [
    { prompt: "Tujuan utama sistem operasi dalam sistem komputer adalah …", choices: ["Menggantikan semua aplikasi pengguna", "Mengelola sumber daya komputer dan menyediakan lingkungan untuk menjalankan program", "Mengubah seluruh data menjadi kode mesin", "Menyimpan cadangan semua berkas secara otomatis"], answerIndex: 1, explanation: "Sistem operasi mengatur sumber daya perangkat keras dan menyediakan layanan agar aplikasi dapat berjalan dengan baik." },
    { prompt: "Komponen perangkat lunak yang membantu sistem operasi berkomunikasi dengan perangkat tertentu disebut …", choices: ["Compiler", "Device driver", "Spreadsheet", "Interpreter SQL"], answerIndex: 1, explanation: "Device driver menjadi perantara instruksi sistem operasi dengan perangkat I/O tertentu." },
    { prompt: "Ketika beberapa program berjalan seolah-olah mendapat giliran pemrosesan, fungsi sistem operasi yang paling terkait adalah …", choices: ["Manajemen proses dan penjadwalan CPU", "Pemformatan dokumen", "Penggambaran antarmuka web", "Kompresi gambar"], answerIndex: 0, explanation: "Sistem operasi mengatur proses dan menjadwalkan penggunaan CPU agar beberapa pekerjaan dapat berbagi sumber daya." },
    { prompt: "Manakah contoh tanggung jawab sistem operasi terhadap memori?", choices: ["Menentukan isi laporan keuangan", "Mengalokasikan ruang memori kepada proses dan melacak penggunaannya", "Mendesain bentuk fisik monitor", "Mengoreksi ejaan dokumen"], answerIndex: 1, explanation: "Manajemen memori mengalokasikan dan membebaskan ruang serta menjaga pemakaian memori oleh proses." },
    { prompt: "Sebuah aplikasi tidak perlu mengirim sinyal listrik langsung ke perangkat penyimpanan karena …", choices: ["Sistem operasi menyediakan abstraksi dan layanan akses perangkat", "Aplikasi selalu berjalan tanpa perangkat keras", "Semua penyimpanan adalah memori utama", "Perangkat penyimpanan menerjemahkan bahasa manusia"], answerIndex: 0, explanation: "Sistem operasi menyembunyikan detail perangkat melalui antarmuka dan layanan yang lebih seragam." }
  ]),
  listed("agama-islam", 1, "MKWN4101", "MKWN4101", "Pendidikan Agama Islam", "Pendidikan Agama Islam", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  listed("agama-katolik", 1, "MKWN4102", "MKWU4102", "Pendidikan Agama Katolik", "Pendidikan Agama Katolik", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  listed("agama-kristen", 1, "MKWN4103", "MKWU4103", "Pendidikan Agama Kristen", "Pendidikan Agama Kristen", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  listed("agama-buddha", 1, "MKWN4104", "MKWU4104", "Pendidikan Agama Buddha", "Pendidikan Agama Buddha", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  listed("agama-hindu", 1, "MKWN4105", "MKWU4105", "Pendidikan Agama Hindu", "Pendidikan Agama Hindu", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  listed("agama-khonghucu", 1, "MKWN4107", "MKWU4107", "Pendidikan Agama Khonghucu", "Pendidikan Agama Khonghucu", 3, { choiceGroup: "agama", choiceLabel: "Pilih satu sesuai data pribadi" }),
  ready("algoritma-pemrograman", 1, "STSI4102", "MSIM4203", "Algoritma dan Pemrograman", "Algoritma dan Pemrograman", 3, sources.algo, [
    { prompt: "Struktur algoritma yang menjalankan instruksi satu demi satu dalam urutan tertentu disebut …", choices: ["Seleksi", "Sekuen", "Perulangan", "Rekursi"], answerIndex: 1, explanation: "Struktur sekuen mengeksekusi langkah secara berurutan dari instruksi pertama hingga berikutnya." },
    { prompt: "Jika program memilih satu dari dua tindakan berdasarkan kondisi benar atau salah, struktur yang digunakan adalah …", choices: ["Seleksi", "Sekuensial", "Deklarasi", "Kompilasi"], answerIndex: 0, explanation: "Seleksi menentukan alur berdasarkan kondisi, misalnya if/else." },
    { prompt: "Untuk mengulang proses pencetakan angka dari 1 sampai 100, struktur yang paling sesuai ialah …", choices: ["Perulangan", "Seleksi tunggal", "Deklarasi variabel", "Komentar"], answerIndex: 0, explanation: "Perulangan mengeksekusi blok instruksi berulang kali selama syaratnya terpenuhi." },
    { prompt: "Dalam flowchart, simbol belah ketupat umumnya digunakan untuk menunjukkan …", choices: ["Awal atau akhir", "Keputusan atau pengujian kondisi", "Masukan/keluaran", "Proses perhitungan"], answerIndex: 1, explanation: "Simbol keputusan mewakili percabangan alur berdasarkan hasil kondisi." },
    { prompt: "Tipe data yang tepat untuk menyimpan nilai benar atau salah adalah …", choices: ["Boolean", "String", "Char", "Double"], answerIndex: 0, explanation: "Boolean merepresentasikan dua keadaan logis, yaitu true dan false." }
  ]),
  listed("pengantar-matematika", 1, "STMA4112", "MATA4101", "Matematika Dasar", "Pengantar Matematika", 3),
  listed("pkn", 1, "MKWN4109", "MKWN4109", "Pendidikan Kewarganegaraan", "Pendidikan Kewarganegaraan", 2),

  // Semester 2 (18 SKS)
  ready("basis-data", 2, "STSI4105", "MSIM4206", "Basis Data", "Basis Data", 3, sources.database, [
    { prompt: "Sebuah basis data paling tepat dipahami sebagai …", choices: ["Kumpulan data yang saling berhubungan dan dikelola untuk digunakan kembali", "Satu berkas teks tanpa struktur", "Program untuk menggambar antarmuka", "Perangkat keras untuk menyimpan listrik"], answerIndex: 0, explanation: "Basis data mengorganisasikan data terkait agar dapat disimpan, dikelola, dan digunakan secara efisien." },
    { prompt: "Dalam perancangan basis data, ERD terutama digunakan untuk …", choices: ["Menggambarkan entitas, atribut, dan hubungan data", "Menjadwalkan proses CPU", "Menyusun alur navigasi situs saja", "Mengompilasi program Java"], answerIndex: 0, explanation: "Entity Relationship Diagram memodelkan struktur konseptual data dan relasi antarentitas." },
    { prompt: "Tujuan utama normalisasi tabel relasional adalah …", choices: ["Mengurangi anomali dan redundansi data yang tidak perlu", "Membuat semua tabel berisi satu kolom", "Menghilangkan seluruh kunci", "Menggandakan setiap baris"], answerIndex: 0, explanation: "Normalisasi membantu menata dependensi data agar pembaruan, penyisipan, dan penghapusan tidak menimbulkan anomali." },
    { prompt: "Perintah SQL yang digunakan untuk mengambil baris data dari tabel adalah …", choices: ["SELECT", "UPDATE", "DROP", "INSERT"], answerIndex: 0, explanation: "SELECT mengambil atau menampilkan data dari satu atau lebih tabel." },
    { prompt: "Sekumpulan operasi yang diperlakukan sebagai satu unit kerja pada basis data disebut …", choices: ["Transaksi", "Atribut", "View port", "Driver"], answerIndex: 0, explanation: "Transaksi mengelompokkan operasi agar perubahan data dapat dikelola sebagai satu kesatuan." }
  ]),
  listed("struktur-data", 2, "STSI4104", "MSIM4202", "Struktur Data", "Struktur Data", 3),
  listed("metode-statistik", 2, "MKKI4201", "SATS4121", "Pengantar Statistika", "Metode Statistika I", 3),
  listed("bahasa-inggris", 2, "MKDI4201", "MKWI4201", "Bahasa Inggris", "Bahasa Inggris", 3),
  listed("bahasa-indonesia", 2, "MKWN4108", "MKWN4108", "Bahasa Indonesia", "Bahasa Indonesia", 2),
  listed("pancasila", 2, "MKWN4110", "MKWN4110", "Pancasila", "Pancasila", 2),
  listed("aljabar-linear", 2, "STMA4113", "MATA4112", "Aljabar Linear Elementer", "Aljabar Linear Elementer I", 2),

  // Semester 3 (21 SKS)
  listed("komputer-1", 3, "STIK4111", "SATS4111", "Dasar Pemrograman R", "Komputer I", 3),
  listed("logika-informatika", 3, "STSI4106", "MSIM4103", "Logika Informatika", "Logika Informatika", 3),
  listed("pemrograman-desktop", 3, "STSI4201", "MSIM4301", "Pemrograman Berbasis Desktop", "Pemrograman Berbasis Desktop", 3),
  listed("interaksi-manusia-komputer", 3, "STSI4203", "MSIM4208", "Interaksi Manusia dan Komputer", "Interaksi Manusia dan Komputer", 3),
  listed("rekayasa-perangkat-lunak", 3, "STSI4202", "MSIM4303", "Rekayasa Perangkat Lunak", "Rekayasa Perangkat Lunak", 3),
  listed("jaringan-komputer", 3, "STSI4205", "MSIM4204", "Jaringan Komputer", "Jaringan Komputer", 3),
  listed("belajar-era-digital", 3, "MKDI4202", "MKWI4202", "Belajar di Era Digital", "Belajar di Era Digital", 3),

  // Semester 4 (19 SKS)
  listed("kewirausahaan-digital", 4, "MKDI4203", "MKWI4203", "Kewirausahaan di Era Digital", "Kewirausahaan di Era Digital", 3),
  listed("analisis-visualisasi-data", 4, "STSI4204", "MSIM4310", "Analisis dan Visualisasi Data", "Analisis dan Visualisasi Data", 2),
  listed("analisis-perancangan-sistem", 4, "STSI4208", "MSIM4302", "Analisis dan Perancangan Sistem", "Analisis dan Perancangan Sistem", 3),
  listed("pemrograman-web", 4, "STSI4209", "MSIM4309", "Pemrograman Berbasis Web", "Pemrograman Berbasis Web", 3),
  listed("proses-bisnis", 4, "STSI4206", "STSI4206", "Proses Bisnis", "Proses Bisnis", 2),
  listed("sistem-informasi-manajemen", 4, "STSI4207", "MSIM4207", "Sistem Informasi Manajemen", "Sistem Informasi Manajemen", 3),
  listed("perilaku-organisasi", 4, "EMBS4207", "EMBS4207", "Perilaku Organisasi", "Perilaku Organisasi", 3),

  // Semester 5 (20 SKS; pilih satu mata kuliah pada kelompok pilihan)
  listed("basic-reading", 5, "FSSI4101", "BING4121", "Basic Reading", "Basic Reading", 3),
  listed("kalkulus", 5, "STMA4111", "MATA4110", "Kalkulus Diferensial", "Kalkulus I", 3),
  listed("pengantar-bisnis", 5, "EMBS4102", "EKMA4111", "Pengantar Bisnis", "Pengantar Bisnis", 3),
  listed("sistem-pendukung-keputusan", 5, "STSI4301", "MSIM4307", "Sistem Pendukung Keputusan", "Sistem Pendukung Keputusan", 3, { choiceGroup: "pilihan-semester-5", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("administrasi-server", 5, "STSI4302", "MSIM4308", "Administrasi Server", "Administrasi Server", 3, { choiceGroup: "pilihan-semester-5", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("teori-organisasi", 5, "FSAP4102", "ADPU4341", "Teori Organisasi", "Teori Organisasi", 3),
  listed("pemrograman-bergerak", 5, "STSI4303", "MSIM4401", "Pemrograman Berbasis Perangkat Bergerak", "Pemrograman Berbasis Perangkat Bergerak", 3),
  listed("komunikasi-bisnis", 5, "STSI4308", "SKOM4432", "Komunikasi Bisnis dan Teknis", "Komunikasi Bisnis", 2),

  // Semester 6 (20 SKS; katalog menyediakan kelompok mata kuliah pilihan)
  listed("data-mining", 6, "STSI4307", "MSIM4403", "Data Mining", "Data Mining", 3, { choiceGroup: "pilihan-semester-6-a", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("administrasi-jaringan", 6, "STSI4309", "MSIM4316", "Administrasi Jaringan", "Administrasi Jaringan", 3, { choiceGroup: "pilihan-semester-6-a", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("arsitektur-enterprise", 6, "STSI4306", "MSIM4311", "Arsitektur dan Perancangan Sistem Enterprise", "Arsitektur dan Perancangan Sistem Enterprise", 3),
  listed("etika-profesi", 6, "STSI4305", "MSIM4408", "Etika Profesi", "Etika Profesi", 2),
  listed("sistem-informasi-perencanaan", 6, "STPL4211", "PWKL4209", "Sistem Informasi Perencanaan", "Sistem Informasi Perencanaan", 3, { choiceGroup: "pilihan-semester-6-b", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("pemberdayaan-masyarakat", 6, "MKKI4301", "MKKI4301", "Pemberdayaan Masyarakat", "Panduan Pemberdayaan Masyarakat", 3, { choiceGroup: "pilihan-semester-6-b", choiceLabel: "Alternatif pilihan; tanpa UAS", status: "no-uas" }),
  listed("dasar-infrastruktur-ti", 6, "STSI4304", "MSIM4304", "Dasar Infrastruktur TI", "Dasar Infrastruktur TI", 2),
  listed("metodologi-penelitian", 6, "STSI4310", "MSIM4312", "Metodologi Penelitian", "Metodologi Penelitian", 3, { status: "no-uas" }),
  listed("manajemen", 6, "EMBS4101", "EKMA4116", "Manajemen", "Manajemen", 4),

  // Semester 7 (17 SKS; pilih satu mata kuliah jaringan/data warehouse)
  listed("data-warehouse", 7, "STSI4409", "MSIM4315", "Data Warehouse", "Data Warehouse", 3, { choiceGroup: "pilihan-semester-7", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("keamanan-jaringan", 7, "STSI4404", "MSIM4404", "Keamanan Jaringan", "Keamanan Jaringan", 3, { choiceGroup: "pilihan-semester-7", choiceLabel: "Pilih satu mata kuliah pilihan" }),
  listed("pengantar-sains-data", 7, "STDA4101", "STDA4101", "Pengantar Sains Data", "Pengantar Sains Data", 3),
  listed("risiko-audit-si", 7, "STSI4403", "MSIM4305", "Manajemen Risiko dan Audit Sistem Informasi", "Manajemen Risiko dan Audit Sistem Informasi", 3),
  listed("tata-kelola-ti", 7, "STSI4402", "MSIM4402", "Tata Kelola Teknologi Informasi", "Tata Kelola Teknologi Informasi", 2),
  listed("capstone-project", 7, "STSI4440", "STSI4401", "Tugas Akhir Program Sarjana (Capstone Project)", "Panduan Capstone Project", 6, { status: "no-uas" }),

  // Semester 8 (13 SKS)
  listed("manajemen-proyek-si", 8, "STSI4406", "MSIM4406", "Manajemen Proyek Sistem Informasi", "Manajemen Proyek Sistem Informasi", 2),
  listed("keamanan-si", 8, "STSI4405", "MSIM4405", "Keamanan Sistem Informasi", "Keamanan Sistem Informasi", 2),
  listed("manajemen-layanan-ti", 8, "STSI4407", "MSIM4407", "Manajemen Layanan Teknologi Informasi", "Manajemen Layanan Teknologi Informasi", 3),
  listed("e-bisnis", 8, "STSI4408", "STSI4408", "E-Bisnis", "E-Bisnis", 3),
  listed("sistem-informasi-akuntansi", 8, "EACC4207", "EKSI4312", "Sistem Informasi Akuntansi", "Sistem Informasi Akuntansi", 3)
];

const sourcesIndex = {
  catalogueUrl,
  libraryUrl,
  lastChecked: "26 Oktober 2026",
  readyCourseIds: ["sistem-operasi", "algoritma-pemrograman", "basis-data"]
};

window.UASData = { courses, sourcesIndex };
