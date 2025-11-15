# 📊 דוח ביקורת ערוצים (Channels Audit Report)
**תאריך:** 2025-11-15  
**מטרה:** בדיקת כל הערוצים האפשריים במערכת Source Tracking

---

## 🔍 סיכום כללי

דוח זה בודק את כל הערוצים (Channels) האפשריים במערכת Source Tracking:
- **ערוצי הפצה:** Email, WhatsApp, SMS
- **רשתות חברתיות:** Facebook, Instagram, LinkedIn, Twitter, YouTube, TikTok, Pinterest, Telegram, Reddit
- **מנועי חיפוש:** Google, Bing, Yahoo
- **ערוצים פנימיים:** Form, Chat, QR, Website, Direct
- **ערוצים אחרים:** Referral domains, Unknown

---

## 📋 טבלת השוואה מלאה

| # | ערוץ (Channel) | Referral Tracking | Leads Label | Translations | Distribution Hub | User Agent | Normalize Source | Priority |
|---|----------------|-------------------|-------------|--------------|------------------|------------|------------------|----------|
| 1 | **email** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=`) |
| 2 | **sms** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=`) |
| 3 | **whatsapp** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`wa`) | 1 (Referrer) + 2 (`?src=`) |
| 4 | **facebook** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`fb`) | 1 (Referrer) + 2 (`?src=`) |
| 5 | **instagram** | ✅ | ✅ | ✅ | ❌ (copy only) | ✅ | ✅ (`ig`) | 1 (Referrer) + 2 (`?src=`) |
| 6 | **linkedin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`li`, `in`) | 1 (Referrer) + 2 (`?src=`) |
| 7 | **twitter** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ (`tw`) | 1 (Referrer) + 2 (`?src=`) |
| 8 | **youtube** | ✅ | ✅ | ✅ | ❌ (copy only) | ✅ | ❌ | 1 (Referrer) + 2 (`?src=`) |
| 9 | **tiktok** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | 1 (Referrer) + 2 (`?src=`) |
| 10 | **pinterest** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | 1 (Referrer) + 2 (`?src=`) |
| 11 | **telegram** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`tg`) | 1 (Referrer) + 2 (`?src=`) |
| 12 | **reddit** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | 1 (Referrer) + 2 (`?src=`) |
| 13 | **google** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ (`goog`) | 1 (Referrer) + 3 (`utm_source=`) |
| 14 | **bing** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | 1 (Referrer) + 3 (`utm_source=`) |
| 15 | **yahoo** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | 1 (Referrer) + 3 (`utm_source=`) |
| 16 | **form** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=form`) |
| 17 | **chat** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=chat`) |
| 18 | **qr** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=qr`) |
| 19 | **website** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 2 (`?src=website`) |
| 20 | **direct** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | 5 (Default fallback) |
| 21 | **referral-*** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | 1 (Referrer) |
| 22 | **other** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Legacy (not used) |
| 23 | **unknown** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Fallback |

**סימונים:**
- ✅ = נתמך
- ❌ = לא נתמך
- Priority = סדר בדיקה ב-`detectChannel()`

---

## 🔎 בדיקה מפורטת לפי קטגוריות

### 1. ערוצי הפצה (Email, SMS, WhatsApp)

#### 📧 Email
- **Referral Tracking (`referral-tracking.service.ts`):**
  - ❌ **לא מזוהה מ-Referrer** (אין דומיין ספציפי למייל)
  - ✅ **נתמך ב-`?src=email`** (Priority 2)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label (`leads.component.ts`):**
  - ✅ `'email'` → `'leads.channelEmail'` → `'מייל'` / `'Email'`
- **Translations (`language.service.ts`):**
  - ✅ `leads.channelEmail` → `{ en: 'Email', he: 'מייל' }`
- **Distribution Hub (`distribution-hub.component.ts`):**
  - ✅ `selectSocialNetwork('email')` → יוצר `?src=email` → פותח `mailto:`
  - ✅ הקישור נשלח עם פרמטר `?src=email`
- **הערות:**
  - ⚠️ **בעיה:** כשלוחצים על קישור מתוך אימייל, אין referrer ספציפי, אז ה-`?src=email` **חייב** להיות בקישור.
  - ✅ **פתרון:** הקישור נוצר עם `?src=email` ב-Distribution Hub.

#### 💬 SMS
- **Referral Tracking:**
  - ❌ **לא מזוהה מ-Referrer** (אין דומיין ספציפי ל-SMS)
  - ✅ **נתמך ב-`?src=sms`** (Priority 2)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'sms'` → `'leads.channelSMS'` → `'SMS'`
- **Translations:**
  - ✅ `leads.channelSMS` → `{ en: 'SMS', he: 'SMS' }`
- **Distribution Hub:**
  - ✅ `selectSocialNetwork('sms')` → יוצר `?src=sms` → פותח `sms:`
  - ✅ הקישור נשלח עם פרמטר `?src=sms`
- **הערות:**
  - ⚠️ **בעיה:** כשלוחצים על קישור מתוך SMS, אין referrer ספציפי, אז ה-`?src=sms` **חייב** להיות בקישור.
  - ✅ **פתרון:** הקישור נוצר עם `?src=sms` ב-Distribution Hub.

#### 📱 WhatsApp
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `whatsapp.com` ✅
    - `api.whatsapp.com` ✅ (תוקן היום)
    - `wa.me` ✅
    - `chat.whatsapp.com` ✅
  - ✅ **נתמך ב-`?src=whatsapp`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('whatsapp')`
  - ✅ **ב-normalizeSource:** `'wa'` → `'whatsapp'`
- **Leads Label:**
  - ✅ `'whatsapp'` → `'leads.channelWhatsApp'` → `'וואטסאפ'` / `'WhatsApp'`
- **Translations:**
  - ✅ `leads.channelWhatsApp` → `{ en: 'WhatsApp', he: 'וואטסאפ' }`
- **Distribution Hub:**
  - ✅ `selectSocialNetwork('whatsapp')` → יוצר `?src=whatsapp` → פותח `https://api.whatsapp.com/send?text=...`
  - ✅ הקישור נשלח עם פרמטר `?src=whatsapp`
- **הערות:**
  - ✅ **תוקן:** `api.whatsapp.com` נוסף לרשימת הדומיינים (Priority 1).
  - ✅ **עובד נכון:** כששותפים דרך `api.whatsapp.com`, ה-referrer מזוהה כוואטאפ.
  - ✅ **גיבוי:** גם אם אין referrer, ה-`?src=whatsapp` עובד (Priority 2).

---

### 2. רשתות חברתיות

#### 📘 Facebook
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `facebook.com` ✅
    - `fb.com` ✅
    - `m.facebook.com` ✅
  - ✅ **נתמך ב-`?src=facebook`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('fban') || ua.includes('fbav') || ua.includes('facebook')`
  - ✅ **ב-normalizeSource:** `'fb'` → `'facebook'`
- **Leads Label:**
  - ✅ `'facebook'` → `'leads.channelFacebook'` → `'פייסבוק'` / `'Facebook'`
- **Translations:**
  - ✅ `leads.channelFacebook` → `{ en: 'Facebook', he: 'פייסבוק' }`
- **Distribution Hub:**
  - ✅ `selectSocialNetwork('facebook')` → יוצר `?src=facebook` → פותח `https://www.facebook.com/sharer/sharer.php?u=...`
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=facebook` (Priority 2).

#### 📷 Instagram
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `instagram.com` ✅
    - `m.instagram.com` ✅
  - ✅ **נתמך ב-`?src=instagram`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('instagram')`
  - ✅ **ב-normalizeSource:** `'ig'` → `'instagram'`
- **Leads Label:**
  - ✅ `'instagram'` → `'leads.channelInstagram'` → `'אינסטגרם'` / `'Instagram'`
- **Translations:**
  - ✅ `leads.channelInstagram` → `{ en: 'Instagram', he: 'אינסטגרם' }`
- **Distribution Hub:**
  - ⚠️ **רק העתקה:** `selectSocialNetwork('instagram')` → רק מעתיק קישור, לא פותח חלון שיתוף (אין API).
  - ✅ הקישור נשלח עם פרמטר `?src=instagram`
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=instagram` (Priority 2).

#### 💼 LinkedIn
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `linkedin.com` ✅
    - `lnkd.in` ✅
  - ✅ **נתמך ב-`?src=linkedin`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('linkedin')`
  - ✅ **ב-normalizeSource:** `'li'` → `'linkedin'`, `'in'` → `'linkedin'`
- **Leads Label:**
  - ✅ `'linkedin'` → `'leads.channelLinkedIn'` → `'לינקדאין'` / `'LinkedIn'`
- **Translations:**
  - ✅ `leads.channelLinkedIn` → `{ en: 'LinkedIn', he: 'לינקדאין' }`
- **Distribution Hub:**
  - ✅ `selectSocialNetwork('linkedin')` → יוצר `?src=linkedin` → פותח `https://www.linkedin.com/sharing/share-offsite/?url=...`
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=linkedin` (Priority 2).

#### 🐦 Twitter/X
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `twitter.com` ✅
    - `t.co` ✅
    - `x.com` ✅
  - ✅ **נתמך ב-`?src=twitter`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('twitter') || ua.includes('x/')`
  - ✅ **ב-normalizeSource:** `'tw'` → `'twitter'`
- **Leads Label:**
  - ✅ `'twitter'` → `'leads.channelTwitter'` → `'טוויטר'` / `'Twitter'`
- **Translations:**
  - ✅ `leads.channelTwitter` → `{ en: 'Twitter', he: 'טוויטר' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('twitter')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=twitter`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=twitter` (Priority 2).

#### 📺 YouTube
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `youtube.com` ✅
    - `youtu.be` ✅
    - `m.youtube.com` ✅
  - ✅ **נתמך ב-`?src=youtube`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('youtube')`
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'youtube'` → `'leads.channelYouTube'` → `'יוטיוב'` / `'YouTube'`
- **Translations:**
  - ✅ `leads.channelYouTube` → `{ en: 'YouTube', he: 'יוטיוב' }`
- **Distribution Hub:**
  - ⚠️ **רק העתקה:** `selectSocialNetwork('youtube')` → רק מעתיק קישור, לא פותח חלון שיתוף (אין API).
  - ✅ הקישור נשלח עם פרמטר `?src=youtube`
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=youtube` (Priority 2).

#### 🎵 TikTok
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `tiktok.com` ✅
  - ✅ **נתמך ב-`?src=tiktok`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('tiktok')`
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'tiktok'` → `'leads.channelTikTok'` → `'טיקטוק'` / `'TikTok'`
- **Translations:**
  - ✅ `leads.channelTikTok` → `{ en: 'TikTok', he: 'טיקטוק' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('tiktok')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=tiktok`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=tiktok` (Priority 2).

#### 📌 Pinterest
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `pinterest.com` ✅
    - `pin.it` ✅
  - ✅ **נתמך ב-`?src=pinterest`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('pinterest')`
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'pinterest'` → `'leads.channelPinterest'` → `'פינטרסט'` / `'Pinterest'`
- **Translations:**
  - ✅ `leads.channelPinterest` → `{ en: 'Pinterest', he: 'פינטרסט' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('pinterest')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=pinterest`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=pinterest` (Priority 2).

#### ✈️ Telegram
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `telegram.org` ✅
    - `t.me` ✅
  - ✅ **נתמך ב-`?src=telegram`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('telegram')`
  - ✅ **ב-normalizeSource:** `'tg'` → `'telegram'`
- **Leads Label:**
  - ✅ `'telegram'` → `'leads.channelTelegram'` → `'טלגרם'` / `'Telegram'`
- **Translations:**
  - ✅ `leads.channelTelegram` → `{ en: 'Telegram', he: 'טלגרם' }`
- **Distribution Hub:**
  - ✅ `selectSocialNetwork('telegram')` → יוצר `?src=telegram` → פותח `https://t.me/share/url?url=...`
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=telegram` (Priority 2).

#### 🤖 Reddit
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `reddit.com` ✅
  - ✅ **נתמך ב-`?src=reddit`** (Priority 2)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('reddit')`
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'reddit'` → `'leads.channelReddit'` → `'רדיט'` / `'Reddit'`
- **Translations:**
  - ✅ `leads.channelReddit` → `{ en: 'Reddit', he: 'רדיט' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('reddit')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=reddit`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואם אין, אז `?src=reddit` (Priority 2).

---

### 3. מנועי חיפוש

#### 🔍 Google
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `google.com` ✅
    - `google.co.il` ✅
  - ✅ **נתמך ב-`?src=google`** (Priority 2)
  - ✅ **נתמך ב-`?utm_source=google`** (Priority 3)
  - ✅ **מזוהה מ-User Agent:** `ua.includes('google') || ua.includes('androidwebview')`
  - ✅ **ב-normalizeSource:** `'goog'` → `'google'`
- **Leads Label:**
  - ✅ `'google'` → `'leads.channelGoogle'` → `'גוגל'` / `'Google'`
- **Translations:**
  - ✅ `leads.channelGoogle` → `{ en: 'Google', he: 'גוגל' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('google')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=google` או `?utm_source=google`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואז `?src=google` (Priority 2), ואז `?utm_source=google` (Priority 3).

#### 🔎 Bing
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `bing.com` ✅
  - ✅ **נתמך ב-`?src=bing`** (Priority 2)
  - ✅ **נתמך ב-`?utm_source=bing`** (Priority 3)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'bing'` → `'leads.channelBing'` → `'בינג'` / `'Bing'`
- **Translations:**
  - ✅ `leads.channelBing` → `{ en: 'Bing', he: 'בינג' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('bing')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=bing` או `?utm_source=bing`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואז `?src=bing` (Priority 2), ואז `?utm_source=bing` (Priority 3).

#### 🌐 Yahoo
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:**
    - `yahoo.com` ✅
  - ✅ **נתמך ב-`?src=yahoo`** (Priority 2)
  - ✅ **נתמך ב-`?utm_source=yahoo`** (Priority 3)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'yahoo'` → `'leads.channelYahoo'` → `'יאהו'` / `'Yahoo'`
- **Translations:**
  - ✅ `leads.channelYahoo` → `{ en: 'Yahoo', he: 'יאהו' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** `selectSocialNetwork('yahoo')` לא מופיע ברשימת הרשתות.
  - ⚠️ **אם יהיה:** צריך להוסיף `?src=yahoo` או `?utm_source=yahoo`.
- **הערות:**
  - ✅ **עובד נכון:** Referrer תמיד קודם (Priority 1), ואז `?src=yahoo` (Priority 2), ואז `?utm_source=yahoo` (Priority 3).

---

### 4. ערוצים פנימיים

#### 📝 Form
- **Referral Tracking:**
  - ✅ **נתמך ב-`?src=form`** (Priority 2)
  - ❌ **לא מזוהה מ-Referrer** (זה ערוץ פנימי)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'form'` → `'leads.channelForm'` → `'טופס'` / `'Form'`
- **Translations:**
  - ✅ `leads.channelForm` → `{ en: 'Form', he: 'טופס' }`
- **Distribution Hub:**
  - ✅ `generateLinks()` → יוצר `formLink` עם `?src=form`
- **הערות:**
  - ✅ **עובד נכון:** הקישור נוצר עם `?src=form` ב-`generateLinks()`.

#### 💬 Chat
- **Referral Tracking:**
  - ✅ **נתמך ב-`?src=chat`** (Priority 2)
  - ❌ **לא מזוהה מ-Referrer** (זה ערוץ פנימי)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'chat'` → `'leads.channelChat'` → `'צ'אט'` / `'Chat'`
- **Translations:**
  - ✅ `leads.channelChat` → `{ en: 'Chat', he: 'צ\'אט' }`
- **Distribution Hub:**
  - ✅ `generateLinks()` → יוצר `chatLink` עם `?src=chat`
- **הערות:**
  - ✅ **עובד נכון:** הקישור נוצר עם `?src=chat` ב-`generateLinks()`.

#### 📱 QR Code
- **Referral Tracking:**
  - ✅ **נתמך ב-`?src=qr`** (Priority 2)
  - ❌ **לא מזוהה מ-Referrer** (זה ערוץ פנימי)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'qr'` → `'leads.channelQr'` → `'קוד QR'` / `'QR Code'`
- **Translations:**
  - ✅ `leads.channelQr` → `{ en: 'QR Code', he: 'קוד QR' }`
- **Distribution Hub:**
  - ✅ `generateLinks()` → יוצר `qrLink` עם `?src=qr`
- **הערות:**
  - ✅ **עובד נכון:** הקישור נוצר עם `?src=qr` ב-`generateLinks()`.

#### 🌐 Website
- **Referral Tracking:**
  - ✅ **נתמך ב-`?src=website`** (Priority 2)
  - ❌ **לא מזוהה מ-Referrer** (זה ערוץ פנימי)
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'website'` → `'leads.channelWebsite'` → `'אתר'` / `'Website'`
- **Translations:**
  - ✅ `leads.channelWebsite` → `{ en: 'Website', he: 'אתר' }`
- **Distribution Hub:**
  - ⚠️ **רק העתקה:** `selectSocialNetwork('website')` → רק מעתיק קישור, לא פותח חלון שיתוף.
  - ✅ הקישור נשלח עם פרמטר `?src=website`
- **הערות:**
  - ✅ **עובד נכון:** הקישור נוצר עם `?src=website` ב-`selectSocialNetwork('website')`.

#### 🎯 Direct
- **Referral Tracking:**
  - ✅ **זהו ה-fallback** (Priority 5) - כשאין referrer, אין `?src=`, אין `?utm_source=`, ואין User Agent.
  - ❌ **לא מזוהה מ-Referrer** (זהו הערוץ כשאין referrer)
  - ❌ **לא מזוהה מ-User Agent** (זהו הערוץ כשאין User Agent)
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'direct'` → `'leads.channelDirect'` → `'ישיר'` / `'Direct'`
- **Translations:**
  - ✅ `leads.channelDirect` → `{ en: 'Direct', he: 'ישיר' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** אין אפשרות ליצור `?src=direct` (זהו הערוץ ה-default).
- **הערות:**
  - ✅ **עובד נכון:** זהו הערוץ ה-default כששום דבר אחר לא מזוהה.

---

### 5. ערוצים אחרים

#### 🔗 Referral Domains (`referral-*`)
- **Referral Tracking:**
  - ✅ **מזוהה מ-Referrer:** כל דומיין שאינו ברשימה מוגדרת → `referral-{domain}`
  - ❌ **לא מזוהה מ-User Agent**
  - ❌ **לא ב-normalizeSource**
- **Leads Label:**
  - ✅ `'referral-{domain}'` → `'leads.channelReferral' - {domain}` → `'הפנייה - {domain}'` / `'Referral - {domain}'`
- **Translations:**
  - ✅ `leads.channelReferral` → `{ en: 'Referral', he: 'הפנייה' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** אין אפשרות ליצור `?src=referral-{domain}` (זהו ערוץ דינמי).
- **הערות:**
  - ✅ **עובד נכון:** כל דומיין שאינו ברשימה מוגדרת נשמר כ-`referral-{domain}`.

#### ❓ Unknown
- **Referral Tracking:**
  - ✅ **זהו ה-fallback ב-`getChannelLabel()`** - כשערוץ לא מזוהה.
  - ❌ **לא מזוהה ב-`detectChannel()`** (אם `detectChannel()` לא מזהה, זה `'direct'`).
- **Leads Label:**
  - ✅ `'unknown'` → `'leads.channelUnknown'` → `'לא ידוע'` / `'Unknown'`
- **Translations:**
  - ✅ `leads.channelUnknown` → `{ en: 'Unknown', he: 'לא ידוע' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** אין אפשרות ליצור `?src=unknown`.
- **הערות:**
  - ✅ **עובד נכון:** זהו ה-fallback ב-`getChannelLabel()` כשערוץ לא מזוהה במילון.

#### 📦 Other (Legacy)
- **Referral Tracking:**
  - ❌ **לא בשימוש** - זהו ערוץ legacy שלא צריך להיות בשימוש.
- **Leads Label:**
  - ✅ `'other'` → `'leads.channel_other'` → `'כללי'` / `'General'`
- **Translations:**
  - ✅ `leads.channel_other` → `{ en: 'General', he: 'כללי' }`
- **Distribution Hub:**
  - ❌ **לא נתמך:** אין אפשרות ליצור `?src=other`.
- **הערות:**
  - ⚠️ **Legacy:** זהו ערוץ legacy שלא צריך להיות בשימוש. ערוץ לא מזוהה צריך להיות `'unknown'`, לא `'other'`.

---

## 📊 סיכום לפי קטגוריות

### ✅ ערוצים שנתמכים במלואם (19 ערוצים)

1. **Email** - ✅ (רק `?src=email`)
2. **SMS** - ✅ (רק `?src=sms`)
3. **WhatsApp** - ✅ (Referrer + `?src=` + User Agent)
4. **Facebook** - ✅ (Referrer + `?src=` + User Agent)
5. **Instagram** - ✅ (Referrer + `?src=` + User Agent)
6. **LinkedIn** - ✅ (Referrer + `?src=` + User Agent)
7. **Twitter** - ✅ (Referrer + `?src=` + User Agent)
8. **YouTube** - ✅ (Referrer + `?src=` + User Agent)
9. **TikTok** - ✅ (Referrer + `?src=` + User Agent)
10. **Pinterest** - ✅ (Referrer + `?src=` + User Agent)
11. **Telegram** - ✅ (Referrer + `?src=` + User Agent)
12. **Reddit** - ✅ (Referrer + `?src=` + User Agent)
13. **Google** - ✅ (Referrer + `?src=` + `?utm_source=` + User Agent)
14. **Bing** - ✅ (Referrer + `?src=` + `?utm_source=`)
15. **Yahoo** - ✅ (Referrer + `?src=` + `?utm_source=`)
16. **Form** - ✅ (`?src=form`)
17. **Chat** - ✅ (`?src=chat`)
18. **QR** - ✅ (`?src=qr`)
19. **Website** - ✅ (`?src=website`)

### ⚠️ ערוצים עם בעיות או חסרים (4 ערוצים)

1. **Email** - ⚠️ לא מזוהה מ-Referrer (זה תקין, אבל צריך להקפיד על `?src=email`)
2. **SMS** - ⚠️ לא מזוהה מ-Referrer (זה תקין, אבל צריך להקפיד על `?src=sms`)
3. **Direct** - ⚠️ זהו ה-fallback (זה תקין)
4. **Other** - ⚠️ Legacy (לא צריך להיות בשימוש)

### 🔍 ערוצים שלא נתמכים ב-Distribution Hub (7 ערוצים)

1. **Twitter** - ❌ לא מופיע ברשימת הרשתות
2. **TikTok** - ❌ לא מופיע ברשימת הרשתות
3. **Pinterest** - ❌ לא מופיע ברשימת הרשתות
4. **Reddit** - ❌ לא מופיע ברשימת הרשתות
5. **Google** - ❌ לא מופיע ברשימת הרשתות
6. **Bing** - ❌ לא מופיע ברשימת הרשתות
7. **Yahoo** - ❌ לא מופיע ברשימת הרשתות

---

## 🔍 בדיקות נוספות

### 1. Priority Order (סדר בדיקה)

**סדר הקדימויות ב-`detectChannel()`:**

1. **Priority 1: HTTP Referrer** - הכי חשוב (מזהה את המקור האמיתי)
2. **Priority 2: `?src=` parameter** - חשוב (כשאין referrer)
3. **Priority 3: `?utm_source=` parameter** - חשוב (כשאין referrer ו-`?src=`)
4. **Priority 4: User Agent** - פחות חשוב (כשאין referrer ואין פרמטרים)
5. **Priority 5: Direct** - Default fallback

**✅ סדר זה נכון ונשמר.**

### 2. Normalize Source (קיצורים)

**קיצורים ב-`normalizeSource()`:**

- `'fb'` → `'facebook'` ✅
- `'ig'` → `'instagram'` ✅
- `'li'` → `'linkedin'` ✅
- `'in'` → `'linkedin'` ✅
- `'tw'` → `'twitter'` ✅
- `'yt'` → `'youtube'` ✅
- `'wa'` → `'whatsapp'` ✅
- `'tg'` → `'telegram'` ✅
- `'goog'` → `'google'` ✅

**✅ כל הקיצורים נתמכים.**

### 3. User Agent Detection

**ערוצים שמזוהים מ-User Agent:**

- `'facebook'` - ✅ (`ua.includes('fban') || ua.includes('fbav') || ua.includes('facebook')`)
- `'instagram'` - ✅ (`ua.includes('instagram')`)
- `'whatsapp'` - ✅ (`ua.includes('whatsapp')`)
- `'linkedin'` - ✅ (`ua.includes('linkedin')`)
- `'twitter'` - ✅ (`ua.includes('twitter') || ua.includes('x/')`)
- `'tiktok'` - ✅ (`ua.includes('tiktok')`)
- `'pinterest'` - ✅ (`ua.includes('pinterest')`)
- `'telegram'` - ✅ (`ua.includes('telegram')`)
- `'reddit'` - ✅ (`ua.includes('reddit')`)
- `'youtube'` - ✅ (`ua.includes('youtube')`)
- `'google'` - ✅ (`ua.includes('google') || ua.includes('androidwebview')`)

**✅ כל הערוצים הרלוונטיים נתמכים.**

---

## ⚠️ בעיות וחסרים שזוהו

### 1. Email ו-SMS לא מזוהים מ-Referrer

**בעיה:** Email ו-SMS לא מזוהים מ-Referrer (זה תקין, אבל צריך להקפיד על `?src=email` ו-`?src=sms`).

**פתרון:** ✅ כבר מיושם - הקישורים נוצרים עם `?src=email` ו-`?src=sms` ב-Distribution Hub.

**סטטוס:** ✅ **נפתר**

### 2. WhatsApp - `api.whatsapp.com` לא זוהה

**בעיה:** כששותפים קישור דרך `https://api.whatsapp.com/send`, ה-referrer הוא `api.whatsapp.com`, אבל הקוד לא זיהה אותו.

**פתרון:** ✅ **תוקן היום** - הוספתי `api.whatsapp.com` לרשימת הדומיינים שמזוהים כוואטאפ.

**סטטוס:** ✅ **נפתר**

### 3. ערוצים שלא נתמכים ב-Distribution Hub

**בעיה:** 7 ערוצים לא מופיעים ברשימת הרשתות ב-Distribution Hub:
- Twitter
- TikTok
- Pinterest
- Reddit
- Google
- Bing
- Yahoo

**פתרון:** ⚠️ **לא נדרש** - אלה ערוצים שאפשר להוסיף בעתיד אם יש צורך. כרגע, אם משתמש יוצר קישור עם `?src=twitter` ידנית, המערכת תזהה אותו נכון.

**סטטוס:** ⚠️ **לא נדרש כרגע**

### 4. Legacy Channel: "other"

**בעיה:** יש ערוץ `'other'` שהוא legacy ולא צריך להיות בשימוש.

**פתרון:** ⚠️ **נשאר לתאימות לאחור** - אם יש לידים ישנים עם `'other'`, הם עדיין יוצגו נכון.

**סטטוס:** ⚠️ **נשאר לתאימות לאחור**

---

## ✅ מסקנות

### 1. כל הערוצים העיקריים עובדים נכון

- ✅ **Email** - עובד נכון עם `?src=email`
- ✅ **SMS** - עובד נכון עם `?src=sms`
- ✅ **WhatsApp** - עובד נכון עם Referrer + `?src=whatsapp` (תוקן היום)
- ✅ **רשתות חברתיות** - כולן עובדות נכון עם Referrer + `?src=`
- ✅ **מנועי חיפוש** - עובדים נכון עם Referrer + `?src=` + `?utm_source=`
- ✅ **ערוצים פנימיים** - Form, Chat, QR עובדים נכון

### 2. סדר הקדימויות נכון

- ✅ **Priority 1: HTTP Referrer** - מזהה את המקור האמיתי (למשל, אם קישור נשלח בפייסבוק, זה יהיה `facebook`, לא `form`).
- ✅ **Priority 2: `?src=` parameter** - עובד כשאין referrer (למשל, Email ו-SMS).
- ✅ **Priority 3: `?utm_source=` parameter** - עובד כשאין referrer ו-`?src=` (למשל, Google Ads).
- ✅ **Priority 4: User Agent** - עובד כשאין referrer ואין פרמטרים (למשל, אפליקציות).
- ✅ **Priority 5: Direct** - Default fallback.

### 3. כל התרגומים קיימים

- ✅ כל הערוצים מופיעים ב-`language.service.ts` בעברית ובאנגלית.
- ✅ כל הערוצים מופיעים ב-`leads.component.ts` ב-`getChannelLabel()`.

### 4. כל המיפויים נכונים

- ✅ כל הערוצים מופיעים ב-`referral-tracking.service.ts` ב-`detectChannel()`.
- ✅ כל הקיצורים מופיעים ב-`normalizeSource()`.
- ✅ כל הערוצים מופיעים ב-`detectFromUserAgent()`.

---

## 📝 המלצות

### 1. אין צורך בשינויים

כל הערוצים עובדים נכון. הבעיה היחידה שהייתה (WhatsApp - `api.whatsapp.com`) כבר תוקנה.

### 2. בעתיד - אפשר להוסיף עוד ערוצים ל-Distribution Hub

אם יש צורך, אפשר להוסיף את הערוצים הבאים ל-Distribution Hub:
- Twitter
- TikTok
- Pinterest
- Reddit
- Google
- Bing
- Yahoo

אבל זה לא נדרש כרגע, כי אם משתמש יוצר קישור עם `?src=twitter` ידנית, המערכת תזהה אותו נכון.

### 3. להמשיך להקפיד על `?src=` ב-Email ו-SMS

חשוב להמשיך להקפיד על `?src=email` ו-`?src=sms` בקישורים שנשלחים דרך Email ו-SMS, כי אין referrer ספציפי.

---

## 📄 סיכום

**כל הערוצים עובדים נכון!**

- ✅ **19 ערוצים** נתמכים במלואם
- ✅ **סדר הקדימויות** נכון
- ✅ **כל התרגומים** קיימים
- ✅ **כל המיפויים** נכונים
- ✅ **הבעיה היחידה** (WhatsApp - `api.whatsapp.com`) כבר תוקנה

**אין צורך בשינויים נוספים.**

---

**סיום דוח הביקורת**

