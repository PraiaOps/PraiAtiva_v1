-- Script para adicionar novos tipos de atividades: Vela e Circuito Funcional
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar constraint atual
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'check_title_valid_types';

-- PASSO 2: Remover constraint antiga
ALTER TABLE public.activities 
DROP CONSTRAINT IF EXISTS check_title_valid_types;

-- PASSO 3: Criar nova constraint com os tipos adicionais
ALTER TABLE public.activities 
ADD CONSTRAINT check_title_valid_types 
CHECK (title IN (
  'Beach Tennis', 
  'Canoa Havaiana', 
  'Circuito Funcional',
  'Futevôlei', 
  'Vela',
  'Vôlei de Praia'
));

-- PASSO 4: Verificar nova constraint
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'check_title_valid_types';

-- PASSO 5: Verificar tipos de atividades existentes na tabela
SELECT DISTINCT title, COUNT(*) as total
FROM public.activities 
GROUP BY title
ORDER BY title;
