export type WasteSafetyCategory = 'non-b3' | 'b3';

export type UserRole = 'user' | 'industry' | 'umkm' | 'community' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  organization: string;
  phone?: string;
  avatarUrl?: string;
}

export interface WasteItem {
  id: string;
  name: string;
  category: WasteSafetyCategory;
  categoryLabel: string;
  industrialSector: string;
  source: string;
  physicalForm: string;
  safetyRating: 'safe' | 'caution' | 'danger';
  safetyDescription: string;
  requiredPPE: string[];
  legalCode: string;
  economicPotential: string;
  handlingGuidelines: string[];
  prohibitedActions: string[];
  recommendedInnovations: string[];
  recommendedInnovationIds?: string[];
  characteristics: string[];
}

export interface InnovationStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export type InnovationStatus = 'verified' | 'pending' | 'rejected';

export interface InnovationItem {
  id: string;
  title: string;
  tagline: string;
  wasteSource: string;
  category: string;
  difficulty: 'Mudah' | 'Menengah' | 'Tinggi';
  estimatedTime: string;
  estimatedCost: string;
  economicValue: string;
  rating: number;
  reviewCount: number;
  successRate: number | null; // in percent, e.g. 92
  wasteId?: string; // Point 7: relation by ID
  materials: { name: string; amount: string }[];
  tools: string[];
  steps: InnovationStep[];
  safetyTips: string[];
  status: InnovationStatus;
  authorId?: string;
  submittedBy?: string;
  submissionDate?: string;
  rejectionReason?: string;
  moderationDate?: string;
}

export interface FacilityMachine {
  name: string;
  function: string;
  capacity: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  type: 'Pusat Pemanfaatan Limbah Industri' | 'TPST 3R Industri' | 'Bank Sampah Induk' | 'Pusat Biokonversi';
  location: string;
  city: string;
  province: string;
  capacity: string;
  description: string;
  technologies: string[];
  machines: FacilityMachine[];
  visitSchedule: string;
  contactPerson: string;
  phone: string;
  coordinates: [number, number];
  featuredOutput: string;
  isDemo?: boolean;
  operator?: string;
  source?: string;
  verificationStatus?: string;
  lastVerified?: string;
}

export interface FacilityBookingRecord {
  id: string;
  facilityId: string;
  facilityName: string;
  visitorName: string;
  institution: string;
  visitDate: string;
  participantCount: string | number;
  purpose: string;
  requestedBy?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface MatchmakingItem {
  id: string;
  name: string;
  type: 'industry_supplier' | 'community_buyer';
  entityType: 'Pabrik Industri' | 'UMKM Daur Ulang' | 'Komunitas Pengrajin' | 'Koperasi Hijau';
  wasteType: string;
  volumeMonthly: string;
  city: string;
  province: string;
  address: string;
  coordinates: [number, number];
  isCertifiedNonB3: boolean;
  priceExpectation: string;
  contactName: string;
  phone: string;
  email: string;
  description: string;
  authorId?: string;
  compatibilityScore?: number;
}

export type SupplyRequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface SupplyRequestRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  targetType: 'industry_supplier' | 'community_buyer';
  requesterId: string;
  requesterName: string;
  organizationName: string;
  phone: string;
  email: string;
  wasteType: string;
  requestedVolume: string;
  pickupMethod: string;
  intendedProduct: string;
  status: SupplyRequestStatus;
  statusNote?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewItem {
  id: string;
  innovationId: string;
  innovationTitle: string;
  userId?: string;
  userName: string;
  userRole: 'Siswa / Mahasiswa' | 'Pengrajin UMKM' | 'Warga Komunitas' | 'Praktisi Daur Ulang';
  rating: number;
  isEasyToMake: 'Sangat Mudah' | 'Cukup Mudah' | 'Butuh Keterampilan Khusus' | 'Sulit';
  isSuccessful: 'Berhasil 100%' | 'Berhasil dengan Modifikasi' | 'Gagal / Perlu Coba Lagi';
  comment: string;
  troubleshootingTip?: string;
  createdAt: string;
  likes: number;
  likedByUsers?: string[];
  isReported?: boolean;
  reportReason?: string;
}

export interface TutorialProgress {
  innovationId: string;
  completedSteps: number[];
  isFinished: boolean;
  updatedAt: string;
}

