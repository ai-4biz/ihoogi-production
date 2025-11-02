Write-Host "Checking for duplicate calls to on-new-lead Edge Function" -ForegroundColor Green
Write-Host ""

# Load environment variables from environment.ts
$envFile = "src/environments/environment.ts"
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: environment.ts file not found!" -ForegroundColor Red
    exit 1
}

$content = Get-Content $envFile -Raw -Encoding UTF8
if ($content -match "supabaseUrl:\s*'([^']+)'") { 
    $SUPABASE_URL = $matches[1] 
}
if ($content -match "supabaseAnonKey:\s*'([^']+)'") { 
    $SUPABASE_KEY = $matches[1] 
}

if (-not $SUPABASE_URL -or -not $SUPABASE_KEY) {
    Write-Host "ERROR: Missing Supabase URL or Key in environment.ts" -ForegroundColor Red
    exit 1
}

Write-Host "Supabase URL: $SUPABASE_URL" -ForegroundColor Cyan
Write-Host ""

# Check Frontend files for manual calls to on-new-lead
Write-Host "1. Checking Frontend for manual calls to on-new-lead..." -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$frontendFiles = @(
    "src/app/pages/questionnaire-live/questionnaire-live.ts",
    "src/app/pages/questionnaire-chat/questionnaire-chat.ts"
)

$foundDuplicates = $false

foreach ($file in $frontendFiles) {
    if (Test-Path $file) {
        $fileContent = Get-Content $file -Raw -Encoding UTF8
        
        if ($fileContent -match "triggerAutomation|on-new-lead|functions\.invoke.*on-new-lead") {
            Write-Host "WARNING: Found in file: $file" -ForegroundColor Red
            $foundDuplicates = $true
            
            # Find line numbers
            $lines = Get-Content $file -ErrorAction SilentlyContinue
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match "triggerAutomation|on-new-lead") {
                    Write-Host "   Line $($i + 1): $($lines[$i].Trim())" -ForegroundColor Yellow
                }
            }
        } else {
            Write-Host "OK: Not found in file: $file" -ForegroundColor Green
        }
    } else {
        Write-Host "WARNING: File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host ""

# Check if Database Trigger exists
Write-Host "2. Checking Database Trigger..." -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

if (Test-Path "..\supabase\setup-leads-webhook.sql") {
    $triggerFile = Get-Content "..\supabase\setup-leads-webhook.sql" -Raw -Encoding UTF8
    if ($triggerFile -match "on_lead_insert_trigger|handle_new_lead") {
        Write-Host "OK: Database Trigger exists in setup-leads-webhook.sql" -ForegroundColor Green
        Write-Host "   This means on-new-lead is called automatically when a lead is created" -ForegroundColor Gray
    } else {
        Write-Host "WARNING: Database Trigger not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "WARNING: File setup-leads-webhook.sql not found" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host ""

if ($foundDuplicates) {
    Write-Host "ERROR: Found manual calls to on-new-lead in Frontend!" -ForegroundColor Red
    Write-Host "   This causes duplicates because:" -ForegroundColor Yellow
    Write-Host "   1. Database Trigger calls on-new-lead automatically" -ForegroundColor Yellow
    Write-Host "   2. Frontend calls on-new-lead manually -> duplicate!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "SOLUTION: Remove manual calls (triggerAutomation) from Frontend" -ForegroundColor Cyan
} else {
    Write-Host "OK: No additional manual calls found" -ForegroundColor Green
    Write-Host "   (but check files manually to be sure)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Check completed" -ForegroundColor Green
