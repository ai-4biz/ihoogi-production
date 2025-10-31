Write-Host "🔎 Angular SMS Duplicate Check Script" -ForegroundColor Green
Write-Host "-------------------------------------------------" -ForegroundColor Gray
Write-Host "Purpose: Check for duplicate SMS send calls in Angular app" -ForegroundColor Cyan
Write-Host "Warning: Script is for checking only - does not modify code" -ForegroundColor Yellow
Write-Host ""

$pathsToScan = @("src\app", "src\services", "src\environments")
$patterns = @(
    "fetch(",
    "sendSms",
    "sms",
    "onSubmit",
    "(click)",
    "(submit)",
    "ngOnInit",
    "retry",
    "setTimeout",
    "subscribe"
)

$foundIssues = @()

# Function to search for pattern in files
function Search-Pattern {
    param(
        [string]$Pattern,
        [string[]]$Paths
    )
    
    Write-Host "🔍 Searching for occurrences of '$Pattern'..." -ForegroundColor Cyan
    
    $results = @()
    
    foreach ($path in $Paths) {
        $fullPath = Join-Path $PSScriptRoot $path
        
        if (-not (Test-Path $fullPath)) {
            Write-Host "  ⚠️ Path not found: $fullPath" -ForegroundColor Yellow
            continue
        }
        
        # Search in TypeScript and HTML files
        $files = Get-ChildItem -Path $fullPath -Recurse -Include "*.ts", "*.html" -ErrorAction SilentlyContinue
        
        foreach ($file in $files) {
            try {
                $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
                if ($content -match [regex]::Escape($Pattern)) {
                    $lines = Get-Content $file.FullName -ErrorAction SilentlyContinue
                    $lineNumbers = @()
                    
                    for ($i = 0; $i -lt $lines.Count; $i++) {
                        if ($lines[$i] -match [regex]::Escape($Pattern)) {
                            $lineNumbers += ($i + 1)
                        }
                    }
                    
                    $relativePath = $file.FullName.Replace($PSScriptRoot, "").TrimStart("\")
                    $results += @{
                        File = $relativePath
                        Lines = $lineNumbers
                        Count = $lineNumbers.Count
                    }
                }
            } catch {
                # Skip files that can't be read
            }
        }
    }
    
    if ($results.Count -gt 0) {
        Write-Host "  Found in $($results.Count) file(s):" -ForegroundColor Yellow
        foreach ($result in $results) {
            $linesStr = $result.Lines -join ", "
            Write-Host "    📄 $($result.File) (lines: $linesStr)" -ForegroundColor White
            if ($result.Count -gt 1) {
                Write-Host "      ⚠️ Multiple occurrences in same file!" -ForegroundColor Red
                $script:foundIssues += "Multiple '$Pattern' in $($result.File)"
            }
        }
    } else {
        Write-Host "  ✅ No occurrences found." -ForegroundColor Green
    }
    
    Write-Host ""
    
    return $results
}

# Run search for each pattern
foreach ($pattern in $patterns) {
    Search-Pattern -Pattern $pattern -Paths $pathsToScan
}

# Specific check for SMS-related functions
Write-Host "🎯 Specific SMS Function Checks:" -ForegroundColor Cyan
Write-Host ""

# Check for sendSms function calls
$smsFiles = Get-ChildItem -Path (Join-Path $PSScriptRoot "src") -Recurse -Include "*.ts", "*.html" -ErrorAction SilentlyContinue | 
    Where-Object {
        try {
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            return $content -match "sendSms|send.*sms|sms.*send" -or $content -match "fetch.*sms|sms.*fetch"
        } catch {
            return $false
        }
    }

if ($smsFiles) {
    Write-Host "  Files containing SMS-related code:" -ForegroundColor Yellow
    foreach ($file in $smsFiles) {
        $relativePath = $file.FullName.Replace($PSScriptRoot, "").TrimStart("\")
        Write-Host "    📄 $relativePath" -ForegroundColor White
        
        # Check for potential duplicates - multiple calls in same file
        try {
            $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
            $lines = Get-Content $file.FullName -ErrorAction SilentlyContinue
            
            # Count occurrences of common SMS sending patterns
            $patternsToCheck = @("sendSms", "\.fetch\(", "subscribe\(", "onSubmit")
            foreach ($checkPattern in $patternsToCheck) {
                $matches = [regex]::Matches($content, $checkPattern)
                if ($matches.Count -gt 1) {
                    Write-Host "      ⚠️ '$checkPattern' appears $($matches.Count) times!" -ForegroundColor Red
                    $script:foundIssues += "Multiple '$checkPattern' calls in $relativePath"
                }
            }
        } catch {}
    }
} else {
    Write-Host "  ✅ No SMS-related code found in scanned files." -ForegroundColor Green
}

Write-Host ""

# Summary
Write-Host "---------------------------------------------------" -ForegroundColor Gray
if ($foundIssues.Count -gt 0) {
    Write-Host "⚠️ Potential Issues Found:" -ForegroundColor Red
    foreach ($issue in $foundIssues) {
        Write-Host "  - $issue" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "💡 Recommendation: Review these files for duplicate calls" -ForegroundColor Cyan
} else {
    Write-Host "✅ No obvious duplicate patterns found in code structure" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 Note: This doesn't guarantee no duplicates at runtime" -ForegroundColor Yellow
    Write-Host "   Add logging to verify actual execution" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💡 Tip for real-time testing:" -ForegroundColor Cyan
Write-Host "Add this at the start of your SMS send function:" -ForegroundColor Gray
Write-Host ""
Write-Host '  console.log("🔥 SEND_SMS called at:", new Date().toISOString());' -ForegroundColor White
Write-Host ""
Write-Host "Then run the app and check the console:" -ForegroundColor Gray
Write-Host "  - If you see the same log twice → duplicate call from Frontend" -ForegroundColor Yellow
Write-Host "  - If once → duplication is on server or provider API" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
