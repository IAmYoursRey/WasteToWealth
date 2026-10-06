import React, { useState, useMemo } from 'react';
import { InnovationItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { InnovationDetailModal } from './InnovationDetailModal';
import { 
  Search, 
  Filter, 
  Lightbulb, 
  PlusCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Star, 
  ChevronRight,
  Sparkles,
  User,
  AlertCircle,
  X
} from 'lucide-react';

interface InnovationCatalogViewProps {
  innovations: InnovationItem[];
  isLoading?: boolean;
  activeWasteFilter?: { id: string, name: string };
  onClearWasteFilter?: () => void;
  highlightInnovationId?: string;
  onClearHighlightInnovation?: () => void;
  onOpenSubmitModal: () => void;
  onEditRejectedInnovation?: (innovation: InnovationItem) => void;
  onOpenReviewModal: (innovation: InnovationItem) => void;
}

export const InnovationCatalogView: React.FC<InnovationCatalogViewProps> = ({
  innovations,
  isLoading = false,
  activeWasteFilter,
  onClearWasteFilter,
  highlightInnovationId,
  onClearHighlightInnovation,
  onOpenSubmitModal,
  onEditRejectedInnovation,
  onOpenReviewModal
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'my'>('all');
  const [selectedInnovation, setSelectedInnovation] = useState<InnovationItem | null>(null);

  // Categories
  const categories = useMemo(() => {
    const set = new Set(innovations.map((i) => i.category));
    return Array.from(set);
  }, [innovations]);

  // Filter logic (Point 16: strictly authorId === user.id)
  const filteredInnovations = useMemo(() => {
    return innovations.filter((item) => {
      // My innovations tab
      if (activeTabFilter === 'my') {
        const isAuthor = item.authorId === user.id;
        if (!isAuthor) return false;
      } else {
        // In "all" tab, show verified items, or pending/rejected items if created by current user or admin
        const isOwn = item.authorId === user.id;
        if (item.status !== 'verified' && !isOwn && user.role !== 'admin') {
          return false;
        }
      }

      // Deep linked waste filter from Kamus (Point 5, 15)
      if (activeWasteFilter) {
        if (item.wasteId !== activeWasteFilter.id) return false;
      }

      // Highlight specific innovation from Kamus (Point 7)
      if (highlightInnovationId) {
        if (item.id !== highlightInnovationId) return false;
      }

      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.wasteSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const matchDifficulty =
        selectedDifficulty === 'all' ? true : item.difficulty === selectedDifficulty;

      return matchSearch && matchCategory && matchDifficulty;
    });
  }, [innovations, activeTabFilter, activeWasteFilter, highlightInnovationId, searchQuery, selectedCategory, selectedDifficulty, user]);

  const myCount = innovations.filter((i) => i.authorId === user.id).length;

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
                  💡 3M: MENGINOVASI
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Marketplace Ide, Infografis & Blueprint Daur Ulang
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)' }}>
                Marketplace Inovasi Produk Sirkular
              </h2>
            </div>

            <button
              onClick={onOpenSubmitModal}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.3rem' }}
            >
              <PlusCircle size={18} />
              <span>Ajukan Ide Inovasi Baru</span>
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Katalog panduan langkah-demi-langkah pengolahan limbah industri menjadi kerajinan bernilai tinggi, material bangunan alternatif, bioplastik, dan pupuk organik. Dilengkapi checklist pengerjaan dan kalkulator nilai pasar.
          </p>

          {/* Active Waste Filter Banner (from Kamus deep link) */}
          {activeWasteFilter && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#E8F5E9',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid #A5D6A7',
              width: 'fit-content',
              fontSize: '0.86rem',
              color: '#1B5E20',
              fontWeight: 600
            }}>
              <span>🔍 Memfilter Inovasi untuk Bahan: <strong>{activeWasteFilter.name}</strong></span>
              {onClearWasteFilter && (
                <button onClick={onClearWasteFilter} aria-label="Hapus filter bahan" style={{ display: 'flex', color: '#EF4444', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Highlight Innovation Banner */}
          {highlightInnovationId && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#E8F5E9',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid #A5D6A7',
              width: 'fit-content',
              fontSize: '0.86rem',
              color: '#1B5E20',
              fontWeight: 600
            }}>
              <span>💡 Menampilkan Inovasi Terpilih dari Kamus: <strong>{innovations.find(i => i.id === highlightInnovationId)?.title || highlightInnovationId}</strong></span>
              {onClearHighlightInnovation && (
                <button onClick={onClearHighlightInnovation} aria-label="Tampilkan semua inovasi" style={{ display: 'flex', color: '#EF4444', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', height: 'auto' }}>
          
          {/* Main Tabs: Semua vs Inovasi Saya */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
            <button
              onClick={() => setActiveTabFilter('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTabFilter === 'all' ? 700 : 500,
                background: activeTabFilter === 'all' ? '#E8F5E9' : '#FFFFFF',
                color: activeTabFilter === 'all' ? '#1B5E20' : 'var(--text-muted)',
                border: activeTabFilter === 'all' ? '1.5px solid #A5D6A7' : '1px solid var(--border-light)'
              }}
            >
              <span>Katalog Publik</span>
            </button>

            <button
              onClick={() => setActiveTabFilter('my')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTabFilter === 'my' ? 700 : 500,
                background: activeTabFilter === 'my' ? '#E8F5E9' : '#FFFFFF',
                color: activeTabFilter === 'my' ? '#1B5E20' : 'var(--text-muted)',
                border: activeTabFilter === 'my' ? '1.5px solid #A5D6A7' : '1px solid var(--border-light)'
              }}
            >
              <User size={15} />
              <span>Inovasi Saya ({myCount})</span>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari inovasi (contoh: panel, lilin, bioplastik)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Category Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#2E7D32" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Kategori Produk</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Kesulitan:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Tingkat</option>
                <option value="Mudah">Mudah</option>
                <option value="Menengah">Menengah</option>
                <option value="Tinggi">Tinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-shimmer" style={{ height: '24px', width: '35%' }} />
                <div className="skeleton-shimmer" style={{ height: '32px', width: '80%' }} />
                <div className="skeleton-shimmer" style={{ height: '48px', width: '100%' }} />
                <div className="skeleton-shimmer" style={{ height: '36px', width: '100%' }} />
              </div>
            ))}
          </div>
        )}

        {/* Innovation Grid (Point 17 & 55: responsive minmax) */}
        {!isLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem'
          }}>
            {filteredInnovations.map((inv) => {
              const isPending = inv.status === 'pending';
              const isRejected = inv.status === 'rejected';
              const isOwn = inv.authorId === user.id;

              return (
                <div
                  key={inv.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderTop: isPending ? '4px solid #F59E0B' : isRejected ? '4px solid #EF4444' : '4px solid #A5D6A7',
                  }}
                >
                  <div>
                    
                    {/* Header Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="badge-sector">{inv.category}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {isPending && (
                          <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                            Menunggu Verifikasi
                          </span>
                        )}
                        {isRejected && (
                          <span style={{ fontSize: '0.72rem', background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                            Perlu Revisi
                          </span>
                        )}
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          background: inv.difficulty === 'Mudah' ? '#E8F5E9' : inv.difficulty === 'Menengah' ? '#FEF3C7' : '#FEE2E2',
                          color: inv.difficulty === 'Mudah' ? '#1B5E20' : inv.difficulty === 'Menengah' ? '#92400E' : '#991B1B',
                        }}>
                          {inv.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: '1.22rem', color: 'var(--leaf-deep)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                      {inv.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-clamp-2" style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                      {inv.tagline}
                    </p>

                    {/* Rejection Note Warning if rejected */}
                    {isRejected && inv.rejectionReason && (
                      <div style={{
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.78rem',
                        color: '#991B1B',
                        marginBottom: '0.85rem'
                      }}>
                        <strong>Catatan Kurator:</strong> {inv.rejectionReason}
                      </div>
                    )}

                    {/* Waste source badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: '#E8F5E9',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid #A5D6A7',
                      fontSize: '0.78rem',
                      color: '#1B5E20',
                      fontWeight: 600,
                      marginBottom: '0.85rem'
                    }}>
                      <span>♻️ Bahan Limbah:</span>
                      <strong>{inv.wasteSource}</strong>
                    </div>

                    {/* Key metrics row */}
                    <div className="grid-2-col" style={{
                      gap: '0.5rem',
                      background: '#F8FAFC',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '0.85rem',
                      fontSize: '0.76rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                        <Clock size={14} color="#2E7D32" />
                        <span>{inv.estimatedTime}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                        <DollarSign size={14} color="#2E7D32" />
                        <span>{inv.estimatedCost}</span>
                      </div>
                    </div>

                    {/* Rating and success (Points 6, 7, 8: dynamic & null checks) */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#D97706', fontWeight: 700 }}>
                        <Star size={15} fill={inv.reviewCount > 0 ? "#F59E0B" : "none"} color="#F59E0B" />
                        <span>
                          {inv.reviewCount > 0 ? `${inv.rating} (${inv.reviewCount} ulasan)` : 'Belum ada ulasan'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#2E7D32', fontWeight: 700 }}>
                        <TrendingUp size={15} />
                        <span>
                          {inv.successRate !== null && inv.successRate !== undefined ? `${inv.successRate}% Berhasil` : 'Belum ada data uji'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Card Action Footer */}
                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.4rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {/* Only verified innovations can be reviewed (Point 10) */}
                      {inv.status === 'verified' && (
                        <button
                          onClick={() => onOpenReviewModal(inv)}
                          className="btn-outline btn-sm"
                        >
                          <Star size={13} color="#F59E0B" />
                          <span>Ulas</span>
                        </button>
                      )}

                      {/* Re-submit / Revise button for rejected items (Point 21) */}
                      {isRejected && isOwn && onEditRejectedInnovation && (
                        <button
                          onClick={() => onEditRejectedInnovation(inv)}
                          className="btn-outline btn-sm"
                          style={{ color: '#1B5E20', borderColor: '#A5D6A7', background: '#E8F5E9' }}
                        >
                          <span>Revisi & Ajukan</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedInnovation(inv)}
                      className="btn-primary btn-sm"
                    >
                      <span>Buka Panduan</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredInnovations.length === 0 && (
          <div className="empty-state">
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Belum ada inovasi yang sesuai dengan kriteria pencarian Anda.
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="btn-primary"
            >
              <PlusCircle size={18} />
              <span>Ajukan Inovasi Baru untuk Produk Ini</span>
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedInnovation && (
        <InnovationDetailModal
          innovation={selectedInnovation}
          onClose={() => setSelectedInnovation(null)}
          onOpenReviewModal={(inv) => onOpenReviewModal(inv)}
        />
      )}

    </section>
  );
};
