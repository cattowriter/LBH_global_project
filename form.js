// ==========================================
// CONFIG — Replace with your deployed Apps Script Web App URL
// ==========================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzVpMAcRxya-KUE6K3SxAxJuLHRH0_8k7eUGpzIc7RRj22AVwn_y4zO7ezeSDriICqemA/exec';

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
  helpMessageA:'Any language welcome! Max 400 characters.',
  helpMessageB:'Short message with your photo. Max 400 characters.',
  noticeTrackA:'💡 We\'ll design a beautiful page for your message!',
  labelPhoto:'Photo / Fanart', helpPhoto:'Upload 1 image — fanart or a favourite photo.',
  btnClickUpload:'Click to upload', orDragDrop:' or drag and drop',
  photoSpec:'JPG, PNG — max 10MB',
  noticeTrackB:'💡 We\'ll arrange your photo and message beautifully.',
  noticeTrackCSpec:'📐 <strong>Specs:</strong> 2400×2400px, PNG, 300DPI, RGB.',
  noticeTrackCPrint:'📌 <strong>Note:</strong> Due to limited print pages, I will do my best to include your custom page at full size. If the total exceeds the print limit, I may need to slightly reduce the page size. Thank you so much for your understanding! 🙏',

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
  trackHint:'👇 Pick <strong>one</strong> — you only need to fill out one track!',
  closedTitle:'Submissions Closed 💛',
  closedText:'Thank you for being part of this project!<br>We received <strong>{count} messages</strong> from <strong>{countries} countries</strong> around the world.<br><br>The fanbook is now being designed and will be presented to Lee Byung-hun in early April.<br>Stay tuned for updates! 🌍',
  closedBtn:'← Back to Home'
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
  helpMessageA:'ภาษาอะไรก็ได้! ไม่เกิน 400 ตัวอักษร',
  helpMessageB:'ข้อความสั้นๆ ประกอบรูป ไม่เกิน 400 ตัวอักษร',
  noticeTrackA:'💡 เราออกแบบหน้าสวยๆ ให้ ไม่ต้องมีทักษะออกแบบ!',
  labelPhoto:'รูป / แฟนอาร์ต', helpPhoto:'อัปโหลดรูป 1 รูป — แฟนอาร์ตหรือรูปที่ชอบ',
  btnClickUpload:'คลิกเพื่ออัปโหลด', orDragDrop:' หรือลากวาง',
  photoSpec:'JPG, PNG — ไม่เกิน 10MB',
  noticeTrackB:'💡 เราจัดรูปและข้อความให้สวยงาม',
  noticeTrackCSpec:'📐 <strong>สเปค:</strong> 2400×2400px, PNG, 300DPI, RGB',
  noticeTrackCPrint:'📌 <strong>หมายเหตุ:</strong> เนื่องจากจำนวนหน้าที่พิมพ์ได้มีจำกัด จะพยายามพิมพ์หน้าของคุณขนาดเต็มให้มากที่สุด แต่หากจำนวนหน้าเกินขีดจำกัด ขออนุญาตลดขนาดลงเล็กน้อย ขอบคุณที่เข้าใจมากๆ นะคะ 🙏',
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
  trackHint:'👇 เลือก <strong>แค่อันเดียว</strong> — ไม่ต้องทำทั้ง 3 แบบนะ!',
  closedTitle:'ปิดรับผลงานแล้ว 💛',
  closedText:'ขอบคุณที่เข้าร่วมโปรเจกต์นี้!<br>เราได้รับ <strong>{count} ข้อความ</strong> จาก <strong>{countries} ประเทศ</strong> ทั่วโลก<br><br>ตอนนี้กำลังทำรูปเล่ม Fanbook และจะนำไปมอบให้อีบยองฮอนในต้นเดือนเมษายน<br>รอติดตามอัพเดทนะคะ! 🌍',
  closedBtn:'← กลับหน้าหลัก'
},
es: {  navAbout:'Sobre nosotros', navSubmit:'Enviar', navPhotobook:'Álbum', navMessages:'Mensajes', navFAQ:'Preguntas', navBonus:'Bonus - Cronología',  back:'Volver', formTitle:'✉️ Envía tu página',
  formSubtitle:'Completa el formulario a continuación para enviar tu página para el Lee Byung-hun Global Fanbook. ¡Todas las opciones son bienvenidas!',
  step1Title:'Elige tu opción',
  trackATitle:'Mensaje de texto', trackADesc:'Escribe un mensaje. Nosotros diseñamos la página.', trackABadge:'Sin diseño necesario',
  trackBTitle:'Foto + Mensaje', trackBDesc:'Sube una imagen + mensaje corto. Nos encargamos del diseño.', trackBBadge:'Fácil',
  trackCTitle:'Página personalizada', trackCDesc:'Diseña tu propia página. Máxima libertad creativa.', trackCBadge:'Control total',
  step2Title:'Tu información',
  labelName:'Nombre a mostrar', helpName:'El nombre que aparecerá en tu página del fanbook',
  labelContact:'Método de contacto', helpContact:'Elige cómo podemos comunicarnos contigo (para crédito o seguimiento)',
  errContact:'Por favor, ingresa tu información de contacto',
  labelCountry:'País', selectCountry:'— Selecciona tu país —',
  labelOtherCountry:'Por favor, especifica tu país',
  labelLanguage:'Idioma del mensaje', helpLanguage:'¿En qué idioma estará tu mensaje?',
  selectLanguage:'— Selecciona idioma —', errLanguage:'Por favor, selecciona un idioma',
  langOther:'Otro',
  labelProfile:'Foto de perfil', helpProfile:'Opcional — un pequeño avatar junto a tu nombre.',
  helpProfileSpec:'JPG / PNG, máx. 2MB', btnChoosePhoto:'Elegir foto', btnRemove:'Eliminar',
  step3Title:'Tu contenido', noTrackNotice:'👆 Por favor, selecciona una opción arriba primero.',
  labelMessage:'Tu mensaje para Lee Byung-hun',
  helpMessageA:'¡Cualquier idioma es bienvenido! Máx. 400 caracteres.',
  helpMessageB:'Mensaje corto con tu foto. Máx. 400 caracteres.',
  noticeTrackA:'💡 ¡Diseñaremos una página hermosa para tu mensaje!',
  labelPhoto:'Foto / Fanart', helpPhoto:'Sube 1 imagen — fanart o una foto favorita.',
  btnClickUpload:'Haz clic para subir', orDragDrop:' o arrastra y suelta',
  photoSpec:'JPG, PNG — máx. 10MB',
  noticeTrackB:'💡 Organizaremos tu foto y mensaje de forma hermosa.',
  noticeTrackCSpec:'📐 <strong>Especificaciones:</strong> 2400×2400px, PNG, 300DPI, RGB.',
  noticeTrackCPrint:'📌 <strong>Nota:</strong> Debido al límite de páginas impresas, haré lo posible por incluir tu página personalizada a tamaño completo. Si el total excede el límite de impresión, puede que necesite reducir ligeramente el tamaño. ¡Muchas gracias por tu comprensión! 🙏',
  labelCustomPage:'Diseño de página personalizada',
  helpCustomPage:'Sube tu diseño de página completado como archivo PNG.',
  customSpec:'Solo PNG — recomendado 2400×2400px',
  labelMessageOptional:'Mensaje (Opcional)',
  specDetails:'<strong>Plantilla:</strong> <code>2400×2400px</code> <code>PNG</code> <code>300DPI</code> <code>RGB</code>. Mantén el contenido a 200px de los bordes.',
  step4Title:'Privacidad y visualización',
  labelDisplay:'¿Mostrar mensaje en el sitio web?',
  helpDisplay:'Tu página siempre aparece en el fanbook impreso. Esto controla la visualización en el sitio web.',
  optionPublic:'Sí, mostrar públicamente', optionPublicDesc:'Nombre, país, mensaje en el sitio web',
  optionAnon:'Mostrar como anónimo', optionAnonDesc:'Mensaje visible, nombre como "Fan anónimo"',
  optionPrivate:'Mantener privado', optionPrivateDesc:'Solo en el fanbook impreso',
  labelAgree:'Entiendo que este es un proyecto de fans y autorizo el uso de mi envío.',
  btnSubmit:'Enviar mi página ✨',
  submitNote:'Los archivos se suben a Google Drive. Un envío por persona.',
  successTitle:'¡Gracias!',
  successText:'¡Tu envío ha sido recibido! Gracias por ser parte de este proyecto. 💛',
  btnBackHome:'← Volver al inicio',
  errName:'Por favor, ingresa tu nombre', errCountry:'Por favor, selecciona tu país',
  errCountryOther:'Por favor, especifica tu país', errTrack:'Por favor, selecciona una opción',
  errMsg:'Por favor, escribe tu mensaje', errPhoto:'Por favor, sube tu foto',
  errCustom:'Por favor, sube tu diseño de página personalizada',
  errDisplay:'Por favor, selecciona una preferencia de visualización', errAgree:'Por favor, acepta los términos',
  errFail:'Envío fallido. Por favor, inténtalo de nuevo.', errPrefix:'Por favor, corrige:',
  errFileSize:'Archivo demasiado grande', uploading:'Subiendo...',
  previewLabel:'📖 Tu página se verá así:',
  trackHint:'👇 Elige <strong>solo una</strong> — ¡no necesitas completar las 3!',
  closedTitle:'Envíos cerrados 💛',
  closedText:'¡Gracias por ser parte de este proyecto!<br>Recibimos <strong>{count} mensajes</strong> de <strong>{countries} países</strong> de todo el mundo.<br><br>El fanbook se está diseñando y se presentará a Lee Byung-hun a principios de abril.<br>¡Estén atentos a las novedades! 🌍',
  closedBtn:'← Volver al inicio'
},
ko: {  navAbout:'소개', navSubmit:'제출', navPhotobook:'포토북', navMessages:'메시지', navFAQ:'FAQ', navBonus:'보너스 - 타임라인',  back:'뒤로', formTitle:'✉️ 페이지 제출하기',
  formSubtitle:'아래 양식을 작성하여 Lee Byung-hun Global Fanbook에 페이지를 제출하세요. 모든 트랙을 환영합니다!',
  step1Title:'트랙 선택',
  trackATitle:'텍스트 메시지', trackADesc:'메시지를 작성하세요. 페이지 디자인은 저희가 합니다.', trackABadge:'디자인 불필요',
  trackBTitle:'사진 + 메시지', trackBDesc:'이미지 업로드 + 짧은 메시지. 레이아웃은 저희가 담당합니다.', trackBBadge:'쉬움',
  trackCTitle:'맞춤 페이지', trackCDesc:'자신만의 페이지를 디자인하세요. 최대한의 창작 자유.', trackCBadge:'완전한 자유',
  step2Title:'기본 정보',
  labelName:'표시 이름', helpName:'팬북에 표시될 이름',
  labelContact:'연락 방법', helpContact:'연락 가능한 방법을 선택하세요 (크레딧 또는 후속 연락용)',
  errContact:'연락처 정보를 입력해 주세요',
  labelCountry:'국가', selectCountry:'— 국가를 선택하세요 —',
  labelOtherCountry:'국가를 입력해 주세요',
  labelLanguage:'메시지 언어', helpLanguage:'메시지를 어떤 언어로 작성하시나요?',
  selectLanguage:'— 언어를 선택하세요 —', errLanguage:'언어를 선택해 주세요',
  langOther:'기타',
  labelProfile:'프로필 사진', helpProfile:'선택 사항 — 이름 옆에 표시될 작은 아바타.',
  helpProfileSpec:'JPG / PNG, 최대 2MB', btnChoosePhoto:'사진 선택', btnRemove:'삭제',
  step3Title:'내용', noTrackNotice:'👆 먼저 위에서 트랙을 선택해 주세요.',
  labelMessage:'이병헌에게 보내는 메시지',
  helpMessageA:'어떤 언어든 환영합니다! 최대 400자.',
  helpMessageB:'사진과 함께하는 짧은 메시지. 최대 400자.',
  noticeTrackA:'💡 메시지를 위한 아름다운 페이지를 디자인해 드립니다!',
  labelPhoto:'사진 / 팬아트', helpPhoto:'이미지 1장 업로드 — 팬아트 또는 좋아하는 사진.',
  btnClickUpload:'클릭하여 업로드', orDragDrop:' 또는 드래그 앤 드롭',
  photoSpec:'JPG, PNG — 최대 10MB',
  noticeTrackB:'💡 사진과 메시지를 아름답게 배치해 드립니다.',
  noticeTrackCSpec:'📐 <strong>사양:</strong> 2400×2400px, PNG, 300DPI, RGB.',
  noticeTrackCPrint:'📌 <strong>참고:</strong> 인쇄 페이지 수가 제한되어 있어 맞춤 페이지를 최대한 원본 크기로 포함하겠습니다. 총 페이지 수가 인쇄 한도를 초과하면 크기를 약간 줄여야 할 수 있습니다. 이해해 주셔서 정말 감사합니다! 🙏',
  labelCustomPage:'맞춤 페이지 디자인',
  helpCustomPage:'완성된 페이지 디자인을 PNG 파일로 업로드하세요.',
  customSpec:'PNG만 가능 — 2400×2400px 권장',
  labelMessageOptional:'메시지 (선택 사항)',
  specDetails:'<strong>템플릿:</strong> <code>2400×2400px</code> <code>PNG</code> <code>300DPI</code> <code>RGB</code>. 가장자리에서 200px 이내에 내용을 배치하세요.',
  step4Title:'개인정보 및 표시',
  labelDisplay:'웹사이트에 메시지를 표시할까요?',
  helpDisplay:'페이지는 항상 인쇄된 팬북에 포함됩니다. 이 설정은 웹사이트 표시를 제어합니다.',
  optionPublic:'네, 공개적으로 표시', optionPublicDesc:'이름, 국가, 메시지가 웹사이트에 표시',
  optionAnon:'익명으로 표시', optionAnonDesc:'메시지 표시, 이름은 "익명 팬"으로',
  optionPrivate:'비공개 유지', optionPrivateDesc:'인쇄된 팬북에만 포함',
  labelAgree:'이 프로젝트가 팬 프로젝트임을 이해하며, 제출물 사용을 허가합니다.',
  btnSubmit:'페이지 제출하기 ✨',
  submitNote:'파일은 Google Drive에 업로드됩니다. 1인당 1회 제출.',
  successTitle:'감사합니다!',
  successText:'제출이 접수되었습니다! 이 프로젝트에 참여해 주셔서 감사합니다. 💛',
  btnBackHome:'← 홈으로 돌아가기',
  errName:'이름을 입력해 주세요', errCountry:'국가를 선택해 주세요',
  errCountryOther:'국가를 입력해 주세요', errTrack:'트랙을 선택해 주세요',
  errMsg:'메시지를 작성해 주세요', errPhoto:'사진을 업로드해 주세요',
  errCustom:'맞춤 페이지 디자인을 업로드해 주세요',
  errDisplay:'표시 설정을 선택해 주세요', errAgree:'약관에 동의해 주세요',
  errFail:'제출에 실패했습니다. 다시 시도해 주세요.', errPrefix:'수정해 주세요:',
  errFileSize:'파일이 너무 큽니다', uploading:'업로드 중...',
  previewLabel:'📖 페이지 미리보기:',
  trackHint:'👇 <strong>하나만</strong> 선택하세요 — 3개 모두 작성할 필요 없습니다!',
  closedTitle:'접수가 마감되었습니다 💛',
  closedText:'이 프로젝트에 참여해 주셔서 감사합니다!<br>전 세계 <strong>{countries}개국</strong>에서 <strong>{count}개의 메시지</strong>를 받았습니다.<br><br>팬북을 제작 중이며 4월 초에 이병헌에게 전달할 예정입니다.<br>업데이트를 기대해 주세요! 🌍',
  closedBtn:'← 홈으로 돌아가기'
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
  const phMap = {
    th: { 'field-name':'เช่น มิก้า', 'field-other-country':'เช่น นอร์เวย์',
          'field-message-a':'เขียนข้อความจากใจถึงอีบยองฮอน...',
          'field-message-b':'ข้อความสั้นๆ ประกอบรูป...',
          'field-message-c':'ข้อความเพิ่มเติม...' },
    es: { 'field-name':'ej. Mika', 'field-other-country':'ej. Noruega',
          'field-message-a':'Escribe tu mensaje sincero...',
          'field-message-b':'Un mensaje corto con tu foto...',
          'field-message-c':'Mensaje adicional (opcional)...' },
    ko: { 'field-name':'예: 미카', 'field-other-country':'예: 노르웨이',
          'field-message-a':'진심 어린 메시지를 작성하세요...',
          'field-message-b':'사진과 함께하는 짧은 메시지...',
          'field-message-c':'추가 메시지 (선택 사항)...' },
    en: { 'field-name':'e.g. Mika', 'field-other-country':'e.g. Norway',
          'field-message-a':'Write your heartfelt message...',
          'field-message-b':'A short message with your photo...',
          'field-message-c':'Additional message (optional)...' }
  };
  const ph = phMap[l] || phMap.en;
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
    reader.onerror = () => reject(new Error('Failed to read file: ' + file.name));
    reader.readAsDataURL(file);
  });
}

// ==========================================
// IMAGE COMPRESSION — reduce payload for reliable uploads
// ==========================================
function compressImage(file, maxDim, quality) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) return resolve(file);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width, h = img.height;
      // Only resize if exceeds max dimension
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
        else { w = Math.round(w * maxDim / h); h = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(blob => {
        if (blob && blob.size < file.size) {
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
        } else {
          resolve(file); // keep original if compression didn't help
        }
      }, 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

// ==========================================
// FETCH WITH TIMEOUT + RETRY
// ==========================================
async function fetchWithRetry(url, options, timeoutMs, retries) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
        continue;
      }
      throw err;
    }
  }
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

  // Prevent accidental page close during upload
  const guardClose = (e) => { e.preventDefault(); e.returnValue = ''; };
  window.addEventListener('beforeunload', guardClose);

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

    // Profile picture — compress to 400px for smaller payload
    const profileInput = document.getElementById('field-profile');
    if (profileInput.files.length) {
      let file = profileInput.files[0];
      file = await compressImage(file, 400, 0.8);
      data.profile_base64 = await fileToBase64(file);
      data.profile_ext = file.type === 'image/jpeg' ? 'jpg' : file.name.split('.').pop();
      data.profile_mimetype = file.type;
    }

    // Track B photo — compress to max 2400px for faster upload
    if (selectedTrack === 'B') {
      const photoInput = document.getElementById('field-photo');
      if (photoInput.files.length) {
        let file = photoInput.files[0];
        file = await compressImage(file, 2400, 0.85);
        data.photo_base64 = await fileToBase64(file);
        data.photo_ext = file.type === 'image/jpeg' ? 'jpg' : file.name.split('.').pop();
        data.photo_mimetype = file.type;
      }
    }

    // Track C custom page — NO compression (preserve original design quality)
    if (selectedTrack === 'C') {
      const customInput = document.getElementById('field-custom');
      if (customInput.files.length) {
        const file = customInput.files[0];
        data.custom_base64 = await fileToBase64(file);
        data.custom_ext = file.name.split('.').pop();
        data.custom_mimetype = file.type;
      }
    }

    // Send with 120s timeout + 1 automatic retry
    await fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    }, 120000, 1);

    window.removeEventListener('beforeunload', guardClose);
    document.getElementById('form-main').style.display = 'none';
    document.getElementById('submit-success').classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    window.removeEventListener('beforeunload', guardClose);
    console.error('Submit error:', err);

    let msg = t('errFail');
    if (err.name === 'AbortError') {
      msg = lang === 'th'
        ? 'หมดเวลาการอัปโหลด กรุณาลองอีกครั้ง หรือลองใช้ไฟล์ขนาดเล็กลง'
        : 'Upload timed out. Please try again or use a smaller file.';
    } else if (!navigator.onLine) {
      msg = lang === 'th'
        ? 'ไม่มีการเชื่อมต่ออินเทอร์เน็ต กรุณาตรวจสอบเน็ตแล้วลองใหม่'
        : 'No internet connection. Please check your network and try again.';
    }

    alert(msg);
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const bl = navigator.language || '';
  if (bl.startsWith('th')) setLang('th');
  else if (bl.startsWith('es')) setLang('es');
  else if (bl.startsWith('ko')) setLang('ko');
  else setLang('en');

  // Check if deadline has passed — show closed banner
  const DEADLINE = '2026-03-10';
  const now = new Date();
  const end = new Date(DEADLINE + 'T23:59:59');
  if (now > end) {
    showClosedBanner();
  }

  // Nav toggle for mobile
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
});

function showClosedBanner() {
  const formMain = document.getElementById('form-main');
  if (!formMain) return;
  // Fetch stats for count/countries
  fetch(APPS_SCRIPT_URL + '?action=stats')
    .then(r => r.json())
    .then(data => {
      const count = data.count || 0;
      const countries = Object.keys(data.countries || {}).length || 0;
      renderClosedBanner(formMain, count, countries);
    })
    .catch(() => {
      renderClosedBanner(formMain, '—', '—');
    });
}

function renderClosedBanner(container, count, countries) {
  const title = t('closedTitle');
  const text = t('closedText').replace('{count}', count).replace('{countries}', countries);
  const btnText = t('closedBtn');
  container.innerHTML =
    '<div class="closed-banner">' +
      '<div class="closed-icon">💛</div>' +
      '<h2>' + title + '</h2>' +
      '<p>' + text + '</p>' +
      '<a href="index.html" class="btn-primary">' + btnText + '</a>' +
    '</div>';
  // Also update the page header
  const hdr = document.querySelector('.form-page-title');
  if (hdr) hdr.textContent = title;
  const sub = document.querySelector('.form-page-subtitle');
  if (sub) sub.style.display = 'none';
}

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


