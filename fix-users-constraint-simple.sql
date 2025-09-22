-- CORRIGIR CONSTRAINT DE CHAVE ESTRANGEIRA - VERSÃO SIMPLES
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR CONSTRAINTS EXISTENTES
-- ========================================

-- Verificar todas as constraints da tabela users
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
LEFT JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'users'
    AND tc.table_schema = 'public'
ORDER BY tc.constraint_name;

-- ========================================
-- 2. REMOVER CONSTRAINT PROBLEMÁTICA
-- ========================================

-- Remover a constraint problemática se existir
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- ========================================
-- 3. VERIFICAR SE A REMOÇÃO FUNCIONOU
-- ========================================

-- Verificar constraints restantes
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
WHERE tc.table_name = 'users'
    AND tc.table_schema = 'public'
ORDER BY tc.constraint_name;

-- ========================================
-- 4. TESTAR INSERÇÃO DE USUÁRIO
-- ========================================

-- Testar inserção de um usuário de teste
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  show_name,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'teste-simple@exemplo.com',
  'Usuário Teste Simple',
  'aluno',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- ========================================
-- 5. VERIFICAR SE A INSERÇÃO FUNCIONOU
-- ========================================

-- Verificar se o usuário foi inserido
SELECT id, email, name, role, created_at 
FROM public.users 
WHERE email = 'teste-simple@exemplo.com';

-- ========================================
-- 6. LIMPAR DADOS DE TESTE
-- ========================================

-- Remover usuário de teste
DELETE FROM public.users WHERE email = 'teste-simple@exemplo.com';

-- ========================================
-- 7. VERIFICAR CONSTRAINTS FINAIS
-- ========================================

-- Verificar todas as constraints da tabela users após correção
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
WHERE tc.table_name = 'users'
    AND tc.table_schema = 'public'
ORDER BY tc.constraint_name;
