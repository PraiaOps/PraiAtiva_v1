-- CORRIGIR CONSTRAINT DE CHAVE ESTRANGEIRA NA TABELA USERS
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
-- 2. VERIFICAR ESTRUTURA DA TABELA USERS
-- ========================================

-- Verificar estrutura da tabela users
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- ========================================
-- 3. VERIFICAR SE HÁ CONSTRAINT PROBLEMÁTICA
-- ========================================

-- Verificar se existe constraint users_id_fkey
SELECT 
    conname as constraint_name,
    conrelid::regclass as table_name,
    confrelid::regclass as referenced_table,
    a.attname as column_name,
    af.attname as referenced_column
FROM pg_constraint c
JOIN pg_attribute a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
JOIN pg_attribute af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
WHERE c.conname = 'users_id_fkey';

-- ========================================
-- 4. REMOVER CONSTRAINT PROBLEMÁTICA
-- ========================================

-- Remover a constraint problemática se existir
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- ========================================
-- 5. VERIFICAR SE HÁ OUTRAS CONSTRAINTS PROBLEMÁTICAS
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
    AND tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.constraint_name;

-- ========================================
-- 6. VERIFICAR SE A TABELA USERS TEM PRIMARY KEY
-- ========================================

-- Verificar se existe primary key na tabela users
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
    AND tc.constraint_type = 'PRIMARY KEY';

-- ========================================
-- 7. CRIAR PRIMARY KEY SE NÃO EXISTIR
-- ========================================

-- Verificar se já existe primary key antes de criar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'users' 
        AND table_schema = 'public' 
        AND constraint_type = 'PRIMARY KEY'
    ) THEN
        ALTER TABLE public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
        RAISE NOTICE 'Primary key criada com sucesso';
    ELSE
        RAISE NOTICE 'Primary key já existe, pulando criação';
    END IF;
END $$;

-- ========================================
-- 8. VERIFICAR SE HÁ DADOS ÓRFÃOS
-- ========================================

-- Verificar se há registros na tabela users
SELECT COUNT(*) as total_users FROM public.users;

-- Verificar se há registros com IDs inválidos
SELECT id, email, name, created_at 
FROM public.users 
WHERE id IS NULL;

-- ========================================
-- 9. TESTAR INSERÇÃO DE USUÁRIO
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
  'teste-constraint@exemplo.com',
  'Usuário Teste Constraint',
  'aluno',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- ========================================
-- 10. VERIFICAR SE A INSERÇÃO FUNCIONOU
-- ========================================

-- Verificar se o usuário foi inserido
SELECT id, email, name, role, created_at 
FROM public.users 
WHERE email = 'teste-constraint@exemplo.com';

-- ========================================
-- 11. LIMPAR DADOS DE TESTE
-- ========================================

-- Remover usuário de teste
DELETE FROM public.users WHERE email = 'teste-constraint@exemplo.com';

-- ========================================
-- 12. VERIFICAR CONSTRAINTS FINAIS
-- ========================================

-- Verificar todas as constraints da tabela users após correção
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
-- 13. INSTRUÇÕES PARA O FRONTEND
-- ========================================

-- O frontend deve:
-- 1. Garantir que o ID do usuário seja válido (UUID)
-- 2. Usar o ID retornado pelo Supabase Auth
-- 3. Verificar se o usuário já existe antes de inserir
-- 4. Tratar erros de constraint adequadamente

-- Exemplo de como o frontend deve inserir:
-- const { data: { user } } = await supabase.auth.getUser();
-- if (user && user.id) {
--   const { data, error } = await supabase
--     .from('users')
--     .insert({
--       id: user.id, // ID válido do Supabase Auth
--       email: user.email,
--       name: formData.name,
--       role: 'aluno',
--       show_name: true,
--       created_at: new Date().toISOString(),
--       updated_at: new Date().toISOString()
--     });
-- }
