/**
 * Mutaba'ah & Checklist Tugas Harian Siswa Hebat
 * Real-time Sync & Custom Push Notifications
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  AppRecords,
  ChecklistItem,
  CompletionStatus,
  DayRecord,
  GradeLevel,
  ItemCategory,
  ItemProgress,
  ReminderSetting,
  UserProfile
} from './types';
import {
  DOA_SEHARI_HARI,
  DOA_SHOLAT_PRAKTIK,
  HADITS_SISWA_HEBAT,
  IBADAH_HARIAN,
  SURAT_JUZ_30,
  TUGAS_PEKERJAAN_RUMAH
} from './data/curriculumData';
import {
  loadCustomItems,
  loadProfile,
  loadRecords,
  loadReminders,
  saveCustomItems,
  saveProfile,
  saveRecords,
  saveReminders,
  subscribeToLocalSync,
  createSyncPacket,
  applySyncPacket,
  loadStorageConfig,
  pullCloudData
} from './utils/syncService';
import { audioEngine, sendPushNotification } from './utils/soundAndNotification';
import { Navbar } from './components/Navbar';
import { DailyProgressBanner } from './components/DailyProgressBanner';
import { CategoryTabs } from './components/CategoryTabs';
import { ChecklistView } from './components/ChecklistView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReminderModal } from './components/ReminderModal';
import { SyncModal } from './components/SyncModal';
import { ReportModal } from './components/ReportModal';
import { AddTaskModal } from './components/AddTaskModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { VoiceHafalanTestModal } from './components/VoiceHafalanTestModal';

export default function App() {
  // Today helper
  const getTodayDateStr = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Main App State
  const [currentDate, setCurrentDate] = useState<string>(getTodayDateStr());
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [records, setRecords] = useState<AppRecords>(loadRecords);
  const [customItems, setCustomItems] = useState<ChecklistItem[]>(loadCustomItems);
  const [reminders, setReminders] = useState<ReminderSetting[]>(loadReminders);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('semua');

  // Modals state
  const [detailModalItem, setDetailModalItem] = useState<ChecklistItem | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isVoiceTestModalOpen, setIsVoiceTestModalOpen] = useState(false);
  const [voiceTestInitialItem, setVoiceTestInitialItem] = useState<ChecklistItem | null>(null);

  // Sync state indicator
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'local' | 'syncing' | 'error'>('synced');

  // Track triggered alarm minutes to avoid duplicate alerts within the same minute
  const triggeredAlarmsRef = useRef<Set<string>>(new Set());

  // Reload all storage data
  const refreshFromStorage = useCallback(() => {
    setProfile(loadProfile());
    setRecords(loadRecords());
    setCustomItems(loadCustomItems());
    setReminders(loadReminders());
  }, []);

  // Multi-tab sync subscription
  useEffect(() => {
    const unsubscribe = subscribeToLocalSync(() => {
      refreshFromStorage();
    });
    return () => unsubscribe();
  }, [refreshFromStorage]);

  // Background Custom Reminder & Push Notification Loop
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentDayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon ...
      const minuteKey = `${now.toDateString()}_${currentTimeStr}`;

      reminders.forEach((rem) => {
        if (!rem.enabled) return;
        if (rem.time === currentTimeStr && rem.days.includes(currentDayOfWeek)) {
          const alarmUniqueId = `${minuteKey}_${rem.id}`;
          if (!triggeredAlarmsRef.current.has(alarmUniqueId)) {
            triggeredAlarmsRef.current.add(alarmUniqueId);
            
            // Trigger Notification
            sendPushNotification(`Pengingat: ${rem.title} ⏰`, {
              body: rem.description || `Waktunya melaksanakan jadwal checklist ${rem.title}!`,
              soundType: rem.sound
            });
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [reminders]);

  // Background Cloud Auto-Sync (Every 25 seconds)
  useEffect(() => {
    if (!profile.syncCode) return;

    const performBackgroundSync = async () => {
      try {
        setSyncStatus('syncing');
        const config = loadStorageConfig();
        const res = await pullCloudData(profile.syncCode, config);
        if (res.packet) {
          applySyncPacket(res.packet);
          refreshFromStorage();
        }
        setSyncStatus('synced');
      } catch {
        setSyncStatus('local');
      }
    };

    const interval = setInterval(performBackgroundSync, 25000);
    return () => clearInterval(interval);
  }, [profile.syncCode, refreshFromStorage]);

  // Handle Profile Update
  const handleProfileChange = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  // All Items in catalog
  const allCurriculumItems = useMemo<ChecklistItem[]>(() => {
    return [
      ...IBADAH_HARIAN,
      ...TUGAS_PEKERJAAN_RUMAH,
      ...SURAT_JUZ_30,
      ...HADITS_SISWA_HEBAT,
      ...DOA_SEHARI_HARI,
      ...DOA_SHOLAT_PRAKTIK,
      ...customItems
    ];
  }, [customItems]);

  // Filter items by grade (if selected) and category
  const filteredCurriculumItems = useMemo<ChecklistItem[]>(() => {
    let items = allCurriculumItems;

    // Filter by grade target if specified
    if (profile.grade !== 'all') {
      items = items.filter((item) => {
        if (!item.gradeLevel) return true; // generic items always included
        // Match specific grade or earlier
        if (profile.grade === 'kelas_1') {
          return item.gradeLevel === 'kelas_1';
        }
        if (profile.grade === 'kelas_2') {
          return item.gradeLevel === 'kelas_1' || item.gradeLevel === 'kelas_2';
        }
        if (profile.grade === 'kelas_3') {
          return ['kelas_1', 'kelas_2', 'kelas_3'].includes(item.gradeLevel);
        }
        if (profile.grade === 'kelas_4') {
          return ['kelas_1', 'kelas_2', 'kelas_3', 'kelas_4'].includes(item.gradeLevel);
        }
        if (profile.grade === 'kelas_5') {
          return ['kelas_1', 'kelas_2', 'kelas_3', 'kelas_4', 'kelas_5'].includes(item.gradeLevel);
        }
        return true;
      });
    }

    if (selectedCategory !== 'semua') {
      items = items.filter((i) => i.category === selectedCategory);
    }

    return items;
  }, [allCurriculumItems, profile.grade, selectedCategory]);

  // Current day record
  const currentDayRecord: DayRecord = useMemo(() => {
    return records[currentDate] || {};
  }, [records, currentDate]);

  // Category counts for CategoryTabs
  const categoryCounts = useMemo<Record<ItemCategory, { total: number; completed: number }>>(() => {
    const map: Record<ItemCategory, { total: number; completed: number }> = {
      semua: { total: 0, completed: 0 },
      ibadah_wajib: { total: 0, completed: 0 },
      tugas_rumah: { total: 0, completed: 0 },
      surat: { total: 0, completed: 0 },
      hadits: { total: 0, completed: 0 },
      doa_harian: { total: 0, completed: 0 },
      doa_sholat: { total: 0, completed: 0 },
      tugas_kustom: { total: 0, completed: 0 }
    };

    allCurriculumItems.forEach((item) => {
      const isDone = Boolean(currentDayRecord[item.id]?.completed);
      map.semua.total++;
      if (isDone) map.semua.completed++;

      if (map[item.category]) {
        map[item.category].total++;
        if (isDone) map[item.category].completed++;
      }
    });

    return map;
  }, [allCurriculumItems, currentDayRecord]);

  // Streak counter (consecutive completed days with at least 1 checklist completed)
  const streakCount = useMemo(() => {
    let streak = 0;
    const sortedDates = Object.keys(records).sort().reverse();
    const today = getTodayDateStr();

    for (const d of sortedDates) {
      const dayRec = records[d];
      const hasCompletedItem = Object.values(dayRec || {}).some((i) => (i as ItemProgress)?.completed);
      if (hasCompletedItem) {
        streak++;
      } else if (d !== today) {
        break;
      }
    }
    return Math.max(streak, 1);
  }, [records]);

  // Checklist Actions
  const handleToggleItem = (itemId: string, currentCompleted: boolean) => {
    const newCompleted = !currentCompleted;
    if (newCompleted) {
      audioEngine.playCheckSound();
    } else {
      audioEngine.playUncheckSound();
    }

    const updatedRecords: AppRecords = {
      ...records,
      [currentDate]: {
        ...(records[currentDate] || {}),
        [itemId]: {
          ...(records[currentDate]?.[itemId] || {}),
          completed: newCompleted,
          status: newCompleted ? records[currentDate]?.[itemId]?.status || 'lancar' : 'belum',
          completedAt: newCompleted ? new Date().toISOString() : undefined
        }
      }
    };

    setRecords(updatedRecords);
    saveRecords(updatedRecords);
  };

  const handleUpdateStatus = (itemId: string, status: CompletionStatus) => {
    const updatedRecords: AppRecords = {
      ...records,
      [currentDate]: {
        ...(records[currentDate] || {}),
        [itemId]: {
          ...(records[currentDate]?.[itemId] || { completed: true }),
          status
        }
      }
    };
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
  };

  const handleSaveProgress = (
    itemId: string,
    completed: boolean,
    status: CompletionStatus,
    note: string,
    paraf: string
  ) => {
    const updatedRecords: AppRecords = {
      ...records,
      [currentDate]: {
        ...(records[currentDate] || {}),
        [itemId]: {
          completed,
          status,
          note,
          paraf,
          completedAt: completed ? new Date().toISOString() : undefined
        }
      }
    };
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
  };

  const handleMarkAllToday = () => {
    const newDayRecord: DayRecord = { ...(records[currentDate] || {}) };
    filteredCurriculumItems.forEach((item) => {
      newDayRecord[item.id] = {
        ...(newDayRecord[item.id] || {}),
        completed: true,
        status: newDayRecord[item.id]?.status || 'lancar',
        completedAt: new Date().toISOString()
      };
    });

    const updatedRecords = { ...records, [currentDate]: newDayRecord };
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
  };

  const handleResetToday = () => {
    if (confirm(`Apakah Anda yakin ingin mereset checklist untuk tanggal ${currentDate}?`)) {
      const updatedRecords = { ...records };
      delete updatedRecords[currentDate];
      setRecords(updatedRecords);
      saveRecords(updatedRecords);
      audioEngine.playUncheckSound();
    }
  };

  // Open Voice Hafalan & Tajweed Test Modal
  const handleOpenVoiceTestModal = (item?: ChecklistItem) => {
    setVoiceTestInitialItem(item || null);
    setIsVoiceTestModalOpen(true);
  };

  // Save Voice Hafalan Test Evaluation
  const handleSaveVoiceTestResult = (
    itemId: string,
    score: number,
    gradeLabel: string,
    status: CompletionStatus,
    note: string
  ) => {
    const updatedRecords: AppRecords = {
      ...records,
      [currentDate]: {
        ...(records[currentDate] || {}),
        [itemId]: {
          ...(records[currentDate]?.[itemId] || {}),
          completed: true,
          status,
          note,
          lastTestScore: score,
          lastTestGrade: gradeLabel,
          lastTestedAt: new Date().toISOString(),
          completedAt: records[currentDate]?.[itemId]?.completedAt || new Date().toISOString()
        }
      }
    };
    setRecords(updatedRecords);
    saveRecords(updatedRecords);
  };

  // Custom Tasks Add / Delete
  const handleAddCustomTask = (item: ChecklistItem) => {
    const updated = [item, ...customItems];
    setCustomItems(updated);
    saveCustomItems(updated);
  };

  const handleDeleteCustomTask = (itemId: string) => {
    if (confirm('Hapus tugas kustom ini?')) {
      const updated = customItems.filter((i) => i.id !== itemId);
      setCustomItems(updated);
      saveCustomItems(updated);
    }
  };

  // Save Reminders
  const handleSaveReminders = (newReminders: ReminderSetting[]) => {
    setReminders(newReminders);
    saveReminders(newReminders);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-200">
      
      {/* Top Sticky Navbar */}
      <Navbar
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        profile={profile}
        onProfileChange={handleProfileChange}
        onOpenReminderModal={() => setIsReminderModalOpen(true)}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAddTaskModal={() => setIsAddTaskModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenVoiceTestModal={() => handleOpenVoiceTestModal()}
        activeRemindersCount={reminders.filter((r) => r.enabled).length}
        isSyncing={isSyncing}
        syncStatus={syncStatus}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7 space-y-6">
        
        {/* Daily Motivation & Progress Banner with Student Name */}
        <DailyProgressBanner
          totalItems={filteredCurriculumItems.length}
          completedItems={
            filteredCurriculumItems.filter((i) => currentDayRecord[i.id]?.completed).length
          }
          streakCount={streakCount}
          onMarkAllToday={handleMarkAllToday}
          onResetToday={handleResetToday}
          currentDate={currentDate}
          profile={profile}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenVoiceTestModal={() => handleOpenVoiceTestModal()}
        />

        {/* Category Horizontal Filter Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Interactive Checklist Cards View */}
        <ChecklistView
          items={filteredCurriculumItems}
          dayRecord={currentDayRecord}
          currentDate={currentDate}
          onToggleItem={handleToggleItem}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNote={(itemId, note, paraf) => {
            const cur = currentDayRecord[itemId] || { completed: true };
            handleSaveProgress(itemId, cur.completed, cur.status || 'lancar', note, paraf || '');
          }}
          onDeleteItem={handleDeleteCustomTask}
          onOpenDetailModal={(item) => setDetailModalItem(item)}
          onOpenVoiceTestModal={(item) => handleOpenVoiceTestModal(item)}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Mutaba'ah Siswa Hebat &bull; Checklist Harian Juz 30, Hadits, Do'a & Sholat
          </p>
          <div className="flex items-center gap-4 text-emerald-800 font-semibold">
            <button
              onClick={() => handleOpenVoiceTestModal()}
              className="text-amber-700 hover:underline cursor-pointer font-bold"
            >
              🎙️ Tes Suara AI
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Identitas Siswa ({profile.name})
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Rekapitulasi Cetak
            </button>
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Sinkronisasi Cloud ({profile.syncCode})
            </button>
            <button
              onClick={() => setIsReminderModalOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Alarm & Notifikasi
            </button>
          </div>
        </div>
      </footer>

      {/* Student Profile Identity Modal */}
      {isProfileModalOpen && (
        <StudentProfileModal
          profile={profile}
          onProfileChange={handleProfileChange}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {/* Item Detail & Memorization Modal */}
      {detailModalItem && (
        <ItemDetailModal
          item={detailModalItem}
          dayRecord={currentDayRecord}
          currentDate={currentDate}
          onClose={() => setDetailModalItem(null)}
          onSaveProgress={handleSaveProgress}
          onOpenVoiceTestModal={(item) => handleOpenVoiceTestModal(item)}
        />
      )}

      {/* Voice Hafalan & Tajweed AI Test Modal */}
      {isVoiceTestModalOpen && (
        <VoiceHafalanTestModal
          initialItem={voiceTestInitialItem}
          allItems={allCurriculumItems}
          profile={profile}
          currentDate={currentDate}
          onClose={() => setIsVoiceTestModalOpen(false)}
          onSaveTestResult={handleSaveVoiceTestResult}
        />
      )}

      {/* Custom Reminder & Push Notification Modal */}
      {isReminderModalOpen && (
        <ReminderModal
          reminders={reminders}
          onSaveReminders={handleSaveReminders}
          onClose={() => setIsReminderModalOpen(false)}
        />
      )}

      {/* Real-time Multi-Device Sync Modal */}
      {isSyncModalOpen && (
        <SyncModal
          profile={profile}
          onProfileChange={handleProfileChange}
          onClose={() => setIsSyncModalOpen(false)}
          onRefreshData={refreshFromStorage}
        />
      )}

      {/* Printable Report / Mutabaah Book Modal */}
      {isReportModalOpen && (
        <ReportModal
          profile={profile}
          onProfileChange={handleProfileChange}
          records={records}
          customItems={customItems}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* Add Custom Task Modal */}
      {isAddTaskModalOpen && (
        <AddTaskModal
          onAddTask={handleAddCustomTask}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      )}

    </div>
  );
}
