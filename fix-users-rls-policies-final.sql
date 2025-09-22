-- CORRIGIR POLÍTICAS RLS DA TABELA USERS
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. VERIFICAR POLÍTICAS RLS ATUAIS
-- ========================================

-- Verificar políticas RLS existentes na tabela users
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public'
ORDER BY policyname;

-- ========================================
-- 2. REMOVER POLÍTICAS RLS PROBLEMÁTICAS
-- ========================================

-- Remover todas as políticas RLS da tabela users
DROP POLICY IF EXISTS "users_select_policy" ON public.users;
DROP POLICY IF EXISTS "users_insert_policy" ON public.users;
DROP POLICY IF EXISTS "users_update_policy" ON public.users;
DROP POLICY IF EXISTS "users_delete_policy" ON public.users;
DROP POLICY IF EXISTS "users_all_policy" ON public.users;
DROP POLICY IF EXISTS "users_authenticated_policy" ON public.users;

-- ========================================
-- 3. CRIAR POLÍTICAS RLS CORRETAS
-- ========================================

-- Política para SELECT: Usuários autenticados podem ver todos os usuários
CREATE POLICY "users_select_policy" ON public.users
    FOR SELECT
    TO authenticated
    USING (true);

-- Política para INSERT: Usuários autenticados podem inserir
CREATE POLICY "users_insert_policy" ON public.users
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Política para UPDATE: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "users_update_policy" ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Política para DELETE: Usuários podem deletar apenas seu próprio perfil
CREATE POLICY "users_delete_policy" ON public.users
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id);

-- ========================================
-- 4. VERIFICAR SE RLS ESTÁ ATIVADO
-- ========================================

-- Verificar se RLS está ativado na tabela users
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'users' 
AND schemaname = 'public';

-- ========================================
-- 5. ATIVAR RLS SE NECESSÁRIO
-- ========================================

-- Ativar RLS na tabela users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 6. TESTAR INSERÇÃO MANUAL
-- ========================================

-- Testar inserção manual para verificar se as políticas funcionam
-- DESCOMENTE APENAS SE NECESSÁRIO:
/*
INSERT INTO public.users (
    id,
    email,
    name,
    role,
    show_name,
    created_at,
    updated_at
) VALUES (
    '57ccd740-f406-4664-a3ac-5d698473851c',
    'reclamagest@gmail.com',
    'Reclamagest',
    'instrutor',
    true,
    NOW(),
    NOW()
);
*/

-- ========================================
-- 7. VERIFICAR POLÍTICAS CRIADAS
-- ========================================

-- Verificar se as políticas foram criadas corretamente
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public'
ORDER BY policyname;
