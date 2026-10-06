import React from 'react';
import { Shield, Sparkles, Heart, FileCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #F2F9F4 0%, #E8F5E9 45%, #E0F2F1 100%)',
      color: '#2D5038',
      padding: '3.5rem 0 2rem 0',
      borderTop: '3px solid #A5D6A7',
      marginTop: 'auto'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          
          {/* Brand & Mission */}
          <div>
            <div 
              onClick={() => onSelectTab && onSelectTab('home')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                marginBottom: '1rem',
                cursor: onSelectTab ? 'pointer' : 'default',
                width: 'fit-content'
              }}
            >
              <img 
                src="./favicon.svg" 
                alt="Logo WasteToWealth" 
                style={{ width: '32px', height: '32px' }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#133E24', letterSpacing: '-0.5px' }}>
                Waste<span style={{ color: '#00897B' }}>To</span>Wealth
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#3D6147', lineHeight: 1.6, marginBottom: '1rem' }}>
              Platform ekosistem sirkular nasional yang mengintegrasikan edukasi 5M, kamus literasi limbah B3/non-B3, panduan inovasi terverifikasi, dan peta penghubung pasokan industri-UMKM.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: '#FFFFFF',
              border: '1px solid #A5D6A7',
              fontSize: '0.75rem',
              color: '#1B5E20',
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(46, 125, 50, 0.05)'
            }}>
              <Sparkles size={14} color="#2E7D32" />
              <span>Inisiatif Ekonomi Hijau 2026</span>
            </div>
          </div>

          {/* Legal & National Standards */}
          <div>
            <h4 style={{ fontSize: '0.98rem', color: '#133E24', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Landasan Hukum & SOP
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', color: '#33533D' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Shield size={16} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>PP No. 22 Tahun 2021:</strong> Penyelenggaraan Perlindungan & Pengelolaan Lingkungan Hidup.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Shield size={16} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Permen LHK No. 19 Tahun 2021:</strong> Tata Cara Pengelolaan Limbah Non-B3 Terdaftar.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FileCheck size={16} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>SNI 03-0691-1996:</strong> Spesifikasi Teknis Bata Beton / Paving Block (Uji Mutu Lab Berkala).</span>
              </li>
            </ul>
          </div>

          {/* 5M Pillars */}
          <div>
            <h4 style={{ fontSize: '0.98rem', color: '#133E24', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Kerangka Kurikulum 5M
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#33533D' }}>
              <li>
                <button
                  onClick={() => onSelectTab && onSelectTab('dictionary')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: onSelectTab ? 'pointer' : 'default', textAlign: 'left' }}
                >
                  <strong>1M. Mengenali & Memahami:</strong> Kamus literasi limbah B3 vs Non-B3.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab && onSelectTab('explore')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: onSelectTab ? 'pointer' : 'default', textAlign: 'left' }}
                >
                  <strong>2M. Mengeksplorasi:</strong> Tur Pusat Pemanfaatan Limbah Industri & mesin industri.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab && onSelectTab('innovations')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: onSelectTab ? 'pointer' : 'default', textAlign: 'left' }}
                >
                  <strong>3M. Menginovasi:</strong> Katalog blueprint karya & ajukan ide baru.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab && onSelectTab('matchmaking')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: onSelectTab ? 'pointer' : 'default', textAlign: 'left' }}
                >
                  <strong>4M. Mengomunikasikan:</strong> Peta penghubung pasokan industri-UMKM.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab && onSelectTab('evaluation')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: onSelectTab ? 'pointer' : 'default', textAlign: 'left' }}
                >
                  <strong>5M. Mengevaluasi:</strong> Uji kemudahan & tingkat keberhasilan produk.
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid #A5D6A7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: '#476850'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>WasteToWealth Platform</strong>. Inisiatif Pengelolaan Limbah Industri Menjadi Sumber Daya Sirkular.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Mengacu pada Regulasi Lingkungan Hidup RI & Standar Teknis Terkait</span>
            <span>•</span>
            <span>Multi-Platform Offline Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
