-- VERIFICAR USUÁRIO ESPECÍFICO
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR SE O USUÁRIO ESTÁ NA TABELA USERS
-- ========================================

-- Verificar se o usuário específico existe na tabela users
SELECT 
    id,
    email,
    name,
    role,
    created_at,
    'EXISTE NA TABELA USERS' as status
FROM public.users 
WHERE id = '57ccd740-f406-4664-a3ac-5d698473851c'
   OR email = 'reclamagest@gmail.com';

-- ========================================
-- 2. VERIFICAR TODOS OS USUÁRIOS ÓRFÃOS
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
-- 3. VERIFICAR CONFIGURAÇÕES DE EMAIL
-- ========================================

-- Verificar se há configurações específicas que podem estar bloqueando
SELECT 
    'Verifique as configurações SMTP no Supabase Dashboard' as instrucao,
    'Authentication > Settings > SMTP Configuration' as localizacao,
    'O usuário foi criado mas não recebeu email de verificação' as problema;

-- ========================================
-- 4. SOLUÇÃO TEMPORÁRIA
-- ========================================

-- Se o usuário não estiver na tabela users, podemos criar manualmente
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
    'Usuário Teste',
    'aluno',
    true,
    NOW(),
    NOW()
);
*/
