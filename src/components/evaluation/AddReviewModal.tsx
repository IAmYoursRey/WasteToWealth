import React, { useState, useEffect, useMemo } from 'react';
import { InnovationItem, ReviewItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { X, Star, CheckCircle2, AlertTriangle, Send, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovations: InnovationItem[];
  preSelectedInnovation?: InnovationItem | null;
  onSubmitSuccess: (newReview: ReviewItem) => Promise<void> | void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  innovations,
  preSelectedInnovation,
  onSubmitSuccess
}) => {
  const { user, isGuest } = useAuth();
  const { addToast } = useToast();

  const [selectedInnovationId, setSelectedInnovationId] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [isEasyToMake, setIsEasyToMake] = useState<'Sangat Mudah' | 'Cukup Mudah' | 'Butuh Keterampilan Khusus' | 'Sulit' | ''>('');
  const [isSuccessful, setIsSuccessful] = useState<'Berhasil 100%' | 'Berhasil dengan Modifikasi' | 'Gagal / Perlu Coba Lagi' | ''>('');
  const [comment, setComment] = useState('');
  const [troubleshootingTip, setTroubleshootingTip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifiedInnovations = useMemo(() => {
    return innovations.filter((i) => i.status === 'verified');
  }, [innovations]);

  useEffect(() => {
    if (isOpen) {
      if (preSelectedInnovation && preSelectedInnovation.status === 'verified') {
        setSelectedInnovationId(preSelectedInnovation.id);
      } else if (verifiedInnovations.length > 0) {
        setSelectedInnovationId(verifiedInnovations[0].id);
      } else {
        setSelectedInnovationId('');
      }
      setRating(null);
      setHoverRating(0);
      setIsEasyToMake('');
      setIsSuccessful('');
      setComment('');
      setTroubleshootingTip('');
      setIsSubmitting(false);
    }
  }, [isOpen, preSelectedInnovation, verifiedInnovations]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInnovationId) {
      addToast('Silakan pilih inovasi produk yang valid terlebih dahulu.', 'warning');
      return;
    }

    const targetInnovation = innovations.find((i) => i.id === selectedInnovationId);
    if (!targetInnovation) {
      addToast('Produk inovasi tidak ditemukan. Harap pilih inovasi yang valid.', 'error');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      addToast('Harap berikan penilaian rating bintang (1 s/d 5) sebelum mengirim ulasan.', 'warning');
      return;
    }

    if (!isEasyToMake) {
      addToast('Harap pilih tingkat kemudahan pembuatan produk pada Pertanyaan 1.', 'warning');
      return;
    }

    if (!isSuccessful) {
      addToast('Harap pilih hasil keberhasilan pembuatan produk pada Pertanyaan 2.', 'warning');
      return;
    }

    if (comment.trim().length < 15) {
      addToast('Ulasan evaluasi minimal 15 karakter agar informatif bagi pembaca lain.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const userRoleMapping: Record<string, 'Siswa / Mahasiswa' | 'Pengrajin UMKM' | 'Warga Komunitas' | 'Praktisi Daur Ulang'> = {
      admin: 'Praktisi Daur Ulang',
      user: 'Warga Komunitas',
      student: 'Siswa / Mahasiswa',
      artisan: 'Pengrajin UMKM',
      industry: 'Praktisi Daur Ulang',
      guest: 'Warga Komunitas'
    };

    const resolvedRole = userRoleMapping[user.role] || 'Warga Komunitas';

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      innovationId: targetInnovation.id,
      innovationTitle: targetInnovation.title,
      userId: user.id,
      userName: isGuest ? 'Pengguna Tamu' : user.name,
      userRole: resolvedRole,
      rating,
      isEasyToMake: isEasyToMake as any,
      isSuccessful: isSuccessful as any,
      comment: comment.trim(),
      troubleshootingTip: troubleshootingTip.trim() || undefined,
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      likes: 0
    };

    try {
      await onSubmitSuccess(newReview);
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 }
      });
      addToast('Ulasan evaluasi berhasil disimpan dan metrik inovasi telah diperbarui!', 'success');
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      addToast(err?.message || 'Gagal menyimpan ulasan ke sistem. Silakan coba lagi.', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#E8F5E9', borderBottom: '2px solid #A5D6A7' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge-5m">5M: MENGEVALUASI</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ulasan & Uji Keberhasilan Produk</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)' }}>
              Evaluasi Hasil Pembuatan Produk Inovasi
            </h2>
          </div>
          <button onClick={onClose} aria-label="Tutup modal evaluasi ulasan" style={{ padding: '0.4rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {innovations.length === 0 ? (
          <div className="modal-body" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <AlertTriangle size={48} color="#F59E0B" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
              Belum Ada Katalog Inovasi yang Tersedia
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Anda belum dapat membuat ulasan evaluasi karena belum ada inovasi terverifikasi di katalog sistem.
            </p>
            <button type="button" onClick={onClose} className="btn-secondary">
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              
              {/* Target Innovation */}
              <div className="form-group">
                <label className="form-label">Pilih Produk Inovasi yang Anda Buat / Uji *</label>
                <select
                  value={selectedInnovationId}
                  onChange={(e) => setSelectedInnovationId(e.target.value)}
                  className="form-select"
                  required
                >
                  {verifiedInnovations.map((inv: InnovationItem) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.title} ({inv.wasteSource})
                    </option>
                  ))}
                </select>
              </div>

              {/* User Account Info Display */}
              <div style={{
                background: '#F8FAFC',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--leaf-deep)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--leaf-deep)' }}>
                    {isGuest ? 'Pengguna Tamu (Guest)' : user.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Peran Akun: <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{user.role}</span>
                  </div>
                </div>
              </div>

              {/* Star Rating - Default null */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">
                  Rating Kepuasan Hasil * {rating === null && <span style={{ color: '#EF4444', fontSize: '0.78rem' }}>(Wajib dipilih)</span>}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeScore = hoverRating || (rating ?? 0);
                    const isFilled = activeScore >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Beri nilai ${star} bintang`}
                        style={{ padding: '0.2rem', color: isFilled ? '#F59E0B' : '#CBD5E1', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <Star size={28} fill={isFilled ? '#F59E0B' : 'transparent'} />
                      </button>
                    );
                  })}
                  <span style={{ marginLeft: '0.5rem', fontWeight: 700, fontSize: '0.92rem', color: rating ? '#B45309' : 'var(--text-muted)' }}>
                    {rating ? `${rating} dari 5 Bintang` : 'Belum memilih rating'}
                  </span>
                </div>
              </div>

              {/* Core 5M Question 1: Kemudahan */}
              <div style={{
                background: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: isEasyToMake ? '1.5px solid #2E7D32' : '1.5px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ❓ Pertanyaan 1: Apakah produk ini mudah dibuat / digunakan? *
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {(['Sangat Mudah', 'Cukup Mudah', 'Butuh Keterampilan Khusus', 'Sulit'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsEasyToMake(opt)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: isEasyToMake === opt ? 700 : 500,
                        background: isEasyToMake === opt ? '#2E7D32' : '#FFFFFF',
                        color: isEasyToMake === opt ? '#FFFFFF' : 'var(--text-main)',
                        border: isEasyToMake === opt ? '1px solid #2E7D32' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core 5M Question 2: Keberhasilan */}
              <div style={{
                background: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: isSuccessful ? '1.5px solid #2E7D32' : '1.5px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ❓ Pertanyaan 2: Apakah berhasil pembuatannya? *
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {(['Berhasil 100%', 'Berhasil dengan Modifikasi', 'Gagal / Perlu Coba Lagi'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsSuccessful(opt)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: isSuccessful === opt ? 700 : 500,
                        background: isSuccessful === opt ? (opt === 'Gagal / Perlu Coba Lagi' ? '#EF4444' : '#2E7D32') : '#FFFFFF',
                        color: isSuccessful === opt ? '#FFFFFF' : 'var(--text-main)',
                        border: isSuccessful === opt ? '1px solid transparent' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {opt === 'Berhasil 100%' && '✅ '}
                      {opt === 'Berhasil dengan Modifikasi' && '🛠️ '}
                      {opt === 'Gagal / Perlu Coba Lagi' && '❌ '}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Commentary */}
              <div className="form-group">
                <label className="form-label">Ulasan & Cerita Pembuatan Anda * (Minimal 15 karakter)</label>
                <textarea
                  required
                  placeholder="Ceritakan pengalaman Anda: Berapa lama waktu yang dibutuhkan? Bagaimana kualitas produk jadinya? Apakah ada hal yang perlu diperhatikan?..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Troubleshooting Tips */}
              <div className="form-group">
                <label className="form-label">Tips Pemecahan Masalah (Troubleshooting) bagi Pengguna Lain</label>
                <input
                  type="text"
                  placeholder="Contoh: Saat pengeringan, jangan jemur langsung di terik siang agar papan tidak melengkung"
                  value={troubleshootingTip}
                  onChange={(e) => setTroubleshootingTip(e.target.value)}
                  className="form-input"
                  style={{ background: '#FFFBEB' }}
                />
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn-secondary">
                Batal
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                <Send size={16} />
                <span>{isSubmitting ? 'Menyimpan...' : 'Publikasikan Evaluasi'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
