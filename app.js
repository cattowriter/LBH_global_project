// ============================================
// Lee Byung-hun Global Fan Project — app.js
// ============================================

// --- Configuration ---
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
    aboutText:'📣 Dear Lee Byung-hun fans! I\'d love to invite you to join the <strong>"Lee Byung-hun Global Fan Project"</strong><br><br>I created a website to collect messages from fans around the world to share with Lee Byung-hun. The plan is to present them at his upcoming Japan fan meeting — or ask staff to deliver them if I don\'t get the chance personally.<br><br>Fans can submit messages and photos / Fanart online, and I will compile everything into a printed <em>Fanbook – Global Edition</em> to give to him directly. 🤍 (I truly hope I can hand it to him myself!)<br><br>✨ <strong>This is a personal project.</strong> I will cover all printing costs. Some images may be slightly resized to fit the book (estimated max ~40 pages).<br><br>Please keep content focused on Lee Byung-hun. To ensure appropriateness, shipping / Inhun or unrelated content may be excluded. (I\'m an Inhun fan too 🥹 — but for this project, I may need to remove any unsuitable content.)<br><br>The website will also remain as a <strong>digital version</strong> so he can read fans\' messages anytime.<br><br>⏰ <strong>Deadline: March 10, 2026</strong><br><small>(Book will be prepared for late March.)</small>',
    tlOpen:'Open', tlDeadline:'Deadline', tlPrint:'Print', tlDeliver:'Deliver',
    submitTitle:'How to Submit', submitSubtitle:'Choose the track that works best for you',
    cardATitle:'Text Message', cardADesc:'Write a heartfelt message to Lee Byung-hun. Max 400 characters. We\'ll design the page for you.', cardABadge:'No design needed',
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
    aboutText:'📣 วันนี้มีไอเดียอยากชวนทุกคนมาร่วมทำโปรเจ็คด้วยกันค่ะ<br><strong>"Lee Byung-hun Global Fan Project"</strong><br><br>เพิ่งเขียนเว็บไซต์ขึ้นมาเพื่อรวบรวม ข้อความและรูปจากแฟน ๆ ทั่วโลก ที่อยากบอกอีบยองฮอน เพื่อนำไปจัดทำเป็น <em>Fanbook Global Edition</em> เล่มจริง และมอบให้เขาในงานแฟนมีตติ้งที่ญี่ปุ่น (หรือฝากสตาฟส่งให้หากไม่ได้ให้ด้วยตัวเอง) 🤍<br><br>✨ <strong>โปรเจ็คนี้เป็นโปรเจ็คส่วนตัว</strong><br>เราจะออกค่า Print ทั้งหมดเอง หนังสือคาดว่าจะไม่เกินประมาณ <strong>40 หน้า</strong> และบางรูปอาจมีการย่อเล็กน้อยเพื่อให้เหมาะกับการพิมพ์<br><br>หลังจบโปรเจ็ค เว็บไซต์จะยังคงเปิดเป็น <strong>เวอร์ชัน Digital</strong> เพื่อให้อีบยองฮอนเข้ามาอ่านได้ตลอดเวลา<br><br>เนื่องจากเป็นโปรเจ็คที่มอบให้อีบยองฮอนโดยตรง ขอความร่วมมือให้เนื้อหาโฟกัสที่ตัวเขาเท่านั้น และงดเนื้อหาเกี่ยวกับ Inhun / shipping หรือบุคคลอื่น ๆ เพื่อความเหมาะสมของงานนะคะ (ส่วนตัวเป็น Inhun เหมือนกันค่ะ 🥹 หากมีเนื้อหาที่ไม่เหมาะสม ขออนุญาตตัดออกนะคะ)<br><br>⏰ <strong>กำหนดปิดรับข้อความ</strong><br>Form จะปิดวันที่ <strong>10 มีนาคม 2026</strong><br><small>(เพื่อเตรียมนำไปมอบช่วงปลายเดือนมีนาคม)</small>',
    tlOpen:'เปิดรับ', tlDeadline:'ปิดรับ', tlPrint:'พิมพ์', tlDeliver:'จัดส่ง',
    submitTitle:'วิธีส่งผลงาน', submitSubtitle:'เลือก Track ที่เหมาะกับคุณ',
    cardATitle:'ข้อความอย่างเดียว', cardADesc:'เขียนข้อความจากใจถึงอีบยองฮอน ไม่เกิน 400 ตัวอักษร เราออกแบบหน้าให้', cardABadge:'ไม่ต้องออกแบบ',
    cardBTitle:'รูป + ข้อความ', cardBDesc:'อัปโหลดรูป 1 รูป (แฟนอาร์ตหรือรูปที่ชอบ) + ข้อความสั้นๆ เราจัดเลย์เอาต์ให้', cardBBadge:'ง่ายมาก',
    cardCTitle:'ออกแบบเอง', cardCDesc:'ออกแบบหน้าเอง (2400×2400px, PNG, 300DPI, RGB) อิสระเต็มที่!', cardCBadge:'ควบคุมเต็มที่',
    btnSpecSheet:'📄 ดาวน์โหลด Spec Sheet', btnSubmitNow:'ส่งผลงาน →',
    noticeContentFocus:'💛 ขอความร่วมมือให้เนื้อหาโฟกัสที่ตัวอีบยองฮอนเท่านั้น เนื่องจากเป็นโปรเจ็คที่มอบให้เขาโดยตรง ขอสงวนสิทธิ์งดเนื้อหาเกี่ยวกับ Inhun / shipping หรือบุคคลอื่น เพื่อความเหมาะสมของงานนะคะ (ส่วนตัวเป็น Inhun เหมือนกันค่ะ 🥹 หากมีเนื้อหาที่ไม่เหมาะสม ขออนุญาตตัดออกนะคะ)',
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
  AF:{flag:'🇦🇫',name:'Afghanistan'}, AL:{flag:'🇦🇱',name:'Albania'}, DZ:{flag:'🇩🇿',name:'Algeria'},
  AD:{flag:'🇦🇩',name:'Andorra'}, AO:{flag:'🇦🇴',name:'Angola'}, AG:{flag:'🇦🇬',name:'Antigua and Barbuda'},
  AR:{flag:'🇦🇷',name:'Argentina'}, AM:{flag:'🇦🇲',name:'Armenia'}, AU:{flag:'🇦🇺',name:'Australia'},
  AT:{flag:'🇦🇹',name:'Austria'}, AZ:{flag:'🇦🇿',name:'Azerbaijan'},
  BS:{flag:'🇧🇸',name:'Bahamas'}, BH:{flag:'🇧🇭',name:'Bahrain'}, BD:{flag:'🇧🇩',name:'Bangladesh'},
  BB:{flag:'🇧🇧',name:'Barbados'}, BY:{flag:'🇧🇾',name:'Belarus'}, BE:{flag:'🇧🇪',name:'Belgium'},
  BZ:{flag:'🇧🇿',name:'Belize'}, BJ:{flag:'🇧🇯',name:'Benin'}, BT:{flag:'🇧🇹',name:'Bhutan'},
  BO:{flag:'🇧🇴',name:'Bolivia'}, BA:{flag:'🇧🇦',name:'Bosnia and Herzegovina'}, BW:{flag:'🇧🇼',name:'Botswana'},
  BR:{flag:'🇧🇷',name:'Brazil'}, BN:{flag:'🇧🇳',name:'Brunei'}, BG:{flag:'🇧🇬',name:'Bulgaria'},
  BF:{flag:'🇧🇫',name:'Burkina Faso'}, BI:{flag:'🇧🇮',name:'Burundi'},
  CV:{flag:'🇨🇻',name:'Cabo Verde'}, KH:{flag:'🇰🇭',name:'Cambodia'}, CM:{flag:'🇨🇲',name:'Cameroon'},
  CA:{flag:'🇨🇦',name:'Canada'}, CF:{flag:'🇨🇫',name:'Central African Republic'}, TD:{flag:'🇹🇩',name:'Chad'},
  CL:{flag:'🇨🇱',name:'Chile'}, CN:{flag:'🇨🇳',name:'China'}, CO:{flag:'🇨🇴',name:'Colombia'},
  KM:{flag:'🇰🇲',name:'Comoros'}, CG:{flag:'🇨🇬',name:'Congo'}, CR:{flag:'🇨🇷',name:'Costa Rica'},
  HR:{flag:'🇭🇷',name:'Croatia'}, CU:{flag:'🇨🇺',name:'Cuba'}, CZ:{flag:'🇨🇿',name:'Czech Republic'},
  DK:{flag:'🇩🇰',name:'Denmark'}, DJ:{flag:'🇩🇯',name:'Djibouti'}, DM:{flag:'🇩🇲',name:'Dominica'},
  DO:{flag:'🇩🇴',name:'Dominican Republic'}, CD:{flag:'🇨🇩',name:'DR Congo'},
  EC:{flag:'🇪🇨',name:'Ecuador'}, EG:{flag:'🇪🇬',name:'Egypt'}, SV:{flag:'🇸🇻',name:'El Salvador'},
  GQ:{flag:'🇬🇶',name:'Equatorial Guinea'}, ER:{flag:'🇪🇷',name:'Eritrea'}, EE:{flag:'🇪🇪',name:'Estonia'},
  SZ:{flag:'🇸🇿',name:'Eswatini'}, ET:{flag:'🇪🇹',name:'Ethiopia'},
  FJ:{flag:'🇫🇯',name:'Fiji'}, FI:{flag:'🇫🇮',name:'Finland'}, FR:{flag:'🇫🇷',name:'France'},
  GA:{flag:'🇬🇦',name:'Gabon'}, GM:{flag:'🇬🇲',name:'Gambia'}, GE:{flag:'🇬🇪',name:'Georgia'},
  DE:{flag:'🇩🇪',name:'Germany'}, GH:{flag:'🇬🇭',name:'Ghana'}, GR:{flag:'🇬🇷',name:'Greece'},
  GD:{flag:'🇬🇩',name:'Grenada'}, GT:{flag:'🇬🇹',name:'Guatemala'}, GN:{flag:'🇬🇳',name:'Guinea'},
  GW:{flag:'🇬🇼',name:'Guinea-Bissau'}, GY:{flag:'🇬🇾',name:'Guyana'},
  HT:{flag:'🇭🇹',name:'Haiti'}, HN:{flag:'🇭🇳',name:'Honduras'}, HK:{flag:'🇭🇰',name:'Hong Kong'},
  HU:{flag:'🇭🇺',name:'Hungary'},
  IS:{flag:'🇮🇸',name:'Iceland'}, IN:{flag:'🇮🇳',name:'India'}, ID:{flag:'🇮🇩',name:'Indonesia'},
  IR:{flag:'🇮🇷',name:'Iran'}, IQ:{flag:'🇮🇶',name:'Iraq'}, IE:{flag:'🇮🇪',name:'Ireland'},
  IL:{flag:'🇮🇱',name:'Israel'}, IT:{flag:'🇮🇹',name:'Italy'}, CI:{flag:'🇨🇮',name:'Ivory Coast'},
  JM:{flag:'🇯🇲',name:'Jamaica'}, JP:{flag:'🇯🇵',name:'Japan'}, JO:{flag:'🇯🇴',name:'Jordan'},
  KZ:{flag:'🇰🇿',name:'Kazakhstan'}, KE:{flag:'🇰🇪',name:'Kenya'}, KI:{flag:'🇰🇮',name:'Kiribati'},
  XK:{flag:'🇽🇰',name:'Kosovo'}, KW:{flag:'🇰🇼',name:'Kuwait'}, KG:{flag:'🇰🇬',name:'Kyrgyzstan'},
  LA:{flag:'🇱🇦',name:'Laos'}, LV:{flag:'🇱🇻',name:'Latvia'}, LB:{flag:'🇱🇧',name:'Lebanon'},
  LS:{flag:'🇱🇸',name:'Lesotho'}, LR:{flag:'🇱🇷',name:'Liberia'}, LY:{flag:'🇱🇾',name:'Libya'},
  LI:{flag:'🇱🇮',name:'Liechtenstein'}, LT:{flag:'🇱🇹',name:'Lithuania'}, LU:{flag:'🇱🇺',name:'Luxembourg'},
  MG:{flag:'🇲🇬',name:'Madagascar'}, MW:{flag:'🇲🇼',name:'Malawi'}, MY:{flag:'🇲🇾',name:'Malaysia'},
  MV:{flag:'🇲🇻',name:'Maldives'}, ML:{flag:'🇲🇱',name:'Mali'}, MT:{flag:'🇲🇹',name:'Malta'},
  MH:{flag:'🇲🇭',name:'Marshall Islands'}, MR:{flag:'🇲🇷',name:'Mauritania'}, MU:{flag:'🇲🇺',name:'Mauritius'},
  MX:{flag:'🇲🇽',name:'Mexico'}, FM:{flag:'🇫🇲',name:'Micronesia'}, MD:{flag:'🇲🇩',name:'Moldova'},
  MC:{flag:'🇲🇨',name:'Monaco'}, MN:{flag:'🇲🇳',name:'Mongolia'}, ME:{flag:'🇲🇪',name:'Montenegro'},
  MA:{flag:'🇲🇦',name:'Morocco'}, MZ:{flag:'🇲🇿',name:'Mozambique'}, MM:{flag:'🇲🇲',name:'Myanmar'},
  NA:{flag:'🇳🇦',name:'Namibia'}, NR:{flag:'🇳🇷',name:'Nauru'}, NP:{flag:'🇳🇵',name:'Nepal'},
  NL:{flag:'🇳🇱',name:'Netherlands'}, NZ:{flag:'🇳🇿',name:'New Zealand'}, NI:{flag:'🇳🇮',name:'Nicaragua'},
  NE:{flag:'🇳🇪',name:'Niger'}, NG:{flag:'🇳🇬',name:'Nigeria'}, KP:{flag:'🇰🇵',name:'North Korea'},
  MK:{flag:'🇲🇰',name:'North Macedonia'}, NO:{flag:'🇳🇴',name:'Norway'},
  OM:{flag:'🇴🇲',name:'Oman'},
  PK:{flag:'🇵🇰',name:'Pakistan'}, PW:{flag:'🇵🇼',name:'Palau'}, PS:{flag:'🇵🇸',name:'Palestine'},
  PA:{flag:'🇵🇦',name:'Panama'}, PG:{flag:'🇵🇬',name:'Papua New Guinea'}, PY:{flag:'🇵🇾',name:'Paraguay'},
  PE:{flag:'🇵🇪',name:'Peru'}, PH:{flag:'🇵🇭',name:'Philippines'}, PL:{flag:'🇵🇱',name:'Poland'},
  PT:{flag:'🇵🇹',name:'Portugal'},
  QA:{flag:'🇶🇦',name:'Qatar'},
  RO:{flag:'🇷🇴',name:'Romania'}, RU:{flag:'🇷🇺',name:'Russia'}, RW:{flag:'🇷🇼',name:'Rwanda'},
  KN:{flag:'🇰🇳',name:'Saint Kitts and Nevis'}, LC:{flag:'🇱🇨',name:'Saint Lucia'},
  VC:{flag:'🇻🇨',name:'Saint Vincent and the Grenadines'}, WS:{flag:'🇼🇸',name:'Samoa'},
  SM:{flag:'🇸🇲',name:'San Marino'}, ST:{flag:'🇸🇹',name:'São Tomé and Príncipe'},
  SA:{flag:'🇸🇦',name:'Saudi Arabia'}, SN:{flag:'🇸🇳',name:'Senegal'}, RS:{flag:'🇷🇸',name:'Serbia'},
  SL:{flag:'🇸🇱',name:'Sierra Leone'}, SG:{flag:'🇸🇬',name:'Singapore'}, SK:{flag:'🇸🇰',name:'Slovakia'},
  SI:{flag:'🇸🇮',name:'Slovenia'}, SB:{flag:'🇸🇧',name:'Solomon Islands'}, SO:{flag:'🇸🇴',name:'Somalia'},
  ZA:{flag:'🇿🇦',name:'South Africa'}, KR:{flag:'🇰🇷',name:'South Korea'}, SS:{flag:'🇸🇸',name:'South Sudan'},
  ES:{flag:'🇪🇸',name:'Spain'}, LK:{flag:'🇱🇰',name:'Sri Lanka'}, SD:{flag:'🇸🇩',name:'Sudan'},
  SR:{flag:'🇸🇷',name:'Suriname'}, SE:{flag:'🇸🇪',name:'Sweden'}, CH:{flag:'🇨🇭',name:'Switzerland'},
  SY:{flag:'🇸🇾',name:'Syria'},
  TW:{flag:'🇹🇼',name:'Taiwan'}, TJ:{flag:'🇹🇯',name:'Tajikistan'}, TZ:{flag:'🇹🇿',name:'Tanzania'},
  TH:{flag:'🇹🇭',name:'Thailand'}, TL:{flag:'🇹🇱',name:'Timor-Leste'}, TG:{flag:'🇹🇬',name:'Togo'},
  TO:{flag:'🇹🇴',name:'Tonga'}, TT:{flag:'🇹🇹',name:'Trinidad and Tobago'}, TN:{flag:'🇹🇳',name:'Tunisia'},
  TR:{flag:'🇹🇷',name:'Turkey'}, TM:{flag:'🇹🇲',name:'Turkmenistan'}, TV:{flag:'🇹🇻',name:'Tuvalu'},
  UG:{flag:'🇺🇬',name:'Uganda'}, UA:{flag:'🇺🇦',name:'Ukraine'}, AE:{flag:'🇦🇪',name:'UAE'},
  GB:{flag:'🇬🇧',name:'UK'}, US:{flag:'🇺🇸',name:'USA'}, UY:{flag:'🇺🇾',name:'Uruguay'},
  UZ:{flag:'🇺🇿',name:'Uzbekistan'},
  VU:{flag:'🇻🇺',name:'Vanuatu'}, VA:{flag:'🇻🇦',name:'Vatican'}, VE:{flag:'🇻🇪',name:'Venezuela'},
  VN:{flag:'🇻🇳',name:'Vietnam'},
  YE:{flag:'🇾🇪',name:'Yemen'}, ZM:{flag:'🇿🇲',name:'Zambia'}, ZW:{flag:'🇿🇼',name:'Zimbabwe'},
  OTHER:{flag:'🌍',name:'Other'}
};

// --- State ---
const CACHE_KEY = 'lbh_stats_cache';
const CACHE_TTL = 120000; // 2 minutes

// Try to restore cached data immediately so page doesn't flash "0"
let currentData = (function() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (cached && cached.data && Date.now() - cached.ts < 600000) { // accept cache up to 10 min
        return cached.data;
      }
    }
  } catch(e) {}
  return { count: 0, cap: 100, deadline: '2026-03-10', countries: {} };
})();
let mapInstance = null;

// ============================================
// DATA FETCHING  (with localStorage cache)
// ============================================
async function fetchData() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000); // 15s timeout
    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timer);
    const data = await res.json();
    currentData = data;
    // Persist to localStorage for instant next-visit load
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch(e) {}
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

    // Reuse global COUNTRY_DATA for flag + name lookup

    const delays = ['delay-1','delay-2','delay-3'];
    wall.innerHTML = submissions.map((s, i) => {
      const _ci = COUNTRY_DATA[s.country];
      const flag = _ci ? _ci.flag : '🌍';
      const country = s.country === 'OTHER' ? (s.country_other || 'Other') : (_ci ? _ci.name : s.country);
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

  // Show cached stats immediately (avoids "0" flash)
  if (currentData.count > 0) {
    updateUI(currentData);
  }

  // Then fetch fresh data from API
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
