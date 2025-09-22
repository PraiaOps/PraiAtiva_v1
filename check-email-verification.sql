-- VERIFICAR CONFIGURAÇÕES DE VERIFICAÇÃO DE EMAIL
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
    raw_user_meta_data
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
-- 3. VERIFICAR CONFIGURAÇÕES DE AUTH
-- ========================================

-- Nota: Configurações SMTP devem ser verificadas no Supabase Dashboard
-- Authentication > Settings > SMTP Configuration
SELECT 'Verifique as configurações SMTP no Supabase Dashboard' as instrucao;

-- ========================================
-- 4. VERIFICAR LOGS DE EMAIL (se acessível)
-- ========================================

-- Verificar se há logs de email (pode não estar disponível)
SELECT 
    id,
    user_id,
    email,
    created_at,
    action,
    properties
FROM auth.audit_log_entries 
WHERE action = 'email_confirmation_sent'
ORDER BY created_at DESC
LIMIT 10;

-- ========================================
-- 5. VERIFICAR USUÁRIOS ÓRFÃOS
-- ========================================

-- Verificar usuários que existem no auth mas não na tabela users
SELECT 
    au.id,
    au.email,
    au.email_confirmed_at,
    au.created_at as auth_created_at,
    u.id as user_table_id
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL
ORDER BY au.created_at DESC
LIMIT 10;

-- ========================================
-- 6. VERIFICAR USUÁRIOS DUPLICADOS
-- ========================================

-- Verificar se há usuários duplicados por email
SELECT 
    email,
    COUNT(*) as count,
    array_agg(id) as user_ids
FROM auth.users 
GROUP BY email
HAVING COUNT(*) > 1;

-- ========================================
-- 7. ESTATÍSTICAS GERAIS
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
-- 8. VERIFICAR TABELA USERS
-- ========================================

-- Verificar usuários na tabela users
SELECT 
    COUNT(*) as total_users_table,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as users_last_24h_table
FROM public.users;

-- ========================================
-- 9. INSTRUÇÕES PARA RESOLVER
-- ========================================

-- Se o problema for verificação de email:
-- 1. Verificar configurações SMTP no Supabase Dashboard
-- 2. Verificar se o domínio está na lista de permitidos
-- 3. Verificar se o email não está indo para spam
-- 4. Testar com email diferente
-- 5. Verificar logs de email no Supabase Dashboard

-- Se o problema for constraint:
-- 1. Executar script de correção de constraint
-- 2. Verificar se a tabela users está correta
-- 3. Testar inserção manual

-- ========================================
-- 10. TESTE MANUAL DE INSERÇÃO
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
