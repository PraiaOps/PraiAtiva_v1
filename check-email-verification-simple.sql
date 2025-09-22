-- VERIFICAR VERIFICAÇÃO DE EMAIL - VERSÃO SIMPLES
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR USUÁRIOS NÃO VERIFICADOS
-- ========================================

-- Verificar usuários que não confirmaram email
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at,
    CASE 
        WHEN email_confirmed_at IS NULL THEN 'NÃO VERIFICADO'
        ELSE 'VERIFICADO'
    END as status
FROM auth.users 
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC
LIMIT 10;

-- ========================================
-- 2. VERIFICAR USUÁRIOS RECENTES
-- ========================================

-- Verificar usuários criados nas últimas 24 horas
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at,
    CASE 
        WHEN email_confirmed_at IS NULL THEN 'NÃO VERIFICADO'
        ELSE 'VERIFICADO'
    END as status
FROM auth.users 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- ========================================
-- 3. VERIFICAR USUÁRIOS ÓRFÃOS
-- ========================================

-- Verificar usuários que existem no auth mas não na tabela users
SELECT 
    au.id,
    au.email,
    au.email_confirmed_at,
    au.created_at as auth_created_at,
    u.id as user_table_id,
    CASE 
        WHEN u.id IS NULL THEN 'ÓRFÃO - Não existe na tabela users'
        ELSE 'OK - Existe na tabela users'
    END as status
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL
ORDER BY au.created_at DESC
LIMIT 10;

-- ========================================
-- 4. ESTATÍSTICAS GERAIS
-- ========================================

-- Estatísticas gerais de usuários
SELECT 
    COUNT(*) as total_auth_users,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as verified_users,
    COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unverified_users,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as users_last_24h,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as users_last_7d
FROM auth.users;

-- ========================================
-- 5. VERIFICAR TABELA USERS
-- ========================================

-- Verificar usuários na tabela users
SELECT 
    COUNT(*) as total_users_table,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as users_last_24h_table
FROM public.users;

-- ========================================
-- 6. INSTRUÇÕES PARA RESOLVER
-- ========================================

-- Se houver usuários não verificados:
-- 1. Verificar configurações SMTP no Supabase Dashboard
-- 2. Verificar se o email não está indo para spam
-- 3. Testar com email diferente
-- 4. Verificar se o domínio está na lista de permitidos

-- Se houver usuários órfãos:
-- 1. Executar script de correção de constraint
-- 2. Verificar se a tabela users está correta
-- 3. Testar inserção manual

-- ========================================
-- 7. TESTE MANUAL DE INSERÇÃO
-- ========================================

-- Testar inserção manual (descomente se necessário)
-- INSERT INTO public.users (
--   id,
--   email,
--   name,
--   role,
--   show_name,
--   created_at,
--   updated_at
-- ) VALUES (
--   gen_random_uuid(),
--   'teste-manual@exemplo.com',
--   'Teste Manual',
--   'aluno',
--   true,
--   NOW(),
--   NOW()
-- );

-- SELECT 'Teste manual executado' as status;
