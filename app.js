// ============================================
// H & M World Tour - Interactive Trip Tracker
// ============================================

(function () {
  'use strict';

  // ---- State ----
  let map;
  let markers = {};
  let noteMarkers = [];
  let routeLine;
  let currentFilter = 'all';
  let selectedImageData = null;

  // ---- Helpers ----
  function parseDate(str) {
    return new Date(str + 'T00:00:00');
  }

  function formatDateRange(start, end) {
    const s = parseDate(start);
    const e = parseDate(end);
    const opts = { month: 'short', day: 'numeric' };
    if (start === end) {
      return s.toLocaleDateString('en-US', opts);
    }
    return s.toLocaleDateString('en-US', opts) + ' – ' + e.toLocaleDateString('en-US', opts);
  }

  function getTripStatus(stop) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = parseDate(stop.startDate);
    const end = parseDate(stop.endDate);
    if (today > end) return 'visited';
    if (today >= start && today <= end) return 'active';
    return 'upcoming';
  }

  function getTripProgress() {
    const today = new Date();
    const tripStart = parseDate('2026-04-12');
    const tripEnd = parseDate('2026-06-29');
    if (today < tripStart) return 0;
    if (today > tripEnd) return 100;
    const total = tripEnd - tripStart;
    const elapsed = today - tripStart;
    return Math.round((elapsed / total) * 100);
  }

  function getDayNumber() {
    const today = new Date();
    const tripStart = parseDate('2026-04-12');
    if (today < tripStart) {
      const diff = Math.ceil((tripStart - today) / 86400000);
      return `${diff} days until takeoff!`;
    }
    const tripEnd = parseDate('2026-06-29');
    if (today > tripEnd) {
      return 'Trip complete! What an adventure!';
    }
    const day = Math.ceil((today - tripStart) / 86400000) + 1;
    return `Day <span class="day-number">${day}</span> of 79`;
  }

  // ---- Notes Storage ----
  function getNotes() {
    try {
      return JSON.parse(localStorage.getItem('hm-trip-notes') || '{}');
    } catch {
      return {};
    }
  }

  function saveNotes(notes) {
    localStorage.setItem('hm-trip-notes', JSON.stringify(notes));
  }

  function getNotesForStop(stopId) {
    const notes = getNotes();
    return notes[stopId] || [];
  }

  function addNote(stopId, text, imageData) {
    const notes = getNotes();
    if (!notes[stopId]) notes[stopId] = [];
    notes[stopId].push({
      id: Date.now(),
      text: text,
      image: imageData,
      date: new Date().toISOString()
    });
    saveNotes(notes);
  }

  function deleteNote(stopId, noteId) {
    const notes = getNotes();
    if (notes[stopId]) {
      notes[stopId] = notes[stopId].filter(n => n.id !== noteId);
      if (notes[stopId].length === 0) delete notes[stopId];
      saveNotes(notes);
    }
  }

  function getAllNotesFlat() {
    const notes = getNotes();
    const flat = [];
    for (const stopId in notes) {
      const stop = TRIP_DATA.find(s => s.id === stopId);
      if (!stop) continue;
      for (const note of notes[stopId]) {
        flat.push({ ...note, stopId, lat: stop.lat, lng: stop.lng, city: stop.city });
      }
    }
    return flat;
  }

  // ---- Map Setup ----
  function initMap() {
    map = L.map('map', {
      center: [25, 40],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: true,
      attributionControl: false
    });

    // Stamen-style watercolor tiles (Stadia Maps hosts these now)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
      maxZoom: 16,
      attribution: '&copy; Stamen Design, &copy; OpenStreetMap'
    }).addTo(map);

    // Add a subtle label layer on top
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 16,
      opacity: 0.45,
      attribution: ''
    }).addTo(map);

    // Draw route
    drawRoute();

    // Add location markers
    TRIP_DATA.forEach(stop => {
      addMarker(stop);
    });

    // Add note markers
    refreshNoteMarkers();

    // Fit bounds to show all markers
    const bounds = TRIP_DATA.map(s => [s.lat, s.lng]);
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  function drawRoute() {
    const points = [];
    for (const id of ROUTE_ORDER) {
      const stop = TRIP_DATA.find(s => s.id === id);
      if (stop) points.push([stop.lat, stop.lng]);
    }

    routeLine = L.polyline(points, {
      color: '#c1666b',
      weight: 2.5,
      opacity: 0.5,
      dashArray: '8, 6',
      className: 'route-line',
      smoothFactor: 1.5
    }).addTo(map);
  }

  function addMarker(stop) {
    const status = getTripStatus(stop);
    const notes = getNotesForStop(stop.id);
    const hasNotes = notes.length > 0;

    const icon = L.divIcon({
      className: `pin-marker ${status} ${hasNotes ? 'has-notes' : ''}`,
      html: `<div class="pin-head" style="background:${stop.color}">
               <span class="pin-emoji">${stop.emoji}</span>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon: icon }).addTo(map);

    const popupContent = `
      <div class="popup-content">
        <h3>${stop.emoji} ${stop.city}</h3>
        <p>${stop.country}</p>
        <p>${formatDateRange(stop.startDate, stop.endDate)}</p>
        ${hasNotes ? `<p style="font-size:0.8rem;color:#a3b18a">${notes.length} note${notes.length > 1 ? 's' : ''} pinned</p>` : ''}
        <button class="popup-btn" onclick="window.openStopModal('${stop.id}')">Open Journal</button>
      </div>
    `;

    marker.bindPopup(popupContent, { className: 'map-popup' });
    markers[stop.id] = marker;
  }

  function refreshMarker(stop) {
    if (markers[stop.id]) {
      map.removeLayer(markers[stop.id]);
    }
    addMarker(stop);
  }

  function refreshNoteMarkers() {
    // Clear old note markers
    noteMarkers.forEach(m => map.removeLayer(m));
    noteMarkers = [];

    const allNotes = getAllNotesFlat();
    allNotes.forEach((note, i) => {
      // Offset slightly so they don't stack
      const offset = (i % 5) * 0.003;
      const icon = L.divIcon({
        className: 'note-marker',
        html: `<div class="note-marker-inner ${note.image ? 'has-image' : ''}">${note.text ? note.text.substring(0, 20) : 'Photo'}</div>`,
        iconSize: [120, 26],
        iconAnchor: [60, 26]
      });

      const m = L.marker([note.lat + 0.015 + offset, note.lng + 0.02 + offset], { icon }).addTo(map);
      m.on('click', () => showViewNoteModal(note));
      noteMarkers.push(m);
    });
  }

  // ---- Itinerary Panel ----
  function renderItinerary() {
    const list = document.getElementById('itinerary-list');
    list.innerHTML = '';

    // Day counter
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-counter';
    dayDiv.innerHTML = getDayNumber();
    list.appendChild(dayDiv);

    // Progress bar
    const progressDiv = document.createElement('div');
    progressDiv.className = 'progress-bar';
    progressDiv.innerHTML = `<div class="progress-fill" style="width:${getTripProgress()}%"></div>`;
    list.appendChild(progressDiv);

    let activeCard = null;

    TRIP_DATA.forEach(stop => {
      const status = getTripStatus(stop);

      if (currentFilter === 'current' && status !== 'active') return;
      if (currentFilter === 'upcoming' && status === 'visited') return;

      const notes = getNotesForStop(stop.id);
      const card = document.createElement('div');
      card.className = `itin-card ${status}`;
      card.style.setProperty('--card-color', stop.color);
      card.innerHTML = `
        <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${stop.color};border-radius:4px 4px 0 0;"></div>
        ${notes.length > 0 ? `<div class="card-note-count">${notes.length}</div>` : ''}
        <div class="card-header">
          <span class="card-emoji">${stop.emoji}</span>
          <span class="card-city">${stop.city}</span>
        </div>
        <div class="card-country">${stop.country}</div>
        <div class="card-dates">${formatDateRange(stop.startDate, stop.endDate)}</div>
        ${stop.accommodations.length > 0 ? `<div class="card-stay">${stop.accommodations[0].name}</div>` : ''}
        ${stop.specialDays.map(d => `<div class="card-special">${d.label}</div>`).join('')}
      `;

      card.addEventListener('click', () => {
        map.flyTo([stop.lat, stop.lng], 8, { duration: 1 });
        markers[stop.id].openPopup();
      });

      list.appendChild(card);

      if (status === 'active') {
        activeCard = card;
      }
    });

    // Auto-scroll to active card
    if (activeCard) {
      setTimeout(() => {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }

  // ---- Modals ----
  window.openStopModal = function (stopId) {
    const stop = TRIP_DATA.find(s => s.id === stopId);
    if (!stop) return;

    map.closePopup();

    const modal = document.getElementById('note-modal');
    document.getElementById('modal-location-title').textContent = `${stop.emoji} ${stop.city}, ${stop.country}`;
    document.getElementById('modal-dates').textContent = formatDateRange(stop.startDate, stop.endDate);

    // Accommodations
    const accDiv = document.getElementById('modal-accommodation');
    if (stop.accommodations.length > 0) {
      accDiv.innerHTML = `<strong>Staying At</strong>` +
        stop.accommodations.map(a => `<div>${a.name} <span style="color:#6b5744;font-size:0.8rem">(${a.dates})</span></div>`).join('');
      accDiv.style.display = 'block';
    } else {
      accDiv.style.display = 'none';
    }

    // Transport
    const transDiv = document.getElementById('modal-transport');
    if (stop.transport.arrival || stop.transport.departure) {
      transDiv.innerHTML = `<strong>Getting There & Away</strong>` +
        (stop.transport.arrival ? `<div>✈ Arrival: ${stop.transport.arrival}</div>` : '') +
        (stop.transport.departure ? `<div>✈ Departure: ${stop.transport.departure}</div>` : '');
      transDiv.style.display = 'block';
    } else {
      transDiv.style.display = 'none';
    }

    // Render notes
    renderNotesForModal(stopId);

    // Reset form
    document.getElementById('note-text').value = '';
    selectedImageData = null;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    preview.classList.add('hidden');

    // Save handler
    document.getElementById('save-note-btn').onclick = () => {
      const text = document.getElementById('note-text').value.trim();
      if (!text && !selectedImageData) return;
      addNote(stopId, text, selectedImageData);
      renderNotesForModal(stopId);
      refreshMarker(stop);
      refreshNoteMarkers();
      renderItinerary();
      document.getElementById('note-text').value = '';
      selectedImageData = null;
      preview.innerHTML = '';
      preview.classList.add('hidden');
    };

    modal.classList.remove('hidden');
    modal.dataset.stopId = stopId;
  };

  function renderNotesForModal(stopId) {
    const notesList = document.getElementById('notes-list');
    const notes = getNotesForStop(stopId);

    if (notes.length === 0) {
      notesList.innerHTML = '<p class="no-notes">No notes yet. Add your first memory!</p>';
      return;
    }

    notesList.innerHTML = notes.map(note => `
      <div class="note-item">
        <button class="delete-note" data-note-id="${note.id}" title="Delete note">&times;</button>
        <div class="note-date">${new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
        ${note.text ? `<div class="note-text">${escapeHtml(note.text)}</div>` : ''}
        ${note.image ? `<div class="note-image"><img src="${note.image}" alt="Travel photo" loading="lazy"></div>` : ''}
      </div>
    `).join('');

    // Delete handlers
    notesList.querySelectorAll('.delete-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = parseInt(btn.dataset.noteId);
        if (confirm('Remove this note?')) {
          deleteNote(stopId, noteId);
          renderNotesForModal(stopId);
          const stop = TRIP_DATA.find(s => s.id === stopId);
          refreshMarker(stop);
          refreshNoteMarkers();
          renderItinerary();
        }
      });
    });
  }

  function showViewNoteModal(note) {
    const modal = document.getElementById('view-note-modal');
    const body = document.getElementById('view-note-body');

    body.innerHTML = `
      ${note.text ? `<div class="view-note-text">${escapeHtml(note.text)}</div>` : ''}
      ${note.image ? `<div class="view-note-image"><img src="${note.image}" alt="Travel photo"></div>` : ''}
      <div class="view-note-location">📍 ${note.city}</div>
      <div class="view-note-date">${new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
    `;

    modal.classList.remove('hidden');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ---- Image Upload ----
  function setupImageUpload() {
    const input = document.getElementById('note-image');
    const preview = document.getElementById('image-preview');

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Compress and convert to base64
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 800;
          let w = img.width;
          let h = img.height;

          if (w > maxSize || h > maxSize) {
            if (w > h) {
              h = Math.round((h * maxSize) / w);
              w = maxSize;
            } else {
              w = Math.round((w * maxSize) / h);
              h = maxSize;
            }
          }

          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          selectedImageData = canvas.toDataURL('image/jpeg', 0.7);

          preview.innerHTML = `
            <img src="${selectedImageData}" alt="Preview">
            <button class="remove-preview" type="button">&times;</button>
          `;
          preview.classList.remove('hidden');

          preview.querySelector('.remove-preview').addEventListener('click', () => {
            selectedImageData = null;
            preview.innerHTML = '';
            preview.classList.add('hidden');
            input.value = '';
          });
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---- Event Listeners ----
  function setupEvents() {
    // Panel toggle (mobile)
    const panelToggle = document.getElementById('panel-toggle');
    const panel = document.getElementById('itinerary-panel');

    panelToggle.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    // Close panel on map click (mobile)
    map.on('click', () => {
      if (window.innerWidth <= 768) {
        panel.classList.remove('open');
      }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderItinerary();
      });
    });

    // Modal close handlers
    document.querySelectorAll('.modal-backdrop, .modal-close').forEach(el => {
      el.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
      });
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('note-modal').classList.add('hidden');
    });

    document.getElementById('view-note-close').addEventListener('click', () => {
      document.getElementById('view-note-modal').classList.add('hidden');
    });

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      }
    });

    // Image upload
    setupImageUpload();
  }

  // ---- Init ----
  function init() {
    initMap();
    renderItinerary();
    setupEvents();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
