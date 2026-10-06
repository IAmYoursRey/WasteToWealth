import React, { useState, useEffect } from 'react';
import { FacilityItem, FacilityBookingRecord } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Factory, 
  Cog, 
  Calendar, 
  MapPin, 
  X, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Users, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExploreFacilitiesView: React.FC = () => {
  const { user, isGuest } = useAuth();
  const { addToast } = useToast();

  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [bookings, setBookings] = useState<FacilityBookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [bookingModalFacility, setBookingModalFacility] = useState<FacilityItem | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Form states
  const [visitorName, setVisitorName] = useState(user?.name || '');
  const [institution, setInstitution] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [participantCount, setParticipantCount] = useState('10');
  const [purpose, setPurpose] = useState('Study Tour SMK / Mahasiswa (Kurikulum Merdeka 5M)');

  const [activeTab, setActiveTab] = useState<'facilities' | 'bookings'>('facilities');

  // Load facilities & bookings via API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [facList, bookList] = await Promise.all([
          api.facilities.getAll(),
          api.facilities.getBookings()
        ]);
        setFacilities(facList);
        setBookings(bookList);
      } catch (err) {
        console.error('Failed loading facility data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenBookingModal = (fac: FacilityItem) => {
    setBookingModalFacility(fac);
    setBookingSuccess(false);
    setVisitorName(isGuest ? '' : user?.name || '');
    setInstitution('');
    setVisitDate('');
    setParticipantCount('10');
    setPurpose('Study Tour SMK / Mahasiswa (Kurikulum Merdeka 5M)');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalFacility) return;

    if (!visitDate) {
      addToast('Harap pilih tanggal rencana kunjungan.', 'warning');
      return;
    }

    try {
      setIsSubmittingBooking(true);
      const newBooking = await api.facilities.createBooking({
        facilityId: bookingModalFacility.id,
        facilityName: bookingModalFacility.name,
        visitorName: visitorName.trim() || (isGuest ? 'Pengguna Tamu' : user.name),
        institution: institution.trim() || 'Umum / Mandiri',
        visitDate,
        participantCount: parseInt(participantCount, 10) || 1,
        purpose,
        requestedBy: user.id
      });

      setBookings((prev) => [newBooking, ...prev]);
      setBookingSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      addToast('Permohonan simulasi kunjungan berhasil disimpan!', 'success');

      setTimeout(() => {
        setBookingSuccess(false);
        setBookingModalFacility(null);
        setVisitorName('');
        setInstitution('');
        setVisitDate('');
        setParticipantCount('10');
        setPurpose('Study Tour SMK / Mahasiswa (Kurikulum Merdeka 5M)');
      }, 2400);
    } catch (err: any) {
      addToast(err?.message || 'Gagal mengirim permohonan kunjungan.', 'error');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const userBookings = bookings.filter((b) => b.requestedBy === user.id);

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge-5m">
              🏭 2M: MENGEKSPLORASI
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Konsep Pusat Pemanfaatan Limbah Industri & Model Demonstrasi Fasilitas Sirkular
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
            Eksplorasi Pusat Pemanfaatan Limbah Industri
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Lihat operasional pemilahan dan teknologi daur ulang di <strong>Pusat Pemanfaatan Limbah Industri</strong>, TPST 3R kawasan industri, dan laboratorium biokonversi. Pelajari mesin-mesin industri dan jadwalkan kunjungan edukatif.
          </p>

          {/* Konsep Pusat Pemanfaatan Limbah Industri Disclaimer Box */}
          <div style={{
            background: '#E8F5E9',
            border: '1px solid #A5D6A7',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginTop: '1rem',
            fontSize: '0.82rem',
            color: '#1B5E20',
            lineHeight: 1.45
          }}>
            <strong>Catatan Konsep:</strong> "Pusat Pemanfaatan Limbah Industri" merupakan model percontohan rintisan WasteToWealth untuk menyimulasikan integrasi sirkular limbah non-B3 tingkat kawasan, bukan nomenklatur atau lembaga resmi pemerintah. Seluruh fasilitas dan data operasional di bawah adalah data demonstrasi pembelajaran.
          </div>

          {/* Sub Navigation Bar */}
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            marginTop: '1.25rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '0.75rem'
          }}>
            <button
              onClick={() => setActiveTab('facilities')}
              className={activeTab === 'facilities' ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}
            >
              <Factory size={15} />
              <span>Daftar Sentra Fasilitas ({facilities.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={activeTab === 'bookings' ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}
            >
              <FileText size={15} />
              <span>Jadwal Kunjungan Saya ({userBookings.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FACILITIES */}
        {activeTab === 'facilities' && (
          <div>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>Memuat sentra fasilitas...</div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {facilities.map((fac) => (
                  <div
                    key={fac.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1.5rem',
                      borderLeft: '5px solid #A5D6A7'
                    }}
                  >
                    <div>
                      {/* Badge Type & City */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            background: '#E8F5E9',
                            color: '#1B5E20',
                            border: '1px solid #A5D6A7'
                          }}>
                            {fac.type}
                          </span>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: '#FEF3C7',
                            color: '#B45309',
                            border: '1px solid #FDE68A'
                          }} title="Data fasilitas ini adalah data simulasi demo prototype">
                            Data Demo
                          </span>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          <MapPin size={14} color="#2E7D32" />
                          <span>{fac.city}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
                        {fac.name}
                      </h3>

                      {/* Description */}
                      <p className="text-clamp-3" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {fac.description}
                      </p>

                      {/* Metrics Mini Box */}
                      <div style={{
                        background: '#F8FAFC',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        marginBottom: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                          <strong>Kapasitas Pengolahan:</strong> {fac.capacity}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#1B5E20' }}>
                          <strong>Output Unggulan:</strong> {fac.featuredOutput}
                        </div>
                        {fac.operator && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                            <strong>Pengelola:</strong> {fac.operator}
                          </div>
                        )}
                        {fac.verificationStatus && (
                          <div style={{ fontSize: '0.72rem', color: '#B45309' }}>
                            <strong>Status:</strong> {fac.verificationStatus} ({fac.lastVerified || 'September 2026'})
                          </div>
                        )}
                      </div>

                      {/* Technology Tags */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.35rem' }}>
                          Teknologi & Fasilitas Utama:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {fac.technologies.slice(0, 3).map((tech, tIdx) => (
                            <span key={tIdx} style={{
                              fontSize: '0.72rem',
                              background: '#FFFFFF',
                              color: '#334155',
                              padding: '0.2rem 0.55rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid #CBD5E1'
                            }}>
                              ⚙️ {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => setSelectedFacility(fac)}
                        className="btn-outline"
                        style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
                      >
                        <Cog size={15} color="#2E7D32" />
                        <span>Bedah Mesin & Alur</span>
                      </button>

                      <button
                        onClick={() => handleOpenBookingModal(fac)}
                        className="btn-primary"
                        style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
                      >
                        <Calendar size={15} />
                        <span>Ajukan Kunjungan</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Industrial Machines Education Section */}
            <div className="glass-card" style={{ padding: '2rem', border: '1.5px solid var(--border-leaf)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Cog size={22} color="#2E7D32" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)' }}>
                  Edukasi Mesin Industri Pengolah Limbah
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '750px' }}>
                Pemahaman mengenai jenis mesin mekanikal yang digunakan dalam sentra pengolahan untuk mengubah limbah mentah menjadi material terstandarisasi industri sirkular.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '1rem'
              }}>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    1. Mesin Dual-Shaft Shredder
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Mencacah limbah keras berukuran besar (palet kayu, drum HDPE, wadah logam non-B3) menjadi serpihan homogen menggunakan dua poros pisau baja torsi tinggi.
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    2. Extrusion Pelletizer
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Melelehkan serpihan plastik termoplastik bersih dengan suhu terkontrol (180-220°C), lalu mencetaknya melalui cetakan bulat menjadi biji pelet plastik daur ulang siap jual.
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    3. Mesin Press Hidrolik Paving
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Memadatkan agregat campuran fly ash batubara dan semen dengan tekanan hingga 150-200 kg/cm2 ditambah vibrasi intensif untuk menghasilkan paving block mutu K-300 SNI.
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    4. Mesin Garnetting Tekstil
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    Membuka kembali jalinan benang pada kain perca garmen melalui silinder bergigi halus, mengembalikannya menjadi serat kapas atau wol sekunder (rag pulling).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              background: '#E8F5E9',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #A5D6A7',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: '#1B5E20'
            }}>
              <strong>Simulasi Pengajuan Kunjungan:</strong> Seluruh permohonan kunjungan tersimpan secara persisten di penyimpanan browser lokal Anda (localStorage) untuk simulasi prototipe.
            </div>

            {userBookings.length === 0 ? (
              <div className="empty-state">
                <Calendar size={36} color="#2E7D32" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                  Belum Ada Jadwal Kunjungan yang Diajukan
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 1rem auto' }}>
                  Pilih salah satu Pusat Pemanfaatan Limbah Industri di atas untuk menjadwalkan kunjungan belajar atau survei bahan baku industri.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('facilities')}
                  className="btn-primary btn-sm"
                >
                  Lihat Daftar Sentra Fasilitas
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userBookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: '#FFFFFF',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid #E2E8F0',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                            {b.status === 'pending' ? 'Menunggu Konfirmasi Sentra' : b.status}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            ID: {b.id}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                          {b.facilityName}
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Diajukan: {b.createdAt}
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.75rem',
                      background: '#F8FAFC',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.82rem'
                    }}>
                      <div>
                        <strong>Pemohon:</strong> {b.visitorName}
                      </div>
                      <div>
                        <strong>Instansi:</strong> {b.institution}
                      </div>
                      <div>
                        <strong>Tanggal Kunjungan:</strong> {b.visitDate}
                      </div>
                      <div>
                        <strong>Jumlah Peserta:</strong> {b.participantCount} Orang
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong>Tujuan:</strong> {b.purpose}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Facility Detail / Machine Explorer Modal */}
      {selectedFacility && (
        <div className="modal-overlay" onClick={() => setSelectedFacility(null)}>
          <div className="modal-content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge-sector">{selectedFacility.type}</span>
                <h2 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)', marginTop: '0.2rem' }}>
                  {selectedFacility.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedFacility(null)}
                aria-label="Tutup detail fasilitas"
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

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  Profil Pusat Pemanfaatan Limbah Industri:
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {selectedFacility.description}
                </p>
              </div>

              {/* Machines installed */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  Mesin & Fasilitas Pengolah Terpasang:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedFacility.machines.map((m, idx) => (
                    <div key={idx} style={{
                      padding: '0.85rem 1rem',
                      background: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-light)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--leaf-deep)' }}>
                          ⚙️ {m.name}
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#E2E8F0', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                          {m.capacity}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {m.function}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visit Guidelines */}
              <div style={{
                background: '#E8F5E9',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #A5D6A7'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1B5E20', marginBottom: '0.25rem' }}>
                  Jadwal Kunjungan Edukasi Langsung:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#1B5E20' }}>
                  {selectedFacility.visitSchedule}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#1B5E20', marginTop: '0.5rem' }}>
                  <strong>Narahubung:</strong> {selectedFacility.contactPerson} ({selectedFacility.phone})
                </div>
              </div>

            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedFacility(null)} className="btn-secondary">
                Tutup
              </button>
              <button 
                onClick={() => {
                  handleOpenBookingModal(selectedFacility);
                  setSelectedFacility(null);
                }} 
                className="btn-primary"
              >
                <Calendar size={16} />
                <span>Jadwalkan Kunjungan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalFacility && (
        <div className="modal-overlay" onClick={() => setBookingModalFacility(null)}>
          <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', marginBottom: '0.2rem' }}>
                  SIMULASI PENGAJUAN KUNJUNGAN EDUKASI (PROTOTYPE)
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)' }}>
                  Jadwalkan Kunjungan ke {bookingModalFacility.name}
                </h3>
              </div>
              <button onClick={() => setBookingModalFacility(null)} aria-label="Tutup formulir kunjungan" style={{ padding: '0.3rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {bookingSuccess ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <CheckCircle2 size={54} color="#2E7D32" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
                  Permohonan Kunjungan Berhasil Disimpan!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Permohonan simulasi telah tersimpan ke dalam riwayat akun Anda. Pihak pengelola Pusat Pemanfaatan Limbah Industri akan mengonfirmasi slot kunjungan dan briefing keselamatan K3.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
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
                    Formulir ini bekerja dalam mode <strong>Simulasi Prototype</strong> dan tersimpan ke penyimpanan browser lokal Anda (localStorage).
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nama Pemohon / Penanggung Jawab *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Raihan / Ibu Siti"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nama Instansi / Sekolah / Komunitas *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: SMKN 1 Cikarang / Komunitas Pengrajin"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Rencana Tanggal Kunjungan *</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Perkiraan Jumlah Peserta</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={participantCount}
                        onChange={(e) => setParticipantCount(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tujuan Kunjungan Edukasi</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="form-select"
                    >
                      <option value="Study Tour SMK / Mahasiswa (Kurikulum Merdeka 5M)">Study Tour SMK / Mahasiswa (Kurikulum Merdeka 5M)</option>
                      <option value="Riset Pengambilan Sampel Limbah">Riset Pengambilan Sampel Limbah</option>
                      <option value="Penjajakan Pasokan Bahan Baku UMKM">Penjajakan Pasokan Bahan Baku UMKM</option>
                      <option value="Pelatihan Daur Ulang Mandiri">Pelatihan Daur Ulang Mandiri</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setBookingModalFacility(null)} className="btn-secondary">
                    Batal
                  </button>
                  <button type="submit" disabled={isSubmittingBooking} className="btn-primary">
                    {isSubmittingBooking ? 'Menyimpan...' : 'Kirim Permohonan Kunjungan'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
