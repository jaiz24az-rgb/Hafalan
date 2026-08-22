import React, { useState } from 'react';
import {
  X,
  Bell,
  Plus,
  Trash2,
  Volume2,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { ReminderSetting, ItemCategory } from '../types';
import {
  audioEngine,
  requestNotificationPermission,
  sendPushNotification
} from '../utils/soundAndNotification';

interface ReminderModalProps {
  reminders: ReminderSetting[];
  onSaveReminders: (reminders: ReminderSetting[]) => void;
  onClose: () => void;
}

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const ReminderModal: React.FC<ReminderModalProps> = ({
  reminders,
  onSaveReminders,
  onClose
}) => {
  const [items, setItems] = useState<ReminderSetting[]>(reminders);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );
  const [isAdding, setIsAdding] = useState(false);

  // New Reminder Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('06:00');
  const [newCategory, setNewCategory] = useState<ItemCategory>('ibadah_wajib');
  const [newSound, setNewSound] = useState<'adzan' | 'chime' | 'gentle' | 'bell'>('chime');
  const [newDays, setNewDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [newDesc, setNewDesc] = useState('');

  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermissionStatus(status);
    if (status === 'granted') {
      sendPushNotification('Izin Notifikasi Aktif! 🔔', {
        body: "Aplikasi Mutaba'ah Siswa Hebat siap mengingatkan jadwal checklist hafalan dan sholat Anda tepat waktu.",
        soundType: 'chime'
      });
    }
  };

  const handleToggleReminder = (id: string) => {
    const updated = items.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    setItems(updated);
    onSaveReminders(updated);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = items.filter((r) => r.id !== id);
    setItems(updated);
    onSaveReminders(updated);
  };

  const handleTestSoundAndPush = (reminder: ReminderSetting) => {
    sendPushNotification(`Pengingat: ${reminder.title} ⏰`, {
      body: reminder.description || `Waktunya melaksanakan checklist ${reminder.title} (${reminder.time} WIB)`,
      soundType: reminder.sound
    });
  };

  const handleAddNewReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReminder: ReminderSetting = {
      id: 'rem_' + Date.now(),
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      sound: newSound,
      days: newDays,
      description: newDesc.trim() || undefined,
      enabled: true
    };

    const updated = [...items, newReminder];
    setItems(updated);
    onSaveReminders(updated);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);

    // Give audio feedback
    audioEngine.playSound(newSound);
  };

  const toggleDay = (dayIndex: number) => {
    if (newDays.includes(dayIndex)) {
      if (newDays.length > 1) {
        setNewDays(newDays.filter((d) => d !== dayIndex));
      }
    } else {
      setNewDays([...newDays, dayIndex].sort());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white backdrop-blur-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Pengingat & Push Notifikasi Kustom
              </h3>
              <p className="text-xs text-emerald-200">
                Atur alarm otomatis untuk sholat, muroja'ah surat, hadits, dan doa harian.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Permission Banner */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              permissionStatus === 'granted'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Bell className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold">
                  Status Izin Push Notifikasi:{' '}
                  <span className="uppercase">{permissionStatus}</span>
                </p>
                <p className="text-[11px] opacity-80 mt-0.5">
                  {permissionStatus === 'granted'
                    ? 'Notifikasi aktif dan akan berdering tepat pada jam yang dijadwalkan.'
                    : 'Aktifkan izin peramban agar Anda menerima pop-up push alarm saat jam tiba.'}
                </p>
              </div>
            </div>

            {permissionStatus !== 'granted' && (
              <button
                onClick={handleRequestPermission}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors shadow-2xs cursor-pointer"
              >
                Aktifkan Notifikasi
              </button>
            )}
          </div>

          {/* Add New Reminder Form / Button */}
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-dashed border-emerald-300 text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Jadwal Pengingat Baru</span>
            </button>
          ) : (
            <form
              onSubmit={handleAddNewReminder}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Jadwal Pengingat Baru
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Batal
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Judul Pengingat:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muroja'ah Surat Al-Mulk Sebelum Tidur"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Waktu (Jam:Menit):
                  </label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kategori:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ItemCategory)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ibadah_wajib">Sholat & Ibadah</option>
                    <option value="tugas_rumah">Pekerjaan Rumah & Bantuan</option>
                    <option value="surat">Surat Juz 30</option>
                    <option value="hadits">36 Hadits Siswa Hebat</option>
                    <option value="doa_harian">36 Doa Sehari-hari</option>
                    <option value="doa_sholat">Doa Sholat & Praktik</option>
                    <option value="tugas_kustom">Tugas Kustom / PR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Pilihan Nada Suara:
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={newSound}
                      onChange={(e) =>
                        setNewSound(e.target.value as 'adzan' | 'chime' | 'gentle' | 'bell')
                      }
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="adzan">Melodi Adzan Syahdu</option>
                      <option value="chime">Bell Chime Bersih</option>
                      <option value="gentle">Gentle Soft Tone</option>
                      <option value="bell">Harmonic Chime</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => audioEngine.playSound(newSound)}
                      className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg"
                      title="Tes Suara"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Ulangi Setiap Hari:
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {DAY_NAMES.map((dayName, idx) => {
                    const isSelected = newDays.includes(idx);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleDay(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {dayName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Pesan Notifikasi Tambahan (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jangan lupa berdoa dan baca ayat kursi..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Pengingat
                </button>
              </div>
            </form>
          )}

          {/* List of Existing Reminders */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Daftar Pengingat Aktif ({items.length})
            </h4>

            {items.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  reminder.enabled
                    ? 'bg-white border-emerald-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-center px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100 shrink-0">
                    <span className="text-sm font-black text-emerald-800 tracking-tight">
                      {reminder.time}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {reminder.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 flex-wrap">
                      <span className="text-emerald-700 font-medium">
                        Suara: {reminder.sound}
                      </span>
                      <span>•</span>
                      <span>
                        {reminder.days.length === 7
                          ? 'Setiap Hari'
                          : reminder.days.map((d) => DAY_NAMES[d]).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTestSoundAndPush(reminder)}
                    className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors"
                    title="Uji Notifikasi & Suara Sekarang"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleReminder(reminder.id)}
                    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      reminder.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        reminder.enabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Pengingat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
