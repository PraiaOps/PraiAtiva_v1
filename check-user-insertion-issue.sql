-- VERIFICAR PROBLEMA DE INSERÇÃO NA TABELA USERS
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR USUÁRIOS VERIFICADOS NO AUTH
-- ========================================

-- Verificar usuários que confirmaram email mas não estão na tabela users
SELECT 
    au.id,
    au.email,
    au.email_confirmed_at,
    au.created_at as auth_created_at,
    u.id as user_table_id,
    CASE 
        WHEN u.id IS NULL THEN 'ÓRFÃO - Verificado mas não existe na tabela users'
        ELSE 'OK - Existe na tabela users'
    END as status
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE au.email_confirmed_at IS NOT NULL
ORDER BY au.created_at DESC;

-- ========================================
-- 2. VERIFICAR USUÁRIOS NÃO VERIFICADOS
-- ========================================

-- Verificar usuários que ainda não confirmaram email
SELECT 
    au.id,
    au.email,
    au.email_confirmed_at,
    au.created_at as auth_created_at,
    u.id as user_table_id,
    CASE 
        WHEN u.id IS NULL THEN 'ÓRFÃO - Não verificado e não existe na tabela users'
        ELSE 'OK - Existe na tabela users'
    END as status
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE au.email_confirmed_at IS NULL
ORDER BY au.created_at DESC;

-- ========================================
-- 3. VERIFICAR CONSTRAINTS DA TABELA USERS
-- ========================================

-- Verificar constraints que podem estar bloqueando inserção
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.users'::regclass
ORDER BY conname;

-- ========================================
-- 4. VERIFICAR POLÍTICAS RLS
-- ========================================

-- Verificar políticas RLS na tabela users
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public';

-- ========================================
-- 5. TESTAR INSERÇÃO MANUAL
-- ========================================

-- Testar inserção manual para identificar o problema
-- DESCOMENTE APENAS SE NECESSÁRIO:
/*
INSERT INTO public.users (
    id,
    email,
    name,
    role,
    show_name,
    created_at,
    updated_at
) VALUES (
    '57ccd740-f406-4664-a3ac-5d698473851c',
    'reclamagest@gmail.com',
    'Reclamagest',
    'aluno',
    true,
    NOW(),
    NOW()
);
*/

-- ========================================
-- 6. VERIFICAR LOGS DE ERRO
-- ========================================

-- Verificar se há logs de erro relacionados à inserção
SELECT 
    'Verifique os logs do Supabase para erros de inserção' as instrucao,
    'Logs > Auth ou Logs > Database' as localizacao,
    'Procure por erros 403, 500, ou constraint violations' as dica;
