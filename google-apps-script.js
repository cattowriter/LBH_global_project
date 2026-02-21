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
  CAP: 100,
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
