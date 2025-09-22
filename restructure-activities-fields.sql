-- Script para reestruturação completa dos campos de localização na tabela activities
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar novos campos
ALTER TABLE public.activities 
ADD COLUMN address TEXT;

-- PASSO 1.1: Verificar se o campo city já existe, se não, adicionar
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'activities' AND column_name = 'city') THEN
        ALTER TABLE public.activities ADD COLUMN city TEXT;
    END IF;
END $$;

-- PASSO 2: Backup dos dados atuais (criar view temporária)
CREATE VIEW activities_backup_view AS 
SELECT id, beach as original_beach_field, city, location_name, title 
FROM public.activities;

-- PASSO 3: Inicializar campo city baseado nas praias existentes (se ainda não estiver preenchido)
UPDATE public.activities 
SET city = CASE 
  WHEN LOWER(beach) LIKE '%icaraí%' OR 
       LOWER(beach) LIKE '%piratininga%' OR 
       LOWER(beach) LIKE '%camboinhas%' OR 
       LOWER(beach) LIKE '%itaipu%' OR 
       LOWER(beach) LIKE '%são francisco%' OR 
       LOWER(beach) LIKE '%sao francisco%' OR
       LOWER(beach) LIKE '%itacoatiara%' OR
       LOWER(beach) LIKE '%niterói%' OR
       LOWER(beach) LIKE '%niteroi%'
  THEN 'Niterói'
  
  WHEN LOWER(beach) LIKE '%copacabana%' OR 
       LOWER(beach) LIKE '%ipanema%' OR 
       LOWER(beach) LIKE '%leblon%' OR 
       LOWER(beach) LIKE '%barra da tijuca%' OR 
       LOWER(beach) LIKE '%barra%' OR
       LOWER(beach) LIKE '%recreio%' OR
       LOWER(beach) LIKE '%flamengo%' OR
       LOWER(beach) LIKE '%botafogo%' OR
       LOWER(beach) LIKE '%rio de janeiro%' OR
       LOWER(beach) LIKE '%rio%'
  THEN 'Rio de Janeiro'
  
  ELSE 'Niterói'  -- Padrão para praias não identificadas
END
WHERE city IS NULL;

-- PASSO 4: Migração de dados - Extrair praias simples e endereços dos dados atuais
-- Primeiro, vamos normalizar os valores do campo beach atual

-- Para atividades que têm endereços completos no campo beach, vamos separar
UPDATE public.activities 
SET 
  address = CASE 
    -- Extrair endereços específicos conhecidos
    WHEN beach LIKE '%Av. Roberto Silveira%' OR beach LIKE '%Avenida Roberto Silveira%' THEN 
      REGEXP_REPLACE(beach, '.*(Av\.|Avenida).*', '\1')
    WHEN beach LIKE '%Rua%' THEN 
      REGEXP_REPLACE(beach, '.*(Rua .*)$', '\1')
    WHEN beach LIKE '%Avenida%' THEN 
      REGEXP_REPLACE(beach, '.*(Avenida .*)$', '\1')
    WHEN beach LIKE '%Praia de%' THEN 
      REGEXP_REPLACE(beach, '.*Praia de ([^,]+).*', 'Praia de \1')
    ELSE NULL
  END,
  beach = CASE
    -- Normalizar nomes das praias para valores simples
    WHEN LOWER(beach) LIKE '%icaraí%' THEN 'Icaraí'
    WHEN LOWER(beach) LIKE '%copacabana%' THEN 'Copacabana'
    WHEN LOWER(beach) LIKE '%piratininga%' THEN 'Piratininga'
    WHEN LOWER(beach) LIKE '%camboinhas%' THEN 'Camboinhas'
    WHEN LOWER(beach) LIKE '%itaipu%' THEN 'Itaipu'
    WHEN LOWER(beach) LIKE '%são francisco%' OR LOWER(beach) LIKE '%sao francisco%' THEN 'São Francisco'
    WHEN LOWER(beach) LIKE '%itacoatiara%' THEN 'Itacoatiara'
    WHEN LOWER(beach) LIKE '%ipanema%' THEN 'Ipanema'
    WHEN LOWER(beach) LIKE '%leblon%' THEN 'Leblon'
    WHEN LOWER(beach) LIKE '%barra da tijuca%' OR LOWER(beach) LIKE '%barra%' THEN 'Barra da Tijuca'
    WHEN LOWER(beach) LIKE '%recreio%' THEN 'Recreio'
    WHEN LOWER(beach) LIKE '%flamengo%' THEN 'Flamengo'
    WHEN LOWER(beach) LIKE '%botafogo%' THEN 'Botafogo'
    -- Se não conseguir identificar, manter como estava mas limpar formatação
    ELSE TRIM(REGEXP_REPLACE(beach, ',.*$', ''))
  END;

-- PASSO 5: Para registros onde não conseguimos extrair endereço, 
-- vamos tentar preencher com base no padrão comum
UPDATE public.activities 
SET address = CASE 
  WHEN address IS NULL AND beach = 'Icaraí' THEN 'Avenida Roberto Silveira'
  WHEN address IS NULL AND beach = 'Copacabana' THEN 'Avenida Atlântica'
  WHEN address IS NULL AND beach = 'Ipanema' THEN 'Avenida Vieira Souto'
  WHEN address IS NULL AND beach = 'Leblon' THEN 'Avenida Delfim Moreira'
  WHEN address IS NULL AND beach = 'Piratininga' THEN 'Estrada de Piratininga'
  WHEN address IS NULL AND beach = 'Camboinhas' THEN 'Estrada de Camboinhas'
  WHEN address IS NULL AND beach = 'Itaipu' THEN 'Estrada de Itaipu'
  WHEN address IS NULL AND beach = 'São Francisco' THEN 'Estrada de São Francisco'
  WHEN address IS NULL AND beach = 'Itacoatiara' THEN 'Estrada de Itacoatiara'
  WHEN address IS NULL AND beach = 'Barra da Tijuca' THEN 'Avenida das Américas'
  WHEN address IS NULL AND beach = 'Recreio' THEN 'Avenida das Américas'
  ELSE address
END
WHERE address IS NULL;

-- PASSO 6: Verificar quais valores de beach ainda existem antes de adicionar constraint
SELECT DISTINCT beach, COUNT(*) as total
FROM public.activities 
GROUP BY beach
ORDER BY beach;

-- PASSO 6.1: Normalizar valores restantes que não foram capturados
UPDATE public.activities 
SET beach = CASE
  -- Casos específicos que podem ter ficado de fora
  WHEN beach = '' OR beach IS NULL THEN 'Icaraí'  -- Padrão para valores vazios
  WHEN LOWER(beach) LIKE '%praia%' AND LOWER(beach) LIKE '%icaraí%' THEN 'Icaraí'
  WHEN LOWER(beach) LIKE '%praia%' AND LOWER(beach) LIKE '%copacabana%' THEN 'Copacabana'
  -- Se ainda não foi normalizado, tentar extrair o nome da praia
  WHEN beach LIKE '%,%' THEN TRIM(SPLIT_PART(beach, ',', 1))
  -- Casos com formatação diferente
  WHEN LOWER(beach) LIKE '%icara%' THEN 'Icaraí'
  WHEN LOWER(beach) LIKE '%copa%' THEN 'Copacabana'
  WHEN LOWER(beach) LIKE '%pirat%' THEN 'Piratininga'
  WHEN LOWER(beach) LIKE '%cambo%' THEN 'Camboinhas'
  WHEN LOWER(beach) LIKE '%itaip%' THEN 'Itaipu'
  WHEN LOWER(beach) LIKE '%francisco%' THEN 'São Francisco'
  WHEN LOWER(beach) LIKE '%itacoa%' THEN 'Itacoatiara'
  WHEN LOWER(beach) LIKE '%ipane%' THEN 'Ipanema'
  WHEN LOWER(beach) LIKE '%leblo%' THEN 'Leblon'
  WHEN LOWER(beach) LIKE '%tijuca%' THEN 'Barra da Tijuca'
  WHEN LOWER(beach) LIKE '%recrei%' THEN 'Recreio'
  WHEN LOWER(beach) LIKE '%flamen%' THEN 'Flamengo'
  WHEN LOWER(beach) LIKE '%botaf%' THEN 'Botafogo'
  ELSE beach  -- Manter como está se não conseguir identificar
END
WHERE beach NOT IN (
  'Icaraí', 'Copacabana', 'Piratininga', 'Camboinhas', 'Itaipu', 'São Francisco', 
  'Itacoatiara', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Recreio', 'Flamengo', 
  'Botafogo', 'Joatinga', 'Grumari', 'Prainha', 'Macumba'
);

-- PASSO 6.2: Verificar novamente os valores únicos após normalização
SELECT DISTINCT beach, COUNT(*) as total
FROM public.activities 
GROUP BY beach
ORDER BY beach;

-- PASSO 6.3: Para valores que ainda não foram normalizados, definir como Icaraí (padrão)
UPDATE public.activities 
SET beach = 'Icaraí'
WHERE beach NOT IN (
  'Icaraí', 'Copacabana', 'Piratininga', 'Camboinhas', 'Itaipu', 'São Francisco', 
  'Itacoatiara', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Recreio', 'Flamengo', 
  'Botafogo', 'Joatinga', 'Grumari', 'Prainha', 'Macumba'
);

-- PASSO 6.4: Agora adicionar constraint (após garantir que todos os valores são válidos)
ALTER TABLE public.activities 
ADD CONSTRAINT check_beach_simple_name 
CHECK (beach IN (
  'Icaraí', 'Copacabana', 'Piratininga', 'Camboinhas', 'Itaipu', 'São Francisco', 
  'Itacoatiara', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Recreio', 'Flamengo', 
  'Botafogo', 'Joatinga', 'Grumari', 'Prainha', 'Macumba'
));

-- PASSO 7: Tornar campo address obrigatório
ALTER TABLE public.activities 
ALTER COLUMN address SET NOT NULL;

-- PASSO 8: Verificar a estrutura atualizada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND column_name IN ('city', 'beach', 'address', 'location_name')
ORDER BY ordinal_position;

-- PASSO 9: Verificar dados migrados
SELECT 
  id, 
  city,
  beach,
  address,
  location_name,
  title
FROM public.activities 
LIMIT 10;

-- PASSO 10: Verificar distribuição por praia
SELECT 
  city,
  beach, 
  COUNT(*) as total_activities
FROM public.activities 
GROUP BY city, beach
ORDER BY city, beach;

-- PASSO 11: Verificar se há algum registro com dados inconsistentes
SELECT 
  id,
  city,
  beach,
  address,
  'Possível inconsistência' as issue
FROM public.activities 
WHERE 
  (city = 'Niterói' AND beach IN ('Copacabana', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Recreio')) OR
  (city = 'Rio de Janeiro' AND beach IN ('Icaraí', 'Piratininga', 'Camboinhas', 'Itaipu', 'São Francisco', 'Itacoatiara'));

-- PASSO 12: Remover view de backup (opcional - executar só depois de confirmar que está tudo ok)
-- DROP VIEW activities_backup_view;
