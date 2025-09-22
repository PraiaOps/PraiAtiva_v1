-- Script de Backup do Banco de Dados PraiAtiva
-- Execute este script no SQL Editor do Supabase para fazer backup das tabelas principais
-- Data: $(date)

-- ========================================
-- BACKUP DA TABELA ACTIVITIES
-- ========================================

-- Criar tabela de backup para activities
CREATE TABLE IF NOT EXISTS activities_backup_$(date +%Y%m%d) AS 
SELECT * FROM public.activities;

-- Verificar quantas atividades foram copiadas
SELECT 
    'activities_backup' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM activities_backup_$(date +%Y%m%d);

-- ========================================
-- BACKUP DA TABELA USERS
-- ========================================

-- Criar tabela de backup para users
CREATE TABLE IF NOT EXISTS users_backup_$(date +%Y%m%d) AS 
SELECT * FROM public.users;

-- Verificar quantos usuários foram copiados
SELECT 
    'users_backup' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM users_backup_$(date +%Y%m%d);

-- ========================================
-- BACKUP DA TABELA ENROLLMENTS (se existir)
-- ========================================

-- Verificar se a tabela enrollments existe e fazer backup
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'enrollments' AND table_schema = 'public') THEN
        EXECUTE 'CREATE TABLE IF NOT EXISTS enrollments_backup_$(date +%Y%m%d) AS SELECT * FROM public.enrollments';
        RAISE NOTICE 'Backup da tabela enrollments criado com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela enrollments não encontrada.';
    END IF;
END $$;

-- ========================================
-- RELATÓRIO DE BACKUP
-- ========================================

-- Relatório completo do backup
SELECT 
    'RELATÓRIO DE BACKUP' as titulo,
    NOW() as data_backup;

-- Contar atividades por tipo
SELECT 
    'ATIVIDADES POR TIPO' as categoria,
    title as tipo_atividade,
    COUNT(*) as total,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as ativas,
    COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inativas
FROM activities_backup_$(date +%Y%m%d)
GROUP BY title
ORDER BY total DESC;

-- Contar atividades por cidade
SELECT 
    'ATIVIDADES POR CIDADE' as categoria,
    city as cidade,
    COUNT(*) as total_atividades
FROM activities_backup_$(date +%Y%m%d)
GROUP BY city
ORDER BY total_atividades DESC;

-- Contar atividades por praia
SELECT 
    'ATIVIDADES POR PRAIA' as categoria,
    beach as praia,
    COUNT(*) as total_atividades
FROM activities_backup_$(date +%Y%m%d)
GROUP BY beach
ORDER BY total_atividades DESC;

-- Contar usuários por role
SELECT 
    'USUÁRIOS POR ROLE' as categoria,
    role as tipo_usuario,
    COUNT(*) as total_usuarios
FROM users_backup_$(date +%Y%m%d)
GROUP BY role
ORDER BY total_usuarios DESC;

-- ========================================
-- EXPORTAR DADOS PARA CSV (OPCIONAL)
-- ========================================

-- Para exportar dados para CSV, use os comandos abaixo no Supabase Dashboard:
-- 1. Vá para Table Editor
-- 2. Selecione a tabela activities_backup_$(date +%Y%m%d)
-- 3. Clique em "Export" > "CSV"
-- 4. Repita para users_backup_$(date +%Y%m%d)

-- ========================================
-- VERIFICAÇÃO DE INTEGRIDADE
-- ========================================

-- Verificar se não há dados duplicados
SELECT 
    'VERIFICAÇÃO DE INTEGRIDADE' as categoria,
    'activities' as tabela,
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM activities_backup_$(date +%Y%m%d)) as total_backup,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM activities_backup_$(date +%Y%m%d)) 
        THEN 'OK - Dados íntegros' 
        ELSE 'ERRO - Dados inconsistentes' 
    END as status
FROM public.activities;

-- Verificar se não há dados duplicados - users
SELECT 
    'VERIFICAÇÃO DE INTEGRIDADE' as categoria,
    'users' as tabela,
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM users_backup_$(date +%Y%m%d)) as total_backup,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM users_backup_$(date +%Y%m%d)) 
        THEN 'OK - Dados íntegros' 
        ELSE 'ERRO - Dados inconsistentes' 
    END as status
FROM public.users;

-- ========================================
-- INFORMAÇÕES DO SISTEMA
-- ========================================

-- Informações do banco de dados
SELECT 
    'INFORMAÇÕES DO SISTEMA' as categoria,
    current_database() as nome_banco,
    current_user as usuario_atual,
    version() as versao_postgresql,
    NOW() as timestamp_backup;

-- Tamanho das tabelas
SELECT 
    'TAMANHO DAS TABELAS' as categoria,
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as tamanho
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('activities', 'users', 'enrollments')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

