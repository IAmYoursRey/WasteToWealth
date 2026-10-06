import React from 'react';
import { Sparkles, Shield, ArrowRight, BookOpen, Compass, Lightbulb, MapPin, Star } from 'lucide-react';

interface HeroBannerProps {
  onSelect5M: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelect5M }) => {
  const metrics = [
    { label: 'Limbah Terklasifikasi', value: '10+', sub: 'Regulasi PP 22/2021' },
    { label: 'Blueprint Inovasi', value: '6+', sub: 'Panduan Praktis' },
    { label: 'Jejaring Sirkular', value: '7+', sub: 'Industri & UMKM' },
    { label: 'Rasio Keberhasilan', value: '94%', sub: 'Evaluasi Komunitas' },
  ];

  const steps5M = [
    { id: 'dictionary', title: '1. Mengenali & Memahami', desc: 'Kamus limbah B3 vs Non-B3 terpilah', icon: BookOpen },
    { id: 'explore', title: '2. Mengeksplorasi', desc: 'Pusat Pemanfaatan Limbah Industri & teknologi', icon: Compass },
    { id: 'innovations', title: '3. Menginovasi', desc: 'Katalog kreasi & ajukan ide baru', icon: Lightbulb },
    { id: 'matchmaking', title: '4. Mengomunikasikan', desc: 'Peta penghubung pasokan industri', icon: MapPin },
    { id: 'evaluation', title: '5. Mengevaluasi', desc: 'Uji keberhasilan & kemudahan produk', icon: Star },
  ];

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #F4FAF5 0%, #E8F5E9 35%, #E0F2F1 70%, #C8E6C9 100%)',
      color: '#133E24',
      padding: '3.5rem 0 3rem 0',
      overflow: 'hidden',
      borderBottom: '3px solid #A5D6A7'
    }}>
      {/* Dynamic Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(165, 214, 167, 0.45) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(128, 203, 196, 0.35) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #A5D6A7',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#1B5E20',
            boxShadow: '0 2px 8px rgba(46, 125, 50, 0.06)',
            letterSpacing: '0.4px'
          }}>
            <Sparkles size={14} color="#2E7D32" />
            <span>METODE 5M SIRKULAR</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1.5px solid #80CBC4',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#00695C',
            boxShadow: '0 2px 8px rgba(0, 105, 92, 0.06)'
          }}>
            <Shield size={14} color="#00897B" />
            <span>Sesuai PP No. 22/2021 & Permen LHK</span>
          </div>
        </div>

        {/* Top Two-Column Grid: Text & Metrics on Left, Brand Visual on Right */}
        <div className="hero-grid">
          
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              color: '#133E24',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.5px'
            }}>
              Transformasi Limbah Industri Menjadi <span style={{
                background: 'linear-gradient(90deg, #1B5E20 0%, #00796B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Karya Berdaya Guna</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              color: '#2D5038',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '650px'
            }}>
              Platform kolaborasi edukasi sirkular nasional yang menghubungkan industri penghasil limbah non-B3 terpilah dengan UMKM, komunitas perajin, dan pelajar. Kenali bahan aman, pelajari cara pengolahannya, dan ciptakan produk alternatif bernilai ekonomi.
            </p>

            {/* 4 Impact Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.85rem'
            }}>
              {metrics.map((m, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    border: '1.5px solid #A5D6A7',
                    boxShadow: '0 4px 14px rgba(46, 125, 50, 0.06)'
                  }}
                >
                  <div style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: '#1B5E20',
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-display)'
                  }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#133E24', marginTop: '0.2rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#4B6B52', marginTop: '0.1rem' }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="animate-float"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(46, 125, 50, 0.12)',
                border: '2.5px solid #A5D6A7',
                background: '#FFFFFF',
                maxWidth: '480px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img 
                src="./wastetowealth-hero-banner.jpg" 
                alt="WasteToWealth Circular Economy Visual"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
              <div style={{
                padding: '0.75rem 1.15rem',
                background: 'linear-gradient(90deg, #E8F5E9 0%, #E0F2F1 100%)',
                borderTop: '1.5px solid #A5D6A7',
                fontSize: '0.78rem',
                color: '#133E24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700 }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#2E7D32' }} />
                  <span>Siklus Sirkular Industri Hijau</span>
                </div>
                <span style={{
                  background: '#FFFFFF',
                  border: '1px solid #A5D6A7',
                  padding: '2px 9px',
                  borderRadius: 'var(--radius-full)',
                  color: '#00796B',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  boxShadow: '0 1px 3px rgba(46, 125, 50, 0.08)'
                }}>
                  100% Berdaya Guna
                </span>
              </div>
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* 5M Interactive Flow Navigation Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1.5px solid #A5D6A7',
          boxShadow: '0 4px 18px rgba(46, 125, 50, 0.08)'
        }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#1B5E20',
            marginBottom: '0.85rem'
          }}>
            Eksplorasi Pembelajaran 5M:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
            gap: '0.75rem'
          }}>
            {steps5M.map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelect5M(step.id)}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #C8E6C9',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 0.9rem',
                    textAlign: 'left',
                    color: '#133E24',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    boxShadow: '0 2px 6px rgba(46, 125, 50, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E8F5E9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#A5D6A7';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(46, 125, 50, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#C8E6C9';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(46, 125, 50, 0.04)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Icon size={18} color="#2E7D32" />
                    <ArrowRight size={13} color="#2E7D32" />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#133E24' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#4B6B52', lineHeight: 1.3 }}>
                    {step.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
