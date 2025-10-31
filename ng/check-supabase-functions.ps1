Write-Host "Starting comprehensive Supabase and Edge Functions check" -ForegroundColor Green

# Try both URLs - user provided and from environment
$SUPABASE_URL_NEW = "https://hzukdzhhjpikmzgxrge.supabase.co"  # Fixed typo (added x)
$SUPABASE_URL = "https://lcazbaggfdejukjgkpeu.supabase.co"  # From environment.ts

# Try both keys - user provided and from environment
$SUPABASE_KEY_USER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dWtkemhoanBpa216Z2t4cmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjg4MTcsImV4cCI6MjA2Mzg0NDgxN30.ITGXIpZCVOMk_sZN1iidpGv2asiVfa_cVuHayBkppwI"
$SUPABASE_KEY_ENV = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYXpiYWdnZmRlanVramdrcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTE4MjgsImV4cCI6MjA2OTI2NzgyOH0.nRiCK9o830N-ZXvVALxTd2pLkDRQIZ8aCnnlo48IA5M"

Write-Host ""
Write-Host "Testing Supabase URLs..." -ForegroundColor Cyan
Write-Host "  URL 1 (from env): $SUPABASE_URL" -ForegroundColor Gray
Write-Host "  URL 2 (user provided): $SUPABASE_URL_NEW" -ForegroundColor Gray

# Try different URL+Key combinations
$ACTIVE_URL = $null
$ACTIVE_KEY = $null

# Test URL1 with Key1 (env key)
Write-Host ""
Write-Host "Testing URL 1 with Key from env..." -ForegroundColor Cyan
try {
  $headers = @{
    "apikey" = $SUPABASE_KEY_ENV
    "Authorization" = "Bearer $SUPABASE_KEY_ENV"
  }
  $response = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/" -Method Get -Headers $headers -ErrorAction Stop
  Write-Host "OK: URL 1 + Key ENV working!" -ForegroundColor Green
  $ACTIVE_URL = $SUPABASE_URL
  $ACTIVE_KEY = $SUPABASE_KEY_ENV
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  Write-Host "URL 1 + Key ENV: $statusCode" -ForegroundColor Yellow
  
  # Test URL2 with Key2 (user key)
  Write-Host ""
  Write-Host "Testing URL 2 with Key from user..." -ForegroundColor Cyan
  try {
    $headers = @{
      "apikey" = $SUPABASE_KEY_USER
      "Authorization" = "Bearer $SUPABASE_KEY_USER"
    }
    $response = Invoke-RestMethod -Uri "$SUPABASE_URL_NEW/rest/v1/" -Method Get -Headers $headers -ErrorAction Stop
    Write-Host "OK: URL 2 + Key USER working!" -ForegroundColor Green
    $ACTIVE_URL = $SUPABASE_URL_NEW
    $ACTIVE_KEY = $SUPABASE_KEY_USER
  } catch {
    $statusCode2 = $_.Exception.Response.StatusCode.value__
    Write-Host "ERROR: Both combinations failed" -ForegroundColor Red
    Write-Host "  URL1+KeyENV: $statusCode" -ForegroundColor Yellow
    Write-Host "  URL2+KeyUSER: $statusCode2" -ForegroundColor Yellow
    Write-Host "Please verify URLs and API keys match correctly" -ForegroundColor Yellow
    exit 1
  }
}

Write-Host ""
Write-Host "Testing function: generate-ai-response..." -ForegroundColor Cyan
try {
  $testBody = @{
    mainCategory = "General Business"
    subcategory = "Professional Services"
    businessDescription = "Test from Rona health check"
    websiteUrl = ""
    socialMediaLinks = ""
    clientAnswers = "Test ping from Rona"
    emailLength = "short"
  } | ConvertTo-Json
  
  $headers = @{
    "Content-Type" = "application/json"
    "apikey" = $ACTIVE_KEY
    "Authorization" = "Bearer $ACTIVE_KEY"
  }
  
  $aiResponse = Invoke-RestMethod -Uri "$ACTIVE_URL/functions/v1/generate-ai-response" `
    -Method Post -Body $testBody -Headers $headers -ErrorAction Stop
  
  if ($aiResponse.email -and $aiResponse.message) {
    Write-Host "OK: generate-ai-response returned successfully!" -ForegroundColor Green
    Write-Host "   Email preview: $($aiResponse.email.Substring(0, [Math]::Min(80, $aiResponse.email.Length)))..." -ForegroundColor Gray
    Write-Host "   Message preview: $($aiResponse.message.Substring(0, [Math]::Min(80, $aiResponse.message.Length)))..." -ForegroundColor Gray
  } else {
    Write-Host "WARNING: generate-ai-response returned but missing expected fields" -ForegroundColor Yellow
    Write-Host "   Response: $($aiResponse | ConvertTo-Json -Compress)" -ForegroundColor Gray
  }
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  Write-Host "ERROR: generate-ai-response failed - Code: $statusCode - Message: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing function: suggest-questions..." -ForegroundColor Cyan
try {
  $questionsBody = @{
    businessName = "Law Office"
    occupation = "Lawyer"
    suboccupation = "Real Estate"
    language = "he"
    max = 5
  } | ConvertTo-Json -Depth 3
  
  $headers = @{
    "Content-Type" = "application/json"
    "apikey" = $ACTIVE_KEY
    "Authorization" = "Bearer $ACTIVE_KEY"
  }
  
  $questionsResponse = Invoke-RestMethod -Uri "$ACTIVE_URL/functions/v1/suggest-questions" `
    -Method Post -Body $questionsBody -Headers $headers -ErrorAction Stop
  
  if ($questionsResponse.questions -and $questionsResponse.questions.Count -gt 0) {
    Write-Host "OK: suggest-questions returned successfully!" -ForegroundColor Green
    Write-Host "   Number of questions generated: $($questionsResponse.questions.Count)" -ForegroundColor Gray
    $firstQ = $questionsResponse.questions[0]
    if ($firstQ) {
      $qText = if ($firstQ.question) { $firstQ.question } elseif ($firstQ.text) { $firstQ.text } else { $firstQ.ToString() }
      Write-Host "   First question: $($qText.Substring(0, [Math]::Min(60, $qText.Length)))..." -ForegroundColor Gray
    }
  } elseif ($questionsResponse.questions) {
    Write-Host "OK: suggest-questions returned successfully (array format)!" -ForegroundColor Green
    Write-Host "   Response type: $($questionsResponse.GetType().Name)" -ForegroundColor Gray
  } else {
    Write-Host "WARNING: suggest-questions returned but no questions found" -ForegroundColor Yellow
    Write-Host "   Response: $($questionsResponse | ConvertTo-Json -Compress -Depth 3)" -ForegroundColor Gray
  }
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  Write-Host "ERROR: suggest-questions failed - Code: $statusCode - Message: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "All checks completed - if you see OK messages, everything is working!" -ForegroundColor Cyan