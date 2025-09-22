-- CRIAR USUÁRIO MANUALMENTE - SOLUÇÃO TEMPORÁRIA
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR SE O USUÁRIO JÁ EXISTE
-- ========================================

-- Verificar se o usuário já existe na tabela users
SELECT 
    id,
    email,
    name,
    role,
    created_at,
    'USUÁRIO JÁ EXISTE' as status
FROM public.users 
WHERE id = '57ccd740-f406-4664-a3ac-5d698473851c'
   OR email = 'reclamagest@gmail.com';

-- ========================================
-- 2. CRIAR USUÁRIO MANUALMENTE
-- ========================================

-- Criar o usuário na tabela users (descomente se necessário)
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
)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 3. VERIFICAR SE FOI CRIADO
-- ========================================

-- Verificar se o usuário foi criado com sucesso
SELECT 
    id,
    email,
    name,
    role,
    created_at,
    'USUÁRIO CRIADO COM SUCESSO' as status
FROM public.users 
WHERE id = '57ccd740-f406-4664-a3ac-5d698473851c';

-- ========================================
-- 4. VERIFICAR CONFIGURAÇÕES SMTP
-- ========================================

-- Instruções para configurar SMTP
SELECT 
    'Configure o SMTP no Supabase Dashboard' as instrucao,
    'Authentication > Settings > SMTP Configuration' as localizacao,
    'Use Gmail com senha de app para teste' as dica;
