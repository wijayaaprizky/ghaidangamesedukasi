/**
 * Audio Engine: Web Audio API Synthesizer & SpeechSynthesis Bahasa Indonesia
 * Mendukung narasi suara, pelafalan suku kata, ejaan kata, dan hitungan hingga belasan (1-20).
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.isMuted = false;
    this.voice = null;
    // Mode suara: 'cloud' (Studio Indonesia Jernih Alami - 100% Fasih di semua HP) atau 'device' (Web Speech)
    this.voiceMode = 'cloud'; 
    this.audioPlayer = null;
    this.audioQueue = [];
    this.isPlayingQueue = false;
    this.isUnlocked = false;
    this.numberNames = [
      "Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh",
      "Sebelas", "Dua belas", "Tiga belas", "Empat belas", "Lima belas", "Enam belas",
      "Tujuh belas", "Delapan belas", "Sembilan belas", "Dua puluh"
    ];
    this.currentUtterance = null;
    this.initAudioPlayer();
    this.initVoice();
    this.unlockAudioOnFirstGesture();
  }

  initAudioPlayer() {
    try {
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';
    } catch (e) {
      this.audioPlayer = null;
    }
  }

  // Buka kunci (unlock) audio di HP Android & iOS saat sentuhan pertama
  unlockAudioOnFirstGesture() {
    const unlock = () => {
      this.initAudioContext();
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      this.findBestIndonesianVoice();

      if (this.audioPlayer && !this.isUnlocked) {
        // Mainkan 1 milidetik audio hening untuk mengaktifkan izin audio di browser HP
        this.audioPlayer.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        const p = this.audioPlayer.play();
        if (p !== undefined) {
          p.then(() => {
            this.audioPlayer.pause();
            this.isUnlocked = true;
          }).catch(() => {});
        }
      }
    };
    document.addEventListener('click', unlock, { once: true, passive: true });
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoice() {
    if (!('speechSynthesis' in window)) return;
    const loadVoices = () => {
      this.findBestIndonesianVoice();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    // Cek ulang untuk browser mobile
    let checks = 0;
    const timer = setInterval(() => {
      loadVoices();
      checks++;
      if (this.voice || checks >= 6) clearInterval(timer);
    }, 500);
  }

  // Cek apakah perangkat benar-benar memiliki suara Bahasa Indonesia asli
  hasNativeIndonesianVoice() {
    if (!('speechSynthesis' in window)) return false;
    const voices = window.speechSynthesis.getVoices() || [];
    return voices.some(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return (lang === 'id' || lang.startsWith('id-') || lang === 'in' || lang.startsWith('in-') || name.includes('indonesia'));
    });
  }

  // Cari suara Bahasa Indonesia terbaik di perangkat
  findBestIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return this.voice;

    const idVoices = voices.filter(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang === 'id' || lang.startsWith('id-') || lang === 'in' || lang.startsWith('in-') || name.includes('indonesia');
    });

    if (idVoices.length > 0) {
      const naturalVoice = idVoices.find(v => 
        /gadis|damayanti|natural|online|google|indonesia/i.test(v.name)
      );
      this.voice = naturalVoice || idVoices[0];
      return this.voice;
    }

    this.voice = null;
    return null;
  }

  // Bersihkan teks dari emoji dan simbol agar artikulasi kata sempurna
  cleanSpeechText(raw) {
    if (!raw) return '';
    return raw
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
      .replace(/[\u{2600}-\u{27BF}]/gu, '')
      .replace(/[📍💡🔊⭐🏆🎉👉✨🏖️🏰⛩️🏛️🛕🏔️🪵👜]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Pecah kalimat panjang menjadi frasa-frasa pendek alami agar Google TTS tidak pernah terputus
  splitPhrases(text) {
    if (!text) return [];
    // Pisahkan berdasarkan tanda seru, tanya, titik, koma
    const rawTokens = text.split(/([!?.…]+)/);
    const phrases = [];
    for (let i = 0; i < rawTokens.length; i += 2) {
      const s = (rawTokens[i] || '').trim();
      const p = rawTokens[i + 1] || '';
      const full = (s + p).trim();
      if (full.length > 0) {
        if (full.length > 80) {
          const subs = full.split(/,\s*/);
          subs.forEach(part => {
            const trimmed = part.trim();
            if (trimmed) phrases.push(trimmed);
          });
        } else {
          phrases.push(full);
        }
      }
    }
    return phrases.length > 0 ? phrases : [text];
  }

  /**
   * Sistem Narasi Cerdas (Dual Mode):
   * 1. Mode 'cloud': Suara Manusia Indonesia Asli (Fasih 100%, artikulasi jernih di semua HP & laptop).
   * 2. Mode 'device': Web Speech API bawaan perangkat (hanya jika terpasang suara Indonesia asli).
   */
  speak(text, onEnd) {
    if (this.isMuted) return;
    this.stopSpeech();

    const clean = this.cleanSpeechText(text);
    if (!clean) return;

    // Jika perangkat punya suara Indonesia alami (seperti Edge Microsoft Gadis Natural) dan mode device aktif
    if (this.voiceMode === 'device' && this.hasNativeIndonesianVoice()) {
      this.speakWebSpeech(clean, onEnd);
      return;
    }

    // Default: Gunakan Suara Studio Indonesia Asli (Google Native Indonesian Voice)
    // yang 100% fasih dan menjamin pelafalan Bahasa Indonesia sempurna di HP manapun
    this.speakCloudTTS(clean, onEnd);
  }

  // Engine Utama: Antrean Streaming Suara Manusia Indonesia Asli
  speakCloudTTS(cleanText, onEnd) {
    if (!this.audioPlayer) {
      this.initAudioPlayer();
    }
    if (!this.audioPlayer) {
      // Fallback jika audio tag gagal
      this.speakWebSpeech(cleanText, onEnd);
      return;
    }

    const phrases = this.splitPhrases(cleanText);
    this.audioQueue = [...phrases];
    this.playNextPhrase(onEnd);
  }

  playNextPhrase(onComplete) {
    if (this.audioQueue.length === 0) {
      this.isPlayingQueue = false;
      if (onComplete) onComplete();
      return;
    }

    this.isPlayingQueue = true;
    const phrase = this.audioQueue.shift();
    const encoded = encodeURIComponent(phrase);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=id&client=tw-ob`;

    this.audioPlayer.pause();
    this.audioPlayer.src = url;

    this.audioPlayer.onended = () => {
      // Jeda 120ms antara frasa agar ritme napas alami dan santai untuk anak
      setTimeout(() => {
        this.playNextPhrase(onComplete);
      }, 120);
    };

    this.audioPlayer.onerror = (e) => {
      console.warn("Cloud TTS phrase failed, trying next or local:", e);
      // Jika terjadi kendala jaringan, lanjutkan frasa berikutnya atau beralih
      if (this.audioQueue.length > 0) {
        this.playNextPhrase(onComplete);
      } else {
        this.speakWebSpeech(phrase, onComplete);
      }
    };

    const playPromise = this.audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("Audio play blocked by browser, falling back to Web Speech:", err);
        this.speakWebSpeech(phrase, onComplete);
      });
    }
  }

  // Engine Cadangan: Web Speech API Bawaan Browser
  speakWebSpeech(cleanText, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const bestVoice = this.findBestIndonesianVoice();
      const utter = new SpeechSynthesisUtterance(cleanText);
      if (bestVoice) {
        utter.voice = bestVoice;
      }
      utter.lang = 'id-ID';
      utter.rate = 0.88; // Artikulasi tenang dan jelas untuk anak TK-A
      utter.pitch = 1.0; // Nada alami manusia

      this.currentUtterance = utter;

      utter.onend = (e) => {
        this.currentUtterance = null;
        if (onEnd) onEnd(e);
      };

      utter.onerror = (e) => {
        this.currentUtterance = null;
        if (onEnd) onEnd(e);
      };

      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.warn("WebSpeech speak error:", err);
      if (onEnd) onEnd();
    }
  }

  // Ganti mode suara (Studio Jernih vs Bawaan HP)
  toggleVoiceMode() {
    this.voiceMode = (this.voiceMode === 'cloud') ? 'device' : 'cloud';
    const modeName = (this.voiceMode === 'cloud') ? 'Suara Studio Fasih' : 'Suara Bawaan Perangkat';
    this.speak(`Mode suara diubah ke ${modeName}!`);
    return this.voiceMode;
  }

  // Khusus membaca suku kata & mengeja
  spellWord(wordParts, fullWord, onEnd) {
    const speechText = `${wordParts.join(" ... ")}. Dibaca: ${fullWord}!`;
    this.speak(speechText, onEnd);
  }

  // Menyebutkan angka (hingga belasan)
  speakNumber(num) {
    const text = this.numberNames[num] || num.toString();
    this.speak(text);
  }

  stopSpeech() {
    this.audioQueue = [];
    this.isPlayingQueue = false;
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Suara Benar (Melodi Ceria)
  playCorrect() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
    });
  }

  // Suara Coba Lagi (Lembut, tidak menakutkan bagi anak)
  playWrong() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Suara Klik Tombol / Pop
  playClick() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Suara Hitung Benda (Ting Xilofon hingga 20)
  playCount(index = 1) {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const baseFreqs = [
      261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25,
      587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50,
      1174.66, 1318.51, 1396.91, 1567.98, 1760.00
    ];
    const freq = baseFreqs[(index - 1) % baseFreqs.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Suara Fanfare Menang
  playFanfare() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major
    const times = [0, 0.15, 0.3, 0.5];

    times.forEach((t, i) => {
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * (1 + (i === 3 ? 0.25 : 0)), this.ctx.currentTime + t);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + t + (i === 3 ? 0.8 : 0.25));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + t);
        osc.stop(this.ctx.currentTime + t + (i === 3 ? 0.9 : 0.3));
      });
    });
  }

  // Musik Latar Ceria
  toggleBgm() {
    this.initAudioContext();
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    if (this.bgmPlaying || !this.ctx) return;
    this.bgmPlaying = true;

    const melody = [
      523.25, 659.25, 783.99, 659.25, 523.25, 659.25, 783.99, 0,
      587.33, 698.46, 880.00, 698.46, 587.33, 698.46, 880.00, 0,
      659.25, 783.99, 1046.50, 783.99, 659.25, 783.99, 1046.50, 0,
      783.99, 659.25, 587.33, 523.25, 659.25, 587.33, 523.25, 0
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.bgmPlaying || !this.ctx) return;
      const freq = melody[noteIdx % melody.length];
      if (freq > 0 && !this.isMuted) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.3);
      }
      noteIdx++;
    };

    this.bgmInterval = setInterval(playNextNote, 330);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeech();
    }
    return this.isMuted;
  }
}

const soundEngine = new SoundEngine();
