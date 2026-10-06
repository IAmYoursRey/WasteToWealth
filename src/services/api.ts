import { 
  UserProfile, 
  UserRole, 
  WasteItem, 
  InnovationItem, 
  MatchmakingItem, 
  SupplyRequestRecord, 
  ReviewItem, 
  TutorialProgress,
  FacilityItem,
  FacilityBookingRecord
} from '../types';
import { initialWasteData } from '../data/wasteDictionary';
import { initialInnovationData } from '../data/innovationCatalog';
import { initialMatchmakingData } from '../data/matchmakingData';
import { initialReviewsData } from '../data/reviewsData';
import { initialFacilitiesData } from '../data/facilitiesData';

// Storage Keys
const KEYS = {
  USERS: 'w2w_users_v2',
  CURRENT_USER: 'w2w_current_user_v2',
  WASTE: 'w2w_waste_v2',
  INNOVATIONS: 'w2w_innovations_v2',
  MATCHMAKING: 'w2w_matchmaking_v2',
  SUPPLY_REQUESTS: 'w2w_supply_requests_v2',
  REVIEWS: 'w2w_reviews_v2',
  TUTORIAL_PROGRESS: 'w2w_tutorial_progress_v2',
  FACILITIES: 'w2w_facilities_v3',
  FACILITY_BOOKINGS: 'w2w_facility_bookings_v2',
};

export const guestUser: UserProfile = {
  id: 'guest',
  name: 'Pengunjung (Tamu)',
  email: '',
  role: 'user',
  roleLabel: 'Guest / Belum Login',
  organization: 'Pengunjung Umum',
  phone: ''
};

// Initial default user profiles for demo testing
const defaultUsers: UserProfile[] = [
  {
    id: 'user-pelajar-1',
    name: 'Muhammad Raihan',
    email: 'raihan@pelajar.id',
    role: 'user',
    roleLabel: 'Siswa / Mahasiswa',
    organization: 'SMKN 1 Cikarang - Jurusan Kimia Industri',
    phone: '0812-3456-7890',
  },
  {
    id: 'user-industry-1',
    name: 'Dian Prasetyo, S.T.',
    email: 'csr@sinarnusantara-apparel.co.id',
    role: 'industry',
    roleLabel: 'Pabrik Industri (Penyedia)',
    organization: 'PT Sinar Nusantara Garmen Ltd.',
    phone: '0811-2345-6789',
  },
  {
    id: 'user-umkm-1',
    name: 'Ibu Ratna Dewi',
    email: 'koperasi.perca.kartini@gmail.com',
    role: 'umkm',
    roleLabel: 'Pengrajin UMKM',
    organization: 'Koperasi Pengrajin Perca Mandiri Kartini Solo',
    phone: '0822-1122-3344',
  },
  {
    id: 'user-admin-1',
    name: 'Admin Kurator Nasional',
    email: 'admin@wastetowealth.id',
    role: 'admin',
    roleLabel: 'Admin / Kurator Nasional',
    organization: 'Kementerian Lingkungan Hidup / Badan Pengendalian Lingkungan Hidup (KLH/BPLH) - Tim Kurator WasteToWealth',
    phone: '0812-0000-9999',
  }
];

// Indonesian City Coordinates Dictionary for reliable geocoding
export const INDONESIA_CITIES: Record<string, { coords: [number, number]; province: string }> = {
  'cikarang': { coords: [-6.315, 107.14], province: 'Jawa Barat' },
  'bekasi': { coords: [-6.2383, 106.9756], province: 'Jawa Barat' },
  'jakarta': { coords: [-6.2088, 106.8456], province: 'DKI Jakarta' },
  'tangerang': { coords: [-6.1783, 106.6319], province: 'Banten' },
  'bogor': { coords: [-6.595, 106.8167], province: 'Jawa Barat' },
  'depok': { coords: [-6.4025, 106.7942], province: 'Jawa Barat' },
  'karawang': { coords: [-6.305, 107.304], province: 'Jawa Barat' },
  'cirebon': { coords: [-6.732, 108.552], province: 'Jawa Barat' },
  'bandung': { coords: [-6.9175, 107.6191], province: 'Jawa Barat' },
  'surabaya': { coords: [-7.2575, 112.7521], province: 'Jawa Timur' },
  'sidoarjo': { coords: [-7.4478, 112.7183], province: 'Jawa Timur' },
  'gresik': { coords: [-7.1566, 112.6555], province: 'Jawa Timur' },
  'malang': { coords: [-7.9839, 112.6214], province: 'Jawa Timur' },
  'semarang': { coords: [-6.9667, 110.4167], province: 'Jawa Tengah' },
  'solo': { coords: [-7.5755, 110.8243], province: 'Jawa Tengah' },
  'surakarta': { coords: [-7.5755, 110.8243], province: 'Jawa Tengah' },
  'kudus': { coords: [-6.8048, 110.8405], province: 'Jawa Tengah' },
  'yogyakarta': { coords: [-7.7956, 110.3695], province: 'DI Yogyakarta' },
  'sleman': { coords: [-7.7167, 110.3556], province: 'DI Yogyakarta' },
  'ungaran': { coords: [-7.1395, 110.4045], province: 'Jawa Tengah' },
  'medan': { coords: [3.5952, 98.6722], province: 'Sumatera Utara' },
  'palembang': { coords: [-2.9761, 104.7754], province: 'Sumatera Selatan' },
  'lampung': { coords: [-5.45, 105.2667], province: 'Lampung' },
  'batam': { coords: [1.1301, 104.0529], province: 'Kepulauan Riau' },
  'makassar': { coords: [-5.1477, 119.4327], province: 'Sulawesi Selatan' },
  'denpasar': { coords: [-8.6705, 115.2126], province: 'Bali' },
  'balikpapan': { coords: [-1.2654, 116.8312], province: 'Kalimantan Timur' },
  'banjarmasin': { coords: [-3.3167, 114.5833], province: 'Kalimantan Selatan' }
};

export function resolveCityLocation(cityName: string): { coords: [number, number]; province: string } {
  const query = (cityName || '').trim().toLowerCase();
  for (const [key, val] of Object.entries(INDONESIA_CITIES)) {
    if (query.includes(key) || key.includes(query)) {
      return val;
    }
  }
  return { coords: [-6.9175, 107.6191], province: cityName.trim() || 'Jawa Barat' };
}

// Initial default supply requests
const defaultSupplyRequests: SupplyRequestRecord[] = [
  {
    id: 'req-101',
    partnerId: 'match-ind-1',
    partnerName: 'PT Sinar Nusantara Garmen Ltd.',
    targetType: 'industry_supplier',
    requesterId: 'user-umkm-1',
    requesterName: 'Ibu Ratna Dewi',
    organizationName: 'Koperasi Pengrajin Perca Mandiri Kartini',
    phone: '0822-1122-3344',
    email: 'koperasi.perca.kartini@gmail.com',
    wasteType: 'Kain Perca Katun & Denim Grade A',
    requestedVolume: '350 kg / Bulan',
    pickupMethod: 'Ambil Langsung dengan Armada Sendiri',
    intendedProduct: 'Produksi Tote Bag dan Pouch Etnik untuk Ekspor',
    status: 'accepted',
    statusNote: 'Disetujui. Tim logistik siap menerima kedatangan armada setiap hari Selasa pukul 10.00 WIB.',
    createdAt: '10 Februari 2026',
    updatedAt: '12 Februari 2026'
  },
  {
    id: 'req-102',
    partnerId: 'match-ind-2',
    partnerName: 'PT Mahoni Indah Woodcraft',
    targetType: 'industry_supplier',
    requesterId: 'user-pelajar-1',
    requesterName: 'Muhammad Raihan',
    organizationName: 'SMKN 1 Cikarang',
    phone: '0812-3456-7890',
    email: 'raihan@pelajar.id',
    wasteType: 'Serbuk Gergaji Kayu Sengon & Jati',
    requestedVolume: '100 kg / Bulan',
    pickupMethod: 'Kirim via Ekspedisi Kargo',
    intendedProduct: 'Praktikum Pembuatan Panel Akustik Ramah Lingkungan di Lab Sekolah',
    status: 'pending',
    statusNote: 'Menunggu konfirmasi ketersediaan armada jemput pabrik.',
    createdAt: '15 Maret 2026'
  }
];

// Helper to delay execution (simulates network latency)
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for localStorage get & set with defaults
function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to localStorage key: ${key}`, err);
  }
}

// Compute dynamic metrics for innovations from reviews
function computeInnovationMetrics(inv: InnovationItem, reviews: ReviewItem[]): InnovationItem {
  const invReviews = reviews.filter((r) => r.innovationId === inv.id);
  const reviewCount = invReviews.length;

  if (reviewCount === 0) {
    return {
      ...inv,
      rating: 0,
      reviewCount: 0,
      successRate: null
    };
  }

  const rating = Number((invReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1));
  
  const scoreMap: Record<string, number> = {
    'Berhasil 100%': 100,
    'Berhasil dengan Modifikasi': 80,
    'Gagal / Perlu Coba Lagi': 25
  };
  const totalSuccessScore = invReviews.reduce((sum, r) => sum + (scoreMap[r.isSuccessful] ?? 75), 0);
  const successRate = Math.round(totalSuccessScore / reviewCount);

  return {
    ...inv,
    rating,
    reviewCount,
    successRate
  };
}

// -------------------------------------------------------------
// CENTRAL SERVICE & API MODULE
// -------------------------------------------------------------
export const api = {
  
  // AUTH SERVICE
  auth: {
    async getCurrentUser(): Promise<UserProfile> {
      await delay(80);
      return getStorage<UserProfile>(KEYS.CURRENT_USER, guestUser);
    },

    async setCurrentUser(user: UserProfile): Promise<UserProfile> {
      await delay(100);
      setStorage(KEYS.CURRENT_USER, user);
      return user;
    },

    async getDemoUsers(): Promise<UserProfile[]> {
      await delay(60);
      return getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
    },

    async login(email: string, role?: UserRole): Promise<UserProfile> {
      await delay(150);
      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      let matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!matched) {
        const roleLabel = role === 'industry' ? 'Pabrik Industri' : role === 'umkm' ? 'Pengrajin UMKM' : role === 'admin' ? 'Admin Kurator' : 'Siswa / Mahasiswa';
        matched = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: role || 'user',
          roleLabel,
          organization: 'Komunitas Penggiat Daur Ulang Mandiri',
          phone: '0812-0000-1234'
        };
        const updatedUsers = [...users, matched];
        setStorage(KEYS.USERS, updatedUsers);
      }

      setStorage(KEYS.CURRENT_USER, matched);
      return matched;
    },

    async register(name: string, email: string, role: UserRole, organization: string, phone: string): Promise<UserProfile> {
      await delay(180);
      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      
      // Email uniqueness check
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        throw new Error(`Email "${email}" sudah terdaftar dalam sistem. Silakan masuk atau gunakan email lain.`);
      }

      const roleLabel = role === 'industry' ? 'Pabrik Industri' : role === 'umkm' ? 'Pengrajin UMKM' : role === 'admin' ? 'Admin' : 'Siswa / Mahasiswa';

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        roleLabel,
        organization,
        phone
      };

      const updated = [...users, newUser];
      setStorage(KEYS.USERS, updated);
      setStorage(KEYS.CURRENT_USER, newUser);
      return newUser;
    },

    async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
      await delay(120);
      const current = getStorage<UserProfile>(KEYS.CURRENT_USER, guestUser);
      const updated = { ...current, ...profile };
      setStorage(KEYS.CURRENT_USER, updated);

      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      const updatedUsers = users.map((u) => (u.id === current.id ? updated : u));
      setStorage(KEYS.USERS, updatedUsers);

      return updated;
    },

    async logout(): Promise<void> {
      await delay(80);
      // Strictly reset to clean guest identity (not reverting to default user)
      setStorage(KEYS.CURRENT_USER, guestUser);
    }
  },

  // WASTE DICTIONARY SERVICE
  waste: {
    async getAll(): Promise<WasteItem[]> {
      await delay(100);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      const updatedList = list.map((w) => {
        const init = initialWasteData.find((iw) => iw.id === w.id);
        if (init && init.recommendedInnovationIds) {
          return {
            ...w,
            recommendedInnovationIds: init.recommendedInnovationIds,
            recommendedInnovations: init.recommendedInnovations
          };
        }
        return w;
      });
      return updatedList;
    },

    async getById(id: string): Promise<WasteItem | null> {
      await delay(80);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      return list.find((w) => w.id === id) || null;
    },

    async create(item: Omit<WasteItem, 'id'>): Promise<WasteItem> {
      await delay(150);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      const newItem: WasteItem = {
        ...item,
        id: `w-${Date.now()}`
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.WASTE, updated);
      return newItem;
    },

    async delete(id: string): Promise<void> {
      await delay(100);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      const updated = list.filter((w) => w.id !== id);
      setStorage(KEYS.WASTE, updated);
    }
  },

  // INNOVATION MARKETPLACE SERVICE
  innovations: {
    async getAll(): Promise<InnovationItem[]> {
      await delay(120);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const reviews = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      
      // Ensure all standard initial innovations exist (like newly added briket)
      const existingIds = new Set(list.map((i) => i.id));
      const missingDefaults = initialInnovationData.filter((i) => !existingIds.has(i.id));
      const mergedList = missingDefaults.length > 0 ? [...list, ...missingDefaults] : list;
      
      return mergedList.map((inv) => computeInnovationMetrics(inv, reviews));
    },

    async getById(id: string): Promise<InnovationItem | null> {
      await delay(80);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const reviews = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      const inv = list.find((i) => i.id === id);
      if (!inv) return null;

      return computeInnovationMetrics(inv, reviews);
    },

    async create(item: Omit<InnovationItem, 'id' | 'status' | 'rating' | 'reviewCount' | 'successRate'>): Promise<InnovationItem> {
      await delay(160);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const newItem: InnovationItem = {
        ...item,
        id: `inv-${Date.now()}`,
        status: 'pending',
        rating: 0,
        reviewCount: 0,
        successRate: null, // Initialized as null until community tests and reviews it
        submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.INNOVATIONS, updated);
      return newItem;
    },

    async update(id: string, updates: Partial<InnovationItem>): Promise<InnovationItem> {
      await delay(140);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      let target: InnovationItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            ...updates,
            // If resubmitting a rejected item, reset status to pending
            status: updates.status || 'pending',
            rejectionReason: updates.status === 'pending' ? undefined : item.rejectionReason,
            submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Innovation not found');
      setStorage(KEYS.INNOVATIONS, updated);
      return target;
    },

    async approve(id: string, userRole?: string): Promise<InnovationItem> {
      await delay(140);
      if (userRole && userRole !== 'admin') {
        throw new Error('Akses ditolak: Hanya Admin Kurator yang berhak menyetujui inovasi.');
      }
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      let target: InnovationItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            status: 'verified' as const, 
            rejectionReason: undefined,
            moderationDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Innovation not found');
      setStorage(KEYS.INNOVATIONS, updated);
      return target;
    },

    async reject(id: string, reason: string, userRole?: string): Promise<InnovationItem> {
      await delay(140);
      if (userRole && userRole !== 'admin') {
        throw new Error('Akses ditolak: Hanya Admin Kurator yang berhak menolak inovasi.');
      }
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      let target: InnovationItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            status: 'rejected' as const, 
            rejectionReason: reason,
            moderationDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Innovation not found');
      setStorage(KEYS.INNOVATIONS, updated);
      return target;
    },

    async delete(id: string): Promise<void> {
      await delay(100);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const updated = list.filter((item) => item.id !== id);
      setStorage(KEYS.INNOVATIONS, updated);
    },

    // TUTORIAL STEP PROGRESS TRACKING
    async getProgress(userId: string, innovationId: string): Promise<number[]> {
      const all = getStorage<Record<string, number[]>>(KEYS.TUTORIAL_PROGRESS, {});
      const key = `${userId}_${innovationId}`;
      return all[key] || [];
    },

    async toggleStep(userId: string, innovationId: string, stepNumber: number): Promise<number[]> {
      const all = getStorage<Record<string, number[]>>(KEYS.TUTORIAL_PROGRESS, {});
      const key = `${userId}_${innovationId}`;
      const current = all[key] || [];
      const updated = current.includes(stepNumber)
        ? current.filter((s) => s !== stepNumber)
        : [...current, stepNumber].sort((a, b) => a - b);
      
      all[key] = updated;
      setStorage(KEYS.TUTORIAL_PROGRESS, all);
      return updated;
    }
  },

  // MATCHMAKING & SUPPLY REQUEST SERVICE
  matchmaking: {
    async getPartners(): Promise<MatchmakingItem[]> {
      await delay(120);
      return getStorage<MatchmakingItem[]>(KEYS.MATCHMAKING, initialMatchmakingData);
    },

    async createListing(item: Omit<MatchmakingItem, 'id'>): Promise<MatchmakingItem> {
      await delay(160);
      const list = getStorage<MatchmakingItem[]>(KEYS.MATCHMAKING, initialMatchmakingData);
      
      // Resolve city location dynamically to avoid hardcoded coords and province
      const location = resolveCityLocation(item.city);

      const newItem: MatchmakingItem = {
        ...item,
        id: `match-${Date.now()}`,
        province: location.province,
        coordinates: location.coords,
        isCertifiedNonB3: false // Default to unverified on newly submitted listings
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.MATCHMAKING, updated);
      return newItem;
    },

    async getSupplyRequests(): Promise<SupplyRequestRecord[]> {
      await delay(100);
      return getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
    },

    async getPendingCountForUser(userId?: string, userRole?: string, userOrg?: string): Promise<number> {
      const list = getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
      const pending = list.filter((r) => r.status === 'pending');
      if (userRole === 'admin') {
        return pending.length;
      }
      if (!userId || userId === 'guest') {
        return 0;
      }
      const lowerOrg = (userOrg || '').toLowerCase().trim();
      const incoming = pending.filter((r) => {
        const isPartnerDirect = r.partnerId === userId;
        const matchesOrg = lowerOrg && lowerOrg !== '-' && r.partnerName.toLowerCase().includes(lowerOrg);
        return isPartnerDirect || matchesOrg;
      });
      const myRequests = pending.filter((r) => r.requesterId === userId);
      return incoming.length > 0 ? incoming.length : myRequests.length;
    },

    async sendSupplyRequest(req: Omit<SupplyRequestRecord, 'id' | 'status' | 'createdAt'>): Promise<SupplyRequestRecord> {
      await delay(180);
      const list = getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
      const newRecord: SupplyRequestRecord = {
        ...req,
        id: `req-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      const updated = [newRecord, ...list];
      setStorage(KEYS.SUPPLY_REQUESTS, updated);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('w2w:supply_request_updated', { detail: newRecord }));
      }
      return newRecord;
    },

    async updateRequestStatus(
      id: string, 
      status: SupplyRequestRecord['status'], 
      note?: string,
      userId?: string,
      userRole?: string
    ): Promise<SupplyRequestRecord> {
      await delay(140);
      const list = getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
      let target: SupplyRequestRecord | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          // Verify authority: requester cannot accept their own request
          if (userId && (status === 'accepted' || status === 'rejected')) {
            const isRequester = item.requesterId === userId;
            const isAdmin = userRole === 'admin';
            if (isRequester && !isAdmin) {
              throw new Error('Hanya pihak penyedia/mitra tujuan yang berhak menyetujui atau menolak permohonan.');
            }
          }

          target = { 
            ...item, 
            status, 
            statusNote: note || item.statusNote,
            updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Request not found');
      setStorage(KEYS.SUPPLY_REQUESTS, updated);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('w2w:supply_request_updated', { detail: target }));
      }
      return target;
    }
  },

  // EVALUATION & REVIEWS SERVICE
  reviews: {
    async getAll(): Promise<ReviewItem[]> {
      await delay(100);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      const existingIds = new Set(list.map((r) => r.id));
      const missing = initialReviewsData.filter((r) => !existingIds.has(r.id));
      if (missing.length > 0) {
        const merged = [...list, ...missing];
        setStorage(KEYS.REVIEWS, merged);
        return merged;
      }
      return list;
    },

    async create(review: Omit<ReviewItem, 'id' | 'createdAt' | 'likes' | 'likedByUsers'>): Promise<ReviewItem> {
      await delay(160);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);

      // Verify innovation exists
      const innovations = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const validInv = innovations.find((i) => i.id === review.innovationId);
      if (!validInv) {
        throw new Error('Produk inovasi tidak valid atau tidak ditemukan dalam katalog.');
      }

      // Check if user already reviewed this product (prevent duplicate spam)
      if (review.userId && review.userId !== 'guest') {
        const existing = list.find((r) => r.userId === review.userId && r.innovationId === review.innovationId);
        if (existing) {
          throw new Error('Anda sudah memberikan ulasan evaluasi untuk produk ini sebelumnya.');
        }
      }

      const newReview: ReviewItem = {
        ...review,
        id: `rev-${Date.now()}`,
        innovationTitle: validInv.title,
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        likes: 0,
        likedByUsers: []
      };

      const updated = [newReview, ...list];
      setStorage(KEYS.REVIEWS, updated);

      // Re-aggregate and persist target innovation metrics in storage
      const updatedInv = computeInnovationMetrics(validInv, updated);
      const updatedInnovations = innovations.map((inv) => (inv.id === validInv.id ? updatedInv : inv));
      setStorage(KEYS.INNOVATIONS, updatedInnovations);

      return newReview;
    },

    async like(id: string, userId: string = 'guest'): Promise<ReviewItem> {
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      let target: ReviewItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          const likedBy = item.likedByUsers || [];
          const hasLiked = likedBy.includes(userId);
          
          // Toggle like to prevent infinite like-spamming
          const newLikedBy = hasLiked
            ? likedBy.filter((u) => u !== userId)
            : [...likedBy, userId];
          
          const newLikes = hasLiked ? Math.max(0, item.likes - 1) : item.likes + 1;

          target = { 
            ...item, 
            likes: newLikes,
            likedByUsers: newLikedBy
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Review not found');
      setStorage(KEYS.REVIEWS, updated);
      return target;
    },

    async report(id: string, reason: string): Promise<ReviewItem> {
      await delay(120);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      let target: ReviewItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { ...item, isReported: true, reportReason: reason };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Review not found');
      setStorage(KEYS.REVIEWS, updated);
      return target;
    },

    async delete(id: string): Promise<void> {
      await delay(100);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      const targetReview = list.find((r) => r.id === id);
      const updated = list.filter((r) => r.id !== id);
      setStorage(KEYS.REVIEWS, updated);

      if (targetReview) {
        const innovations = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
        const targetInv = innovations.find((i) => i.id === targetReview.innovationId);
        if (targetInv) {
          const updatedInv = computeInnovationMetrics(targetInv, updated);
          const updatedInnovations = innovations.map((inv) => (inv.id === targetInv.id ? updatedInv : inv));
          setStorage(KEYS.INNOVATIONS, updatedInnovations);
        }
      }
    }
  },

  // FACILITIES & STUDY TOUR BOOKINGS SERVICE
  facilities: {
    async getAll(): Promise<FacilityItem[]> {
      await delay(100);
      return getStorage<FacilityItem[]>(KEYS.FACILITIES, initialFacilitiesData);
    },

    async getBookings(): Promise<FacilityBookingRecord[]> {
      await delay(90);
      return getStorage<FacilityBookingRecord[]>(KEYS.FACILITY_BOOKINGS, []);
    },

    async createBooking(booking: Omit<FacilityBookingRecord, 'id' | 'status' | 'createdAt'>): Promise<FacilityBookingRecord> {
      await delay(160);
      const list = getStorage<FacilityBookingRecord[]>(KEYS.FACILITY_BOOKINGS, []);
      const newBooking: FacilityBookingRecord = {
        ...booking,
        id: `book-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      const updated = [newBooking, ...list];
      setStorage(KEYS.FACILITY_BOOKINGS, updated);
      return newBooking;
    }
  }
};
