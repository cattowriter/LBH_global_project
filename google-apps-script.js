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
//   ?action=stats            → { count, cap, deadline, countries }  (default)
//   ?action=submissions      → { submissions: [...] }               (public only)
//   ?action=all&key=SECRET   → { submissions: [...] }               (ALL including private, for admin)
// ============================================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'stats';

    if (action === 'all') {
      var key = (e && e.parameter && e.parameter.key) || '';
      var secret = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY') || 'lbh2026admin';
      if (key !== secret) {
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'unauthorized' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      return getAllSubmissions();
    }
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

// --- ALL submissions (admin only, including private) ---
function getAllSubmissions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1);

  var submissions = [];
  rows.forEach(function (row) {
    var displayPref = row[11] || '';
    submissions.push({
      track: row[1],
      name: displayPref === 'anonymous' ? 'Anonymous Fan' : (row[2] || 'Fan'),
      contact_info: row[3] || '',
      country: row[4],
      country_other: row[5],
      profile_url: row[6] || '',
      message: row[7],
      photo_url: row[8],
      custom_page_url: row[9],
      lbh_image_url: row[10],
      display_preference: displayPref,
      message_en: row[12] || '',
      language: row[13] || ''
    });
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

  // --- Country data: name, flag, continent ---
  var COUNTRY_DATA = getCountryData_();

  // Continent display order & emoji
  var CONTINENT_ORDER = [
    { key: 'Oceania',       emoji: '🌏', subtitle: 'From the Pacific with Love' },
    { key: 'Asia',          emoji: '🌏', subtitle: 'From East to West, United by Love' },
    { key: 'Europe',        emoji: '🌍', subtitle: 'Across Every Border, One Heart' },
    { key: 'North America', emoji: '🌎', subtitle: 'Coast to Coast, For Byung-hun' },
    { key: 'South America', emoji: '🌎', subtitle: 'Pasión sin Fronteras' },
    { key: 'Africa',        emoji: '🌍', subtitle: 'Ubuntu — We Are One' },
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

  // --- Group by continent → countryCode ---
  var grouped = {};
  allEntries.forEach(function(e) {
    if (!grouped[e.continent]) grouped[e.continent] = {};
    if (!grouped[e.continent][e.countryCode]) grouped[e.continent][e.countryCode] = [];
    grouped[e.continent][e.countryCode].push(e);
  });

  // --- Generate CSVs & page order ---
  var continentCsv = 'page_num,continent,emoji,subtitle,total_countries,total_submissions\n';
  var countryCsv = 'page_num,continent,country,flag,submission_count,track_a_count,track_b_count,track_c_count\n';
  var trackACsv = 'page_num,continent,country,flag,seq,name,contact,display_message,language,profile_image,lbh_image\n';
  var trackBCsv = 'page_num,continent,country,flag,seq,name,contact,display_message,language,profile_image,photo_image\n';
  var pageOrder = '';
  var pageNum = 0;
  var globalSeqA = 0, globalSeqB = 0, globalSeqC = 0;
  var totalA = 0, totalB = 0, totalC = 0;
  var imageMap = [];

  pageOrder += '╔══════════════════════════════════════════════════════════╗\n';
  pageOrder += '║   LEE BYUNG-HUN GLOBAL FAN PROJECT — FANBOOK 2026      ║\n';
  pageOrder += '║   Master Page Order                                     ║\n';
  pageOrder += '╚══════════════════════════════════════════════════════════╝\n\n';

  CONTINENT_ORDER.forEach(function(cont) {
    if (!grouped[cont.key]) return;
    var continentData = grouped[cont.key];

    // Sort countries: Thailand first in Asia, then most submissions first
    var countries = Object.keys(continentData).sort(function(a, b) {
      if (cont.key === 'Asia') {
        if (a === 'TH') return -1;
        if (b === 'TH') return 1;
      }
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
    countries.forEach(function(code) {
      var entries = continentData[code];
      var cd = COUNTRY_DATA[code] || { name: code, flag: '🌍' };
      var countryName = cd.name;
      var flag = entries[0].flag || cd.flag;
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
          var dispMsgA = e.message || '';
          if (e.message_en && e.language && e.language.toLowerCase() !== 'english' && e.language.toLowerCase() !== 'en') {
            dispMsgA += '\n\n' + e.message_en;
          }
          var imgBaseA = 'A' + pad(globalSeqA) + '_' + e.countryCode + '_' + e.name.replace(/[^a-zA-Z0-9가-힣ก-๙]/g, '').substring(0, 20);
          var profFileA = e.profile_url ? imgBaseA + '_profile.jpg' : '';
          var lbhFileA = e.lbh_url ? imgBaseA + '_lbh.jpg' : '';
          if (e.profile_url) imageMap.push({url: e.profile_url, name: profFileA});
          if (e.lbh_url) imageMap.push({url: e.lbh_url, name: lbhFileA});
          trackACsv += pageNum + ',' + csvEscape(cont.key) + ',' + csvEscape(countryName) + ',' +
            csvEscape(flag) + ',' + globalSeqA + ',' + csvEscape(e.name) + ',' +
            csvEscape(maskEmail(e.contact)) + ',' +
            csvEscape(dispMsgA) + ',' +
            csvEscape(e.language) + ',' + csvEscape(profFileA) + ',' + csvEscape(lbhFileA) + '\n';
          pageOrder += '    P' + pad(pageNum) + '  [A] ' + e.name + '\n';

        } else if (e.track === 'B') {
          globalSeqB++; totalB++;
          var dispMsgB = e.message || '';
          if (e.message_en && e.language && e.language.toLowerCase() !== 'english' && e.language.toLowerCase() !== 'en') {
            dispMsgB += '\n\n' + e.message_en;
          }
          var imgBaseB = 'B' + pad(globalSeqB) + '_' + e.countryCode + '_' + e.name.replace(/[^a-zA-Z0-9가-힣ก-๙]/g, '').substring(0, 20);
          var profFileB = e.profile_url ? imgBaseB + '_profile.jpg' : '';
          var photoFileB = e.photo_url ? imgBaseB + '_photo.jpg' : '';
          if (e.profile_url) imageMap.push({url: e.profile_url, name: profFileB});
          if (e.photo_url) imageMap.push({url: e.photo_url, name: photoFileB});
          trackBCsv += pageNum + ',' + csvEscape(cont.key) + ',' + csvEscape(countryName) + ',' +
            csvEscape(flag) + ',' + globalSeqB + ',' + csvEscape(e.name) + ',' +
            csvEscape(maskEmail(e.contact)) + ',' +
            csvEscape(dispMsgB) + ',' +
            csvEscape(e.language) + ',' + csvEscape(profFileB) + ',' + csvEscape(photoFileB) + '\n';
          pageOrder += '    P' + pad(pageNum) + '  [B] ' + e.name + ' 📷\n';

        } else { // Track C
          globalSeqC++; totalC++;
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
  root.createFile('_image_map.json', JSON.stringify(imageMap), 'application/json');
  root.createFolder('images');
  PropertiesService.getScriptProperties().setProperty('EXPORT_IMG_IDX', '0');

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
  summary += '    → Upload images from images/ folder to Canva Uploads first\n';
  summary += '    → Bulk Create → upload 03_track_a_submissions.csv\n';
  summary += '    → Text: name, contact, display_message, flag\n';
  summary += '    → Image frames: profile_image, lbh_image (match filenames)\n\n';
  summary += '  Template 4: TRACK B (photo + message)\n';
  summary += '    → Upload images from images/ folder to Canva Uploads first\n';
  summary += '    → Bulk Create → upload 04_track_b_submissions.csv\n';
  summary += '    → Text: name, contact, display_message, flag\n';
  summary += '    → Image frames: profile_image, photo_image (match filenames)\n\n';
  summary += '  STEP: Run exportImages() to copy all image files\n';
  summary += '  Track C: Run exportTrackC() separately to copy custom pages\n\n';
  summary += '── Assembly Order ──────────────────────────────────────\n';
  summary += 'See page_order.txt for the exact page sequence.\n';
  summary += 'After Bulk Create, reorder pages in Canva to match page_order.txt\n';
  root.createFile('summary.txt', summary, 'text/plain');

  Logger.log('✅ Export complete! ' + pageNum + ' pages total');
  Logger.log('A:' + totalA + ' B:' + totalB + ' C:' + totalC);
  Logger.log('📸 ' + imageMap.length + ' images to copy — run exportImages() next');
  Logger.log('💡 Run exportImages() repeatedly until all images are copied.');
  Logger.log('💡 Then run exportTrackC() for Track C custom pages.');
}

// ============================================================
// EXPORT Track C — Copy custom page images (separate to avoid timeout)
// ============================================================
// Run this AFTER exportForCanva() completes.
// Copies Track C custom page images into the export folder.
// ============================================================
function exportTrackC() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1);

  var root = getOrCreateFolder('LBH Fanbook Export');
  // Create or reuse Track C folder
  var folderC;
  var subFolders = root.getFoldersByName('05_Track_C_CustomPages');
  if (subFolders.hasNext()) {
    folderC = subFolders.next();
  } else {
    folderC = root.createFolder('05_Track_C_CustomPages');
  }

  var copied = 0, skipped = 0;
  rows.forEach(function(row, idx) {
    var track = (row[1] || '').toLowerCase().trim();
    if (track !== 'c' && track !== 'track c' && track !== 'track_c') return;

    var customUrl = row[9] || '';
    if (!customUrl) { skipped++; return; }

    var countryCode = row[4] || 'OTHER';
    var name = row[2] || 'Fan';

    var seq = ('000' + (copied + 1)).slice(-3);
    var cName = 'C' + seq + '_' + countryCode + '_' + name.replace(/[^a-zA-Z0-9가-힣ก-๙]/g, '').substring(0, 20);
    var result = copyImageToFolder(customUrl, folderC, cName);
    if (result) { copied++; } else { skipped++; }
  });

  Logger.log('✅ Track C export done! Copied: ' + copied + ', Skipped: ' + skipped);
  Logger.log('Check Google Drive → "LBH Fanbook Export" → "05_Track_C_CustomPages"');
}

// ============================================================
// EXPORT IMAGES — Copy images in batches (run multiple times)
// ============================================================
// Run AFTER exportForCanva(). Copies ~80 images per run.
// Check the log — if images remain, run again.
// ============================================================
function exportImages() {
  var root = getOrCreateFolder('LBH Fanbook Export');

  var mapFiles = root.getFilesByName('_image_map.json');
  if (!mapFiles.hasNext()) {
    Logger.log('❌ Run exportForCanva() first!');
    return;
  }
  var imageMap = JSON.parse(mapFiles.next().getBlob().getDataAsString());
  if (imageMap.length === 0) {
    Logger.log('✅ No images to copy.');
    return;
  }

  var imgFolder;
  var sub = root.getFoldersByName('images');
  if (sub.hasNext()) { imgFolder = sub.next(); }
  else { imgFolder = root.createFolder('images'); }

  var props = PropertiesService.getScriptProperties();
  var startIdx = parseInt(props.getProperty('EXPORT_IMG_IDX') || '0');

  if (startIdx >= imageMap.length) {
    Logger.log('✅ All ' + imageMap.length + ' images already copied!');
    return;
  }

  var BATCH = 80;
  var endIdx = Math.min(startIdx + BATCH, imageMap.length);
  var copied = 0, failed = 0;

  Logger.log('📋 imageMap has ' + imageMap.length + ' entries, processing ' + startIdx + '–' + (endIdx - 1));
  if (imageMap.length > 0) {
    Logger.log('🔍 Sample URL: ' + imageMap[startIdx].url);
  }

  for (var i = startIdx; i < endIdx; i++) {
    var item = imageMap[i];
    try {
      var fileId = '';
      var m = item.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (m) { fileId = m[1]; }
      else {
        m = item.url.match(/id=([a-zA-Z0-9_-]+)/);
        if (m) fileId = m[1];
      }
      if (!fileId) {
        Logger.log('❌ No fileId from URL: ' + item.url);
        failed++;
        continue;
      }
      DriveApp.getFileById(fileId).makeCopy(item.name, imgFolder);
      copied++;
    } catch(err) {
      Logger.log('⚠️ Skip: ' + item.name + ' (id:' + fileId + ') — ' + err.toString());
      failed++;
    }
  }

  props.setProperty('EXPORT_IMG_IDX', String(endIdx));
  var remaining = imageMap.length - endIdx;
  Logger.log('── Batch ' + Math.ceil(endIdx/BATCH) + ' complete ──');
  Logger.log('Copied: ' + copied + ' | Failed: ' + failed);
  Logger.log('Progress: ' + endIdx + '/' + imageMap.length + ' (' + Math.round(endIdx/imageMap.length*100) + '%)');
  if (remaining > 0) {
    Logger.log('⚠️ ' + remaining + ' images remaining — run exportImages() again');
  } else {
    Logger.log('✅ All images copied! Check Drive → LBH Fanbook Export → images');
  }
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

// Helper: mask email addresses (e.g. Email:john@gmail.com → Email:jo***@gmail.com)
function maskEmail(contact) {
  if (!contact) return '';
  contact = String(contact);
  // Only mask if contact method is Email
  if (contact.indexOf('Email:') !== 0) return contact;
  var emailPart = contact.substring(6); // strip "Email:"
  var m = emailPart.match(/^([^@]{1,2})([^@]*)@(.+)$/);
  if (m) {
    return 'Email:' + m[1] + '***@' + m[3];
  }
  return contact;
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

// ============================================================
// EXPORT TO GOOGLE SLIDES — Auto-generate fanbook presentation
// ============================================================
//
// SETUP: Enable the Google Slides Advanced Service:
//   Apps Script Editor → Services → + → Google Slides API → Add
//
// HOW TO USE:
//   1. Select function: exportToSlides
//   2. Click Run
//   3. Check Google Drive → "LBH Fanbook Slides" presentation
//   4. Download as .pptx → Import to Canva for Canva Print
//
// Page size: 2400×2400px (576×576pt) square format
// Layout: Continent cover → Country intro →
//   Track B (2/page) → Track A with image (3/page) →
//   Track A text-only (4/page) → Track C (1/page)
// ============================================================

function exportToSlides() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1);

  var COUNTRY_DATA = getCountryData_();
  var CONTINENT_ORDER = [
    { key: 'Oceania',       emoji: '🌏', subtitle: 'From the Pacific with Love' },
    { key: 'Asia',          emoji: '🌏', subtitle: 'From East to West, United by Love' },
    { key: 'Europe',        emoji: '🌍', subtitle: 'Across Every Border, One Heart' },
    { key: 'North America', emoji: '🌎', subtitle: 'Coast to Coast, For Byung-hun' },
    { key: 'South America', emoji: '🌎', subtitle: 'Pasión sin Fronteras' },
    { key: 'Africa',        emoji: '🌍', subtitle: 'Ubuntu — We Are One' },
    { key: 'Other',         emoji: '🌐', subtitle: 'Fans Around the World' }
  ];

  // --- Parse submissions ---
  var allEntries = [];
  rows.forEach(function(row) {
    var track = (row[1] || '').toLowerCase().trim();
    var countryCode = row[4] || 'OTHER';
    var cd = COUNTRY_DATA[countryCode] || { name: row[5] || 'Other', flag: '🌍', continent: 'Other' };
    var displayPref = row[11] || '';

    var trackLetter = 'A';
    if (track === 'c' || track === 'track c' || track === 'track_c') trackLetter = 'C';
    else if (track === 'b' || track === 'track b' || track === 'track_b') trackLetter = 'B';

    // anonymous → ซ่อนชื่อ, แต่ไม่ข้ามใคร (รวม private ด้วย เพราะทำหนังสือ)
    var name = displayPref === 'anonymous' ? 'Anonymous Fan' : (row[2] || 'Fan');
    var profileUrl = (row[6] || '');

    allEntries.push({
      track: trackLetter,
      name: name,
      countryCode: countryCode,
      countryName: countryCode === 'OTHER' ? (row[5] || cd.name) : cd.name,
      flag: cd.flag,
      continent: cd.continent,
      profile_url: profileUrl,
      contact_info: row[3] || '',
      message: row[7] || '',
      photo_url: row[8] || '',
      custom_url: row[9] || '',
      lbh_url: row[10] || '',
      message_en: row[12] || '',
      language: row[13] || ''
    });
  });

  // --- Group by continent → country ---
  var grouped = {};
  allEntries.forEach(function(e) {
    if (!grouped[e.continent]) grouped[e.continent] = {};
    if (!grouped[e.continent][e.countryCode]) grouped[e.continent][e.countryCode] = [];
    grouped[e.continent][e.countryCode].push(e);
  });

  // --- Create presentation with custom page size (576×576pt = 2400×2400px) ---
  var PAGE_W = 576; // points
  var PAGE_H = 576;
  var EMU_PER_PT = 12700;
  var W_EMU = PAGE_W * EMU_PER_PT; // 7315200
  var H_EMU = PAGE_H * EMU_PER_PT;

  var presentation = Slides.Presentations.create({
    title: 'LBH Global Fanbook 2026',
    pageSize: {
      width:  { magnitude: W_EMU, unit: 'EMU' },
      height: { magnitude: H_EMU, unit: 'EMU' }
    }
  });
  var presId = presentation.presentationId;

  // Remove the default blank slide
  var defaultSlides = presentation.slides;
  if (defaultSlides && defaultSlides.length > 0) {
    Slides.Presentations.batchUpdate({ requests: [
      { deleteObject: { objectId: defaultSlides[0].objectId } }
    ] }, presId);
  }

  // --- Helper: batch requests buffer ---
  var requests = [];
  var slideIndex = 0;

  var flushCount = 0;
  function flushRequests(force) {
    // Only flush when we have 200+ requests queued, or when forced
    if (!force && requests.length < 200) return;
    if (requests.length === 0) return;
    while (requests.length > 0) {
      var chunk = requests.splice(0, 500);
      Slides.Presentations.batchUpdate({ requests: chunk }, presId);
      flushCount++;
      // Throttle: pause 3s after every batch to respect "Write requests per minute" quota
      Utilities.sleep(3000);
    }
  }

  function newSlideId() {
    return 'slide_' + slideIndex;
  }

  function addSlide() {
    var id = newSlideId();
    requests.push({
      createSlide: {
        objectId: id,
        insertionIndex: slideIndex
      }
    });
    slideIndex++;
    return id;
  }

  function ptToEmu(pt) { return Math.round(pt * EMU_PER_PT); }

  var txtSeq = 0;
  function addTextBox(slideId, text, leftPt, topPt, widthPt, heightPt, fontSize, bold, alignment, fontColor) {
    txtSeq++;
    var boxId = slideId + '_txt_' + txtSeq;
    var safeText = (text || '').toString();
    requests.push({
      createShape: {
        objectId: boxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: { width: { magnitude: ptToEmu(widthPt), unit: 'EMU' }, height: { magnitude: ptToEmu(heightPt), unit: 'EMU' } },
          transform: {
            scaleX: 1, scaleY: 1, translateX: ptToEmu(leftPt), translateY: ptToEmu(topPt), unit: 'EMU'
          }
        }
      }
    });
    // Skip text insert and styling if text is empty
    if (!safeText) return boxId;
    requests.push({
      insertText: { objectId: boxId, text: safeText, insertionIndex: 0 }
    });
    var style = { fontSize: { magnitude: fontSize, unit: 'PT' } };
    if (bold) style.bold = true;
    if (fontColor) {
      style.foregroundColor = {
        opaqueColor: { rgbColor: fontColor }
      };
    }
    requests.push({
      updateTextStyle: {
        objectId: boxId,
        style: style,
        fields: 'fontSize' + (bold ? ',bold' : '') + (fontColor ? ',foregroundColor' : ''),
        textRange: { type: 'ALL' }
      }
    });
    if (alignment) {
      requests.push({
        updateParagraphStyle: {
          objectId: boxId,
          style: { alignment: alignment },
          fields: 'alignment',
          textRange: { type: 'ALL' }
        }
      });
    }
    return boxId;
  }

  var imgSeq = 0;
  function addImage(slideId, imageUrl, leftPt, topPt, widthPt, heightPt) {
    imgSeq++;
    var imgId = slideId + '_img_' + imgSeq;
    requests.push({
      createImage: {
        objectId: imgId,
        url: imageUrl,
        elementProperties: {
          pageObjectId: slideId,
          size: { width: { magnitude: ptToEmu(widthPt), unit: 'EMU' }, height: { magnitude: ptToEmu(heightPt), unit: 'EMU' } },
          transform: {
            scaleX: 1, scaleY: 1, translateX: ptToEmu(leftPt), translateY: ptToEmu(topPt), unit: 'EMU'
          }
        }
      }
    });
    return imgId;
  }

  // Profile image with circular crop effect
  // Google Slides API: insert image, then crop to square + add outline ring
  var circleSeq = 0;
  function addProfileImage(slideId, imageUrl, leftPt, topPt, sizePt) {
    circleSeq++;
    var imgId = slideId + '_prof_' + circleSeq;
    // Insert image
    requests.push({
      createImage: {
        objectId: imgId,
        url: imageUrl,
        elementProperties: {
          pageObjectId: slideId,
          size: { width: { magnitude: ptToEmu(sizePt), unit: 'EMU' }, height: { magnitude: ptToEmu(sizePt), unit: 'EMU' } },
          transform: {
            scaleX: 1, scaleY: 1, translateX: ptToEmu(leftPt), translateY: ptToEmu(topPt), unit: 'EMU'
          }
        }
      }
    });
    // Crop image to square (center crop) and add outline
    requests.push({
      updateImageProperties: {
        objectId: imgId,
        imageProperties: {
          cropProperties: {
            leftOffset: 0, rightOffset: 0, topOffset: 0, bottomOffset: 0
          },
          outline: {
            outlineFill: {
              solidFill: { color: { rgbColor: { red: 0.85, green: 0.82, blue: 0.78 } }, alpha: 1 }
            },
            weight: { magnitude: 2, unit: 'PT' },
            propertyState: 'RENDERED'
          }
        },
        fields: 'cropProperties,outline'
      }
    });
    return imgId;
  }

  function addSolidBg(slideId, r, g, b) {
    requests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: { color: { rgbColor: { red: r, green: g, blue: b } } }
          }
        },
        fields: 'pageBackgroundFill'
      }
    });
  }

  // --- Helper: extract Drive image URL for Slides API ---
  function getDriveImageUrl(url) {
    if (!url) return null;
    var m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!m) {
      m = url.match(/id=([a-zA-Z0-9_-]+)/);
    }
    if (!m) return null;
    var fileId = m[1];
    // Use the direct export URL that Slides API can access
    return 'https://lh3.googleusercontent.com/d/' + fileId;
  }

  // --- Build display message (original + translation) ---
  function buildDisplayMsg(e, maxChars) {
    maxChars = maxChars || 600;
    var msg = String(e.message || '').substring(0, maxChars);
    var lang = String(e.language || '').toLowerCase();
    var isEn = lang === 'english' || lang === 'en';
    var msgEn = String(e.message_en || '');
    if (msgEn.trim() && msgEn.trim() !== String(e.message || '').trim() && !isEn) {
      var trans = msgEn.substring(0, Math.max(300, maxChars - msg.length - 5));
      msg += '\n(' + trans + ')';
    }
    return msg;
  }

  // --- Mask email: jo***@gmail.com ---
  function maskEmail(email) {
    var at = email.indexOf('@');
    if (at <= 2) return email.charAt(0) + '***' + email.substring(at);
    return email.substring(0, 2) + '***' + email.substring(at);
  }

  // --- Format contact info: TikTok label, email masking ---
  function formatContact(contactInfo) {
    if (!contactInfo) return '';
    var parts = contactInfo.split('|');
    var formatted = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].trim();
      if (!p) continue;
      var m = p.match(/^(X|IG|TT|Email|FB|YT|TikTok|Instagram|Twitter|Facebook|YouTube)\s*[:：]\s*(.+)$/i);
      if (!m) { formatted.push(p); continue; }
      var label = m[1].toUpperCase();
      var val = m[2].trim();
      if (label === 'X' || label === 'TWITTER') formatted.push('X: ' + val);
      else if (label === 'IG' || label === 'INSTAGRAM') formatted.push('IG: ' + val);
      else if (label === 'TT' || label === 'TIKTOK') formatted.push('TikTok: ' + val);
      else if (label === 'EMAIL') formatted.push('Email: ' + maskEmail(val));
      else if (label === 'FB' || label === 'FACEBOOK') formatted.push('FB: ' + val);
      else if (label === 'YT' || label === 'YOUTUBE') formatted.push('YT: ' + val);
      else formatted.push(p);
    }
    return formatted.join(' · ');
  }

  // Colors
  var WHITE = { red: 1, green: 1, blue: 1 };
  var DARK = { red: 0.15, green: 0.15, blue: 0.15 };

  // ========== GENERATE SLIDES ==========
  var slideCount = 0;

  CONTINENT_ORDER.forEach(function(cont) {
    if (!grouped[cont.key]) return;
    var continentData = grouped[cont.key];

    var countries = Object.keys(continentData).sort(function(a, b) {
      if (cont.key === 'Asia') {
        if (a === 'TH') return -1;
        if (b === 'TH') return 1;
      }
      return continentData[b].length - continentData[a].length;
    });
    var continentTotal = 0;
    countries.forEach(function(c) { continentTotal += continentData[c].length; });

    // === CONTINENT COVER SLIDE ===
    var contSlide = addSlide();
    addSolidBg(contSlide, 0.12, 0.12, 0.18); // dark bg
    addTextBox(contSlide, cont.emoji, 188, 120, 200, 100, 72, true, 'CENTER', WHITE);
    addTextBox(contSlide, cont.key.toUpperCase(), 48, 220, 480, 60, 42, true, 'CENTER', WHITE);
    addTextBox(contSlide, cont.subtitle, 68, 290, 440, 40, 16, false, 'CENTER', { red: 0.8, green: 0.8, blue: 0.85 });
    addTextBox(contSlide, countries.length + ' Countries  |  ' + continentTotal + ' Fans', 118, 360, 340, 30, 14, false, 'CENTER', { red: 0.6, green: 0.6, blue: 0.65 });
    slideCount++;
    flushRequests(); // auto-flush only if buffer >= 200

    // Helper: add beige bg + white card for content slides
    function makeContentSlide() {
      var sid = addSlide();
      addSolidBg(sid, 0.96, 0.95, 0.92); // beige
      // White card rect
      var rectId = sid + '_card';
      requests.push({
        createShape: {
          objectId: rectId,
          shapeType: 'RECTANGLE',
          elementProperties: {
            pageObjectId: sid,
            size: { width: { magnitude: ptToEmu(540), unit: 'EMU' }, height: { magnitude: ptToEmu(540), unit: 'EMU' } },
            transform: { scaleX: 1, scaleY: 1, translateX: ptToEmu(18), translateY: ptToEmu(18), unit: 'EMU' }
          }
        }
      });
      requests.push({
        updateShapeProperties: {
          objectId: rectId,
          shapeProperties: {
            shapeBackgroundFill: { solidFill: { color: { rgbColor: { red: 1, green: 1, blue: 1 } }, alpha: 1 } },
            outline: { propertyState: 'NOT_RENDERED' }
          },
          fields: 'shapeBackgroundFill,outline'
        }
      });
      slideCount++;
      return sid;
    }

    // Helper: build name + contact line
    function nameContactLine(e, countryName) {
      var contact = formatContact(e.contact_info);
      var line = e.name || 'Fan';
      if (countryName) line = e.flag + ' ' + countryName + ' — ' + line;
      if (contact) line += '  ' + contact;
      return line;
    }

    // Helper: add entries for one country — mixed B+A+ATxt with dynamic Y
    function addCountrySlides(entries, countryName, flag) {
      var trackC = [];
      var flatItems = [];
      entries.forEach(function(e) {
        if (e.track === 'C') trackC.push(e);
        else if (e.track === 'B' && e.photo_url) flatItems.push({ entry: e, type: 'b' });
        else if (e.profile_url) flatItems.push({ entry: e, type: 'a' });
        else flatItems.push({ entry: e, type: 'aTxt' });
      });

      var CARD_BOTTOM = 546;
      var cSlide = null;
      var cY = 0;

      // Estimate text height in points
      function estHPt(text, fontSize, widthPt) {
        if (!text) return 0;
        var s = String(text);
        var wide = (s.match(/[\u0E00-\u0E7F\u3000-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\u0600-\u06FF\u1100-\u11FF]/g) || []).length;
        var charsPerPt = 1.5 * (10 / fontSize);
        var effectiveLen = s.length + wide * 0.8;
        var charsPerLine = Math.max(1, Math.floor(widthPt * charsPerPt));
        var hardBreaks = (s.match(/\n/g) || []).length;
        var lines = Math.ceil(effectiveLen / charsPerLine) + hardBreaks;
        return Math.max(fontSize * 1.4, lines * fontSize * 1.4);
      }

      for (var fi = 0; fi < flatItems.length; fi++) {
        var item = flatItems[fi];
        var e = item.entry;
        var msg = buildDisplayMsg(e, item.type === 'b' ? 500 : item.type === 'a' ? 400 : 250);
        var needH = 0;

        if (item.type === 'b') {
          var textW = 350;
          needH = Math.max(165, 20 + estHPt(msg, 8, textW) + 10);
        } else if (item.type === 'a') {
          var textW = 478;
          needH = Math.max(50, 18 + estHPt(msg, 7, textW) + 8);
        } else {
          var textW = 520;
          needH = Math.max(32, 15 + estHPt(msg, 7, textW) + 6);
        }

        if (!cSlide || cY + needH > CARD_BOTTOM) {
          cSlide = makeContentSlide();
          addTextBox(cSlide, flag + ' ' + countryName, 28, 24, 520, 22, 11, true, 'CENTER', { red: 0.48, green: 0.36, blue: 0.24 });
          cY = 50;
        }

        if (item.type === 'b') {
          var photoUrl = getDriveImageUrl(e.photo_url);
          if (photoUrl) addImage(cSlide, photoUrl, 28, cY, 160, Math.min(155, needH - 5));
          addTextBox(cSlide, nameContactLine(e), 196, cY, 350, 18, 9, true, 'START', DARK);
          addTextBox(cSlide, msg, 196, cY + 20, 350, needH - 25, 8, false, 'START', DARK);
          cY += needH;
        } else if (item.type === 'a') {
          var profUrlA = getDriveImageUrl(e.profile_url);
          if (profUrlA) addProfileImage(cSlide, profUrlA, 28, cY + 2, 36);
          addTextBox(cSlide, nameContactLine(e), 70, cY, 478, 16, 8, true, 'START', DARK);
          addTextBox(cSlide, msg, 70, cY + 16, 478, needH - 20, 7, false, 'START', DARK);
          cY += needH;
        } else {
          addTextBox(cSlide, nameContactLine(e), 28, cY, 520, 13, 8, true, 'START', DARK);
          addTextBox(cSlide, msg, 28, cY + 13, 520, needH - 16, 7, false, 'START', DARK);
          cY += needH;
        }

        if (fi % 10 === 9) flushRequests();
      }

      // Track C: 1 per slide
      trackC.forEach(function(c) {
        var cSlide2 = makeContentSlide();
        var customUrl = getDriveImageUrl(c.custom_url);
        var msgC = buildDisplayMsg(c);
        if (customUrl) {
          addImage(cSlide2, customUrl, 28, 24, 520, 410);
          addTextBox(cSlide2, nameContactLine(c, countryName), 28, 440, 520, 20, 10, true, 'START', DARK);
          if (msgC) addTextBox(cSlide2, msgC, 28, 462, 520, 80, 8, false, 'START', DARK);
        } else {
          addTextBox(cSlide2, c.name, 48, 100, 480, 30, 20, true, 'CENTER', DARK);
          addTextBox(cSlide2, flag + ' ' + countryName, 48, 135, 480, 20, 12, false, 'CENTER', { red: 0.5, green: 0.5, blue: 0.5 });
          if (msgC) addTextBox(cSlide2, msgC, 48, 165, 480, 380, 11, false, 'CENTER', DARK);
        }
        flushRequests();
      });
    }

    var SMALL_THRESHOLD = 5;
    var bigCountries = countries.filter(function(c) { return continentData[c].length > SMALL_THRESHOLD; });
    var smallCountries = countries.filter(function(c) { return continentData[c].length <= SMALL_THRESHOLD; });

    // === BIG COUNTRIES: each gets intro slide ===
    bigCountries.forEach(function(code) {
      var entries = continentData[code];
      var cd = COUNTRY_DATA[code] || { name: code, flag: '🌍' };
      var countryName = cd.name;
      var flag = entries[0].flag || cd.flag;

      var countrySlide = addSlide();
      addSolidBg(countrySlide, 0.95, 0.93, 0.88);
      addTextBox(countrySlide, flag + ' ' + countryName, 48, 230, 480, 50, 36, true, 'CENTER', DARK);
      addTextBox(countrySlide, entries.length + ' message' + (entries.length > 1 ? 's' : '') + ' of love', 118, 290, 340, 30, 16, false, 'CENTER', { red: 0.4, green: 0.4, blue: 0.4 });
      slideCount++;
      flushRequests();

      addCountrySlides(entries, countryName, flag);
    });

    // === SMALL COUNTRIES: combine all on shared slides ===
    if (smallCountries.length > 0) {
      // Collect all entries tagged with country, pack together
      var mixedItems = [];
      smallCountries.forEach(function(code) {
        var entries = continentData[code];
        var cd = COUNTRY_DATA[code] || { name: code, flag: '🌍' };
        var countryName = cd.name;
        var flag = entries[0].flag || cd.flag;
        var first = true;
        entries.forEach(function(e) {
          var type = 'aTxt';
          if (e.track === 'C') type = 'c';
          else if (e.track === 'B' && e.photo_url) type = 'b';
          else if (e.profile_url) type = 'a';
          mixedItems.push({ entry: e, countryName: countryName, flag: flag, type: type, isFirst: first, count: entries.length });
          first = false;
        });
      });

      // Estimate text height in points
      function estHPtSmall(text, fontSize, widthPt) {
        if (!text) return 0;
        var s = String(text);
        var wide = (s.match(/[\u0E00-\u0E7F\u3000-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\u0600-\u06FF\u1100-\u11FF]/g) || []).length;
        var charsPerPt = 1.5 * (10 / fontSize);
        var effectiveLen = s.length + wide * 0.8;
        var charsPerLine = Math.max(1, Math.floor(widthPt * charsPerPt));
        var hardBreaks = (s.match(/\n/g) || []).length;
        var lines = Math.ceil(effectiveLen / charsPerLine) + hardBreaks;
        return Math.max(fontSize * 1.4, lines * fontSize * 1.4);
      }

      var curSlide = null;
      var curY = 0;
      var CARD_BOTTOM = 546;

      for (var mi = 0; mi < mixedItems.length; mi++) {
        var item = mixedItems[mi];
        var e = item.entry;

        // Track C: standalone
        if (item.type === 'c') {
          var cSlide2 = makeContentSlide();
          var customUrl2 = getDriveImageUrl(e.custom_url);
          if (customUrl2) addImage(cSlide2, customUrl2, 28, 24, 520, 410);
          addTextBox(cSlide2, nameContactLine(e, item.countryName), 28, 440, 520, 20, 10, true, 'START', DARK);
          if (e.message) addTextBox(cSlide2, buildDisplayMsg(e), 28, 462, 520, 80, 8, false, 'START', DARK);
          flushRequests();
          curSlide = null;
          continue;
        }

        // Estimate height needed
        var msg = buildDisplayMsg(e, item.type === 'b' ? 500 : item.type === 'a' ? 400 : 250);
        var needH = 0;
        if (item.isFirst) needH += 26;
        if (item.type === 'b') {
          needH += Math.max(165, 20 + estHPtSmall(msg, 8, 350) + 10);
        } else if (item.type === 'a') {
          needH += Math.max(50, 18 + estHPtSmall(msg, 7, 478) + 8);
        } else {
          needH += Math.max(32, 15 + estHPtSmall(msg, 7, 520) + 6);
        }

        if (!curSlide || curY + needH > CARD_BOTTOM) {
          curSlide = makeContentSlide();
          curY = 28;
        }

        // Country header
        if (item.isFirst) {
          addTextBox(curSlide, item.flag + ' ' + item.countryName + ' — ' + item.count + ' messages', 28, curY, 520, 22, 11, true, 'CENTER', { red: 0.48, green: 0.36, blue: 0.24 });
          curY += 24;
        }

        if (item.type === 'b') {
          var entH = Math.max(165, 20 + estHPtSmall(msg, 8, 350) + 10);
          var photoUrl2 = getDriveImageUrl(e.photo_url);
          if (photoUrl2) addImage(curSlide, photoUrl2, 28, curY, 160, Math.min(155, entH - 5));
          addTextBox(curSlide, nameContactLine(e), 196, curY, 350, 16, 9, true, 'START', DARK);
          addTextBox(curSlide, msg, 196, curY + 18, 350, entH - 23, 8, false, 'START', DARK);
          curY += entH;
        } else if (item.type === 'a') {
          var entH = Math.max(50, 18 + estHPtSmall(msg, 7, 478) + 8);
          var profUrl2 = getDriveImageUrl(e.profile_url);
          if (profUrl2) addProfileImage(curSlide, profUrl2, 28, curY + 2, 36);
          addTextBox(curSlide, nameContactLine(e), 70, curY, 478, 16, 8, true, 'START', DARK);
          addTextBox(curSlide, msg, 70, curY + 16, 478, entH - 20, 7, false, 'START', DARK);
          curY += entH;
        } else {
          var entH = Math.max(32, 15 + estHPtSmall(msg, 7, 520) + 6);
          addTextBox(curSlide, nameContactLine(e), 28, curY, 520, 13, 8, true, 'START', DARK);
          addTextBox(curSlide, msg, 28, curY + 13, 520, entH - 16, 7, false, 'START', DARK);
          curY += entH;
        }

        if (mi % 10 === 9) flushRequests();
      }
      flushRequests();
    }
  });

  // Final flush
  flushRequests();

  Logger.log('✅ Fanbook presentation created: ' + slideCount + ' slides');
  Logger.log('📎 https://docs.google.com/presentation/d/' + presId);
  Logger.log('📥 Download as .pptx → Import to Canva for Canva Print');

  return presId;
}
