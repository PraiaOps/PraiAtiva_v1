-- Script para verificar o status da migração
-- Execute no SQL Editor do Supabase para verificar o estado atual

-- 1. Verificar estrutura atual da tabela activities
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar se existe a coluna day_of_week
SELECT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'activities' 
    AND column_name = 'day_of_week'
    AND table_schema = 'public'
) as day_of_week_exists;

-- 3. Verificar constraints existentes
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'public.activities'::regclass;

-- 4. Ver dados atuais (se houver)
SELECT id, date, title, beach FROM public.activities LIMIT 5;
