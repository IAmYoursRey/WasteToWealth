import React, { useState, useEffect } from 'react';
import { InnovationItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  X, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Lightbulb, 
  Play, 
  Pause, 
  ShieldAlert, 
  Star,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InnovationDetailModalProps {
  innovation: InnovationItem | null;
  onClose: () => void;
  onOpenReviewModal: (innovation: InnovationItem) => void;
}

export const InnovationDetailModal: React.FC<InnovationDetailModalProps> = ({
  innovation,
  onClose,
  onOpenReviewModal
}) => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load user step progress
  useEffect(() => {
    if (!innovation) return;
    const fetchProgress = async () => {
      const progress = await api.innovations.getProgress(user.id, innovation.id);
      setCompletedSteps(progress);
    };
    fetchProgress();
  }, [innovation, user.id]);

  // Video playback timer - stops at 270 seconds (04:30)
  useEffect(() => {
    let interval: any;
    if (isPlayingVideo) {
      interval = setInterval(() => {
        setVideoTime((prev) => {
          if (prev >= 270) {
            setIsPlayingVideo(false);
            return 270;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo]);

  if (!innovation) return null;

  const handleToggleStep = async (stepNumber: number) => {
    const updated = await api.innovations.toggleStep(user.id, innovation.id, stepNumber);
    setCompletedSteps(updated);

    if (updated.length === innovation.steps.length) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const isAllStepsFinished = completedSteps.length === innovation.steps.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#E8F5E9', borderBottom: '2px solid #A5D6A7' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge-sector">{innovation.category}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: innovation.difficulty === 'Mudah' ? '#E8F5E9' : innovation.difficulty === 'Menengah' ? '#FEF3C7' : '#FEE2E2',
                color: innovation.difficulty === 'Mudah' ? '#1B5E20' : innovation.difficulty === 'Menengah' ? '#92400E' : '#991B1B',
              }}>
                Kesulitan: {innovation.difficulty}
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--leaf-deep)' }}>
              {innovation.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Tutup detail inovasi"
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          
          {/* Subtitle & Waste source */}
          <div style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.4rem' }}>
              {innovation.tagline}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong>Bahan Limbah Utama:</strong> <span style={{ color: '#1B5E20', fontWeight: 700 }}>{innovation.wasteSource}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem'
          }}>
            <div style={{ background: '#E8F5E9', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A5D6A7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#1B5E20', fontWeight: 600 }}>
                <Clock size={15} color="#2E7D32" />
                <span>ESTIMASI WAKTU</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--leaf-deep)', marginTop: '0.2rem' }}>
                {innovation.estimatedTime}
              </div>
            </div>

            <div style={{ background: '#E8F5E9', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A5D6A7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#1B5E20', fontWeight: 600 }}>
                <DollarSign size={15} color="#2E7D32" />
                <span>ESTIMASI MODAL</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--leaf-deep)', marginTop: '0.2rem' }}>
                {innovation.estimatedCost}
              </div>
            </div>

            <div style={{ background: '#E8F5E9', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A5D6A7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#1B5E20', fontWeight: 600 }}>
                <TrendingUp size={15} color="#2E7D32" />
                <span>TINGKAT KEBERHASILAN</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1B5E20', marginTop: '0.2rem' }}>
                {innovation.successRate !== null && innovation.successRate !== undefined
                  ? `${innovation.successRate}% Sukses Komunitas`
                  : 'Belum Ada Evaluasi'}
              </div>
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div style={{
            background: isAllStepsFinished ? '#E8F5E9' : '#F8FAFC',
            border: isAllStepsFinished ? '2px solid #A5D6A7' : '1px solid var(--border-light)',
            padding: '0.85rem 1.1rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: isAllStepsFinished ? '#1B5E20' : 'var(--text-main)' }}>
                {isAllStepsFinished ? '🎉 Semua Langkah Telah Selesai Dipraktikkan!' : `Progress Praktik: ${completedSteps.length} dari ${innovation.steps.length} langkah selesai`}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Centang setiap langkah setelah Anda berhasil mengerjakannya di bengkel / laboratorium
              </div>
            </div>

            {isAllStepsFinished && (
              <button
                onClick={() => {
                  onClose();
                  onOpenReviewModal(innovation);
                }}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
              >
                <Sparkles size={15} />
                <span>Uji & Evaluasi Hasil Anda (5M)</span>
              </button>
            )}
          </div>

          {/* Video Player Simulation */}
          <div style={{
            position: 'relative',
            background: '#0F172A',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid #1E293B',
            aspectRatio: '16/9',
            maxHeight: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            {/* Top Badge Indicating Prototype Video Simulation */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 3,
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(165, 214, 167, 0.5)',
              color: '#E8F5E9',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 600,
              backdropFilter: 'blur(4px)'
            }}>
              Simulasi Tutorial Video (Prototype)
            </div>

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(46, 125, 50, 0.25) 0%, rgba(15, 23, 42, 0.95) 80%)'
            }} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '1.5rem', width: '100%' }}>
              <button
                onClick={() => {
                  if (videoTime >= 270 && !isPlayingVideo) {
                    setVideoTime(0);
                  }
                  setIsPlayingVideo(!isPlayingVideo);
                }}
                aria-label={isPlayingVideo ? 'Jeda simulasi video' : 'Putar simulasi video tutorial'}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #388E3C 0%, #2E7D32 100%)',
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(165, 214, 167, 0.6)',
                  marginBottom: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
              >
                {isPlayingVideo ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
              </button>

              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                {isPlayingVideo ? `Simulasi Video Praktik: ${innovation.title}` : `Video Panduan Visual & Infografis`}
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#E8F5E9', marginBottom: '0.75rem' }}>
                {isPlayingVideo
                  ? `Durasi Berjalan: ${Math.floor(videoTime / 60)}:${String(videoTime % 60).padStart(2, '0')} / 04:30`
                  : 'Klik tombol putar untuk menyimak simulasi alur langkah video pengolahan'}
              </div>

              {/* Video Timeline bar */}
              <div style={{
                width: '80%',
                maxWidth: '420px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                margin: '0 auto',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(videoTime / 270) * 100}%`,
                  height: '100%',
                  background: '#A5D6A7',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Materials & Tools Split */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
            
            {/* Materials */}
            <div style={{
              background: '#F8FAFC',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                📦 Bahan-Bahan yang Dibutuhkan:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {innovation.materials.map((mat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    padding: '0.3rem 0',
                    borderBottom: '1px dashed #E2E8F0'
                  }}>
                    <span style={{ color: 'var(--text-main)' }}>• {mat.name}</span>
                    <span style={{ fontWeight: 700, color: '#1B5E20', background: '#E8F5E9', padding: '1px 6px', borderRadius: '4px' }}>
                      {mat.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div style={{
              background: '#F8FAFC',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                🛠️ Peralatan yang Diperlukan:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {innovation.tools.map((tool, idx) => (
                  <div key={idx} style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    padding: '0.3rem 0',
                    borderBottom: '1px dashed #E2E8F0'
                  }}>
                    🔧 {tool}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Step-by-Step Checklist */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                Panduan Langkah-demi-Langkah & Checklist Selesai:
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {completedSteps.length} / {innovation.steps.length} Selesai
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {innovation.steps.map((step, idx) => {
                const isStepCompleted = completedSteps.includes(step.stepNumber);

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: activeStep === idx ? '2px solid #A5D6A7' : '1px solid var(--border-light)',
                      background: isStepCompleted ? '#E8F5E9' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStep(step.stepNumber);
                        }}
                        aria-label={isStepCompleted ? `Tandai langkah ${step.stepNumber} belum selesai` : `Tandai langkah ${step.stepNumber} selesai`}
                        style={{ padding: '2px', color: isStepCompleted ? '#2E7D32' : '#94A3B8', marginTop: '2px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        title={isStepCompleted ? 'Tandai belum selesai' : 'Tandai langkah sudah selesai'}
                      >
                        {isStepCompleted ? <CheckSquare size={22} color="#2E7D32" /> : <Square size={22} />}
                      </button>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isStepCompleted ? '#1B5E20' : 'var(--text-main)', marginBottom: '0.25rem' }}>
                            Langkah {step.stepNumber}: {step.title}
                          </div>
                          {isStepCompleted && (
                            <span style={{ fontSize: '0.72rem', color: '#1B5E20', background: '#E8F5E9', padding: '1px 7px', borderRadius: '10px', fontWeight: 700 }}>
                              Selesai ✓
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {step.description}
                        </div>

                        {step.tip && (
                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.45rem 0.75rem',
                            background: '#FEF3C7',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.78rem',
                            color: '#92400E',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            <Lightbulb size={14} color="#D97706" style={{ flexShrink: 0 }} />
                            <span><strong>Tips Sukses:</strong> {step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Warning */}
          <div style={{
            background: '#FEF2F2',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FECACA'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#991B1B', marginBottom: '0.4rem' }}>
              <ShieldAlert size={16} color="#DC2626" />
              <span>Standar Keselamatan Kerja (K3):</span>
            </div>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#7F1D1D', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {innovation.safetyTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Tutup
          </button>
          
          <button
            onClick={() => {
              onClose();
              onOpenReviewModal(innovation);
            }}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #388E3C 0%, #2E7D32 100%)' }}
          >
            <Star size={16} />
            <span>Beri Ulasan Evaluasi (5M)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
