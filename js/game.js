/**
 * Logika Permainan Edukasi Ceria TK-A (Dengan Peta Asli Pengguna)
 * - Peta Indonesia: Menggunakan GAMBAR ASLI PENGGUNA (assets/peta-indonesia.png & assets/islands/)
 * - Rumah Adat & Suku Nusantara: Menggunakan FOTO ASLI NYATA
 * - Game Melatih Membaca: Suku kata 2 kata & pelafalan fonik bersuara
 * - Belajar Berhitung: Hingga belasan (1-20), interaktif sentuh, dan penjumlahan ceria
 */

class GameApp {
  constructor() {
    this.currentCategory = null;
    this.currentIndex = 0;
    this.totalStars = parseInt(localStorage.getItem('tka_stars') || '0', 10);
    this.stickers = JSON.parse(localStorage.getItem('tka_stickers') || 'null') || GAME_DATA.stickers;
    this.currentQuizData = [];
    this.countedItems = new Set();
    this.confettiActive = false;

    this.initElements();
    this.bindEvents();
    this.updateStarDisplay();
    this.setupConfetti();
  }

  initElements() {
    // Layar (Screens)
    this.screens = {
      home: document.getElementById('screen-home'),
      peta: document.getElementById('screen-peta'),
      foto: document.getElementById('screen-foto'),
      baca: document.getElementById('screen-baca'),
      hitung: document.getElementById('screen-hitung')
    };

    // Header & Kontrol
    this.starDisplay = document.getElementById('star-count');
    this.btnMute = document.getElementById('btn-mute');
    this.btnBgm = document.getElementById('btn-bgm');
    this.btnStickers = document.getElementById('btn-stickers');
    this.modalStickers = document.getElementById('modal-stickers');
    this.modalCelebrate = document.getElementById('modal-celebrate');
    this.confettiCanvas = document.getElementById('confetti-canvas');

    // Layar Peta Indonesia Asli & Ikon Kota (30 Soal)
    this.petaPrompt = document.getElementById('peta-prompt');
    this.landmarkBadge = document.getElementById('landmark-badge');
    this.landmarkPhotoImg = document.getElementById('landmark-photo-img');
    this.landmarkTitle = document.getElementById('landmark-title');
    this.landmarkClue = document.getElementById('landmark-clue');
    this.petaMapWrapper = document.getElementById('peta-map-wrapper');
    this.petaMainImg = document.getElementById('peta-main-img');
    this.petaPinIndicator = document.getElementById('peta-pin-indicator');
    this.petaOptionsContainer = document.getElementById('peta-options-container');
    this.petaProgressFill = document.getElementById('peta-progress-fill');
    this.petaProgressText = document.getElementById('peta-progress-text');

    // Layar Foto Asli Rumah & Suku (30 Soal)
    this.fotoPrompt = document.getElementById('foto-prompt');
    this.fotoMainImg = document.getElementById('foto-main-img');
    this.fotoMainTitle = document.getElementById('foto-main-title');
    this.fotoMainRegion = document.getElementById('foto-main-region');
    this.fotoMainDesc = document.getElementById('foto-main-desc');
    this.fotoChoicesContainer = document.getElementById('foto-choices-container');
    this.fotoProgressFill = document.getElementById('foto-progress-fill');
    this.fotoProgressText = document.getElementById('foto-progress-text');

    // Layar Membaca Suku Kata (30 Soal)
    this.bacaPrompt = document.getElementById('baca-prompt');
    this.bacaEmoji = document.getElementById('baca-emoji');
    this.bacaSyllablesBox = document.getElementById('baca-syllables-box');
    this.bacaOptionsContainer = document.getElementById('baca-options-container');
    this.bacaProgressFill = document.getElementById('baca-progress-fill');
    this.bacaProgressText = document.getElementById('baca-progress-text');

    // Layar Berhitung 1-20 (30 Soal)
    this.hitungPrompt = document.getElementById('hitung-prompt');
    this.hitungHeroBox = document.getElementById('hitung-hero-box');
    this.hitungHeroIcon = document.getElementById('hitung-hero-icon');
    this.hitungHeroTitle = document.getElementById('hitung-hero-title');
    this.hitungHeroDesc = document.getElementById('hitung-hero-desc');
    this.countingItemsArea = document.getElementById('counting-items-area');
    this.countingOptionsContainer = document.getElementById('counting-options');
    this.hitungProgressFill = document.getElementById('hitung-progress-fill');
    this.hitungProgressText = document.getElementById('hitung-progress-text');
  }

  bindEvents() {
    // Menu Klik Kategori
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        soundEngine.playClick();
        const cat = card.getAttribute('data-cat');
        this.openCategory(cat);
      });
    });

    // Kontrol Suara
    this.btnMute.addEventListener('click', () => {
      const muted = soundEngine.toggleMute();
      this.btnMute.textContent = muted ? '🔇' : '🔊';
      this.showToast(muted ? 'Suara dimatikan' : 'Suara dinyalakan');
    });

    this.btnBgm.addEventListener('click', () => {
      const playing = soundEngine.toggleBgm();
      this.btnBgm.classList.toggle('active-glow', playing);
      this.showToast(playing ? 'Musik ceria diputar 🎵' : 'Musik dimatikan ⏸️');
    });

    // Modal Album Stiker
    this.btnStickers.addEventListener('click', () => {
      soundEngine.playClick();
      this.openStickersModal();
    });

    // Tombol Kembali ke Menu
    document.querySelectorAll('.btn-back-home').forEach(btn => {
      btn.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchScreen('home');
      });
    });

    // Logo klik -> Home
    document.querySelector('.brand-badge').addEventListener('click', () => {
      soundEngine.playClick();
      this.switchScreen('home');
    });

    // Replay Suara
    document.getElementById('peta-voice-btn').addEventListener('click', () => {
      soundEngine.playClick();
      const q = this.currentQuizData[this.currentIndex];
      if (q) soundEngine.speak(q.soundText);
    });

    document.getElementById('foto-voice-btn').addEventListener('click', () => {
      soundEngine.playClick();
      const q = this.currentQuizData[this.currentIndex];
      if (q) soundEngine.speak(q.soundQuestion);
    });

    document.getElementById('baca-voice-btn').addEventListener('click', () => {
      soundEngine.playClick();
      const q = this.currentQuizData[this.currentIndex];
      if (q) soundEngine.speak(q.soundPrompt);
    });

    document.getElementById('counting-voice-btn').addEventListener('click', () => {
      soundEngine.playClick();
      const q = this.currentQuizData[this.currentIndex];
      if (q) soundEngine.speak(q.soundText);
    });

    // Modal Tutup
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundEngine.playClick();
        e.target.closest('.modal-overlay').classList.remove('active');
      });
    });

    // Main Lagi (Otomatis Memuat 30 Soal Acak Baru & Fresh)
    document.getElementById('btn-celebrate-replay').addEventListener('click', () => {
      soundEngine.playClick();
      this.modalCelebrate.classList.remove('active');
      this.currentIndex = 0;
      this.restartActiveCategory();
    });

    document.getElementById('btn-celebrate-home').addEventListener('click', () => {
      soundEngine.playClick();
      this.modalCelebrate.classList.remove('active');
      this.switchScreen('home');
    });
  }

  switchScreen(screenName) {
    soundEngine.stopSpeech();
    Object.values(this.screens).forEach(scr => scr && scr.classList.remove('active'));
    if (this.screens[screenName]) {
      this.screens[screenName].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateStarDisplay() {
    this.starDisplay.textContent = this.totalStars;
    localStorage.setItem('tka_stars', this.totalStars.toString());
  }

  addStars(amount = 1) {
    this.totalStars += amount;
    this.updateStarDisplay();
    this.checkStickerUnlocks();
  }

  showToast(message) {
    let toast = document.getElementById('kids-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kids-toast';
      toast.className = 'kids-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // ==========================================
  // PEMBUKA KATEGORI GAME & LOGIKA ACAK SOAL
  // ==========================================
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  openCategory(catKey) {
    this.currentCategory = catKey;
    this.currentIndex = 0;

    if (catKey === 'peta') {
      this.switchScreen('peta');
      this.initPetaGame();
    } else if (catKey === 'foto') {
      this.switchScreen('foto');
      this.initFotoSukuGame();
    } else if (catKey === 'baca') {
      this.switchScreen('baca');
      this.initBacaGame();
    } else if (catKey === 'hitung') {
      this.switchScreen('hitung');
      this.initHitungGame();
    } else {
      this.switchScreen('home');
    }
  }

  restartActiveCategory() {
    this.openCategory(this.currentCategory);
  }

  // ==========================================
  // 1. PETA INDONESIA ASLI (GAMBAR DARI PENGGUNA)
  // ==========================================
  initPetaGame() {
    this.currentQuizData = this.shuffleArray(GAME_DATA.pulauHilang);
    this.currentIndex = 0;
    this.preloadCategoryAssets(this.currentQuizData);
    this.loadPetaQuestion();
  }

  preloadCategoryAssets(items) {
    if (!items || !Array.isArray(items)) return;
    // Preload aset lokal agar langsung siap di memori browser
    items.forEach(item => {
      if (item.fotoRumah) { const img = new Image(); img.src = item.fotoRumah; }
      if (item.fotoSuku) { const img = new Image(); img.src = item.fotoSuku; }
      if (item.landmarkImg) { const img = new Image(); img.src = item.landmarkImg; }
    });
  }

  loadPetaQuestion() {
    const q = this.currentQuizData[this.currentIndex];
    if (!q) {
      this.showCelebration();
      return;
    }

    const total = this.currentQuizData.length;
    const currentNum = this.currentIndex + 1;
    this.petaProgressFill.style.width = `${(currentNum / total) * 100}%`;
    this.petaProgressText.textContent = `${currentNum} / ${total}`;
    this.petaPrompt.textContent = q.question;

    // Tampilkan Data Landmark / Ikon Kota (Lokal Instan)
    this.landmarkBadge.textContent = q.category;
    this.landmarkPhotoImg.onerror = () => {
      this.landmarkPhotoImg.onerror = null;
      this.landmarkPhotoImg.src = 'assets/landmarks/fallback_landmark.svg';
    };
    this.landmarkPhotoImg.src = q.landmarkImg;
    this.landmarkPhotoImg.alt = q.title;
    this.landmarkTitle.textContent = `${q.landmarkEmoji} ${q.title}`;
    this.landmarkClue.textContent = `💡 ${q.clue}`;

    // Sembunyikan pin penanda sebelumnya & pastikan peta utuh aktif
    this.petaPinIndicator.style.display = 'none';
    this.petaMainImg.src = "assets/peta-indonesia.png";

    // Data Label Pulau
    const islandLabels = {
      sumatera: { name: "Pulau Sumatera", badge: "Warna Oranye" },
      jawa: { name: "Pulau Jawa", badge: "Warna Hijau" },
      kalimantan: { name: "Pulau Kalimantan", badge: "Warna Biru Tua" },
      sulawesi: { name: "Pulau Sulawesi", badge: "Warna Merah Muda" },
      papua: { name: "Pulau Papua", badge: "Warna Biru Toska" }
    };

    // Render KARTU GAMBAR PULAU ASLI
    this.petaOptionsContainer.innerHTML = '';
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(optKey => {
      const info = islandLabels[optKey] || { name: optKey, badge: "" };
      const card = document.createElement('div');
      card.className = 'island-choice-card';
      card.innerHTML = `
        <div class="card-island-thumb">
          <img src="assets/islands/${optKey}.png" alt="${info.name}" class="island-real-thumb-img">
        </div>
        <div class="card-island-badge">${info.name}</div>
        <div class="card-island-detail">${info.badge}</div>
      `;

      card.addEventListener('click', () => {
        if (optKey === q.targetIsland) {
          card.classList.add('correct');
          soundEngine.playCorrect();
          this.addStars(1);
          this.triggerConfetti();

          // Munculkan Pin Penanda di Lokasi Pulau yang Tepat pada Peta Asli
          const pinCoords = GAME_DATA.mapCoords[q.targetIsland];
          if (pinCoords) {
            this.petaPinIndicator.style.left = `${pinCoords.pinX}%`;
            this.petaPinIndicator.style.top = `${pinCoords.pinY}%`;
            this.petaPinIndicator.innerHTML = `
              <span class="pin-icon">📍</span>
              <span class="pin-label">${q.landmarkEmoji} ${q.title}</span>
            `;
            this.petaPinIndicator.style.display = 'flex';
          }

          soundEngine.speak(q.soundFact);
          this.petaOptionsContainer.querySelectorAll('.island-choice-card').forEach(c => c.style.pointerEvents = 'none');

          setTimeout(() => {
            this.currentIndex++;
            this.loadPetaQuestion();
          }, 2400);
        } else {
          card.classList.add('wrong');
          soundEngine.playWrong();
          soundEngine.speak(`Ayo coba lagi, cari ${q.targetIslandName}!`);
          setTimeout(() => {
            card.classList.remove('wrong');
            card.style.opacity = '0.4';
            card.style.pointerEvents = 'none';
          }, 700);
        }
      });

      this.petaOptionsContainer.appendChild(card);
    });

    setTimeout(() => {
      soundEngine.speak(q.soundText);
    }, 400);
  }

  // ==========================================
  // 2. RUMAH ADAT & SUKU NUSANTARA (FOTO ASLI & LOKAL)
  // ==========================================
  initFotoSukuGame() {
    this.currentQuizData = this.shuffleArray(GAME_DATA.rumahSukuAsli);
    this.currentIndex = 0;
    this.preloadCategoryAssets(this.currentQuizData);
    this.loadFotoSukuQuestion();
  }

  loadFotoSukuQuestion() {
    const q = this.currentQuizData[this.currentIndex];
    if (!q) {
      this.showCelebration();
      return;
    }

    const total = this.currentQuizData.length;
    const currentNum = this.currentIndex + 1;
    this.fotoProgressFill.style.width = `${(currentNum / total) * 100}%`;
    this.fotoProgressText.textContent = `${currentNum} / ${total}`;

    this.fotoPrompt.textContent = `Jodohkan Foto Asli Rumah & Sukunya!`;
    this.fotoMainImg.onerror = () => {
      this.fotoMainImg.onerror = null;
      this.fotoMainImg.src = 'assets/rumah_suku/fallback_rumah.svg';
    };
    this.fotoMainImg.src = q.fotoRumah;
    this.fotoMainImg.alt = q.namaRumah;
    this.fotoMainTitle.textContent = q.namaRumah;
    this.fotoMainRegion.textContent = `📍 Asal: ${q.asalDaerah}`;
    this.fotoMainDesc.textContent = q.deskripsi;

    this.fotoChoicesContainer.innerHTML = '';
    const otherChoices = GAME_DATA.rumahSukuAsli.filter(item => item.id !== q.id);
    const shuffledOthers = otherChoices.sort(() => Math.random() - 0.5).slice(0, 2);
    const choicesPool = [
      { id: q.id, title: q.namaSuku, sub: q.asalDaerah, img: q.fotoSuku, isCorrect: true },
      { id: shuffledOthers[0].id, title: shuffledOthers[0].namaSuku, sub: shuffledOthers[0].asalDaerah, img: shuffledOthers[0].fotoSuku, isCorrect: false },
      { id: shuffledOthers[1].id, title: shuffledOthers[1].namaSuku, sub: shuffledOthers[1].asalDaerah, img: shuffledOthers[1].fotoSuku, isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    choicesPool.forEach(choice => {
      const card = document.createElement('div');
      card.className = 'photo-choice-card';
      card.innerHTML = `
        <div class="photo-choice-img-frame">
          <img src="${choice.img}" alt="${choice.title}" onerror="this.onerror=null; this.src='assets/rumah_suku/fallback_suku.svg';">
        </div>
        <div class="photo-choice-info">
          <div class="photo-choice-title">${choice.title}</div>
          <div class="photo-choice-sub">📍 ${choice.sub}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (choice.isCorrect) {
          card.classList.add('correct');
          soundEngine.playCorrect();
          this.addStars(1);
          this.triggerConfetti();

          soundEngine.speak(`Pintar sekali! Betul, ini foto asli busana adat ${choice.title}!`);
          this.fotoChoicesContainer.querySelectorAll('.photo-choice-card').forEach(c => c.style.pointerEvents = 'none');

          setTimeout(() => {
            this.currentIndex++;
            this.loadFotoSukuQuestion();
          }, 2000);
        } else {
          card.classList.add('wrong');
          soundEngine.playWrong();
          soundEngine.speak("Ayo coba lagi, perhatikan pakaian adatnya ya!");
          setTimeout(() => {
            card.classList.remove('wrong');
            card.style.opacity = '0.4';
            card.style.pointerEvents = 'none';
          }, 700);
        }
      });

      this.fotoChoicesContainer.appendChild(card);
    });

    setTimeout(() => {
      soundEngine.speak(q.soundQuestion);
    }, 400);
  }

  // ==========================================
  // 3. GAME MELATIH MEMBACA (SUKU KATA & EJA KATA)
  // ==========================================
  initBacaGame() {
    this.currentQuizData = this.shuffleArray(GAME_DATA.membaca);
    this.currentIndex = 0;
    this.loadBacaQuestion();
  }

  loadBacaQuestion() {
    const q = this.currentQuizData[this.currentIndex];
    if (!q) {
      this.showCelebration();
      return;
    }

    const total = this.currentQuizData.length;
    const currentNum = this.currentIndex + 1;
    this.bacaProgressFill.style.width = `${(currentNum / total) * 100}%`;
    this.bacaProgressText.textContent = `${currentNum} / ${total}`;

    this.bacaPrompt.textContent = `Ayo Lengkapi Kata Bergambar!`;
    this.bacaEmoji.textContent = q.emoji;

    this.bacaSyllablesBox.innerHTML = '';
    q.parts.forEach((part, idx) => {
      const isMissing = (idx === q.missingIndex);
      const box = document.createElement('div');
      box.className = `syllable-display-box ${isMissing ? 'missing' : ''}`;
      box.id = `syllable-box-${idx}`;
      box.textContent = isMissing ? '?' : part;
      this.bacaSyllablesBox.appendChild(box);

      if (idx < q.parts.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'syllables-connector';
        connector.textContent = '-';
        this.bacaSyllablesBox.appendChild(connector);
      }
    });

    this.bacaOptionsContainer.innerHTML = '';
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(syl => {
      const btn = document.createElement('button');
      btn.className = 'syllable-pick-btn';
      btn.textContent = syl;

      btn.addEventListener('click', () => {
        if (syl === q.targetSyllable) {
          btn.classList.add('correct');
          soundEngine.playCorrect();
          this.addStars(1);
          this.triggerConfetti();

          const missingBox = document.getElementById(`syllable-box-${q.missingIndex}`);
          if (missingBox) {
            missingBox.classList.remove('missing');
            missingBox.textContent = syl;
          }

          soundEngine.spellWord(q.parts, q.word);
          this.bacaOptionsContainer.querySelectorAll('.syllable-pick-btn').forEach(b => b.disabled = true);

          setTimeout(() => {
            this.currentIndex++;
            this.loadBacaQuestion();
          }, 2400);
        } else {
          btn.classList.add('wrong');
          soundEngine.playWrong();
          soundEngine.speak("Ayo coba suku kata yang lain!");
          setTimeout(() => {
            btn.classList.remove('wrong');
            btn.disabled = true;
          }, 600);
        }
      });

      this.bacaOptionsContainer.appendChild(btn);
    });

    setTimeout(() => {
      soundEngine.speak(q.soundPrompt);
    }, 350);
  }

  // ==========================================
  // 4. BELAJAR BERHITUNG HINGGA BELASAN (1 - 20)
  // ==========================================
  initHitungGame() {
    this.currentQuizData = this.shuffleArray(GAME_DATA.hitung);
    this.currentIndex = 0;
    this.loadHitungQuestion();
  }

  loadHitungQuestion() {
    const q = this.currentQuizData[this.currentIndex];
    if (!q) {
      this.showCelebration();
      return;
    }

    const total = this.currentQuizData.length;
    const currentNum = this.currentIndex + 1;
    this.hitungProgressFill.style.width = `${(currentNum / total) * 100}%`;
    this.hitungProgressText.textContent = `${currentNum} / ${total}`;

    this.hitungPrompt.textContent = q.question;
    this.countingItemsArea.innerHTML = '';
    this.countedItems.clear();

    // Tampilkan Hero Box jika ada tema khusus kontekstual (seperti Mobil, Sepeda, Hewan)
    if (this.hitungHeroBox) {
      if (q.heroEmoji || q.heroTitle) {
        this.hitungHeroBox.style.display = 'flex';
        this.hitungHeroIcon.textContent = q.heroEmoji || '🚗';
        this.hitungHeroTitle.textContent = q.heroTitle || 'Mari Berhitung';
        this.hitungHeroDesc.textContent = q.heroDesc || 'Sentuh gambar untuk menghitung satu per satu!';
      } else {
        this.hitungHeroBox.style.display = 'none';
      }
    }

    if (q.parts && Array.isArray(q.parts)) {
      // Objek dengan bagian-bagian berlabel (misal ban mobil, roda sepeda, warna lampu)
      q.parts.forEach((part, idx) => {
        const itemIdx = idx + 1;
        const emoji = typeof part === 'string' ? part : (part.emoji || q.itemEmoji || '✨');
        const label = typeof part === 'object' ? part.label : null;
        this.renderCountableItem(emoji, itemIdx, label);
      });
    } else if (q.isAddition) {
      // Penjumlahan bergambar
      let currentItemIdx = 0;
      const emojiA = q.emojiA || q.itemEmoji || '🍎';
      const emojiB = q.emojiB || q.itemEmoji || '🍏';

      for (let i = 0; i < q.groupA; i++) {
        currentItemIdx++;
        this.renderCountableItem(emojiA, currentItemIdx, q.labelA || null);
      }

      const plusSign = document.createElement('div');
      plusSign.style.fontSize = '2.6rem';
      plusSign.style.fontWeight = 'bold';
      plusSign.style.color = '#EF4444';
      plusSign.style.margin = '0 12px';
      plusSign.style.display = 'flex';
      plusSign.style.alignItems = 'center';
      plusSign.style.justifyContent = 'center';
      plusSign.textContent = '➕';
      this.countingItemsArea.appendChild(plusSign);

      for (let j = 0; j < q.groupB; j++) {
        currentItemIdx++;
        this.renderCountableItem(emojiB, currentItemIdx, q.labelB || null);
      }
    } else {
      // Standar / Belasan
      const emoji = q.itemEmoji || '⭐';
      for (let i = 1; i <= q.itemCount; i++) {
        this.renderCountableItem(emoji, i);
      }
    }

    this.countingOptionsContainer.innerHTML = '';
    q.options.forEach(num => {
      const btn = document.createElement('button');
      btn.className = 'number-choice-btn';
      btn.textContent = num;

      btn.addEventListener('click', () => {
        if (num === q.correct) {
          btn.classList.add('correct');
          soundEngine.playCorrect();
          this.addStars(1);
          this.triggerConfetti();

          const indonesianNumber = soundEngine.numberNames[num] || num.toString();
          soundEngine.speak(`Pintar sekali! Jawabannya benar ada ${indonesianNumber}!`);

          this.countingOptionsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
          setTimeout(() => {
            this.currentIndex++;
            this.loadHitungQuestion();
          }, 1800);
        } else {
          btn.classList.add('wrong');
          soundEngine.playWrong();
          soundEngine.speak("Ayo hitung lagi dengan teliti ya!");
          setTimeout(() => {
            btn.classList.remove('wrong');
            btn.disabled = true;
          }, 600);
        }
      });

      this.countingOptionsContainer.appendChild(btn);
    });

    setTimeout(() => {
      soundEngine.speak(q.soundText);
    }, 350);
  }

  renderCountableItem(emoji, index, label = null) {
    const item = document.createElement('div');
    item.className = 'countable-item';

    let innerHtml = `<div class="countable-item-icon">${emoji}</div>`;
    if (label) {
      innerHtml += `<div class="countable-sublabel">${label}</div>`;
    }
    item.innerHTML = innerHtml;

    // INTERAKSI SENTUH MURNI VISUAL TANPA SUARA (HILANGKAN SUARA SESUAI PERMINTAAN USER)
    item.addEventListener('click', () => {
      if (!this.countedItems.has(index)) {
        this.countedItems.add(index);
        item.classList.add('counted');
        const badge = document.createElement('div');
        badge.className = 'countable-badge';
        badge.textContent = index;
        item.appendChild(badge);
      }
    });

    this.countingItemsArea.appendChild(item);
  }

  // ==========================================
  // PERAYAAN & ALBUM STIKER
  // ==========================================
  showCelebration() {
    soundEngine.playFanfare();
    this.triggerConfetti();
    this.addStars(3);
    this.modalCelebrate.classList.add('active');
    soundEngine.speak("Hore! Luar biasa! Kamu berhasil menyelesaikan semua pertanyaan dan dapat 3 bintang emas!");
  }

  checkStickerUnlocks() {
    let unlockedAny = false;
    for (let i = 1; i < this.stickers.length; i++) {
      if (this.totalStars >= (i * 3) && !this.stickers[i].unlocked) {
        this.stickers[i].unlocked = true;
        unlockedAny = true;
      }
    }
    if (unlockedAny) {
      localStorage.setItem('tka_stickers', JSON.stringify(this.stickers));
      this.showToast('🎉 Hore! Ada stiker baru terbuka di album!');
    }
  }

  openStickersModal() {
    const grid = document.getElementById('sticker-album-grid');
    grid.innerHTML = '';
    this.stickers.forEach(stk => {
      const slot = document.createElement('div');
      slot.className = `sticker-slot ${stk.unlocked ? 'unlocked' : 'locked'}`;
      slot.innerHTML = `
        <div>${stk.emoji}</div>
        <div class="sticker-name">${stk.unlocked ? stk.name : 'Terkunci'}</div>
      `;
      if (stk.unlocked) {
        slot.addEventListener('click', () => {
          soundEngine.playClick();
          soundEngine.speak(`Stiker ${stk.name}!`);
        });
      }
      grid.appendChild(slot);
    });
    this.modalStickers.classList.add('active');
  }

  // ==========================================
  // CONFETTI RAIN ANIMATION (Canvas)
  // ==========================================
  setupConfetti() {
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.confettiPieces = [];
    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti() {
    const colors = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#8338EC', '#FF9F1C'];
    for (let i = 0; i < 80; i++) {
      this.confettiPieces.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -10,
        r: Math.random() * 8 + 4,
        d: Math.random() * 10 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0
      });
    }
    if (!this.confettiActive) {
      this.confettiActive = true;
      this.renderConfetti();
    }
  }

  renderConfetti() {
    if (!this.confettiActive) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    for (let i = 0; i < this.confettiPieces.length; i++) {
      const p = this.confettiPieces[i];
      p.tiltAngle += p.tiltAngleInc;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 1.5;
      p.x += Math.sin(p.d);
      p.tilt = Math.sin(p.tiltAngle) * 15;

      this.confettiCtx.beginPath();
      this.confettiCtx.lineWidth = p.r;
      this.confettiCtx.strokeStyle = p.color;
      this.confettiCtx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      this.confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      this.confettiCtx.stroke();
    }
    this.confettiPieces = this.confettiPieces.filter(p => p.y < this.confettiCanvas.height);
    if (this.confettiPieces.length > 0) {
      requestAnimationFrame(() => this.renderConfetti());
    } else {
      this.confettiActive = false;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new GameApp();
});
