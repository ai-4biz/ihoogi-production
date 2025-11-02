Write-Host "🔍 בדיקה ממוקדת לכפילויות SMS באנגולר" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 בודק קריאות ל-send-sms (Edge Function) והודעות AI מול ברירת מחדל..." -ForegroundColor Cyan
Write-Host ""

$basePath = Join-Path $PSScriptRoot "src\app"

# 1️⃣ חפש את כל המקומות שקוראים לפונקציית send-sms (Edge Function)
Write-Host "1️⃣ מקומות שקוראים ל-send-sms (Edge Function):" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$sendSmsFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.ts", "*.html" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -match "send-sms") {
                $relativePath = $_.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                $lines = Get-Content $_.FullName -ErrorAction SilentlyContinue
                $matches = @()
                
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    if ($lines[$i] -match "send-sms") {
                        $context = ""
                        # Get 2 lines after match
                        for ($j = 0; $j -lt 3 -and ($i + $j) -lt $lines.Count; $j++) {
                            $context += "  Line $($i + $j + 1): $($lines[$i + $j])`n"
                        }
                        $matches += @{
                            Line = $i + 1
                            Context = $context
                        }
                    }
                }
                
                @{
                    File = $relativePath
                    Matches = $matches
                }
            }
        } catch {}
    }

if ($sendSmsFiles) {
    foreach ($file in $sendSmsFiles) {
        Write-Host "📄 $($file.File)" -ForegroundColor White
        foreach ($match in $file.Matches) {
            Write-Host $match.Context -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✅ לא נמצאו קריאות ל-send-sms" -ForegroundColor Green
}

Write-Host ""

# 2️⃣ חפש הודעות טקסט קבועות כמו 'תודה שפניתם'
Write-Host "2️⃣ הודעות טקסט קבועות ('תודה שפניתם'):" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$thankYouFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.ts", "*.html" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -match "תודה שפניתם") {
                $relativePath = $_.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                $lines = Get-Content $_.FullName -ErrorAction SilentlyContinue
                $matches = @()
                
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    if ($lines[$i] -match "תודה שפניתם") {
                        $context = ""
                        # Get 2 lines after match
                        for ($j = -1; $j -lt 3 -and ($i + $j) -ge 0 -and ($i + $j) -lt $lines.Count; $j++) {
                            $marker = if ($j -eq 0) { ">>>" } else { "   " }
                            $context += "$marker Line $($i + $j + 1): $($lines[$i + $j])`n"
                        }
                        $matches += @{
                            Line = $i + 1
                            Context = $context
                        }
                    }
                }
                
                @{
                    File = $relativePath
                    Matches = $matches
                }
            }
        } catch {}
    }

if ($thankYouFiles) {
    foreach ($file in $thankYouFiles) {
        Write-Host "📄 $($file.File)" -ForegroundColor White
        foreach ($match in $file.Matches) {
            Write-Host $match.Context -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✅ לא נמצאו הודעות 'תודה שפניתם'" -ForegroundColor Green
}

Write-Host ""

# 3️⃣ בדוק אם יש שליחה נוספת של SMS בפרונט
Write-Host "3️⃣ קריאות fetch הקשורות ל-SMS:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$fetchSmsFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.ts" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -match "fetch" -and $content -match "sms" -and $content -match "sms" -match "i") {
                $relativePath = $_.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                $lines = Get-Content $_.FullName -ErrorAction SilentlyContinue
                $matches = @()
                
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    $lineLower = $lines[$i].ToLower()
                    if ($lineLower -match "fetch" -and ($lineLower -match "sms" -or $lineLower -match "send.*sms")) {
                        $context = ""
                        for ($j = -1; $j -lt 4 -and ($i + $j) -ge 0 -and ($i + $j) -lt $lines.Count; $j++) {
                            $marker = if ($j -eq 0) { ">>>" } else { "   " }
                            $context += "$marker Line $($i + $j + 1): $($lines[$i + $j])`n"
                        }
                        $matches += @{
                            Line = $i + 1
                            Context = $context
                        }
                    }
                }
                
                if ($matches.Count -gt 0) {
                    @{
                        File = $relativePath
                        Matches = $matches
                    }
                }
            }
        } catch {}
    }

if ($fetchSmsFiles) {
    foreach ($file in $fetchSmsFiles) {
        Write-Host "📄 $($file.File)" -ForegroundColor White
        foreach ($match in $file.Matches) {
            Write-Host $match.Context -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✅ לא נמצאו קריאות fetch הקשורות ל-SMS" -ForegroundColor Green
}

Write-Host ""

# 4️⃣ בדוק אם יש קריאה חוזרת לפונקציה sendSms() או ל-AI אחרי תשובת השרת
Write-Host "4️⃣ קריאות sendSms עם subscribe:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$sendSmsSubscribeFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.ts" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -match "sendSms" -or ($content -match "send.*sms" -and $content -match "subscribe")) {
                $relativePath = $_.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                $lines = Get-Content $_.FullName -ErrorAction SilentlyContinue
                $matches = @()
                
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    if (($lines[$i] -match "sendSms" -or ($lines[$i] -match "send.*sms" -and $lines[$i] -match "subscribe")) -or 
                        ($i -lt $lines.Count - 1 -and $lines[$i] -match "sendSms" -and $lines[$i+1] -match "subscribe")) {
                        $context = ""
                        for ($j = -2; $j -lt 4 -and ($i + $j) -ge 0 -and ($i + $j) -lt $lines.Count; $j++) {
                            $marker = if ($j -eq 0) { ">>>" } else { "   " }
                            $context += "$marker Line $($i + $j + 1): $($lines[$i + $j])`n"
                        }
                        $matches += @{
                            Line = $i + 1
                            Context = $context
                        }
                    }
                }
                
                if ($matches.Count -gt 0) {
                    @{
                        File = $relativePath
                        Matches = $matches
                    }
                }
            }
        } catch {}
    }

if ($sendSmsSubscribeFiles) {
    foreach ($file in $sendSmsSubscribeFiles) {
        Write-Host "📄 $($file.File)" -ForegroundColor White
        foreach ($match in $file.Matches) {
            Write-Host $match.Context -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✅ לא נמצאו קריאות sendSms עם subscribe" -ForegroundColor Green
}

Write-Host ""

# 5️⃣ בדוק אם יש הודעה נפרדת שמופעלת אחרי AI response
Write-Host "5️⃣ הודעות AI עם message:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray

$aiMessageFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.ts" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            # Look for AI-related code with message
            if (($content -match "AI" -or $content -match "generate.*ai" -or $content -match "ai.*response") -and 
                $content -match "message") {
                $relativePath = $_.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                $lines = Get-Content $_.FullName -ErrorAction SilentlyContinue
                $matches = @()
                
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    $lineLower = $lines[$i].ToLower()
                    if (($lineLower -match "ai" -or $lineLower -match "generate") -and $lineLower -match "message") {
                        $context = ""
                        for ($j = -2; $j -lt 4 -and ($i + $j) -ge 0 -and ($i + $j) -lt $lines.Count; $j++) {
                            $marker = if ($j -eq 0) { ">>>" } else { "   " }
                            $context += "$marker Line $($i + $j + 1): $($lines[$i + $j])`n"
                        }
                        $matches += @{
                            Line = $i + 1
                            Context = $context
                        }
                    }
                }
                
                if ($matches.Count -gt 0) {
                    @{
                        File = $relativePath
                        Matches = $matches
                    }
                }
            }
        } catch {}
    }

if ($aiMessageFiles) {
    foreach ($file in $aiMessageFiles) {
        Write-Host "📄 $($file.File)" -ForegroundColor White
        foreach ($match in $file.Matches) {
            Write-Host $match.Context -ForegroundColor Gray
        }
    }
} else {
    Write-Host "  ✅ לא נמצאו הודעות AI עם message" -ForegroundColor Green
}

Write-Host ""
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray
Write-Host "✅ בדיקה הסתיימה." -ForegroundColor Green
Write-Host ""
Write-Host "💡 חפש תוצאות שבהן מופיעות גם קריאת AI וגם טקסט 'תודה שפניתם'" -ForegroundColor Cyan
Write-Host "   באותו קובץ או באותה פונקציה — שם הבעיה." -ForegroundColor Cyan
Write-Host ""
