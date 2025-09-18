-- Corrigir políticas RLS para permitir cadastro seguro
-- Execute no SQL Editor do Supabase

-- 1. Reabilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Remover políticas antigas que podem estar conflitando
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- 3. Criar políticas corretas

-- Permitir que usuários vejam apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT 
  USING (auth.uid() = id);

-- Permitir que usuários atualizem apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRÍTICO: Permitir que usuários recém-autenticados criem seu perfil
CREATE POLICY "Users can create own profile" ON public.users
  FOR INSERT 
  WITH CHECK (
    auth.uid() = id AND
    auth.uid() IS NOT NULL
  );

-- Política adicional: Permitir que admins vejam todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.users
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users';
