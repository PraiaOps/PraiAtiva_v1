-- SCRIPT FINAL: Reabilitar RLS com políticas de segurança corretas
-- Execute no SQL Editor do Supabase

-- 1. REABILITAR RLS (IMPORTANTE PARA SEGURANÇA!)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;

-- 3. CRIAR POLÍTICAS DE SEGURANÇA CORRETAS

-- Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT 
  USING (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRÍTICO: Permitir que usuários recém-registrados criem seu perfil
CREATE POLICY "Users can create own profile" ON public.users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Admins podem ver todos os perfis (opcional)
CREATE POLICY "Admins can view all profiles" ON public.users
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    ) OR auth.uid() = id
  );

-- 4. Verificar se RLS está habilitado e políticas criadas
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as "RLS_Enabled"
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- 5. Listar políticas criadas
SELECT 
  policyname, 
  cmd as "Operation",
  permissive,
  CASE 
    WHEN cmd = 'SELECT' THEN 'Leitura'
    WHEN cmd = 'INSERT' THEN 'Criação'
    WHEN cmd = 'UPDATE' THEN 'Atualização'
    WHEN cmd = 'DELETE' THEN 'Exclusão'
  END as "Tipo"
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY cmd;
