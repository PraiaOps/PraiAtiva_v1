-- Script SIMPLES para corrigir RLS na tabela users
-- Execute este script no SQL Editor do Supabase

-- 1. DESABILITAR RLS TEMPORARIAMENTE para teste
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 2. REMOVER TODAS as políticas existentes
DROP POLICY IF EXISTS "Allow authenticated users to insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated users to read their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated users to update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can read their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;

-- 3. VERIFICAR se RLS foi desabilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- 4. TESTAR o cadastro agora (deve funcionar)
-- Depois de testar, execute a segunda parte do script:

-- PARTE 2: REABILITAR RLS COM POLÍTICAS SIMPLES
-- (Execute esta parte APENAS após confirmar que o cadastro funciona)

/*
-- 5. REABILITAR RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR política SIMPLES para INSERT
CREATE POLICY "simple_insert_policy" 
ON public.users FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 7. CRIAR política SIMPLES para SELECT
CREATE POLICY "simple_select_policy" 
ON public.users FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- 8. CRIAR política SIMPLES para UPDATE
CREATE POLICY "simple_update_policy" 
ON public.users FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
*/

-- INSTRUÇÕES:
-- 1. Execute apenas a PARTE 1 (até linha 32)
-- 2. Teste o cadastro no site
-- 3. Se funcionar, execute a PARTE 2 (descomente as linhas)
