# Ruang UAS — Sistem Informasi UT

Web latihan mandiri UAS dengan pemilihan semester, daftar mata kuliah, ringkasan BMP, pilihan 25/50/100 soal, kuis pilihan ganda, pembahasan, dan progres lokal.

## Menjalankan

Buka `index.html` langsung di browser modern. Jika browser membatasi pembukaan berkas lokal, jalankan server statis di folder ini (contoh: `python3 -m http.server 8000`) lalu buka `http://localhost:8000`.

## Rujukan dan batasan konten

- Daftar program dan paket semester mengikuti **Katalog Kurikulum UT 2026/2027** yang terbit September 2026.
- Kode mata kuliah kurikulum ditampilkan bersama kode BMP, karena keduanya dapat berbeda.
- Setiap mata kuliah yang menggunakan UAS menyediakan bank 100 latihan orisinal. Sesi mengambil 25, 50, atau 100 soal secara acak tanpa pengulangan dalam sesi.
- Pokok bahasan disusun dari tinjauan/daftar isi BMP pada Perpustakaan UT dan materi inisiasi/pengayaan pengguna yang relevan. Soal bukan soal resmi, bocoran, atau jaminan soal UAS; cocokkan kembali dengan edisi BMP yang digunakan.
- Mata kuliah yang dinyatakan tanpa UAS pada katalog ditandai terpisah dan tidak diberi kuis UAS.
- Status progres disimpan di localStorage pada browser/perangkat yang dipakai. Tidak ada akun atau sinkronisasi.
- Situs ini bukan situs resmi Universitas Terbuka.

## Sumber resmi

- [Katalog Kurikulum UT 2026/2027](https://www.ut.ac.id/wp-content/uploads/2026/09/01-Katalog-NON-PENDAS-TAHUN-2026-2027-16092026.pdf)
- [Perpustakaan Digital UT — Sistem Informasi S1](https://pustaka.ut.ac.id/lib/category/ruang-baca-virtual/fst/sistem-informasi-s1/)
- [Sistem Operasi MSIM4201, edisi 2](https://pustaka.ut.ac.id/lib/msim4201-sistem-operasi-edisi-2/)
- [Algoritma dan Pemrograman MSIM4203, edisi 2](https://pustaka.ut.ac.id/lib/msim4203-algoritma-dan-pemograman-edisi-2/)
- [Basis Data MSIM4206](https://pustaka.ut.ac.id/lib/msim4206-basis-data/)
- [Struktur Data MSIM4202, edisi 2](https://pustaka.ut.ac.id/lib/msim4202-struktur-data-edisi-2/)
- [Analisis dan Perancangan Sistem MSIM4302](https://pustaka.ut.ac.id/lib/msim4302-analisis-dan-perancangan-sistem/)
- [Rekayasa Perangkat Lunak MSIM4303](https://pustaka.ut.ac.id/lib/msim4303-rekayasa-perangkat-lunak/)
- [Pemrograman Berbasis Web MSIM4309](https://pustaka.ut.ac.id/lib/msim4309-pemrograman-berbasis-web/)
- [Data Warehouse MSIM4315](https://pustaka.ut.ac.id/lib/msim4315-data-warehouse/)
- [Keamanan Sistem Informasi MSIM4405](https://pustaka.ut.ac.id/lib/msim4405-keamanan-sistem-informasi/)
- [Manajemen Proyek Sistem Informasi MSIM4406](https://pustaka.ut.ac.id/lib/msim4406-manajemen-proyek-sistem-informasi/)
