-- Script simplificado para normalizar campo beach baseado nos dados reais
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar campo address se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'activities' AND column_name = 'address') THEN
        ALTER TABLE public.activities ADD COLUMN address TEXT;
    END IF;
END $$;

-- PASSO 2: Adicionar campo city se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'activities' AND column_name = 'city') THEN
        ALTER TABLE public.activities ADD COLUMN city TEXT;
    END IF;
END $$;

-- PASSO 3: Backup dos dados atuais
CREATE OR REPLACE VIEW activities_backup_view AS 
SELECT id, beach as original_beach_field, city, location_name, title 
FROM public.activities;

-- PASSO 4: Normalizar campo beach baseado nos valores existentes
UPDATE public.activities 
SET beach = CASE
  -- Normalizar para os valores exatos que você tem
  WHEN LOWER(beach) LIKE '%icaraí%' OR LOWER(beach) LIKE '%icara%' THEN 'Icaraí'
  WHEN LOWER(beach) LIKE '%charitas%' THEN 'Charitas'  
  WHEN LOWER(beach) LIKE '%são francisco%' OR LOWER(beach) LIKE '%sao francisco%' THEN 'São Francisco'
  WHEN LOWER(beach) LIKE '%ponta d''areia%' OR LOWER(beach) LIKE '%ponta dareia%' THEN 'Ponta D''Areia'
  WHEN LOWER(beach) LIKE '%camboinhas%' THEN 'Camboinhas'
  WHEN LOWER(beach) LIKE '%gragoatá%' OR LOWER(beach) LIKE '%gragoata%' THEN 'Gragoatá'
  
  -- Para o caso especial com múltiplas praias, usar a primeira
  WHEN beach LIKE '%São Francisco / Charitas / Camboinhas%' THEN 'São Francisco'
  
  -- Casos adicionais baseados em praias comuns do RJ/Niterói
  WHEN LOWER(beach) LIKE '%copacabana%' THEN 'Copacabana'
  WHEN LOWER(beach) LIKE '%ipanema%' THEN 'Ipanema'
  WHEN LOWER(beach) LIKE '%leblon%' THEN 'Leblon'
  WHEN LOWER(beach) LIKE '%piratininga%' THEN 'Piratininga'
  WHEN LOWER(beach) LIKE '%itaipu%' THEN 'Itaipu'
  WHEN LOWER(beach) LIKE '%itacoatiara%' THEN 'Itacoatiara'
  WHEN LOWER(beach) LIKE '%barra%' THEN 'Barra da Tijuca'
  WHEN LOWER(beach) LIKE '%recreio%' THEN 'Recreio'
  WHEN LOWER(beach) LIKE '%flamengo%' THEN 'Flamengo'
  WHEN LOWER(beach) LIKE '%botafogo%' THEN 'Botafogo'
  
  -- Se não conseguir identificar, manter como estava mas limpar
  ELSE TRIM(REGEXP_REPLACE(beach, ',.*$', ''))
END;

-- PASSO 5: Definir campo city baseado nas praias
UPDATE public.activities 
SET city = CASE 
  WHEN beach IN ('Icaraí', 'Charitas', 'São Francisco', 'Ponta D''Areia', 'Camboinhas', 'Gragoatá', 'Piratininga', 'Itaipu', 'Itacoatiara') 
  THEN 'Niterói'
  
  WHEN beach IN ('Copacabana', 'Ipanema', 'Leblon', 'Barra da Tijuca', 'Recreio', 'Flamengo', 'Botafogo') 
  THEN 'Rio de Janeiro'
  
  ELSE 'Niterói'  -- Padrão para Niterói
END
WHERE city IS NULL;

-- PASSO 6: Preencher endereços padrão baseados nas praias
UPDATE public.activities 
SET address = CASE 
  WHEN address IS NULL AND beach = 'Icaraí' THEN 'Avenida Roberto Silveira'
  WHEN address IS NULL AND beach = 'Charitas' THEN 'Rua General Rondon'
  WHEN address IS NULL AND beach = 'São Francisco' THEN 'Estrada de São Francisco'
  WHEN address IS NULL AND beach = 'Ponta D''Areia' THEN 'Avenida Marquês do Paraná'
  WHEN address IS NULL AND beach = 'Camboinhas' THEN 'Estrada de Camboinhas'
  WHEN address IS NULL AND beach = 'Gragoatá' THEN 'Rua Miguel de Frias'
  WHEN address IS NULL AND beach = 'Copacabana' THEN 'Avenida Atlântica'
  WHEN address IS NULL AND beach = 'Ipanema' THEN 'Avenida Vieira Souto'
  WHEN address IS NULL AND beach = 'Leblon' THEN 'Avenida Delfim Moreira'
  WHEN address IS NULL AND beach = 'Piratininga' THEN 'Estrada de Piratininga'
  WHEN address IS NULL AND beach = 'Itaipu' THEN 'Estrada de Itaipu'
  WHEN address IS NULL AND beach = 'Itacoatiara' THEN 'Estrada de Itacoatiara'
  WHEN address IS NULL AND beach = 'Barra da Tijuca' THEN 'Avenida das Américas'
  WHEN address IS NULL AND beach = 'Recreio' THEN 'Avenida das Américas'
  WHEN address IS NULL AND beach = 'Flamengo' THEN 'Aterro do Flamengo'
  WHEN address IS NULL AND beach = 'Botafogo' THEN 'Praia de Botafogo'
  ELSE COALESCE(address, 'Endereço não especificado')
END
WHERE address IS NULL;

-- PASSO 7: Verificar valores únicos de beach após normalização
SELECT DISTINCT beach, COUNT(*) as total
FROM public.activities 
GROUP BY beach
ORDER BY beach;

-- PASSO 8: Para valores que ainda não foram normalizados, definir como Icaraí (mais comum)
UPDATE public.activities 
SET beach = 'Icaraí'
WHERE beach NOT IN (
  'Icaraí', 'Charitas', 'São Francisco', 'Ponta D''Areia', 'Camboinhas', 'Gragoatá',
  'Copacabana', 'Ipanema', 'Leblon', 'Piratininga', 'Itaipu', 'Itacoatiara', 
  'Barra da Tijuca', 'Recreio', 'Flamengo', 'Botafogo'
);

-- PASSO 9: Adicionar constraint para garantir apenas praias válidas
ALTER TABLE public.activities 
ADD CONSTRAINT check_beach_valid_names 
CHECK (beach IN (
  'Icaraí', 'Charitas', 'São Francisco', 'Ponta D''Areia', 'Camboinhas', 'Gragoatá',
  'Copacabana', 'Ipanema', 'Leblon', 'Piratininga', 'Itaipu', 'Itacoatiara', 
  'Barra da Tijuca', 'Recreio', 'Flamengo', 'Botafogo'
));

-- PASSO 10: Tornar campos obrigatórios
ALTER TABLE public.activities 
ALTER COLUMN address SET NOT NULL,
ALTER COLUMN city SET NOT NULL;

-- PASSO 11: Verificar resultado final
SELECT 
  city,
  beach, 
  COUNT(*) as total_activities
FROM public.activities 
GROUP BY city, beach
ORDER BY city, beach;

-- PASSO 12: Verificar alguns registros para validação
SELECT 
  id, 
  city,
  beach,
  address,
  location_name,
  title
FROM public.activities 
LIMIT 10;

-- PASSO 13: Remover view de backup (opcional - executar depois de confirmar)
-- DROP VIEW activities_backup_view;
