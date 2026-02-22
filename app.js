// ============================================
// Lee Byung-hun Global Fan Project — app.js
// ============================================

// --- Configuration ---
const API_URL = 'https://script.google.com/macros/s/AKfycbzVpMAcRxya-KUE6K3SxAxJuLHRH0_8k7eUGpzIc7RRj22AVwn_y4zO7ezeSDriICqemA/exec';

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
    faq4q:'I want to edit my message or cancel my submission', faq4a:'You can submit a new one to replace it — we\'ll use the latest version.<br>To delete your submission, DM <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> on X to request removal.',
    faq5q:'Can fans from any country participate?', faq5a:'Absolutely! This is a <strong>global</strong> project — fans from every country are welcome to join. No matter where you are in the world, your message matters. 🌍',
    faq6q:'The website has an error / I can\'t submit', faq6a:'Don\'t worry! You can click the <strong>"Report Bug"</strong> button at the bottom-right corner and include your message and photo — we\'ll submit it for you. Or you can DM <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> on X directly.',
    faq7q:'Can I mention other people, like his co-stars or family?', faq7a:'Yes! You\'re very welcome to mention people connected to his life or work — such as colleagues, collaborators, family members, or friendships — as long as the message remains respectful. 🤍<br>To keep the fanbook appropriate for something presented directly to him, we may gently exclude content that is explicitly NSFW (18+) or unrelated to him.',
    shareTitle:'Share this project 💛', shareText:'Help spread the word!',
    mapLegendLabel:'Submissions', mapTopTitle:'Top participating countries',
    shareCopiedToast:'Link copied! Paste it on {app}',
    milestoneTitle:'{n} Submissions Reached!', milestoneText:'Thank you to all the fans around the world! The love keeps growing 💛',
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
    faq4q:'อยากแก้ไขข้อความ หรือเปลี่ยนใจไม่อยากส่งแล้ว', faq4a:'สามารถส่งอันใหม่มาทับ เราจะนับจากอันใหม่<br>สำหรับการลบ Inbox <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> เพื่อขอลบ',
    faq5q:'อยู่ต่างประเทศ เข้าร่วมได้ไหม?', faq5a:'ได้แน่นอน! นี่คือโปรเจกต์<strong>ระดับโลก</strong> — แฟนจากทุกประเทศสามารถเข้าร่วมได้ ไม่ว่าจะอยู่ที่ไหนในโลก ข้อความของคุณมีค่าเสมอ 🌍',
    faq6q:'เว็บมีปัญหา / ส่งผลงานไม่ได้', faq6a:'ไม่ต้องตกใจ! สามารถกดปุ่ม <strong>"Report Bug"</strong> ที่มุมล่างขวา แล้วแนบข้อความและรูปที่ต้องการส่งมา เราจะ submit ให้แทน หรือ Inbox <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> บน X ได้เลยค่ะ',
    faq7q:'กล่าวถึงบุคคลอื่น เช่น ครอบครัว หรือเพื่อนร่วมงานได้ไหม?', faq7a:'ได้เลยค่ะ! สามารถกล่าวถึงบุคคลที่เกี่ยวข้อง เช่น เพื่อนร่วมงาน ผู้กำกับ ครอบครัว หรือความสัมพันธ์ในเชิงมิตรภาพได้ ตราบใดที่อยู่ในขอบเขตที่สุภาพและเหมาะสม 🤍<br>อย่างไรก็ตาม เนื้อหาแนว shipping แบบชัดเจน หรือเนื้อหาไม่เหมาะสม (เช่น 18+) อาจต้องขออนุญาตตัดออกเพื่อความเหมาะสมของงานค่ะ',
    shareTitle:'แชร์โปรเจกต์นี้ 💛', shareText:'ช่วยกันบอกต่อ!',
    mapLegendLabel:'จำนวนผลงาน', mapTopTitle:'ประเทศที่เข้าร่วมมากที่สุด',
    shareCopiedToast:'คัดลอกลิงก์แล้ว! วางบน {app} ได้เลย',
    milestoneTitle:'ครบ {n} ผลงานแล้ว!', milestoneText:'ขอบคุณแฟนๆ จากทั่วโลก ความรักยังคงเติบโตต่อไป 💛',
    footerDisclaimer:'โปรเจกต์แฟนอิสระ ไม่เกี่ยวข้องกับอีบยองฮอนหรือ BH Entertainment',
  },
  es: {
    navAbout:'Sobre nosotros', navSubmit:'Enviar', navPhotobook:'Álbum', navMessages:'Mensajes', navFAQ:'Preguntas', navBonus:'Bonus - Cronología',
    heroTitle:'Lee Byung-hun Global Fan Project', heroSubtitle:'Global Edition 🌍 por @cattowriter 🐱',
    heroTagline:'Un Fanbook especial para Lee Byung-hun',
    heroBookTitle:'Lee Byung-hun Global Fanbook 🌍',
    heroSubmitBtn:'✉️ Envía tu página',
    flagNote:'(¡se actualiza a medida que fans de más países se unen!)',
    statSubmissions:'envíos', statDaysLeft:'días restantes', statCountries:'países',
    mapTitle:'Fans de todo el mundo 🌍', mapSubtitle:'Haz clic en un país resaltado para ver cuántos fans se han unido',
    aboutTitle:'Sobre el proyecto',
    aboutText:'📣 ¡Queridos fans de Lee Byung-hun! Me encantaría invitarles a participar en el <strong>"Lee Byung-hun Global Fan Project"</strong><br><br>He creado un sitio web para recopilar mensajes de fans de todo el mundo para compartir con Lee Byung-hun. El plan es entregarlos en su próximo fan meeting en Japón, o pedir al personal que se los entregue si no tengo la oportunidad personalmente.<br><br>Los fans pueden enviar mensajes y fotos / fanart en línea, y compilaré todo en un <em>Fanbook – Global Edition</em> impreso para entregárselo directamente. 🤍 (¡Realmente espero poder dárselo en persona!)<br><br>✨ <strong>Este es un proyecto personal.</strong> Yo cubriré todos los costos de impresión. Algunas imágenes pueden redimensionarse ligeramente para ajustarse al libro (estimado máx. ~40 páginas).<br><br>Por favor, mantengan el contenido enfocado en Lee Byung-hun. Para garantizar la adecuación, el contenido de shipping / Inhun o no relacionado podría ser excluido. (¡Yo también soy fan de Inhun 🥹 — pero para este proyecto, puede que necesite eliminar contenido inadecuado.)<br><br>El sitio web también permanecerá como una <strong>versión digital</strong> para que él pueda leer los mensajes de los fans en cualquier momento.<br><br>⏰ <strong>Fecha límite: 10 de marzo de 2026</strong><br><small>(El libro se preparará para finales de marzo.)</small>',
    tlOpen:'Abierto', tlDeadline:'Cierre', tlPrint:'Impresión', tlDeliver:'Entrega',
    submitTitle:'Cómo enviar', submitSubtitle:'Elige la opción que mejor se adapte a ti',
    cardATitle:'Mensaje de texto', cardADesc:'Escribe un mensaje sincero para Lee Byung-hun. Máx. 400 caracteres. Nosotros diseñamos la página.', cardABadge:'Sin diseño necesario',
    cardBTitle:'Foto + Mensaje', cardBDesc:'Sube 1 imagen (fanart o foto favorita) + un mensaje corto. Nos encargamos del diseño.', cardBBadge:'Fácil',
    cardCTitle:'Página personalizada', cardCDesc:'Diseña tu propia página A4 cuadrada (2400×2400px, PNG, 300DPI, RGB). Máxima libertad creativa.', cardCBadge:'Control total',
    btnSpecSheet:'📄 Descargar hoja de especificaciones', btnSubmitNow:'Enviar ahora →',
    noticeContentFocus:'💛 Por favor, mantén el contenido enfocado en Lee Byung-hun. Para garantizar la adecuación, el contenido de shipping / Inhun o no relacionado podría ser excluido. (¡Yo también soy fan de Inhun 🥹 — pero para este proyecto, puede que necesite eliminar contenido inadecuado.)',
    msgTitle:'Mensajes de los fans 💌', msgSubtitle:'Mensajes públicos de fans que aceptaron compartir ✨',
    msgExample:'(Ejemplo — se actualizará automáticamente cuando los fans envíen)',
    faqTitle:'Preguntas frecuentes',
    faq1q:'¿Puedo enviar en cualquier idioma?', faq1a:'Se prefiere el inglés, pero puedes enviar en cualquier idioma. Los mensajes en otros idiomas se traducirán al inglés usando Google Gemini AI.',
    faq2q:'¿Tiene algún costo participar?', faq2a:'¡No! Yo asistiré al fan meeting e imprimiré este fanbook personalmente. Si no puedo entregarlo en persona, se lo dejaré al personal.',
    faq3q:'¿Cuál es la fecha límite?', faq3a:'10 de marzo de 2026 — para tener tiempo de compilar e imprimir. El libro se preparará para presentar a finales de marzo. ¡Mira la cuenta regresiva arriba!',
    faq4q:'Quiero editar mi mensaje o cancelar mi envío', faq4a:'Puedes enviar uno nuevo para reemplazarlo — usaremos la versión más reciente.<br>Para eliminar tu envío, envía un DM a <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> en X para solicitar la eliminación.',
    faq5q:'¿Pueden participar fans de cualquier país?', faq5a:'¡Por supuesto! Este es un proyecto <strong>global</strong> — fans de todos los países son bienvenidos. No importa dónde estés en el mundo, tu mensaje importa. 🌍',
    faq6q:'El sitio web tiene un error / no puedo enviar', faq6a:'¡No te preocupes! Puedes hacer clic en el botón <strong>"Report Bug"</strong> en la esquina inferior derecha e incluir tu mensaje y foto — lo enviaremos por ti. O puedes enviar un DM a <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a> en X directamente.',
    faq7q:'¿Puedo mencionar a otras personas, como su familia o compañeros de actuación?', faq7a:'¡Sí! Puedes mencionar a personas relacionadas con su vida o trabajo — como colegas, colaboradores, familiares o amistades — siempre que el mensaje sea respetuoso. 🤍<br>Para mantener el fanbook apropiado para ser presentado directamente a él, podríamos excluir contenido explícitamente NSFW (18+) o no relacionado con él.',
    shareTitle:'Comparte este proyecto 💛', shareText:'¡Ayuda a difundir la palabra!',
    mapLegendLabel:'Envíos', mapTopTitle:'Países con más participación',
    shareCopiedToast:'¡Enlace copiado! Pégalo en {app}',
    milestoneTitle:'¡{n} envíos alcanzados!', milestoneText:'¡Gracias a todos los fans del mundo! El amor sigue creciendo 💛',
    footerDisclaimer:'Este es un proyecto independiente de fans. No está afiliado con Lee Byung-hun ni BH Entertainment.',
  },
  ko: {
    navAbout:'소개', navSubmit:'제출', navPhotobook:'포토북', navMessages:'메시지', navFAQ:'FAQ', navBonus:'보너스 - 타임라인',
    heroTitle:'Lee Byung-hun Global Fan Project', heroSubtitle:'Global Edition 🌍 by @cattowriter 🐱',
    heroTagline:'이병헌을 위한 특별한 팬북',
    heroBookTitle:'Lee Byung-hun Global Fanbook 🌍',
    heroSubmitBtn:'✉️ 페이지 제출하기',
    flagNote:'(더 많은 나라의 팬이 참여하면 업데이트됩니다!)',
    statSubmissions:'제출', statDaysLeft:'남은 일수', statCountries:'국가',
    mapTitle:'전 세계의 팬들 🌍', mapSubtitle:'강조된 나라를 클릭하면 참여한 팬 수를 확인할 수 있습니다',
    aboutTitle:'프로젝트 소개',
    aboutText:'📣 이병헌 팬 여러분! <strong>"Lee Byung-hun Global Fan Project"</strong>에 여러분을 초대합니다.<br><br>전 세계 팬들의 메시지를 모아 이병헌에게 전달하기 위한 웹사이트를 만들었습니다. 일본 팬미팅에서 직접 전달하거나, 직접 전달하지 못할 경우 스태프를 통해 전달할 계획입니다.<br><br>팬들이 온라인으로 메시지와 사진 / 팬아트를 제출하면, 모든 것을 인쇄된 <em>팬북 – 글로벌 에디션</em>으로 편집하여 직접 전달하겠습니다. 🤍 (직접 전달할 수 있기를 진심으로 바랍니다!)<br><br>✨ <strong>이것은 개인 프로젝트입니다.</strong> 인쇄 비용은 모두 제가 부담합니다. 일부 이미지는 책에 맞게 약간 조정될 수 있습니다 (최대 약 40페이지 예상).<br><br>이병헌에 관한 내용만 포함해 주세요. 적절성을 위해 쉬핑 / 인헌 또는 관련 없는 내용은 제외될 수 있습니다. (저도 인헌 팬이에요 🥹 — 하지만 이 프로젝트에서는 부적절한 내용을 삭제해야 할 수 있습니다.)<br><br>웹사이트는 <strong>디지털 버전</strong>으로도 유지되어 그가 언제든지 팬들의 메시지를 읽을 수 있습니다.<br><br>⏰ <strong>마감일: 2026년 3월 10일</strong><br><small>(3월 말에 책을 준비할 예정입니다.)</small>',
    tlOpen:'접수 중', tlDeadline:'마감', tlPrint:'인쇄', tlDeliver:'전달',
    submitTitle:'제출 방법', submitSubtitle:'자신에게 맞는 트랙을 선택하세요',
    cardATitle:'텍스트 메시지', cardADesc:'이병헌에게 진심 어린 메시지를 작성하세요. 최대 400자. 페이지 디자인은 저희가 합니다.', cardABadge:'디자인 불필요',
    cardBTitle:'사진 + 메시지', cardBDesc:'이미지 1장 (팬아트 또는 좋아하는 사진) + 짧은 메시지를 업로드하세요. 레이아웃은 저희가 담당합니다.', cardBBadge:'쉬움',
    cardCTitle:'맞춤 페이지', cardCDesc:'자신만의 A4 정사각형 페이지를 디자인하세요 (2400×2400px, PNG, 300DPI, RGB). 최대한의 창작 자유.', cardCBadge:'완전한 자유',
    btnSpecSheet:'📄 사양서 다운로드', btnSubmitNow:'지금 제출하기 →',
    noticeContentFocus:'💛 이병헌에 관한 내용만 포함해 주세요. 적절성을 위해 쉬핑 / 인헌 또는 관련 없는 내용은 제외될 수 있습니다. (저도 인헌 팬이에요 🥹 — 하지만 이 프로젝트에서는 부적절한 내용을 삭제해야 할 수 있습니다.)',
    msgTitle:'팬들의 메시지 💌', msgSubtitle:'공개에 동의한 팬들의 메시지 ✨',
    msgExample:'(예시 — 팬이 제출하면 자동으로 업데이트됩니다)',
    faqTitle:'자주 묻는 질문',
    faq1q:'어떤 언어로든 제출할 수 있나요?', faq1a:'영어를 권장하지만, 어떤 언어로든 제출할 수 있습니다. 영어가 아닌 메시지는 Google Gemini AI를 사용하여 영어로 번역됩니다.',
    faq2q:'참여 비용이 있나요?', faq2a:'아닙니다! 제가 팬미팅에 참석하여 이 팬북을 직접 인쇄해 가겠습니다. 직접 전달하지 못하면 스태프에게 맡기겠습니다.',
    faq3q:'마감일은 언제인가요?', faq3a:'2026년 3월 10일 — 편집과 인쇄 시간을 확보하기 위해서입니다. 3월 말에 전달할 수 있도록 준비합니다. 위의 카운트다운을 확인하세요!',
    faq4q:'메시지를 수정하거나 제출을 취소하고 싶어요', faq4a:'새로운 것을 제출하면 이전 것을 대체합니다 — 가장 최신 버전을 사용합니다.<br>제출을 삭제하려면 X에서 <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a>에게 DM을 보내 삭제를 요청해 주세요.',
    faq5q:'어느 나라 팬이든 참여할 수 있나요?', faq5a:'물론입니다! 이것은 <strong>글로벌</strong> 프로젝트입니다 — 모든 나라의 팬을 환영합니다. 세계 어디에 계시든 여러분의 메시지는 소중합니다. 🌍',
    faq6q:'웹사이트 오류 / 제출할 수 없어요', faq6a:'걱정하지 마세요! 오른쪽 하단의 <strong>"Report Bug"</strong> 버튼을 클릭하고 메시지와 사진을 첨부해 주세요 — 대신 제출해 드리겠습니다. 또는 X에서 <a href="https://x.com/cattowriter" target="_blank" rel="noopener noreferrer">@cattowriter</a>에게 DM을 보내주세요.',
    faq7q:'가족이나 동료 배우 등 다른 사람을 언급해도 되나요?', faq7a:'네! 그의 삶이나 작업과 관련된 사람들 — 동료, 감독, 가족, 친구 관계 등 — 을 언급하는 것은 메시지가 정중한 한 환영합니다. 🤍<br>직접 전달될 팬북의 품격을 위해, 명시적인 NSFW(18+) 내용이나 그와 관련 없는 내용은 정중히 제외될 수 있습니다.',
    shareTitle:'이 프로젝트를 공유하세요 💛', shareText:'함께 알려주세요!',
    mapLegendLabel:'제출 수', mapTopTitle:'참여가 많은 국가',
    shareCopiedToast:'링크를 복사했습니다! {app}에 붙여넣으세요',
    milestoneTitle:'{n}개 제출 달성!', milestoneText:'전 세계 팬 여러분 감사합니다! 사랑은 계속됩니다 💛',
    footerDisclaimer:'이것은 독립적인 팬 프로젝트입니다. 이병헌 또는 BH 엔터테인먼트와 무관합니다.',
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
  // Re-render dynamic content that uses translated strings
  if (currentData && currentData.countries) {
    renderTopCountries(currentData.countries);
  }
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
  return { count: 0, cap: 500, deadline: '2026-03-10', countries: {} };
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
  updateMapLegend(data.countries);
  renderTopCountries(data.countries);
  updateSubmitButtons(data);
  updateTimeline();
  checkMilestone(data);
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
          '1': '#e8d5b0',
          '2': '#d4b98a',
          '3': '#c4a46c',
          '4': '#a8874e',
          '5': '#8b6a3e',
          '6': '#6b4f2d',
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
// MAP LEGEND & TOP COUNTRIES
// ============================================
function updateMapLegend(countries) {
  const maxEl = document.getElementById('legend-max');
  if (!maxEl) return;
  const vals = Object.values(countries);
  const maxVal = vals.length ? Math.max(...vals) : 0;
  maxEl.textContent = maxVal > 0 ? maxVal + '+' : '5+';
}

function renderTopCountries(countries) {
  const container = document.getElementById('map-top-countries');
  if (!container) return;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const entries = Object.entries(countries)
    .map(([code, count]) => ({ code, count, info: COUNTRY_DATA[code] }))
    .filter(e => e.info)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  if (entries.length === 0) { container.innerHTML = ''; return; }
  const heading = dict.mapTopTitle || 'Top participating countries';
  const submWord = dict.statSubmissions || 'submissions';
  container.innerHTML = `<h3 class="top-countries-title">${heading}</h3>
    <div class="top-countries-list">${entries.map((e, i) => `
      <div class="top-country-item">
        <span class="top-country-rank">#${i + 1}</span>
        <span class="top-country-flag">${e.info.flag}</span>
        <span class="top-country-name">${e.info.name}</span>
        <span class="top-country-count">${e.count} ${submWord}</span>
      </div>`).join('')}
    </div>`;
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
// MILESTONE CELEBRATION (100, 200, 300, 400, 500)
// ============================================
const MILESTONES = [100, 200, 300, 400, 500];
const MILESTONE_EMOJI = {
  100: '🔥🎉🔥',
  200: '🌟💛🌟',
  300: '🎊🥳🎊',
  400: '✨💫✨',
  500: '🏆👑🏆'
};

function checkMilestone(data) {
  for (const n of MILESTONES) {
    if (data.count >= n) {
      const key = 'lbh_milestone_' + n;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        showMilestoneBanner(n);
        break; // show one at a time (next milestone on next refresh)
      }
    }
  }
}

function showMilestoneBanner(n) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const title = (dict.milestoneTitle || '{n} Submissions Reached!').replace('{n}', n);
  const text = dict.milestoneText || 'Thank you to all the fans around the world! The love keeps growing 💛';
  const emoji = MILESTONE_EMOJI[n] || '🎉🎉🎉';
  const banner = document.createElement('div');
  banner.className = 'milestone-banner';
  banner.innerHTML = `
    <div class="milestone-content">
      <div class="milestone-fire">${emoji}</div>
      <h3 class="milestone-title">${title}</h3>
      <p class="milestone-text">${text}</p>
    </div>
  `;
  banner.addEventListener('click', () => banner.classList.add('hide'));
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('show'));
  setTimeout(() => banner.classList.add('hide'), 6000);
  setTimeout(() => banner.remove(), 7000);
}

// ============================================
// TIMELINE — highlight current stage
// ============================================
function updateTimeline() {
  const steps = document.querySelectorAll('.timeline-step');
  if (!steps.length) return;
  // Current stage: before deadline = "Open" (step 0)
  const now = new Date();
  const deadline = new Date('2026-03-10T23:59:59');
  let activeIdx = 0;
  if (now > deadline) activeIdx = 1; // past deadline
  // We only track open/deadline for now
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === activeIdx);
    step.classList.toggle('done', i < activeIdx);
  });
}

// ============================================
// SHARE BUTTONS
// ============================================
function initShareButtons() {
  const url = encodeURIComponent('https://cattowriter.com/LBH_global_project/');
  const text = encodeURIComponent('Join the Lee Byung-hun Global Fan Project! Send your message to LBH and be part of the printed Fanbook 💛🌍 #LeeByunghun #LBH #이병헌');
  const shareX = document.getElementById('share-x');
  const shareFB = document.getElementById('share-fb');
  if (shareX) shareX.href = `https://x.com/intent/tweet?url=${url}&text=${text}`;
  if (shareFB) shareFB.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  // IG & TikTok don't have share URLs — handled via onclick in HTML
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Detect browser language
  const bl = navigator.language || '';
  if (bl.startsWith('th')) setLang('th');
  else if (bl.startsWith('es')) setLang('es');
  else if (bl.startsWith('ko')) setLang('ko');
  else setLang('en');

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
  initShareButtons();

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
