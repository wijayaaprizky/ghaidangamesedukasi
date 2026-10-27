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
    this.numberNames = [
      "Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh",
      "Sebelas", "Dua belas", "Tiga belas", "Empat belas", "Lima belas", "Enam belas",
      "Tujuh belas", "Delapan belas", "Sembilan belas", "Dua puluh"
    ];
    this.currentUtterance = null;
    this.initVoice();
    this.unlockAudioOnFirstGesture();
  }

  unlockAudioOnFirstGesture() {
    const unlock = () => {
      this.initAudioContext();
      if ('speechSynthesis' in window) {
        this.findBestIndonesianVoice();
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
  }

  // Pencarian Pintar Suara Bahasa Indonesia Alami
  findBestIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return this.voice;

    // 1. Filter semua voice dengan tag Bahasa Indonesia (id, id-ID, in, in-ID)
    const idVoices = voices.filter(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang === 'id' || lang.startsWith('id-') || lang === 'in' || lang.startsWith('in-') || name.includes('indonesia');
    });

    if (idVoices.length > 0) {
      // Prioritaskan suara natural / wanita ramah anak:
      // Google Bahasa Indonesia (Android/Chrome), Microsoft Gadis / Ardi Natural (Windows/Edge), Apple Damayanti (iOS/Safari)
      const naturalVoice = idVoices.find(v => 
        /natural|online|google|gadis|damayanti/i.test(v.name)
      );
      this.voice = naturalVoice || idVoices[0];
      return this.voice;
    }

    // 2. Alternatif regional: Suara Melayu (ms, ms-MY) jika perangkat tidak memiliki paket suara Indonesia
    // (Pelafalan fonem Melayu sangat mirip dan natural didengar anak Indonesia, berbeda jauh dengan aksen Inggris)
    const msVoice = voices.find(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang.startsWith('ms') || name.includes('malay');
    });

    if (msVoice) {
      this.voice = msVoice;
      return this.voice;
    }

    // 3. PENTING: JANGAN PERNAH fallback ke voices[0] (yang biasanya English / US)!
    // Membiarkan this.voice = null akan membuat peramban (Chrome Android/iOS Safari)
    // memproses utter.lang = 'id-ID' secara tepat menggunakan mesin sintesis bahasa Indonesia,
    // bukan dipaksa membaca dengan logat bule / robotik asing!
    this.voice = null;
    return null;
  }

  speak(text, onEnd) {
    if (this.isMuted || !('speechSynthesis' in window)) return;
    
    // Resume audio context jika browser menidurkannya
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel(); // Hentikan suara yang sedang berjalan

    const bestVoice = this.findBestIndonesianVoice();

    const utter = new SpeechSynthesisUtterance(text);
    if (bestVoice) {
      utter.voice = bestVoice;
    }
    utter.lang = 'id-ID';
    utter.rate = 0.90; // Kecepatan artikulasi ramah, jelas & tegas untuk anak TK
    utter.pitch = 1.0;  // Pitch natural 1.0 (mencegah suara robot/cempreng terdistorsi di HP)

    // Cegah garbage collection prematur di Google Chrome Android
    this.currentUtterance = utter;

    utter.onend = (e) => {
      this.currentUtterance = null;
      if (onEnd) onEnd(e);
    };

    utter.onerror = (e) => {
      this.currentUtterance = null;
      if (onEnd) onEnd(e);
    };
    
    // Jeda mikro 40ms untuk stabilitas pembatalan di mobile Safari & Chrome
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.warn("Speak error:", err);
      }
    }, 40);
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
