import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Mic,
  Square,
  RotateCcw,
  Play,
  Pause,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  BookOpen,
  Volume2,
  Share2,
  ArrowRight,
  Check,
  ChevronDown,
  RefreshCw,
  FileText,
  Clock,
  Zap,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ChecklistItem,
  CompletionStatus,
  HafalanMistake,
  HafalanTestResult,
  UserProfile
} from '../types';
import { audioEngine } from '../utils/soundAndNotification';

interface VoiceHafalanTestModalProps {
  initialItem?: ChecklistItem | null;
  allItems: ChecklistItem[];
  profile: UserProfile;
  currentDate: string;
  onClose: () => void;
  onSaveTestResult: (
    itemId: string,
    score: number,
    gradeLabel: string,
    status: CompletionStatus,
    note: string
  ) => void;
}

export const VoiceHafalanTestModal: React.FC<VoiceHafalanTestModalProps> = ({
  initialItem,
  allItems,
  profile,
  currentDate,
  onClose,
  onSaveTestResult
}) => {
  // Available recitation items (Surat, Hadits, Doa Harian, Doa Sholat)
  const testableItems = allItems.filter(
    (item) =>
      item.arabic ||
      item.category === 'surat' ||
      item.category === 'hadits' ||
      item.category === 'doa_harian' ||
      item.category === 'doa_sholat'
  );

  const [selectedItem, setSelectedItem] = useState<ChecklistItem>(
    initialItem || testableItems[0] || allItems[0]
  );

  // Tab mode: 'mic' | 'upload' | 'text'
  const [testMode, setTestMode] = useState<'mic' | 'upload' | 'text'>('mic');

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcriptInput, setTranscriptInput] = useState('');

  // Evaluation states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<HafalanTestResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecordingCleanup();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const stopRecordingCleanup = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
  };

  // Start Live Audio Recording
  const startRecording = async () => {
    setErrorMsg(null);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordDuration(0);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMsg(
        'Browser atau perangkat ini tidak mendukung akses mikrofon langsung (atau memerlukan koneksi HTTPS aman). Anda dapat menggunakan tab "Unggah Audio" atau "Uji Teks" untuk tetap menguji hafalan.'
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Audio visualizer setup
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const updateMeter = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();

      // Determine mimeType
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/ogg';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const combinedBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(combinedBlob);
        const url = URL.createObjectURL(combinedBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        stopRecordingCleanup();
        setIsRecording(false);
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      stopRecordingCleanup();
      setIsRecording(false);

      const errObj = err as Error | { name?: string; message?: string };
      const errName = errObj?.name || '';
      const errMsg = String(errObj?.message || '');

      console.warn('Microphone permission info:', errName, errMsg);

      if (
        errName === 'NotAllowedError' ||
        errName === 'PermissionDeniedError' ||
        errName === 'AbortError' ||
        errMsg.toLowerCase().includes('dismissed') ||
        errMsg.toLowerCase().includes('denied') ||
        errMsg.toLowerCase().includes('permission') ||
        errMsg.toLowerCase().includes('overlay')
      ) {
        setErrorMsg(
          'Izin mikrofon dibatalkan atau terhalang sistem Android / overlay. Jika muncul pesan sistem "Tutup balon atau overlay", tutup/geser balon chat WhatsApp/Messenger atau Game Turbo di layar, lalu klik "Coba Rekam Lagi" atau gunakan tab "Unggah Audio".'
        );
      } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
        setErrorMsg('Perangkat mikrofon tidak terdeteksi. Silakan gunakan tab "Unggah Audio" atau "Uji Teks".');
      } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
        setErrorMsg('Mikrofon sedang dipakai aplikasi lain (misal panggilan WhatsApp / telepon). Harap tutup aplikasi tersebut lalu coba lagi.');
      } else {
        setErrorMsg(
          'Tidak dapat mengakses mikrofon (' + (errName || 'Izin ditolak') + '). Anda tetap dapat menguji hafalan menggunakan tab "Unggah Audio" atau "Uji Teks".'
        );
      }
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setErrorMsg('Harap pilih file audio yang valid (WAV, MP3, M4A, WebM, dll).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Ukuran file audio terlalu besar. Maksimal 20 MB.');
      return;
    }

    setErrorMsg(null);
    setAudioBlob(file);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  // Play / Pause Audio
  const togglePlayAudio = () => {
    if (!audioElementRef.current) return;
    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // Format Duration MM:SS
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Submit for AI Tajweed & Hafalan Evaluation
  const handleAnalyzeHafalan = async () => {
    if (!selectedItem) {
      setErrorMsg('Pilih target hafalan yang akan diuji terlebih dahulu.');
      return;
    }

    if (testMode !== 'text' && !audioBlob) {
      setErrorMsg('Harap rekam suara Anda terlebih dahulu atau unggah rekaman audio.');
      return;
    }

    if (testMode === 'text' && !transcriptInput.trim()) {
      setErrorMsg('Harap masukkan teks lafadz bacaan hafalan Anda.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisStep(1);

    // Step progression animation
    const step1 = setTimeout(() => setAnalysisStep(2), 1500);
    const step2 = setTimeout(() => setAnalysisStep(3), 3200);

    try {
      let audioBase64: string | undefined = undefined;
      let mimeType: string | undefined = undefined;

      if (audioBlob) {
        mimeType = audioBlob.type || 'audio/webm';
        audioBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            const base64Data = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64Data);
          };
          reader.onerror = () => reject(new Error('Gagal membaca data audio.'));
          reader.readAsDataURL(audioBlob);
        });
      }

      const response = await fetch('/api/hafalan/test-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType,
          transcriptText: testMode === 'text' ? transcriptInput : undefined,
          item: selectedItem,
          studentName: profile.name,
          grade: profile.grade
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.evaluation) {
        throw new Error('Format hasil evaluasi AI tidak sesuai.');
      }

      const evalData = data.evaluation;
      const testResult: HafalanTestResult = {
        id: 'test_' + Date.now(),
        itemId: selectedItem.id,
        itemTitle: selectedItem.title,
        itemCategory: selectedItem.category,
        studentName: profile.name,
        timestamp: new Date().toISOString(),
        score: evalData.score || 0,
        gradeLabel: evalData.gradeLabel || 'Selesai',
        accuracyScore: evalData.accuracyScore || 0,
        tajweedScore: evalData.tajweedScore || 0,
        fluencyScore: evalData.fluencyScore || 0,
        transcription: evalData.transcription || '',
        correctParts: evalData.correctParts || [],
        mistakes: evalData.mistakes || [],
        tajweedNotes: evalData.tajweedNotes || [],
        recommendations: evalData.recommendations || [],
        summary: evalData.summary || '',
        audioBlobUrl: audioUrl || undefined
      };

      setResult(testResult);

      // Trigger Celebration if score is high
      if (testResult.score >= 80) {
        audioEngine.playVictorySound();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti fails
        }
      } else {
        audioEngine.playCheckSound();
      }
    } catch (err: unknown) {
      console.error('AI evaluation failed:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Terjadi kendala saat menganalisis rekaman suara. Silakan coba lagi.';
      setErrorMsg(msg);
    } finally {
      clearTimeout(step1);
      clearTimeout(step2);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  // Save to student record
  const handleSaveToMutabaah = () => {
    if (!result || !selectedItem) return;

    let status: CompletionStatus = 'lancar';
    if (result.score >= 85) {
      status = 'mutqin';
    } else if (result.score < 70) {
      status = 'proses';
    }

    const note = `[Tes Suara AI: ${result.score}% - ${result.gradeLabel}] ${result.summary.slice(
      0,
      120
    )}`;

    onSaveTestResult(selectedItem.id, result.score, result.gradeLabel, status, note);
    audioEngine.playCheckSound();
    onClose();
  };

  // Share / Copy Results
  const handleShareResult = () => {
    if (!result || !selectedItem) return;

    let text = `*Hasil Ujian Hafalan & Tajwid Suara AI*\n`;
    text += `👤 Nama Siswa: ${profile.name} (${profile.grade.replace('_', ' ').toUpperCase()})\n`;
    text += `📖 Target: ${selectedItem.title} (${selectedItem.category.replace('_', ' ')})\n`;
    text += `📅 Tanggal: ${currentDate}\n`;
    text += `🏆 Skor Akhir: *${result.score}%* [${result.gradeLabel}]\n\n`;
    text += `📊 *Rincian Nilai:*\n`;
    text += `• Akurasi Lafadz & Ayat: ${result.accuracyScore}%\n`;
    text += `• Kaidah Hukum Tajwid: ${result.tajweedScore}%\n`;
    text += `• Kelancaran & Adab: ${result.fluencyScore}%\n\n`;

    if (result.correctParts && result.correctParts.length > 0) {
      text += `✅ *Bagian yang Sudah Sangat Baik:*\n`;
      result.correctParts.forEach((p) => {
        text += `• ${p}\n`;
      });
      text += `\n`;
    }

    if (result.mistakes && result.mistakes.length > 0) {
      text += `🔍 *Catatan Koreksi Tajwid & Lafadz (${result.mistakes.length}):*\n`;
      result.mistakes.slice(0, 5).forEach((m, idx) => {
        text += `${idx + 1}. [${m.type.toUpperCase()}] ${m.location}: Dibaca "${m.studentPronounced}" ➔ Seharusnya "${m.expectedPronounced}" (${m.explanation})\n`;
      });
      text += `\n`;
    }

    text += `💬 *Ulasan Ustadz AI:*\n"${result.summary}"\n\n`;
    text += `_Aplikasi Mutaba'ah & Checklist Hafalan Siswa Hebat Realtime_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopyResult = () => {
    if (!result || !selectedItem) return;

    let text = `Hasil Ujian Hafalan & Tajwid Suara AI\n`;
    text += `Nama Siswa: ${profile.name}\n`;
    text += `Target: ${selectedItem.title}\n`;
    text += `Skor: ${result.score}% (${result.gradeLabel})\n`;
    text += `Akurasi: ${result.accuracyScore}% | Tajwid: ${result.tajweedScore}% | Kelancaran: ${result.fluencyScore}%\n`;
    text += `Ulasan: ${result.summary}`;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Color theme helper for score
  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-500', light: 'bg-emerald-50 text-emerald-900' };
    if (score >= 80) return { bg: 'bg-teal-500', text: 'text-teal-700', border: 'border-teal-500', light: 'bg-teal-50 text-teal-900' };
    if (score >= 70) return { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-500', light: 'bg-amber-50 text-amber-900' };
    if (score >= 60) return { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-500', light: 'bg-orange-50 text-orange-900' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-500', light: 'bg-rose-50 text-rose-900' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-xs font-semibold backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Ujian Hafalan & Tajwid Suara AI
              </span>
              <span className="text-xs text-emerald-200 hidden sm:inline">
                • Siswa: <strong className="text-white">{profile.name}</strong>
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Tes Hafalan & Tajwid Otomatis
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              Evaluasi akurasi kata, makharijul huruf, dan hukum tajwid secara objektif dan mendidik.
            </p>
          </div>

          <button
            id="btn-close-voice-modal"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Target Item Selector Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Target Ujian Hafalan:
              </label>

              {/* Selector */}
              <div className="relative flex-1 sm:max-w-md">
                <select
                  id="select-test-item"
                  value={selectedItem.id}
                  onChange={(e) => {
                    const found = allItems.find((i) => i.id === e.target.value);
                    if (found) {
                      setSelectedItem(found);
                      setResult(null); // reset result
                    }
                  }}
                  className="w-full text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-slate-300 rounded-xl px-3 py-2 pr-8 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
                >
                  <optgroup label="📖 Surat Juz 30">
                    {allItems
                      .filter((i) => i.category === 'surat')
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          #{i.number} {i.title} {i.targetRange ? `(${i.targetRange})` : ''}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="📜 36 Hadits Pilihan">
                    {allItems
                      .filter((i) => i.category === 'hadits')
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          Hadits #{i.number}: {i.title}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="🤲 36 Do'a Harian">
                    {allItems
                      .filter((i) => i.category === 'doa_harian')
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          Do'a #{i.number}: {i.title}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="🕌 Do'a Sholat & Praktik">
                    {allItems
                      .filter((i) => i.category === 'doa_sholat')
                      .map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.title}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Target Arabic Preview */}
            {selectedItem.arabic && (
              <div className="bg-emerald-950/5 p-3 rounded-xl border border-emerald-800/10">
                <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold mb-1">
                  <span>Teks Asli Rujukan:</span>
                  {selectedItem.targetRange && <span>{selectedItem.targetRange}</span>}
                </div>
                <p className="font-mushaf arabic-mushaf-text text-lg sm:text-xl text-right text-emerald-950 font-bold">
                  {selectedItem.arabic}
                </p>
                {selectedItem.latin && (
                  <p className="text-xs text-slate-600 italic mt-1 line-clamp-2">
                    "{selectedItem.latin}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Test Input Mode Tabs (Mic vs Upload vs Text) */}
          {!result && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl border border-slate-200 max-w-md mx-auto text-xs font-semibold">
                <button
                  id="tab-mode-mic"
                  onClick={() => setTestMode('mic')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                    testMode === 'mic'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rekam Suara (Mic)</span>
                </button>
                <button
                  id="tab-mode-upload"
                  onClick={() => setTestMode('upload')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                    testMode === 'upload'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unggah Audio</span>
                </button>
                <button
                  id="tab-mode-text"
                  onClick={() => setTestMode('text')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                    testMode === 'text'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Uji Teks</span>
                </button>
              </div>

              {/* Mode 1: Live Microphone Recording */}
              {testMode === 'mic' && (
                <div className="bg-gradient-to-b from-slate-50 to-emerald-50/30 p-6 rounded-3xl border border-emerald-100 text-center space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-slate-800">
                      {isRecording
                        ? '🎙️ Sedang Merekam Suara Hafalan...'
                        : audioBlob
                        ? '✅ Rekaman Siap Diuji'
                        : 'Tekan Tombol Mikrofon untuk Memulai'}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Bacalah hafalan target dengan tartil, jelas, dan perhatikan panjang-pendek serta tajwidnya.
                    </p>
                  </div>

                  {/* Meter / Timer */}
                  <div className="flex flex-col items-center justify-center gap-3">
                    {/* Big Record Button */}
                    <div className="relative">
                      {isRecording && (
                        <div
                          className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"
                          style={{ transform: `scale(${1 + audioLevel / 100})` }}
                        />
                      )}
                      <button
                        id="btn-toggle-record"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all transform active:scale-95 cursor-pointer ${
                          isRecording
                            ? 'bg-red-600 hover:bg-red-700 ring-4 ring-red-200 shadow-red-500/30'
                            : 'bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-100 shadow-emerald-500/30'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-8 h-8 fill-current" />
                            <span className="text-[10px] font-bold mt-1">STOP</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-8 h-8" />
                            <span className="text-[10px] font-bold mt-1">REKAM</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Timer & Audio Level */}
                    <div className="space-y-1">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-slate-800">
                        {formatSeconds(recordDuration)}
                      </div>
                      {isRecording && (
                        <div className="w-48 sm:w-64 h-2.5 bg-slate-200 rounded-full overflow-hidden mx-auto">
                          <div
                            className="h-full bg-emerald-500 transition-all duration-75"
                            style={{ width: `${Math.min(100, Math.max(8, audioLevel * 1.5))}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audio Playback Controls if recorded */}
                  {audioUrl && !isRecording && (
                    <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs max-w-md mx-auto flex items-center justify-between gap-3">
                      <audio
                        ref={audioElementRef}
                        src={audioUrl}
                        onEnded={() => setIsPlayingAudio(false)}
                        className="hidden"
                      />
                      <button
                        id="btn-play-preview"
                        onClick={togglePlayAudio}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Jeda</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Dengarkan Hasil</span>
                          </>
                        )}
                      </button>

                      <span className="text-xs text-slate-500 font-medium">
                        Durasi: {formatSeconds(recordDuration)}
                      </span>

                      <button
                        id="btn-rerecord"
                        onClick={startRecording}
                        className="flex items-center gap-1 text-xs text-slate-600 hover:text-red-600 px-2 py-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Rekam Ulang"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Rekam Ulang</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 2: Audio File Upload */}
              {testMode === 'upload' && (
                <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 text-center space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">
                      Pilih atau Seret File Audio Rekaman
                    </h4>
                    <p className="text-xs text-slate-500">
                      Format didukung: WAV, MP3, M4A, AAC, WebM, OGG (Maks 20MB)
                    </p>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Pilih File Audio
                  </button>

                  {audioUrl && (
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between max-w-sm mx-auto">
                      <span className="text-xs text-emerald-800 font-semibold truncate">
                        ✓ Audio siap dianalisis
                      </span>
                      <audio controls src={audioUrl} className="h-8 max-w-[180px]" />
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: Manual Text Input */}
              {testMode === 'text' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Tuliskan Lafadz / Transkripsi Hafalan Siswa:
                  </label>
                  <textarea
                    rows={4}
                    value={transcriptInput}
                    onChange={(e) => setTranscriptInput(e.target.value)}
                    placeholder="Ketikkan bacaan hafalan dalam huruf Arab atau Latin untuk diuji kesesuaian kata dan harakatnya..."
                    className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500">
                    💡 Berguna jika sedang di lingkungan hening tanpa mic atau ingin menguji ingatan tulisan.
                  </p>
                </div>
              )}

              {/* Error Message & Troubleshooting */}
              {errorMsg && (
                <div className="p-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl text-slate-800 text-xs space-y-3 shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-amber-900">Kendala Izin Mikrofon Android:</p>
                      <p className="text-amber-800 leading-relaxed">{errorMsg}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-[11px] text-slate-700 space-y-1.5">
                    <p className="font-semibold text-emerald-900 flex items-center gap-1">
                      💡 Cara Mengatasi Peringatan Android:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
                      <li>
                        <strong>Tutup balon/ikon melayang:</strong> Seret/hapus balon chat WhatsApp/Messenger, ikon perekam layar, atau Bola Bantuan (Assistive Touch) ke bagian bawah layar.
                      </li>
                      <li>
                        Lalu tekan tombol <strong>"Coba lagi"</strong> pada dialog izin Android Anda.
                      </li>
                      <li>
                        Atau pilih alternatif mudah di bawah ini tanpa perlu izin mic:
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setTestMode('upload');
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Gunakan Opsi Unggah Audio
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setTestMode('text');
                      }}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      Gunakan Uji Teks
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        startRecording();
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Coba Rekam Lagi
                    </button>
                  </div>
                </div>
              )}

              {/* Action Submit Button */}
              <div className="pt-2 flex items-center justify-center">
                <button
                  id="btn-evaluate-hafalan"
                  disabled={isAnalyzing || isRecording || (!audioBlob && testMode !== 'text')}
                  onClick={handleAnalyzeHafalan}
                  className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer ${
                    isAnalyzing || isRecording || (!audioBlob && testMode !== 'text')
                      ? 'bg-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/30 active:scale-98'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>
                        {analysisStep === 1
                          ? 'Mendengarkan rekaman suara...'
                          : analysisStep === 2
                          ? 'Memeriksa makharijul huruf & lafadz...'
                          : 'Menghitung tajwid & skor hafalan...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>Uji Hafalan & Analisis Tajwid Sekarang</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* RESULT CARD VIEW (After Evaluation Complete) */}
          {/* ========================================================================= */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Overall Score Badge Card */}
              <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Left: Grade & Title */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-semibold">
                        {result.itemTitle}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                        {result.gradeLabel}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Hasil Ujian Hafalan: {result.studentName}
                    </h3>

                    <p className="text-xs sm:text-sm text-emerald-200 max-w-md leading-relaxed">
                      "{result.summary}"
                    </p>
                  </div>

                  {/* Right: Big Circular Score Presentasi */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md shadow-inner">
                      <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight">
                        {result.score}%
                      </span>
                      <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest mt-0.5">
                        Skor Presentasi
                      </span>
                    </div>
                  </div>

                </div>

                {/* Background decorative glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* 3 Detailed Sub-Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Accuracy */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Akurasi Lafadz</span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      {result.accuracyScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${result.accuracyScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ketepatan kata, ayat, dan urutan hafalan.
                  </p>
                </div>

                {/* 2. Tajweed */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Kaidah Tajwid</span>
                    <span className="text-sm font-extrabold text-teal-700">
                      {result.tajweedScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all"
                      style={{ width: `${result.tajweedScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Hukum mad, ghunnah, ikhfa, makhraj, dll.
                  </p>
                </div>

                {/* 3. Fluency */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Kelancaran</span>
                    <span className="text-sm font-extrabold text-amber-700">
                      {result.fluencyScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${result.fluencyScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Irama bacaan tartil & ketepatan waqaf.
                  </p>
                </div>
              </div>

              {/* Transcription Heard */}
              {result.transcription && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    Transkripsi Suara Siswa yang Terdeteksi:
                  </h4>
                  <p className="font-mushaf arabic-mushaf-text text-base sm:text-lg text-right text-emerald-950 font-semibold">
                    {result.transcription}
                  </p>
                </div>
              )}

              {/* Correct Parts (Bagian yang Benar & Fasih) */}
              {result.correctParts && result.correctParts.length > 0 && (
                <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bagian yang Sudah Benar & Fasih ({result.correctParts.length}):
                  </h4>
                  <div className="space-y-1.5">
                    {result.correctParts.map((part, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900 bg-white/80 p-2.5 rounded-xl border border-emerald-100"
                      >
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{part}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mistakes & Tajweed Corrections (Catatan Kesalahan & Perbaikan) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Catatan Kesalahan & Bimbingan Tajwid (
                    {result.mistakes ? result.mistakes.length : 0})
                  </span>
                  {result.mistakes && result.mistakes.length === 0 && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                      🌟 100% Sempurna Tanpa Kesalahan
                    </span>
                  )}
                </h4>

                {result.mistakes && result.mistakes.length > 0 ? (
                  <div className="space-y-2.5">
                    {result.mistakes.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          m.severity === 'major'
                            ? 'bg-rose-50/60 border-rose-200'
                            : 'bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                                m.type === 'tajwid'
                                  ? 'bg-teal-100 text-teal-900'
                                  : m.type === 'lafadz'
                                  ? 'bg-rose-100 text-rose-900'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {m.type}
                            </span>
                            <span className="text-xs font-bold text-slate-800">{m.location}</span>
                          </div>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              m.severity === 'major'
                                ? 'bg-rose-200 text-rose-900'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            {m.severity === 'major' ? 'Perlu Diperbaiki' : 'Catatan Ringan'}
                          </span>
                        </div>

                        {/* Comparison Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-xl border border-slate-200/80 mb-2">
                          <div>
                            <span className="text-[10px] text-slate-500 font-semibold block">
                              Yang Dibaca Siswa:
                            </span>
                            <span className="text-rose-700 font-bold font-serif">
                              "{m.studentPronounced}"
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 font-semibold block">
                              Yang Seharusnya (Benar):
                            </span>
                            <span className="text-emerald-700 font-bold font-serif">
                              "{m.expectedPronounced}"
                            </span>
                          </div>
                        </div>

                        {/* Explanation */}
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          💡 <strong>Bimbingan Tajwid:</strong> {m.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-800 font-semibold">
                    🎉 Masya Allah, bacaan hafalan sudah sangat fasih dan tidak ditemukan kesalahan fatal pada tajwid maupun lafadznya!
                  </div>
                )}
              </div>

              {/* Tajweed Notes & Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Saran & Rekomendasi Latihan Selanjutnya:
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 font-medium">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Result Actions */}
              <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setResult(null);
                      setAudioBlob(null);
                      if (audioUrl) URL.revokeObjectURL(audioUrl);
                      setAudioUrl(null);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tes Ulang</span>
                  </button>

                  <button
                    onClick={handleShareResult}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    title="Kirim Hasil ke WhatsApp Orang Tua / Guru"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Kirim WA</span>
                  </button>

                  <button
                    onClick={handleCopyResult}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isCopied ? 'Tersalin!' : 'Salin Teks'}
                  </button>
                </div>

                <button
                  id="btn-save-to-mutabaah"
                  onClick={handleSaveToMutabaah}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan ke Mutaba'ah Hari Ini ({currentDate})</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Didukung oleh Penguji Al-Qur'an & Tajwid AI
          </span>
          <button
            onClick={onClose}
            className="font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
