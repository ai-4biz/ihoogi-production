# 🚨 MERGE SAFETY CHECK — DO NOT CONTINUE 🚨

**GOLDEN CORE VERSION:** `v1.0.0-gold-source-tracking`  
**Date:** 2025-11-15  
**Status:** CRITICAL PROTECTION ACTIVE

---

## ⛔ STOP AND RUN THIS CHECKLIST

**Before applying ANY merge, rebase, conflict resolution, overwrite, or auto-fix:**

This project contains a **GOLDEN CORE** that must **NEVER** be overridden, changed, deleted, simplified, or replaced.

---

## ======================= GOLDEN CORE =======================

The following files and logic are **PROTECTED** and must **NEVER** be modified:

### 1. Source Detection Logic
**File:** `ng/src/app/core/services/referral-tracking.service.ts`
- Function: `detectChannel()`
- Function: `normalizeSource(source: string)`
- Function: `isFromSource(hostname: string, sources: string[])`
- Function: `detectFromUserAgent(): string | null`
- Function: `getTrackingParams()`

### 2. Questionnaire Live Integration
**File:** `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`
- Line 76: `this.detectedChannel = this.referralTracking.detectChannel();`
- Line 379: `p_channel: this.detectedChannel`
- Property: `private detectedChannel: string = 'direct';`

### 3. Questionnaire Chat Integration
**File:** `ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts`
- Line 88: `this.detectedChannel = this.referralTracking.detectChannel();`
- Line 1039: `p_channel: this.detectedChannel`
- Property: `private detectedChannel: string = 'direct';`

### 4. Supabase Function
**File:** `supabase/create_submit_response_function.sql`
- Function: `submit_lead(p_channel TEXT DEFAULT NULL)`
- Column: `channel` in `leads` table

### 5. Distribution Hub Link Builder
**File:** `ng/src/app/pages/distribution-hub/distribution-hub.component.ts`
- Lines 311-313: Link generation with `?src=form`, `?src=chat`, `?src=qr`
- Line 789: `urlWithTracking = ... + 'src=${network}'`
- Lines 945-949: Distribution token URLs with `?src=` parameter

### 6. Leads Channel Label Mapping
**File:** `ng/src/app/pages/leads/leads.component.ts`
- Function: `getChannelLabel(channel: string): string`
- Dictionary: `channelLabels` (all channel mappings)
- Handling: `referral-*` channels

### 7. Leads Export Function
**File:** `ng/src/app/pages/leads/leads.component.ts`
- Function: `prepareLeadForExport()`
- Line 264: `const normalizedChannel = lead.channel || 'unknown';`
- **MUST PRESERVE** channel value as-is

### 8. Language Service Translations
**File:** `ng/src/app/core/services/language.service.ts`
- All `leads.channel*` translation keys
- Hebrew and English translations for all channels

---

## ✅ BEFORE MERGING — MANDATORY CHECKLIST

### Step 1: Compare Both Branches

**Compare the target branch with the source branch and ensure NONE of the GOLDEN CORE files have:**

- ❌ **Deletions** — No functions or code removed
- ❌ **Refactors** — No logic restructuring
- ❌ **Renames** — No function or variable name changes
- ❌ **Fallback lists** — No `fallbackSources` or similar filters
- ❌ **New logic overriding SRC** — No changes to `?src=` parameter handling
- ❌ **Normalizations forcing "other"** — No channel downgrading to `'other'`
- ❌ **Missing channels** — No channel labels removed
- ❌ **Removed return values** — No channel detection paths removed
- ❌ **Priority order changes** — Detection order must remain: REFERRER → `?src=` → `?utm_source=` → USER AGENT → DIRECT

---

### Step 2: If ANY Difference Detected

**If ANY difference is detected in the GOLDEN CORE:**

```
🚨 STOP THE MERGE IMMEDIATELY 🚨

❌ MERGE BLOCKED: Attempt to override SOURCE TRACKING GOLDEN CORE.

Protected file: <file_path>
Protected function: <function_name>
Change type: <deletion/refactor/rename/etc>

Required action:
1. REJECT the merge/rebase/change
2. Contact Rona Arbisman for explicit permission
3. Review changes with source tracking expert
4. Do NOT proceed without approval
```

**Actions:**
1. **STOP** the merge immediately
2. **REJECT** incoming changes to protected files
3. **PRINT** clear warning with file path and change type
4. **REQUEST** explicit approval from Rona Arbisman
5. **DO NOT** apply auto-merge fixes

---

### Step 3: Only If ALL Files Match

**Only if ALL files match the last stable version exactly:**

- ✅ Allow merge to continue
- ✅ **NEVER** apply auto-merge fixes inside these files
- ✅ **NEVER** accept incoming changes without explicit approval
- ✅ Verify no indirect changes (imports, dependencies, etc.)

---

### Step 4: For Conflicts

**If merge conflicts occur in GOLDEN CORE files:**

- ✅ **ALWAYS KEEP** the GOLDEN CORE version (current/main branch)
- ❌ **ALWAYS REJECT** the incoming version
- ⚠️ **NEVER** auto-resolve conflicts in protected files
- 📞 **REQUIRED:** Contact Rona Arbisman for conflict resolution

**Conflict Resolution Rule:**
```
CONFLICT in protected file: <file_path>
→ KEEP: GOLDEN CORE version (main branch)
→ REJECT: Incoming changes
→ ACTION: Manual review required by Rona Arbisman
```

---

### Step 5: After Merge — Validation

**After merge completes, run this validation:**

#### a. `detectChannel()` Returns Direct SRC Value
```typescript
// Test: ?src=form should return 'form' (when no external referrer)
// Test: ?src=facebook should return 'facebook' (when no external referrer)
// Test: Facebook referrer should return 'facebook' (even with ?src=form)
```

#### b. `?src=form/chat/qr` Preserved
```typescript
// Test: Distribution links still contain ?src=form, ?src=chat, ?src=qr
// Test: These parameters are passed correctly to detectChannel()
```

#### c. All Known Channels Appear in Leads Table
```typescript
// Test: Facebook shows as "פייסבוק" (not "כללי" or "other")
// Test: Instagram shows as "אינסטגרם" (not "כללי" or "other")
// Test: All channels have proper labels
```

#### d. None Collapse to "other"
```typescript
// Test: No valid channel is mapped to 'other' incorrectly
// Test: getChannelLabel() preserves all channel names
// Test: prepareLeadForExport() doesn't normalize to 'other'
```

#### e. Export Preserves Real Channel
```typescript
// Test: Excel export shows correct channel names
// Test: No channel downgrading during export
// Test: All channels exported as-is
```

**If ANY validation fails:**
- **ROLLBACK** the merge immediately
- **RESTORE** from `v1.0.0-gold-source-tracking` tag
- **INVESTIGATE** what caused the failure
- **FIX** before allowing merge to continue

---

## 🔍 HOW TO COMPARE BRANCHES

### Before Merging Branch `feature-x` into `main`:

```bash
# Compare GOLDEN CORE files between branches
git diff main feature-x -- ng/src/app/core/services/referral-tracking.service.ts
git diff main feature-x -- ng/src/app/pages/questionnaire-live/questionnaire-live.ts
git diff main feature-x -- ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts
git diff main feature-x -- ng/src/app/pages/distribution-hub/distribution-hub.component.ts
git diff main feature-x -- ng/src/app/pages/leads/leads.component.ts
git diff main feature-x -- ng/src/app/core/services/language.service.ts
git diff main feature-x -- supabase/create_submit_response_function.sql
```

### Check for Specific Issues:

```bash
# Check for fallback lists
git diff main feature-x | grep -i "fallback"

# Check for 'other' normalization
git diff main feature-x | grep -i "other"

# Check for channel deletions
git diff main feature-x | grep -i "channel.*="

# Check for src parameter changes
git diff main feature-x | grep -i "src.*="
```

---

## 📋 GOLD VERSION REFERENCE

**Tag:** `v1.0.0-gold-source-tracking`  
**Commit:** `64091ba2b4c98a2ed18b7c9a7407888a98763abf`  
**Date:** 2025-11-15 12:24:31 +0200

**To restore gold version:**
```bash
git checkout v1.0.0-gold-source-tracking -- ng/src/app/core/services/referral-tracking.service.ts
```

**To compare current state with gold:**
```bash
git diff v1.0.0-gold-source-tracking HEAD -- ng/src/app/core/services/referral-tracking.service.ts
```

---

## 🛡️ AUTOMATED PROTECTION

### For Cursor/IDE Integration:

Add this to `.cursorrules` or project settings:

```
SOURCE_TRACKING_PROTECTED_FILES:
- ng/src/app/core/services/referral-tracking.service.ts
- ng/src/app/pages/questionnaire-live/questionnaire-live.ts
- ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts
- ng/src/app/pages/distribution-hub/distribution-hub.component.ts
- ng/src/app/pages/leads/leads.component.ts
- ng/src/app/core/services/language.service.ts
- supabase/create_submit_response_function.sql

BEFORE_MODIFYING_PROTECTED_FILES:
1. Check if change affects detectChannel() logic
2. Check if change affects channel mapping
3. Check if change affects export functionality
4. If YES → BLOCK and request explicit permission
5. If NO → Proceed with caution

GOLD_VERSION_REFERENCE:
- Tag: v1.0.0-gold-source-tracking
- Commit: 64091ba2b4c98a2ed18b7c9a7407888a98763abf
```

---

## 📞 CONTACT

**For merge conflicts or changes to GOLDEN CORE:**
- **Contact:** Rona Arbisman
- **Required:** Explicit written permission
- **Validation:** All mandatory checks must pass

---

## ✅ SUMMARY

**MERGE SAFETY RULES:**
1. ✅ Always compare GOLDEN CORE files before merge
2. ✅ Block merge if ANY differences found
3. ✅ Keep GOLDEN CORE version in conflicts
4. ✅ Validate after merge completes
5. ✅ Rollback if validation fails

**PROTECTED FOREVER:**
- Source tracking detection logic
- Channel mapping and display
- Export functionality
- All integration points

---

**THIS IS A PERMANENT RULESET. Do not override it unless instructed explicitly by Rona Arbisman.**

---

**END OF MERGE SAFETY CHECK**

