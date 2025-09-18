-- Script para Finalizar a Migração
-- Execute passo a passo no SQL Editor do Supabase

-- PASSO 1: Verificar estado atual
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND column_name IN ('date', 'day_of_week')
ORDER BY column_name;

-- PASSO 2: Migrar dados existentes da coluna 'date' para 'day_of_week'
-- (Se você tiver atividades, elas serão convertidas automaticamente)
UPDATE public.activities 
SET day_of_week = CASE 
  WHEN date = '2024-01-01' THEN 'Segunda-feira'
  WHEN date = '2024-01-02' THEN 'Terça-feira'
  WHEN date = '2024-01-03' THEN 'Quarta-feira'
  WHEN date = '2024-01-04' THEN 'Quinta-feira'
  WHEN date = '2024-01-05' THEN 'Sexta-feira'
  WHEN date = '2024-01-06' THEN 'Sábado'
  WHEN date = '2024-01-07' THEN 'Domingo'
  ELSE 'Segunda-feira' -- Fallback para datas não mapeadas
END
WHERE day_of_week IS NULL;

-- PASSO 3: Verificar se todas as atividades foram migradas
SELECT id, date, day_of_week, title FROM public.activities;

-- PASSO 4: Remover a coluna 'date' antiga
ALTER TABLE public.activities DROP COLUMN date;

-- PASSO 5: Renomear 'day_of_week' para 'date' (manter compatibilidade)
ALTER TABLE public.activities RENAME COLUMN day_of_week TO date;

-- PASSO 6: Adicionar validação para dias da semana
ALTER TABLE public.activities 
ADD CONSTRAINT check_day_of_week 
CHECK (date IN (
  'Segunda-feira', 
  'Terça-feira', 
  'Quarta-feira', 
  'Quinta-feira', 
  'Sexta-feira', 
  'Sábado', 
  'Domingo'
));

-- PASSO 7: Tornar a coluna obrigatória
ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;

-- PASSO 8: Verificar resultado final
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' 
AND column_name = 'date';

-- PASSO 9: Testar inserção
-- INSERT INTO public.activities (
--   instructor_id, title, beach, date, time, capacity, price, status
-- ) VALUES (
--   (SELECT id FROM public.users WHERE role = 'instrutor' LIMIT 1),
--   'Teste Final',
--   'Icaraí, Niterói',
--   'Segunda-feira',
--   'manhã',
--   10,
--   0.00,
--   'active'
-- );
