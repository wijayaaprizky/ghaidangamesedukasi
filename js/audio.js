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
    this.useCloudVoice = false; // Gunakan Suara Web Speech Asli Bawaan (Jernih & Alami seperti saat offline)
    this.audioPlayer = null;
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

  unlockAudioOnFirstGesture() {
    const unlock = () => {
      this.initAudioContext();
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        this.findBestIndonesianVoice();
      }
      if (this.audioPlayer) {
        this.audioPlayer.load();
      }
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
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
    // Pengecekan berulang awal untuk browser HP (Android/iOS)
    let checks = 0;
    const voiceInterval = setInterval(() => {
      loadVoices();
      checks++;
      if (this.voice || checks >= 6) {
        clearInterval(voiceInterval);
      }
    }, 500);
  }

  // Pencarian Pintar Suara Bahasa Indonesia Alami (Persis seperti versi offline yang jernih)
  findBestIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return this.voice;

    // Filter semua voice dengan tag Bahasa Indonesia (id, id-ID, in, in-ID)
    const idVoices = voices.filter(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang === 'id' || lang.startsWith('id-') || lang === 'in' || lang.startsWith('in-') || name.includes('indonesia');
    });

    if (idVoices.length > 0) {
      // Prioritaskan suara natural / studio / wanita ramah anak: Gadis, Google, Damayanti, Ardi, Natural
      const naturalVoice = idVoices.find(v => 
        /gadis|damayanti|natural|online|google|indonesia/i.test(v.name)
      );
      this.voice = naturalVoice || idVoices[0];
      return this.voice;
    }

    // Alternatif Melayu jika Indonesia tidak tersedia sama sekali di perangkat
    const msVoice = voices.find(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang.startsWith('ms') || name.includes('malay');
    });

    if (msVoice) {
      this.voice = msVoice;
      return this.voice;
    }

    this.voice = null;
    return null;
  }

  // Bersihkan teks dari emoji dan simbol agar artikulasi pelafalan 100% tepat
  cleanSpeechText(raw) {
    if (!raw) return '';
    return raw
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '') // Hapus emoji unicode
      .replace(/[\u{2600}-\u{27BF}]/gu, '')
      .replace(/[📍💡🔊⭐🏆🎉👉✨🏖️🏰⛩️🏛️🛕🏔️🪵👜]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Sistem Narasi Audio Jernih & Alami:
   * Menggunakan Web Speech API asli bawaan perangkat (Edge/Chrome/Android/iOS)
   * dengan tuning suara manusia Indonesia natural, rate 0.88 agar jelas untuk anak TK-A.
   */
  speak(text, onEnd) {
    if (this.isMuted) return;
    this.stopSpeech();

    const clean = this.cleanSpeechText(text);
    if (!clean) return;

    // Engine Utama: Web Speech API Alami Bawaan Perangkat (Sama persis dengan saat offline)
    if ('speechSynthesis' in window) {
      this.speakWebSpeech(clean, onEnd);
      return;
    }

    // Fallback Darurat: Cloud TTS jika perangkat sama sekali tidak mendukung SpeechSynthesis
    if (this.useCloudVoice && navigator.onLine) {
      this.speakCloudTTS(clean, onEnd);
    }
  }

  // Engine 1: Streaming Suara Studio Indonesia Asli (Google Natural Voice)
  speakCloudTTS(cleanText, onEnd, onError) {
    try {
      if (!this.audioPlayer) {
        this.initAudioPlayer();
      }
      if (!this.audioPlayer) return false;

      const encoded = encodeURIComponent(cleanText);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=id&client=tw-ob`;

      this.audioPlayer.pause();
      this.audioPlayer.src = url;

      this.audioPlayer.onended = () => {
        if (onEnd) onEnd();
      };

      this.audioPlayer.onerror = (err) => {
        console.warn("Cloud TTS playback error, falling back to Web Speech:", err);
        if (onError) onError();
      };

      const p = this.audioPlayer.play();
      if (p !== undefined) {
        p.catch(err => {
          console.warn("Cloud TTS play prevented, falling back:", err);
          if (onError) onError();
        });
      }
      return true;
    } catch (err) {
      console.warn("Cloud TTS exception, falling back:", err);
      if (onError) onError();
      return false;
    }
  }

  // Engine 2: Web Speech API Bawaan Browser
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
      utter.rate = 0.88; // Artikulasi tenang, empuk, dan jelas untuk anak TK-A
      utter.pitch = 1.0; // Nada alami manusia (bukan robot kaku, bukan chipmunk)

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
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
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
