import React, { useState, useEffect } from 'react';
import { MatchmakingItem } from '../../types';
import { X, CheckCircle2, Send, Building2, MapPin, Package, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';

interface SupplyRequestModalProps {
  partner: MatchmakingItem | null;
  onClose: () => void;
  onRequestSuccess?: () => void;
}

export const SupplyRequestModal: React.FC<SupplyRequestModalProps> = ({
  partner,
  onClose,
  onRequestSuccess
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const [applicantName, setApplicantName] = useState(user.name || '');
  const [organizationName, setOrganizationName] = useState(user.organization || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [requestedVolume, setRequestedVolume] = useState('200 kg / Bulan');
  const [intendedProduct, setIntendedProduct] = useState('');
  const [pickupMethod, setPickupMethod] = useState('Ambil Langsung dengan Armada Sendiri');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (partner) {
      setApplicantName(user.id !== 'guest' ? user.name : '');
      setOrganizationName(user.id !== 'guest' && user.organization && user.organization !== '-' ? user.organization : '');
      setPhone(user.id !== 'guest' && user.phone && user.phone !== '-' ? user.phone : '');
      setEmail(user.id !== 'guest' && user.email && user.email !== '-' ? user.email : '');
      setRequestedVolume('200 kg / Bulan');
      setIntendedProduct('');
      setPickupMethod('Ambil Langsung dengan Armada Sendiri');
      setIsSuccess(false);
    }
  }, [partner, user]);

  if (!partner) return null;

  const isSupplier = partner.type === 'industry_supplier';

  const resetForm = () => {
    setApplicantName(user.id !== 'guest' ? user.name : '');
    setOrganizationName(user.id !== 'guest' && user.organization && user.organization !== '-' ? user.organization : '');
    setPhone(user.id !== 'guest' && user.phone && user.phone !== '-' ? user.phone : '');
    setEmail(user.id !== 'guest' && user.email && user.email !== '-' ? user.email : '');
    setRequestedVolume('200 kg / Bulan');
    setIntendedProduct('');
    setPickupMethod('Ambil Langsung dengan Armada Sendiri');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!applicantName.trim() || !phone.trim() || !intendedProduct.trim()) {
      addToast('Harap lengkapi nama penanggung jawab, kontak telepon, dan rencana pengolahan.', 'warning');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const record = await api.matchmaking.sendSupplyRequest({
        partnerId: partner.id,
        partnerName: partner.name,
        targetType: partner.type,
        requesterId: user.id,
        requesterName: applicantName.trim(),
        organizationName: organizationName.trim() || 'Mandiri / Komunitas',
        phone: phone.trim(),
        email: email.trim() || '-',
        wasteType: partner.wasteType,
        requestedVolume: requestedVolume.trim(),
        pickupMethod: pickupMethod,
        intendedProduct: intendedProduct.trim()
      });
      
      setIsSuccess(true);
      addToast(`Permohonan kemitraan berhasil dikirim ke ${partner.name}!`, 'success');
      if (onRequestSuccess) {
        onRequestSuccess();
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setIsSuccess(false);
        resetForm();
        onClose();
      }, 2400);
    } catch (error: any) {
      console.error('Failed to submit request', error);
      addToast(error?.message || 'Gagal mengirim pengajuan kemitraan.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#E8F5E9', borderBottom: '2px solid #A5D6A7' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge-5m">4M: MATCHMAKING</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isSupplier ? 'Penyedia Bahan Baku Industri' : 'Pencari Bahan Baku UMKM'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)' }}>
              {isSupplier ? 'Ajukan Permintaan Pasokan Limbah' : 'Tawarkan Pasokan Bahan Baku'}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Tutup modal pengajuan pasokan" style={{ padding: '0.4rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <CheckCircle2 size={60} color="#2E7D32" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
              Pengajuan Kemitraan Terkirim!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto' }}>
              Notifikasi kerja sama telah diteruskan ke <strong>{partner.name}</strong> ({partner.contactName}). Anda akan dihubungi melalui nomor WhatsApp atau email yang tertera untuk konfirmasi SOP pengambilan.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              
              {/* Partner Summary Box */}
              <div style={{
                background: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--leaf-deep)', marginBottom: '0.25rem' }}>
                  {partner.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <MapPin size={14} color="#2E7D32" />
                  <span>{partner.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#1B5E20', fontWeight: 600 }}>
                  <Package size={14} />
                  <span>Bahan: {partner.wasteType} ({partner.volumeMonthly})</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
                  <strong>Skema:</strong> {partner.priceExpectation}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="form-group">
                <label className="form-label">Nama Lengkap Penanggung Jawab *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso / Siti Rahma"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nama Usaha / Kelompok UMKM / Sekolah *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Koperasi Pengrajin Kreasi Mandiri"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">Nomor Telepon / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Kontak</label>
                  <input
                    type="email"
                    placeholder="email@umkm.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">Volume Kebutuhan per Bulan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 300 kg / Bulan"
                    value={requestedVolume}
                    onChange={(e) => setRequestedVolume(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Metode Pengambilan</label>
                  <select
                    value={pickupMethod}
                    onChange={(e) => setPickupMethod(e.target.value)}
                    className="form-select"
                  >
                    <option value="Ambil Langsung dengan Armada Sendiri">Ambil Langsung dengan Armada Sendiri (Pikap/Truk)</option>
                    <option value="Kirim via Ekspedisi Kargo">Kirim via Ekspedisi Kargo</option>
                    <option value="Jadwal Rutin Mingguan">Jadwal Rutin Mingguan</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Rencana Pengolahan Produk Inovasi *</label>
                <textarea
                  required
                  placeholder="Jelaskan produk apa yang akan Anda buat dari limbah ini (contoh: Dibuat menjadi panel akustik peredam suara untuk studio musik lokal)..."
                  value={intendedProduct}
                  onChange={(e) => setIntendedProduct(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.76rem',
                color: '#1B5E20',
                background: '#E8F5E9',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #A5D6A7'
              }}>
                <ShieldCheck size={16} color="#2E7D32" style={{ flexShrink: 0 }} />
                <span>Seluruh transaksi bahan baku terikat pada pakta kepatuhan pemanfaatan limbah Non-B3 (PP No. 22/2021).</span>
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                <Send size={16} />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Permohonan Kemitraan'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
