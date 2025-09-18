-- Script para adicionar campo de controle de visibilidade do nome
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar nova coluna 'show_name' (padrão TRUE para manter compatibilidade)
ALTER TABLE public.users 
ADD COLUMN show_name BOOLEAN DEFAULT TRUE;

-- PASSO 2: Definir valor padrão para usuários existentes
UPDATE public.users 
SET show_name = TRUE 
WHERE show_name IS NULL;

-- PASSO 3: Tornar a coluna obrigatória
ALTER TABLE public.users 
ALTER COLUMN show_name SET NOT NULL;

-- PASSO 4: Verificar a estrutura atualizada
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name = 'show_name';

-- PASSO 5: Verificar dados existentes
SELECT id, name, email, role, show_name FROM public.users LIMIT 5;
