Write-Host "=== Checking title issue in suggest-questions ===" -ForegroundColor Green

$SUPABASE_URL = "https://lcazbaggfdejukjgkpeu.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYXpiYWdnZmRlanVramdrcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTE4MjgsImV4cCI6MjA2OTI2NzgyOH0.nRiCK9o830N-ZXvVALxTd2pLkDRQIZ8aCnnlo48IA5M"

Write-Host ""
Write-Host "Testing with explicit businessName to check if title is returned..." -ForegroundColor Cyan

$requestBody = @{
    businessName = "Test Law Office Name"
    occupation = "Lawyer"
    suboccupation = "Real Estate"
    language = "he"
    max = 3
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
    Write-Host "Response analysis:" -ForegroundColor Yellow
    Write-Host "  success: $($response.success)"
    Write-Host "  questionnaire_id: $($response.questionnaire_id)"
    
    if ($response.title) {
        Write-Host "  title: '$($response.title)'" -ForegroundColor Green
        Write-Host ""
        Write-Host "OK: Title IS returned!" -ForegroundColor Green
    } else {
        Write-Host "  title: MISSING!" -ForegroundColor Red
        Write-Host ""
        Write-Host "ISSUE: Title is NOT returned even though businessName='Test Law Office Name'" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possible reasons:" -ForegroundColor Yellow
        Write-Host "  1. questionnaire.title is null/undefined after insert"
        Write-Host "  2. JSON.stringify removes null fields"
        Write-Host "  3. The .select() doesn't return title field"
    }
    
    Write-Host ""
    Write-Host "Full response keys:" -ForegroundColor Gray
    $response.PSObject.Properties.Name | ForEach-Object { Write-Host "  - $_" }
    
} catch {
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Check Complete ===" -ForegroundColor Cyan
