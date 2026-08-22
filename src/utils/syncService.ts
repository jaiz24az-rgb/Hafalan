import { AppRecords, ChecklistItem, ReminderSetting, StorageConfig, SyncPacket, UserProfile } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'checklist_user_profile_v1',
  RECORDS: 'checklist_daily_records_v1',
  CUSTOM_ITEMS: 'checklist_custom_items_v1',
  REMINDERS: 'checklist_reminders_v1',
  DEVICE_ID: 'checklist_device_id_v1',
  LAST_SYNC: 'checklist_last_sync_v1',
  STORAGE_CONFIG: 'checklist_storage_config_v1'
};

export const DEFAULT_STORAGE_CONFIG: StorageConfig = {
  provider: 'builtin',
  autoSyncOnSave: true,
  supabaseUrl: '',
  supabaseKey: '',
  supabaseTable: 'mutabaah_sync',
  customEndpointUrl: '',
  customAuthHeader: '',
  customMethod: 'POST'
};

export const SUPABASE_SQL_DDL = `-- ========================================================
-- TABEL SINKRONISASI MUTABA'AH UNTUK SUPABASE
-- Jalankan query berikut di Supabase Dashboard -> SQL Editor
-- ========================================================

create table if not exists public.mutabaah_sync (
  sync_code text primary key,
  student_name text,
  grade text,
  device_id text,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Mengaktifkan Row Level Security (RLS)
alter table public.mutabaah_sync enable row level security;

-- Memberikan izin baca dan tulis bagi siapapun dengan Anon Key (atau disesuaikan dengan auth sekolah)
drop policy if exists "Akses Publik Mutabaah" on public.mutabaah_sync;
create policy "Akses Publik Mutabaah" 
  on public.mutabaah_sync 
  for all 
  using (true) 
  with check (true);
`;

// Load & Save Storage Config
export function loadStorageConfig(): StorageConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORAGE_CONFIG);
    return raw ? { ...DEFAULT_STORAGE_CONFIG, ...JSON.parse(raw) } : DEFAULT_STORAGE_CONFIG;
  } catch {
    return DEFAULT_STORAGE_CONFIG;
  }
}

export function saveStorageConfig(config: StorageConfig) {
  localStorage.setItem(STORAGE_KEYS.STORAGE_CONFIG, JSON.stringify(config));
  broadcastLocalUpdate();
}

// Generate random sync room code
export function generateSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'MUTABA-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getDeviceId(): string {
  let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
  }
  return id;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Ananda Sholih/Sholihah',
  grade: 'kelas_1',
  schoolOrMadrasah: 'SD/Madrasah Ibtidaiyah',
  guruOrPembimbing: 'Ustadz / Ustadzah Pembimbing',
  syncCode: generateSyncCode()
};

export const DEFAULT_REMINDERS: ReminderSetting[] = [
  {
    id: 'rem_subuh',
    title: 'Pengingat Sholat Subuh & Dzikir Pagi',
    category: 'ibadah_wajib',
    time: '04:45',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'adzan',
    description: 'Waktunya bangun dan menunaikan sholat subuh berjamaah serta dzikir pagi.'
  },
  {
    id: 'rem_murojaah_pagi',
    title: "Muroja'ah Hafalan Surat Juz 30",
    category: 'surat',
    time: '06:15',
    days: [1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'chime',
    description: 'Ulangi hafalan surat target kelas sebelum beraktivitas.'
  },
  {
    id: 'rem_dhuha',
    title: 'Sholat Sunnah Dhuha',
    category: 'ibadah_wajib',
    time: '07:30',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'bell',
    description: 'Sholat dhuha minimal 2 rakaat pembuka kelapangan rezeki.'
  },
  {
    id: 'rem_hadits_doa',
    title: 'Hafalan 1 Hadits & 1 Doa Harian',
    category: 'hadits',
    time: '16:00',
    days: [1, 2, 3, 4, 5],
    enabled: true,
    sound: 'gentle',
    description: 'Lafalkan hadits dan doa harian lengkap dengan maknanya.'
  },
  {
    id: 'rem_tugas_rumah',
    title: 'Pekerjaan Rumah & Membantu Orang Tua',
    category: 'tugas_rumah',
    time: '17:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'bell',
    description: 'Menyapu, merapikan meja belajar, menyiram tanaman, dan membantu ayah bunda.'
  },
  {
    id: 'rem_maghrib',
    title: 'Sholat Maghrib & Tadarus Al-Quran',
    category: 'ibadah_wajib',
    time: '18:10',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'adzan',
    description: 'Sholat maghrib di awal waktu dan lanjut mengaji.'
  },
  {
    id: 'rem_isya',
    title: 'Checklist Harian & Sholat Isya',
    category: 'ibadah_wajib',
    time: '19:45',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: true,
    sound: 'chime',
    description: 'Pastikan seluruh mutabaah checklist hari ini sudah terisi lengkap.'
  }
];

// Local Storage Handlers
export function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  broadcastLocalUpdate();
}

export function loadRecords(): AppRecords {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveRecords(records: AppRecords) {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  broadcastLocalUpdate();
}

export function loadCustomItems(): ChecklistItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_ITEMS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCustomItems(items: ChecklistItem[]) {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_ITEMS, JSON.stringify(items));
  broadcastLocalUpdate();
}

export function loadReminders(): ReminderSetting[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data) : DEFAULT_REMINDERS;
  } catch {
    return DEFAULT_REMINDERS;
  }
}

export function saveReminders(reminders: ReminderSetting[]) {
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  broadcastLocalUpdate();
}

// Broadcast Channel for Multi-Tab / Multi-Window instant sync
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    broadcastChannel = new BroadcastChannel('mutabaah_sync_channel');
  }
} catch {
  // broadcast channel not supported in some sandboxes
}

export function subscribeToLocalSync(callback: () => void): () => void {
  const handler = (event: StorageEvent | MessageEvent) => {
    if (event instanceof StorageEvent) {
      if (
        event.key === STORAGE_KEYS.RECORDS ||
        event.key === STORAGE_KEYS.PROFILE ||
        event.key === STORAGE_KEYS.CUSTOM_ITEMS ||
        event.key === STORAGE_KEYS.REMINDERS
      ) {
        callback();
      }
    } else {
      callback();
    }
  };

  window.addEventListener('storage', handler as EventListener);
  if (broadcastChannel) {
    broadcastChannel.onmessage = handler as (ev: MessageEvent) => void;
  }

  return () => {
    window.removeEventListener('storage', handler as EventListener);
    if (broadcastChannel) {
      broadcastChannel.onmessage = null;
    }
  };
}

export function broadcastLocalUpdate() {
  localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'DATA_UPDATED', timestamp: Date.now() });
    } catch {
      // ignore
    }
  }
}

// Create Full Export Packet
export function createSyncPacket(): SyncPacket {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    deviceId: getDeviceId(),
    profile: loadProfile(),
    customItems: loadCustomItems(),
    records: loadRecords(),
    reminders: loadReminders()
  };
}

// Merge or Apply incoming sync packet
export function applySyncPacket(packet: SyncPacket): boolean {
  try {
    if (!packet || !packet.records || !packet.profile) return false;

    // Merge records
    const currentRecords = loadRecords();
    const mergedRecords: AppRecords = { ...currentRecords };

    Object.keys(packet.records).forEach((dateKey) => {
      if (!mergedRecords[dateKey]) {
        mergedRecords[dateKey] = packet.records[dateKey];
      } else {
        mergedRecords[dateKey] = {
          ...mergedRecords[dateKey],
          ...packet.records[dateKey]
        };
      }
    });

    saveRecords(mergedRecords);
    saveProfile(packet.profile);

    if (packet.customItems) {
      const existing = loadCustomItems();
      const existingIds = new Set(existing.map((i) => i.id));
      const combined = [...existing];
      packet.customItems.forEach((it) => {
        if (!existingIds.has(it.id)) {
          combined.push(it);
        }
      });
      saveCustomItems(combined);
    }

    if (packet.reminders) {
      saveReminders(packet.reminders);
    }

    broadcastLocalUpdate();
    return true;
  } catch (err) {
    console.error('Failed to apply sync packet:', err);
    return false;
  }
}

// -------------------------------------------------------------
// Unified Multi-Provider Push & Pull
// -------------------------------------------------------------

export interface SyncResponse {
  success: boolean;
  message: string;
  provider: 'builtin' | 'supabase' | 'custom_rest';
  timestamp?: string;
  packet?: SyncPacket;
}

export async function testStorageEndpoint(config: StorageConfig): Promise<{ success: boolean; message: string; details?: unknown }> {
  if (config.provider === 'builtin') {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        return { success: true, message: 'Server cloud bawaan terhubung dan aktif!' };
      }
      return { success: false, message: `Server mengembalikan status ${res.status}` };
    } catch (err: unknown) {
      return { success: false, message: err instanceof Error ? err.message : 'Koneksi gagal' };
    }
  }

  if (config.provider === 'supabase') {
    if (!config.supabaseUrl || !config.supabaseKey) {
      return { success: false, message: 'Supabase Project URL dan Anon Key wajib diisi.' };
    }

    try {
      // Clean URL
      let baseUrl = config.supabaseUrl.trim().replace(/\/+$/, '');
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }
      const table = (config.supabaseTable || 'mutabaah_sync').trim();
      const testUrl = `${baseUrl}/rest/v1/${table}?select=count&limit=1`;

      const res = await fetch(testUrl, {
        method: 'GET',
        headers: {
          apikey: config.supabaseKey.trim(),
          Authorization: `Bearer ${config.supabaseKey.trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        return {
          success: true,
          message: `Berhasil terhubung ke Supabase! Tabel "${table}" siap digunakan.`
        };
      }

      if (res.status === 404 || res.status === 400) {
        const errorBody = await res.json().catch(() => ({}));
        return {
          success: false,
          message: `Tabel "${table}" belum ditemukan di Supabase. Pastikan Anda sudah menjalankan SQL create table di Supabase SQL Editor. (Pesan: ${errorBody.message || res.statusText})`,
          details: errorBody
        };
      }

      if (res.status === 401 || res.status === 403) {
        return {
          success: false,
          message: 'Otorisasi gagal. Periksa kembali anon public key atau konfigurasi RLS (Row Level Security) Supabase Anda.'
        };
      }

      return {
        success: false,
        message: `Koneksi Supabase mengembalikan kode status ${res.status}: ${res.statusText}`
      };
    } catch (err: unknown) {
      // Try via backend proxy if direct browser fetch hit CORS
      try {
        const proxyRes = await fetch('/api/sync/supabase/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            supabaseUrl: config.supabaseUrl,
            supabaseKey: config.supabaseKey,
            supabaseTable: config.supabaseTable
          })
        });
        const proxyData = await proxyRes.json();
        return proxyData;
      } catch (proxyErr: unknown) {
        return {
          success: false,
          message: err instanceof Error ? err.message : 'Gagal menghubungi endpoint Supabase'
        };
      }
    }
  }

  if (config.provider === 'custom_rest') {
    if (!config.customEndpointUrl) {
      return { success: false, message: 'Custom Endpoint URL wajib diisi.' };
    }

    try {
      const res = await fetch('/api/sync/custom/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpointUrl: config.customEndpointUrl,
          authHeader: config.customAuthHeader,
          method: config.customMethod || 'POST'
        })
      });
      const data = await res.json();
      return data;
    } catch (err: unknown) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Gagal menguji Custom REST API'
      };
    }
  }

  return { success: false, message: 'Penyedia penyimpanan tidak dikenal.' };
}

// Push local sync packet to cloud
export async function pushCloudData(packet: SyncPacket, customConfig?: StorageConfig): Promise<SyncResponse> {
  const config = customConfig || loadStorageConfig();
  const syncCode = packet.profile.syncCode.trim().toUpperCase();

  if (config.provider === 'builtin') {
    const res = await fetch('/api/sync/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        syncCode,
        packet
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Gagal menyimpan ke server cloud bawaan.');
    }

    const updatedConfig = { ...config, lastSyncSuccessTime: new Date().toISOString(), lastSyncError: undefined };
    saveStorageConfig(updatedConfig);

    return {
      success: true,
      provider: 'builtin',
      message: `Data berhasil diunggah ke Cloud Room "${syncCode}".`,
      timestamp: new Date().toISOString()
    };
  }

  if (config.provider === 'supabase') {
    if (!config.supabaseUrl || !config.supabaseKey) {
      throw new Error('Supabase Project URL dan Anon Key belum dikonfigurasi.');
    }

    let baseUrl = config.supabaseUrl.trim().replace(/\/+$/, '');
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'https://' + baseUrl;
    }
    const table = (config.supabaseTable || 'mutabaah_sync').trim();
    const endpoint = `${baseUrl}/rest/v1/${table}`;

    const payload = [
      {
        sync_code: syncCode,
        student_name: packet.profile.name,
        grade: packet.profile.grade,
        device_id: packet.deviceId,
        data: packet,
        updated_at: new Date().toISOString()
      }
    ];

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          apikey: config.supabaseKey.trim(),
          Authorization: `Bearer ${config.supabaseKey.trim()}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Supabase HTTP ${res.status}`);
      }

      const updatedConfig = { ...config, lastSyncSuccessTime: new Date().toISOString(), lastSyncError: undefined };
      saveStorageConfig(updatedConfig);

      return {
        success: true,
        provider: 'supabase',
        message: `Data berhasil disinkronkan ke Supabase table "${table}" (Kode: ${syncCode})!`,
        timestamp: new Date().toISOString()
      };
    } catch (err: unknown) {
      // Fallback via server proxy
      const proxyRes = await fetch('/api/sync/supabase/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supabaseUrl: config.supabaseUrl,
          supabaseKey: config.supabaseKey,
          supabaseTable: config.supabaseTable,
          payload: payload[0]
        })
      });

      if (!proxyRes.ok) {
        const proxyErr = await proxyRes.json().catch(() => ({}));
        const msg = proxyErr.error || (err instanceof Error ? err.message : 'Gagal push ke Supabase');
        const updatedConfig = { ...config, lastSyncError: msg };
        saveStorageConfig(updatedConfig);
        throw new Error(msg);
      }

      const updatedConfig = { ...config, lastSyncSuccessTime: new Date().toISOString(), lastSyncError: undefined };
      saveStorageConfig(updatedConfig);

      return {
        success: true,
        provider: 'supabase',
        message: `Data berhasil disinkronkan ke Supabase via relay (Kode: ${syncCode})!`,
        timestamp: new Date().toISOString()
      };
    }
  }

  if (config.provider === 'custom_rest') {
    if (!config.customEndpointUrl) {
      throw new Error('Custom Endpoint URL belum diisi.');
    }

    const res = await fetch('/api/sync/custom/relay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: config.customEndpointUrl,
        method: config.customMethod || 'POST',
        authHeader: config.customAuthHeader,
        payload: {
          syncCode,
          studentName: packet.profile.name,
          updatedAt: new Date().toISOString(),
          packet
        }
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const msg = errData.error || `Custom API Error ${res.status}`;
      const updatedConfig = { ...config, lastSyncError: msg };
      saveStorageConfig(updatedConfig);
      throw new Error(msg);
    }

    const updatedConfig = { ...config, lastSyncSuccessTime: new Date().toISOString(), lastSyncError: undefined };
    saveStorageConfig(updatedConfig);

    return {
      success: true,
      provider: 'custom_rest',
      message: `Data berhasil dikirim ke Custom REST API endpoint!`,
      timestamp: new Date().toISOString()
    };
  }

  throw new Error('Penyedia penyimpanan tidak valid.');
}

// Pull cloud sync packet
export async function pullCloudData(syncCode: string, customConfig?: StorageConfig): Promise<SyncResponse> {
  const config = customConfig || loadStorageConfig();
  const targetCode = syncCode.trim().toUpperCase();

  if (!targetCode) {
    throw new Error('Kode sinkronisasi tidak boleh kosong.');
  }

  if (config.provider === 'builtin') {
    const res = await fetch(`/api/sync/pull/${encodeURIComponent(targetCode)}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Room "${targetCode}" belum memiliki data di server.`);
      }
      throw new Error('Gagal mengambil data dari server cloud bawaan.');
    }

    const json = await res.json();
    if (!json.packet) {
      throw new Error('Format data dari server tidak sesuai.');
    }

    return {
      success: true,
      provider: 'builtin',
      message: `Data dari Room "${targetCode}" berhasil ditarik.`,
      packet: json.packet,
      timestamp: json.updatedAt
    };
  }

  if (config.provider === 'supabase') {
    if (!config.supabaseUrl || !config.supabaseKey) {
      throw new Error('Supabase Project URL dan Anon Key belum dikonfigurasi.');
    }

    let baseUrl = config.supabaseUrl.trim().replace(/\/+$/, '');
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'https://' + baseUrl;
    }
    const table = (config.supabaseTable || 'mutabaah_sync').trim();
    const endpoint = `${baseUrl}/rest/v1/${table}?sync_code=eq.${encodeURIComponent(targetCode)}&select=*`;

    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          apikey: config.supabaseKey.trim(),
          Authorization: `Bearer ${config.supabaseKey.trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Supabase HTTP ${res.status}`);
      }

      const rows = await res.json();
      if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error(`Data dengan kode "${targetCode}" tidak ditemukan di Supabase.`);
      }

      const row = rows[0];
      const packet = row.data as SyncPacket;

      return {
        success: true,
        provider: 'supabase',
        message: `Berhasil mengunduh data dari Supabase (Kode: ${targetCode})!`,
        packet,
        timestamp: row.updated_at
      };
    } catch (err: unknown) {
      // Fallback to server proxy
      const proxyRes = await fetch('/api/sync/supabase/pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supabaseUrl: config.supabaseUrl,
          supabaseKey: config.supabaseKey,
          supabaseTable: config.supabaseTable,
          syncCode: targetCode
        })
      });

      if (!proxyRes.ok) {
        const proxyErr = await proxyRes.json().catch(() => ({}));
        throw new Error(proxyErr.error || (err instanceof Error ? err.message : 'Gagal pull dari Supabase'));
      }

      const proxyData = await proxyRes.json();
      return {
        success: true,
        provider: 'supabase',
        message: `Berhasil mengunduh data dari Supabase via relay (Kode: ${targetCode})!`,
        packet: proxyData.packet,
        timestamp: proxyData.updatedAt
      };
    }
  }

  if (config.provider === 'custom_rest') {
    if (!config.customEndpointUrl) {
      throw new Error('Custom Endpoint URL belum diisi.');
    }

    const res = await fetch('/api/sync/custom/pull', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: config.customEndpointUrl,
        authHeader: config.customAuthHeader,
        syncCode: targetCode
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Gagal mengambil data dari Custom REST API`);
    }

    const data = await res.json();
    return {
      success: true,
      provider: 'custom_rest',
      message: 'Data berhasil ditarik dari Custom REST API endpoint!',
      packet: data.packet,
      timestamp: data.updatedAt
    };
  }

  throw new Error('Penyedia penyimpanan tidak valid.');
}
