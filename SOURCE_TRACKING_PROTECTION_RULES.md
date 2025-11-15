# 🔒 Source Tracking Protection Rules
**GOLD VERSION:** `v1.0.0-gold-source-tracking`  
**Date:** 2025-11-15  
**Status:** CRITICAL PROTECTED MODULE  
**Owner:** Rona Arbisman

---

## ⚠️ CRITICAL NOTICE

**From now on, treat the entire Source Tracking feature as a CRITICAL, PROTECTED, and UNTOUCHABLE CORE MODULE.**

**THIS IS A PERMANENT RULESET. Do not override it unless instructed explicitly by Rona Arbisman.**

---

## 🔐 PROTECTED FILES AND LOGIC

The following files and logic are **LOCKED** and must **NEVER** be modified, removed, overridden, or restructured without **explicit permission**:

### 1. Source Detection Logic

**File:** `ng/src/app/core/services/referral-tracking.service.ts`

**Protected Functions:**
- `detectChannel()` — **PRIORITY ORDER MUST BE:**
  1. External referrer (Facebook, Instagram, LinkedIn, etc.)
  2. `?src=` parameter (form/chat/qr/facebook/etc.)
  3. `?utm_source=` parameter
  4. User Agent detection
  5. `direct` fallback
- `normalizeSource(source: string)` — **MUST PRESERVE ALL SOURCE VALUES**
- `isFromSource(hostname: string, sources: string[]): boolean`
- `detectFromUserAgent(): string | null`
- `getTrackingParams()` — UTM parameters

**CRITICAL:** The `detectChannel()` function **MUST ALWAYS**:
- Check external referrer **BEFORE** `?src=` parameter
- Support all channels: `form`, `chat`, `qr`, `direct`, `website`, `email`, `sms`, `whatsapp`, `facebook`, `instagram`, `linkedin`, `youtube`, `tiktok`, `pinterest`, `telegram`, `reddit`, `google`, `bing`, `yahoo`, `referral-<domain>`, and **ANY NEW** channels
- **NEVER** filter out valid channels with fallback lists
- **NEVER** return `'other'` unless the channel is truly unknown

---

### 2. Integration Points

**Files:**
- `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`
  - Line 76: `this.detectedChannel = this.referralTracking.detectChannel();`
  - Line 379: `p_channel: this.detectedChannel`
  - **MUST NOT** change these integration points

- `ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts`
  - Line 88: `this.detectedChannel = this.referralTracking.detectChannel();`
  - Line 1039: `p_channel: this.detectedChannel`
  - **MUST NOT** change these integration points

- `supabase/create_submit_response_function.sql`
  - Function: `submit_lead(p_channel TEXT DEFAULT NULL)`
  - **MUST PRESERVE** the `channel` column in `leads` table
  - **MUST NOT** change the function signature

- `ng/src/app/pages/distribution-hub/distribution-hub.component.ts`
  - Lines 311-313: Link generation with `?src=form`, `?src=chat`, `?src=qr`
  - **MUST PRESERVE** `src` parameter in generated links

---

### 3. Leads Screen Mapping

**File:** `ng/src/app/pages/leads/leads.component.ts`

**Protected Functions:**
- `getChannelLabel(channel: string): string` — **MUST:**
  - Support ALL channels detected by `detectChannel()`
  - Include all channel labels in `channelLabels` dictionary
  - Handle `referral-*` channels correctly
  - **NEVER** return `'כללי'` (General) for known channels
  - **NEVER** collapse valid channels to `'other'`

- `prepareLeadForExport()` — **MUST:**
  - Preserve channel value as-is
  - **NEVER** normalize valid channels to `'other'`
  - **NEVER** filter out channels

**Protected Data:**
- `channelLabels` dictionary — **MUST** include ALL channels:
  - `email`, `whatsapp`, `sms`, `website`, `facebook`, `instagram`
  - `linkedin`, `twitter`, `youtube`, `tiktok`, `pinterest`, `telegram`, `reddit`
  - `google`, `bing`, `yahoo`, `direct`, `form`, `chat`, `qr`
  - `other`, `unknown`, `referral-*`

---

### 4. Language Service

**File:** `ng/src/app/core/services/language.service.ts`

**Protected Translations:**
- All `leads.channel*` keys — **MUST** include translations for ALL channels
- **MUST** support both Hebrew and English
- **MUST NOT** remove existing channel translations

---

## ✅ BEHAVIOR GUARANTEE

The feature **MUST ALWAYS** support:

- **Distribution channels:** `form`, `chat`, `qr`, `direct`, `website`
- **Messaging channels:** `email`, `sms`, `whatsapp`, `telegram`
- **Social media:** `facebook`, `instagram`, `linkedin`, `twitter`, `youtube`, `tiktok`, `pinterest`, `reddit`
- **Search engines:** `google`, `bing`, `yahoo`
- **Referral channels:** `referral-<domain>` (dynamic)
- **Unknown:** `unknown`, `other` (only as fallback)

**ALL** these channels must:
- Be detected correctly by `detectChannel()`
- Be displayed correctly in the leads table
- Be exported correctly in Excel
- Have proper translations in Hebrew and English

---

## 🛡️ HARD PROTECTIONS

### Before ANY Change

**BEFORE** any refactor, import, merge, rename, lint fix, or global change:

1. **STOP** immediately
2. **SCAN** all protected files listed above
3. **DETECT** if the change might affect source tracking
4. **If YES:**
   - **BLOCK** the change completely
   - **PRINT** clear warning:
     ```
     ⚠️ STOPPED: This change may break Source Tracking. Action blocked.
     ⚠️ Protected file: <file_path>
     ⚠️ Protected function: <function_name>
     ⚠️ Please contact Rona Arbisman for permission.
     ```
5. **If NO:**
   - Proceed with caution
   - Verify no regressions after change

---

## ✅ MANDATORY VALIDATION

Before allowing **ANY** change, run these validations:

### 1. `detectChannel()` Behavior
- [ ] Behavior is identical to last-known-good logic
- [ ] Priority order is: REFERRER → `?src=` → `?utm_source=` → USER AGENT → DIRECT
- [ ] All channels are detected correctly
- [ ] No channels are filtered out

### 2. `?src=` Parameter
- [ ] `?src=` parameter is always respected when no external referrer
- [ ] `?src=form`, `?src=chat`, `?src=qr` work correctly
- [ ] `?src=facebook`, `?src=instagram` work correctly

### 3. Leads Table Display
- [ ] All channels are visible in the leads table
- [ ] No channel is mapped to `'כללי'` (General) incorrectly
- [ ] Facebook shows as "פייסבוק", not "כללי"
- [ ] Instagram shows as "אינסטגרם", not "כללי"

### 4. Channel Mapping
- [ ] No channel is mapped to `'other'` unless truly unknown
- [ ] `channelLabels` includes all known channels
- [ ] All channels have proper translations

### 5. Export Functionality
- [ ] Exports do **NOT** downgrade channels to `'other'`
- [ ] Channel values are preserved as-is
- [ ] No normalization that loses channel information

**IF ANY TEST FAILS:**
- **STOP** the operation immediately
- **REJECT** the modification
- **PRINT** the failing area and required correction
- **REQUEST** explicit permission before proceeding

---

## 🚫 NEVER DO

**NEVER:**
- ❌ Remove, rename, or simplify detection logic
- ❌ Introduce fallback lists that ignore channels (like `fallbackSources`)
- ❌ Touch normalized channel flow without explicit approval
- ❌ Change return values that could collapse to `'other'`
- ❌ Add new files that conflict with source detection
- ❌ Modify `submit_lead` function signature
- ❌ Change `channel` column in `leads` table
- ❌ Remove channel labels from `getChannelLabel()`
- ❌ Normalize valid channels to `'other'` in export

---

## ✅ ALWAYS DO

**ALWAYS:**
- ✅ Preserve exact flow: **REFERRER → `?src=` → `?utm_source=` → USER AGENT → DIRECT**
- ✅ Maintain compatibility with historical channel data
- ✅ Respect all existing channel names exactly as stored in database
- ✅ Test all channel detection scenarios before any change
- ✅ Verify leads table displays correctly after any change
- ✅ Check exports preserve channel values after any change
- ✅ Request explicit permission before modifying protected files

---

## 📋 GOLD VERSION DETAILS

**Git Tag:** `v1.0.0-gold-source-tracking`  
**Commit:** `64091ba2b4c98a2ed18b7c9a7407888a98763abf`  
**Date:** 2025-11-15 12:24:31 +0200

**Commit Message:**
```
fix: prioritize external referrer over src parameter to show real source channel (facebook/instagram/etc) instead of form/chat/qr
```

**Previous Commits in Gold Version:**
- `9611ee2` - fix: add all channel labels and translations to display correct channel names instead of 'כללי'
- `0a12fed` - fix: restore full source tracking logic (per 94b6cc1)

---

## 🔍 HOW TO VERIFY GOLD VERSION

To restore the gold version:

```bash
git checkout v1.0.0-gold-source-tracking
```

Or to see what changed:

```bash
git diff v1.0.0-gold-source-tracking HEAD -- ng/src/app/core/services/referral-tracking.service.ts
```

---

## 📞 CONTACT

**For any modifications to protected files:**
- Contact: Rona Arbisman
- Required: Explicit written permission
- Validation: All mandatory tests must pass

---

## 🎯 SUMMARY

**Source Tracking is:**
- ✅ **CRITICAL** — Core business feature
- ✅ **PROTECTED** — Cannot be modified without permission
- ✅ **UNTOUCHABLE** — Must remain stable and functional

**All changes must:**
1. Pass mandatory validation
2. Maintain backward compatibility
3. Preserve all channel detection logic
4. Be approved by Rona Arbisman

---

**END OF PROTECTION RULES**

