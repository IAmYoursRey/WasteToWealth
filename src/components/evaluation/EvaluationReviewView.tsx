import React, { useState, useMemo } from 'react';
import { ReviewItem, InnovationItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Lightbulb, 
  PlusCircle, 
  Filter, 
  Search, 
  Smile,
  Flag,
  ArrowUpDown,
  X
} from 'lucide-react';

interface EvaluationReviewViewProps {
  reviews: ReviewItem[];
  innovations: InnovationItem[];
  onOpenAddReviewModal: (preSelect?: InnovationItem | null) => void;
  onLikeReview: (reviewId: string) => void;
  onReportReview?: (reviewId: string, reason: string) => void;
}

export const EvaluationReviewView: React.FC<EvaluationReviewViewProps> = ({
  reviews,
  innovations,
  onOpenAddReviewModal,
  onLikeReview,
  onReportReview
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [selectedInnovationFilter, setSelectedInnovationFilter] = useState('all');
  const [selectedSuccessFilter, setSelectedSuccessFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'highest' | 'lowest'>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // Reporting modal state
  const [reportingReviewId, setReportingReviewId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('Informasi keliru atau berbahaya');

  // Calculate statistics
  const stats = useMemo(() => {
    if (reviews.length === 0) return { avgRating: 0, successPercent: 0, easyPercent: 0 };

    const totalStars = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = (totalStars / reviews.length).toFixed(1);

    const successfulCount = reviews.filter(
      (r) => r.isSuccessful === 'Berhasil 100%' || r.isSuccessful === 'Berhasil dengan Modifikasi'
    ).length;
    const successPercent = Math.round((successfulCount / reviews.length) * 100);

    const easyCount = reviews.filter(
      (r) => r.isEasyToMake === 'Sangat Mudah' || r.isEasyToMake === 'Cukup Mudah'
    ).length;
    const easyPercent = Math.round((easyCount / reviews.length) * 100);

    return { avgRating, successPercent, easyPercent };
  }, [reviews]);

  // Filtered and sorted reviews
  const processedReviews = useMemo(() => {
    let result = reviews.filter((r) => {
      const matchInnovation =
        selectedInnovationFilter === 'all' ? true : r.innovationId === selectedInnovationFilter;

      const matchSuccess =
        selectedSuccessFilter === 'all' ? true : r.isSuccessful === selectedSuccessFilter;

      const matchSearch =
        r.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.innovationTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.troubleshootingTip && r.troubleshootingTip.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchInnovation && matchSuccess && matchSearch;
    });

    if (sortBy === 'highest') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result = [...result].sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [reviews, selectedInnovationFilter, selectedSuccessFilter, searchQuery, sortBy]);

  const handleConfirmReport = async () => {
    if (!reportingReviewId) return;
    try {
      await api.reviews.report(reportingReviewId, reportReason);
      if (onReportReview) onReportReview(reportingReviewId, reportReason);
      addToast('Laporan ulasan telah dikirim ke kurator untuk diperiksa.', 'info');
      setReportingReviewId(null);
    } catch {
      addToast('Gagal mengirim laporan', 'error');
    }
  };

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge-5m">
                  ⭐ 5M: MENGEVALUASI
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Uji Kemudahan & Keberhasilan Produk Komunitas
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)' }}>
                Evaluasi & Ulasan Produk Inovasi
              </h2>
            </div>

            <button
              onClick={() => onOpenAddReviewModal(null)}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.3rem' }}
            >
              <PlusCircle size={18} />
              <span>Tulis Ulasan Evaluasi</span>
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Pilar penutup dari kerangka <strong>5M (Mengevaluasi)</strong>: Berbagi feedback jujur mengenai apakah resep produk di katalog <strong>mudah dibuat</strong> dan <strong>berhasil pembuatannya</strong>, serta tips troubleshooting untuk saling menyempurnakan karya.
          </p>
        </div>

        {/* 3 Analytics Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>KEPUASAN HASIL</span>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-display)' }}>
              {stats.avgRating} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-light)' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Berdasarkan {reviews.length} ulasan praktisi
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #A5D6A7' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>TINGKAT KEBERHASILAN</span>
              <CheckCircle2 size={18} color="#2E7D32" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1B5E20', fontFamily: 'var(--font-display)' }}>
              {stats.successPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Pembuat berhasil memproduksi produk
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #3B82F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>KEMUDAHAN PENGERJAAN</span>
              <Smile size={18} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2563EB', fontFamily: 'var(--font-display)' }}>
              {stats.easyPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Menilai sangat / cukup mudah diikuti
            </div>
          </div>
        </div>

        {/* Filter & Sort Bar (Item #59) */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', height: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari kata kunci atau tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Product Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#2E7D32" />
              <select
                value={selectedInnovationFilter}
                onChange={(e) => setSelectedInnovationFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Produk Inovasi</option>
                {innovations.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Success Status Filter */}
            <div>
              <select
                value={selectedSuccessFilter}
                onChange={(e) => setSelectedSuccessFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Status Keberhasilan</option>
                <option value="Berhasil 100%">Berhasil 100%</option>
                <option value="Berhasil dengan Modifikasi">Berhasil dengan Modifikasi</option>
                <option value="Gagal / Perlu Coba Lagi">Gagal / Perlu Coba Lagi</option>
              </select>
            </div>

            {/* Sorting (Item #59) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="#2E7D32" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="form-select"
              >
                <option value="latest">Urutkan: Terbaru</option>
                <option value="highest">Urutkan: Rating Tertinggi</option>
                <option value="lowest">Urutkan: Rating Terendah</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.25rem'
        }}>
          {processedReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card"
              style={{
                padding: '1.4rem'
              }}
            >
              <div>
                
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--leaf-deep)' }}>
                      {rev.userName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                      <span style={{ fontSize: '0.74rem', background: '#F1F5F9', color: '#475569', padding: '1px 7px', borderRadius: '4px', fontWeight: 600 }}>
                        {rev.userRole}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                        • {rev.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        size={15}
                        fill={sIdx < rev.rating ? '#F59E0B' : 'transparent'}
                        color={sIdx < rev.rating ? '#F59E0B' : '#CBD5E1'}
                      />
                    ))}
                  </div>
                </div>

                {/* Target Product Tag */}
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#1B5E20',
                  background: '#E8F5E9',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '0.85rem',
                  border: '1px solid #A5D6A7'
                }}>
                  🛠️ Produk: {rev.innovationTitle}
                </div>

                {/* 5M Evaluation Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: rev.isSuccessful.includes('100%') ? '#E8F5E9' : '#FEF3C7',
                    color: rev.isSuccessful.includes('100%') ? '#1B5E20' : '#92400E',
                    border: '1px solid currentColor'
                  }}>
                    🎯 {rev.isSuccessful}
                  </span>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: '#F1F5F9',
                    color: '#334155',
                    border: '1px solid #CBD5E1'
                  }}>
                    👌 {rev.isEasyToMake}
                  </span>
                </div>

                {/* Comment */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55, marginBottom: '0.9rem' }}>
                  "{rev.comment}"
                </p>

                {/* Troubleshooting Pro Tip */}
                {rev.troubleshootingTip && (
                  <div style={{
                    padding: '0.65rem 0.85rem',
                    background: '#FFFBEB',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #FDE68A',
                    fontSize: '0.8rem',
                    color: '#92400E',
                    lineHeight: 1.45,
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      <Lightbulb size={14} color="#D97706" />
                      <span>Tips Kendala & Solusi:</span>
                    </div>
                    <div>{rev.troubleshootingTip}</div>
                  </div>
                )}

              </div>

              {/* Review Footer with Help & Report Button (Item #57) */}
              <div style={{
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => setReportingReviewId(rev.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: 'var(--text-light)',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                  title="Laporkan ulasan bermasalah ke admin"
                >
                  <Flag size={12} />
                  <span>Laporkan</span>
                </button>

                <button
                  onClick={() => onLikeReview(rev.id)}
                  className="btn-outline btn-sm"
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <ThumbsUp size={13} color="#2E7D32" />
                  <span>Membantu ({rev.likes})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {processedReviews.length === 0 && (
          <div className="empty-state">
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Belum ada ulasan untuk kriteria pencarian ini.
            </p>
            <button
              onClick={() => onOpenAddReviewModal(null)}
              className="btn-primary"
            >
              Jadilah yang Pertama Menulis Ulasan
            </button>
          </div>
        )}

      </div>

      {/* Report Review Modal (Item #57) */}
      {reportingReviewId && (
        <div className="modal-overlay" onClick={() => setReportingReviewId(null)}>
          <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', color: '#991B1B' }}>Laporkan Ulasan Ini</h3>
              <button onClick={() => setReportingReviewId(null)} aria-label="Tutup modal laporan ulasan" style={{ padding: '0.3rem' }}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Bantu kurator menjaga kualitas data dan keselamatan kerja komunitas. Mengapa ulasan ini perlu ditinjau?
              </p>
              <div className="form-group">
                <label className="form-label">Alasan Pelaporan</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="form-select"
                >
                  <option value="Informasi keliru atau berbahaya">Informasi keliru atau berbahaya bagi keselamatan kerja</option>
                  <option value="Ulasan spam atau promosi">Ulasan spam / iklan / promosi komersial</option>
                  <option value="Kata-kata tidak pantas">Kata-kata kasar atau tidak pantas</option>
                  <option value="Tidak relevan dengan produk">Tidak relevan dengan produk tutorial</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setReportingReviewId(null)} className="btn-secondary">
                Batal
              </button>
              <button onClick={handleConfirmReport} className="btn-danger btn-sm">
                Kirim Laporan ke Kurator
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
