import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  Copy,
  Check,
  Smartphone,
  Laptop,
  Download,
  Upload,
  Cloud,
  Share2,
  ShieldCheck,
  AlertCircle,
  Database,
  Globe,
  FileCode,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { StorageConfig, StorageProvider, UserProfile } from '../types';
import {
  applySyncPacket,
  createSyncPacket,
  generateSyncCode,
  loadStorageConfig,
  pullCloudData,
  pushCloudData,
  saveStorageConfig,
  SUPABASE_SQL_DDL,
  testStorageEndpoint
} from '../utils/syncService';
import { audioEngine } from '../utils/soundAndNotification';

interface SyncModalProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  onClose: () => void;
  onRefreshData: () => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  profile,
  onProfileChange,
  onClose,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'builtin' | 'supabase' | 'custom' | 'backup'>('builtin');
  const [storageConfig, setStorageConfig] = useState<StorageConfig>(() => loadStorageConfig());
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Copy Room Code
  const copyRoomCode = () => {
    navigator.clipboard.writeText(profile.syncCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Copy Supabase SQL DDL
  const copySqlDdl = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_DDL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Generate new room code
  const handleGenerateNewCode = () => {
    const newCode = generateSyncCode();
    const updated = { ...profile, syncCode: newCode };
    onProfileChange(updated);
    setStatusMessage({ type: 'success', text: `Kode sinkronisasi baru dibuat: ${newCode}` });
  };

  // Save Storage Config
  const handleSaveConfig = (newProvider?: StorageProvider) => {
    const updated: StorageConfig = {
      ...storageConfig,
      provider: newProvider || storageConfig.provider
    };
    setStorageConfig(updated);
    saveStorageConfig(updated);
    audioEngine.playCheckSound();
    setStatusMessage({
      type: 'success',
      text: `Pengaturan penyimpanan "${updated.provider.toUpperCase()}" berhasil disimpan!`
    });
  };

  // Test Storage Connection
  const handleTestConnection = async (testCfg: StorageConfig) => {
    try {
      setIsTesting(true);
      setStatusMessage(null);
      const result = await testStorageEndpoint(testCfg);
      if (result.success) {
        audioEngine.playCheckSound();
        setStatusMessage({ type: 'success', text: `✅ ${result.message}` });
      } else {
        setStatusMessage({ type: 'error', text: `❌ ${result.message}` });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi gagal diuji';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsTesting(false);
    }
  };

  // Unified Push to Cloud
  const handlePushToCloud = async () => {
    try {
      setIsPushing(true);
      setStatusMessage(null);
      const packet = createSyncPacket();
      const res = await pushCloudData(packet, storageConfig);

      audioEngine.playCheckSound();
      setStatusMessage({
        type: 'success',
        text: `✅ ${res.message}`
      });
      // Refresh local storage config state
      setStorageConfig(loadStorageConfig());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sinkronisasi push';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsPushing(false);
    }
  };

  // Unified Pull from Cloud
  const handlePullFromCloud = async (codeToPull: string) => {
    const targetCode = codeToPull.trim().toUpperCase();
    if (!targetCode) {
      setStatusMessage({ type: 'error', text: 'Masukkan kode sinkronisasi terlebih dahulu.' });
      return;
    }

    try {
      setIsPulling(true);
      setStatusMessage(null);

      const res = await pullCloudData(targetCode, storageConfig);
      if (res.packet) {
        const success = applySyncPacket(res.packet);
        if (success) {
          onProfileChange({ ...profile, syncCode: targetCode });
          onRefreshData();
          audioEngine.playVictorySound();
          setStatusMessage({
            type: 'success',
            text: `🎉 Berhasil tersinkronisasi! ${res.message}`
          });
        } else {
          setStatusMessage({ type: 'error', text: 'Gagal menerapkan paket data yang ditarik.' });
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan pull data';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsPulling(false);
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const packet = createSyncPacket();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(packet, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mutabaah_backup_${profile.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    audioEngine.playCheckSound();
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const success = applySyncPacket(parsed);
        if (success) {
          onRefreshData();
          audioEngine.playVictorySound();
          setStatusMessage({ type: 'success', text: '🎉 File cadangan data berhasil dipulihkan!' });
        } else {
          setStatusMessage({ type: 'error', text: 'Format file cadangan tidak sesuai.' });
        }
      } catch {
        setStatusMessage({ type: 'error', text: 'Gagal membaca file JSON backup.' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-white backdrop-blur-xs shrink-0 shadow-inner">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Sinkronisasi & Cloud Storage Fleksibel
                </h3>
                <span className="bg-emerald-500/30 text-emerald-200 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/20">
                  {storageConfig.provider === 'supabase' ? 'Supabase DB' : storageConfig.provider === 'custom_rest' ? 'Custom API' : 'Cloud Server'}
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Pilih opsi penyimpanan: Server Cloud Bawaan, Database Supabase, atau Custom REST API.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Storage Provider Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-4 sm:px-6 pt-3 gap-1 sm:gap-2 overflow-x-auto">
          <button
            id="tab-sync-builtin"
            onClick={() => {
              setActiveTab('builtin');
              setStatusMessage(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'builtin'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloud Room Bawaan</span>
          </button>

          <button
            id="tab-sync-supabase"
            onClick={() => {
              setActiveTab('supabase');
              setStatusMessage(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'supabase'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Database (API)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
              Flexible
            </span>
          </button>

          <button
            id="tab-sync-custom"
            onClick={() => {
              setActiveTab('custom');
              setStatusMessage(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Custom REST API</span>
          </button>

          <button
            id="tab-sync-backup"
            onClick={() => {
              setActiveTab('backup');
              setStatusMessage(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>File JSON Backup</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          
          {/* Status Message Notification */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 border transition-all ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 text-rose-900 border-rose-200'
                  : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 leading-relaxed">{statusMessage.text}</div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: BUILT-IN CLOUD SERVER */}
          {/* ========================================================= */}
          {activeTab === 'builtin' && (
            <div className="space-y-5">
              
              {/* Storage Activation Banner */}
              {storageConfig.provider !== 'builtin' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <span className="text-amber-900 font-medium">
                    Saat ini Anda sedang menggunakan penyedia <strong>{storageConfig.provider.toUpperCase()}</strong>.
                  </span>
                  <button
                    onClick={() => handleSaveConfig('builtin')}
                    className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition cursor-pointer shrink-0"
                  >
                    Jadikan Default
                  </button>
                </div>
              )}

              {/* Room Code Card */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 rounded-2xl border border-emerald-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Kode Sinkronisasi Perangkat Anda
                </span>
                
                <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-emerald-300 font-mono text-lg font-black text-emerald-950 shadow-xs">
                    <span>{profile.syncCode}</span>
                    <button
                      onClick={copyRoomCode}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleGenerateNewCode}
                    className="px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-colors cursor-pointer shrink-0"
                    title="Buat kode baru"
                  >
                    Buat Kode Baru
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Gunakan kode ini di HP, Tablet, atau Laptop lain untuk menghubungkan akun santri{' '}
                  <strong className="text-slate-900">{profile.name}</strong>.
                </p>
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Push Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      1. Unggah Data (Push)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Kirim checklist dan hafalan terbaru dari perangkat ini ke server cloud.
                    </p>
                  </div>
                  <button
                    id="btn-sync-push"
                    onClick={handlePushToCloud}
                    disabled={isPushing}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isPushing ? 'animate-spin' : ''}`} />
                    <span>{isPushing ? 'Mengunggah...' : 'Unggah ke Cloud'}</span>
                  </button>
                </div>

                {/* Pull Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Download className="w-4 h-4 text-teal-600" />
                      2. Tarik Data (Pull)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Ambil data dari perangkat lain menggunakan kode room.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Masukkan kode (e.g. MUTABA-9K2L)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 text-xs font-mono font-bold bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      id="btn-sync-pull"
                      onClick={() => handlePullFromCloud(inputCode || profile.syncCode)}
                      disabled={isPulling}
                      className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className={`w-3.5 h-3.5 ${isPulling ? 'animate-spin' : ''}`} />
                      <span>{isPulling ? 'Menarik data...' : 'Tarik & Gabungkan Data'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SUPABASE DATABASE & REST API */}
          {/* ========================================================= */}
          {activeTab === 'supabase' && (
            <div className="space-y-5">
              
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      Penyimpanan Cloud Supabase (PostgreSQL & REST API)
                    </h4>
                    <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                      Hubungkan langsung proyek <strong>Supabase</strong> Anda untuk menyimpan mutaba'ah siswa di tabel cloud pribadi Anda secara realtime dan aman.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Config Supabase */}
              <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                
                {/* Supabase URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Supabase Project URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-supabase-url"
                    type="url"
                    placeholder="https://xyzprojectid.supabase.co"
                    value={storageConfig.supabaseUrl || ''}
                    onChange={(e) => setStorageConfig({ ...storageConfig, supabaseUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ditemukan di Supabase Dashboard → <strong>Project Settings → API → Project URL</strong>.
                  </p>
                </div>

                {/* Supabase Anon Key */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Supabase Anon Public API Key <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-supabase-key"
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={storageConfig.supabaseKey || ''}
                    onChange={(e) => setStorageConfig({ ...storageConfig, supabaseKey: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Gunakan <strong>anon public</strong> key (aman untuk client-side web mutaba'ah).
                  </p>
                </div>

                {/* Table Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nama Tabel Database
                    </label>
                    <input
                      type="text"
                      placeholder="mutabaah_sync"
                      value={storageConfig.supabaseTable || 'mutabaah_sync'}
                      onChange={(e) => setStorageConfig({ ...storageConfig, supabaseTable: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storageConfig.provider === 'supabase'}
                        onChange={(e) => {
                          const newProvider: StorageProvider = e.target.checked ? 'supabase' : 'builtin';
                          setStorageConfig({ ...storageConfig, provider: newProvider });
                        }}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                      />
                      <span>Gunakan Supabase sebagai Default</span>
                    </label>
                  </div>
                </div>

                {/* Buttons Config */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    id="btn-test-supabase"
                    onClick={() => handleTestConnection({ ...storageConfig, provider: 'supabase' })}
                    disabled={isTesting || !storageConfig.supabaseUrl || !storageConfig.supabaseKey}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Menguji...' : '⚡ Uji Koneksi Supabase'}</span>
                  </button>

                  <button
                    onClick={() => handleSaveConfig('supabase')}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan Pengaturan Supabase</span>
                  </button>

                  <button
                    onClick={() => setShowSqlGuide(!showSqlGuide)}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{showSqlGuide ? 'Tutup Skrip SQL' : 'Lihat Skrip SQL Tabel'}</span>
                  </button>
                </div>
              </div>

              {/* SQL Schema Assistant Box */}
              {showSqlGuide && (
                <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Skrip SQL Pembuatan Tabel di Supabase (SQL Editor)
                    </span>
                    <button
                      onClick={copySqlDdl}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Tersalin!' : 'Salin SQL'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-black/50 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-48">
                    {SUPABASE_SQL_DDL}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    Buka <strong>Supabase Dashboard → SQL Editor → New Query</strong>, tempel skrip di atas, lalu klik <strong>Run</strong>.
                  </p>
                </div>
              )}

              {/* Push & Pull Buttons with Supabase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handlePushToCloud}
                  disabled={isPushing || !storageConfig.supabaseUrl || !storageConfig.supabaseKey}
                  className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className={`w-4 h-4 ${isPushing ? 'animate-spin' : ''}`} />
                  <span>{isPushing ? 'Menyimpan...' : 'Unggah (Push) ke Supabase'}</span>
                </button>

                <button
                  onClick={() => handlePullFromCloud(inputCode || profile.syncCode)}
                  disabled={isPulling || !storageConfig.supabaseUrl || !storageConfig.supabaseKey}
                  className="py-2.5 px-4 bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                  <span>{isPulling ? 'Mengunduh...' : 'Tarik (Pull) dari Supabase'}</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CUSTOM REST API / WEBHOOK */}
          {/* ========================================================= */}
          {activeTab === 'custom' && (
            <div className="space-y-5">
              
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-950">
                      Integrasi Custom REST API / Webhook Sekolah
                    </h4>
                    <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed">
                      Kirimkan rekap mutaba'ah siswa ke server sekolah, Google Apps Script, Laravel, Django, atau microservice internal Anda.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    API Endpoint URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.sekolahku.sch.id/v1/mutabaah/sync"
                    value={storageConfig.customEndpointUrl || ''}
                    onChange={(e) => setStorageConfig({ ...storageConfig, customEndpointUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Header Otorisasi (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Bearer eyJhbGciOi..."
                    value={storageConfig.customAuthHeader || ''}
                    onChange={(e) => setStorageConfig({ ...storageConfig, customAuthHeader: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      HTTP Method
                    </label>
                    <select
                      value={storageConfig.customMethod || 'POST'}
                      onChange={(e) => setStorageConfig({ ...storageConfig, customMethod: e.target.value as 'POST' | 'PUT' })}
                      className="w-full px-3 py-2 text-xs font-bold bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="POST">POST (JSON Body)</option>
                      <option value="PUT">PUT (JSON Body)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storageConfig.provider === 'custom_rest'}
                        onChange={(e) => {
                          const newProvider: StorageProvider = e.target.checked ? 'custom_rest' : 'builtin';
                          setStorageConfig({ ...storageConfig, provider: newProvider });
                        }}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span>Gunakan Custom API sebagai Default</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleTestConnection({ ...storageConfig, provider: 'custom_rest' })}
                    disabled={isTesting || !storageConfig.customEndpointUrl}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Menguji...' : 'Uji Endpoint API'}</span>
                  </button>

                  <button
                    onClick={() => handleSaveConfig('custom_rest')}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan Pengaturan Custom API</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handlePushToCloud}
                  disabled={isPushing || !storageConfig.customEndpointUrl}
                  className="py-2.5 px-4 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className={`w-4 h-4 ${isPushing ? 'animate-spin' : ''}`} />
                  <span>{isPushing ? 'Mengirim...' : 'Kirim (Push) ke Endpoint'}</span>
                </button>

                <button
                  onClick={() => handlePullFromCloud(inputCode || profile.syncCode)}
                  disabled={isPulling || !storageConfig.customEndpointUrl}
                  className="py-2.5 px-4 bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                  <span>{isPulling ? 'Mengunduh...' : 'Tarik (Pull) dari Endpoint'}</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: JSON FILE BACKUP & RESTORE */}
          {/* ========================================================= */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    Unduh Cadangan Lengkap (.json)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Simpan seluruh data mutaba'ah siswa, riwayat checklist tanggal, dan skor hafalan suara AI ke komputer atau ponsel Anda.
                  </p>
                </div>

                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File Cadangan</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-teal-600" />
                    Pulihkan Data dari Berkas (.json)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pilih file backup `.json` sebelumnya untuk mengembalikan seluruh riwayat mutaba'ah.
                  </p>
                </div>

                <label className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0">
                  <Upload className="w-4 h-4 text-teal-700" />
                  <span>Pilih File Backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>

            </div>
          )}

          {/* Privacy Note Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-slate-500 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Privasi & Keamanan: Data mutaba'ah dienkripsi dan diproses secara aman. Anda memiliki kendali penuh atas database Anda.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Penyedia aktif: <strong className="text-slate-900 capitalize">{storageConfig.provider}</strong>
            {storageConfig.lastSyncSuccessTime && (
              <span className="ml-2 text-slate-400 hidden sm:inline">
                (Sinkronisasi terakhir: {new Date(storageConfig.lastSyncSuccessTime).toLocaleTimeString('id-ID')})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
