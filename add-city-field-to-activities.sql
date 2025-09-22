-- Script para adicionar campo "cidade" na tabela activities
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar nova coluna cidade
ALTER TABLE public.activities 
ADD COLUMN city TEXT;

-- PASSO 2: Preencher campo cidade baseado nas praias existentes (migração de dados)
UPDATE public.activities 
SET city = CASE 
  WHEN LOWER(beach) LIKE '%icaraí%' OR 
       LOWER(beach) LIKE '%piratininga%' OR 
       LOWER(beach) LIKE '%camboinhas%' OR 
       LOWER(beach) LIKE '%itaipu%' OR 
       LOWER(beach) LIKE '%são francisco%' OR 
       LOWER(beach) LIKE '%itacoatiara%' OR
       LOWER(beach) LIKE '%niterói%' OR
       LOWER(beach) LIKE '%niteroi%'
  THEN 'Niterói'
  
  WHEN LOWER(beach) LIKE '%copacabana%' OR 
       LOWER(beach) LIKE '%ipanema%' OR 
       LOWER(beach) LIKE '%leblon%' OR 
       LOWER(beach) LIKE '%barra da tijuca%' OR 
       LOWER(beach) LIKE '%recreio%' OR
       LOWER(beach) LIKE '%rio de janeiro%' OR
       LOWER(beach) LIKE '%rio%'
  THEN 'Rio de Janeiro'
  
  ELSE 'Niterói'  -- Padrão para praias não identificadas
END
WHERE city IS NULL;

-- PASSO 3: Tornar a coluna obrigatória
ALTER TABLE public.activities 
ALTER COLUMN city SET NOT NULL;

-- PASSO 4: Adicionar constraint para garantir apenas cidades válidas
ALTER TABLE public.activities 
ADD CONSTRAINT check_city 
CHECK (city IN ('Niterói', 'Rio de Janeiro'));

-- PASSO 5: Verificar a estrutura atualizada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND column_name IN ('city', 'beach', 'location_name')
ORDER BY ordinal_position;

-- PASSO 6: Verificar dados atualizados
SELECT id, city, beach, title, location_name 
FROM public.activities 
LIMIT 10;

-- PASSO 7: Verificar distribuição por cidade
SELECT city, COUNT(*) as total_activities
FROM public.activities 
GROUP BY city
ORDER BY total_activities DESC;
