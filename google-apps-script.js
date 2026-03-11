// ============================================================
// Google Apps Script — LBH Fan Project Backend
// ============================================================
//
// 📋 SETUP INSTRUCTIONS:
//
// 1. Go to https://sheets.google.com → Create a new spreadsheet
//    Name it: "LBH Fan Project Submissions"
//
// 2. In Row 1, add these column headers (A through N):
//    A: timestamp
//    B: track
//    C: name
//    D: contact_info  (formatted: X:@handle | IG:@handle | TT:@handle | Email:addr)
//    E: country
//    F: country_other
//    G: profile_url
//    H: message
//    I: photo_url
//    J: custom_page_url
//    K: lbh_image_url
//    L: display_preference
//    M: message_en
//    N: language
//
// 3b. (Optional) For AI translation:
//     Project Settings → Script Properties → Add:
//     GEMINI_API_KEY = your key from https://aistudio.google.com/apikey
//
// 3. Go to Extensions → Apps Script
//    Delete the default code and paste this entire file
//
// 4. Click "Deploy" → "New deployment"
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    Click "Deploy" and copy the URL
//
// 5. Paste that URL into TWO places:
//    → form.js    → APPS_SCRIPT_URL (for form submission)
//    → app.js     → API_URL          (for live stats on main page)
//
// 6. IMPORTANT: Go to Google Drive and grant Apps Script
//    permission to access Drive (it will ask on first run).
//
// ============================================================

// --- Configuration ---
var CONFIG = {
  FOLDER_NAME: 'LBH Fan Project Uploads',
  CAP: 500,
  DEADLINE: '2026-03-10'
};

// ============================================================
// POST — Handle form submissions with file uploads
// ============================================================
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var folder = getOrCreateFolder(CONFIG.FOLDER_NAME);

    // Route edit requests to separate sheet tab — DISABLED
    // if (data.request_type === 'edit_request') {
    //   return handleEditRequest(data, folder);
    // }

    // Build filename prefix: 001_Name_@xaccount_TH_20260222-143000
    var rowNum = sheet.getLastRow(); // current last row = next submission number
    var seq = ('000' + rowNum).slice(-3); // zero-padded: 001, 002, ...
    var safeName = (data.name || 'unknown').replace(/[^a-zA-Z0-9가-힣ก-๙]/g, '').substring(0, 20);
    // Build contact tag for filename from contact value
    var contactTag = data.contact_value || '';
    var xTag = contactTag ? '_' + contactTag.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 30) : '';
    var country = data.country || 'XX';
    var now = new Date();
    var ts = Utilities.formatDate(now, 'Asia/Bangkok', 'yyyyMMdd-HHmmss');
    var prefix = seq + '_' + safeName + xTag + '_' + country + '_' + ts;

    // Save uploaded files to Google Drive
    var profileUrl = '';
    if (data.profile_base64) {
      var profExt = data.profile_ext || 'jpg';
      profileUrl = saveFileToDrive(
        folder,
        data.profile_base64,
        'profile_' + prefix + '.' + profExt,
        data.profile_mimetype || 'image/jpeg'
      );
    }

    var photoUrl = '';
    if (data.photo_base64) {
      var photoExt = data.photo_ext || 'jpg';
      photoUrl = saveFileToDrive(
        folder,
        data.photo_base64,
        'photo_' + prefix + '.' + photoExt,
        data.photo_mimetype || 'image/jpeg'
      );
    }

    var customUrl = '';
    if (data.custom_base64) {
      var customExt = data.custom_ext || 'png';
      customUrl = saveFileToDrive(
        folder,
        data.custom_base64,
        'custom_' + prefix + '.' + customExt,
        data.custom_mimetype || 'image/png'
      );
    }

    var lbhUrl = '';
    if (data.lbh_base64) {
      var lbhExt = data.lbh_ext || 'jpg';
      lbhUrl = saveFileToDrive(
        folder,
        data.lbh_base64,
        'lbh_' + prefix + '.' + lbhExt,
        data.lbh_mimetype || 'image/jpeg'
      );
    }

    // Build contact info string for column D
    var methodLabels = { x: 'X', ig: 'IG', tiktok: 'TT', email: 'Email' };
    var contactInfo = '';
    if (data.contact_value) {
      var label = methodLabels[data.contact_method] || data.contact_method || 'X';
      contactInfo = label + ':' + data.contact_value;
    }

    // Translate message to English (if not already English)
    var messageEn = '';
    var originalMsg = data.message || '';
    var msgLang = data.language || '';
    if (originalMsg && msgLang !== 'en') {
      messageEn = translateToEnglish(originalMsg);
    }

    // Append row to spreadsheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.track || '',
      data.name || '',
      contactInfo,
      data.country || '',
      data.country_other || '',
      profileUrl,
      originalMsg,
      photoUrl,
      customUrl,
      lbhUrl,
      data.display_preference || '',
      messageEn,
      data.language || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// EDIT REQUEST — Save to "Edit Requests" sheet tab — DISABLED
// ============================================================
/*
function handleEditRequest(data, folder) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var editSheet = ss.getSheetByName('Edit Requests');
    if (!editSheet) {
      editSheet = ss.insertSheet('Edit Requests');
      editSheet.appendRow([
        'Timestamp', 'Contact Info (original)',
        'New Message', 'New Photo URL',
        'Delete Original?', 'Notes', 'Status'
      ]);
      // Freeze header row
      editSheet.setFrozenRows(1);
    }

    // Save new photo to Drive if attached
    var newPhotoUrl = '';
    if (data.photo_base64) {
      var ext = data.photo_ext || 'jpg';
      newPhotoUrl = saveFileToDrive(
        folder,
        data.photo_base64,
        'editreq_' + new Date().getTime() + '.' + ext,
        data.photo_mimetype || 'image/jpeg'
      );
    }

    editSheet.appendRow([
      new Date().toISOString(),
      data.contact_info || '',
      data.new_message || '',
      newPhotoUrl,
      data.delete_original ? 'YES' : 'no',
      data.notes || '',
      'pending'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

// ============================================================
// GET — Serve stats OR submission data
// ============================================================
// Usage:
//   ?action=stats        → { count, cap, deadline, countries }  (default)
//   ?action=submissions  → { submissions: [...] }               (for photobook)
// ============================================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'stats';

    if (action === 'submissions') {
      return getSubmissions();
    }
    return getStats();

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        count: 0, cap: CONFIG.CAP, deadline: CONFIG.DEADLINE, countries: {}
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// --- Stats for live counters ---
function getStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1); // skip header

  var countries = {};
  rows.forEach(function (row) {
    var code = row[4]; // column E = country
    if (code && code !== 'OTHER') {
      countries[code] = (countries[code] || 0) + 1;
    } else if (code === 'OTHER') {
      countries['OTHER'] = (countries['OTHER'] || 0) + 1;
    }
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      count: rows.length,
      cap: CONFIG.CAP,
      deadline: CONFIG.DEADLINE,
      countries: countries
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// --- All public/anonymous submissions for the photobook ---
function getSubmissions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1);

  var submissions = [];
  rows.forEach(function (row) {
    var displayPref = row[11]; // column L

    // Only include public and anonymous submissions
    if (displayPref === 'public' || displayPref === 'anonymous') {
      submissions.push({
        track: row[1],
        name: displayPref === 'anonymous' ? 'Anonymous Fan' : row[2],
        contact_info: displayPref === 'anonymous' ? '' : row[3],
        country: row[4],
        country_other: row[5],
        profile_url: displayPref === 'anonymous' ? '' : row[6],
        message: row[7],
        photo_url: row[8],
        custom_page_url: row[9],
        lbh_image_url: row[10],
        display_preference: displayPref,
        message_en: row[12] || '',
        language: row[13] || ''
      });
    }
  });

  return ContentService
    .createTextOutput(JSON.stringify({ submissions: submissions }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// HELPERS — Google Drive file management
// ============================================================

// Find or create a folder in Google Drive
function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}

// ============================================================
// TRANSLATION — Gemini AI (free tier)
// ============================================================

/**
 * Translate a message to English using Gemini API.
 * If the message is already English, returns '' (empty).
 * If API key is missing or quota exceeded, returns '' silently.
 */
function translateToEnglish(text) {
  if (!text || !text.trim()) return '';

  try {
    var apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) return ''; // No key configured — skip translation

    var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;

    var payload = {
      contents: [{
        parts: [{
          text: 'You are a translator. Detect the language of this message. '
            + 'If it is already in English, reply with EXACTLY the word: ALREADY_ENGLISH\n'
            + 'If it is NOT English, translate it naturally to English. '
            + 'Keep the tone warm and personal (this is a fan message). '
            + 'Reply with ONLY the translation, nothing else.\n\n'
            + 'Message: ' + text
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500
      }
    };

    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(url, options);
    var code = response.getResponseCode();

    // Quota exceeded or error — fail silently
    if (code !== 200) return '';

    var json = JSON.parse(response.getContentText());
    var result = json.candidates[0].content.parts[0].text.trim();

    // If already English, no need to store translation
    if (result === 'ALREADY_ENGLISH') return '';

    return result;

  } catch (err) {
    // Any error — fail silently, submission still goes through
    return '';
  }
}

// ============================================================
// EXPORT — Organize submissions for Canva fanbook production
// Grouped by CONTINENT → COUNTRY with divider pages
// ============================================================
//
// 🖨️ HOW TO USE:
// 1. Open Apps Script editor
// 2. Select function: exportForCanva
// 3. Click ▶ Run  (may take a few minutes for ~300 submissions)
// 4. Check Google Drive → "LBH Fanbook Export" folder
//
// 📁 Output structure:
//    LBH Fanbook Export/
//    ├── 01_continent_covers.csv    ← Canva Bulk Create template 1
//    ├── 02_country_intros.csv      ← Canva Bulk Create template 2
//    ├── 03_track_a_submissions.csv ← Canva Bulk Create template 3
//    ├── 04_track_b_submissions.csv ← Canva Bulk Create template 4
//    ├── 05_Track_C_CustomPages/    ← Import directly as full pages
//    ├── images/                    ← All images organized
//    ├── page_order.txt             ← Master page sequence for the book
//    └── summary.txt
//
// 📖 Book structure:
//    🌏 ASIA  (continent cover page)
//      🇰🇷 South Korea — 45 messages  (country intro page)
//        Fan submission 1...
//        Fan submission 2...
//      🇯🇵 Japan — 12 messages  (country intro page)
//        ...
//    🌍 EUROPE  (continent cover page)
//      🇬🇧 United Kingdom — 8 messages
//        ...
//
// ============================================================

function exportForCanva() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1); // skip header

  // --- Create export folder structure ---
  var root = getOrCreateFolder('LBH Fanbook Export');
  // Clean up old content if re-running
  var oldFolders = root.getFolders();
  while (oldFolders.hasNext()) { oldFolders.next().setTrashed(true); }
  var oldFiles = root.getFiles();
  while (oldFiles.hasNext()) { oldFiles.next().setTrashed(true); }

  var imgFolder = root.createFolder('images');
  var folderC = root.createFolder('05_Track_C_CustomPages');

  // --- Country data: name, flag, continent ---
  var COUNTRY_DATA = getCountryData_();

  // Continent display order & emoji
  var CONTINENT_ORDER = [
    { key: 'Asia',          emoji: '🌏', subtitle: 'From East to West, United by Love' },
    { key: 'Europe',        emoji: '🌍', subtitle: 'Across Every Border, One Heart' },
    { key: 'North America', emoji: '🌎', subtitle: 'Coast to Coast, For Byung-hun' },
    { key: 'South America', emoji: '🌎', subtitle: 'Pasión sin Fronteras' },
    { key: 'Africa',        emoji: '🌍', subtitle: 'Ubuntu — We Are One' },
    { key: 'Oceania',       emoji: '🌏', subtitle: 'From the Pacific with Love' },
    { key: 'Other',         emoji: '🌐', subtitle: 'Fans Around the World' }
  ];

  // --- Parse all submissions ---
  var allEntries = [];
  rows.forEach(function(row, idx) {
    var track = (row[1] || '').toLowerCase().trim();
    var countryCode = row[4] || 'OTHER';
    var cd = COUNTRY_DATA[countryCode] || { name: row[5] || 'Other', flag: '🌍', continent: 'Other' };

    var trackLetter = 'A';
    if (track === 'c' || track === 'track c' || track === 'track_c') trackLetter = 'C';
    else if (track === 'b' || track === 'track b' || track === 'track_b') trackLetter = 'B';

    allEntries.push({
      row: idx + 2,
      track: trackLetter,
      name: row[2] || 'Fan',
      contact: row[3] || '',
      countryCode: countryCode,
      countryName: countryCode === 'OTHER' ? (row[5] || cd.name) : cd.name,
      flag: cd.flag,
      continent: cd.continent,
      profile_url: row[6] || '',
      message: row[7] || '',
      photo_url: row[8] || '',
      custom_url: row[9] || '',
      lbh_url: row[10] || '',
      display: row[11] || '',
      message_en: row[12] || '',
      language: row[13] || ''
    });
  });

  // --- Group by continent → country ---
  // Build: { continent: { country: [entries] } }
  var grouped = {};
  allEntries.forEach(function(e) {
    if (!grouped[e.continent]) grouped[e.continent] = {};
    if (!grouped[e.continent][e.countryName]) grouped[e.continent][e.countryName] = [];
    grouped[e.continent][e.countryName].push(e);
  });

  // --- Generate CSVs & page order ---
  var continentCsv = 'page_num,continent,emoji,subtitle,total_countries,total_submissions\n';
  var countryCsv = 'page_num,continent,country,flag,submission_count,track_a_count,track_b_count,track_c_count\n';
  var trackACsv = 'page_num,continent,country,flag,seq,name,message,message_en,language,profile_image,lbh_image\n';
  var trackBCsv = 'page_num,continent,country,flag,seq,name,message,message_en,language,profile_image,photo_image\n';
  var pageOrder = '';
  var pageNum = 0;
  var globalSeqA = 0, globalSeqB = 0, globalSeqC = 0;
  var totalA = 0, totalB = 0, totalC = 0;

  pageOrder += '╔══════════════════════════════════════════════════════════╗\n';
  pageOrder += '║   LEE BYUNG-HUN GLOBAL FAN PROJECT — FANBOOK 2026      ║\n';
  pageOrder += '║   Master Page Order                                     ║\n';
  pageOrder += '╚══════════════════════════════════════════════════════════╝\n\n';

  CONTINENT_ORDER.forEach(function(cont) {
    if (!grouped[cont.key]) return;
    var continentData = grouped[cont.key];

    // Sort countries: most submissions first
    var countries = Object.keys(continentData).sort(function(a, b) {
      return continentData[b].length - continentData[a].length;
    });

    var continentTotalSubs = 0;
    countries.forEach(function(c) { continentTotalSubs += continentData[c].length; });

    // === CONTINENT COVER PAGE ===
    pageNum++;
    continentCsv += pageNum + ',' + csvEscape(cont.key) + ',' +
      csvEscape(cont.emoji) + ',' + csvEscape(cont.subtitle) + ',' +
      countries.length + ',' + continentTotalSubs + '\n';

    pageOrder += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    pageOrder += 'P' + pad(pageNum) + '  ' + cont.emoji + ' ' + cont.key.toUpperCase() +
      '  [CONTINENT COVER]  (' + countries.length + ' countries, ' + continentTotalSubs + ' fans)\n';
    pageOrder += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    // === FOR EACH COUNTRY IN THIS CONTINENT ===
    countries.forEach(function(countryName) {
      var entries = continentData[countryName];
      var flag = entries[0].flag;
      var aCount = 0, bCount = 0, cCount = 0;
      entries.forEach(function(e) {
        if (e.track === 'A') aCount++;
        else if (e.track === 'B') bCount++;
        else cCount++;
      });

      // --- COUNTRY INTRO PAGE ---
      pageNum++;
      countryCsv += pageNum + ',' + csvEscape(cont.key) + ',' + csvEscape(countryName) + ',' +
        csvEscape(flag) + ',' + entries.length + ',' + aCount + ',' + bCount + ',' + cCount + '\n';

      pageOrder += '\n  P' + pad(pageNum) + '  ' + flag + ' ' + countryName +
        '  [COUNTRY INTRO]  (' + entries.length + ' messages)\n';
      pageOrder += '  ──────────────────────────────────────────────────\n';

      // --- SUBMISSION PAGES (sorted: A first, then B, then C) ---
      var sorted = entries.slice().sort(function(a, b) {
        var order = { A: 1, B: 2, C: 3 };
        return (order[a.track] || 9) - (order[b.track] || 9);
      });

      sorted.forEach(function(e) {
        pageNum++;
        if (e.track === 'A') {
          globalSeqA++; totalA++;
          var profFile = '';
          if (e.profile_url) {
            profFile = copyImageToFolder(e.profile_url, imgFolder, 'A' + pad(globalSeqA) + '_profile');
          }
          var lbhFile = '';
          if (e.lbh_url) {
            lbhFile = copyImageToFolder(e.lbh_url, imgFolder, 'A' + pad(globalSeqA) + '_lbh');
          }
          trackACsv += pageNum + ',' + csvEscape(cont.key) + ',' + csvEscape(countryName) + ',' +
            csvEscape(flag) + ',' + globalSeqA + ',' + csvEscape(e.name) + ',' +
            csvEscape(e.message) + ',' + csvEscape(e.message_en) + ',' +
            csvEscape(e.language) + ',' + csvEscape(profFile) + ',' + csvEscape(lbhFile) + '\n';
          pageOrder += '    P' + pad(pageNum) + '  [A] ' + e.name + '\n';

        } else if (e.track === 'B') {
          globalSeqB++; totalB++;
          var profFileB = '';
          if (e.profile_url) {
            profFileB = copyImageToFolder(e.profile_url, imgFolder, 'B' + pad(globalSeqB) + '_profile');
          }
          var photoFile = '';
          if (e.photo_url) {
            photoFile = copyImageToFolder(e.photo_url, imgFolder, 'B' + pad(globalSeqB) + '_photo');
          }
          trackBCsv += pageNum + ',' + csvEscape(cont.key) + ',' + csvEscape(countryName) + ',' +
            csvEscape(flag) + ',' + globalSeqB + ',' + csvEscape(e.name) + ',' +
            csvEscape(e.message) + ',' + csvEscape(e.message_en) + ',' +
            csvEscape(e.language) + ',' + csvEscape(profFileB) + ',' + csvEscape(photoFile) + '\n';
          pageOrder += '    P' + pad(pageNum) + '  [B] ' + e.name + ' 📷\n';

        } else { // Track C
          globalSeqC++; totalC++;
          if (e.custom_url) {
            var cName = 'C' + pad(globalSeqC) + '_' + countryName.replace(/[^a-zA-Z0-9]/g, '') + '_' + e.name.replace(/[^a-zA-Z0-9]/g, '');
            copyImageToFolder(e.custom_url, folderC, cName);
          }
          pageOrder += '    P' + pad(pageNum) + '  [C] ' + e.name + ' 🎨 (custom page)\n';
        }
      });
      pageOrder += '\n';
    });
    pageOrder += '\n';
  });

  // --- Save all CSVs ---
  root.createFile('01_continent_covers.csv', continentCsv, 'text/csv');
  root.createFile('02_country_intros.csv', countryCsv, 'text/csv');
  root.createFile('03_track_a_submissions.csv', trackACsv, 'text/csv');
  root.createFile('04_track_b_submissions.csv', trackBCsv, 'text/csv');
  root.createFile('page_order.txt', pageOrder, 'text/plain');

  // --- Summary ---
  var summary = '╔══════════════════════════════════════════════════════════╗\n';
  summary += '║        LBH FANBOOK EXPORT SUMMARY                       ║\n';
  summary += '║        Generated: ' + new Date().toISOString().slice(0,16) + '                  ║\n';
  summary += '╚══════════════════════════════════════════════════════════╝\n\n';
  summary += 'Total submissions:       ' + allEntries.length + '\n';
  summary += 'Track A (Text Only):     ' + totalA + '\n';
  summary += 'Track B (Photo+Message): ' + totalB + '\n';
  summary += 'Track C (Custom Page):   ' + totalC + '\n';
  summary += 'Total book pages:        ' + pageNum + '\n\n';
  summary += '── Continents ──────────────────────────────────────────\n';
  CONTINENT_ORDER.forEach(function(cont) {
    if (!grouped[cont.key]) return;
    var countries = Object.keys(grouped[cont.key]);
    var total = 0;
    countries.forEach(function(c) { total += grouped[cont.key][c].length; });
    summary += cont.emoji + ' ' + cont.key + ': ' + countries.length + ' countries, ' + total + ' fans\n';
  });
  summary += '\n── Canva Workflow ──────────────────────────────────────\n';
  summary += 'You need 4 Canva templates:\n\n';
  summary += '  Template 1: CONTINENT COVER\n';
  summary += '    → Bulk Create → upload 01_continent_covers.csv\n';
  summary += '    → Map: continent, emoji, subtitle, total_countries, total_submissions\n\n';
  summary += '  Template 2: COUNTRY INTRO\n';
  summary += '    → Bulk Create → upload 02_country_intros.csv\n';
  summary += '    → Map: country, flag, submission_count\n\n';
  summary += '  Template 3: TRACK A (text message)\n';
  summary += '    → Bulk Create → upload 03_track_a_submissions.csv\n';
  summary += '    → Map: name, message/message_en, flag, profile_image, lbh_image\n\n';
  summary += '  Template 4: TRACK B (photo + message)\n';
  summary += '    → Bulk Create → upload 04_track_b_submissions.csv\n';
  summary += '    → Map: name, message/message_en, flag, photo_image, profile_image\n\n';
  summary += '  Track C: Import images from 05_Track_C_CustomPages/ as full pages\n\n';
  summary += '── Assembly Order ──────────────────────────────────────\n';
  summary += 'See page_order.txt for the exact page sequence.\n';
  summary += 'After Bulk Create, reorder pages in Canva to match page_order.txt\n';
  root.createFile('summary.txt', summary, 'text/plain');

  Logger.log('✅ Export complete! ' + pageNum + ' pages total');
  Logger.log('A:' + totalA + ' B:' + totalB + ' C:' + totalC);
  Logger.log('Check Google Drive → "LBH Fanbook Export"');
}

// ── Country → Continent + Name + Flag mapping ──
function getCountryData_() {
  // continent: Asia, Europe, North America, South America, Africa, Oceania, Other
  return {
    // ── Asia ──
    AF:{name:'Afghanistan',flag:'🇦🇫',continent:'Asia'},
    AM:{name:'Armenia',flag:'🇦🇲',continent:'Asia'},
    AZ:{name:'Azerbaijan',flag:'🇦🇿',continent:'Asia'},
    BH:{name:'Bahrain',flag:'🇧🇭',continent:'Asia'},
    BD:{name:'Bangladesh',flag:'🇧🇩',continent:'Asia'},
    BT:{name:'Bhutan',flag:'🇧🇹',continent:'Asia'},
    BN:{name:'Brunei',flag:'🇧🇳',continent:'Asia'},
    KH:{name:'Cambodia',flag:'🇰🇭',continent:'Asia'},
    CN:{name:'China',flag:'🇨🇳',continent:'Asia'},
    GE:{name:'Georgia',flag:'🇬🇪',continent:'Asia'},
    HK:{name:'Hong Kong',flag:'🇭🇰',continent:'Asia'},
    IN:{name:'India',flag:'🇮🇳',continent:'Asia'},
    ID:{name:'Indonesia',flag:'🇮🇩',continent:'Asia'},
    IR:{name:'Iran',flag:'🇮🇷',continent:'Asia'},
    IQ:{name:'Iraq',flag:'🇮🇶',continent:'Asia'},
    IL:{name:'Israel',flag:'🇮🇱',continent:'Asia'},
    JP:{name:'Japan',flag:'🇯🇵',continent:'Asia'},
    JO:{name:'Jordan',flag:'🇯🇴',continent:'Asia'},
    KZ:{name:'Kazakhstan',flag:'🇰🇿',continent:'Asia'},
    KW:{name:'Kuwait',flag:'🇰🇼',continent:'Asia'},
    KG:{name:'Kyrgyzstan',flag:'🇰🇬',continent:'Asia'},
    LA:{name:'Laos',flag:'🇱🇦',continent:'Asia'},
    LB:{name:'Lebanon',flag:'🇱🇧',continent:'Asia'},
    MY:{name:'Malaysia',flag:'🇲🇾',continent:'Asia'},
    MV:{name:'Maldives',flag:'🇲🇻',continent:'Asia'},
    MN:{name:'Mongolia',flag:'🇲🇳',continent:'Asia'},
    MM:{name:'Myanmar',flag:'🇲🇲',continent:'Asia'},
    NP:{name:'Nepal',flag:'🇳🇵',continent:'Asia'},
    KP:{name:'North Korea',flag:'🇰🇵',continent:'Asia'},
    OM:{name:'Oman',flag:'🇴🇲',continent:'Asia'},
    PK:{name:'Pakistan',flag:'🇵🇰',continent:'Asia'},
    PS:{name:'Palestine',flag:'🇵🇸',continent:'Asia'},
    PH:{name:'Philippines',flag:'🇵🇭',continent:'Asia'},
    QA:{name:'Qatar',flag:'🇶🇦',continent:'Asia'},
    SA:{name:'Saudi Arabia',flag:'🇸🇦',continent:'Asia'},
    SG:{name:'Singapore',flag:'🇸🇬',continent:'Asia'},
    KR:{name:'South Korea',flag:'🇰🇷',continent:'Asia'},
    LK:{name:'Sri Lanka',flag:'🇱🇰',continent:'Asia'},
    SY:{name:'Syria',flag:'🇸🇾',continent:'Asia'},
    TW:{name:'Taiwan',flag:'🇹🇼',continent:'Asia'},
    TJ:{name:'Tajikistan',flag:'🇹🇯',continent:'Asia'},
    TH:{name:'Thailand',flag:'🇹🇭',continent:'Asia'},
    TL:{name:'Timor-Leste',flag:'🇹🇱',continent:'Asia'},
    TR:{name:'Türkiye',flag:'🇹🇷',continent:'Asia'},
    TM:{name:'Turkmenistan',flag:'🇹🇲',continent:'Asia'},
    AE:{name:'United Arab Emirates',flag:'🇦🇪',continent:'Asia'},
    UZ:{name:'Uzbekistan',flag:'🇺🇿',continent:'Asia'},
    VN:{name:'Vietnam',flag:'🇻🇳',continent:'Asia'},
    YE:{name:'Yemen',flag:'🇾🇪',continent:'Asia'},
    // ── Europe ──
    AL:{name:'Albania',flag:'🇦🇱',continent:'Europe'},
    AD:{name:'Andorra',flag:'🇦🇩',continent:'Europe'},
    AT:{name:'Austria',flag:'🇦🇹',continent:'Europe'},
    BY:{name:'Belarus',flag:'🇧🇾',continent:'Europe'},
    BE:{name:'Belgium',flag:'🇧🇪',continent:'Europe'},
    BA:{name:'Bosnia and Herzegovina',flag:'🇧🇦',continent:'Europe'},
    BG:{name:'Bulgaria',flag:'🇧🇬',continent:'Europe'},
    HR:{name:'Croatia',flag:'🇭🇷',continent:'Europe'},
    CZ:{name:'Czech Republic',flag:'🇨🇿',continent:'Europe'},
    DK:{name:'Denmark',flag:'🇩🇰',continent:'Europe'},
    EE:{name:'Estonia',flag:'🇪🇪',continent:'Europe'},
    FI:{name:'Finland',flag:'🇫🇮',continent:'Europe'},
    FR:{name:'France',flag:'🇫🇷',continent:'Europe'},
    DE:{name:'Germany',flag:'🇩🇪',continent:'Europe'},
    GR:{name:'Greece',flag:'🇬🇷',continent:'Europe'},
    HU:{name:'Hungary',flag:'🇭🇺',continent:'Europe'},
    IS:{name:'Iceland',flag:'🇮🇸',continent:'Europe'},
    IE:{name:'Ireland',flag:'🇮🇪',continent:'Europe'},
    IT:{name:'Italy',flag:'🇮🇹',continent:'Europe'},
    XK:{name:'Kosovo',flag:'🇽🇰',continent:'Europe'},
    LV:{name:'Latvia',flag:'🇱🇻',continent:'Europe'},
    LI:{name:'Liechtenstein',flag:'🇱🇮',continent:'Europe'},
    LT:{name:'Lithuania',flag:'🇱🇹',continent:'Europe'},
    LU:{name:'Luxembourg',flag:'🇱🇺',continent:'Europe'},
    MT:{name:'Malta',flag:'🇲🇹',continent:'Europe'},
    MD:{name:'Moldova',flag:'🇲🇩',continent:'Europe'},
    MC:{name:'Monaco',flag:'🇲🇨',continent:'Europe'},
    ME:{name:'Montenegro',flag:'🇲🇪',continent:'Europe'},
    NL:{name:'Netherlands',flag:'🇳🇱',continent:'Europe'},
    MK:{name:'North Macedonia',flag:'🇲🇰',continent:'Europe'},
    NO:{name:'Norway',flag:'🇳🇴',continent:'Europe'},
    PL:{name:'Poland',flag:'🇵🇱',continent:'Europe'},
    PT:{name:'Portugal',flag:'🇵🇹',continent:'Europe'},
    RO:{name:'Romania',flag:'🇷🇴',continent:'Europe'},
    RU:{name:'Russia',flag:'🇷🇺',continent:'Europe'},
    SM:{name:'San Marino',flag:'🇸🇲',continent:'Europe'},
    RS:{name:'Serbia',flag:'🇷🇸',continent:'Europe'},
    SK:{name:'Slovakia',flag:'🇸🇰',continent:'Europe'},
    SI:{name:'Slovenia',flag:'🇸🇮',continent:'Europe'},
    ES:{name:'Spain',flag:'🇪🇸',continent:'Europe'},
    SE:{name:'Sweden',flag:'🇸🇪',continent:'Europe'},
    CH:{name:'Switzerland',flag:'🇨🇭',continent:'Europe'},
    UA:{name:'Ukraine',flag:'🇺🇦',continent:'Europe'},
    GB:{name:'United Kingdom',flag:'🇬🇧',continent:'Europe'},
    VA:{name:'Vatican City',flag:'🇻🇦',continent:'Europe'},
    // ── North America ──
    AG:{name:'Antigua and Barbuda',flag:'🇦🇬',continent:'North America'},
    BS:{name:'Bahamas',flag:'🇧🇸',continent:'North America'},
    BB:{name:'Barbados',flag:'🇧🇧',continent:'North America'},
    BZ:{name:'Belize',flag:'🇧🇿',continent:'North America'},
    CA:{name:'Canada',flag:'🇨🇦',continent:'North America'},
    CR:{name:'Costa Rica',flag:'🇨🇷',continent:'North America'},
    CU:{name:'Cuba',flag:'🇨🇺',continent:'North America'},
    DM:{name:'Dominica',flag:'🇩🇲',continent:'North America'},
    DO:{name:'Dominican Republic',flag:'🇩🇴',continent:'North America'},
    SV:{name:'El Salvador',flag:'🇸🇻',continent:'North America'},
    GD:{name:'Grenada',flag:'🇬🇩',continent:'North America'},
    GT:{name:'Guatemala',flag:'🇬🇹',continent:'North America'},
    HT:{name:'Haiti',flag:'🇭🇹',continent:'North America'},
    HN:{name:'Honduras',flag:'🇭🇳',continent:'North America'},
    JM:{name:'Jamaica',flag:'🇯🇲',continent:'North America'},
    MX:{name:'Mexico',flag:'🇲🇽',continent:'North America'},
    NI:{name:'Nicaragua',flag:'🇳🇮',continent:'North America'},
    PA:{name:'Panama',flag:'🇵🇦',continent:'North America'},
    KN:{name:'Saint Kitts and Nevis',flag:'🇰🇳',continent:'North America'},
    LC:{name:'Saint Lucia',flag:'🇱🇨',continent:'North America'},
    VC:{name:'Saint Vincent',flag:'🇻🇨',continent:'North America'},
    TT:{name:'Trinidad and Tobago',flag:'🇹🇹',continent:'North America'},
    US:{name:'United States',flag:'🇺🇸',continent:'North America'},
    // ── South America ──
    AR:{name:'Argentina',flag:'🇦🇷',continent:'South America'},
    BO:{name:'Bolivia',flag:'🇧🇴',continent:'South America'},
    BR:{name:'Brazil',flag:'🇧🇷',continent:'South America'},
    CL:{name:'Chile',flag:'🇨🇱',continent:'South America'},
    CO:{name:'Colombia',flag:'🇨🇴',continent:'South America'},
    EC:{name:'Ecuador',flag:'🇪🇨',continent:'South America'},
    GY:{name:'Guyana',flag:'🇬🇾',continent:'South America'},
    PY:{name:'Paraguay',flag:'🇵🇾',continent:'South America'},
    PE:{name:'Peru',flag:'🇵🇪',continent:'South America'},
    SR:{name:'Suriname',flag:'🇸🇷',continent:'South America'},
    UY:{name:'Uruguay',flag:'🇺🇾',continent:'South America'},
    VE:{name:'Venezuela',flag:'🇻🇪',continent:'South America'},
    // ── Africa ──
    DZ:{name:'Algeria',flag:'🇩🇿',continent:'Africa'},
    AO:{name:'Angola',flag:'🇦🇴',continent:'Africa'},
    BJ:{name:'Benin',flag:'🇧🇯',continent:'Africa'},
    BW:{name:'Botswana',flag:'🇧🇼',continent:'Africa'},
    BF:{name:'Burkina Faso',flag:'🇧🇫',continent:'Africa'},
    BI:{name:'Burundi',flag:'🇧🇮',continent:'Africa'},
    CV:{name:'Cabo Verde',flag:'🇨🇻',continent:'Africa'},
    CM:{name:'Cameroon',flag:'🇨🇲',continent:'Africa'},
    CF:{name:'Central African Republic',flag:'🇨🇫',continent:'Africa'},
    TD:{name:'Chad',flag:'🇹🇩',continent:'Africa'},
    KM:{name:'Comoros',flag:'🇰🇲',continent:'Africa'},
    CG:{name:'Congo',flag:'🇨🇬',continent:'Africa'},
    CD:{name:'DR Congo',flag:'🇨🇩',continent:'Africa'},
    CI:{name:'Côte d\'Ivoire',flag:'🇨🇮',continent:'Africa'},
    DJ:{name:'Djibouti',flag:'🇩🇯',continent:'Africa'},
    EG:{name:'Egypt',flag:'🇪🇬',continent:'Africa'},
    GQ:{name:'Equatorial Guinea',flag:'🇬🇶',continent:'Africa'},
    ER:{name:'Eritrea',flag:'🇪🇷',continent:'Africa'},
    SZ:{name:'Eswatini',flag:'🇸🇿',continent:'Africa'},
    ET:{name:'Ethiopia',flag:'🇪🇹',continent:'Africa'},
    GA:{name:'Gabon',flag:'🇬🇦',continent:'Africa'},
    GM:{name:'Gambia',flag:'🇬🇲',continent:'Africa'},
    GH:{name:'Ghana',flag:'🇬🇭',continent:'Africa'},
    GN:{name:'Guinea',flag:'🇬🇳',continent:'Africa'},
    GW:{name:'Guinea-Bissau',flag:'🇬🇼',continent:'Africa'},
    KE:{name:'Kenya',flag:'🇰🇪',continent:'Africa'},
    LS:{name:'Lesotho',flag:'🇱🇸',continent:'Africa'},
    LR:{name:'Liberia',flag:'🇱🇷',continent:'Africa'},
    LY:{name:'Libya',flag:'🇱🇾',continent:'Africa'},
    MG:{name:'Madagascar',flag:'🇲🇬',continent:'Africa'},
    MW:{name:'Malawi',flag:'🇲🇼',continent:'Africa'},
    ML:{name:'Mali',flag:'🇲🇱',continent:'Africa'},
    MR:{name:'Mauritania',flag:'🇲🇷',continent:'Africa'},
    MU:{name:'Mauritius',flag:'🇲🇺',continent:'Africa'},
    MA:{name:'Morocco',flag:'🇲🇦',continent:'Africa'},
    MZ:{name:'Mozambique',flag:'🇲🇿',continent:'Africa'},
    NA:{name:'Namibia',flag:'🇳🇦',continent:'Africa'},
    NE:{name:'Niger',flag:'🇳🇪',continent:'Africa'},
    NG:{name:'Nigeria',flag:'🇳🇬',continent:'Africa'},
    RW:{name:'Rwanda',flag:'🇷🇼',continent:'Africa'},
    ST:{name:'São Tomé and Príncipe',flag:'🇸🇹',continent:'Africa'},
    SN:{name:'Senegal',flag:'🇸🇳',continent:'Africa'},
    SL:{name:'Sierra Leone',flag:'🇸🇱',continent:'Africa'},
    SO:{name:'Somalia',flag:'🇸🇴',continent:'Africa'},
    ZA:{name:'South Africa',flag:'🇿🇦',continent:'Africa'},
    SS:{name:'South Sudan',flag:'🇸🇸',continent:'Africa'},
    SD:{name:'Sudan',flag:'🇸🇩',continent:'Africa'},
    TZ:{name:'Tanzania',flag:'🇹🇿',continent:'Africa'},
    TG:{name:'Togo',flag:'🇹🇬',continent:'Africa'},
    TN:{name:'Tunisia',flag:'🇹🇳',continent:'Africa'},
    UG:{name:'Uganda',flag:'🇺🇬',continent:'Africa'},
    ZM:{name:'Zambia',flag:'🇿🇲',continent:'Africa'},
    ZW:{name:'Zimbabwe',flag:'🇿🇼',continent:'Africa'},
    // ── Oceania ──
    AU:{name:'Australia',flag:'🇦🇺',continent:'Oceania'},
    FJ:{name:'Fiji',flag:'🇫🇯',continent:'Oceania'},
    KI:{name:'Kiribati',flag:'🇰🇮',continent:'Oceania'},
    MH:{name:'Marshall Islands',flag:'🇲🇭',continent:'Oceania'},
    FM:{name:'Micronesia',flag:'🇫🇲',continent:'Oceania'},
    NR:{name:'Nauru',flag:'🇳🇷',continent:'Oceania'},
    NZ:{name:'New Zealand',flag:'🇳🇿',continent:'Oceania'},
    PW:{name:'Palau',flag:'🇵🇼',continent:'Oceania'},
    PG:{name:'Papua New Guinea',flag:'🇵🇬',continent:'Oceania'},
    WS:{name:'Samoa',flag:'🇼🇸',continent:'Oceania'},
    SB:{name:'Solomon Islands',flag:'🇸🇧',continent:'Oceania'},
    TO:{name:'Tonga',flag:'🇹🇴',continent:'Oceania'},
    TV:{name:'Tuvalu',flag:'🇹🇻',continent:'Oceania'},
    VU:{name:'Vanuatu',flag:'🇻🇺',continent:'Oceania'},
    // ── Fallback ──
    OTHER:{name:'Other',flag:'🌍',continent:'Other'}
  };
}

// Helper: pad number to 3 digits
function pad(n) {
  return ('000' + n).slice(-3);
}

// Helper: escape CSV field
function csvEscape(val) {
  if (!val) return '';
  val = String(val);
  if (val.indexOf(',') >= 0 || val.indexOf('"') >= 0 || val.indexOf('\n') >= 0) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

// Helper: copy an image from URL to a folder, return filename
function copyImageToFolder(url, folder, baseName) {
  try {
    if (!url) return '';
    // Extract file ID from various Google URL formats
    var fileId = '';
    var m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m) {
      fileId = m[1];
    } else {
      m = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (m) fileId = m[1];
    }
    if (!fileId) return '';

    var file = DriveApp.getFileById(fileId);
    var ext = file.getName().split('.').pop() || 'jpg';
    var newName = baseName + '.' + ext;
    file.makeCopy(newName, folder);
    return newName;
  } catch (err) {
    Logger.log('⚠️ Could not copy image: ' + url + ' — ' + err.toString());
    return '';
  }
}

// Save a base64-encoded file to Google Drive and return the public URL
function saveFileToDrive(folder, base64Data, filename, mimeType) {
  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, filename);
  var file = folder.createFile(blob);

  // Make publicly viewable via link
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Return a direct-serving URL
  return 'https://lh3.googleusercontent.com/d/' + file.getId();
}
