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
    this.initVoice();
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
      const voices = window.speechSynthesis.getVoices();
      // Prioritize Indonesian voice
      this.voice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID')) ||
                   voices.find(v => v.lang.includes('ms') || v.lang.includes('MY')) ||
                   voices[0];
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  speak(text, onEnd) {
    if (this.isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Hentikan suara yang sedang berjalan

    const utter = new SpeechSynthesisUtterance(text);
    if (this.voice) utter.voice = this.voice;
    utter.lang = 'id-ID';
    utter.rate = 0.88; // Agak perlahan agar artikulasi jelas bagi anak TK
    utter.pitch = 1.15; // Ceria dan ramah
    if (onEnd) utter.onend = onEnd;
    
    window.speechSynthesis.speak(utter);
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
