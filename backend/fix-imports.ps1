# Fix imports script - replaces shared/shared with @shared

$files = Get-ChildItem -Path "libs\shared" -Filter "*.ts" -Recurse

$totalFixed = 0
$filesModified = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace 'shared/shared' with '@shared'
    $content = $content -replace '"shared/shared/', '"@shared/'
    $content = $content -replace "'shared/shared/", "'@shared/"
    
    # Replace '@shared/shared' with '@shared'
    $content = $content -replace '"@shared/shared/', '"@shared/'
    $content = $content -replace "'@shared/shared/", "'@shared/"
    
    # Replace 'libs/shared/database' with '@shared/database'
    $content = $content -replace "'libs/shared/database/", "'@shared/database/"
    $content = $content -replace '"libs/shared/database/', '"@shared/database/'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.FullName)"
        $filesModified++
    }
}

Write-Host "`nTotal files modified: $filesModified"
