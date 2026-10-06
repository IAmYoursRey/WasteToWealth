import React, { useState, useEffect, useMemo } from 'react';
import { WasteItem } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { WasteDetailModal } from './WasteDetailModal';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertOctagon, 
  ChevronRight, 
  HardHat, 
  Sparkles, 
  PlusCircle, 
  BookOpen, 
  ArrowRight,
  X
} from 'lucide-react';

interface WasteDictionaryViewProps {
  onSelectWasteForInnovation: (wasteId: string, wasteName: string) => void;
  onSelectSpecificInnovation?: (innovationId: string, innovationTitle: string) => void;
}

export const WasteDictionaryView: React.FC<WasteDictionaryViewProps> = ({ 
  onSelectWasteForInnovation,
  onSelectSpecificInnovation
}) => {
  const { isAdmin } = useAuth();
  const { addToast } = useToast();

  const [wasteList, setWasteList] = useState<WasteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'non-b3' | 'b3'>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedWaste, setSelectedWaste] = useState<WasteItem | null>(null);

  // Admin add waste modal state
  const [isAddWasteModalOpen, setIsAddWasteModalOpen] = useState(false);
  const [newWasteName, setNewWasteName] = useState('');
  const [newCategory, setNewCategory] = useState<'non-b3' | 'b3'>('non-b3');
  const [newSector, setNewSector] = useState('Industri Tekstil');
  const [newSource, setNewSource] = useState('');
  const [newPhysicalForm, setNewPhysicalForm] = useState('');
  const [newSafetyDesc, setNewSafetyDesc] = useState('');
  const [newLegalCode, setNewLegalCode] = useState('PP No. 22/2021');
  const [newPotential, setNewPotential] = useState('');

  // Fetch data through API layer
  const loadWasteData = async () => {
    setIsLoading(true);
    try {
      const data = await api.waste.getAll();
      setWasteList(data);
    } catch (err) {
      addToast('Gagal memuat data kamus limbah', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWasteData();
  }, []);

  // Unique industrial sectors
  const sectors = useMemo(() => {
    const s = new Set(wasteList.map((item) => item.industrialSector));
    return Array.from(s);
  }, [wasteList]);

  // Filtered waste list
  const filteredWaste = useMemo(() => {
    return wasteList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.economicPotential.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const matchSector =
        selectedSector === 'all' ? true : item.industrialSector === selectedSector;

      return matchSearch && matchCategory && matchSector;
    });
  }, [wasteList, searchQuery, selectedCategory, selectedSector]);

  const countNonB3 = wasteList.filter((i) => i.category === 'non-b3').length;
  const countB3 = wasteList.filter((i) => i.category === 'b3').length;

  const resetAddWasteForm = () => {
    setNewWasteName('');
    setNewCategory('non-b3');
    setNewSector('Industri Tekstil');
    setNewSource('');
    setNewPhysicalForm('');
    setNewSafetyDesc('');
    setNewLegalCode('PP No. 22/2021');
    setNewPotential('');
  };

  const handleCreateWaste = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.waste.create({
        name: newWasteName,
        category: newCategory,
        categoryLabel: newCategory === 'b3' ? 'Wajib Penanganan Khusus (Limbah B3)' : 'Non-B3 — dapat dimanfaatkan sesuai kondisi dan SOP',
        industrialSector: newSector,
        source: newSource || 'Sisa aliran proses industri manufaktur lokal',
        physicalForm: newPhysicalForm || 'Padatan terpilah',
        safetyRating: newCategory === 'b3' ? 'danger' : 'safe',
        safetyDescription: newSafetyDesc || (newCategory === 'b3' ? 'Wajib penanganan khusus berizin resmi.' : 'Dapat dimanfaatkan sesuai kondisi dan SOP keselamatan.'),
        requiredPPE: newCategory === 'b3' ? ['Masker Respirator', 'Sarung Tangan Kimia', 'Kacamata Pelindung'] : ['Masker Debu', 'Sarung Tangan Kerja'],
        legalCode: newLegalCode,
        economicPotential: newPotential || 'Potensi bahan baku alternatif industri sirkular',
        handlingGuidelines: ['Simpan di tempat kering berventilasi baik (Data contoh — perlu verifikasi SOP lanjutan)'],
        prohibitedActions: ['Dilarang dibakar sembarangan di ruang terbuka'],
        recommendedInnovations: ['Produk Daur Ulang Ramah Lingkungan'],
        characteristics: ['Data contoh prototype — perlu verifikasi laboratorium']
      });
      addToast('Data limbah baru berhasil ditambahkan ke kamus!', 'success');
      resetAddWasteForm();
      setIsAddWasteModalOpen(false);
      loadWasteData();
    } catch (err) {
      addToast('Gagal menambahkan limbah', 'error');
    }
  };

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge-5m">
                🌿 1M: MENGENALI & MEMAHAMI
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Regulasi PP No. 22/2021 & Permen LHK No. 19/2021
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
              Kamus & Literasi Limbah Industri Lokal
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
              Kenali karakteristik limbah dari industri manufaktur sekitar. Pahami batas antara limbah <strong>Non-B3 yang aman diolah mandiri</strong> oleh perajin/UMKM vs <strong>Limbah B3 yang berbahaya</strong> dan wajib penanganan khusus berizin resmi.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddWasteModalOpen(true)}
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
            >
              <PlusCircle size={16} />
              <span>Tambah Data Limbah (Admin)</span>
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', height: 'auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Box */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari limbah (contoh: tebu, kain perca, oli, serbuk kayu)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Sector Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#2E7D32" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Sektor Industri</option>
                {sectors.map((sec, idx) => (
                  <option key={idx} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs (Pills) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginTop: '1rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'all' ? 700 : 500,
                background: selectedCategory === 'all' ? '#E8F5E9' : '#FFFFFF',
                color: selectedCategory === 'all' ? '#1B5E20' : 'var(--text-muted)',
                border: selectedCategory === 'all' ? '1.5px solid #A5D6A7' : '1px solid var(--border-light)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>Semua Kategori</span>
              <span style={{
                background: selectedCategory === 'all' ? '#A5D6A7' : '#E2E8F0',
                color: selectedCategory === 'all' ? '#1B5E20' : 'var(--text-muted)',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {wasteList.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('non-b3')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'non-b3' ? 700 : 500,
                background: selectedCategory === 'non-b3' ? '#E8F5E9' : '#FFFFFF',
                color: '#1B5E20',
                border: selectedCategory === 'non-b3' ? '1.5px solid #A5D6A7' : '1px solid #E1EBE2',
                transition: 'all var(--transition-fast)'
              }}
            >
              <CheckCircle2 size={15} color="#2E7D32" />
              <span>Non-B3 — Dapat Dimanfaatkan (SOP)</span>
              <span style={{
                background: '#A5D6A7',
                color: '#1B5E20',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {countNonB3}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('b3')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'b3' ? 700 : 500,
                background: selectedCategory === 'b3' ? '#FEF2F2' : '#FFFFFF',
                color: '#991B1B',
                border: selectedCategory === 'b3' ? '1.5px solid #EF4444' : '1px solid #FECACA',
                transition: 'all var(--transition-fast)'
              }}
            >
              <AlertOctagon size={15} color="#EF4444" />
              <span>Khusus / Berbahaya (Limbah B3)</span>
              <span style={{
                background: '#FECACA',
                color: '#991B1B',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {countB3}
              </span>
            </button>
          </div>

        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="skeleton-card">
                <div className="skeleton-shimmer" style={{ height: '24px', width: '40%' }} />
                <div className="skeleton-shimmer" style={{ height: '28px', width: '75%' }} />
                <div className="skeleton-shimmer" style={{ height: '50px', width: '100%' }} />
                <div className="skeleton-shimmer" style={{ height: '36px', width: '100%' }} />
              </div>
            ))}
          </div>
        )}

        {/* Waste Cards Grid */}
        {!isLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem'
          }}>
            {filteredWaste.map((waste) => {
              const isB3 = waste.category === 'b3';
              return (
                <div
                  key={waste.id}
                  className="glass-card"
                  style={{
                    padding: '1.4rem',
                    borderTop: isB3 ? '4px solid #EF4444' : '4px solid #A5D6A7',
                  }}
                >
                  <div>
                    
                    {/* Card Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span className={`badge-national ${isB3 ? 'badge-danger' : 'badge-safe'}`}>
                        {isB3 ? '⚠️ B3 BERBAHAYA' : '✅ NON-B3 (SESUAI SOP)'}
                      </span>
                      <span className="badge-sector" style={{ fontSize: '0.7rem' }}>
                        {waste.industrialSector.split('&')[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: isB3 ? '#991B1B' : 'var(--leaf-deep)' }}>
                      {waste.name}
                    </h3>

                    {/* Physical description */}
                    <p className="text-clamp-2" style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                      {waste.physicalForm}
                    </p>

                    {/* Safety Snippet */}
                    <div style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isB3 ? '#FFF1F2' : '#E8F5E9',
                      border: isB3 ? '1px solid #FDA4AF' : '1px solid #A5D6A7',
                      fontSize: '0.8rem',
                      color: isB3 ? '#881337' : '#1B5E20',
                      marginBottom: '0.85rem'
                    }}>
                      <strong>{isB3 ? 'Aturan Keselamatan:' : 'Status Daur Ulang:'}</strong> {waste.safetyDescription.slice(0, 110)}...
                    </div>

                    {/* PPE Preview Badges */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.35rem' }}>
                        <HardHat size={14} color="#2E7D32" />
                        <span>Standar APD Wajib:</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {waste.requiredPPE.slice(0, 2).map((ppe, pIdx) => (
                          <span key={pIdx} style={{
                            fontSize: '0.72rem',
                            background: '#F1F5F9',
                            color: '#475569',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid #E2E8F0'
                          }}>
                            {ppe}
                          </span>
                        ))}
                        {waste.requiredPPE.length > 2 && (
                          <span style={{ fontSize: '0.72rem', color: '#64748B', alignSelf: 'center' }}>
                            +{waste.requiredPPE.length - 2} lagi
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Card Action Footer */}
                  <div style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    
                    {/* Deep Link to Marketplace (Item #30) */}
                    {!isB3 && (
                      <button
                        onClick={() => onSelectWasteForInnovation(waste.id, waste.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#1B5E20',
                          background: '#E8F5E9',
                          padding: '0.45rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px dashed #A5D6A7',
                          transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2E7D32'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#A5D6A7'}
                      >
                        <Sparkles size={14} color="#2E7D32" />
                        <span>Cari Tutorial Inovasi dari Bahan Ini</span>
                        <ArrowRight size={13} />
                      </button>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>
                        {waste.legalCode.split('(')[0]}
                      </span>

                      <button
                        onClick={() => setSelectedWaste(waste)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: isB3 ? '#DC2626' : '#1B5E20',
                          background: isB3 ? '#FEF2F2' : '#E8F5E9',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          border: isB3 ? '1px solid #FECACA' : '1px solid #A5D6A7',
                        }}
                      >
                        <span>Panduan Lengkap</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredWaste.length === 0 && (
          <div className="empty-state">
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Tidak ditemukan data limbah dengan kata kunci "<strong>{searchQuery}</strong>".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSector('all'); }}
              className="btn-secondary btn-sm"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}

      </div>

      {/* Waste Detail Modal */}
      {selectedWaste && (
        <WasteDetailModal
          waste={selectedWaste}
          onClose={() => setSelectedWaste(null)}
          onSelectInnovation={() => {
            onSelectWasteForInnovation(selectedWaste.id, selectedWaste.name);
          }}
          onSelectSpecificInnovation={(invId, invTitle) => {
            if (onSelectSpecificInnovation) {
              onSelectSpecificInnovation(invId, invTitle);
            } else {
              onSelectWasteForInnovation(selectedWaste.id, selectedWaste.name);
            }
          }}
        />
      )}

      {/* Admin Add Waste Modal */}
      {isAddWasteModalOpen && (
        <div className="modal-overlay" onClick={() => { resetAddWasteForm(); setIsAddWasteModalOpen(false); }}>
          <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)' }}>
                  Tambah Data Limbah Baru (Kamus Nasional)
                </h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  Pencatatan rujukan limbah industri untuk inventarisasi 5M
                </div>
              </div>
              <button 
                onClick={() => { resetAddWasteForm(); setIsAddWasteModalOpen(false); }} 
                aria-label="Tutup formulir tambah limbah" 
                style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateWaste}>
              <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
                
                <div style={{
                  background: '#FEF3C7',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #FDE68A',
                  fontSize: '0.8rem',
                  color: '#92400E',
                  marginBottom: '1rem'
                }}>
                  <strong>Catatan Prototype:</strong> Karakteristik APD & penanganan awal akan diisi secara otomatis sebagai <em>data contoh percontohan</em> yang perlu diverifikasi lebih lanjut.
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Jenis Limbah *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Slag Baja Tanpa Bahan Berbahaya"
                    value={newWasteName}
                    onChange={(e) => setNewWasteName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Klasifikasi Regulasi *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="form-select"
                    >
                      <option value="non-b3">Non-B3 — dapat dimanfaatkan sesuai kondisi dan SOP</option>
                      <option value="b3">Wajib Penanganan Khusus (Limbah B3)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sektor Industri *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Industri Pengecoran Logam"
                      value={newSector}
                      onChange={(e) => setNewSector(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Sumber Proses Pabrik</label>
                  <input
                    type="text"
                    placeholder="Sisa proses peleburan tungku busur listrik"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Wujud Fisik</label>
                  <input
                    type="text"
                    placeholder="Bongkahan batu agregat kasar hitam abu-abu"
                    value={newPhysicalForm}
                    onChange={(e) => setNewPhysicalForm(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Keselamatan & Toksisitas</label>
                  <textarea
                    placeholder="Aman untuk bahan perkerasan jalan setelah melewati uji TCLP..."
                    value={newSafetyDesc}
                    onChange={(e) => setNewSafetyDesc(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '60px' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Potensi Ekonomi / Daur Ulang</label>
                  <input
                    type="text"
                    placeholder="Agregat pengganti batu split aspal jalan tol dan batako"
                    value={newPotential}
                    onChange={(e) => setNewPotential(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsAddWasteModalOpen(false)} className="btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan ke Kamus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
