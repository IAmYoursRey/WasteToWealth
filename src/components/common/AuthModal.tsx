import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { X, LogIn, UserPlus, User, ShieldCheck, Factory, Building2, Check, Sparkles, LogOut } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register' | 'profile';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login'
}) => {
  const { user, login, register, updateProfile, switchRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile'>(initialTab);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('user');
  const [registerOrg, setRegisterOrg] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');

  // Profile edit states
  const [profileName, setProfileName] = useState(user.name);
  const [profileOrg, setProfileOrg] = useState(user.organization);
  const [profilePhone, setProfilePhone] = useState(user.phone || '');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    await login(loginEmail);
    onClose();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail) return;
    await register(registerName, registerEmail, registerRole, registerOrg, registerPhone);
    onClose();
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: profileName,
      organization: profileOrg,
      phone: profilePhone
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header Tabs */}
        <div className="modal-header" style={{ padding: '0.85rem 1.25rem', background: '#F8FAFC' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'login' ? 700 : 500,
                background: activeTab === 'login' ? '#2E7D32' : 'transparent',
                color: activeTab === 'login' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              <LogIn size={15} />
              <span>Masuk</span>
            </button>

            <button
              onClick={() => setActiveTab('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'register' ? 700 : 500,
                background: activeTab === 'register' ? '#2E7D32' : 'transparent',
                color: activeTab === 'register' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              <UserPlus size={15} />
              <span>Daftar Akun</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'profile' ? 700 : 500,
                background: activeTab === 'profile' ? '#2E7D32' : 'transparent',
                color: activeTab === 'profile' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              <User size={15} />
              <span>Profil Saya</span>
            </button>
          </div>

          <button onClick={onClose} aria-label="Tutup modal autentikasi" style={{ padding: '0.35rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.4rem' }}>
          
          {/* Quick Demo Role Switcher Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8F2 100%)',
            border: '1.5px solid #A5D6A7',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#1B5E20' }}>
                <Sparkles size={14} color="#2E7D32" />
                <span>Simulator Peran — Khusus Demo (Bukan Autentikasi Nyata):</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#92400E', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', border: '1px solid #FDE68A', fontWeight: 700 }}>
                Simulasi Prototipe
              </span>
            </div>
            
            <div className="grid-2-col" style={{ gap: '0.4rem' }}>
              <button
                type="button"
                onClick={async () => { await switchRole('user'); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.6rem',
                  background: user.role === 'user' ? '#2E7D32' : '#FFFFFF',
                  color: user.role === 'user' ? '#FFFFFF' : '#1B5E20',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  border: '1px solid #A5D6A7',
                  textAlign: 'left'
                }}
              >
                <span>🎓 Siswa / Pelajar</span>
                {user.role === 'user' && <Check size={13} />}
              </button>

              <button
                type="button"
                onClick={async () => { await switchRole('industry'); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.6rem',
                  background: user.role === 'industry' ? '#2E7D32' : '#FFFFFF',
                  color: user.role === 'industry' ? '#FFFFFF' : '#1B5E20',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  border: '1px solid #A5D6A7',
                  textAlign: 'left'
                }}
              >
                <span>🏭 Pabrik Industri</span>
                {user.role === 'industry' && <Check size={13} />}
              </button>

              <button
                type="button"
                onClick={async () => { await switchRole('umkm'); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.6rem',
                  background: user.role === 'umkm' ? '#2E7D32' : '#FFFFFF',
                  color: user.role === 'umkm' ? '#FFFFFF' : '#1B5E20',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  border: '1px solid #A5D6A7',
                  textAlign: 'left'
                }}
              >
                <span>👥 Pengrajin UMKM</span>
                {user.role === 'umkm' && <Check size={13} />}
              </button>

              <button
                type="button"
                onClick={async () => { await switchRole('admin'); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.6rem',
                  background: user.role === 'admin' ? '#1B5E20' : '#FFFFFF',
                  color: user.role === 'admin' ? '#FFFFFF' : '#1B5E20',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  border: '1px solid #A5D6A7',
                  textAlign: 'left'
                }}
              >
                <span>🛡️ Admin Nasional</span>
                {user.role === 'admin' && <Check size={13} />}
              </button>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#1B5E20', marginTop: '0.5rem', lineHeight: 1.35 }}>
              Pemberitahuan UU PDP No. 27/2022: Data demonstrasi ini disimpan secara lokal di peramban (localStorage) Anda. Jangan memasukkan data pribadi atau rahasia sensitif.
            </div>
          </div>

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '1rem', padding: '0.6rem', background: '#FEF3C7', color: '#92400E', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600 }}>
                ⚠️ Demo Login: Autentikasi disimulasikan secara lokal untuk purwarupa.
              </div>
              <div className="form-group">
                <label className="form-label">Email Terdaftar</label>
                <input
                  type="email"
                  required
                  placeholder="masukkan email Anda (contoh: raihan@pelajar.id)"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kata Sandi</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="demo123"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                <LogIn size={16} />
                <span>Masuk Sekarang</span>
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap / Nama Entitas *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama pemohon"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Akun *</label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipe Peran Pengguna *</label>
                <select
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value as any)}
                  className="form-select"
                >
                  <option value="user">Siswa / Mahasiswa / Warga Umum</option>
                  <option value="industry">Pihak Pabrik Industri (Penyedia Limbah Non-B3)</option>
                  <option value="umkm">Pelaku UMKM / Komunitas Daur Ulang</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Sekolah / Pabrik / UMKM *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama instansi atau organisasi"
                  value={registerOrg}
                  onChange={(e) => setRegisterOrg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor WhatsApp / Telepon</label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                <UserPlus size={16} />
                <span>Buat Akun WasteToWealth</span>
              </button>
            </form>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem',
                background: '#F8FAFC',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#2E7D32',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--leaf-deep)' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {user.email} • <strong>{user.roleLabel}</strong>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Pengguna</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Organisasi / Sekolah / Pabrik</label>
                <input
                  type="text"
                  required
                  value={profileOrg}
                  onChange={(e) => setProfileOrg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor Telepon</label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={async () => { await logout(); onClose(); }}
                  className="btn-outline"
                  style={{ flex: 1, color: '#EF4444', borderColor: '#FECACA' }}
                >
                  <LogOut size={16} />
                  <span>Keluar Akun</span>
                </button>

                <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
