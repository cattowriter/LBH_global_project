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
    aboutText:'📣 Dear Lee Byung-hun fans!<br>I\'d love to invite you to join the <strong>"Lee Byung-hun Global Fan Project."</strong><br><br>I personally built this website with love to gather messages from fans around the world and share them with Lee Byung-hun. The plan is to present them at his upcoming Japan fan meeting — or ask the staff to deliver them if I don\'t get the chance personally.<br><br>Fans can submit messages, photos, or fanart online, and I will compile everything into a printed <em>Fanbook – Global Edition</em> to give to him directly. 🤍<br>(I truly hope I can hand it to him myself!)<br><br>✨ <strong>This is a personal project,</strong> and I will cover all printing costs. Some images may be slightly resized to fit the book (~40 pages).<br><br>[Update] You\'re very welcome to mention people connected to his life or work (such as colleagues, collaborators, family members, or friendships), as long as the message remains respectful and keeps Lee Byung-hun as the main focus. Content that is NSFW (18+), overly shipping-focused, or unrelated may be gently excluded.<br><br>🌿 <strong>Note on AI images:</strong> In recent interviews, he has shared concerns about AI content that recreates his likeness. Since this fanbook will be presented to him personally, please avoid submitting AI-generated images that pair him with other people or place him in imagined scenes with others. Regular fanart is always welcome.<br><br>The website will remain available as a <strong>digital version</strong> so he can read fans\' messages anytime.<br><br>⏰ <strong>Deadline: March 10, 2026</strong>',
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
    faq7q:'Can I mention other people, like his co-stars or family?', faq7a:'Many people have kindly asked whether it\'s okay to mention individuals such as Lee Min-jung, Park Chan-wook, Lee Jung-jae, or others.<br><br>Yes — you\'re very welcome to mention people connected to his life or work, such as colleagues, collaborators, family members, or friendships, as long as the message remains respectful and keeps Lee Byung-hun as the main focus.<br><br>To keep the fanbook suitable for something that will be presented to him directly, I may gently exclude content that is explicitly NSFW (18+), overly shipping-focused, or unrelated to him.<br><br>Thank you so much for your understanding and for helping keep this project warm and meaningful for him. 🤍<br>(I\'m an Inhun fan too 🥹 — this is simply to keep everything appropriate for the occasion.)',
    faq8q:'Can I use AI-generated images?', faq8a:'Since this fanbook will be presented to Lee Byung-hun personally, we kindly ask fans to please avoid submitting AI-generated images that recreate his likeness together with other people, as he has shared in interviews that he feels concerned about AI-related content.<br><br>Regular fanart and all heartfelt creative works are absolutely welcome. Thank you so much for your understanding 🤍',
    shareTitle:'Share this project 💛', shareText:'Help spread the word!',
    mapLegendLabel:'Submissions', mapTopTitle:'Top participating countries', allCountriesLabel:'Participating Countries',
    shareCopiedToast:'Link copied! Paste it on {app}',
    milestoneTitle:'{n} Submissions Reached!', milestoneText:'Thank you to all the fans around the world! The love keeps growing 💛',
    modalExploreBtn:'Explore on Message Board →', milestoneBadge:'🔥 {n} reached!',
    closedTitle:'Submissions Closed 💛',
    closedText:'Thank you for being part of this project!<br>We received <strong>{count} messages</strong> from <strong>{countries} countries</strong> around the world.<br><br>The fanbook is now being designed and will be presented to Lee Byung-hun in early April.<br>Stay tuned for updates! 🌍',
    closedBtn:'Submissions Closed 🔒',
    closedCountdown:'Closed',
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
    aboutText:'📣 ขอเชิญแฟน ๆ ร่วม Lee Byung-hun Global Fan Project 🤍<br><br>เราได้สร้างเว็บไซต์นี้ขึ้นมาด้วยใจ เพื่อรวบรวมข้อความจากแฟนทั่วโลกและส่งต่อให้กับอีบยองฮอน โดยมีแผนนำไปมอบให้เขาในงานแฟนมีตที่ญี่ปุ่น หรือฝากทีมงานส่งให้หากไม่มีโอกาสมอบด้วยตัวเอง<br><br>แฟน ๆ สามารถส่งข้อความ รูปภาพ หรือแฟนอาร์ตผ่านเว็บไซต์ และจะนำทั้งหมดไปจัดทำเป็น <em>Fanbook</em> ฉบับ Global เพื่อมอบให้เขาโดยตรง<br>(หวังว่าจะได้มอบด้วยตัวเองจริง ๆ 🤍)<br><br>✨ <strong>เป็นโปรเจกต์ส่วนตัว</strong> ผู้จัดทำออกค่าใช้จ่ายทั้งหมด ภาพอาจมีการปรับขนาดเล็กน้อยเพื่อให้พอดีกับเล่ม (~40 หน้า)<br><br>[อัปเดต] สามารถกล่าวถึงบุคคลที่เกี่ยวข้องกับชีวิตหรือผลงานของเขาได้ เช่น เพื่อนร่วมงาน ครอบครัว หรือความสัมพันธ์ต่าง ๆ โดยขอให้ยังคงโฟกัสที่อีบยองฮอนเป็นหลัก เนื้อหาที่เป็น 18+, เน้น ship มากเกินไป หรือไม่เกี่ยวข้อง อาจต้องขออนุญาตตัดออก<br><br>🌿 <strong>หมายเหตุเรื่องภาพ AI:</strong> จากบทสัมภาษณ์ล่าสุด เขาเคยแสดงความกังวลเกี่ยวกับคอนเทนต์ AI ที่นำภาพลักษณ์ของเขาไปสร้างใหม่ จึงขอความร่วมมืองดภาพ AI ที่จับคู่เขากับผู้อื่นหรือใส่ในฉากสมมติ แฟนอาร์ตปกติยังยินดีต้อนรับเสมอ<br><br>เว็บไซต์จะคงเป็นเวอร์ชันออนไลน์ให้เขาอ่านได้ตลอด<br><br>⏰ <strong>ปิดรับ: 10 มีนาคม 2026</strong>',
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
    faq7q:'กล่าวถึงบุคคลอื่น เช่น ครอบครัว หรือเพื่อนร่วมงานได้ไหม?', faq7a:'[อัปเดต] เนื่องจากมีหลายท่านสอบถามเข้ามา เช่น สามารถกล่าวถึงอีมินจอง, Park Chan-wook, อีจองแจ หรือบุคคลอื่น ๆ ได้หรือไม่ — สามารถกล่าวถึงบุคคลที่เกี่ยวข้องกับชีวิตหรือผลงานของเขาได้เลยค่ะ ไม่ว่าจะเป็นเพื่อนร่วมงาน ครอบครัว หรือความสัมพันธ์ในเชิงมิตรภาพ ตราบใดที่ยังอยู่ในขอบเขตที่สุภาพและเหมาะสม และยังคงโฟกัสที่ตัวอีบยองฮอนเป็นหลัก<br><br>อย่างไรก็ตาม เนื้อหาแนว shipping แบบชัดเจน หรือเนื้อหาที่ไม่เหมาะสม (เช่น 18+) อาจต้องขออนุญาตตัดออก เพื่อให้โปรเจ็คยังคงเหมาะสมกับการนำไปมอบให้เขาโดยตรงค่ะ',
    faq8q:'สามารถใช้ภาพ AI ได้ไหม?', faq8a:'เนื่องจากแฟนบุ๊กเล่มนี้จะมอบให้อีบยองฮอนโดยตรง ขอความร่วมมืออย่างสุภาพให้งดส่งภาพ AI ที่นำภาพลักษณ์ของเขาไปสร้างร่วมกับบุคคลอื่น เนื่องจากเขาเคยพูดในบทสัมภาษณ์ว่ามีความกังวลเกี่ยวกับคอนเทนต์ AI<br><br>แฟนอาร์ตและผลงานสร้างสรรค์จากใจทุกรูปแบบยังคงยินดีต้อนรับเสมอ ขอบคุณมาก ๆ สำหรับความเข้าใจค่ะ 🤍',
    shareTitle:'แชร์โปรเจกต์นี้ 💛', shareText:'ช่วยกันบอกต่อ!',
    mapLegendLabel:'จำนวนผลงาน', mapTopTitle:'ประเทศที่เข้าร่วมมากที่สุด', allCountriesLabel:'Participating Countries',
    shareCopiedToast:'คัดลอกลิงก์แล้ว! วางบน {app} ได้เลย',
    milestoneTitle:'ครบ {n} ผลงานแล้ว!', milestoneText:'ขอบคุณแฟนๆ จากทั่วโลก ความรักยังคงเติบโตต่อไป 💛',
    modalExploreBtn:'ดูเพิ่มเติมบนบอร์ดข้อความ →', milestoneBadge:'🔥 ครบ {n} แล้ว!',
    closedTitle:'ปิดรับผลงานแล้ว 💛',
    closedText:'ขอบคุณที่เข้าร่วมโปรเจกต์นี้!<br>เราได้รับ <strong>{count} ข้อความ</strong> จาก <strong>{countries} ประเทศ</strong> ทั่วโลก<br><br>ตอนนี้กำลังทำรูปเล่ม Fanbook และจะนำไปมอบให้อีบยองฮอนในต้นเดือนเมษายน<br>รอติดตามอัพเดทนะคะ! 🌍',
    closedBtn:'ปิดรับแล้ว 🔒',
    closedCountdown:'ปิดแล้ว',
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
    aboutText:'📣 ¡Fans de Lee Byung-hun!<br>Les invito a participar en el <strong>"Lee Byung-hun Global Fan Project"</strong> 🤍<br><br>Este sitio web fue creado personalmente con mucho cariño para reunir mensajes de fans de todo el mundo y compartirlos con Lee Byung-hun. El plan es entregarlos en su próximo fan meeting en Japón, o a través del staff si no puedo hacerlo personalmente.<br><br>Los fans pueden enviar mensajes, fotos o fanart en línea, y todo se recopilará en un <em>fanbook global</em> impreso para entregárselo directamente.<br><br>✨ <strong>Es un proyecto personal</strong> y cubriré todos los costos de impresión (~40 páginas).<br><br>[Actualización] Se pueden mencionar personas relacionadas con su vida o trabajo (colegas, colaboradores, familia, amistades), siempre manteniendo el respeto y el enfoque en Lee Byung-hun. El contenido NSFW, excesivamente enfocado en "shipping" o no relacionado puede excluirse.<br><br>🌿 <strong>Nota sobre IA:</strong> En entrevistas recientes, él ha expresado preocupación por contenidos de IA que recrean su imagen. Por ello, pedimos evitar imágenes generadas con IA que lo muestren junto a otras personas o en escenas imaginadas. El fanart tradicional siempre es bienvenido.<br><br>El sitio web permanecerá como <strong>versión digital</strong>.<br><br>⏰ <strong>Fecha límite: 10 de marzo de 2026</strong>',
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
    faq7q:'¿Puedo mencionar a otras personas, como su familia o compañeros de actuación?', faq7a:'Muchas personas han preguntado amablemente si está bien mencionar personas como Lee Min-jung, Park Chan-wook, Lee Jung-jae, u otros.<br><br>Sí — es muy bienvenido mencionar personas relacionadas con su vida o trabajo, como colegas, colaboradores, familiares o amistades, siempre que el mensaje sea respetuoso y mantenga a Lee Byung-hun como enfoque principal.<br><br>Para mantener el fanbook adecuado para algo que se le presentará directamente, podría excluir contenido explícitamente NSFW (18+), excesivamente centrado en shipping, o no relacionado con él.<br><br>Muchas gracias por su comprensión y por ayudar a que este proyecto sea cálido y significativo para él. 🤍<br>(Yo también soy fan de Inhun 🥹 — esto es simplemente para mantener todo apropiado para la ocasión.)',
    faq8q:'¿Se pueden usar imágenes generadas con IA?', faq8a:'Como este fanbook será entregado directamente a Lee Byung-hun, les pedimos amablemente evitar enviar imágenes generadas con IA que recrean su imagen junto a otras personas, ya que él ha expresado en entrevistas su preocupación sobre contenidos relacionados con IA.<br><br>El fanart y todas las creaciones hechas con cariño siempre serán bienvenidas. ¡Muchas gracias por su comprensión! 🤍',
    shareTitle:'Comparte este proyecto 💛', shareText:'¡Ayuda a difundir la palabra!',
    mapLegendLabel:'Envíos', mapTopTitle:'Países con más participación', allCountriesLabel:'Participating Countries',
    shareCopiedToast:'¡Enlace copiado! Pégalo en {app}',
    milestoneTitle:'¡{n} envíos alcanzados!', milestoneText:'¡Gracias a todos los fans del mundo! El amor sigue creciendo 💛',
    modalExploreBtn:'Explorar en el tablero de mensajes →', milestoneBadge:'🔥 ¡{n} alcanzados!',
    closedTitle:'Envíos cerrados 💛',
    closedText:'¡Gracias por ser parte de este proyecto!<br>Recibimos <strong>{count} mensajes</strong> de <strong>{countries} países</strong> de todo el mundo.<br><br>El fanbook se está diseñando y se presentará a Lee Byung-hun a principios de abril.<br>¡Estén atentos a las novedades! 🌍',
    closedBtn:'Envíos cerrados 🔒',
    closedCountdown:'Cerrado',
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
    aboutText:'📣 이병헌 글로벌 팬 프로젝트에 함께해 주세요 🤍<br><br>이 웹사이트는 전 세계 팬들의 메시지를 모아 이병헌 배우님께 전하기 위해, 진심을 담아 직접 만들었습니다. 일본 팬미팅에서 직접 전달할 예정이며, 기회가 없을 경우 스태프를 통해 전달할 계획입니다.<br><br>팬들은 메시지, 사진, 팬아트를 온라인으로 제출할 수 있으며, 모든 내용을 모아 글로벌 팬북으로 제작하여 직접 전달할 예정입니다.<br><br>✨ <strong>개인 프로젝트이며</strong> 인쇄 비용은 모두 부담합니다 (~40페이지 예상).<br><br>[안내] 배우님의 삶이나 작품과 관련된 인물(동료, 협업자, 가족, 우정 등)은 언급 가능합니다. 다만 메시지는 항상 이병헌 배우 중심으로 정중하게 작성해 주세요. NSFW(18+), 과도한 커플링, 무관한 내용은 제외될 수 있습니다.<br><br>🌿 <strong>AI 이미지 안내:</strong> 최근 인터뷰에서 배우님은 자신의 모습이 재현되는 AI 콘텐츠에 대해 우려를 밝힌 바 있습니다. 다른 사람과 함께 등장하는 AI 생성 이미지는 제출을 자제해 주세요. 일반 팬아트는 언제나 환영합니다.<br><br>웹사이트는 <strong>디지털 버전</strong>으로 계속 유지됩니다.<br><br>⏰ <strong>마감: 2026년 3월 10일</strong>',
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
    faq7q:'가족이나 동료 배우 등 다른 사람을 언급해도 되나요?', faq7a:'이민정, 박찬욱 감독, 이정재 등을 언급해도 되는지 문의를 많이 주셨습니다.<br><br>네 — 그의 삶이나 작업과 관련된 사람들을 언급하는 것은 매우 환영합니다. 동료, 협업자, 가족, 우정 관계 등이 포함되며, 메시지가 정중하고 이병헌을 중심으로 유지되어야 합니다.<br><br>직접 전달될 팬북에 걸맞도록, 명시적인 NSFW(18+) 내용, 지나치게 shipping에 집중된 내용, 또는 그와 무관한 내용은 정중히 제외될 수 있습니다.<br><br>이해와 협조에 진심으로 감사드립니다. 🤍<br>(저도 Inhun 팬입니다 🥹 — 단지 이 자리에 모든 것이 어울리도록 하기 위함입니다.)',
    faq8q:'AI 이미지를 사용해도 되나요?', faq8a:'이 팬북은 이병헌 배우님께 직접 전달될 예정이므로, 배우님의 모습이 다른 사람과 함께 재현된 AI 생성 이미지는 제출을 자제해 주시길 정중히 부탁드립니다. 배우님은 여러 인터뷰에서 AI 관련 콘텐츠에 대해 우려를 느낀다고 밝힌 바 있습니다.<br><br>팬아트와 정성 어린 모든 창작물은 언제나 환영합니다. 이해해 주셔서 감사합니다 🤍',
    shareTitle:'이 프로젝트를 공유하세요 💛', shareText:'함께 알려주세요!',
    mapLegendLabel:'제출 수', mapTopTitle:'참여가 많은 국가', allCountriesLabel:'Participating Countries',
    shareCopiedToast:'링크를 복사했습니다! {app}에 붙여넣으세요',
    milestoneTitle:'{n}개 제출 달성!', milestoneText:'전 세계 팬 여러분 감사합니다! 사랑은 계속됩니다 💛',
    modalExploreBtn:'메시지 보드에서 살펴보기 →', milestoneBadge:'🔥 {n} 달성!',
    closedTitle:'접수가 마감되었습니다 💛',
    closedText:'이 프로젝트에 참여해 주셔서 감사합니다!<br>전 세계 <strong>{countries}개국</strong>에서 <strong>{count}개의 메시지</strong>를 받았습니다.<br><br>팬북을 제작 중이며 4월 초에 이병헌에게 전달할 예정입니다.<br>업데이트를 기대해 주세요! 🌍',
    closedBtn:'접수 마감 🔒',
    closedCountdown:'마감',
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

// Country → Continent mapping
const CONTINENT_MAP = {
  // Asia
  AF:'Asia', AM:'Asia', AZ:'Asia', BD:'Asia', BN:'Asia', BT:'Asia', CN:'Asia',
  GE:'Asia', HK:'Asia', ID:'Asia', IN:'Asia', JP:'Asia', KG:'Asia', KH:'Asia',
  KP:'Asia', KR:'Asia', KZ:'Asia', LA:'Asia', LK:'Asia', MM:'Asia', MN:'Asia',
  MV:'Asia', MY:'Asia', NP:'Asia', PH:'Asia', PK:'Asia', SG:'Asia', TH:'Asia',
  TJ:'Asia', TL:'Asia', TM:'Asia', TW:'Asia', UZ:'Asia', VN:'Asia',
  // Middle East → Asia
  BH:'Asia', IQ:'Asia', IR:'Asia', IL:'Asia', JO:'Asia', KW:'Asia', LB:'Asia',
  OM:'Asia', PS:'Asia', QA:'Asia', SA:'Asia', SY:'Asia', AE:'Asia', YE:'Asia',
  TR:'Asia',
  // Europe
  AD:'Europe', AL:'Europe', AT:'Europe', BA:'Europe', BE:'Europe', BG:'Europe',
  BY:'Europe', CH:'Europe', CY:'Europe', CZ:'Europe', DE:'Europe', DK:'Europe',
  EE:'Europe', ES:'Europe', FI:'Europe', FR:'Europe', GB:'Europe', GR:'Europe',
  HR:'Europe', HU:'Europe', IE:'Europe', IS:'Europe', IT:'Europe', LI:'Europe',
  LT:'Europe', LU:'Europe', LV:'Europe', MC:'Europe', MD:'Europe', ME:'Europe',
  MK:'Europe', MT:'Europe', NL:'Europe', NO:'Europe', PL:'Europe', PT:'Europe',
  RO:'Europe', RS:'Europe', RU:'Europe', SE:'Europe', SI:'Europe', SK:'Europe',
  SM:'Europe', UA:'Europe', VA:'Europe', XK:'Europe',
  // Americas
  AG:'Americas', AR:'Americas', BB:'Americas', BO:'Americas', BR:'Americas',
  BS:'Americas', BZ:'Americas', CA:'Americas', CL:'Americas', CO:'Americas',
  CR:'Americas', CU:'Americas', DM:'Americas', DO:'Americas', EC:'Americas',
  GD:'Americas', GT:'Americas', GY:'Americas', HN:'Americas', HT:'Americas',
  JM:'Americas', KN:'Americas', LC:'Americas', MX:'Americas', NI:'Americas',
  PA:'Americas', PE:'Americas', PY:'Americas', SR:'Americas', SV:'Americas',
  TT:'Americas', US:'Americas', UY:'Americas', VC:'Americas', VE:'Americas',
  // Africa
  AO:'Africa', BF:'Africa', BI:'Africa', BJ:'Africa', BW:'Africa', CD:'Africa',
  CF:'Africa', CG:'Africa', CI:'Africa', CM:'Africa', CV:'Africa', DJ:'Africa',
  DZ:'Africa', EG:'Africa', ER:'Africa', ET:'Africa', GA:'Africa', GH:'Africa',
  GM:'Africa', GN:'Africa', GQ:'Africa', GW:'Africa', KE:'Africa', KM:'Africa',
  LR:'Africa', LS:'Africa', LY:'Africa', MA:'Africa', MG:'Africa', ML:'Africa',
  MR:'Africa', MU:'Africa', MW:'Africa', MZ:'Africa', NA:'Africa', NE:'Africa',
  NG:'Africa', RW:'Africa', SC:'Africa', SD:'Africa', SL:'Africa', SN:'Africa',
  SO:'Africa', SS:'Africa', ST:'Africa', SZ:'Africa', TD:'Africa', TG:'Africa',
  TN:'Africa', TZ:'Africa', UG:'Africa', ZA:'Africa', ZM:'Africa', ZW:'Africa',
  // Oceania
  AU:'Oceania', FJ:'Oceania', FM:'Oceania', KI:'Oceania', MH:'Oceania',
  NR:'Oceania', NZ:'Oceania', PG:'Oceania', PW:'Oceania', SB:'Oceania',
  TO:'Oceania', TV:'Oceania', VU:'Oceania', WS:'Oceania',
};
const CONTINENT_ORDER = ['Asia','Europe','Americas','Africa','Oceania'];
const CONTINENT_ICONS = {Asia:'🌏',Europe:'🌍',Americas:'🌎',Africa:'🌍',Oceania:'🌊'};

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
let submissionsByCountry = {}; // grouped submissions for rich map tooltip

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

    // Group submissions by country for rich map tooltips
    submissionsByCountry = {};
    submissions.forEach(s => {
      const cc = s.country || 'OTHER';
      if (!submissionsByCountry[cc]) submissionsByCountry[cc] = [];
      submissionsByCountry[cc].push(s);
    });

    // Only replace examples if real submissions exist
    if (!submissions.length) return;

    // Show max 6 cards, then a "View all" link
    const MAX_PREVIEW = 6;
    const previewSubs = submissions.slice(0, MAX_PREVIEW);

    const delays = ['delay-1','delay-2','delay-3'];
    wall.innerHTML = previewSubs.map((s, i) => {
      const _ci = COUNTRY_DATA[s.country];
      const flag = _ci ? _ci.flag : '🌍';
      const country = s.country === 'OTHER' ? (s.country_other || 'Other') : (_ci ? _ci.name : s.country);
      const author = `— ${s.name} · ${flag} ${country}`;
      const d = delays[i % 3];
      const translationHtml = s.message_en
        ? `<p class="message-translation">🌐 ${escapeHtml(s.message_en)}</p>`
        : '';
      const photoSrc = s.photo_url || s.custom_page_url || '';
      const photoHtml = photoSrc
        ? `<div class="message-photo"><img src="${escapeHtml(photoSrc)}" alt="Fan photo" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
        : '';
      return `<div class="message-card fade-in ${d}">
        ${photoHtml}
        <p class="message-text">${escapeHtml(s.message)}</p>
        ${translationHtml}
        <p class="message-author">${escapeHtml(author)}</p>
      </div>`;
    }).join('');

    // "View all" button if there are more
    if (submissions.length > MAX_PREVIEW) {
      const viewAllEl = document.querySelector('[data-i18n="msgExample"]');
      if (viewAllEl) {
        viewAllEl.innerHTML = `<a href="photobook.html" style="display:inline-flex;align-items:center;gap:6px;padding:10px 28px;background:var(--brown);color:#fff;border-radius:50px;font-size:0.88rem;font-weight:600;text-decoration:none;transition:all 0.3s;box-shadow:0 2px 10px rgba(139,115,85,0.2);">View all ${submissions.length} messages →</a>`;
        viewAllEl.style.color = '';
        viewAllEl.style.marginTop = '24px';
        viewAllEl.style.textAlign = 'center';
      }
    } else {
      const noteEl = document.querySelector('[data-i18n="msgExample"]');
      if (noteEl) noteEl.style.display = 'none';
    }

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

  // Milestone progress badge
  const badgeEl = document.getElementById('milestone-badge');
  if (badgeEl) {
    const reached = MILESTONES.filter(n => data.count >= n);
    if (reached.length > 0) {
      const highest = reached[reached.length - 1];
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      const label = (dict.milestoneBadge || '🔥 {n} reached!').replace('{n}', highest);
      badgeEl.textContent = label;
      badgeEl.classList.add('active');
    } else {
      badgeEl.textContent = '';
      badgeEl.classList.remove('active');
    }
  }
}

function updateCountdown(deadline) {
  const el = document.getElementById('stat-countdown');
  if (!el) return;
  const now = new Date();
  const end = new Date(deadline + 'T23:59:59');
  const diff = end - now;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  if (diff <= 0) {
    el.textContent = dict.closedCountdown || 'Closed';
    // Update "days left" label
    const daysLabel = el.parentElement && el.parentElement.querySelector('[data-i18n="statDaysLeft"]');
    if (daysLabel) daysLabel.textContent = '';
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
  const now = new Date();
  const deadline = new Date('2026-03-10T23:59:59');
  const closed = data.count >= data.cap || now > deadline;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  document.querySelectorAll('.cta-submit').forEach(btn => {
    if (closed) {
      btn.textContent = dict.closedBtn || 'Submissions Closed 🔒';
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
// Quantize raw count into bucket 1-6 for clean color mapping
function quantizeLevel(count, maxCount) {
  if (!count || maxCount <= 0) return 1;
  const ratio = count / maxCount;
  if (ratio <= 0.10) return 1;
  if (ratio <= 0.25) return 2;
  if (ratio <= 0.45) return 3;
  if (ratio <= 0.65) return 4;
  if (ratio <= 0.85) return 5;
  return 6;
}

function buildQuantizedValues(countries) {
  const counts = Object.values(countries);
  const maxCount = counts.length ? Math.max(...counts) : 1;
  const values = {};
  Object.keys(countries).forEach(code => {
    values[code] = quantizeLevel(countries[code], maxCount);
  });
  return values;
}

function initMap() {
  const container = document.getElementById('world-map');
  if (!container || typeof jsVectorMap === 'undefined') {
    console.warn('Map library not loaded');
    return;
  }

  // Build quantized region values (buckets 1-6)
  const values = buildQuantizedValues(currentData.countries);

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
        fill: '#f0f0f0',
        stroke: '#ffffff',
        strokeWidth: 0.8,
      },
      hover: {
        fill: '#ffe0b2',
        cursor: 'pointer',
      },
      selected: {
        fill: '#ff4757',
      },
    },

    series: {
      regions: [{
        attribute: 'fill',
        scale: {
          '1': '#FFD700',
          '2': '#FFA502',
          '3': '#FF6348',
          '4': '#FF4757',
          '5': '#FF2D55',
          '6': '#FF006E',
        },
        values: values,
        min: 1,
        max: 6,
      }]
    },

    onRegionTooltipShow(event, tooltip, code) {
      const c = COUNTRY_DATA[code];
      const count = currentData.countries[code];
      if (c && count) {
        const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        const submWord = dict.statSubmissions || 'submissions';
        const subs = (submissionsByCountry[code] || []).slice(0, 2);
        let previewHtml = '';
        if (subs.length) {
          previewHtml = '<div style="margin-top:10px;border-top:1px solid #f0f0f0;padding-top:8px">' +
            subs.map(s => {
              const msg = s.message.length > 60 ? s.message.substring(0, 60) + '…' : s.message;
              return '<div style="margin-bottom:6px">' +
                '<div style="font-size:0.78rem;color:#666;font-style:italic;line-height:1.3">&ldquo;' + escapeHtml(msg) + '&rdquo;</div>' +
                '<div style="font-size:0.7rem;color:#999;text-align:right">— ' + escapeHtml(s.name) + '</div>' +
              '</div>';
            }).join('') +
          '</div>';
        }
        const html = '<div style="min-width:180px;max-width:260px">' +
          '<div style="font-size:1.1em;font-weight:800;margin-bottom:2px">' + c.flag + ' ' + escapeHtml(c.name) + '</div>' +
          '<div style="font-size:0.85rem;color:#FF4757;font-weight:700">' + count + ' ' + submWord + '</div>' +
          previewHtml +
          (subs.length ? '<div style="font-size:0.7rem;color:#aaa;text-align:center;margin-top:4px">click to explore →</div>' : '') +
        '</div>';
        tooltip.css({ backgroundColor: '#fff', color: '#2c2c2c', fontFamily: 'Lato, sans-serif', borderRadius: '12px', padding: '14px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', border: '2px solid #FF6348', maxWidth: '280px' });
        const tipEl = document.querySelector('.jvm-tooltip');
        if (tipEl) { tipEl.innerHTML = html; } else { tooltip.text(c.flag + ' ' + c.name + ' — ' + count); }
      } else if (c) {
        tooltip.text(c.flag + ' ' + c.name);
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
  const values = buildQuantizedValues(countries);
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
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const submWord = dict.statSubmissions || 'submissions';
  document.getElementById('modal-flag').textContent = countryInfo.flag;
  document.getElementById('modal-country').textContent = countryInfo.name;
  document.getElementById('modal-count').textContent = `${count} ${submWord}`;

  // Render all submissions for this country
  const subsEl = document.getElementById('modal-submissions');
  const subs = submissionsByCountry[code] || [];
  if (subsEl) {
    if (subs.length === 0) {
      subsEl.innerHTML = '<p style="color:#aaa;font-size:0.85rem;margin-top:16px;font-style:italic">No public messages from this country yet</p>';
    } else {
      subsEl.innerHTML = subs.map(s => {
        const msg = s.message.length > 120 ? s.message.substring(0, 120) + '…' : s.message;
        const translationHtml = s.message_en
          ? `<div class="modal-msg-translation">🌐 ${escapeHtml(s.message_en.length > 120 ? s.message_en.substring(0, 120) + '…' : s.message_en)}</div>`
          : '';
        return `<div class="modal-msg-card">
          <div class="modal-msg-text">&ldquo;${escapeHtml(msg)}&rdquo;</div>
          ${translationHtml}
          <div class="modal-msg-author">— ${escapeHtml(s.name)}</div>
        </div>`;
      }).join('');
    }
  }

  // Add "Explore in Photobook" button — links to photobook.html#country-XX
  const exploreLabel = dict.modalExploreBtn || 'Explore on Message Board →';
  const existingExploreBtn = modal.querySelector('.modal-explore-btn');
  if (existingExploreBtn) existingExploreBtn.remove();
  const exploreBtn = document.createElement('a');
  exploreBtn.href = `photobook.html#country-${code}`;
  exploreBtn.className = 'modal-explore-btn';
  exploreBtn.textContent = exploreLabel;
  modal.querySelector('.modal-card').appendChild(exploreBtn);

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
  const allEntries = Object.entries(countries)
    .map(([code, count]) => ({ code, count, info: COUNTRY_DATA[code] }))
    .filter(e => e.info)
    .sort((a, b) => b.count - a.count);
  const entries = allEntries.slice(0, 5);
  if (entries.length === 0) { container.innerHTML = ''; return; }
  const heading = dict.mapTopTitle || 'Top participating countries';
  const submWord = dict.statSubmissions || 'submissions';
  const medalEmoji = ['🏆', '🥈', '🥉'];
  const maxCount = entries[0].count;
  const allCountriesLabel = dict.allCountriesLabel || 'Participating Countries';
  // Put Australia and Thailand first in the chips list
  const priorityCodes = ['AU', 'TH'];
  const priorityEntries = priorityCodes.map(c => allEntries.find(e => e.code === c)).filter(Boolean);
  const restEntries = allEntries.filter(e => !priorityCodes.includes(e.code));
  const orderedEntries = [...priorityEntries, ...restEntries];
  const chipsHtml = orderedEntries.map(e =>
    `<a href="photobook.html#country-${e.code}" class="country-chip" title="${e.count} ${submWord}">${e.info.flag} ${e.info.name}</a>`
  ).join('');
  container.innerHTML = `<h3 class="top-countries-title">${heading}</h3>
    <div class="top-countries-list">${entries.map((e, i) => {
      const rankClass = i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : '';
      const medal = i < 3 ? `<span class="top-country-medal">${medalEmoji[i]}</span>` : '';
      const barPct = Math.round((e.count / maxCount) * 100);
      const barColor = i === 0 ? '#FFB300' : i === 1 ? '#90a4ae' : i === 2 ? '#d7a86e' : 'var(--gold)';
      return `
      <a href="photobook.html#country-${e.code}" class="top-country-item ${rankClass}">
        <div class="top-country-bar" style="width:${barPct}%;background:${barColor}"></div>
        ${medal}
        <span class="top-country-rank">#${i + 1}</span>
        <span class="top-country-flag">${e.info.flag}</span>
        <span class="top-country-name">${e.info.name}</span>
        <span class="top-country-count">${e.count} ${submWord}</span>
        <span class="top-country-arrow">→</span>
      </a>`;
    }).join('')}
    </div>
    <div class="all-countries-chips"><p class="all-countries-label">${allCountriesLabel}</p>${chipsHtml}</div>`;
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
  // Find the highest milestone reached
  const reached = MILESTONES.filter(n => data.count >= n);
  if (reached.length === 0) return;
  const highest = reached[reached.length - 1];
  // Show banner only once per session for this milestone
  const key = 'lbh_milestone_shown';
  if (sessionStorage.getItem(key) !== String(highest)) {
    sessionStorage.setItem(key, String(highest));
    showMilestoneBanner(highest);
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
      <button class="milestone-close" aria-label="Close">&times;</button>
      <div class="milestone-fire">${emoji}</div>
      <h3 class="milestone-title">${title}</h3>
      <p class="milestone-text">${text}</p>
    </div>
  `;
  banner.querySelector('.milestone-close').addEventListener('click', (e) => {
    e.stopPropagation();
    banner.classList.add('hide');
  });
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
