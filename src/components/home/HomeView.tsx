import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../common/HeroBanner';
import { 
  Sparkles, 
  CheckCircle2, 
  Recycle, 
  Building2, 
  Award, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  Users, 
  Factory, 
  ChevronDown, 
  HelpCircle,
  AlertTriangle,
  FileCheck,
  Check,
  ArrowRight,
  Compass,
  Cpu,
  RefreshCw,
  Layers
} from 'lucide-react';

interface HomeViewProps {
  onSelect5M: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelect5M }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeRegTab, setActiveRegTab] = useState<'non-b3' | 'conditional' | 'b3'>('non-b3');
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const flowSteps = [
    {
      step: '01',
      title: 'Pemilahan Presisi di Sumber Pabrik',
      subtitle: 'Industri Manufaktur',
      desc: 'Limbah non-B3 padat (seperti serpihan plastik polimer, kain perca garmen, serbuk kayu, dan ampas agroindustri) dipilah secara higienis langsung dari lini produksi sebelum terkontaminasi bahan berbahaya.',
      highlight: 'Mengacu standar klasifikasi Lampiran XIV PP No. 22/2021',
      icon: Factory,
      tag: 'Hulu Produksi'
    },
    {
      step: '02',
      title: 'Pengujian Mutu & Standarisasi Material',
      subtitle: 'Pusat Pemanfaatan Limbah Industri',
      desc: 'Material terpilah diuji kadar air, densitas, dan kebersihannya di Pusat Pemanfaatan Limbah Industri. Menggunakan mesin industrial shredder, pelletizer, dan sorting berkapasitas tinggi untuk menghasilkan bahan baku sekunder homogen.',
      highlight: 'Sertifikasi uji kuat tekan lab & parameter keamanan kerja (K3)',
      icon: Cpu,
      tag: 'Pengolahan Mekanikal'
    },
    {
      step: '03',
      title: 'Hilirisasi Inovasi & Rekayasa Produk',
      subtitle: 'UMKM, Perajin & Siswa Vokasi',
      desc: 'Material sekunder diformulasikan menjadi produk jadi bernilai jual tinggi berlandaskan blueprint Kurikulum Merdeka 5M, seperti paving block SNI, lilin aromaterapi, pupuk bio-slurry, dan panel peredam akustik.',
      highlight: 'Checklist SOP pembuatan lengkap dan kalkulator estimasi margin',
      icon: RefreshCw,
      tag: 'Kreasi Bernilai Tambah'
    },
    {
      step: '04',
      title: 'Kemitraan Pasokan & Pasar Berkelanjutan',
      subtitle: 'Ekosistem Sirkular Terpadu',
      desc: 'Menghubungkan pasokan rutin dari pabrik ke pengrajin melalui sistem matchmaking berbasis lokasi dan skor kompatibilitas, menjamin kepastian pasokan bahan tanpa perantara spekulatif.',
      highlight: 'Penilaian mutu aktual dari komunitas praktisi di lapangan',
      icon: TrendingUp,
      tag: 'Pasar Sirkular'
    }
  ];

  const impactMetrics = [
    {
      title: 'Reduksi Residu Industri ke TPA',
      value: '75%',
      subtext: 'Target penurunan volume limbah padat non-B3 yang dikirim ke tempat pemrosesan akhir.',
      icon: Leaf,
      color: '#1B5E20',
      bg: '#E8F5E9',
      border: '#A5D6A7'
    },
    {
      title: 'Penghematan Biaya Bahan Baku UMKM',
      value: '40% - 60%',
      subtext: 'Efisiensi biaya belanja material pengrajin dibanding membeli bahan mentah virgin impor.',
      icon: TrendingUp,
      color: '#0284C7',
      bg: '#E0F2FE',
      border: '#BAE6FD'
    },
    {
      title: 'Laboratorium Praktik Vokasi 5M',
      value: '100%',
      subtext: 'Selaras dengan pembelajaran berbasis projek nyata (PBL) SMK Pusat Keunggulan & Kampus Merdeka.',
      icon: Users,
      color: '#7C3AED',
      bg: '#EDE9FE',
      border: '#DDD6FE'
    },
    {
      title: 'Standar Kepatuhan Regulasi Lingkungan',
      value: 'SNI & K3',
      subtext: 'Seluruh panduan terikat regulasi PP 22/2021 dan standar keselamatan operasional kerja.',
      icon: ShieldCheck,
      color: '#D97706',
      bg: '#FEF3C7',
      border: '#FDE68A'
    }
  ];

  const faqs = [
    {
      q: 'Apa perbedaan utama platform WasteToWealth dengan bank sampah konvensional?',
      a: 'WasteToWealth berfokus spesifik pada limbah padat dari sektor manufaktur industri (non-B3) yang selama ini bernilai tinggi namun minim akses bagi UMKM lokal. Platform ini mengintegrasikan rantai pasok industri, panduan teknis blueprint berstandar SNI, edukasi mesin pengolah di Pusat Pemanfaatan Limbah Industri, dan peta pencocokan kemitraan langsung.'
    },
    {
      q: 'Apakah limbah industri aman diolah oleh siswa SMK, mahasiswa, atau perajin rumahan?',
      a: 'Hanya material berstatus Limbah Non-B3 Terdaftar (sesuai Lampiran IX & XIV PP No. 22 Tahun 2021) yang diizinkan dalam platform ini. Setiap materi dilengkapi lembar keselamatan (MSDS ringkas), pedoman Alat Pelindung Diri (APD wajib), dan instruksi penanganan aman agar bebas dari risiko paparan berbahaya.'
    },
    {
      q: 'Bagaimana peran Pusat Pemanfaatan Limbah Industri dalam ekosistem ini?',
      a: 'Pusat Pemanfaatan Limbah Industri berperan sebagai fasilitas percontohan dan laboratorium pembelajaran terbuka. Fasilitas ini menyimulasikan pemilahan limbah kawasan, mendemonstrasikan mesin industri nyata (Dual-Shaft Shredder, Extrusion Pelletizer, Press Hidrolik), serta menerima permohonan kunjungan belajar bagi institusi pendidikan dan pelaku usaha.'
    },
    {
      q: 'Bagaimana pabrik industri dapat menyalurkan limbah non-B3 mereka melalui WasteToWealth?',
      a: 'Pabrik dapat mendaftarkan jenis material, volume ketersediaan berkala, dan lokasi pabrik pada fitur Peta Penghubung. Sistem akan menghitung skor kompatibilitas dengan kebutuhan UMKM sekitar dan membuka jalur komunikasi resmi setelah permohonan kemitraan diverifikasi.'
    },
    {
      q: 'Mengapa pendekatan Kurikulum Merdeka 5M diterapkan dalam platform ini?',
      a: 'Pendekatan 5M (Mengenali, Mengeksplorasi, Menginovasi, Mengomunikasikan, dan Mengevaluasi) memastikan transfer pengetahuan berjalan utuh: pengguna tidak hanya membaca data limbah, tetapi diajak memahami karakteristiknya, mempelajari alat pengolahnya, membuat prototipe bernilai jual, membangun jaringan bisnis, hingga menguji kualitas produk secara terukur.'
    }
  ];

  return (
    <div>
      {/* Hero Banner with 5M Quick Flow */}
      <HeroBanner onSelect5M={onSelect5M} />

      {/* ========================================================================= */}
      {/* SECTION 1: Alur Transformasi Sirkular (The 4-Stage Circular Journey) */}
      {/* ========================================================================= */}
      <section style={{ padding: '4.5rem 0 3.5rem 0', background: 'var(--bg-main)', position: 'relative' }}>
        <div className="container">
          
          <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              background: '#E8F5E9',
              border: '1.5px solid #A5D6A7',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#1B5E20',
              marginBottom: '0.85rem'
            }}>
              <Recycle size={15} color="#2E7D32" />
              <span>ALUR SIKLUS SIRKULAR</span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              color: 'var(--leaf-deep)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              letterSpacing: '-0.3px'
            }}>
              Bagaimana Limbah Industri Menjadi Produk Bernilai Guna?
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.65 }}>
              Proses sirkular terintegrasi yang menjamin material limbah manufaktur diolah secara bertanggung jawab, aman, dan menghasilkan nilai tambah ekonomi nyata bagi masyarakat.
            </p>
          </div>

          {/* Interactive 4-Stage Journey Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeFlowStep === idx;
              return (
                <div
                  key={step.step}
                  className={`glass-card scroll-reveal scroll-delay-${idx + 1}`}
                  onClick={() => setActiveFlowStep(idx)}
                  style={{
                    padding: '1.75rem',
                    cursor: 'pointer',
                    position: 'relative',
                    border: isActive ? '2px solid #2E7D32' : '1.5px solid var(--border-leaf)',
                    background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                    boxShadow: isActive ? '0 12px 28px -4px rgba(46, 125, 50, 0.18)' : 'var(--shadow-sm)',
                    transform: isActive ? 'translateY(-4px)' : 'none',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      fontWeight: 800,
                      color: isActive ? '#2E7D32' : '#94A3B8'
                    }}>
                      {step.step}
                    </span>

                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: isActive ? '#E8F5E9' : '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? '#2E7D32' : '#64748B',
                      transition: 'all var(--transition-fast)'
                    }}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: isActive ? '#2E7D32' : '#64748B',
                    marginBottom: '0.35rem'
                  }}>
                    {step.subtitle}
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--leaf-deep)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3
                  }}>
                    {step.title}
                  </h3>

                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    marginBottom: '1.25rem'
                  }}>
                    {step.desc}
                  </p>

                  <div style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? '#E8F5E9' : '#F8FAFC',
                    border: `1px solid ${isActive ? '#A5D6A7' : '#E2E8F0'}`,
                    fontSize: '0.78rem',
                    color: isActive ? '#1B5E20' : '#475569',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem',
                    lineHeight: 1.4
                  }}>
                    <CheckCircle2 size={15} color={isActive ? '#2E7D32' : '#94A3B8'} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Dampak Keberlanjutan & Indikator Kinerja Lingkungan */}
      {/* ========================================================================= */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F4FAF5 100%)',
        borderTop: '1px solid var(--border-leaf)',
        borderBottom: '1px solid var(--border-leaf)'
      }}>
        <div className="container">
          
          <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              background: '#E8F5E9',
              border: '1.5px solid #A5D6A7',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#1B5E20',
              marginBottom: '0.85rem'
            }}>
              <TrendingUp size={15} color="#2E7D32" />
              <span>DAMPAK & MANFAAT NYATA</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              color: 'var(--leaf-deep)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              letterSpacing: '-0.3px'
            }}>
              Keseimbangan Ekologi, Edukasi, dan Ekonomi
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.65 }}>
              WasteToWealth dirancang tidak sekadar sebagai portal informasi, melainkan penggerak solusi konkret berbasis prinsip <em>Triple Bottom Line</em>: menjaga bumi, memberdayakan manusia, dan menumbuhkan ekonomi lokal.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {impactMetrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`glass-card scroll-reveal scroll-delay-${idx + 1}`}
                  style={{
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: `4px solid ${item.color}`
                  }}
                >
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: item.bg,
                    border: `1.5px solid ${item.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: item.color,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}>
                    <Icon size={26} />
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: item.color,
                    marginBottom: '0.35rem',
                    lineHeight: 1.1
                  }}>
                    {item.value}
                  </div>

                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </div>

                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    maxWidth: '240px'
                  }}>
                    {item.subtext}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Edukasi Regulasi: Memahami Batas Limbah Non-B3 vs B3 */}
      {/* ========================================================================= */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          
          <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              background: '#E8F5E9',
              border: '1.5px solid #A5D6A7',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#1B5E20',
              marginBottom: '0.85rem'
            }}>
              <ShieldCheck size={15} color="#2E7D32" />
              <span>LITERASI HUKUM & STANDAR K3</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              color: 'var(--leaf-deep)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              letterSpacing: '-0.3px'
            }}>
              Pahami Batasan Keamanan Sesuai Regulasi Nasional
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.65 }}>
              Kepatuhan terhadap <strong>Peraturan Pemerintah No. 22 Tahun 2021</strong> dan <strong>Permen LHK No. 19 Tahun 2021</strong> untuk memastikan pemanfaatan limbah berjalan aman tanpa melanggar hukum lingkungan hidup.
            </p>
          </div>

          {/* Interactive Regulation Tab Switcher */}
          <div className="scroll-reveal" style={{ maxWidth: '880px', margin: '0 auto' }}>
            
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setActiveRegTab('non-b3')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all var(--transition-fast)',
                  background: activeRegTab === 'non-b3' ? '#2E7D32' : '#FFFFFF',
                  color: activeRegTab === 'non-b3' ? '#FFFFFF' : 'var(--text-muted)',
                  border: activeRegTab === 'non-b3' ? '1.5px solid #2E7D32' : '1.5px solid var(--border-light)',
                  boxShadow: activeRegTab === 'non-b3' ? '0 4px 12px rgba(46, 125, 50, 0.25)' : 'none'
                }}
              >
                <CheckCircle2 size={16} />
                <span>1. Limbah Non-B3 (Aman Diolah)</span>
              </button>

              <button
                onClick={() => setActiveRegTab('conditional')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all var(--transition-fast)',
                  background: activeRegTab === 'conditional' ? '#D97706' : '#FFFFFF',
                  color: activeRegTab === 'conditional' ? '#FFFFFF' : 'var(--text-muted)',
                  border: activeRegTab === 'conditional' ? '1.5px solid #D97706' : '1.5px solid var(--border-light)',
                  boxShadow: activeRegTab === 'conditional' ? '0 4px 12px rgba(217, 119, 6, 0.25)' : 'none'
                }}
              >
                <FileCheck size={16} />
                <span>2. Kondisi Khusus Terdaftar</span>
              </button>

              <button
                onClick={() => setActiveRegTab('b3')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all var(--transition-fast)',
                  background: activeRegTab === 'b3' ? '#DC2626' : '#FFFFFF',
                  color: activeRegTab === 'b3' ? '#FFFFFF' : 'var(--text-muted)',
                  border: activeRegTab === 'b3' ? '1.5px solid #DC2626' : '1.5px solid var(--border-light)',
                  boxShadow: activeRegTab === 'b3' ? '0 4px 12px rgba(220, 38, 38, 0.25)' : 'none'
                }}
              >
                <AlertTriangle size={16} />
                <span>3. Limbah B3 (Dilarang Mandiri)</span>
              </button>
            </div>

            {/* Content Box for Selected Tab */}
            <div className="glass-card" style={{ padding: '2rem 2.25rem', border: '1.5px solid var(--border-leaf)' }}>
              {activeRegTab === 'non-b3' && (
                <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className="badge-national badge-safe">Bebas Residu Berbahaya</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PP No. 22/2021 Lampiran XIV</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)', marginBottom: '0.75rem' }}>
                    Material Padat Non-B3 yang Legal & Aman Diberdayakan
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Fraksi limbah yang tidak memiliki karakteristik mudah meledak, mudah menyala, reaktif, beracun, infeksius, maupun korosif. Sangat dianjurkan untuk dimanfaatkan kembali menjadi produk kreatif, material bangunan, dan kompos alami.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                    <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                      <strong style={{ color: '#1B5E20', fontSize: '0.88rem' }}>📦 Contoh Material:</strong>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Kain perca katun, serbuk gergaji kayu jati/sengon, kulit singkong tapioka, ampas kopi kering, cacahan plastik HDPE.
                      </div>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                      <strong style={{ color: '#1B5E20', fontSize: '0.88rem' }}>🛡️ Standar SOP Penanganan:</strong>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Gunakan masker debu partikulat, sarung tangan kain, dan pastikan area kerja memiliki ventilasi udara yang memadai.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeRegTab === 'conditional' && (
                <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className="badge-national badge-caution">Uji Lab & SOP Terkontrol</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Permen LHK No. 19/2021</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#B45309', marginBottom: '0.75rem' }}>
                    Limbah Non-B3 Terdaftar dengan Persyaratan Khusus
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Limbah yang telah dicabut dari kategori B3 oleh regulasi pemerintah, namun pemanfaatannya wajib memenuhi baku mutu teknis atau pengujian laboratorium terakreditasi sebelum dipasarkan.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                    <div style={{ background: '#FFFBEB', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
                      <strong style={{ color: '#92400E', fontSize: '0.88rem' }}>📦 Contoh Material:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#78350F', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Fly Ash & Bottom Ash (FABA PLTU terkontrol), minyak jelantah restoran, spent bleaching earth (SBE terefleksi).
                      </div>
                    </div>
                    <div style={{ background: '#FFFBEB', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
                      <strong style={{ color: '#92400E', fontSize: '0.88rem' }}>🛡️ Standar SOP Penanganan:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#78350F', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Wajib uji kuat tekan paving block (SNI 03-0691-1996) dan uji pelindian TCLP secara berkala dari penyedia material.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeRegTab === 'b3' && (
                <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className="badge-national badge-danger">Wajib Izin Khusus KLHK</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PP No. 22/2021 Lampiran IX</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#991B1B', marginBottom: '0.75rem' }}>
                    Limbah Berbahaya & Beracun (B3) — Dilarang Diolah Mandiri
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Material dengan potensi pencemaran berat terhadap tanah, air tanah, dan kesehatan manusia. Pengolahan tanpa instalasi IPAL dan manifes berizin resmi adalah tindak pidana lingkungan hidup.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                    <div style={{ background: '#FEF2F2', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA' }}>
                      <strong style={{ color: '#991B1B', fontSize: '0.88rem' }}>⚠️ Contoh Limbah B3:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#7F1D1D', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Oli bekas mesin (B105d), sludge IPAL tekstil beracun (B337-1), pelarut kimia bekas, aki asam timbal (A102d).
                      </div>
                    </div>
                    <div style={{ background: '#FEF2F2', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA' }}>
                      <strong style={{ color: '#991B1B', fontSize: '0.88rem' }}>🚫 Larangan Mutlak:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#7F1D1D', marginTop: '0.3rem', lineHeight: 1.45 }}>
                        Jangan dibakar sembarangan, jangan dibuang ke selokan, dan wajib diserahkan ke transporter B3 berizin resmi Festronik.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Tanya Jawab Interaktif (FAQ Seputar Ekosistem Sirkular) */}
      {/* ========================================================================= */}
      <section style={{
        padding: '4.5rem 0 5rem 0',
        background: 'linear-gradient(180deg, #F4FAF5 0%, #E8F5E9 100%)',
        borderTop: '1px solid var(--border-leaf)'
      }}>
        <div className="container">
          
          <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              background: '#FFFFFF',
              border: '1.5px solid #A5D6A7',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#1B5E20',
              marginBottom: '0.85rem'
            }}>
              <HelpCircle size={15} color="#2E7D32" />
              <span>INFORMASI & TANYA JAWAB</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              color: 'var(--leaf-deep)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              letterSpacing: '-0.3px'
            }}>
              Pertanyaan yang Sering Diajukan
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.65 }}>
              Informasi mendalam mengenai operasional platform, legalitas pemanfaatan limbah, dan kolaborasi antara dunia industri dengan UMKM.
            </p>
          </div>

          {/* Interactive Accordion List */}
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`glass-card scroll-reveal scroll-delay-${(index % 4) + 1}`}
                  style={{
                    overflow: 'hidden',
                    border: isOpen ? '1.5px solid #2E7D32' : '1px solid var(--border-leaf)',
                    background: '#FFFFFF',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'left',
                      background: isOpen ? '#F1F8F2' : '#FFFFFF',
                      transition: 'background var(--transition-fast)'
                    }}
                  >
                    <span style={{
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      color: isOpen ? '#1B5E20' : 'var(--text-main)',
                      lineHeight: 1.4
                    }}>
                      {faq.q}
                    </span>

                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? '#E8F5E9' : '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#2E7D32' : '#64748B',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                      flexShrink: 0
                    }}>
                      <ChevronDown size={17} />
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '1rem 1.5rem 1.35rem 1.5rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                      borderTop: '1px solid #E2E8F0',
                      animation: 'fadeIn 0.25s ease-out'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Embedded CSS for smooth scroll animations */}
      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 {
          transition-delay: 0.08s;
        }

        .scroll-delay-2 {
          transition-delay: 0.16s;
        }

        .scroll-delay-3 {
          transition-delay: 0.24s;
        }

        .scroll-delay-4 {
          transition-delay: 0.32s;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
