-- Script para verificar a estrutura atual da tabela activities
-- Execute este script no SQL Editor do Supabase para ver quais colunas existem

-- 1. Verificar estrutura da tabela activities
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'activities'
ORDER BY ordinal_position;

-- 2. Verificar se existe alguma coluna relacionada a data/dia
SELECT column_name
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'activities'
AND (column_name ILIKE '%date%' OR column_name ILIKE '%day%' OR column_name ILIKE '%week%');

-- 3. Ver algumas linhas de exemplo (se existirem)
SELECT * FROM public.activities LIMIT 3;
