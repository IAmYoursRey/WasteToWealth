import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MatchmakingItem, SupplyRequestRecord } from '../../types';
import { api, resolveCityLocation } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { SupplyRequestModal } from './SupplyRequestModal';
import { 
  MapPin, 
  Building2, 
  Users, 
  Filter, 
  Search, 
  Package, 
  PlusCircle,
  ShieldCheck, 
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Phone,
  Mail
} from 'lucide-react';
import L from 'leaflet';

export const MatchmakingMapView: React.FC = () => {
  const { user, isIndustry, isUMKM, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [partners, setPartners] = useState<MatchmakingItem[]>([]);
  const [supplyRequests, setSupplyRequests] = useState<SupplyRequestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedType, setSelectedType] = useState<'all' | 'industry_supplier' | 'community_buyer'>('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePartner, setActivePartner] = useState<MatchmakingItem | null>(null);
  const [requestModalPartner, setRequestModalPartner] = useState<MatchmakingItem | null>(null);

  // Tab: Direktori & Peta vs Riwayat Kemitraan
  const [viewTab, setViewTab] = useState<'map' | 'requests'>('map');
  const [requestTabFilter, setRequestTabFilter] = useState<'all' | 'incoming' | 'my'>('all');

  // Form New Listing Modal
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);
  const [listingName, setListingName] = useState(user.organization || '');
  const [listingType, setListingType] = useState<'industry_supplier' | 'community_buyer'>(
    isIndustry ? 'industry_supplier' : 'community_buyer'
  );
  const [listingWasteType, setListingWasteType] = useState('');
  const [listingVolume, setListingVolume] = useState('');
  const [listingCity, setListingCity] = useState('Cikarang');
  const [listingAddress, setListingAddress] = useState('');
  const [listingPrice, setListingPrice] = useState('Gratis (Ambil Sendiri)');
  const [listingContact, setListingContact] = useState(user.name);
  const [listingPhone, setListingPhone] = useState(user.phone || '');
  const [listingEmail, setListingEmail] = useState(user.email);
  const [listingDesc, setListingDesc] = useState('');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pData, rData] = await Promise.all([
        api.matchmaking.getPartners(),
        api.matchmaking.getSupplyRequests()
      ]);
      setPartners(pData);
      setSupplyRequests(rData);
    } catch (err) {
      addToast('Gagal memuat data matchmaking', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cleanup Leaflet Map on component unmount (Point 33)
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Unique cities
  const cities = useMemo(() => {
    const set = new Set(partners.map((i) => i.city));
    return Array.from(set);
  }, [partners]);

  // Compute smart matchmaking compatibility percentage (Point 31)
  const computeMatchScore = (partner: MatchmakingItem): number => {
    let score = 75;
    if ((user.role === 'user' || user.role === 'umkm') && partner.type === 'industry_supplier') {
      score += 15;
    } else if (user.role === 'industry' && partner.type === 'community_buyer') {
      score += 15;
    }
    const userOrg = (user.organization || '').toLowerCase();
    if (userOrg.includes(partner.city.toLowerCase()) || partner.city.toLowerCase().includes('cikarang')) {
      score += 8;
    }
    return Math.min(98, score);
  };

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchType = selectedType === 'all' ? true : p.type === selectedType;
      const matchCity = selectedCity === 'all' ? true : p.city === selectedCity;
      
      const searchTerms = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(searchTerms) ||
        p.wasteType.toLowerCase().includes(searchTerms) ||
        p.volumeMonthly.toLowerCase().includes(searchTerms) ||
        p.address.toLowerCase().includes(searchTerms);
        
      return matchType && matchCity && matchSearch;
    });
  }, [partners, selectedType, selectedCity, searchQuery]);

  // Filtered supply requests (all vs incoming vs my)
  const filteredSupplyRequests = useMemo(() => {
    return supplyRequests.filter((req) => {
      if (requestTabFilter === 'my') {
        return req.requesterId === user.id;
      }
      if (requestTabFilter === 'incoming') {
        const isPartnerDirect = req.partnerId === user.id;
        const isCreatedByMe = partners.some((p) => p.id === req.partnerId && p.authorId === user.id);
        const matchesOrg = Boolean(user.organization && user.organization !== '-' && req.partnerName.toLowerCase().includes(user.organization.toLowerCase()));
        return isPartnerDirect || isCreatedByMe || matchesOrg || isAdmin;
      }
      return true;
    });
  }, [supplyRequests, requestTabFilter, user, isAdmin, partners]);

  // Focus map bounds on filtered markers (Point 32)
  const handleFitBounds = () => {
    if (!mapInstanceRef.current || filteredPartners.length === 0) return;
    const bounds = L.latLngBounds(filteredPartners.map((p) => p.coordinates));
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  };

  // Initialize & update Leaflet Map
  useEffect(() => {
    if (viewTab !== 'map') return;
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-7.0, 110.5],
        zoom: 7,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredPartners.forEach((partner) => {
      const isSupplier = partner.type === 'industry_supplier';
      
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            width: 34px; 
            height: 34px; 
            border-radius: 50%; 
            background: ${isSupplier ? '#2E7D32' : '#0284C7'}; 
            color: #FFFFFF; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 16px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #FFFFFF;
            cursor: pointer;
          ">
            ${isSupplier ? '🏭' : '👥'}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      const marker = L.marker(partner.coordinates, { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
          <div style="font-size: 11px; font-weight: 700; color: ${isSupplier ? '#2E7D32' : '#0284C7'}; text-transform: uppercase;">
            ${isSupplier ? 'Pabrik Industri (Penyedia)' : 'UMKM (Pencari Bahan)'}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin: 3px 0;">
            ${partner.name}
          </div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
            ${partner.wasteType}
          </div>
          <div style="font-size: 11px; font-weight: 600; color: #2E7D32;">
            Volume: ${partner.volumeMonthly}
          </div>
        </div>
      `);

      marker.on('click', () => {
        setActivePartner(partner);
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [filteredPartners, viewTab]);

  // Handle create new listing (Points 9, 10, 27)
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const location = resolveCityLocation(listingCity);
      await api.matchmaking.createListing({
        name: listingName,
        type: listingType,
        entityType: listingType === 'industry_supplier' ? 'Pabrik Industri' : 'UMKM Daur Ulang',
        wasteType: listingWasteType,
        volumeMonthly: listingVolume,
        city: listingCity,
        province: location.province,
        address: listingAddress,
        coordinates: location.coords,
        isCertifiedNonB3: false, // Default unverified for safety
        priceExpectation: listingPrice,
        contactName: listingContact,
        phone: listingPhone,
        email: listingEmail,
        description: listingDesc,
        authorId: user.id
      });
      addToast('Listing kemitraan bahan baku berhasil diterbitkan ke peta!', 'success');
      setIsNewListingModalOpen(false);
      // Reset form states
      setListingWasteType('');
      setListingVolume('');
      setListingAddress('');
      setListingDesc('');
      loadData();
    } catch (err) {
      addToast('Gagal menambahkan listing', 'error');
    }
  };

  // Handle updating supply request status with permission verification (Points 11, 28)
  const handleUpdateStatus = async (id: string, newStatus: SupplyRequestRecord['status']) => {
    try {
      await api.matchmaking.updateRequestStatus(id, newStatus, undefined, user.id, user.role);
      addToast(`Status permohonan berhasil diperbarui menjadi: ${newStatus.toUpperCase()}`, 'success');
      loadData();
    } catch (err: any) {
      addToast(err.message || 'Gagal memperbarui status', 'error');
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
                🗺️ 4M: MENGOMUNIKASIKAN & MATCHMAKING
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sirkulasi Limbah Non-B3 Terpilah Industri-UMKM
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
              Peta Penghubung Pasokan Limbah Industri & UMKM
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
              Jembatan kemitraan langsung antara pabrik industri pemilik limbah non-B3 terpilah dengan pelaku UMKM daur ulang. Pantau status pasokan dan ajukan kerja sama transparan.
            </p>
          </div>

          <button
            onClick={() => setIsNewListingModalOpen(true)}
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
          >
            <PlusCircle size={16} />
            <span>{isIndustry ? 'Daftarkan Pasokan Limbah Pabrik' : 'Daftarkan Kebutuhan Bahan UMKM'}</span>
          </button>
        </div>

        {/* Top View Toggle: Peta vs Riwayat Permintaan */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setViewTab('map')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              fontWeight: viewTab === 'map' ? 700 : 500,
              background: viewTab === 'map' ? '#E8F5E9' : '#FFFFFF',
              color: viewTab === 'map' ? '#1B5E20' : 'var(--text-main)',
              border: viewTab === 'map' ? '1.5px solid #A5D6A7' : '1.5px solid var(--border-light)'
            }}
          >
            Peta & Direktori Mitra ({partners.length})
          </button>

          <button
            onClick={() => setViewTab('requests')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              fontWeight: viewTab === 'requests' ? 700 : 500,
              background: viewTab === 'requests' ? '#0284C7' : '#FFFFFF',
              color: viewTab === 'requests' ? '#FFFFFF' : 'var(--text-main)',
              border: viewTab === 'requests' ? '1px solid transparent' : '1.5px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Riwayat Pengajuan Kemitraan</span>
            <span style={{
              background: viewTab === 'requests' ? 'rgba(255,255,255,0.25)' : '#E0F2FE',
              color: viewTab === 'requests' ? '#FFFFFF' : '#0369A1',
              padding: '1px 7px',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {supplyRequests.length}
            </span>
          </button>
        </div>

        {/* TAB 1: PETA & DIREKTORI */}
        {viewTab === 'map' && (
          <div>
            {/* Filter Bar */}
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.75rem', height: 'auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ position: 'relative' }}>
                  <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Cari Material, Volume, atau Nama Pihak..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} color="#2E7D32" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">Semua Wilayah Kota</option>
                    {cities.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedType('all')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: selectedType === 'all' ? 700 : 500,
                      background: selectedType === 'all' ? '#E8F5E9' : '#FFFFFF',
                      color: selectedType === 'all' ? '#1B5E20' : 'var(--text-muted)',
                      border: selectedType === 'all' ? '1.5px solid #A5D6A7' : '1px solid var(--border-light)',
                    }}
                  >
                    Semua ({partners.length})
                  </button>

                  <button
                    onClick={() => setSelectedType('industry_supplier')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: selectedType === 'industry_supplier' ? 700 : 500,
                      background: selectedType === 'industry_supplier' ? '#E8F5E9' : '#FFFFFF',
                      color: '#1B5E20',
                      border: selectedType === 'industry_supplier' ? '1.5px solid #A5D6A7' : '1px solid #CBD5E1',
                    }}
                  >
                    🏭 Pabrik (Penyedia)
                  </button>

                  <button
                    onClick={() => setSelectedType('community_buyer')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: selectedType === 'community_buyer' ? 700 : 500,
                      background: selectedType === 'community_buyer' ? '#F0F9FF' : '#FFFFFF',
                      color: '#0369A1',
                      border: selectedType === 'community_buyer' ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                    }}
                  >
                    👥 UMKM (Pencari)
                  </button>
                </div>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="matchmaking-layout">
              
              {/* Directory List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '540px', overflowY: 'auto', paddingRight: '4px' }}>
                {filteredPartners.map((partner) => {
                  const isSupplier = partner.type === 'industry_supplier';
                  const isSelected = activePartner?.id === partner.id;

                  return (
                    <div
                      key={partner.id}
                      onClick={() => {
                        setActivePartner(partner);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo(partner.coordinates, 10, { duration: 1 });
                        }
                      }}
                      className="glass-card"
                      style={{
                        padding: '1.2rem',
                        cursor: 'pointer',
                        borderLeft: isSupplier ? '5px solid #A5D6A7' : '5px solid #0284C7',
                        background: isSelected ? '#E8F5E9' : '#FFFFFF',
                        borderColor: isSelected ? '#2E7D32' : 'var(--border-leaf)',
                        height: 'auto'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            background: isSupplier ? '#E8F5E9' : '#E0F2FE',
                            color: isSupplier ? '#1B5E20' : '#0369A1',
                          }}>
                            {partner.entityType}
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            background: '#E8F5E9',
                            color: '#1B5E20',
                            border: '1px solid #A5D6A7'
                          }} title="Kecocokan algoritma matchmaking berbasis material dan lokasi">
                            ⚡ Cocok {computeMatchScore(partner)}%
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            background: partner.isCertifiedNonB3 ? '#E8F5E9' : '#FEF3C7',
                            color: partner.isCertifiedNonB3 ? '#1B5E20' : '#92400E',
                            border: partner.isCertifiedNonB3 ? '1px solid #A5D6A7' : '1px solid #FDE68A'
                          }}>
                            {partner.isCertifiedNonB3 ? '✓ Terverifikasi Non-B3' : '⏳ Belum Diverifikasi'}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
                          📍 {partner.city}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.08rem', color: 'var(--leaf-deep)', marginBottom: '0.35rem' }}>
                        {partner.name}
                      </h3>

                      <div style={{
                        fontSize: '0.82rem',
                        color: isSupplier ? '#1B5E20' : '#0369A1',
                        fontWeight: 600,
                        marginBottom: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Package size={14} />
                        <span>{partner.wasteType}</span>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                        <strong>Volume:</strong> {partner.volumeMonthly} • <strong>Skema:</strong> {partner.priceExpectation}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.65rem',
                        borderTop: '1px dashed #E2E8F0',
                        fontSize: '0.76rem'
                      }}>
                        <span style={{ color: 'var(--text-light)' }}>Narahubung: {partner.contactName}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRequestModalPartner(partner);
                          }}
                          className="btn-primary btn-sm"
                        >
                          <span>Ajukan Pasokan</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="glass-card" style={{ padding: '0.75rem', overflow: 'hidden', height: 'auto' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.75rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  background: '#F8FAFC',
                  borderRadius: 'var(--radius-sm)',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2E7D32', display: 'inline-block' }} />
                      <span>Pabrik Industri (Penyedia)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284C7', display: 'inline-block' }} />
                      <span>UMKM / Komunitas (Pencari)</span>
                    </div>
                  </div>

                  {filteredPartners.length > 0 && (
                    <button
                      type="button"
                      onClick={handleFitBounds}
                      className="btn-secondary btn-sm"
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}
                    >
                      🎯 Fokus ke Marker Hasil
                    </button>
                  )}
                </div>

                <div ref={mapContainerRef} style={{ height: '480px', width: '100%', borderRadius: 'var(--radius-md)' }} />
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: RIWAYAT PENGAJUAN KEMITRAAN (Points 1, 11, 28, 29, 30) */}
        {viewTab === 'requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: '#F0F9FF',
              border: '1.5px solid #BAE6FD',
              padding: '0.85rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: '#0369A1'
            }}>
              Berikut adalah daftar pengajuan pasokan bahan baku daur ulang. Pihak penerima (Pabrik atau UMKM) dapat menyetujui atau menolak permohonan untuk membuka akses kontak logistik.
            </div>

            {/* Sub-filter tabs for requests */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setRequestTabFilter('all')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: requestTabFilter === 'all' ? 700 : 500,
                  background: requestTabFilter === 'all' ? '#0284C7' : '#FFFFFF',
                  color: requestTabFilter === 'all' ? '#FFFFFF' : 'var(--text-muted)',
                  border: '1px solid var(--border-light)'
                }}
              >
                Semua Pengajuan ({supplyRequests.length})
              </button>
              <button
                type="button"
                onClick={() => setRequestTabFilter('incoming')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: requestTabFilter === 'incoming' ? 700 : 500,
                  background: requestTabFilter === 'incoming' ? '#0284C7' : '#FFFFFF',
                  color: requestTabFilter === 'incoming' ? '#FFFFFF' : 'var(--text-muted)',
                  border: '1px solid var(--border-light)'
                }}
              >
                Permintaan Masuk ke Mitra
              </button>
              <button
                type="button"
                onClick={() => setRequestTabFilter('my')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: requestTabFilter === 'my' ? 700 : 500,
                  background: requestTabFilter === 'my' ? '#0284C7' : '#FFFFFF',
                  color: requestTabFilter === 'my' ? '#FFFFFF' : 'var(--text-muted)',
                  border: '1px solid var(--border-light)'
                }}
              >
                Permintaan Saya ({supplyRequests.filter((r) => r.requesterId === user.id).length})
              </button>
            </div>

            {filteredSupplyRequests.length === 0 ? (
              <div className="empty-state">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Belum ada pengajuan kemitraan pada kategori ini.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>
                {filteredSupplyRequests.map((req) => {
                  const isPending = req.status === 'pending';
                  const isAccepted = req.status === 'accepted';
                  const isRejected = req.status === 'rejected';

                  // Privacy check: only involved parties or admin see full contacts
                  const isRequester = req.requesterId === user.id;
                  const isPartner = req.partnerId === user.id ||
                    partners.some((p) => p.id === req.partnerId && p.authorId === user.id) ||
                    Boolean(user.organization && user.organization !== '-' && req.partnerName.toLowerCase().includes(user.organization.toLowerCase()));
                  const canViewContacts = isAccepted && (isRequester || isPartner || isAdmin);
                  
                  // Authority check: requester cannot accept their own request, only the target partner or admin can manage
                  const canManage = isAdmin || (!isRequester && isPartner);

                  return (
                    <div
                      key={req.id}
                      className="glass-card"
                      style={{
                        padding: '1.25rem',
                        borderLeft: isAccepted ? '5px solid #A5D6A7' : isRejected ? '5px solid #EF4444' : '5px solid #F59E0B',
                        height: 'auto'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: isAccepted ? '#E8F5E9' : isRejected ? '#FEE2E2' : '#FEF3C7',
                          color: isAccepted ? '#1B5E20' : isRejected ? '#991B1B' : '#92400E',
                        }}>
                          {isAccepted ? '✓ Disetujui' : isRejected ? '✕ Ditolak' : '⏳ Menunggu Konfirmasi'}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                          {req.createdAt}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', color: 'var(--leaf-deep)', marginBottom: '0.25rem' }}>
                        {req.partnerName}
                      </h4>

                      <div style={{ fontSize: '0.82rem', color: '#1B5E20', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Bahan: {req.wasteType} ({req.requestedVolume})
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <strong>Pemohon:</strong> {req.requesterName} ({req.organizationName})
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        <strong>Rencana Produk:</strong> {req.intendedProduct}
                      </div>

                      {/* Unlocked Contact Details if accepted and party authorized */}
                      {canViewContacts ? (
                        <div style={{
                          background: '#E8F5E9',
                          border: '1px solid #A5D6A7',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          color: '#1B5E20',
                          marginBottom: '0.75rem'
                        }}>
                          <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Kontak Resmi Terhubung:</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Phone size={13} />
                            <span>{req.phone}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                            <Mail size={13} />
                            <span>{req.email}</span>
                          </div>
                        </div>
                      ) : isAccepted ? (
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                          Kontak langsung hanya dapat diakses oleh pihak pemohon dan mitra resmi.
                        </div>
                      ) : null}

                      {/* Interactive Accept / Reject buttons */}
                      <div style={{
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.4rem'
                      }}>
                        {isPending && canManage && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'rejected')}
                              className="btn-outline btn-sm"
                              style={{ color: '#EF4444', borderColor: '#FECACA' }}
                            >
                              Tolak
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(req.id, 'accepted')}
                              className="btn-primary btn-sm"
                            >
                              Setujui Kemitraan
                            </button>
                          </>
                        )}

                        {isPending && !canManage && (
                          <span style={{ fontSize: '0.75rem', color: '#B45309', background: '#FEF3C7', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                            {isRequester ? 'Menunggu Konfirmasi Mitra' : 'Akses Khusus Pihak Mitra'}
                          </span>
                        )}

                        {!isPending && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                            Status: {req.status === 'accepted' ? 'Telah Disetujui' : 'Ditolak'}
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Supply Request Modal */}
      {requestModalPartner && (
        <SupplyRequestModal
          partner={requestModalPartner}
          onRequestSuccess={loadData}
          onClose={() => {
            setRequestModalPartner(null);
            loadData();
          }}
        />
      )}

      {/* New Listing Modal (Items #68, #69) */}
      {isNewListingModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewListingModalOpen(false)}>
          <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)' }}>
                {listingType === 'industry_supplier' ? 'Daftarkan Pasokan Limbah Pabrik' : 'Daftarkan Kebutuhan Material UMKM'}
              </h3>
              <button 
                onClick={() => setIsNewListingModalOpen(false)} 
                aria-label="Tutup formulir pendaftaran listing"
                style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateListing}>
              <div className="modal-body">
                
                <div className="form-group">
                  <label className="form-label">Tipe Listing Kemitraan *</label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="industry_supplier">Pabrik Industri (Memiliki Pasokan Limbah Non-B3)</option>
                    <option value="community_buyer">UMKM / Pengrajin (Mencari Bahan Baku Daur Ulang)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Perusahaan / Pabrik / UMKM *</label>
                  <input
                    type="text"
                    required
                    value={listingName}
                    onChange={(e) => setListingName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Jenis Limbah / Bahan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Serbuk Gergaji Sengon Kering"
                      value={listingWasteType}
                      onChange={(e) => setListingWasteType(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Volume per Bulan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 2.000 kg / Bulan"
                      value={listingVolume}
                      onChange={(e) => setListingVolume(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-group">
                    <label className="form-label">Kota Lokasi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Cikarang / Surabaya"
                      value={listingCity}
                      onChange={(e) => setListingCity(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Skema Harga / Biaya</label>
                    <input
                      type="text"
                      placeholder="Gratis / Rp 300 per kg"
                      value={listingPrice}
                      onChange={(e) => setListingPrice(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Lengkap Gudang / Workshop *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama jalan, kawasan industri, nomor..."
                    value={listingAddress}
                    onChange={(e) => setListingAddress(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Uraian Kualitas / Persyaratan Pengambilan</label>
                  <textarea
                    placeholder="Jelaskan kondisi bahan (apakah sudah terayak, kadar air, kemasan karung)..."
                    value={listingDesc}
                    onChange={(e) => setListingDesc(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '60px' }}
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsNewListingModalOpen(false)} className="btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Terbitkan Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
