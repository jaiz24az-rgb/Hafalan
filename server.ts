import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory sync packet storage by room code
const syncStore = new Map<string, { updatedAt: string; data: unknown }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Voice & Tajweed Hafalan AI Testing API
  app.post('/api/hafalan/test-voice', async (req: Request, res: Response) => {
    try {
      const { audioBase64, mimeType, transcriptText, item, studentName, grade } = req.body;

      if (!item || (!audioBase64 && !transcriptText)) {
        res.status(400).json({
          error: 'Data tidak lengkap. Harap sertakan rekaman suara atau teks bacaan serta target hafalan.'
        });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error: 'GEMINI_API_KEY belum dikonfigurasi di server.'
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const targetTitle = item.title || 'Hafalan';
      const targetArabic = item.arabic || '';
      const targetLatin = item.latin || '';
      const targetTranslation = item.translation || '';
      const targetCategory = item.category || 'surat';

      const promptText = `
Anda adalah seorang Ustadz / Guru Penguji Tahfidz Qur'an dan Tajwid yang sangat ahli, teliti, serta ramah dan memotivasi siswa (tingkat madrasah/sekolah).

TUGAS ANDA:
Dengarkan dan analisis audio rekaman suara bacaan hafalan siswa bernama "${studentName || 'Siswa'}" (Tingkat: ${grade || 'Umum'}).
Bandingkan secara seksama dengan teks referensi hafalan target berikut:
- Judul / Target: ${targetTitle} (Kategori: ${targetCategory})
- Teks Asli Arab: ${targetArabic}
- Transliterasi Latin: ${targetLatin}
- Terjemahan / Makna: ${targetTranslation}

${transcriptText ? `Catatan teks input bacaan: "${transcriptText}"` : ''}

KRITERIA PENILAIAN SECARA MENDALAM:
1. AKURASI LAFADZ & AYAT (accuracyScore: 0-100):
   - Ketepatan kata per kata, urutan kalimat, dan harakat.
   - Apakah ada kata yang lupa, terlewat, tertukar, atau ditambahkan?
2. HUKUM TAJWID & MAKHORIJUL HURUF (tajweedScore: 0-100):
   - Panjang pendek (Mad Thobi'i 2 harakat, Mad Wajib/Jaiz 4-5 harakat, Mad Lazim 6 harakat, Mad Arid Lissukun).
   - Ghunnah (Nun/Mim Tasydid didengungkan 2 harakat).
   - Hukum Nun Sukun & Tanwin (Idzhar Halqi, Idgham Bighunnah/Bilaghunnah, Ikhfa Haqiqi, Iqlab).
   - Hukum Mim Sukun (Ikhfa Syafawi, Idgham Mimi, Idzhar Syafawi).
   - Qalqalah (Sugra / Kubra saat waqaf pada Ba, Jim, Dal, Tha, Qaf).
   - Tebal tipis (Tafkhim / Tarqiq huruf Ro dan Lam Jalalah).
   - Ketepatan Makhorijul Huruf & Sifat Huruf (misal: membedakan Ha vs Kha, 'Ain vs Hamzah, Tsa vs Sin vs Syin, Dzal vs Zay vs Zho, Shad vs Sin, Qaf vs Kaf).
3. KELANCARAN & ADAB (fluencyScore: 0-100):
   - Kelancaran irama membaca, tidak terbata-bata, ketepatan waqaf (berhenti) dan ibtida' (memulai kembali).
4. SKOR KESELURUHAN (score: 0-100):
   - Bobot nilai persentase rata-rata kelulusan (0-100%).
   - Tentukan gradeLabel:
     * 90 - 100: "Mumtaz (Istimewa) 🌟"
     * 80 - 89: "Jayyid Jiddan (Sangat Baik) ✨"
     * 70 - 79: "Jayyid (Baik) 👍"
     * 60 - 69: "Maqbul (Cukup) 📖"
     * < 60: "Perlu Muraja'ah 🔄"

5. RINCIAN BAGIAN YANG BENAR (correctParts):
   - Tuliskan 2-4 poin konkret ayat/lafadz/tajwid yang sudah dibaca dengan sangat tepat dan fasih oleh siswa.
6. DAFTAR KESALAHAN & KOREKSI (mistakes):
   - Untuk setiap kesalahan, tentukan type ('tajwid' | 'lafadz' | 'kelancaran' | 'harakat'), location (ayat/posisi kata), studentPronounced (apa yang dibaca siswa), expectedPronounced (bacaan yang benar), explanation (penjelasan hukum tajwid/lafadz yang mendidik dan jelas), serta severity ('minor' | 'major').
   - Jika hafalan 100% sempurna tanpa cela, mistakes berupa array kosong [].
7. CATATAN HUKUM TAJWID (tajweedNotes):
   - 2-4 catatan penting kaidah tajwid yang relevan pada ayat/surat ini.
8. SARAN & REKOMENDASI MURAJA'AH (recommendations):
   - 2-3 tips praktis untuk meningkatkan hafalan atau menyempurnakan tajwidnya.
9. SUMMARY:
   - Kalimat ulasan apresiasi dan motivasi yang hangat untuk siswa dan orang tua.

HASILKAN DALAM FORMAT JSON SESUAI SKEMA YANG DIMINTA.
`;

      const parts: Array<{ inlineData?: { data: string; mimeType: string }; text?: string }> = [];

      if (audioBase64) {
        let cleanBase64 = String(audioBase64);
        let cleanMime = mimeType || 'audio/webm';
        if (cleanBase64.includes(';base64,')) {
          const split = cleanBase64.split(';base64,');
          cleanBase64 = split[1];
          if (split[0].startsWith('data:')) {
            cleanMime = split[0].replace('data:', '');
          }
        }
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: cleanMime
          }
        });
      }

      parts.push({
        text: promptText
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: 'Overall percentage score from 0 to 100' },
              gradeLabel: { type: Type.STRING, description: 'e.g. Mumtaz (Istimewa), Jayyid Jiddan, etc.' },
              accuracyScore: { type: Type.INTEGER, description: 'Accuracy score 0 to 100' },
              tajweedScore: { type: Type.INTEGER, description: 'Tajweed score 0 to 100' },
              fluencyScore: { type: Type.INTEGER, description: 'Fluency score 0 to 100' },
              transcription: { type: Type.STRING, description: 'Transcribed recitation words from voice audio' },
              correctParts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Points where the student recited accurately'
              },
              mistakes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: 'tajwid, lafadz, kelancaran, or harakat' },
                    location: { type: Type.STRING, description: 'Specific location/verse/word' },
                    studentPronounced: { type: Type.STRING, description: 'What student said' },
                    expectedPronounced: { type: Type.STRING, description: 'Correct reading' },
                    explanation: { type: Type.STRING, description: 'Pedagogical explanation of the rule' },
                    severity: { type: Type.STRING, description: 'minor or major' }
                  },
                  required: ['type', 'location', 'studentPronounced', 'expectedPronounced', 'explanation', 'severity']
                }
              },
              tajweedNotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Important tajweed rules to remember'
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Practice recommendations'
              },
              summary: { type: Type.STRING, description: 'Encouraging evaluation summary' }
            },
            required: [
              'score',
              'gradeLabel',
              'accuracyScore',
              'tajweedScore',
              'fluencyScore',
              'transcription',
              'correctParts',
              'mistakes',
              'tajweedNotes',
              'recommendations',
              'summary'
            ]
          }
        }
      });

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error('Gemini API did not return an evaluation response.');
      }

      const evaluationResult = JSON.parse(textOutput);
      res.json({
        success: true,
        evaluation: evaluationResult
      });
    } catch (err: unknown) {
      console.error('Error in /api/hafalan/test-voice:', err);
      const msg = err instanceof Error ? err.message : 'Gagal mengevaluasi hafalan dengan AI.';
      res.status(500).json({ error: msg });
    }
  });

  // Sync Push API
  app.post('/api/sync/push', (req: Request, res: Response) => {
    try {
      const { syncCode, packet } = req.body;
      if (!syncCode || !packet) {
        res.status(400).json({ error: 'Missing syncCode or packet' });
        return;
      }

      const normalizedCode = String(syncCode).trim().toUpperCase();
      syncStore.set(normalizedCode, {
        updatedAt: new Date().toISOString(),
        data: packet
      });

      res.json({ success: true, code: normalizedCode, savedAt: new Date().toISOString() });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: msg });
    }
  });

  // Sync Pull API
  app.get('/api/sync/pull/:syncCode', (req: Request, res: Response) => {
    try {
      const syncCode = req.params.syncCode;
      if (!syncCode) {
        res.status(400).json({ error: 'Missing syncCode parameter' });
        return;
      }

      const normalizedCode = syncCode.trim().toUpperCase();
      const existing = syncStore.get(normalizedCode);

      if (!existing) {
        res.status(404).json({ error: 'Room not found or empty', code: normalizedCode });
        return;
      }

      res.json({ success: true, packet: existing.data, updatedAt: existing.updatedAt });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: msg });
    }
  });

  // Supabase Proxy Test
  app.post('/api/sync/supabase/test', async (req: Request, res: Response) => {
    try {
      const { supabaseUrl, supabaseKey, supabaseTable } = req.body;
      if (!supabaseUrl || !supabaseKey) {
        res.status(400).json({ success: false, message: 'Supabase URL and Key are required.' });
        return;
      }

      let baseUrl = String(supabaseUrl).trim().replace(/\/+$/, '');
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }
      const table = (supabaseTable || 'mutabaah_sync').trim();
      const testUrl = `${baseUrl}/rest/v1/${table}?select=count&limit=1`;

      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          apikey: String(supabaseKey).trim(),
          Authorization: `Bearer ${String(supabaseKey).trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        res.json({
          success: true,
          message: `Berhasil terhubung ke Supabase! Tabel "${table}" siap digunakan.`
        });
        return;
      }

      const errText = await response.text();
      res.status(response.status).json({
        success: false,
        message: `Supabase mengembalikan HTTP ${response.status}: ${errText || response.statusText}`
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal.';
      res.status(500).json({ success: false, message: msg });
    }
  });

  // Supabase Proxy Push
  app.post('/api/sync/supabase/push', async (req: Request, res: Response) => {
    try {
      const { supabaseUrl, supabaseKey, supabaseTable, payload } = req.body;
      if (!supabaseUrl || !supabaseKey || !payload) {
        res.status(400).json({ error: 'Data Supabase tidak lengkap.' });
        return;
      }

      let baseUrl = String(supabaseUrl).trim().replace(/\/+$/, '');
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }
      const table = (supabaseTable || 'mutabaah_sync').trim();
      const endpoint = `${baseUrl}/rest/v1/${table}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          apikey: String(supabaseKey).trim(),
          Authorization: `Bearer ${String(supabaseKey).trim()}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify([payload])
      });

      if (!response.ok) {
        const errText = await response.text();
        res.status(response.status).json({ error: `Supabase Error (${response.status}): ${errText}` });
        return;
      }

      res.json({ success: true, message: 'Berhasil disimpan ke Supabase via relay.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal push ke Supabase';
      res.status(500).json({ error: msg });
    }
  });

  // Supabase Proxy Pull
  app.post('/api/sync/supabase/pull', async (req: Request, res: Response) => {
    try {
      const { supabaseUrl, supabaseKey, supabaseTable, syncCode } = req.body;
      if (!supabaseUrl || !supabaseKey || !syncCode) {
        res.status(400).json({ error: 'Parameter Supabase pull tidak lengkap.' });
        return;
      }

      let baseUrl = String(supabaseUrl).trim().replace(/\/+$/, '');
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }
      const table = (supabaseTable || 'mutabaah_sync').trim();
      const endpoint = `${baseUrl}/rest/v1/${table}?sync_code=eq.${encodeURIComponent(syncCode)}&select=*`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          apikey: String(supabaseKey).trim(),
          Authorization: `Bearer ${String(supabaseKey).trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        res.status(response.status).json({ error: `Supabase Error (${response.status}): ${errText}` });
        return;
      }

      const rows = (await response.json()) as Array<{ data: unknown; updated_at: string }>;
      if (!Array.isArray(rows) || rows.length === 0) {
        res.status(404).json({ error: `Data dengan kode "${syncCode}" tidak ditemukan di Supabase.` });
        return;
      }

      res.json({ success: true, packet: rows[0].data, updatedAt: rows[0].updated_at });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal pull dari Supabase';
      res.status(500).json({ error: msg });
    }
  });

  // Custom REST API Test & Relay
  app.post('/api/sync/custom/test', async (req: Request, res: Response) => {
    try {
      const { endpointUrl, authHeader, method } = req.body;
      if (!endpointUrl) {
        res.status(400).json({ success: false, message: 'URL endpoint wajib diisi.' });
        return;
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (authHeader) {
        headers['Authorization'] = authHeader;
      }

      const fetchMethod = method || 'GET';
      const response = await fetch(endpointUrl, {
        method: fetchMethod === 'GET' ? 'GET' : 'POST',
        headers,
        body: fetchMethod === 'GET' ? undefined : JSON.stringify({ ping: true, time: new Date().toISOString() })
      });

      if (response.ok) {
        res.json({
          success: true,
          message: `Endpoint Custom REST merespons dengan status ${response.status} OK!`
        });
      } else {
        res.status(response.status).json({
          success: false,
          message: `Endpoint Custom REST merespons dengan status HTTP ${response.status}: ${response.statusText}`
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke endpoint gagal';
      res.status(500).json({ success: false, message: msg });
    }
  });

  // Custom REST Relay Push
  app.post('/api/sync/custom/relay', async (req: Request, res: Response) => {
    try {
      const { url, method, authHeader, payload } = req.body;
      if (!url) {
        res.status(400).json({ error: 'URL target tidak diberikan.' });
        return;
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (authHeader) {
        headers['Authorization'] = authHeader;
      }

      const response = await fetch(url, {
        method: method || 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        res.status(response.status).json({ error: `Custom API HTTP ${response.status}: ${errText}` });
        return;
      }

      const respData = await response.json().catch(() => ({ success: true }));
      res.json({ success: true, response: respData });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim ke Custom API';
      res.status(500).json({ error: msg });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
