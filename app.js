// ============================================
// Lee Byung-hun Global Fan Project — app.js
// ============================================

// --- Configuration ---
const GOOGLE_FORM_URL = '#'; // Replace with actual Google Form URL
const API_URL = 'https://script.google.com/macros/s/AKfycbxYxfFLfsIgvtAQNZKSuDYOPc_XJfBvWljOYZBsvLph-_bDJAez723yKfC5lvRfvfdHSQ/exec';

// --- i18n TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    navAbout:'About Us', navSubmit:'Submit', navPhotobook:'Photobook', navMessages:'Messages', navFAQ:'FAQ', navBonus:'Bonus - Timeline',
    heroTitle:'Lee Byung-hun Global Fan Project', heroSubtitle:'Global Edition 🌍 by @cattowriter 🐱',
    heroTagline:'A Special Fanbook for Lee Byung-hun',
    heroBookTitle:'Lee Byung-hun Global Fanbook 🌍',
    heroSubmitBtn:'✉️ Submit Your Page',
    flagNote:'(updates as fans from more countries join!)',
    statSubmissions:'submissions', statDaysLeft:'days left', statCountries:'countries',
    mapTitle:'Fans from around the world 🌍', mapSubtitle:'Click on a highlighted country to see how many fans have joined',
    aboutTitle:'About the Project',
    aboutText:'📣 I have a small idea and would love to invite everyone to join this special fan project.<br><br>I just built this website myself to collect messages from fans around the world who would like to share something with Lee Byung-hun. The goal is to present them to him at the upcoming Japan fan meeting — or, if I don\'t get the chance to hand it to him personally, I will ask the staff to help deliver it.<br><br><strong>Concept:</strong> Everyone can submit messages and photos online. I will then compile everything into a printed <em>Fanbook – Global Edition</em>, a real physical book to give to him directly. (I truly hope I can hand it to him myself!)<br><br>I want him to know that there are still so many fans across the world who love and support him. 🤍<br><br>✨ <strong>This is a personal project.</strong><br>Some images may need to be resized or slightly adjusted to fit printing costs — thank you in advance for your understanding. I will personally cover all printing expenses; you only need to submit the message and photo you want included.<br>The book is expected to be around <strong>40 pages</strong> maximum.<br><br>After the collection is complete, the website will remain available as a <strong>digital version</strong>, so he can scan and read fans\' messages anytime.<br><br>⏰ <strong>To allow time for compiling and printing:</strong><br>The form will close on <strong>March 10, 2026</strong><br><small>(The book will be prepared to present in late March.)</small><br><br>💌 If you would like to participate, please submit your message on this website!',
    tlOpen:'Open', tlDeadline:'Deadline', tlPrint:'Print', tlDeliver:'Deliver',
    submitTitle:'How to Submit', submitSubtitle:'Choose the track that works best for you',
    cardATitle:'Text Message', cardADesc:'Write a heartfelt message to Lee Byung-hun. Max 300 characters. We\'ll design the page for you.', cardABadge:'No design needed',
    cardBTitle:'Photo + Message', cardBDesc:'Upload 1 image (fanart or favourite photo) + a short message. We handle the layout.', cardBBadge:'Easy',
    cardCTitle:'Full Custom Page', cardCDesc:'Design your own A4 square page (2400×2400px, PNG, 300DPI, RGB). Maximum creative freedom.', cardCBadge:'Full control',
    btnSpecSheet:'📄 Download Spec Sheet', btnSubmitNow:'Submit Now →',
    noticeContentFocus:'💛 Please keep content focused on Lee Byung-hun. To ensure appropriateness, shipping / Inhun or unrelated content may be excluded. (I\'m an Inhun fan too 🥹 — but for this project, I may need to remove any unsuitable content.)',
    msgTitle:'Messages from Fans 💌', msgSubtitle:'Public messages from fans who opted in ✨',
    msgExample:'(Example — will update automatically as fans submit)',
    faqTitle:'Frequently Asked Questions',
    faq1q:'Can I submit in any language?', faq1a:'English is preferred, but you can submit in any language. Non-English messages will be translated to English using Google Gemini AI.',
    faq2q:'Is there a cost to participate?', faq2a:'No! I will attend the fan meeting and print this fanbook myself. If I can\'t hand it over in person, I\'ll leave it with the staff.',
    faq3q:'What\'s the deadline?', faq3a:'March 10, 2026 — to allow time for compiling and printing. The book will be prepared to present in late March. Check the countdown bar above!',
    faq4q:'I want to edit my message or cancel my submission', faq4a:'You can submit a new one to replace it — we\'ll use the latest version.<br>To delete your submission, DM <a href="https://x.com/cattodata" target="_blank" rel="noopener noreferrer">@cattodata</a> on X to request removal.',
    footerDisclaimer:'This is an independent fan project. Not affiliated with Lee Byung-hun or BH Entertainment.',
  },
  th: {
    navAbout:'เกี่ยวกับเรา', navSubmit:'ส่งผลงาน', navPhotobook:'ดู Photobook', navMessages:'ข้อความ', navFAQ:'คำถาม', navBonus:'Bonus - Timeline',
    heroTitle:'Lee Byung-hun Global Fan Project', heroSubtitle:'Global Edition 🌍 by @cattowriter 🐱',
    heroTagline:'Fanbook พิเศษสำหรับอีบยองฮอน',
    heroBookTitle:'Lee Byung-hun Global Fanbook 🌍',
    heroSubmitBtn:'✉️ ส่งหน้าของคุณ',
    flagNote:'(จะอัพเดทเมื่อมีแฟนจากประเทศอื่นๆ เข้าร่วม!)',
    statSubmissions:'ผลงาน', statDaysLeft:'วันที่เหลือ', statCountries:'ประเทศ',
    mapTitle:'แฟนจากทั่วโลก 🌍', mapSubtitle:'คลิกที่ประเทศที่ไฮไลต์เพื่อดูจำนวนแฟนที่เข้าร่วม',
    aboutTitle:'เกี่ยวกับโปรเจกต์',
    aboutText:'📣 วันนี้มีไอเดียอยากชวนทุกคนมาร่วมทำโปรเจ็คเล็ก ๆ ด้วยกันค่ะ เพิ่งเขียนเว็บไซต์ขึ้นมาเองทั้งหมด เพื่ออยากรวบรวม "ข้อความจากแฟน ๆ ทั่วโลก" ที่อยากบอกอีบยองฮอน แล้วนำไปมอบให้เขาในงานแฟนมีตติ้งที่ญี่ปุ่นครั้งนี้ — หรือถ้าไม่มีโอกาสได้ให้ด้วยตัวเอง จะฝากสตาฟช่วยส่งให้แทนค่ะ<br><br><strong>Concept</strong> คือเปิดให้ทุกคนส่งข้อความและรูปเข้ามาทางออนไลน์ จากนั้นจะรวบรวมไปจัดทำเป็น <em>Fanbook Global Edition</em> เล่มจริง พิมพ์ออกมาเพื่อมอบให้เขาโดยตรง (หวังว่าจะได้ยื่นให้ด้วยตัวเองจริง ๆ นะ!)<br><br>อยากให้อีบยองฮอนรับรู้ว่า… ยังมีแฟนมากมายจากทั่วโลกที่รักและคอยสนับสนุนเขาอยู่เสมอ 🤍<br><br>✨ <strong>โปรเจ็คนี้เป็นโปรเจ็คส่วนตัว</strong><br>หากรูปที่ส่งมาอาจมีการย่อหรือปรับเล็กน้อย เพื่อความเหมาะสมด้านค่าใช้จ่ายในการพิมพ์ ต้องขออภัยล่วงหน้าด้วยนะคะ (ฉันจะเป็นคนออกค่า Print ทั้งหมดเองค่ะ — ทุกคนเพียงแค่ส่งข้อความและรูปที่อยากให้ใส่ในเล่มก็พอ)<br>คาดว่าจะสามารถพิมพ์ได้ประมาณไม่เกิน <strong>40 หน้า</strong><br><br>หลังจากรวบรวมเสร็จ เว็บไซต์นี้จะถูกเก็บไว้เป็น <strong>เวอร์ชัน Digital</strong> ด้วย เพื่อให้อีบยองฮอนสามารถสแกนและเข้ามาอ่านข้อความจากแฟน ๆ ได้ตลอดเวลา<br><br>⏰ <strong>เพื่อเผื่อเวลาในการรวบรวมและพิมพ์</strong><br>Form จะปิดวันที่ <strong>10 มีนาคม 2026</strong><br><small>(เพื่อเตรียมนำไปมอบช่วงปลายเดือนมีนาคม)</small><br><br>💌 หากต้องการร่วมส่งข้อความ กรอกได้ที่เว็บไซต์นี้เลย',
    tlOpen:'เปิดรับ', tlDeadline:'ปิดรับ', tlPrint:'พิมพ์', tlDeliver:'จัดส่ง',
    submitTitle:'วิธีส่งผลงาน', submitSubtitle:'เลือก Track ที่เหมาะกับคุณ',
    cardATitle:'ข้อความอย่างเดียว', cardADesc:'เขียนข้อความจากใจถึงอีบยองฮอน ไม่เกิน 300 ตัวอักษร เราออกแบบหน้าให้', cardABadge:'ไม่ต้องออกแบบ',
    cardBTitle:'รูป + ข้อความ', cardBDesc:'อัปโหลดรูป 1 รูป (แฟนอาร์ตหรือรูปที่ชอบ) + ข้อความสั้นๆ เราจัดเลย์เอาต์ให้', cardBBadge:'ง่ายมาก',
    cardCTitle:'ออกแบบเอง', cardCDesc:'ออกแบบหน้าเอง (2400×2400px, PNG, 300DPI, RGB) อิสระเต็มที่!', cardCBadge:'ควบคุมเต็มที่',
    btnSpecSheet:'📄 ดาวน์โหลด Spec Sheet', btnSubmitNow:'ส่งผลงาน →',
    noticeContentFocus:'💛 ขอความร่วมมือให้เนื้อหาโฟกัสที่ตัวอีบยองฮอนเท่านั้น เนื่องจากเป็นโปรเจ็คที่มอบให้เขาโดยตรง ขอสงวนสิทธิ์งดเนื้อหาเกี่ยวกับ Inhun / shipping หรือบุคคลอื่น เพื่อความเหมาะสมของงานนะคะ (ส่วนตัวเป็น Inhun เหมือนกันค่ะ 🥹 หากมีเนื้อหาที่ไม่เหมาะสม ขออนุญาตตัดออกนะคะ)','
    msgTitle:'ข้อความจากแฟนๆ 💌', msgSubtitle:'ข้อความจากแฟนที่อนุญาตให้แสดง ✨',
    msgExample:'(ตัวอย่าง — จะอัพเดทอัตโนมัติเมื่อมีคนส่ง)',
    faqTitle:'คำถามที่พบบ่อย',
    faq1q:'ส่งภาษาอะไรก็ได้ไหม?', faq1a:'ภาษาอังกฤษจะดีที่สุด แต่หากต้องการส่งภาษาอื่น จะทำการแปลด้วย Google Gemini เพื่อแปลงเป็นภาษาอังกฤษ',
    faq2q:'มีค่าใช้จ่ายไหม?', faq2a:'ไม่มี ฉันจะไป Fan Meeting แล้วเป็นคน Print Fanbook นี้ไปเอง หากไม่ได้ให้กับมือจะฝากสตาฟไว้',
    faq3q:'เดดไลน์เมื่อไร?', faq3a:'10 มีนาคม 2026 — เพื่อเผื่อเวลาในการรวบรวมและพิมพ์ จะเตรียมนำไปมอบช่วงปลายเดือนมีนาคม ดูนับถอยหลังด้านบนได้เลย!',
    faq4q:'อยากแก้ไขข้อความ หรือเปลี่ยนใจไม่อยากส่งแล้ว', faq4a:'สามารถส่งอันใหม่มาทับ เราจะนับจากอันใหม่<br>สำหรับการลบ Inbox <a href="https://x.com/cattodata" target="_blank" rel="noopener noreferrer">@cattodata</a> เพื่อขอลบ',
    footerDisclaimer:'โปรเจกต์แฟนอิสระ ไม่เกี่ยวข้องกับอีบยองฮอนหรือ BH Entertainment',
  }
};

let currentLang = 'en';

function setLang(l) {
  currentLang = l;
  document.body.setAttribute('data-lang', l);
  document.querySelectorAll('[data-lang-btn]').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-lang-btn') === l)
  );
  const dict = TRANSLATIONS[l] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (dict[k] !== undefined) el.innerHTML = dict[k];
  });
}

// --- Country code to flag emoji + name mapping ---
const COUNTRY_DATA = {
  AU: { flag: '🇦🇺', name: 'Australia' },
  TH: { flag: '🇹🇭', name: 'Thailand' },
  JP: { flag: '🇯🇵', name: 'Japan' },
  KR: { flag: '🇰🇷', name: 'South Korea' },
  US: { flag: '🇺🇸', name: 'USA' },
  FR: { flag: '🇫🇷', name: 'France' },
  ES: { flag: '🇪🇸', name: 'Spain' },
  IT: { flag: '🇮🇹', name: 'Italy' },
  GB: { flag: '🇬🇧', name: 'UK' },
  DE: { flag: '🇩🇪', name: 'Germany' },
  CA: { flag: '🇨🇦', name: 'Canada' },
  BR: { flag: '🇧🇷', name: 'Brazil' },
  MX: { flag: '🇲🇽', name: 'Mexico' },
  IN: { flag: '🇮🇳', name: 'India' },
  CN: { flag: '🇨🇳', name: 'China' },
  PH: { flag: '🇵🇭', name: 'Philippines' },
  ID: { flag: '🇮🇩', name: 'Indonesia' },
  MY: { flag: '🇲🇾', name: 'Malaysia' },
  SG: { flag: '🇸🇬', name: 'Singapore' },
  VN: { flag: '🇻🇳', name: 'Vietnam' },
  NZ: { flag: '🇳🇿', name: 'New Zealand' },
  SE: { flag: '🇸🇪', name: 'Sweden' },
  NL: { flag: '🇳🇱', name: 'Netherlands' },
  PT: { flag: '🇵🇹', name: 'Portugal' },
  RU: { flag: '🇷🇺', name: 'Russia' },
  AR: { flag: '🇦🇷', name: 'Argentina' },
  CL: { flag: '🇨🇱', name: 'Chile' },
  CO: { flag: '🇨🇴', name: 'Colombia' },
  PL: { flag: '🇵🇱', name: 'Poland' },
  TR: { flag: '🇹🇷', name: 'Turkey' },
  SA: { flag: '🇸🇦', name: 'Saudi Arabia' },
  AE: { flag: '🇦🇪', name: 'UAE' },
  TW: { flag: '🇹🇼', name: 'Taiwan' },
  HK: { flag: '🇭🇰', name: 'Hong Kong' },
};

// --- State ---
let currentData = { count: 0, cap: 100, deadline: '2026-03-10', countries: {} };
let mapInstance = null;

// ============================================
// DATA FETCHING
// ============================================
async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    currentData = data;
    updateUI(data);
  } catch (err) {
    console.warn('API fetch failed, using cached data:', err);
    updateUI(currentData);
  }
}

// ============================================
// MESSAGE WALL
// ============================================
async function loadMessageWall() {
  const wall = document.getElementById('message-wall');
  if (!wall) return;

  try {
    const res = await fetch(API_URL + '?action=submissions');
    const data = await res.json();
    const submissions = (data.submissions || []).filter(s => s.message && s.message.trim());

    // Only replace examples if real submissions exist
    if (!submissions.length) return;

    const COUNTRY_FLAGS = { AU:'🇦🇺',TH:'🇹🇭',JP:'🇯🇵',KR:'🇰🇷',US:'🇺🇸',FR:'🇫🇷',ES:'🇪🇸',IT:'🇮🇹',GB:'🇬🇧',DE:'🇩🇪',CA:'🇨🇦',BR:'🇧🇷',MX:'🇲🇽',IN:'🇮🇳',CN:'🇨🇳',PH:'🇵🇭',ID:'🇮🇩',MY:'🇲🇾',SG:'🇸🇬',VN:'🇻🇳',NZ:'🇳🇿',SE:'🇸🇪',NL:'🇳🇱',PT:'🇵🇹',RU:'🇷🇺',AR:'🇦🇷',CL:'🇨🇱',CO:'🇨🇴',PL:'🇵🇱',TR:'🇹🇷',SA:'🇸🇦',AE:'🇦🇪',TW:'🇹🇼',HK:'🇭🇰',OTHER:'🌍' };
    const COUNTRY_NAMES = { AU:'Australia',TH:'Thailand',JP:'Japan',KR:'South Korea',US:'USA',FR:'France',ES:'Spain',IT:'Italy',GB:'UK',DE:'Germany',CA:'Canada',BR:'Brazil',MX:'Mexico',IN:'India',CN:'China',PH:'Philippines',ID:'Indonesia',MY:'Malaysia',SG:'Singapore',VN:'Vietnam',NZ:'New Zealand',SE:'Sweden',NL:'Netherlands',PT:'Portugal',RU:'Russia',AR:'Argentina',CL:'Chile',CO:'Colombia',PL:'Poland',TR:'Turkey',SA:'Saudi Arabia',AE:'UAE',TW:'Taiwan',HK:'Hong Kong',OTHER:'Other' };

    const delays = ['delay-1','delay-2','delay-3'];
    wall.innerHTML = submissions.map((s, i) => {
      const flag = COUNTRY_FLAGS[s.country] || '🌍';
      const country = s.country === 'OTHER' ? (s.country_other || 'Other') : (COUNTRY_NAMES[s.country] || s.country);
      const author = `— ${s.name} · ${flag} ${country}`;
      const d = delays[i % 3];
      const translationHtml = s.message_en
        ? `<p class="message-translation">🌐 ${escapeHtml(s.message_en)}</p>`
        : '';
      return `<div class="message-card fade-in ${d}">
        <p class="message-text">${escapeHtml(s.message)}</p>
        ${translationHtml}
        <p class="message-author">${escapeHtml(author)}</p>
      </div>`;
    }).join('');

    // Hide the example note
    const noteEl = document.querySelector('[data-i18n="msgExample"]');
    if (noteEl) noteEl.style.display = 'none';

    requestAnimationFrame(() => {
      wall.querySelectorAll('.message-card').forEach(el => el.classList.add('visible'));
    });
  } catch (err) {
    console.warn('Message wall load failed:', err);
  }
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============================================
// UI UPDATES
// ============================================
function updateUI(data) {
  updateStats(data);
  updateCountdown(data.deadline);
  updateFlagRow(data.countries);
  updateMap(data.countries);
  updateSubmitButtons(data);
}

function updateStats(data) {
  const countEl = document.getElementById('stat-count');
  const capEl = document.getElementById('stat-cap');
  const countriesEl = document.getElementById('stat-countries');
  const progressBar = document.getElementById('progress-fill');

  if (countEl) countEl.textContent = data.count;
  if (capEl) capEl.textContent = data.cap;
  if (countriesEl) countriesEl.textContent = Object.keys(data.countries).length;

  if (progressBar) {
    const pct = Math.min((data.count / data.cap) * 100, 100);
    progressBar.style.width = pct + '%';
  }
}

function updateCountdown(deadline) {
  const el = document.getElementById('stat-countdown');
  if (!el) return;
  const now = new Date();
  const end = new Date(deadline + 'T23:59:59');
  const diff = end - now;
  if (diff <= 0) {
    el.textContent = '0';
    return;
  }
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  el.textContent = days;
}

function updateFlagRow(countries) {
  const el = document.getElementById('flag-row');
  if (!el) return;
  const codes = Object.keys(countries);
  if (codes.length > 0) {
    // Show flags for countries with actual submissions
    el.innerHTML = codes.map(code => {
      const c = COUNTRY_DATA[code];
      return c ? `<span class="flag-emoji" title="${c.name}">${c.flag}</span>` : '';
    }).join('') + `<span class="flag-note" data-i18n="flagNote">(updates as fans from more countries join!)</span>`;
  } else {
    // No submissions yet — show invitation note
    el.innerHTML = `<span class="flag-note" data-i18n="flagNote">(flags will appear as fans from around the world join!)</span>`;
  }
  // Apply translations
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  el.querySelectorAll('[data-i18n]').forEach(e => {
    const k = e.getAttribute('data-i18n');
    if (dict[k]) e.textContent = dict[k];
  });
}

function updateSubmitButtons(data) {
  const closed = data.count >= data.cap;
  document.querySelectorAll('.cta-submit').forEach(btn => {
    if (closed) {
      btn.textContent = 'Submissions Closed 🔒';
      btn.classList.add('closed');
      btn.setAttribute('href', '#');
      btn.style.pointerEvents = 'none';
    } else {
      btn.style.pointerEvents = '';
    }
  });
}

// ============================================
// WORLD MAP (jsvectormap)
// ============================================
function initMap() {
  const container = document.getElementById('world-map');
  if (!container || typeof jsVectorMap === 'undefined') {
    console.warn('Map library not loaded');
    return;
  }

  // Build region values and series
  const values = {};
  Object.keys(currentData.countries).forEach(code => {
    values[code] = currentData.countries[code];
  });

  mapInstance = new jsVectorMap({
    selector: '#world-map',
    map: 'world',
    backgroundColor: 'transparent',
    zoomButtons: false,
    zoomOnScroll: false,
    draggable: true,
    showTooltip: true,

    regionStyle: {
      initial: {
        fill: '#d4cfc8',
        stroke: '#c4bfb8',
        strokeWidth: 0.5,
      },
      hover: {
        fill: '#b8a88a',
        cursor: 'pointer',
      },
      selected: {
        fill: '#8b7355',
      },
    },

    series: {
      regions: [{
        attribute: 'fill',
        scale: {
          low: '#c4a87c',
          high: '#6b5335',
        },
        values: values,
        min: 0,
        max: Math.max(...Object.values(values), 1),
      }]
    },

    onRegionTooltipShow(event, tooltip, code) {
      const c = COUNTRY_DATA[code];
      const count = currentData.countries[code];
      if (c && count) {
        tooltip.css({ backgroundColor: '#fff', color: '#2c2c2c', fontFamily: 'Lato, sans-serif', borderRadius: '8px', padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' });
        tooltip.text(`${c.flag} ${c.name} — ${count} submission${count > 1 ? 's' : ''}`);
      } else if (c) {
        tooltip.text(`${c.flag} ${c.name}`);
      }
    },

    onRegionClick(event, code) {
      const c = COUNTRY_DATA[code];
      const count = currentData.countries[code];
      if (c && count) {
        showCountryModal(code, c, count);
      }
    },
  });
}

function updateMap(countries) {
  if (!mapInstance) return;
  const values = {};
  Object.keys(countries).forEach(code => {
    values[code] = countries[code];
  });
  try {
    mapInstance.params.series.regions[0].values = values;
    // Reset and re-apply colors
    mapInstance.series.regions[0].setValues(values);
  } catch (e) {
    // Fallback: reinitialize
  }
}

function showCountryModal(code, countryInfo, count) {
  const modal = document.getElementById('country-modal');
  if (!modal) return;
  document.getElementById('modal-flag').textContent = countryInfo.flag;
  document.getElementById('modal-country').textContent = countryInfo.name;
  document.getElementById('modal-count').textContent = `${count} submission${count > 1 ? 's' : ''}`;
  modal.classList.add('active');
}

function closeCountryModal() {
  const modal = document.getElementById('country-modal');
  if (modal) modal.classList.remove('active');
}

// ============================================
// ACCORDION (FAQ)
// ============================================
function initAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// MOBILE NAV
// ============================================
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Detect browser language
  const bl = navigator.language || '';
  setLang(bl.startsWith('th') ? 'th' : 'en');

  // Initial data load
  fetchData();
  loadMessageWall();

  // Periodic refresh every 60 seconds
  setInterval(fetchData, 60000);

  // Init components
  initAccordion();
  initSmoothScroll();
  initScrollAnimations();
  initMobileNav();

  // Init map after a short delay to ensure DOM + lib ready
  setTimeout(() => {
    initMap();
  }, 500);

  // Modal close
  document.getElementById('modal-close')?.addEventListener('click', closeCountryModal);
  document.getElementById('country-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'country-modal') closeCountryModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCountryModal();
  });
});
