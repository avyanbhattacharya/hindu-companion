'use strict';

// Bhakti Companion — Client Application Logic
(function () {
  // State
  const state = {
    activeTab: 'panel-calendar',
    location: 'phoenix',
    searchQuery: '',
    filterLanguage: 'all',
    filterCategory: 'all',
    filterDeity: 'all',
    favorites: JSON.parse(localStorage.getItem('bhakti_favorites') || '[]'),
    program: JSON.parse(localStorage.getItem('bhakti_program') || '["sri-guru-pranam","jaya-radha-madhava","hare-krishna-mahamantra","damodarashtakam","vaishnava-pranam"]'),
    modalSongId: null,
    modalQueue: [],
    modalQueueIndex: -1,
    fontSize: 'font-normal',
    showOriginal: true,
    showRoman: true,
    showMeaning: true,
    activeGuideId: null
  };

  // Helper: Diacritic and phonetic tolerant normalization
  function normalizeText(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/kṛṣṇa|krsna/g, 'krishna')
      .replace(/caitanya/g, 'chaitanya')
      .replace(/bāṅglā|bangla/g, 'bengali')
      .replace(/gaurāṅga|goranga/g, 'gauranga')
      .replace(/śrī|shree/g, 'sri')
      .replace(/rādhā|radhe/g, 'radha');
  }

  // DOM Elements Cache
  const el = {
    tabs: document.querySelectorAll('.nav-tab[data-panel]'),
    panels: document.querySelectorAll('.view-panel'),
    locationSelect: document.getElementById('location-select'),
    todayLocationName: document.getElementById('today-location-name'),
    todayGregorianDate: document.getElementById('today-gregorian-date'),
    valTithi: document.getElementById('val-tithi'),
    valSun: document.getElementById('val-sun'),
    valMasa: document.getElementById('val-masa'),
    valFasting: document.getElementById('val-fasting'),
    calendarEventsGrid: document.getElementById('calendar-events-grid'),
    searchInput: document.getElementById('library-search-input'),
    filterLang: document.getElementById('filter-language'),
    filterCat: document.getElementById('filter-category'),
    filterDeity: document.getElementById('filter-deity'),
    songsGrid: document.getElementById('songs-grid'),
    guidesGrid: document.getElementById('guides-grid'),
    guidesListView: document.getElementById('guides-list-view'),
    guideDetailView: document.getElementById('guide-detail-view'),
    guideDetailContent: document.getElementById('guide-detail-content'),
    btnBackToGuides: document.getElementById('btn-back-to-guides'),
    favoritesGrid: document.getElementById('favorites-grid'),
    programItemsList: document.getElementById('program-items-list'),
    programPresetSelect: document.getElementById('program-preset-select'),
    addSongSelect: document.getElementById('add-song-select'),
    btnAddSongToProgram: document.getElementById('btn-add-song-to-program'),
    btnLaunchProgramSing: document.getElementById('btn-launch-program-sing'),
    btnPrintProgram: document.getElementById('btn-print-program'),
    btnShareProgram: document.getElementById('btn-share-program'),
    btnClearProgram: document.getElementById('btn-clear-program'),
    modal: document.getElementById('modal-sing-along'),
    modalTitle: document.getElementById('modal-song-title'),
    modalAuthor: document.getElementById('modal-song-author'),
    modalBody: document.getElementById('modal-lyrics-body'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    modalQueueNav: document.getElementById('modal-queue-nav'),
    queueIndicator: document.getElementById('queue-indicator'),
    btnQueuePrev: document.getElementById('btn-queue-prev'),
    btnQueueNext: document.getElementById('btn-queue-next'),
    btnModalFavorite: document.getElementById('btn-modal-favorite'),
    btnModalAddProgram: document.getElementById('btn-modal-add-program'),
    btnPrintSong: document.getElementById('btn-print-song'),
    btnFontNormal: document.getElementById('btn-font-normal'),
    btnFontLarge: document.getElementById('btn-font-large'),
    btnFontXlarge: document.getElementById('btn-font-xlarge'),
    toggleOriginal: document.getElementById('toggle-original-script'),
    toggleRoman: document.getElementById('toggle-roman-script'),
    toggleMeaning: document.getElementById('toggle-english-meaning')
  };

  // Switch Tab
  function switchTab(panelId) {
    state.activeTab = panelId;
    el.tabs.forEach(tab => {
      const isTarget = tab.getAttribute('data-panel') === panelId;
      tab.classList.toggle('active', isTarget);
    });
    el.panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === panelId);
    });

    if (panelId === 'panel-calendar') renderCalendar();
    if (panelId === 'panel-bhajans') renderLibrary();
    if (panelId === 'panel-guides') renderGuidesList();
    if (panelId === 'panel-program') renderProgram();
    if (panelId === 'panel-favorites') renderFavorites();

    window.location.hash = panelId.replace('panel-', '');
  }

  // 1. CALENDAR MODULE
  function renderCalendar() {
    const loc = window.BHAKTI_CALENDAR.locations[state.location];
    if (!loc) return;

    el.todayLocationName.textContent = loc.name;
    const now = new Date();
    el.todayGregorianDate.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ` (${loc.region})`;

    el.valSun.textContent = `Rise: ${loc.sunriseApprox} · Set: ${loc.sunsetApprox}`;
    el.valTithi.textContent = "Krishna Paksha Ashtami / Navami";
    el.valMasa.textContent = "Bhadrapada (Purnimanta tradition)";
    el.valFasting.textContent = "Sattvic vegetarian diet; evening prayers & aarti";

    // Upcoming Events
    const events = window.BHAKTI_CALENDAR.events;
    el.calendarEventsGrid.innerHTML = events.map(evt => {
      const locDate = evt.dates[state.location] || evt.dates.phoenix;
      const relatedSongLinks = (evt.relatedSongs || []).map(id => {
        const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === id);
        return song ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.appOpenSong('${song.id}')">${song.title}</button>` : '';
      }).join(' ');

      return `
        <article class="card" id="cal-card-${evt.id}">
          <div class="card-top">
            <div>
              <h3 class="card-title">${evt.title}</h3>
              <div class="card-title-original">${evt.titleOriginal || ''}</div>
            </div>
            <span class="badge badge-festival">${locDate.weekday}</span>
          </div>
          <div class="card-meta">
            <span class="badge badge-primary">${locDate.date}</span>
            <span class="badge">${locDate.tithi}</span>
          </div>
          <p class="card-desc">${evt.significance}</p>
          <div style="font-size: 13px; color: #9a3412; font-weight: 600; margin-bottom: 12px;">
            Fasting: <span style="font-weight: 400; color: var(--text-main);">${evt.fasting}</span>
          </div>
          <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Connected Prayers & Kirtan:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${relatedSongLinks}
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appOpenGuide('${evt.guideId}')">View Guide →</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.appAddFestivalToProgram('${evt.id}')">+ Program</button>
          </div>
        </article>
      `;
    }).join('');
  }

  // 2. BHAJANS & PRAYERS LIBRARY MODULE
  function renderLibrary() {
    const songs = window.BHAKTI_LIBRARY || [];
    const query = normalizeText(state.searchQuery);

    const filtered = songs.filter(song => {
      // Language filter
      if (state.filterLanguage !== 'all' && song.language !== state.filterLanguage) return false;
      // Category filter
      if (state.filterCategory !== 'all' && song.category !== state.filterCategory) return false;
      // Deity filter
      if (state.filterDeity !== 'all' && song.deity !== state.filterDeity) return false;

      // Search Query filter
      if (!query) return true;
      const haystack = normalizeText(
        song.title + ' ' +
        song.titleOriginal + ' ' +
        song.author + ' ' +
        song.deity + ' ' +
        song.tradition + ' ' +
        (song.refrain ? song.refrain.roman + ' ' + song.refrain.original + ' ' + song.refrain.translation : '') + ' ' +
        song.verses.map(v => v.roman + ' ' + v.original + ' ' + v.translation).join(' ')
      );
      return haystack.includes(query);
    });

    if (filtered.length === 0) {
      el.songsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🔍</div>
          <h3>No Devotional Songs Found</h3>
          <p>Try broadening your search term or resetting your language and category filters.</p>
        </div>
      `;
      return;
    }

    el.songsGrid.innerHTML = filtered.map(song => {
      const isFav = state.favorites.includes(song.id);
      return `
        <article class="card" id="song-card-${song.id}">
          <div class="card-top">
            <div>
              <h3 class="card-title">${song.title}</h3>
              <div class="card-title-original">${song.titleOriginal}</div>
            </div>
            <button type="button" class="btn-favorite ${isFav ? 'active' : ''}" onclick="window.appToggleFavorite('${song.id}')" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="Favorite ${song.title}">♥</button>
          </div>
          <div class="card-meta">
            <span class="badge badge-primary">${song.language}</span>
            <span class="badge">${song.category.toUpperCase()}</span>
            <span class="badge">${song.deity}</span>
          </div>
          <p class="card-desc">${song.description || (song.refrain ? song.refrain.translation : '')}</p>
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
            By: <strong>${song.author}</strong> · ${song.tradition}
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="window.appOpenSong('${song.id}')">Sing Along / Read</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appAddToProgram('${song.id}')">+ Program</button>
          </div>
        </article>
      `;
    }).join('');

    // Also populate Add Song dropdown in home program
    populateAddSongSelect(songs);
  }

  function populateAddSongSelect(songs) {
    const currentVal = el.addSongSelect.value;
    el.addSongSelect.innerHTML = '<option value="">-- Choose a Bhajan or Prayer --</option>' +
      songs.map(s => `<option value="${s.id}">${s.title} (${s.language} ${s.category})</option>`).join('');
    el.addSongSelect.value = currentVal;
  }

  // 3. FESTIVAL GUIDES MODULE
  function renderGuidesList() {
    el.guidesListView.style.display = 'block';
    el.guideDetailView.style.display = 'none';

    const guides = window.BHAKTI_GUIDES || [];
    el.guidesGrid.innerHTML = guides.map(g => {
      return `
        <article class="card" id="guide-card-${g.id}">
          <div class="card-top">
            <div>
              <h3 class="card-title">${g.title}</h3>
              <div class="card-title-original">${g.subtitle}</div>
            </div>
          </div>
          <p class="card-desc">${g.summary}</p>
          <div style="margin-bottom: 14px; font-size: 13px;">
            <strong>Fasting note:</strong> ${g.fastingGuide.slice(0, 100)}...
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="window.appOpenGuide('${g.id}')">Read Guide & Songs →</button>
          </div>
        </article>
      `;
    }).join('');
  }

  function openGuideDetail(guideId) {
    const guide = (window.BHAKTI_GUIDES || []).find(g => g.id === guideId);
    if (!guide) return;

    state.activeGuideId = guideId;
    el.guidesListView.style.display = 'none';
    el.guideDetailView.style.display = 'block';

    const connectedSongCards = (guide.connectedSongs || []).map(id => {
      const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === id);
      if (!song) return '';
      return `
        <div style="background: #ffffff; padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <strong>${song.title}</strong>
            <div style="font-size: 12px; color: var(--text-muted);">${song.titleOriginal} · ${song.language}</div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="window.appOpenSong('${song.id}')">Sing Along</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appAddToProgram('${song.id}')">+ Program</button>
          </div>
        </div>
      `;
    }).join('');

    el.guideDetailContent.innerHTML = `
      <header class="guide-detail-header">
        <h2 class="guide-detail-title">${guide.title}</h2>
        <p class="guide-detail-sub">${guide.subtitle}</p>
      </header>

      <div class="guide-section-block">
        <h3>Overview & Spiritual Meaning</h3>
        <p>${guide.summary}</p>
      </div>

      <div class="guide-section-block">
        <h3>Sacred History & Story for Families</h3>
        <p>${guide.story}</p>
      </div>

      <div class="guide-section-block" style="background: var(--bg-card-alt); padding: 16px; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
        <h3 style="color: #9a3412;">Fasting & Vrata Guidelines</h3>
        <p>${guide.fastingGuide}</p>
      </div>

      <div class="guide-section-block">
        <h3>Home Celebration & Family Activities</h3>
        <p>${guide.familyTips}</p>
      </div>

      <div class="guide-connected-songs">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h3 style="margin: 0;">Connected Prayers, Kirtans & Aartis</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.appLoadRecommendedProgram('${guide.id}')">Load Full Festival Program</button>
        </div>
        ${connectedSongCards}
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = `guide=${guideId}`;
  }

  // 4. PREPARE HOME PROGRAM MODULE
  function renderProgram() {
    const songs = window.BHAKTI_LIBRARY || [];
    if (state.program.length === 0) {
      el.programItemsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📿</div>
          <h3>Your Home Program is Empty</h3>
          <p>Select a preset above or add opening prayers, kirtans, and aartis below to prepare your gathering.</p>
        </div>
      `;
      return;
    }

    el.programItemsList.innerHTML = state.program.map((songId, index) => {
      const song = songs.find(s => s.id === songId);
      if (!song) return '';
      return `
        <div class="program-item" id="program-item-${index}">
          <div class="program-item-order">${index + 1}</div>
          <div class="program-item-details">
            <div class="program-item-title">${song.title}</div>
            <div class="program-item-sub">${song.titleOriginal} · ${song.language} · ${song.category.toUpperCase()}</div>
          </div>
          <div class="program-item-actions">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appMoveProgramItem(${index}, -1)" ${index === 0 ? 'disabled' : ''} title="Move Up">↑</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appMoveProgramItem(${index}, 1)" ${index === state.program.length - 1 ? 'disabled' : ''} title="Move Down">↓</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appOpenSong('${song.id}')">View</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.appRemoveProgramItem(${index})" title="Remove">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. FAVORITES MODULE
  function renderFavorites() {
    const songs = window.BHAKTI_LIBRARY || [];
    const favSongs = songs.filter(s => state.favorites.includes(s.id));

    if (favSongs.length === 0) {
      el.favoritesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">♥</div>
          <h3>No Favorites Saved Yet</h3>
          <p>Click the heart icon on any bhajan or prayer to keep it readily available for daily recitation.</p>
        </div>
      `;
      return;
    }

    el.favoritesGrid.innerHTML = favSongs.map(song => {
      return `
        <article class="card" id="fav-card-${song.id}">
          <div class="card-top">
            <div>
              <h3 class="card-title">${song.title}</h3>
              <div class="card-title-original">${song.titleOriginal}</div>
            </div>
            <button type="button" class="btn-favorite active" onclick="window.appToggleFavorite('${song.id}')" title="Remove from favorites">♥</button>
          </div>
          <div class="card-meta">
            <span class="badge badge-primary">${song.language}</span>
            <span class="badge">${song.category.toUpperCase()}</span>
          </div>
          <p class="card-desc">${song.description || (song.refrain ? song.refrain.translation : '')}</p>
          <div class="card-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="window.appOpenSong('${song.id}')">Sing Along</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.appAddToProgram('${song.id}')">+ Program</button>
          </div>
        </article>
      `;
    }).join('');
  }

  // 6. SING-ALONG MODAL READER
  function openSongModal(songId, queue = [], queueIndex = -1) {
    const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === songId);
    if (!song) return;

    state.modalSongId = songId;
    state.modalQueue = queue;
    state.modalQueueIndex = queueIndex;

    el.modalTitle.textContent = song.title;
    el.modalAuthor.textContent = `${song.author} · ${song.tradition} (${song.language})`;

    // Queue Navigation
    if (queue.length > 1 && queueIndex >= 0) {
      el.modalQueueNav.style.display = 'flex';
      el.queueIndicator.textContent = `Song ${queueIndex + 1} of ${queue.length}`;
      el.btnQueuePrev.disabled = queueIndex === 0;
      el.btnQueueNext.disabled = queueIndex === queue.length - 1;
    } else {
      el.modalQueueNav.style.display = 'none';
    }

    // Modal favorite button state
    const isFav = state.favorites.includes(song.id);
    el.btnModalFavorite.classList.toggle('active', isFav);
    el.btnModalFavorite.textContent = isFav ? '♥ Favorited' : '♡ Favorite';

    renderModalVerses(song);

    el.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.location.hash = `song=${song.id}`;
  }

  function renderModalVerses(song) {
    let html = '';

    // Refrain
    if (song.refrain) {
      html += `
        <div class="lyrics-verse" style="background: #fffaf0; padding: 16px; border-radius: var(--radius-sm); border: 1px solid #fed7aa; margin-bottom: 24px;">
          <div class="verse-header" style="color: #c2410c;">Refrain (ধুয়ো / टेक)</div>
          ${state.showOriginal ? `<div class="verse-original" style="color: #9a3412;">${song.refrain.original}</div>` : ''}
          ${state.showRoman ? `<div class="verse-roman" style="font-weight: 600;">${song.refrain.roman}</div>` : ''}
          ${state.showMeaning ? `<div class="verse-translation">${song.refrain.translation}</div>` : ''}
        </div>
      `;
    }

    // Verses
    song.verses.forEach(v => {
      html += `
        <div class="lyrics-verse">
          <div class="verse-header">Verse ${v.number}</div>
          ${state.showOriginal ? `<div class="verse-original">${v.original}</div>` : ''}
          ${state.showRoman ? `<div class="verse-roman">${v.roman}</div>` : ''}
          ${state.showMeaning ? `<div class="verse-translation">${v.translation}</div>` : ''}
        </div>
      `;
    });

    html += `
      <div style="font-size: 13px; color: var(--text-muted); border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 24px;">
        <strong>Source & Edition:</strong> ${song.sourceEdition}<br>
        <strong>Review Status:</strong> ${song.reviewStatus}
      </div>
    `;

    el.modalBody.className = `modal-body ${state.fontSize}`;
    el.modalBody.innerHTML = html;
  }

  function closeModal() {
    el.modal.classList.remove('active');
    document.body.style.overflow = '';
    state.modalSongId = null;
    state.modalQueue = [];
    state.modalQueueIndex = -1;
    if (window.location.hash.startsWith('#song=')) {
      window.location.hash = state.activeTab.replace('panel-', '');
    }
  }

  // Global actions for inline event handlers
  window.appOpenSong = function (songId) {
    openSongModal(songId);
  };

  window.appOpenGuide = function (guideId) {
    switchTab('panel-guides');
    openGuideDetail(guideId);
  };

  window.appToggleFavorite = function (songId) {
    const idx = state.favorites.indexOf(songId);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
    } else {
      state.favorites.push(songId);
    }
    localStorage.setItem('bhakti_favorites', JSON.stringify(state.favorites));

    if (state.activeTab === 'panel-bhajans') renderLibrary();
    if (state.activeTab === 'panel-favorites') renderFavorites();

    if (state.modalSongId === songId) {
      const isFav = state.favorites.includes(songId);
      el.btnModalFavorite.classList.toggle('active', isFav);
      el.btnModalFavorite.textContent = isFav ? '♥ Favorited' : '♡ Favorite';
    }
  };

  window.appAddToProgram = function (songId) {
    if (!state.program.includes(songId)) {
      state.program.push(songId);
      localStorage.setItem('bhakti_program', JSON.stringify(state.program));
      renderProgram();
      alert('Added to Home Program!');
    } else {
      alert('This prayer/song is already in your Home Program.');
    }
  };

  window.appAddFestivalToProgram = function (eventId) {
    const evt = (window.BHAKTI_CALENDAR.events || []).find(e => e.id === eventId);
    if (!evt || !evt.relatedSongs) return;

    let addedCount = 0;
    evt.relatedSongs.forEach(id => {
      if (!state.program.includes(id)) {
        state.program.push(id);
        addedCount++;
      }
    });
    localStorage.setItem('bhakti_program', JSON.stringify(state.program));
    renderProgram();
    alert(`Added ${addedCount} festival song(s) to your Home Program!`);
  };

  window.appLoadRecommendedProgram = function (guideId) {
    const guide = (window.BHAKTI_GUIDES || []).find(g => g.id === guideId);
    if (!guide || !guide.recommendedProgram) return;

    state.program = [...guide.recommendedProgram];
    localStorage.setItem('bhakti_program', JSON.stringify(state.program));
    renderProgram();
    switchTab('panel-program');
    alert(`Loaded complete ${guide.title} Home Program!`);
  };

  window.appMoveProgramItem = function (index, direction) {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= state.program.length) return;
    const item = state.program.splice(index, 1)[0];
    state.program.splice(newIdx, 0, item);
    localStorage.setItem('bhakti_program', JSON.stringify(state.program));
    renderProgram();
  };

  window.appRemoveProgramItem = function (index) {
    state.program.splice(index, 1);
    localStorage.setItem('bhakti_program', JSON.stringify(state.program));
    renderProgram();
  };

  // Event Listeners Setup
  function initEvents() {
    // Navigation Tabs
    el.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('data-panel');
        switchTab(panelId);
      });
    });

    // Location Selector
    el.locationSelect.addEventListener('change', (e) => {
      state.location = e.target.value;
      renderCalendar();
    });

    // Search and Filters
    el.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderLibrary();
    });

    el.filterLang.addEventListener('change', (e) => {
      state.filterLanguage = e.target.value;
      renderLibrary();
    });

    el.filterCat.addEventListener('change', (e) => {
      state.filterCategory = e.target.value;
      renderLibrary();
    });

    el.filterDeity.addEventListener('change', (e) => {
      state.filterDeity = e.target.value;
      renderLibrary();
    });

    // Back to Guides button
    el.btnBackToGuides.addEventListener('click', () => {
      renderGuidesList();
      window.location.hash = 'guides';
    });

    // Modal Reader controls
    el.btnCloseModal.addEventListener('click', closeModal);
    el.modal.addEventListener('click', (e) => {
      if (e.target === el.modal) closeModal();
    });

    // Font size toggles
    el.btnFontNormal.addEventListener('click', () => {
      state.fontSize = 'font-normal';
      updateFontButtons();
      el.modalBody.className = `modal-body ${state.fontSize}`;
    });
    el.btnFontLarge.addEventListener('click', () => {
      state.fontSize = 'font-large';
      updateFontButtons();
      el.modalBody.className = `modal-body ${state.fontSize}`;
    });
    el.btnFontXlarge.addEventListener('click', () => {
      state.fontSize = 'font-xlarge';
      updateFontButtons();
      el.modalBody.className = `modal-body ${state.fontSize}`;
    });

    function updateFontButtons() {
      el.btnFontNormal.classList.toggle('active', state.fontSize === 'font-normal');
      el.btnFontLarge.classList.toggle('active', state.fontSize === 'font-large');
      el.btnFontXlarge.classList.toggle('active', state.fontSize === 'font-xlarge');
    }

    // Layer toggles
    el.toggleOriginal.addEventListener('click', () => {
      state.showOriginal = !state.showOriginal;
      el.toggleOriginal.classList.toggle('active', state.showOriginal);
      const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === state.modalSongId);
      if (song) renderModalVerses(song);
    });

    el.toggleRoman.addEventListener('click', () => {
      state.showRoman = !state.showRoman;
      el.toggleRoman.classList.toggle('active', state.showRoman);
      const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === state.modalSongId);
      if (song) renderModalVerses(song);
    });

    el.toggleMeaning.addEventListener('click', () => {
      state.showMeaning = !state.showMeaning;
      el.toggleMeaning.classList.toggle('active', state.showMeaning);
      const song = (window.BHAKTI_LIBRARY || []).find(s => s.id === state.modalSongId);
      if (song) renderModalVerses(song);
    });

    // Modal action buttons
    el.btnModalFavorite.addEventListener('click', () => {
      if (state.modalSongId) window.appToggleFavorite(state.modalSongId);
    });

    el.btnModalAddProgram.addEventListener('click', () => {
      if (state.modalSongId) window.appAddToProgram(state.modalSongId);
    });

    el.btnPrintSong.addEventListener('click', () => {
      window.print();
    });

    // Queue Navigation
    el.btnQueuePrev.addEventListener('click', () => {
      if (state.modalQueueIndex > 0) {
        const nextIdx = state.modalQueueIndex - 1;
        openSongModal(state.modalQueue[nextIdx], state.modalQueue, nextIdx);
      }
    });

    el.btnQueueNext.addEventListener('click', () => {
      if (state.modalQueueIndex < state.modalQueue.length - 1) {
        const nextIdx = state.modalQueueIndex + 1;
        openSongModal(state.modalQueue[nextIdx], state.modalQueue, nextIdx);
      }
    });

    // Program controls
    el.btnAddSongToProgram.addEventListener('click', () => {
      const songId = el.addSongSelect.value;
      if (songId) {
        window.appAddToProgram(songId);
      }
    });

    el.programPresetSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'evening-aarti') {
        state.program = ["sri-guru-pranam", "jaya-radha-madhava", "hare-krishna-mahamantra", "gaura-aarti", "vaishnava-pranam"];
      } else if (val === 'janmashtami') {
        state.program = ["sri-guru-pranam", "jaya-radha-madhava", "madhurashtakam", "damodarashtakam", "hare-krishna-mahamantra", "vaishnava-pranam"];
      } else if (val === 'daily-morning') {
        state.program = ["sri-guru-pranam", "pancha-tattva-mantra", "hare-krishna-mahamantra", "om-jai-jagdish-hare", "vaishnava-pranam"];
      } else if (val === 'shivaratri') {
        state.program = ["sri-guru-pranam", "maha-mrityunjaya-mantra", "om-jai-jagdish-hare", "vaishnava-pranam"];
      }
      localStorage.setItem('bhakti_program', JSON.stringify(state.program));
      renderProgram();
    });

    el.btnLaunchProgramSing.addEventListener('click', () => {
      if (state.program.length === 0) {
        alert('Please add songs to your Home Program before starting the sing-along.');
        return;
      }
      openSongModal(state.program[0], state.program, 0);
    });

    el.btnPrintProgram.addEventListener('click', () => {
      window.print();
    });

    el.btnShareProgram.addEventListener('click', () => {
      const hash = `program=${state.program.join(',')}`;
      const url = `${window.location.origin}${window.location.pathname}#${hash}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Home Program link copied to clipboard! Anyone opening this link can view this exact song queue.');
      }).catch(() => {
        alert(`Copy this URL to share your program:\n${url}`);
      });
    });

    el.btnClearProgram.addEventListener('click', () => {
      if (confirm('Clear all songs from your Home Program?')) {
        state.program = [];
        localStorage.setItem('bhakti_program', JSON.stringify(state.program));
        renderProgram();
      }
    });

    // Hash routing
    window.addEventListener('hashchange', handleHashRouting);
  }

  function handleHashRouting() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    if (hash.startsWith('song=')) {
      const songId = hash.replace('song=', '');
      openSongModal(songId);
    } else if (hash.startsWith('guide=')) {
      const guideId = hash.replace('guide=', '');
      openGuideDetail(guideId);
    } else if (hash.startsWith('program=')) {
      const list = hash.replace('program=', '').split(',').filter(Boolean);
      if (list.length > 0) {
        state.program = list;
        localStorage.setItem('bhakti_program', JSON.stringify(state.program));
        switchTab('panel-program');
      }
    } else if (['calendar', 'bhajans', 'guides', 'program', 'favorites'].includes(hash)) {
      switchTab(`panel-${hash}`);
    }
  }

  // Initialize
  function init() {
    initEvents();
    renderCalendar();
    renderLibrary();
    renderGuidesList();
    renderProgram();
    renderFavorites();

    if (window.location.hash) {
      handleHashRouting();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
