-- VERIFICAR DETALHES DOS USUÁRIOS NO AUTH
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR TODOS OS USUÁRIOS NO AUTH
-- ========================================

-- Verificar todos os usuários no sistema de autenticação
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
ORDER BY created_at DESC;

-- ========================================
-- 2. VERIFICAR USUÁRIOS NÃO VERIFICADOS
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
ORDER BY au.created_at DESC;

-- ========================================
-- 4. ESTATÍSTICAS COMPARATIVAS
-- ========================================

-- Comparar contagens entre auth.users e public.users
SELECT 
    'auth.users' as tabela,
    COUNT(*) as total,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as verificados,
    COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as nao_verificados
FROM auth.users
UNION ALL
SELECT 
    'public.users' as tabela,
    COUNT(*) as total,
    COUNT(*) as verificados, -- Assumindo que todos na tabela users são verificados
    0 as nao_verificados
FROM public.users;

-- ========================================
-- 5. VERIFICAR USUÁRIOS RECENTES (ÚLTIMAS 24H)
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
