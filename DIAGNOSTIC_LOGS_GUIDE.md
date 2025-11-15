# 🔍 Diagnostic Logs Guide - Channel Tracking Diagnosis

## 📋 Overview

This document explains the diagnostic logs added to identify why `channel` field is not being saved for WhatsApp, Email, and SMS.

**⚠️ CRITICAL:** These are **temporary diagnostic logs only**. They do NOT modify any existing logic.

---

## 🔍 PHASE 1: Inspect Incoming Production URL

**Location:** `questionnaire-live.ts` & `questionnaire-chat.ts` - `ngOnInit()`

**What it checks:**
- Full URL from browser
- Query parameters (especially `?src=`)
- Warns if `src` parameter is missing

**Console output:**
```
[DIAG] Full URL: https://example.com/q/d_token?src=whatsapp
[DIAG] Query params: { src: 'whatsapp' }
[DIAG] ✅ 'src' parameter found: whatsapp
```

**If `src` is missing:**
```
[DIAG] ⚠️ WARNING: 'src' parameter is MISSING from URL!
```
→ **STOP diagnostics here. Root cause is missing query param.**

---

## 🔍 PHASE 2: Inspect detectChannel() Result

**Location:** `referral-tracking.service.ts` - `detectChannel()`

**What it checks:**
- Final result from `detectChannel()` before return
- Logs at PRIORITY 0 (for WhatsApp/Email/SMS)
- Logs at PRIORITY 5 (fallback to 'direct')

**Console output:**
```
[DIAG] detectChannel() result (PRIORITY 0): whatsapp
```
or
```
[DIAG] detectChannel() final result: direct
```

**Expected values:**
- ✅ `'whatsapp'` / `'email'` / `'sms'` → Good
- ❌ `'form'` / `'chat'` / `'direct'` → Problem in detection

---

## 🔍 PHASE 3: Inspect saveLeadData() Flow

**Location:** `questionnaire-live.ts` & `questionnaire-chat.ts` - `saveLeadData()`

**What it checks:**
- Value of `p_channel` before RPC call
- Warns if `p_channel` is missing or incorrect (`'form'` / `'chat'`)

**Console output:**
```
[DIAG] saveLeadData → p_channel: whatsapp
```

**If incorrect:**
```
[DIAG] ⚠️ WARNING: p_channel is missing or incorrect: form
```
→ **STOP. The failure is before RPC call.**

---

## 🔍 PHASE 4: Inspect submit_lead RPC Call

**Location:** `questionnaire-live.ts` & `questionnaire-chat.ts` - `saveLeadData()`

**What it checks:**
- All parameters sent to `submit_lead` RPC
- Specifically checks `p_channel` value

**Console output:**
```
[DIAG] submit_lead called with: {
  p_questionnaire_id: '...',
  p_client_name: '...',
  p_answer_json: {...},
  p_email: '...',
  p_phone: '...',
  p_name: '...',
  p_distribution_token: '...',
  p_channel: 'whatsapp'  ← Check this value
}
```

**Expected:**
- ✅ `p_channel: 'whatsapp'` / `'email'` / `'sms'` → Good
- ❌ `p_channel: null` / `'form'` / `undefined` → Problem

---

## 🔍 PHASE 5: Inspect SQL-Level p_channel

**Location:** Supabase SQL function - `submit_lead()`

**How to check:**
1. Go to Supabase Dashboard → Logs → Postgres Logs
2. Look for `[DIAG]` messages
3. Or manually add log in SQL function:

```sql
-- Add this inside submit_lead function (temporary)
RAISE NOTICE '[DIAG] p_channel: %', p_channel;
RAISE NOTICE '[DIAG] Inserting lead with channel: %', p_channel;
```

**Expected in Supabase logs:**
```
[DIAG] p_channel: whatsapp
[DIAG] Inserting lead with channel: whatsapp
```

**If missing or wrong:**
→ Problem is in SQL function receiving the parameter

---

## 🔍 PHASE 6: Validate DB Result

**Run this SQL query in Supabase SQL Editor:**

```sql
SELECT 
  id, 
  channel, 
  client_name,
  created_at 
FROM leads 
ORDER BY created_at DESC 
LIMIT 15;
```

**Expected results:**
- ✅ `channel = 'whatsapp'` for WhatsApp leads
- ✅ `channel = 'email'` for Email leads
- ✅ `channel = 'sms'` for SMS leads

**If channel is still `null` or `'form'`:**
→ Problem is in SQL INSERT statement or AFTER INSERT trigger

---

## 🎯 Diagnosis Decision Tree

### **Scenario 1: Missing `src` in URL**
```
[DIAG] ⚠️ WARNING: 'src' parameter is MISSING from URL!
```
**Root Cause:** Link generation in Distribution Hub not working
**Location:** `distribution-hub.component.ts` - `selectSocialNetwork()`

---

### **Scenario 2: detectChannel() returns wrong value**
```
[DIAG] detectChannel() result: form  ← Should be 'whatsapp'
```
**Root Cause:** `detectChannel()` not detecting `?src=whatsapp` correctly
**Location:** `referral-tracking.service.ts` - `detectChannel()`

---

### **Scenario 3: p_channel is wrong before RPC**
```
[DIAG] ⚠️ WARNING: p_channel is missing or incorrect: form
```
**Root Cause:** `detectedChannel` not being passed correctly to `saveLeadData()`
**Location:** `questionnaire-live.ts` / `questionnaire-chat.ts` - `saveLeadData()`

---

### **Scenario 4: RPC receives wrong value**
```
[DIAG] submit_lead called with: { ..., p_channel: null }
```
**Root Cause:** Parameter not being sent correctly to RPC
**Location:** `questionnaire-live.ts` / `questionnaire-chat.ts` - RPC call

---

### **Scenario 5: SQL function doesn't receive value**
```
[DIAG] p_channel: null  ← In Supabase logs
```
**Root Cause:** SQL function signature mismatch or parameter not passed
**Location:** `create_submit_response_function.sql` - `submit_lead()` function

---

### **Scenario 6: INSERT doesn't save value**
```
-- SQL query shows: channel = null (even though p_channel was 'whatsapp')
```
**Root Cause:** SQL INSERT statement or AFTER INSERT trigger overriding value
**Location:** `create_submit_response_function.sql` - INSERT statement, or database triggers

---

## 📊 Complete Flow with Diagnostic Points

```
1. User clicks link with ?src=whatsapp
   ↓
2. [PHASE 1] ✅ URL contains ?src=whatsapp
   ↓
3. detectChannel() called
   ↓
4. [PHASE 2] ✅ detectChannel() returns 'whatsapp'
   ↓
5. saveLeadData() called with detectedChannel = 'whatsapp'
   ↓
6. [PHASE 3] ✅ p_channel = 'whatsapp'
   ↓
7. submit_lead RPC called
   ↓
8. [PHASE 4] ✅ RPC receives p_channel: 'whatsapp'
   ↓
9. SQL function submit_lead() called
   ↓
10. [PHASE 5] ✅ SQL receives p_channel: 'whatsapp'
   ↓
11. INSERT INTO leads (..., channel, ...)
   ↓
12. [PHASE 6] ✅ DB shows channel = 'whatsapp'
```

---

## ⚠️ Important Notes

1. **These logs are TEMPORARY** - Remove after diagnosis
2. **Do NOT modify any existing logic** - Only added logs
3. **Do NOT touch working channels** - Only diagnose WhatsApp/Email/SMS
4. **Stop at first failure** - Don't continue if earlier phase fails

---

## 🚀 Next Steps After Diagnosis

Once we identify where the chain breaks:
1. Report the failing phase
2. Wait for instructions to fix
3. Fix ONLY the identified issue
4. Remove diagnostic logs
5. Verify fix works

---

**All diagnostic logs are color-coded for easy identification in browser console:**
- 🟢 Green: URL inspection (PHASE 1)
- 🔵 Blue: Channel detection (PHASE 2)
- 🟠 Orange: Before RPC call (PHASE 3)
- 🔴 Pink: RPC call parameters (PHASE 4)
- ⚠️ Red warnings: Problems detected

