-- SCRIPT DE RESTAURAÇÃO DO BACKUP
-- Execute este script no SQL Editor do Supabase para restaurar dados do backup
-- ⚠️ ATENÇÃO: Este script irá substituir os dados atuais!

-- ========================================
-- 1. VERIFICAR BACKUPS DISPONÍVEIS
-- ========================================

-- Listar todas as tabelas de backup disponíveis
SELECT 
    'BACKUPS DISPONÍVEIS' as categoria,
    table_name as nome_backup,
    pg_size_pretty(pg_total_relation_size('public.' || table_name)) as tamanho
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%_backup_%'
ORDER BY table_name DESC;

-- ========================================
-- 2. VERIFICAR DADOS ATUAIS ANTES DA RESTAURAÇÃO
-- ========================================

-- Contar registros atuais
SELECT 
    'DADOS ATUAIS' as categoria,
    'activities' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM public.activities

UNION ALL

SELECT 
    'DADOS ATUAIS' as categoria,
    'users' as tabela,
    COUNT(*) as total_registros,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM public.users;

-- ========================================
-- 3. RESTAURAR ATIVIDADES (SUBSTITUIR TABELA ATUAL)
-- ========================================

-- ⚠️ CUIDADO: Este comando irá substituir a tabela activities atual!
-- Descomente as linhas abaixo apenas se quiser restaurar:

/*
-- Fazer backup da tabela atual antes de restaurar
CREATE TABLE activities_backup_before_restore AS 
SELECT * FROM public.activities;

-- Limpar tabela atual
TRUNCATE TABLE public.activities;

-- Restaurar do backup
INSERT INTO public.activities 
SELECT * FROM activities_backup_20250121;

-- Verificar restauração
SELECT 
    'RESTAURAÇÃO ACTIVITIES' as categoria,
    COUNT(*) as total_restaurado,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM public.activities;
*/

-- ========================================
-- 4. RESTAURAR USUÁRIOS (SUBSTITUIR TABELA ATUAL)
-- ========================================

-- ⚠️ CUIDADO: Este comando irá substituir a tabela users atual!
-- Descomente as linhas abaixo apenas se quiser restaurar:

/*
-- Fazer backup da tabela atual antes de restaurar
CREATE TABLE users_backup_before_restore AS 
SELECT * FROM public.users;

-- Limpar tabela atual
TRUNCATE TABLE public.users;

-- Restaurar do backup
INSERT INTO public.users 
SELECT * FROM users_backup_20250121;

-- Verificar restauração
SELECT 
    'RESTAURAÇÃO USERS' as categoria,
    COUNT(*) as total_restaurado,
    MIN(created_at) as data_mais_antiga,
    MAX(created_at) as data_mais_recente
FROM public.users;
*/

-- ========================================
-- 5. RESTAURAÇÃO PARCIAL (APENAS DADOS ESPECÍFICOS)
-- ========================================

-- Restaurar apenas atividades de um instrutor específico
-- Substitua 'EMAIL_DO_INSTRUTOR' pelo email desejado

/*
-- Buscar ID do instrutor
SELECT id, email, name 
FROM public.users 
WHERE email = 'EMAIL_DO_INSTRUTOR';

-- Deletar atividades atuais do instrutor
DELETE FROM public.activities 
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'EMAIL_DO_INSTRUTOR');

-- Restaurar atividades do backup para este instrutor
INSERT INTO public.activities 
SELECT * FROM activities_backup_20250121 
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'EMAIL_DO_INSTRUTOR');
*/

-- ========================================
-- 6. VERIFICAÇÃO PÓS-RESTAURAÇÃO
-- ========================================

-- Verificar integridade após restauração
SELECT 
    'VERIFICAÇÃO PÓS-RESTAURAÇÃO' as categoria,
    'activities' as tabela,
    COUNT(*) as total_atual,
    (SELECT COUNT(*) FROM activities_backup_20250121) as total_backup,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM activities_backup_20250121)
        THEN 'OK - Restauração completa' 
        ELSE 'ERRO - Restauração incompleta' 
    END as status
FROM public.activities;

-- Verificar integridade após restauração - users
SELECT 
    'VERIFICAÇÃO PÓS-RESTAURAÇÃO' as categoria,
    'users' as tabela,
    COUNT(*) as total_atual,
    (SELECT COUNT(*) FROM users_backup_20250121) as total_backup,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM users_backup_20250121)
        THEN 'OK - Restauração completa' 
        ELSE 'ERRO - Restauração incompleta' 
    END as status
FROM public.users;

-- ========================================
-- 7. LIMPEZA DE BACKUPS ANTIGOS (OPCIONAL)
-- ========================================

-- Listar backups antigos para limpeza
SELECT 
    'BACKUPS PARA LIMPEZA' as categoria,
    table_name as nome_backup,
    pg_size_pretty(pg_total_relation_size('public.' || table_name)) as tamanho
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%_backup_%'
AND table_name NOT LIKE '%20250121%'
ORDER BY table_name;

-- Para deletar backups antigos, descomente a linha abaixo:
-- DROP TABLE IF EXISTS nome_do_backup_antigo;

