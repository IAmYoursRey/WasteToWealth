import React, { useState } from 'react';
import { InnovationItem, ReviewItem } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  Sparkles, 
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingInnovations: InnovationItem[];
  reportedReviews?: ReviewItem[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onDeleteReportedReview?: (id: string) => void;
  onSeedMockPending?: () => void;
}

export const AdminVerificationModal: React.FC<AdminVerificationModalProps> = ({
  isOpen,
  onClose,
  pendingInnovations,
  reportedReviews = [],
  onApprove,
  onReject,
  onDeleteReportedReview,
  onSeedMockPending
}) => {
  const { isAdmin } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'innovations' | 'reviews'>('innovations');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  if (!isAdmin) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '440px', textAlign: 'center', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
          <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#991B1B', marginBottom: '0.5rem' }}>Akses Dibatasi: Khusus Kurator / Admin</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Halaman moderasi ini memerlukan hak akses kurator atau administrator terverifikasi.
          </p>
          <button type="button" onClick={onClose} className="btn-primary">
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const handleApproveClick = (id: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    onApprove(id);
    addToast('Inovasi berhasil disetujui & diterbitkan ke marketplace!', 'success');
  };

  const handleConfirmReject = (id: string) => {
    if (!rejectionReason.trim()) {
      addToast('Harap tuliskan alasan penolakan/revisi agar pemohon dapat memperbaiki inovasinya.', 'warning');
      return;
    }
    onReject(id, rejectionReason);
    setRejectingId(null);
    setRejectionReason('');
    addToast('Status inovasi diubah menjadi Perlu Revisi / Ditolak.', 'info');
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#E8F5E9', borderBottom: '2px solid #A5D6A7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#1B5E20',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)' }}>
                Dashboard Moderasi Admin & Kurator
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Tinjau kelayakan blueprint SOP inovasi baru dan moderasi ulasan komunitas
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Tutup panel admin" style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setActiveTab('innovations')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'innovations' ? 700 : 500,
              background: activeTab === 'innovations' ? '#2E7D32' : 'transparent',
              color: activeTab === 'innovations' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Antrean Inovasi ({pendingInnovations.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'reviews' ? 700 : 500,
              background: activeTab === 'reviews' ? '#2E7D32' : 'transparent',
              color: activeTab === 'reviews' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Laporan Ulasan ({reportedReviews.length})
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          
          {/* TAB 1: INNOVATIONS */}
          {activeTab === 'innovations' && (
            <div>
              {pendingInnovations.length === 0 ? (
                <div className="empty-state">
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#E8F5E9',
                    color: '#1B5E20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                    Semua Inovasi Telah Diverifikasi!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', maxWidth: '440px', margin: '0 auto 1rem auto' }}>
                    Tidak ada ide inovasi yang menunggu persetujuan saat ini. Anda dapat membuat contoh pengajuan uji coba untuk menguji workflow.
                  </p>
                  
                  {onSeedMockPending && (
                    <button
                      type="button"
                      onClick={onSeedMockPending}
                      className="btn-secondary btn-sm"
                    >
                      <Sparkles size={14} color="#2E7D32" />
                      <span>Buat Contoh Pengajuan Uji Coba</span>
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {pendingInnovations.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '1.2rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid #CBD5E1',
                        background: '#FFFFFF',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                            <span className="badge-sector">{item.category}</span>
                            <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                              Menunggu Verifikasi
                            </span>
                          </div>
                          <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                            {item.title}
                          </h3>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                          <button
                            onClick={() => setRejectingId(rejectingId === item.id ? null : item.id)}
                            className="btn-outline btn-sm"
                            style={{ color: '#EF4444', borderColor: '#FECACA' }}
                          >
                            <Trash2 size={14} />
                            <span>Tolak / Revisi</span>
                          </button>

                          <button
                            onClick={() => handleApproveClick(item.id)}
                            className="btn-primary btn-sm"
                          >
                            <Check size={15} />
                            <span>Setujui & Terbitkan</span>
                          </button>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        {item.tagline}
                      </p>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '0.5rem',
                        background: '#F8FAFC',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        marginBottom: '0.75rem'
                      }}>
                        <div><strong>Bahan Limbah:</strong> {item.wasteSource}</div>
                        <div><strong>Tingkat Kesulitan:</strong> {item.difficulty}</div>
                        <div><strong>Estimasi Modal:</strong> {item.estimatedCost}</div>
                        <div><strong>Waktu Pembuatan:</strong> {item.estimatedTime}</div>
                        <div><strong>Diajukan Oleh:</strong> {item.submittedBy} ({item.submissionDate})</div>
                        {item.economicValue && (
                          <div style={{ gridColumn: '1 / -1' }}><strong>Potensi Nilai Jual:</strong> {item.economicValue}</div>
                        )}
                      </div>

                      {/* Blueprint Detail Expander */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="btn-outline btn-sm"
                        style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem', fontSize: '0.8rem' }}
                      >
                        <FileText size={14} />
                        <span>{expandedId === item.id ? 'Tutup Detail Blueprint' : 'Tinjau Rincian Blueprint & Langkah SOP'}</span>
                        {expandedId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {expandedId === item.id && (
                        <div style={{
                          padding: '0.9rem',
                          background: '#F1F5F9',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.82rem',
                          marginBottom: '0.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem'
                        }}>
                          {/* Materials */}
                          <div>
                            <strong style={{ color: 'var(--leaf-deep)', display: 'block', marginBottom: '0.2rem' }}>
                              Daftar Bahan:
                            </strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                              {item.materials?.map((m, idx) => (
                                <span key={idx} style={{ background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                                  {m.name} ({m.amount})
                                </span>
                              )) || 'Tidak ada data bahan'}
                            </div>
                          </div>

                          {/* Tools */}
                          <div>
                            <strong style={{ color: 'var(--leaf-deep)', display: 'block', marginBottom: '0.2rem' }}>
                              Peralatan yang Digunakan:
                            </strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                              {item.tools?.map((tool, idx) => (
                                <span key={idx} style={{ background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                                  {tool}
                                </span>
                              )) || 'Tidak ada data peralatan'}
                            </div>
                          </div>

                          {/* Steps */}
                          <div>
                            <strong style={{ color: 'var(--leaf-deep)', display: 'block', marginBottom: '0.3rem' }}>
                              Langkah SOP Pembuatan ({item.steps?.length || 0} Langkah):
                            </strong>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                              {item.steps?.map((st) => (
                                <div key={st.stepNumber} style={{ background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                                  <div style={{ fontWeight: 600, color: 'var(--leaf-dark)' }}>
                                    Langkah {st.stepNumber}: {st.title}
                                  </div>
                                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                                    {st.description}
                                  </div>
                                  {st.tip && (
                                    <div style={{ color: '#D97706', fontSize: '0.74rem', marginTop: '2px' }}>
                                      💡 Tip: {st.tip}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Safety Tips */}
                          {item.safetyTips && item.safetyTips.length > 0 && (
                            <div>
                              <strong style={{ color: '#991B1B', display: 'block', marginBottom: '0.2rem' }}>
                                Panduan Keselamatan (K3):
                              </strong>
                              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#7F1D1D' }}>
                                {item.safetyTips.map((tip, idx) => (
                                  <li key={idx}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Rejection input box */}
                      {rejectingId === item.id && (
                        <div style={{
                          marginTop: '0.75rem',
                          background: '#FFF1F2',
                          padding: '0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid #FECDD3'
                        }}>
                          <label className="form-label" style={{ color: '#991B1B' }}>
                            Alasan Penolakan / Catatan Perbaikan untuk Pemohon *
                          </label>
                          <textarea
                            placeholder="Contoh: Takaran perekat pada langkah 2 belum spesifik; harap lengkapi rasio berat/volume agar pembaca dapat mereplikasi dengan aman."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="form-textarea"
                            style={{ minHeight: '60px', marginBottom: '0.5rem' }}
                          />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                            <button
                              type="button"
                              onClick={() => setRejectingId(null)}
                              className="btn-outline btn-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConfirmReject(item.id)}
                              className="btn-danger btn-sm"
                            >
                              Kirim Penolakan
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REPORTED REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              {reportedReviews.length === 0 ? (
                <div className="empty-state">
                  <Check size={28} color="#2E7D32" />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Tidak ada ulasan komunitas yang dilaporkan bermasalah.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {reportedReviews.map((rev) => (
                    <div key={rev.id} style={{
                      padding: '1rem',
                      background: '#FFF1F2',
                      border: '1px solid #FECACA',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#991B1B' }}>
                          Laporan Masalah pada Ulasan: {rev.innovationTitle}
                        </span>
                        {onDeleteReportedReview && (
                          <button
                            onClick={() => onDeleteReportedReview(rev.id)}
                            className="btn-danger btn-sm"
                          >
                            Hapus Ulasan
                          </button>
                        )}
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#7F1D1D' }}>
                        <strong>Komentar:</strong> "{rev.comment}"
                      </p>
                      <div style={{ fontSize: '0.76rem', color: '#B91C1C', marginTop: '0.2rem' }}>
                        <strong>Alasan Pelapor:</strong> {rev.reportReason || 'Konten tidak pantas atau tidak relevan'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
