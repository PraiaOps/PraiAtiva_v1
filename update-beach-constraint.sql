-- Script para atualizar constraint de praias para incluir a opção "Outra"
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar constraint atual
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'check_beach_valid_names';

-- PASSO 2: Remover constraint antiga
ALTER TABLE public.activities 
DROP CONSTRAINT IF EXISTS check_beach_valid_names;

-- PASSO 3: Criar nova constraint que inclui a opção "Outra"
ALTER TABLE public.activities 
ADD CONSTRAINT check_beach_valid_names 
CHECK (beach IN (
  'Icaraí', 
  'Charitas', 
  'São Francisco', 
  'Ponta D''Areia', 
  'Camboinhas', 
  'Gragoatá',
  'Outra'
));

-- PASSO 4: Verificar nova constraint
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'check_beach_valid_names';

-- PASSO 5: Verificar praias existentes na tabela
SELECT DISTINCT beach, COUNT(*) as total
FROM public.activities 
GROUP BY beach
ORDER BY beach;
