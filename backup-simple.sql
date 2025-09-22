-- BACKUP SIMPLES DO BANCO DE DADOS PRAIATIVA
-- Execute este script no SQL Editor do Supabase
-- Data: $(date)

-- ========================================
-- 1. BACKUP DA TABELA ACTIVITIES
-- ========================================

-- Criar tabela de backup para activities
CREATE TABLE IF NOT EXISTS activities_backup_20250121 AS 
SELECT * FROM public.activities;

-- Verificar backup
SELECT 
    'ACTIVITIES BACKUP' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM activities_backup_20250121;

-- ========================================
-- 2. BACKUP DA TABELA USERS
-- ========================================

-- Criar tabela de backup para users
CREATE TABLE IF NOT EXISTS users_backup_20250121 AS 
SELECT * FROM public.users;

-- Verificar backup
SELECT 
    'USERS BACKUP' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM users_backup_20250121;

-- ========================================
-- 3. RELATÓRIO DE BACKUP
-- ========================================

-- Atividades por tipo
SELECT 
    'ATIVIDADES POR TIPO' as categoria,
    title as tipo,
    COUNT(*) as total,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as ativas
FROM activities_backup_20250121
GROUP BY title
ORDER BY total DESC;

-- Atividades por cidade
SELECT 
    'ATIVIDADES POR CIDADE' as categoria,
    city as cidade,
    COUNT(*) as total
FROM activities_backup_20250121
GROUP BY city
ORDER BY total DESC;

-- Atividades por praia
SELECT 
    'ATIVIDADES POR PRAIA' as categoria,
    beach as praia,
    COUNT(*) as total
FROM activities_backup_20250121
GROUP BY beach
ORDER BY total DESC;

-- Usuários por role
SELECT 
    'USUÁRIOS POR ROLE' as categoria,
    role as tipo,
    COUNT(*) as total
FROM users_backup_20250121
GROUP BY role
ORDER BY total DESC;

-- ========================================
-- 4. VERIFICAÇÃO DE INTEGRIDADE
-- ========================================

-- Verificar se backup está íntegro
SELECT 
    'VERIFICAÇÃO INTEGRIDADE' as categoria,
    'activities' as tabela,
    (SELECT COUNT(*) FROM public.activities) as original,
    (SELECT COUNT(*) FROM activities_backup_20250121) as backup,
    CASE 
        WHEN (SELECT COUNT(*) FROM public.activities) = (SELECT COUNT(*) FROM activities_backup_20250121)
        THEN 'OK - Backup íntegro' 
        ELSE 'ERRO - Backup inconsistente' 
    END as status;

-- Verificar se backup está íntegro - users
SELECT 
    'VERIFICAÇÃO INTEGRIDADE' as categoria,
    'users' as tabela,
    (SELECT COUNT(*) FROM public.users) as original,
    (SELECT COUNT(*) FROM users_backup_20250121) as backup,
    CASE 
        WHEN (SELECT COUNT(*) FROM public.users) = (SELECT COUNT(*) FROM users_backup_20250121)
        THEN 'OK - Backup íntegro' 
        ELSE 'ERRO - Backup inconsistente' 
    END as status;

-- ========================================
-- 5. INFORMAÇÕES DO SISTEMA
-- ========================================

SELECT 
    'INFORMAÇÕES SISTEMA' as categoria,
    current_database() as banco,
    current_user as usuario,
    NOW() as timestamp,
    version() as postgresql_version;

