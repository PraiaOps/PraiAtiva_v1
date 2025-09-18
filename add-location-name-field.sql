-- Script para adicionar campo "Nome do local de atuação"
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar nova coluna
ALTER TABLE public.activities 
ADD COLUMN location_name TEXT;

-- PASSO 2: Tornar a coluna obrigatória (após dados existentes serem atualizados)
-- Primeiro, vamos preencher com um valor padrão para atividades existentes
UPDATE public.activities 
SET location_name = 'Local não especificado' 
WHERE location_name IS NULL;

-- PASSO 3: Agora tornar obrigatória
ALTER TABLE public.activities 
ALTER COLUMN location_name SET NOT NULL;

-- PASSO 4: Verificar a estrutura atualizada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND column_name IN ('location_name', 'beach', 'date')
ORDER BY ordinal_position;

-- PASSO 5: Verificar dados existentes
SELECT id, location_name, beach, title FROM public.activities LIMIT 5;
