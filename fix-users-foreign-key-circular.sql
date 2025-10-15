-- ============================================
-- FIX: Remover foreign key circular na tabela users
-- ============================================
-- 
-- Problema: A tabela users tem uma foreign key que referencia
-- ela mesma (users_id_fkey), causando erro ao criar perfis novos
--
-- Solução: Remover essa constraint circular
-- ============================================

-- 1. Verificar constraints existentes na tabela users
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.users'::regclass;

-- 2. Remover a foreign key circular (se existir)
DO $$ 
BEGIN
    -- Verificar se a constraint existe antes de tentar remover
    IF EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'users_id_fkey' 
        AND conrelid = 'public.users'::regclass
    ) THEN
        ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;
        RAISE NOTICE '✅ Foreign key circular removida com sucesso!';
    ELSE
        RAISE NOTICE 'ℹ️ Foreign key circular não encontrada (já foi removida ou nunca existiu)';
    END IF;
END $$;

-- 3. Verificar constraints após remoção
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.users'::regclass;

-- 4. Confirmar que a tabela está OK
SELECT COUNT(*) as total_users FROM public.users;

-- ============================================
-- INSTRUÇÕES:
-- ============================================
-- 1. Acesse o Supabase Dashboard
-- 2. Vá em SQL Editor
-- 3. Cole e execute este script
-- 4. Verifique se aparece "✅ Foreign key circular removida com sucesso!"
-- ============================================

