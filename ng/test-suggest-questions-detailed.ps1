Write-Host "=== Detailed suggest-questions Test ===" -ForegroundColor Green

$SUPABASE_URL = "https://lcazbaggfdejukjgkpeu.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYXpiYWdnZmRlanVramdrcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTE4MjgsImV4cCI6MjA2OTI2NzgyOH0.nRiCK9o830N-ZXvVALxTd2pLkDRQIZ8aCnnlo48IA5M"

Write-Host ""
Write-Host "Expected format according to Supabase code:" -ForegroundColor Cyan
Write-Host '  Response should contain:'
Write-Host '    - success: true/false'
Write-Host '    - questionnaire_id: string'
Write-Host '    - title: string'
Write-Host '    - questions: array with objects containing:'
Write-Host '        * id: string'
Write-Host '        * text: string'
Write-Host '        * type: string'
Write-Host '        * isRequired: boolean'
Write-Host '        * options: array (optional)'

Write-Host ""
Write-Host "Sending request to function..." -ForegroundColor Cyan

$requestBody = @{
    businessName = "Law Office"
    occupation = "Lawyer"
    suboccupation = "Real Estate"
    language = "he"
    max = 5
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
    "apikey" = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
}

try {
    $response = Invoke-RestMethod -Uri "$SUPABASE_URL/functions/v1/suggest-questions" `
        -Method Post -Body $requestBody -Headers $headers -ErrorAction Stop
    
    Write-Host ""
    Write-Host "Response received successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Full response (JSON):" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    Write-Host ""
    Write-Host "Structure analysis:" -ForegroundColor Cyan
    
    # Check top-level fields
    Write-Host ""
    Write-Host "  Top-level fields:" -ForegroundColor Gray
    $topLevelFields = $response.PSObject.Properties.Name
    $topLevelFields | ForEach-Object { Write-Host "    - $_" -ForegroundColor White }
    
    # Check success
    if ($response.success -ne $null) {
        Write-Host "    OK: success = $($response.success)" -ForegroundColor Green
    } else {
        Write-Host "    ERROR: success field missing!" -ForegroundColor Red
    }
    
    # Check questionnaire_id
    if ($response.questionnaire_id) {
        Write-Host "    OK: questionnaire_id = $($response.questionnaire_id)" -ForegroundColor Green
    } else {
        Write-Host "    ERROR: questionnaire_id missing!" -ForegroundColor Red
    }
    
    # Check title
    if ($response.title) {
        Write-Host "    OK: title = $($response.title)" -ForegroundColor Green
    } else {
        Write-Host "    WARNING: title missing (not required but recommended)" -ForegroundColor Yellow
    }
    
    # Check questions
    Write-Host ""
    Write-Host "  Questions array:" -ForegroundColor Gray
    if ($response.questions) {
        Write-Host "    OK: questions found (count: $($response.questions.Count))" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "  Checking each question:" -ForegroundColor Cyan
        for ($i = 0; $i -lt $response.questions.Count; $i++) {
            $q = $response.questions[$i]
            Write-Host ""
            Write-Host "    Question #$($i + 1):" -ForegroundColor Yellow
            
            if ($q.id) {
                Write-Host "      OK: id = $($q.id)" -ForegroundColor Green
            } else {
                Write-Host "      ERROR: id missing!" -ForegroundColor Red
            }
            
            if ($q.text) {
                $preview = $q.text.Substring(0, [Math]::Min(50, $q.text.Length))
                Write-Host "      OK: text = $preview..." -ForegroundColor Green
            } elseif ($q.question) {
                $preview = $q.question.Substring(0, [Math]::Min(50, $q.question.Length))
                Write-Host "      WARNING: question (old field) = $preview..." -ForegroundColor Yellow
            } else {
                Write-Host "      ERROR: text/question missing!" -ForegroundColor Red
            }
            
            if ($q.type) {
                Write-Host "      OK: type = $($q.type)" -ForegroundColor Green
            } else {
                Write-Host "      ERROR: type missing!" -ForegroundColor Red
            }
            
            if ($q.isRequired -ne $null) {
                Write-Host "      OK: isRequired = $($q.isRequired)" -ForegroundColor Green
            } else {
                Write-Host "      WARNING: isRequired missing (default: false)" -ForegroundColor Yellow
            }
            
            if ($q.options) {
                Write-Host "      OK: options found ($($q.options.Count) options)" -ForegroundColor Green
                $q.options | ForEach-Object { Write-Host "        - $_" -ForegroundColor Gray }
            } elseif ($q.type -match "choice") {
                Write-Host "      ERROR: options missing but type=$($q.type) requires options!" -ForegroundColor Red
            } else {
                Write-Host "      INFO: options not required (type=$($q.type))" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "    ERROR: questions missing or empty!" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Summary:" -ForegroundColor Cyan
    $hasSuccess = $response.success -eq $true
    $hasQuestionnaireId = $null -ne $response.questionnaire_id
    $hasQuestions = ($response.questions -and $response.questions.Count -gt 0)
    
    if ($hasSuccess -and $hasQuestionnaireId -and $hasQuestions) {
        Write-Host "  OK: Function returns all required fields!" -ForegroundColor Green
    } else {
        Write-Host "  WARNING: Issues with response structure:" -ForegroundColor Yellow
        if (-not $hasSuccess) { Write-Host "    - success missing or false" -ForegroundColor Red }
        if (-not $hasQuestionnaireId) { Write-Host "    - questionnaire_id missing" -ForegroundColor Red }
        if (-not $hasQuestions) { Write-Host "    - questions missing or empty" -ForegroundColor Red }
    }
    
} catch {
    Write-Host ""
    Write-Host "ERROR calling function:" -ForegroundColor Red
    Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "  Message: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "  Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan