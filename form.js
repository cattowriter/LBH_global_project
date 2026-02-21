// ==========================================
// CONFIG — Replace with your deployed Apps Script Web App URL
// ==========================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYxfFLfsIgvtAQNZKSuDYOPc_XJfBvWljOYZBsvLph-_bDJAez723yKfC5lvRfvfdHSQ/exec';

// ==========================================
// i18n TRANSLATIONS
// ==========================================
const T = {
en: {  navAbout:'About Us', navSubmit:'Submit', navPhotobook:'Photobook', navMessages:'Messages', navFAQ:'FAQ', navBonus:'Bonus - Timeline',  back:'Back', formTitle:'✉️ Submit Your Page',
  formSubtitle:'Fill out the form below to submit your page for the Lee Byung-hun Global Fanbook. All tracks are welcome!',
  step1Title:'Choose Your Track',
  trackATitle:'Text Message', trackADesc:'Write a message. We design the page for you.', trackABadge:'No design needed',
  trackBTitle:'Photo + Message', trackBDesc:'Upload an image + short message. We handle layout.', trackBBadge:'Easy',
  trackCTitle:'Full Custom Page', trackCDesc:'Design your own page. Maximum creative freedom.', trackCBadge:'Full control',
  step2Title:'Your Information',
  labelName:'Display Name', helpName:'The name shown on your page in the fanbook',
  labelContact:'Contact Method', helpContact:'Choose how we can reach you (for credit or follow-up)',
  errContact:'Please enter your contact info',
  labelCountry:'Country', selectCountry:'— Select your country —',
  labelOtherCountry:'Please specify your country',
  labelLanguage:'Message Language', helpLanguage:'What language will your message be in?',
  selectLanguage:'— Select language —', errLanguage:'Please select a language',
  langOther:'Other',
  labelProfile:'Profile Picture', helpProfile:'Optional — a small avatar next to your name.',
  helpProfileSpec:'JPG / PNG, max 2MB', btnChoosePhoto:'Choose Photo', btnRemove:'Remove',
  step3Title:'Your Content', noTrackNotice:'👆 Please select a track above first.',
  labelMessage:'Your Message to Lee Byung-hun',
  helpMessageA:'Any language welcome! Max 300 characters.',
  helpMessageB:'Short message with your photo. Max 200 characters.',
  noticeTrackA:'💡 We\'ll design a beautiful page for your message!',
  labelPhoto:'Photo / Fanart', helpPhoto:'Upload 1 image — fanart or a favourite photo.',
  btnClickUpload:'Click to upload', orDragDrop:' or drag and drop',
  photoSpec:'JPG, PNG — max 10MB',
  noticeTrackB:'💡 We\'ll arrange your photo and message beautifully.',
  noticeTrackCSpec:'📐 <strong>Specs:</strong> 2400×2400px, PNG, 300DPI, RGB.',
  labelCustomPage:'Custom Page Design',
  helpCustomPage:'Upload your completed page design as a PNG file.',
  customSpec:'PNG only — 2400×2400px recommended',
  labelMessageOptional:'Message (Optional)',
  specDetails:'<strong>Template:</strong> <code>2400×2400px</code> <code>PNG</code> <code>300DPI</code> <code>RGB</code>. Keep content 200px from edges.',
  step4Title:'Privacy & Display',
  labelDisplay:'Show message on the website?',
  helpDisplay:'Your page always appears in the printed fanbook. This controls website display.',
  optionPublic:'Yes, show publicly', optionPublicDesc:'Name, country, message on website',
  optionAnon:'Show as Anonymous', optionAnonDesc:'Message shown, name as "Anonymous Fan"',
  optionPrivate:'Keep private', optionPrivateDesc:'Only in printed fanbook',
  labelAgree:'I understand this is a fan project and grant permission to use my submission.',
  btnSubmit:'Submit My Page ✨',
  submitNote:'Files are uploaded to Google Drive. One submission per person.',
  successTitle:'Thank You!',
  successText:'Your submission has been received! Thank you for being part of this project. 💛',
  btnBackHome:'← Back to Home',
  errName:'Please enter your display name', errCountry:'Please select your country',
  errCountryOther:'Please specify your country', errTrack:'Please select a track',
  errMsg:'Please write your message', errPhoto:'Please upload your photo',
  errCustom:'Please upload your custom page design',
  errDisplay:'Please select a display preference', errAgree:'Please agree to the terms',
  errFail:'Submission failed. Please try again.', errPrefix:'Please fix:',
  errFileSize:'File too large', uploading:'Uploading...',
  previewLabel:'📖 Your page will look like this:',
  trackHint:'👇 Pick <strong>one</strong> — you only need to fill out one track!'
},
th: {
  navAbout:'เกี่ยวกับเรา', navSubmit:'ส่งผลงาน', navPhotobook:'ดู Photobook', navMessages:'ข้อความ', navFAQ:'คำถาม', navBonus:'Bonus - Timeline',
  back:'กลับ', formTitle:'✉️ ส่งหน้าของคุณ',
  formSubtitle:'กรอกแบบฟอร์มด้านล่างเพื่อส่งหน้าสำหรับ Lee Byung-hun Global Fanbook ยินดีต้อนรับทุก Track!',
  step1Title:'เลือก Track',
  trackATitle:'ข้อความอย่างเดียว', trackADesc:'เขียนข้อความ เราออกแบบให้', trackABadge:'ไม่ต้องออกแบบ',
  trackBTitle:'รูป + ข้อความ', trackBDesc:'อัปโหลดรูป + ข้อความสั้นๆ เราจัดให้', trackBBadge:'ง่ายมาก',
  trackCTitle:'ออกแบบเอง', trackCDesc:'ออกแบบหน้าเอง อิสระเต็มที่!', trackCBadge:'ควบคุมเต็มที่',
  step2Title:'ข้อมูลของคุณ',
  labelName:'ชื่อที่แสดง', helpName:'ชื่อที่จะปรากฏใน fanbook',
  labelContact:'ช่องทางติดต่อ', helpContact:'เลือกช่องทางที่เราสามารถติดต่อได้',
  errContact:'กรุณากรอกข้อมูลติดต่อ',
  labelCountry:'ประเทศ', selectCountry:'— เลือกประเทศ —',
  labelOtherCountry:'ระบุประเทศ',
  labelLanguage:'ภาษาของข้อความ', helpLanguage:'ข้อความของคุณเป็นภาษาอะไร?',
  selectLanguage:'— เลือกภาษา —', errLanguage:'กรุณาเลือกภาษา',
  langOther:'อื่นๆ',
  labelProfile:'รูปโปรไฟล์', helpProfile:'ไม่บังคับ — ไอคอนเล็กๆ ข้างชื่อ',
  helpProfileSpec:'JPG / PNG, ไม่เกิน 2MB', btnChoosePhoto:'เลือกรูป', btnRemove:'ลบ',
  step3Title:'เนื้อหา', noTrackNotice:'👆 เลือก Track ด้านบนก่อนนะ',
  labelMessage:'ข้อความถึงอีบยองฮอน',
  helpMessageA:'ภาษาอะไรก็ได้! ไม่เกิน 300 ตัวอักษร',
  helpMessageB:'ข้อความสั้นๆ ประกอบรูป ไม่เกิน 200 ตัวอักษร',
  noticeTrackA:'💡 เราออกแบบหน้าสวยๆ ให้ ไม่ต้องมีทักษะออกแบบ!',
  labelPhoto:'รูป / แฟนอาร์ต', helpPhoto:'อัปโหลดรูป 1 รูป — แฟนอาร์ตหรือรูปที่ชอบ',
  btnClickUpload:'คลิกเพื่ออัปโหลด', orDragDrop:' หรือลากวาง',
  photoSpec:'JPG, PNG — ไม่เกิน 10MB',
  noticeTrackB:'💡 เราจัดรูปและข้อความให้สวยงาม',
  noticeTrackCSpec:'📐 <strong>สเปค:</strong> 2400×2400px, PNG, 300DPI, RGB',
  labelCustomPage:'หน้าที่ออกแบบ',
  helpCustomPage:'อัปโหลดหน้าที่ออกแบบเสร็จเป็นไฟล์ PNG',
  customSpec:'PNG เท่านั้น — แนะนำ 2400×2400px',
  labelMessageOptional:'ข้อความ (ไม่บังคับ)',
  specDetails:'<strong>สเปค:</strong> <code>2400×2400px</code> <code>PNG</code> <code>300DPI</code> <code>RGB</code> วางเนื้อหาห่างขอบ 200px',
  step4Title:'ความเป็นส่วนตัว',
  labelDisplay:'แสดงข้อความบนเว็บไหม?',
  helpDisplay:'หน้าอยู่ใน fanbook เสมอ ตั้งค่านี้ควบคุมการแสดงบนเว็บ',
  optionPublic:'แสดงเปิดเผย', optionPublicDesc:'ชื่อ ประเทศ ข้อความปรากฏบนเว็บ',
  optionAnon:'แบบไม่ระบุตัวตน', optionAnonDesc:'ข้อความแสดง ชื่อเป็น "แฟนนิรนาม"',
  optionPrivate:'เก็บส่วนตัว', optionPrivateDesc:'ปรากฏเฉพาะใน fanbook',
  labelAgree:'ฉันเข้าใจว่านี่เป็นโปรเจกต์แฟน และอนุญาตให้ใช้ผลงานใน fanbook',
  btnSubmit:'ส่งหน้าของฉัน ✨',
  submitNote:'ไฟล์อัปโหลดไป Google Drive ส่งได้ 1 ครั้ง/คน',
  successTitle:'ขอบคุณค่ะ/ครับ!',
  successText:'ได้รับผลงานแล้ว! ขอบคุณที่เป็นส่วนหนึ่งของโปรเจกต์นี้ 💛',
  btnBackHome:'← กลับหน้าหลัก',
  errName:'กรุณากรอกชื่อ', errCountry:'กรุณาเลือกประเทศ',
  errCountryOther:'กรุณาระบุประเทศ', errTrack:'กรุณาเลือก Track',
  errMsg:'กรุณาเขียนข้อความ', errPhoto:'กรุณาอัปโหลดรูปภาพ',
  errCustom:'กรุณาอัปโหลดหน้าที่ออกแบบ',
  errDisplay:'กรุณาเลือกตัวเลือกการแสดงผล', errAgree:'กรุณายอมรับเงื่อนไข',
  errFail:'ส่งไม่สำเร็จ กรุณาลองอีกครั้ง', errPrefix:'กรุณาแก้ไข:',
  errFileSize:'ไฟล์ใหญ่เกินไป', uploading:'กำลังอัปโหลด...',
  previewLabel:'📖 หน้าของคุณจะมีหน้าตาแบบนี้:',
  trackHint:'👇 เลือก <strong>แค่อันเดียว</strong> — ไม่ต้องทำทั้ง 3 แบบนะ!'
}};

// ==========================================
// STATE
// ==========================================
let lang = 'en';
let selectedTrack = null;
function t(k) { return T[lang]?.[k] || T.en[k] || k; }

// ==========================================
// LANGUAGE SWITCH
// ==========================================
function setLang(l) {
  lang = l;
  document.body.setAttribute('data-lang', l);
  document.querySelectorAll('[data-lang-btn]').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-lang-btn') === l)
  );
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n'), v = T[l]?.[k];
    if (v !== undefined) el.innerHTML = v;
  });
  const ph = l === 'th'
    ? { 'field-name':'เช่น มิก้า', 'field-other-country':'เช่น นอร์เวย์',
        'field-message-a':'เขียนข้อความจากใจถึงอีบยองฮอน...',
        'field-message-b':'ข้อความสั้นๆ ประกอบรูป...',
        'field-message-c':'ข้อความเพิ่มเติม...' }
    : { 'field-name':'e.g. Mika', 'field-other-country':'e.g. Norway',
        'field-message-a':'Write your heartfelt message...',
        'field-message-b':'A short message with your photo...',
        'field-message-c':'Additional message (optional)...' };
  Object.entries(ph).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = v;
  });
}

// ==========================================
// TRACK SELECTION
// ==========================================
function selectTrack(track) {
  selectedTrack = track;
  document.querySelectorAll('.track-card').forEach(c => {
    const isSelected = c.dataset.track === track;
    c.classList.toggle('selected', isSelected);
    c.setAttribute('aria-pressed', isSelected);
  });
  document.getElementById('no-track-notice').style.display = 'none';
  ['a','b','c'].forEach(x =>
    document.getElementById('fields-track-' + x).classList.toggle('active', track === x.toUpperCase())
  );
  document.getElementById('step-privacy-num').textContent = '4';
  setTimeout(() => {
    const el = document.getElementById('section-step2');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ==========================================
// HELPERS
// ==========================================
function selRadio(label) {
  label.closest('.form-radio-group').querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
  label.classList.add('selected');
  label.querySelector('input').checked = true;
}

function togCB(label) {
  setTimeout(() => label.classList.toggle('selected', label.querySelector('input').checked), 0);
}

function updateCC(textarea, max) {
  const counter = textarea.parentElement.querySelector('.char-counter');
  if (!counter) return;
  const len = textarea.value.length;
  counter.textContent = `${len} / ${max}`;
  counter.classList.remove('warn', 'over');
  if (len >= max) counter.classList.add('over');
  else if (len >= max * 0.85) counter.classList.add('warn');
}

// ==========================================
// FILE UPLOAD HANDLING
// ==========================================
function handleProfileUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    alert(t('errFileSize') + ' (max 2MB)');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const circle = document.getElementById('profile-preview');
    circle.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
    circle.classList.add('has-image');
    document.getElementById('profile-remove-btn').style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
}

function removeProfile() {
  const circle = document.getElementById('profile-preview');
  circle.innerHTML = '👤';
  circle.classList.remove('has-image');
  document.getElementById('field-profile').value = '';
  document.getElementById('profile-remove-btn').style.display = 'none';
}

function handlePhotoUpload(input, type) {
  const file = input.files[0];
  if (!file) return;
  const maxSize = 10;
  if (file.size > maxSize * 1024 * 1024) {
    alert(t('errFileSize') + ` (max ${maxSize}MB)`);
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewImg = document.getElementById(`${type}-preview-img`);
    const preview = document.getElementById(`${type}-preview`);
    const fileName = document.getElementById(`${type}-file-name`);
    const uploadArea = document.getElementById(`${type}-upload-area`);
    if (previewImg) previewImg.src = e.target.result;
    if (preview) preview.classList.add('show');
    if (fileName) fileName.textContent = file.name;
    if (uploadArea) uploadArea.classList.add('has-file');
  };
  reader.readAsDataURL(file);
}

function removeFile(type) {
  const fieldMap = { photo: 'field-photo', custom: 'field-custom', lbh: 'field-lbh-image' };
  const input = document.getElementById(fieldMap[type]);
  if (input) input.value = '';
  const preview = document.getElementById(`${type}-preview`);
  if (preview) preview.classList.remove('show');
  const uploadArea = document.getElementById(`${type}-upload-area`);
  if (uploadArea) uploadArea.classList.remove('has-file');
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// COUNTRY OTHER
// ==========================================
document.getElementById('field-country')?.addEventListener('change', function () {
  document.getElementById('other-country-group').style.display =
    this.value === 'OTHER' ? 'block' : 'none';
});

// ==========================================
// VALIDATION
// ==========================================
function validate() {
  const e = [];
  if (!document.getElementById('field-name').value.trim()) e.push(t('errName'));
  const c = document.getElementById('field-country').value;
  if (!c) e.push(t('errCountry'));
  if (c === 'OTHER' && !document.getElementById('field-other-country').value.trim()) e.push(t('errCountryOther'));
  // Contact: required
  if (!document.getElementById('field-contact-value')?.value.trim()) e.push(t('errContact'));
  if (!selectedTrack) e.push(t('errTrack'));
  if (selectedTrack === 'A') {
    if (!document.getElementById('field-message-a').value.trim()) e.push(t('errMsg'));
    if (!document.getElementById('field-language-a').value) e.push(t('errLanguage'));
  }
  if (selectedTrack === 'B') {
    if (!document.getElementById('field-message-b').value.trim()) e.push(t('errMsg'));
    if (!document.getElementById('field-language-b').value) e.push(t('errLanguage'));
    if (!document.getElementById('field-photo').files.length) e.push(t('errPhoto'));
  }
  if (selectedTrack === 'C') {
    if (!document.getElementById('field-custom').files.length) e.push(t('errCustom'));
    if (document.getElementById('field-message-c').value.trim() && !document.getElementById('field-language-c').value) e.push(t('errLanguage'));
  }
  if (!document.querySelector('input[name="display"]:checked')) e.push(t('errDisplay'));
  if (!document.getElementById('field-agree').checked) e.push(t('errAgree'));
  return e;
}

// ==========================================
// SUBMIT → Google Apps Script
// ==========================================
async function handleSubmit() {
  const errors = validate();
  if (errors.length) {
    alert(t('errPrefix') + '\n\n• ' + errors.join('\n• '));
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    // Build payload
    const data = {
      timestamp: new Date().toISOString(),
      track: selectedTrack,
      name: document.getElementById('field-name').value.trim(),
      contact_method: document.getElementById('field-contact-method').value,
      contact_value: document.getElementById('field-contact-value').value.trim(),
      country: document.getElementById('field-country').value,
      country_other: document.getElementById('field-other-country')?.value.trim() || '',
      language: '',
      message: '',
      display_preference: document.querySelector('input[name="display"]:checked')?.value || '',
    };

    // Message + language per track
    if (selectedTrack === 'A') {
      data.message = document.getElementById('field-message-a').value.trim();
      data.language = document.getElementById('field-language-a').value;
    }
    if (selectedTrack === 'B') {
      data.message = document.getElementById('field-message-b').value.trim();
      data.language = document.getElementById('field-language-b').value;
    }
    if (selectedTrack === 'C') {
      data.message = document.getElementById('field-message-c').value.trim();
      data.language = document.getElementById('field-language-c').value;
    }

    // Profile picture
    const profileInput = document.getElementById('field-profile');
    if (profileInput.files.length) {
      const file = profileInput.files[0];
      data.profile_base64 = await fileToBase64(file);
      data.profile_ext = file.name.split('.').pop();
      data.profile_mimetype = file.type;
    }

    // Track B photo
    if (selectedTrack === 'B') {
      const photoInput = document.getElementById('field-photo');
      if (photoInput.files.length) {
        const file = photoInput.files[0];
        data.photo_base64 = await fileToBase64(file);
        data.photo_ext = file.name.split('.').pop();
        data.photo_mimetype = file.type;
      }
    }

    // Track C custom page
    if (selectedTrack === 'C') {
      const customInput = document.getElementById('field-custom');
      if (customInput.files.length) {
        const file = customInput.files[0];
        data.custom_base64 = await fileToBase64(file);
        data.custom_ext = file.name.split('.').pop();
        data.custom_mimetype = file.type;
      }
    }



    // Send
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    });

    document.getElementById('form-main').style.display = 'none';
    document.getElementById('submit-success').classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Submit error:', err);
    alert(t('errFail'));
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const bl = navigator.language || '';
  setLang(bl.startsWith('th') ? 'th' : 'en');

  // Nav toggle for mobile
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
});

// ==========================================
// CONTACT METHOD — update placeholder based on selected method
// ==========================================
function updateContactPlaceholder() {
  const method = document.getElementById('field-contact-method').value;
  const input = document.getElementById('field-contact-value');
  if (method === 'email') {
    input.type = 'email';
    input.placeholder = 'you@example.com';
  } else {
    input.type = 'text';
    input.placeholder = '@username';
  }
}


