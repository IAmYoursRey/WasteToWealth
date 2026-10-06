import { useState, useCallback, useEffect } from 'react';
import { InnovationItem } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export function useInnovations() {
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const [innovations, setInnovations] = useState<InnovationItem[]>([]);
  const [isLoadingInnovations, setIsLoadingInnovations] = useState(true);

  const loadInnovations = useCallback(async () => {
    setIsLoadingInnovations(true);
    try {
      const data = await api.innovations.getAll();
      setInnovations(data);
    } catch {
      addToast('Gagal memuat katalog inovasi', 'error');
    } finally {
      setIsLoadingInnovations(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadInnovations();
  }, [loadInnovations]);

  const handleInnovationSubmit = async (newInv: InnovationItem) => {
    try {
      const created = await api.innovations.create({
        ...newInv,
        authorId: user.id
      });
      setInnovations((prev) => [created, ...prev]);
      addToast('Inovasi Anda berhasil diajukan! Menunggu tinjauan admin/kurator.', 'success');
    } catch {
      addToast('Gagal mengajukan inovasi', 'error');
    }
  };

  const handleInnovationUpdate = async (updatedItem: InnovationItem) => {
    try {
      const updated = await api.innovations.update(updatedItem.id, {
        ...updatedItem,
        status: 'pending' // Re-submit for review
      });
      setInnovations((prev) => prev.map((item) => (item.id === updatedItem.id ? updated : item)));
      addToast('Perbaikan inovasi berhasil dikirim ulang untuk ditinjau admin/kurator!', 'success');
    } catch {
      addToast('Gagal memperbarui inovasi', 'error');
    }
  };

  const handleAdminApprove = async (id: string) => {
    if (user.role !== 'admin') {
      addToast('Akses ditolak: Hanya admin kurator yang berhak memverifikasi inovasi.', 'error');
      return;
    }
    try {
      const approved = await api.innovations.approve(id, user.role);
      setInnovations((prev) => prev.map((item) => (item.id === id ? approved : item)));
      addToast('Inovasi disetujui & diterbitkan ke marketplace!', 'success');
    } catch {
      addToast('Gagal menyetujui inovasi', 'error');
    }
  };

  const handleAdminReject = async (id: string, reason: string) => {
    if (user.role !== 'admin') {
      addToast('Akses ditolak: Hanya admin kurator yang berhak menolak inovasi.', 'error');
      return;
    }
    try {
      const rejected = await api.innovations.reject(id, reason, user.role);
      setInnovations((prev) => prev.map((item) => (item.id === id ? rejected : item)));
      addToast('Inovasi ditolak/diminta revisi.', 'info');
    } catch {
      addToast('Gagal menolak inovasi', 'error');
    }
  };

  const handleSeedMockPending = async () => {
    if (user.role !== 'admin') {
      addToast('Akses demo hanya untuk mode admin.', 'warning');
      return;
    }
    try {
      const sample = await api.innovations.create({
        title: 'Paving Block Ramah Lingkungan Campuran Serat Karung Goni',
        tagline: 'Inovasi batako ringan dengan perkuatan serat limbah karung goni industri beras',
        wasteSource: 'Serat Karung Goni',
        category: 'Material Bangunan Alternatif',
        difficulty: 'Menengah',
        estimatedTime: '3 Hari',
        estimatedCost: 'Rp 18.000 / buah',
        economicValue: 'Dapat menggantikan batako konvensional dengan bobot lebih ringan 25%',
        materials: [
          { name: 'Serat goni dicacah 2 cm', amount: '500 gram' },
          { name: 'Semen portland komposit', amount: '2 kg' },
          { name: 'Pasir halus terayak', amount: '4 kg' }
        ],
        tools: ['Cetakan batako manual', 'Pengaduk semen', 'Ember takar'],
        steps: [
          { stepNumber: 1, title: 'Pemotongan Serat', description: 'Cacah karung goni menjadi serat 2-3 cm dan rendam air kapur 1 jam.', tip: 'Air kapur meningkatkan daya lekat semen.' },
          { stepNumber: 2, title: 'Pencampuran & Cetak', description: 'Campur semen, pasir, dan serat goni basah lalu cetak padat.', tip: 'Tumbuk hingga rongga udara hilang.' }
        ],
        safetyTips: ['Gunakan sarung tangan tebal dan masker debu.'],
        submittedBy: 'Tim Riset SMKN 2 Pertanian',
        authorId: 'user-pelajar-1'
      });
      setInnovations((prev) => [sample, ...prev]);
      addToast('Contoh pengajuan baru telah ditambahkan ke antrean verifikasi admin!', 'success');
    } catch {
      addToast('Gagal menambahkan data dummy', 'error');
    }
  };

  return {
    innovations,
    isLoadingInnovations,
    loadInnovations,
    handleInnovationSubmit,
    handleInnovationUpdate,
    handleAdminApprove,
    handleAdminReject,
    handleSeedMockPending
  };
}
