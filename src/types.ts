export type ItemCategory =
  | 'semua'
  | 'ibadah_wajib'
  | 'tugas_rumah'
  | 'surat'
  | 'hadits'
  | 'doa_harian'
  | 'doa_sholat'
  | 'tugas_kustom';

export type GradeLevel =
  | 'all'
  | 'kelas_1'
  | 'kelas_2'
  | 'kelas_3'
  | 'kelas_4'
  | 'kelas_5'
  | 'kelas_6';

export type CompletionStatus =
  | 'belum'
  | 'proses'
  | 'lancar'
  | 'mutqin'
  | 'selesai';

export interface ChecklistItem {
  id: string;
  number?: number;
  title: string;
  category: ItemCategory;
  gradeLevel?: GradeLevel;
  targetRange?: string;
  arabic?: string;
  latin?: string;
  translation?: string;
  sourceOrNotes?: string;
  timeEstimate?: string;
  defaultTime?: string;
  isCustom?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface ItemProgress {
  completed: boolean;
  status?: CompletionStatus;
  completedAt?: string;
  note?: string;
  paraf?: string;
  rating?: number; // 1-5 bintang
  lastTestScore?: number;
  lastTestGrade?: string;
  lastTestedAt?: string;
}

export interface HafalanMistake {
  type: 'tajwid' | 'lafadz' | 'kelancaran' | 'harakat';
  location: string;
  studentPronounced: string;
  expectedPronounced: string;
  explanation: string;
  severity: 'minor' | 'major';
}

export interface HafalanTestResult {
  id: string;
  itemId: string;
  itemTitle: string;
  itemCategory: ItemCategory;
  studentName: string;
  timestamp: string;
  score: number; // 0 - 100
  gradeLabel: string; // "Mumtaz", "Jayyid Jiddan", "Jayyid", "Maqbul", "Perlu Muraja'ah"
  accuracyScore: number;
  tajweedScore: number;
  fluencyScore: number;
  transcription: string;
  correctParts: string[];
  mistakes: HafalanMistake[];
  tajweedNotes: string[];
  recommendations: string[];
  summary: string;
  audioBlobUrl?: string;
}

export interface DayRecord {
  [itemId: string]: ItemProgress;
}

export interface AppRecords {
  [dateKey: string]: DayRecord; // dateKey: YYYY-MM-DD
}

export interface ReminderSetting {
  id: string;
  title: string;
  category: ItemCategory;
  time: string; // HH:mm format
  days: number[]; // 0: Sun, 1: Mon, ... 6: Sat
  enabled: boolean;
  sound: 'chime' | 'adzan' | 'gentle' | 'bell';
  targetItemId?: string;
  description?: string;
}

export interface UserProfile {
  name: string;
  grade: GradeLevel;
  schoolOrMadrasah: string;
  guruOrPembimbing: string;
  syncCode: string;
}

export type StorageProvider = 'builtin' | 'supabase' | 'custom_rest';

export interface StorageConfig {
  provider: StorageProvider;
  autoSyncOnSave: boolean;
  supabaseUrl?: string;
  supabaseKey?: string;
  supabaseTable?: string;
  customEndpointUrl?: string;
  customAuthHeader?: string;
  customMethod?: 'POST' | 'PUT';
  lastSyncSuccessTime?: string;
  lastSyncError?: string;
}

export interface SyncPacket {
  version: number;
  updatedAt: string;
  deviceId: string;
  profile: UserProfile;
  customItems: ChecklistItem[];
  records: AppRecords;
  reminders: ReminderSetting[];
}
