# Script PowerShell para Exportar Dados do Banco
# Execute este script para facilitar a exportação de dados

Write-Host "🚀 Iniciando exportação de dados do banco..." -ForegroundColor Green

# Verificar se a pasta exports existe
if (!(Test-Path "exports")) {
    New-Item -ItemType Directory -Path "exports"
    Write-Host "✅ Pasta 'exports' criada" -ForegroundColor Yellow
}

# Criar arquivos CSV vazios com headers
Write-Host "📝 Criando arquivos CSV com headers..." -ForegroundColor Blue

# Activities export
"id,instructor_id,location_name,title,city,beach,address,date,time,capacity,price,description,status,enrollments,created_at,updated_at" | Out-File -FilePath "exports/activities_export.csv" -Encoding UTF8

# Users export
"id,email,name,role,created_at,updated_at" | Out-File -FilePath "exports/users_export.csv" -Encoding UTF8

# Activities with instructors
"id,location_name,title,city,beach,address,date,time,capacity,price,description,status,enrollments,instructor_name,instructor_email,created_at,updated_at" | Out-File -FilePath "exports/activities_with_instructors.csv" -Encoding UTF8

# Statistics report
"categoria,tipo,total,ativas,inativas" | Out-File -FilePath "exports/statistics_report.csv" -Encoding UTF8

# Activities by instructor
"instructor_name,instructor_email,instructor_role,total_atividades,atividades_ativas,atividades_inativas,capacidade_total,inscricoes_total,preco_medio,primeira_atividade,ultima_atividade" | Out-File -FilePath "exports/activities_by_instructor.csv" -Encoding UTF8

Write-Host "✅ Arquivos CSV criados com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Execute o script 'export-to-local-csv.sql' no Supabase SQL Editor" -ForegroundColor White
Write-Host "2. Copie cada resultado para o arquivo CSV correspondente" -ForegroundColor White
Write-Host "3. Salve os arquivos na pasta 'exports/'" -ForegroundColor White
Write-Host ""
Write-Host "📁 Arquivos criados:" -ForegroundColor Cyan
Write-Host "   - exports/activities_export.csv" -ForegroundColor White
Write-Host "   - exports/users_export.csv" -ForegroundColor White
Write-Host "   - exports/activities_with_instructors.csv" -ForegroundColor White
Write-Host "   - exports/statistics_report.csv" -ForegroundColor White
Write-Host "   - exports/activities_by_instructor.csv" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Lembre-se: Estes arquivos são ignorados pelo Git!" -ForegroundColor Red
Write-Host "🎯 Execute o script SQL no Supabase para obter os dados reais" -ForegroundColor Green