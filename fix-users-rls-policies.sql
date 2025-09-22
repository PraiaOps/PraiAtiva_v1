-- CORRIGIR POLÍTICAS RLS PARA TABELA USERS
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR STATUS ATUAL DAS POLÍTICAS
-- ========================================

-- Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users';

-- ========================================
-- 2. TEMPORARIAMENTE DESABILITAR RLS
-- ========================================

-- Desabilitar RLS temporariamente para permitir inserção
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- ========================================
-- 3. VERIFICAR SE USUÁRIOS PODEM SER INSERIDOS
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
  'teste@exemplo.com',
  'Usuário Teste',
  'aluno',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- ========================================
-- 4. RECRIAR POLÍTICAS RLS CORRETAS
-- ========================================

-- Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;

-- ========================================
-- 5. CRIAR NOVAS POLÍTICAS RLS
-- ========================================

-- Política para permitir que usuários autenticados vejam todos os perfis
CREATE POLICY "Enable read access for all users" ON public.users
  FOR SELECT USING (true);

-- Política para permitir que usuários autenticados insiram seu próprio perfil
CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Política para permitir que usuários atualizem apenas seu próprio perfil
CREATE POLICY "Enable update for users based on email" ON public.users
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Política para permitir que usuários vejam apenas seu próprio perfil (alternativa mais restritiva)
-- CREATE POLICY "Users can view own profile" ON public.users
--   FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- ========================================
-- 6. HABILITAR RLS NOVAMENTE
-- ========================================

-- Habilitar RLS com as novas políticas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 7. VERIFICAR POLÍTICAS CRIADAS
-- ========================================

-- Verificar se as políticas foram criadas corretamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- ========================================
-- 8. TESTAR INSERÇÃO COM RLS HABILITADO
-- ========================================

-- Testar se a inserção funciona com RLS habilitado
-- (Execute este comando quando estiver logado como usuário autenticado)
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
--   'teste2@exemplo.com',
--   'Usuário Teste 2',
--   'aluno',
--   true,
--   NOW(),
--   NOW()
-- );

-- ========================================
-- 9. VERIFICAR DADOS EXISTENTES
-- ========================================

-- Verificar quantos usuários existem na tabela
SELECT COUNT(*) as total_usuarios FROM public.users;

-- Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- ========================================
-- 10. INSTRUÇÕES PARA O FRONTEND
-- ========================================

-- O frontend deve:
-- 1. Garantir que o usuário está autenticado antes de tentar inserir
-- 2. Usar o email do usuário autenticado para inserir o perfil
-- 3. Tratar erros de RLS adequadamente
-- 4. Verificar se o perfil já existe antes de tentar inserir

-- Exemplo de como o frontend deve inserir:
-- const { data: { user } } = await supabase.auth.getUser();
-- if (user) {
--   const { data, error } = await supabase
--     .from('users')
--     .insert({
--       id: user.id,
--       email: user.email,
--       name: formData.name,
--       role: 'aluno',
--       show_name: true,
--       created_at: new Date().toISOString(),
--       updated_at: new Date().toISOString()
--     });
-- }
