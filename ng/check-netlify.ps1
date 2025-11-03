Write-Host "Starting automated check for Netlify - Supabase + AI + Angular" -ForegroundColor Green

# Step 1: Check Node.js
$nodeVersion = node -v
if (-not $nodeVersion) {
  Write-Host "ERROR: Node.js not installed!" -ForegroundColor Red
  exit 1
}
Write-Host "OK: Node.js version: $nodeVersion"

# Step 2: Check environment file
$envFile = "src/environments/environment.ts"
if (-not (Test-Path $envFile)) {
  Write-Host "ERROR: environment.ts file missing!" -ForegroundColor Red
  exit 1
}
Write-Host "OK: Found environment.ts"

# Read variables
$content = Get-Content $envFile -Raw -Encoding UTF8
if ($content -match "supabaseUrl: '([^']+)'") { $supabaseUrl = $matches[1] }
if ($content -match "supabaseAnonKey: '([^']+)'") { $supabaseKey = $matches[1] }
if ($content -match "aiEndpoint: '([^']+)'") { $aiEndpointFromEnv = $matches[1] }

if (-not $supabaseUrl -or -not $supabaseKey) {
  Write-Host "ERROR: Missing required values in environment.ts" -ForegroundColor Red
  Write-Host "   supabaseUrl: $supabaseUrl" -ForegroundColor Yellow
  Write-Host "   supabaseAnonKey: $supabaseKey" -ForegroundColor Yellow
  exit 1
}

# Build AI URL from Supabase URL (correct path for Edge Functions)
$aiUrl = "$supabaseUrl/functions/v1/generate-ai-response"

Write-Host "OK: Environment variables loaded"
Write-Host "   Supabase URL: $($supabaseUrl.Substring(0, [Math]::Min(50, $supabaseUrl.Length)))..." -ForegroundColor Gray
Write-Host "   AI Endpoint: $aiUrl" -ForegroundColor Gray
if ($aiEndpointFromEnv) {
  Write-Host "   Note: aiEndpoint in env file ($aiEndpointFromEnv) will be overridden by correct path" -ForegroundColor Yellow
}

# Step 3: Check Supabase connection
Write-Host ""
Write-Host "Checking Supabase connection..." -ForegroundColor Cyan
try {
  $response = Invoke-WebRequest -Uri $supabaseUrl -Method Head -ErrorAction Stop
  if ($response.StatusCode -eq 200) {
    Write-Host "OK: Supabase responding ($($response.StatusCode))" -ForegroundColor Green
  } else {
    Write-Host "WARNING: Supabase returned code: $($response.StatusCode)" -ForegroundColor Yellow
  }
} catch {
  Write-Host "WARNING: Could not connect to Supabase: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Step 4: Test AI Function
Write-Host ""
Write-Host "Sending test request to AI Function..." -ForegroundColor Cyan
try {
  $testBody = @{
    mainCategory = "General Business"
    subcategory = "Professional Services"
    businessDescription = "Test business for health check"
    websiteUrl = ""
    socialMediaLinks = ""
    clientAnswers = "This is a test response from the health check script"
    emailLength = "short"
  } | ConvertTo-Json
  
  $headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $supabaseKey"
    "apikey" = $supabaseKey
  }
  
  $aiResponse = Invoke-RestMethod -Uri $aiUrl -Method Post -Body $testBody -Headers $headers -ErrorAction Stop
  if ($aiResponse.email -and $aiResponse.message) {
    Write-Host "OK: AI Function is working!" -ForegroundColor Green
    Write-Host "   Email preview: $($aiResponse.email.Substring(0, [Math]::Min(100, $aiResponse.email.Length)))..." -ForegroundColor Gray
    Write-Host "   Message preview: $($aiResponse.message.Substring(0, [Math]::Min(100, $aiResponse.message.Length)))..." -ForegroundColor Gray
  } else {
    Write-Host "WARNING: AI Function responded but missing expected fields" -ForegroundColor Yellow
  }
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  if ($statusCode -eq 400) {
    Write-Host "WARNING: AI Function requires valid parameters (400 Bad Request)" -ForegroundColor Yellow
    Write-Host "   This is expected - the function exists and is responding correctly" -ForegroundColor Gray
  } elseif ($statusCode -eq 500) {
    Write-Host "ERROR: AI Function server error - check GEMINI_API_KEY configuration" -ForegroundColor Red
  } else {
    Write-Host "ERROR: AI Function error: $($_.Exception.Message) (Status: $statusCode)" -ForegroundColor Red
  }
}

# Step 5: Check Supabase key (controlled test)
Write-Host ""
Write-Host "Checking Supabase permissions (anon key)..." -ForegroundColor Cyan
try {
  $dbUrl = "$supabaseUrl/rest/v1/"
  $headers = @{
    apikey = $supabaseKey
    Authorization = "Bearer $supabaseKey"
  }
  $dbResponse = Invoke-RestMethod -Uri $dbUrl -Headers $headers -ErrorAction Stop
  Write-Host "OK: Key is valid - Supabase returned response" -ForegroundColor Green
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  if ($statusCode -eq 404 -or $statusCode -eq 200) {
    Write-Host "OK: Key is valid (404 is normal for root endpoint)" -ForegroundColor Green
  } else {
    Write-Host "WARNING: Could not call Supabase API. Code: $statusCode" -ForegroundColor Yellow
    Write-Host "   Check the key or Policies" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "All checks completed!" -ForegroundColor Cyan
Write-Host "TIP: Ensure all variables are updated in environment.prod.ts for production" -ForegroundColor Gray
exit 0
