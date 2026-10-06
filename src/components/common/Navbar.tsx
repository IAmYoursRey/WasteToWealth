import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home,
  BookOpen, 
  Compass, 
  Lightbulb, 
  MapPin, 
  Star, 
  PlusCircle, 
  ShieldCheck, 
  Menu, 
  X, 
  User,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
  pendingRequestsCount?: number;
  onOpenSubmitModal: () => void;
  onOpenAdminModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  pendingRequestsCount = 0,
  onOpenSubmitModal,
  onOpenAdminModal,
  onOpenAuthModal
}) => {
  const { user, isAdmin, isGuest } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      id: 'home', 
      label: 'Beranda', 
      shortLabel: 'Beranda', 
      compactLabel: 'Beranda', 
      mLabel: 'Home', 
      icon: Home,
      tooltip: 'Beranda WasteToWealth'
    },
    { 
      id: 'dictionary', 
      label: 'Kamus & Literasi', 
      shortLabel: 'Kamus & Literasi', 
      compactLabel: 'Kamus Literasi', 
      mLabel: '1M', 
      icon: BookOpen,
      tooltip: '1M: Kamus & Literasi Limbah Industri'
    },
    { 
      id: 'explore', 
      label: 'Pusat Pemanfaatan Limbah Industri', 
      shortLabel: 'Pusat Pemanfaatan', 
      compactLabel: 'Pusat Limbah', 
      mLabel: '2M', 
      icon: Compass,
      tooltip: '2M: Pusat Pemanfaatan Limbah Industri & Fasilitas Sirkular'
    },
    { 
      id: 'innovations', 
      label: 'Marketplace Inovasi', 
      shortLabel: 'Marketplace Inovasi', 
      compactLabel: 'Marketplace', 
      mLabel: '3M', 
      icon: Lightbulb,
      tooltip: '3M: Marketplace Inovasi Daur Ulang'
    },
    { 
      id: 'matchmaking', 
      label: 'Peta Penghubung', 
      shortLabel: 'Peta Penghubung', 
      compactLabel: 'Peta Hubung', 
      mLabel: '4M', 
      icon: MapPin, 
      badge: pendingRequestsCount,
      tooltip: '4M: Peta Penghubung Pasokan Industri & UMKM'
    },
    { 
      id: 'evaluation', 
      label: 'Evaluasi & Ulasan', 
      shortLabel: 'Evaluasi & Ulasan', 
      compactLabel: 'Evaluasi', 
      mLabel: '5M', 
      icon: Star,
      tooltip: '5M: Evaluasi & Ulasan Keberhasilan Produk'
    },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1.5px solid var(--border-leaf)',
      boxShadow: '0 4px 20px -2px rgba(46, 125, 50, 0.08)',
      width: '100%'
    }}>
      <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Brand Logo & Motto */}
        <button 
          onClick={() => setActiveTab('home')}
          aria-label="Beranda WasteToWealth"
          className="nav-logo-btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0, flexShrink: 0 }}
        >
          <img 
            src="./logo-wastetowealth.svg" 
            alt="WasteToWealth Logo" 
            className="nav-logo-img"
            style={{ height: '42px', width: 'auto', display: 'block' }}
          />
        </button>

        {/* Desktop Nav Items (5M Navigation) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.tooltip}
                className={`desktop-nav-btn ${isActive ? 'is-active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.52rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? '#1B5E20' : 'var(--text-muted)',
                  backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                  border: isActive ? '1.5px solid #A5D6A7' : '1.5px solid transparent',
                  boxShadow: isActive ? '0 2px 6px rgba(46, 125, 50, 0.1)' : 'none',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Icon size={16} color={isActive ? '#2E7D32' : '#64748B'} style={{ flexShrink: 0 }} />
                <span className="nav-label-wrapper">
                  <span className="label-full">{item.label}</span>
                  <span className="label-short">{item.shortLabel}</span>
                  <span className="label-compact">{item.compactLabel}</span>
                </span>
                {item.badge && item.badge > 0 ? (
                  <span style={{
                    fontSize: '0.65rem',
                    background: '#0284C7',
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
          
          {/* Admin Verification Button (Only prominent for Admin) */}
          {isAdmin && (
            <button
              onClick={onOpenAdminModal}
              className="btn-outline btn-sm nav-admin-btn"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-full)',
                borderColor: '#A5D6A7',
                color: '#1B5E20',
                background: '#E8F5E9',
                flexShrink: 0
              }}
              title="Dashboard Moderasi Admin"
            >
              <ShieldCheck size={15} color="#2E7D32" />
              <span className="admin-btn-text">Admin ({pendingCount})</span>
              {pendingCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#EF4444',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Submit Innovation CTA */}
          <button
            onClick={onOpenSubmitModal}
            className="btn-primary nav-cta-btn"
            style={{
              padding: '0.48rem 0.95rem',
              fontSize: '0.84rem',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            <PlusCircle size={15} />
            <span className="cta-text">Ajukan Inovasi</span>
          </button>

          {/* User Account & Role Indicator */}
          <button
            onClick={onOpenAuthModal}
            className="nav-user-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: '#F1F5F9',
              border: '1.5px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              flexShrink: 0
            }}
            title="Klik untuk ganti peran atau edit profil"
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: isGuest ? '#94A3B8' : user.role === 'admin' ? '#1B5E20' : user.role === 'industry' ? '#0284C7' : '#2E7D32',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.75rem',
              flexShrink: 0
            }}>
              {isGuest ? <User size={14} /> : user.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left', display: 'none' }} className="user-text-info">
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                {isGuest ? 'Mode Tamu' : user.name.split(' ')[0]}
              </div>
              <div className="user-role-text" style={{ fontSize: '0.68rem', color: isGuest ? 'var(--text-muted)' : '#2E7D32', fontWeight: 600 }}>
                {isGuest ? 'Masuk / Demo' : user.roleLabel.split(' ')[0]}
              </div>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '2px solid var(--border-leaf)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                  color: isActive ? '#1B5E20' : 'var(--text-main)',
                  border: isActive ? '1.5px solid #A5D6A7' : '1.5px solid transparent',
                  fontWeight: isActive ? 700 : 500
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#2E7D32' : '#64748B'} />
                  <span>{item.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {item.badge && item.badge > 0 ? (
                    <span style={{
                      fontSize: '0.65rem',
                      background: '#0284C7',
                      color: '#fff',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 700
                    }}>
                      {item.badge}
                    </span>
                  ) : null}
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32' }}>
                    {item.mLabel}
                  </span>
                </div>
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => {
                onOpenAdminModal();
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#E8F5E9',
                color: '#1B5E20',
                fontWeight: 700,
                border: '1.5px solid #A5D6A7'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} color="#2E7D32" />
                <span>Moderasi Admin ({pendingCount})</span>
              </div>
              {pendingCount > 0 && (
                <span style={{
                  fontSize: '0.65rem',
                  background: '#EF4444',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}>
                  {pendingCount} Pending
                </span>
              )}
            </button>
          )}
        </div>
      )}

      <style>{`
        /* Responsive container */
        .navbar-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        /* Nav label container & responsive text switching */
        .nav-label-wrapper {
          display: inline-flex;
          align-items: center;
        }
        .label-full {
          display: inline;
        }
        .label-short {
          display: none;
        }
        .label-compact {
          display: none;
        }

        /* Smooth hover state with zero shift */
        .desktop-nav-btn:hover:not(.is-active) {
          background-color: #F1F8F2 !important;
          color: #1B5E20 !important;
          border-color: #C8E6C9 !important;
        }

        /* Large Screens (>= 1400px) */
        @media (min-width: 1400px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .admin-btn-text, .user-text-info {
            display: block !important;
          }
          .label-full {
            display: inline !important;
          }
          .label-short, .label-compact {
            display: none !important;
          }
        }

        /* Standard Laptop Screens (1240px - 1399px, e.g. 1366x768, 1280x800) */
        @media (min-width: 1240px) and (max-width: 1399px) {
          .navbar-container {
            padding: 0 1rem !important;
          }
          .nav-logo-img {
            height: 38px !important;
          }
          .desktop-nav {
            display: flex !important;
            gap: 0.25rem !important;
          }
          .desktop-nav-btn {
            padding: 0.48rem 0.65rem !important;
            font-size: 0.82rem !important;
            gap: 0.35rem !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .admin-btn-text, .user-text-info {
            display: block !important;
          }
          .label-full {
            display: none !important;
          }
          .label-short {
            display: inline !important;
          }
          .label-compact {
            display: none !important;
          }
          .nav-cta-btn {
            padding: 0.45rem 0.85rem !important;
            font-size: 0.82rem !important;
          }
        }

        /* Compact Laptop Screens & Tablets Landscape (1024px - 1239px) */
        @media (min-width: 1024px) and (max-width: 1239px) {
          .navbar-container {
            padding: 0 0.75rem !important;
          }
          .nav-logo-img {
            height: 35px !important;
          }
          .desktop-nav {
            display: flex !important;
            gap: 0.2rem !important;
          }
          .desktop-nav-btn {
            padding: 0.42rem 0.48rem !important;
            font-size: 0.78rem !important;
            gap: 0.25rem !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .admin-btn-text, .user-text-info {
            display: block !important;
          }
          .user-role-text {
            display: none !important;
          }
          .label-full {
            display: none !important;
          }
          .label-short {
            display: none !important;
          }
          .label-compact {
            display: inline !important;
          }
          .nav-cta-btn {
            padding: 0.42rem 0.75rem !important;
            font-size: 0.8rem !important;
          }
          .nav-user-btn {
            padding: 0.3rem 0.5rem !important;
          }
        }

        /* Mobile & Small Screens (< 1024px) */
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .admin-btn-text, .user-text-info {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .cta-text {
            display: none;
          }
          .nav-cta-btn {
            padding: 0.45rem 0.6rem !important;
          }
        }
      `}</style>
    </header>
  );
};
