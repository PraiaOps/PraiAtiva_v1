-- Script temporário para debug - DESABILITAR RLS
-- Execute no SQL Editor do Supabase APENAS para teste

-- Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Desabilitar RLS temporariamente para debug
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Verificar novamente
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Ver usuários existentes
SELECT id, email, name, role FROM public.users;
