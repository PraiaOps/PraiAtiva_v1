-- CORRIGIR RECURSÃO INFINITA NAS POLÍTICAS RLS
-- Execute no SQL Editor do Supabase

-- 1. REMOVER TODAS AS POLÍTICAS PROBLEMÁTICAS
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;

-- 2. CRIAR POLÍTICAS SIMPLES SEM RECURSÃO

-- Política para SELECT (visualização)
CREATE POLICY "enable_read_for_users_based_on_user_id" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Política para INSERT (criação de perfil)
CREATE POLICY "enable_insert_for_authenticated_users" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para UPDATE (atualização do próprio perfil)
CREATE POLICY "enable_update_for_users_based_on_user_id" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 3. VERIFICAR POLÍTICAS PARA ACTIVITIES (podem ter o mesmo problema)
DROP POLICY IF EXISTS "Instructors can create activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can view own activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can update own activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can delete own activities" ON public.activities;
DROP POLICY IF EXISTS "Anyone can view active activities" ON public.activities;

-- 4. CRIAR POLÍTICAS SIMPLES PARA ACTIVITIES

-- Visualizar atividades ativas (público)
CREATE POLICY "enable_read_active_activities" ON public.activities
  FOR SELECT USING (status = 'active');

-- Visualizar próprias atividades (instrutor)
CREATE POLICY "enable_read_own_activities" ON public.activities
  FOR SELECT USING (auth.uid() = instructor_id);

-- Criar atividades (apenas usuários autenticados)
CREATE POLICY "enable_insert_activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = instructor_id);

-- Atualizar próprias atividades
CREATE POLICY "enable_update_own_activities" ON public.activities
  FOR UPDATE USING (auth.uid() = instructor_id);

-- Deletar próprias atividades
CREATE POLICY "enable_delete_own_activities" ON public.activities
  FOR DELETE USING (auth.uid() = instructor_id);

-- 5. VERIFICAR STATUS FINAL
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as "RLS_Enabled"
FROM pg_tables 
WHERE tablename IN ('users', 'activities') AND schemaname = 'public';

-- 6. LISTAR POLÍTICAS FINAIS
SELECT 
  tablename,
  policyname,
  cmd as "Operation"
FROM pg_policies 
WHERE tablename IN ('users', 'activities')
ORDER BY tablename, cmd;
