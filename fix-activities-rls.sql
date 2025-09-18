-- Corrigir políticas RLS para tabela activities
-- Execute no SQL Editor do Supabase

-- 1. Verificar políticas atuais
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'activities';

-- 2. Remover políticas antigas que podem estar causando conflito
DROP POLICY IF EXISTS "Anyone can view active activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can view own activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can insert activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can update own activities" ON public.activities;
DROP POLICY IF EXISTS "Instructors can delete own activities" ON public.activities;

-- 3. Criar políticas corrigidas

-- Permitir que qualquer um veja atividades ativas (para página pública)
CREATE POLICY "Anyone can view active activities" ON public.activities
  FOR SELECT 
  USING (status = 'active');

-- Permitir que instrutores vejam suas próprias atividades (todas, independente do status)
CREATE POLICY "Instructors can view own activities" ON public.activities
  FOR SELECT 
  USING (auth.uid() = instructor_id);

-- CRÍTICO: Permitir que instrutores e admins criem atividades
CREATE POLICY "Instructors can create activities" ON public.activities
  FOR INSERT 
  WITH CHECK (
    auth.uid() = instructor_id AND 
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('instrutor', 'admin')
    )
  );

-- Permitir que instrutores atualizem suas próprias atividades
CREATE POLICY "Instructors can update own activities" ON public.activities
  FOR UPDATE 
  USING (
    auth.uid() = instructor_id AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('instrutor', 'admin')
    )
  );

-- Permitir que instrutores deletem suas próprias atividades
CREATE POLICY "Instructors can delete own activities" ON public.activities
  FOR DELETE 
  USING (
    auth.uid() = instructor_id AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('instrutor', 'admin')
    )
  );

-- 4. Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'activities'
ORDER BY policyname;
