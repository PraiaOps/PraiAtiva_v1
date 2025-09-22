-- CORRIGIR CONSTRAINT DE CHAVE ESTRANGEIRA - VERSÃO MÍNIMA
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. REMOVER CONSTRAINT PROBLEMÁTICA
-- ========================================

-- Remover a constraint problemática se existir
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- ========================================
-- 2. VERIFICAR SE A REMOÇÃO FUNCIONOU
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
-- 3. TESTAR INSERÇÃO DE USUÁRIO
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
  'teste-minimal@exemplo.com',
  'Usuário Teste Minimal',
  'aluno',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- ========================================
-- 4. VERIFICAR SE A INSERÇÃO FUNCIONOU
-- ========================================

-- Verificar se o usuário foi inserido
SELECT id, email, name, role, created_at 
FROM public.users 
WHERE email = 'teste-minimal@exemplo.com';

-- ========================================
-- 5. LIMPAR DADOS DE TESTE
-- ========================================

-- Remover usuário de teste
DELETE FROM public.users WHERE email = 'teste-minimal@exemplo.com';

-- ========================================
-- 6. CONFIRMAÇÃO FINAL
-- ========================================

-- Mostrar mensagem de sucesso
SELECT 'Constraint removida com sucesso! Teste o cadastro no frontend.' as status;
