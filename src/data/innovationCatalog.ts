import { InnovationItem } from '../types';

export const initialInnovationData: InnovationItem[] = [
  {
    id: 'inv-panel-akustik',
    title: 'Panel Akustik Peredam Suara Ramah Lingkungan',
    tagline: 'Mengubah limbah serbuk kayu sengon & ampas tebu menjadi panel peredam estetik bernilai arsitektural',
    wasteSource: 'Serbuk Gergaji Kayu Sengon & Ampas Tebu',
    wasteId: 'w-serbuk-kayu',
    category: 'Material Bangunan Alternatif',
    difficulty: 'Menengah',
    estimatedTime: '2 - 3 Hari (Termasuk Penjemuran)',
    estimatedCost: 'Rp 25.000 - Rp 40.000 / panel (60x60 cm)',
    economicValue: 'Dapat dijual Rp 120.000 - Rp 180.000 / panel ke studio podcast, kantor, atau kafe.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Serbuk Kayu Sengon Halus Terayak', amount: '1.5 kg' },
      { name: 'Serat Ampas Tebu Kering (Blended)', amount: '500 gram' },
      { name: 'Lem PVAc Ramah Lingkungan / Tepung Tapioka', amount: '350 gram' },
      { name: 'Air Hangat Bersih', amount: '800 ml' },
      { name: 'Pewarna Kayu Waterbased / Natural Eco-Dye', amount: '100 ml' }
    ],
    tools: [
      'Cetakan Kayu/Tripleks 60 x 60 x 3 cm',
      'Pemberat / Papan Press Manual Tekanan 5 kg',
      'Baskom Pengaduk Komposit Besar',
      'Gantungan Jemur Berventilasi',
      'Kuas Aplikator & Penggaris'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pengayakan & Pengeringan Bahan Baku',
        description: 'Pastikan serbuk kayu dan ampas tebu telah diayak dari serpihan paku/kotoran, lalu jemur hingga kadar air di bawah 12%.',
        tip: 'Serbuk kayu yang benar-benar kering akan menyerap lem secara homogen dan mencegah tumbuhnya jamur di kemudian hari.'
      },
      {
        stepNumber: 2,
        title: 'Pembuatan Adonan Binder (Perekat Alami)',
        description: 'Campurkan lem PVAc dengan air hangat bersuhu 40°C secara bertahap hingga kekentalan merata seperti santan kental.',
        tip: 'Tambahkan 1 sendok teh cuka putih atau minyak cengkeh sebagai fungisida alami antijamur.'
      },
      {
        stepNumber: 3,
        title: 'Pencampuran Matriks Komposit',
        description: 'Tuang binder ke dalam campuran serbuk kayu dan serat ampas tebu. Remas-remas dan aduk hingga gumpalan komposit padat dan tidak mudah hancur saat digenggam.',
        tip: 'Rasio 3 bagian serbuk kayu dan 1 bagian serat tebu menghasilkan koefisien reduksi bising (NRC) tertinggi (mencapai 0.65).'
      },
      {
        stepNumber: 4,
        title: 'Pencetakan & Pengepresan Seragam',
        description: 'Ratakan adonan ke dalam cetakan kayu 60x60 cm. Letakkan papan penekan di atasnya dan berikan beban merata 5-10 kg selama 12 jam.',
        tip: 'Beri pola alur segitiga atau garis geometris pada permukaan penekan untuk mendifraksikan gelombang suara lebih efektif.'
      },
      {
        stepNumber: 5,
        title: 'Pengeringan Alami & Finishing Estetik',
        description: 'Lepaskan panel dari cetakan secara hati-hati, lalu angin-anginkan di area teduh berangin selama 48 jam hingga panel mengeras sempurna. Semprotkan pelapis waterbased tipis.',
        tip: 'Hindari jemur di bawah terik matahari langsung yang ekstrem pada hari pertama agar panel tidak melengkung (warping).'
      }
    ],
    safetyTips: [
      'Gunakan masker N95 saat mencampur serbuk gergaji kering agar tidak terhirup ke saluran pernapasan.',
      'Gunakan sarung tangan karet saat memegang lem adonan untuk kenyamanan kulit.'
    ],
    status: 'verified',
    submittedBy: 'Tim Inovator GreenFab Lab Poltek',
    submissionDate: '12 Januari 2026'
  },
  {
    id: 'inv-lilin-jelantah',
    title: 'Lilin Aromaterapi Mewah dari Jelantah Terpurifikasi',
    tagline: 'Purifikasi minyak goreng sisa resto menjadi lilin wangi terapi penenang stres dengan aroma lavender & serai',
    wasteSource: 'Minyak Jelantah Industri Restoran / Rumah Makan',
    wasteId: 'w-jelantah',
    category: 'Kerajinan Kreatif & Home Decor',
    difficulty: 'Mudah',
    estimatedTime: '3 - 4 Jam',
    estimatedCost: 'Rp 8.000 - Rp 15.000 / jar lilin (100 gram)',
    economicValue: 'Dijual Rp 45.000 - Rp 75.000 / jar sebagai lilin aromaterapi premium di gift shop atau marketplace.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Minyak Jelantah Tersaring', amount: '250 ml' },
      { name: 'Arang Aktif / Kulit Pisang Kering (Purifier)', amount: '30 gram' },
      { name: 'Stearic Acid / Soy Wax Pelarut Alami', amount: '100 gram' },
      { name: 'Essential Oil Alami (Lavender / Serai Wangi)', amount: '15 ml' },
      { name: 'Pewarna Lilin Pastel Organik', amount: '2 gram' }
    ],
    tools: [
      'Panci Pemanas Double Boiler (Pemanas Tim Air)',
      'Termometer Masak Cairan',
      'Jar Kaca Bekas Selai / Cangkir Keramik Kecil',
      'Sumbu Lilin Katun + Penyangga Stik Kayu',
      'Saringan Kain Halus'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Proses Pemurnian & Deodorisasi Jelantah',
        description: 'Rendam minyak jelantah dengan bubuk arang aktif selama 24 jam untuk menyerap bau sisa gorengan dan zat warna gelap, lalu saring bersih.',
        tip: 'Alternatif arang aktif: gunakan kulit pisang kepok yang sudah diiris tipis dan digoreng sekali hingga menyerap bau gosong.'
      },
      {
        stepNumber: 2,
        title: 'Pelelehan Stearin / Wax dengan Suhu Terkontrol',
        description: 'Panaskan minyak jelantah murni bersama stearic acid dalam wadah double boiler hingga suhu 65°C - 70°C sampai larut bening.',
        tip: 'Jangan panaskan langsung di atas api kompor gas untuk mencegah letupan minyak.'
      },
      {
        stepNumber: 3,
        title: 'Pemberian Aroma & Pewarna Terapi',
        description: 'Matikan api kompor. Tunggu suhu cairan turun ke 55°C, lalu masukkan minyak atsiri aroma pilihan dan aduk perlahan selama 1 menit.',
        tip: 'Memasukkan essential oil pada suhu terlalu tinggi (>65°C) akan membuat zat aroma menguap sebelum lilin mengeras.'
      },
      {
        stepNumber: 4,
        title: 'Pemasangan Sumbu & Penuangan ke Jar',
        description: 'Rekatkan dasar sumbu di tengah jar kaca dengan lem lilin. Tuangkan larutan lilin cair perlahan ke dalam jar, jepit sumbu di atas dengan tusuk sate.',
        tip: 'Sisakan ruang 1 cm dari bibir atas toples jar.'
      },
      {
        stepNumber: 5,
        title: 'Pengerasan & Curing Sempurna',
        description: 'Biarkan lilin mengeras pada suhu ruang selama 12-24 jam sebelum dinyalakan. Potong sumbu menyisakan panjang 0.5 cm.',
        tip: 'Lilin jelantah terpurifikasi memiliki nyala api stabil dan sama sekali tidak berbau minyak goreng.'
      }
    ],
    safetyTips: [
      'Gunakan kain lap anti-panas saat memindahkan wadah lilin cair panas.',
      'Jauhkan dari jangkauan anak-anak saat proses penuangan panas.'
    ],
    status: 'verified',
    submittedBy: 'Komunitas Zero Waste Ibu Cerdas',
    submissionDate: '2 Februari 2026'
  },
  {
    id: 'inv-bioplastik-singkong',
    title: 'Bioplastik Ramah Lingkungan dari Pati Kulit Singkong',
    tagline: 'Plastik biodegradable 100% alami yang dapat hancur dalam tanah dalam 60 hari tanpa mikroplastik',
    wasteSource: 'Limbah Kulit & Pati Ubi Singkong Industri Tapioka',
    wasteId: 'w-kulit-singkong',
    category: 'Bio-Plastik & Kemasan Hijau',
    difficulty: 'Menengah',
    estimatedTime: '2 Hari',
    estimatedCost: 'Rp 15.000 / lembaran 1 meter persegi',
    economicValue: 'Sangat diminati toko fashion & e-commerce hijau untuk amplop kiriman dan polybag bibit tanaman.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Pati Ekstrak Kulit Singkong Bagian Dalam', amount: '100 gram' },
      { name: 'Gliserol / Gliserin Nabati (Plasticizer)', amount: '15 ml' },
      { name: 'Asam Cuka Makan 5% / Asam Asetat', amount: '10 ml' },
      { name: 'Air Akuades / Air Matang', amount: '150 ml' },
      { name: 'Pewarna Makanan Hijau Daun Alami (Ekstrak Pandan)', amount: '5 ml' }
    ],
    tools: [
      'Panci Teflon Anti Lengket',
      'Spatula Silikon Pengaduk',
      'Kaca / Plat Akrilik Datar (Media Cetak Film)',
      'Kompor Listrik / Gas Api Kecil'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Ekstraksi & Pencucian Pati Kulit Singkong',
        description: 'Kupas bagian dalam kulit singkong putih, rendam 12 jam, haluskan dengan blender bersama air, lalu peras dan endapkan patinya semalaman.',
        tip: 'Buang cairan atas yang bening, ambil endapan pati padat di dasar wadah lalu keringkan sebentar.'
      },
      {
        stepNumber: 2,
        title: 'Pencampuran Formula Gelatinisasi',
        description: 'Masukkan pati singkong, air matang, gliserol nabati, dan cuka ke dalam panci teflon sebelum api dinyalakan. Aduk hingga larut rata.',
        tip: 'Fungsi cuka adalah memecah rantai polimer pati, sementara gliserol memberikan kelenturan fleksibel seperti plastik sintetis.'
      },
      {
        stepNumber: 3,
        title: 'Pemanasan Hingga Transparan (Gelatinisasi)',
        description: 'Nyalakan api sangat kecil. Aduk tanpa henti hingga adonan mengental dan berubah warna menjadi gel bening transparan mengilap (sekitar 7-10 menit).',
        tip: 'Segera matikan api begitu gel mulai mendidih meletup-letup halus untuk mencegah gosong.'
      },
      {
        stepNumber: 4,
        title: 'Penuangan Film Tipis di Atas Plat Akrilik',
        description: 'Tuangkan adonan gel panas di atas permukaan kaca/akrilik bersih. Ratakan dengan penggaris scraper hingga ketebalan merata sekitar 0.5 - 1 mm.',
        tip: 'Pastikan meja kerja dalam posisi datar (waterpass) agar ketebalan plastik tidak tebal sebelah.'
      },
      {
        stepNumber: 5,
        title: 'Pengelupasan Lembaran Bioplastik',
        description: 'Biarkan mengering pada suhu ruang ber-AC atau terkena angin selama 24-36 jam. Kelupas perlahan dari sudut plat akrilik.',
        tip: 'Lembaran bioplastik ini tahan air dingin, kuat menahan beban hingga 2 kg, dan terurai dalam tanah menjadi kompos!'
      }
    ],
    safetyTips: [
      'Gunakan sarung tangan silikon saat menangani adonan panas.',
      'Simpan bahan bioplastik di area kering terhindar dari kelembapan ekstrem.'
    ],
    status: 'verified',
    submittedBy: 'Laboratorium Bioteknologi Hijau Nusantara',
    submissionDate: '18 Januari 2026'
  },
  {
    id: 'inv-tote-perca',
    title: 'Tote Bag & Pouch Etnik Multifungsi Kain Perca',
    tagline: 'Upcycling sisa potongan kain garmen pabrik menjadi tas kanvas etnik trendi berdaya saing ekspor',
    wasteSource: 'Kain Perca Katun, Kanvas & Denim Konveksi Tekstil',
    wasteId: 'w-kain-perca',
    category: 'Kerajinan Kreatif & Fashion Sirkular',
    difficulty: 'Mudah',
    estimatedTime: '2 - 4 Jam',
    estimatedCost: 'Rp 10.000 - Rp 20.000 / tas',
    economicValue: 'Harga jual pasar Rp 55.000 - Rp 110.000 / tas di festival UMKM dan butik merchandise.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Kain Perca Aneka Corak & Warna', amount: '500 gram (20-30 potong)' },
      { name: 'Kain Furing Bagian Dalam (Blacu / Spunbond)', amount: '0.5 meter' },
      { name: 'Benang Jahit Poliester Kuat', amount: '1 gulung' },
      { name: 'Tali Webbing Katun untuk Pegangan Tas', amount: '1.2 meter' },
      { name: 'Resleting YKK / Kancing Magnet', amount: '1 set' }
    ],
    tools: [
      'Mesin Jahit Rumahan / Jarum Jahit Tangan',
      'Gunting Kain Tajam & Rotary Cutter',
      'Meteran Jahit & Kapur Kain',
      'Setrika Uap / Biasa untuk Press Lipatan'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pemilahan & Pemotongan Geometris',
        description: 'Sortir potongan perca kain berdasarkan ketebalan yang seimbang. Potong kain menjadi bujur sangkar 12x12 cm atau pola heksagon teratur.',
        tip: 'Kombinasikan motif polos dengan motif batik/garis untuk menghasilkan desain patchwork kontemporer.'
      },
      {
        stepNumber: 2,
        title: 'Penyusunan Desain Kolase (Layouting)',
        description: 'Susun potongan-potongan kain di atas meja membentuk bidang 40x45 cm untuk sisi depan dan sisi belakang tas.',
        tip: 'Ambil foto susunan kain di ponsel Anda sebagai panduan urutan saat mulai menjahit.'
      },
      {
        stepNumber: 3,
        title: 'Penjahitan Rantai Patchwork & Setrika Kampuh',
        description: 'Jahit potongan per baris dengan kampuh 1 cm. Buka dan setrika bagian belakang sambungan kampuh agar rata dan rapi.',
        tip: 'Menyetrika setiap sambungan jahit adalah kunci agar tas tidak bergelombang dan terlihat buatan pabrik profesional.'
      },
      {
        stepNumber: 4,
        title: 'Pemasangan Kain Furing & Tali Webbing',
        description: 'Jahit tali pegangan pada bagian atas kain utama, lapisi dengan kain furing dalam, lalu jahit keliling meninggalkan celah 8 cm untuk membalik tas.',
        tip: 'Jahit silang (box stitch) pada tumpuan tali tas agar kuat menopang beban laptop hingga 5 kg.'
      },
      {
        stepNumber: 5,
        title: 'Penyelesaian Akhir (Top Stitching)',
        description: 'Balik tas melalui celah, rapikan sudut-sudutnya, lalu lakukan jahitan tindas tepi (top stitch) 2 mm di sekeliling mulut tas.',
        tip: 'Tambahkan saku kecil di bagian dalam untuk kartu atau ponsel cerdas.'
      }
    ],
    safetyTips: [
      'Hati-hati terhadap jarum pentul dan jarum mesin saat menjahit dengan kecepatan sedang.',
      'Gunakan alas potong khusus saat menggunakan rotary cutter.'
    ],
    status: 'verified',
    submittedBy: 'Koperasi Pengrajin Wanita Kreatif Solo',
    submissionDate: '25 Januari 2026'
  },
  {
    id: 'inv-pupuk-cair-kopi',
    title: 'Bio-Slurry & Pupuk Organik Cair Ampas Kopi',
    tagline: 'Fermentasi ampas kopi industri dan kulit buah menjadi nutrisi nitrogen instan penyubur tanaman hias',
    wasteSource: 'Spent Coffee Grounds & Kulit Buah Resto',
    wasteId: 'w-ampas-kopi',
    category: 'Agro & Pupuk Organik Hayati',
    difficulty: 'Mudah',
    estimatedTime: '7 - 10 Hari (Proses Fermentasi)',
    estimatedCost: 'Rp 12.000 / botol 1 Liter',
    economicValue: 'Harga jual Rp 35.000 - Rp 50.000 / botol di sentra tanaman hias dan hidroponik.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Ampas Kopi Segar Industri', amount: '1 kg' },
      { name: 'Molase / Gula Merah Cair', amount: '100 ml' },
      { name: 'Bakteri EM4 Pertanian / Ragi Fermentasi', amount: '50 ml' },
      { name: 'Air Cucian Beras Pertama / Air Kelapa', amount: '3 Liter' }
    ],
    tools: [
      'Jerigen Plastik 5 Liter dengan Tutup Rapat',
      'Selang Aerasi Kecil & Botol Air Perangkap Gas (Air-Lock)',
      'Corong Plastik & Pengaduk Kayu'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pencampuran Mikroba Pengurai (Aktivasi EM4)',
        description: 'Campurkan molase dan EM4 ke dalam 1 liter air cucian beras, diamkan 20 menit agar bakteri fermentasi bangun dan aktif.',
        tip: 'Air cucian beras mengandung vitamin B1 tinggi yang mempercepat perkembangbiakan mikroba pengurai.'
      },
      {
        stepNumber: 2,
        title: 'Penggabungan dengan Ampas Kopi',
        description: 'Masukkan ampas kopi ke dalam jerigen, tambahkan sisa air, lalu tuang larutan aktivasi mikroba. Kocok perlahan hingga larut.',
        tip: 'Sisakan ruang udara sekitar 20% pada jerigen untuk menampung gas fermentasi.'
      },
      {
        stepNumber: 3,
        title: 'Pemasangan Sistem Ventilasi Fermentasi Anaerob',
        description: 'Lubangi tutup jerigen seukuran selang kecil, sambungkan selang ke botol air mineral kecil berisi air (sistem airlock).',
        tip: 'Sistem air-lock memastikan gas CO2 hasil fermentasi keluar tanpa membiarkan udara luar dan lalat masuk yang bisa membuat busuk.'
      },
      {
        stepNumber: 4,
        title: 'Masa Inkubasi Fermentasi',
        description: 'Simpan jerigen di tempat gelap bersuhu ruang selama 7-10 hari. Ciri fermentasi sukses adalah aroma khas segar seperti tape/fermentasi manis.',
        tip: 'Jika berbau busuk bangkai, berarti ada kontaminasi udara luar; tambahkan molase tambahan untuk menyeimbangkan.'
      },
      {
        stepNumber: 5,
        title: 'Penyaringan & Pengemasan Pupuk Siap Pakai',
        description: 'Saring cairan menggunakan kain kasa. Kemas cairan ke dalam botol spray. Ampas padat sisa saringan dapat langsung dicampur ke tanah pot.',
        tip: 'Aplikasi ke tanaman: larutkan 10 ml pupuk cair ke dalam 1 liter air bersih, semprotkan seminggu sekali ke daun dan media tanam.'
      }
    ],
    safetyTips: [
      'Buka tutup jerigen perlahan saat memeriksa untuk melepas tekanan gas berlebih.',
      'Jauhkan dari sinar matahari langsung selama inkubasi.'
    ],
    status: 'verified',
    submittedBy: 'Komunitas Petani Urban Farm Kota Hijau',
    submissionDate: '10 Februari 2026'
  },
  {
    id: 'inv-paving-faba',
    title: 'Paving Block FABA — Mengacu pada SNI 03-0691-1996',
    tagline: 'Pemanfaatan FABA boiler industri menjadi bata beton perkerasan. Hasil uji laboratorium diperlukan untuk menyatakan kesesuaian mutu.',
    wasteSource: 'Fly Ash & Bottom Ash (FABA) Industri Terpantau (Non-Stoker)',
    wasteId: 'w-flyash',
    category: 'Material Bangunan Alternatif',
    difficulty: 'Tinggi',
    estimatedTime: '7 - 14 Hari (Curing Air)',
    estimatedCost: 'Rp 2.500 / buah paving block standar',
    economicValue: 'Dapat menghemat biaya semen hingga 40% untuk perkerasan jalan lingkungan (wajib uji kuat tekan lab sebelum instalasi).',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Fly Ash Industri Tersaring Silika Aktif', amount: '35% berat total' },
      { name: 'Bottom Ash / Pasir Silika Halus', amount: '40% berat total' },
      { name: 'Semen Portland Komposit (PCC)', amount: '15% berat total' },
      { name: 'Air & Superplasticizer Beton Ramah Lingkungan', amount: '10% berat total' }
    ],
    tools: [
      'Mesin Press Hidrolik Paving Block (Minimal Tekanan 15 MPa)',
      'Mixer Pengaduk Mortar Beton (Molen)',
      'Cetakan Paving Model Segienam / Bata 6 cm',
      'Kolam Bak Perendaman (Curing Tank)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Proporsi & Pengujian Material Kering',
        description: 'Timbang FABA, pasir, dan semen dengan formulasi mengacu spesifikasi teknis SNI 03-0691-1996. Pastikan FABA tidak menggumpal basah.',
        tip: 'Standar SNI 03-0691-1996 mengatur mutu bata beton. Fly ash bertindak sebagai pozzolanik, namun hasil uji lab independen tetap wajib untuk sertifikasi resmi.'
      },
      {
        stepNumber: 2,
        title: 'Pengadukan Mortar Semi Kering (Slump Rendah)',
        description: 'Aduk bahan kering di molen selama 3 menit, tambahkan air secara presisi hingga adonan terasa lembap tetapi tidak mencair (semi-dry mix).',
        tip: 'Jika terlalu basah, paving akan melorot saat dikeluarkan dari cetakan hidrolik.'
      },
      {
        stepNumber: 3,
        title: 'Pengepresan dengan Vibrasi Hidrolik',
        description: 'Masukkan mortar ke cetakan baja, nyalakan vibrasi selama 10 detik, lalu beri tekanan hidrolik sebesar 150 kg/cm2.',
        tip: 'Kombinasi getaran dan tekanan tinggi menghilangkan pori udara mikro sehingga kekuatan tekan meningkat hingga mutu K-300.'
      },
      {
        stepNumber: 4,
        title: 'Demoulding & Pengeringan Awal (Pre-Curing)',
        description: 'Keluarkan balok paving basah ke atas palet kayu. Simpan di tempat teduh beralas datar selama 24 jam pertama.',
        tip: 'Jangan siram air pada 24 jam pertama agar bentuk tepi paving tidak tergerus.'
      },
      {
        stepNumber: 5,
        title: 'Curing Perendaman Air 14 Hari',
        description: 'Rendam balok paving di bak air selama 7-14 hari untuk hidrasi silika sempurna hingga mencapai kekuatan tekan maksimal.',
        tip: 'Setelah 14 hari, paving siap diuji laboratorium uji tekan dan dipasang di jalan perumahan atau taman.'
      }
    ],
    safetyTips: [
      'WAJIB memakai respirator FFP2/N95 dan kacamata pelindung agar serbuk abu fly ash tidak mengenai mata atau saluran napas.',
      'Gunakan sepatu safety beralas baja saat bekerja di area mesin press hidrolik.'
    ],
    status: 'verified',
    submittedBy: 'Tim Riset Material Sipil Universitas Indonesia',
    submissionDate: '5 Maret 2026'
  },
  {
    id: 'inv-briket-bioenergi',
    title: 'Briket Arang Bio-Energi Padat',
    tagline: 'Karbonisasi ampas tebu dan serbuk gergaji menjadi bahan bakar padat ramah lingkungan berkalori tinggi',
    wasteSource: 'Bagasse Ampas Tebu & Serbuk Gergaji Kayu',
    wasteId: 'w-ampas-tebu',
    category: 'Material Bangunan Alternatif',
    difficulty: 'Menengah',
    estimatedTime: '1 - 2 Hari',
    estimatedCost: 'Rp 4.000 / kg briket',
    economicValue: 'Harga jual pasar Rp 15.000 - Rp 22.000 / kg ke restoran kuliner, UMKM sate/BBQ, dan industri.',
    rating: 0,
    reviewCount: 0,
    successRate: null,
    materials: [
      { name: 'Ampas Tebu Kering (Bagasse)', amount: '1 kg' },
      { name: 'Serbuk Gergaji Sengon / Jati', amount: '1 kg' },
      { name: 'Tepung Tapioka / Pati Singkong (Binder)', amount: '150 gram' },
      { name: 'Air Hangat Bersih', amount: '1 Liter' }
    ],
    tools: [
      'Drum Pirolisis / Tungku Karbonisasi Arang',
      'Alat Cetak Briket Silinder / Hexagonal',
      'Ayakan Mesh 40 & Baskom Pencampur',
      'Panci Pemanas Lem Kanji'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Karbonisasi Pirolisis Terkontrol',
        description: 'Masukkan ampas tebu dan serbuk gergaji kering ke dalam drum kedap oksigen. Panaskan hingga menjadi arang hitam merata.',
        tip: 'Tutup rapat lubang ventilasi drum saat asap mulai menipis agar arang tidak terbakar habis menjadi abu putih.'
      },
      {
        stepNumber: 2,
        title: 'Penghalusan & Pengayakan Bubuk Arang',
        description: 'Tumbuk arang yang telah dingin lalu ayak menggunakan mesh 40 untuk mendapatkan butiran halus seragam.',
        tip: 'Semakin halus serbuk arang, semakin padat dan stabil nyala bara briket saat digunakan.'
      },
      {
        stepNumber: 3,
        title: 'Pembuatan Larutan Perekat Tapioka',
        description: 'Larutkan tepung tapioka ke dalam air mendidih bersuhu 90°C hingga membentuk lem gel kental bening.',
        tip: 'Rasio perekat 6-8% dari total berat arang ideal untuk menjaga kalori tinggi dan menghasilkan asap minimal.'
      },
      {
        stepNumber: 4,
        title: 'Pencampuran & Pencetakan Bertekanan',
        description: 'Campur adonan arang dan lem tapioka hingga merata. Masukkan ke pipa cetakan lalu tekan kuat menggunakan tuas pres atau dongkrak.',
        tip: 'Buat lubang silinder di bagian tengah briket untuk aliran sirkulasi oksigen optimal.'
      },
      {
        stepNumber: 5,
        title: 'Pengeringan Sinar Matahari / Oven',
        description: 'Jemur briket di bawah terik matahari selama 2-3 hari hingga kadar air di bawah 8%.',
        tip: 'Briket kering berbunyi denting keras saat diadu dan menghasilkan bara panas stabil bertahan hingga 3-4 jam tanpa bau sangit.'
      }
    ],
    safetyTips: [
      'Gunakan masker debu saat menumbuk dan mengayak bubuk arang hitam.',
      'Jauhkan proses pembakaran pirolisis dari bahan mudah terbakar dan pastikan ventilasi terbuka di luar ruangan.'
    ],
    status: 'verified',
    submittedBy: 'Laboratorium Konversi Energi Ramah Lingkungan',
    submissionDate: '15 Januari 2026'
  }
];
