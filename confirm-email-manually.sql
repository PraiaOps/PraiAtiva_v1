-- Script para confirmar email manualmente no Supabase
-- Use este script como solução temporária enquanto configura o envio de emails

-- 1. Verificar usuários que precisam de confirmação
SELECT 
    id,
    email,
    email_confirmed_at,
    confirmed_at,
    created_at
FROM auth.users
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC;

-- 2. CONFIRMAR MANUALMENTE o email do usuário específico
-- Substitua 'praiativaops@gmail.com' pelo email correto se necessário
UPDATE auth.users 
SET 
    email_confirmed_at = NOW()
WHERE email = 'praiativaops@gmail.com' 
AND email_confirmed_at IS NULL;

-- 3. Verificar se a confirmação foi aplicada
SELECT 
    id,
    email,
    email_confirmed_at,
    confirmed_at,
    created_at
FROM auth.users
WHERE email = 'praiativaops@gmail.com';

-- 4. REABILITAR RLS com políticas simples (execute a PARTE 2 do script anterior)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "simple_insert_policy" 
ON public.users FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "simple_select_policy" 
ON public.users FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "simple_update_policy" 
ON public.users FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Verificar se as políticas foram criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;
