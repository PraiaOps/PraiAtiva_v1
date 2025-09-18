-- Script Final para Corrigir Migração do Campo Date
-- Execute passo a passo no SQL Editor do Supabase

-- PASSO 1: Remover todas as constraints que podem estar interferindo
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS check_day_of_week;

-- PASSO 2: Limpar todos os dados da tabela (para evitar conflitos de tipo)
DELETE FROM public.activities;

-- PASSO 3: Alterar o tipo da coluna de DATE para TEXT
ALTER TABLE public.activities 
ALTER COLUMN date TYPE TEXT USING date::TEXT;

-- PASSO 4: Remover a restrição NOT NULL temporariamente
ALTER TABLE public.activities 
ALTER COLUMN date DROP NOT NULL;

-- PASSO 5: Adicionar a constraint para dias da semana
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

-- PASSO 6: Restaurar a restrição NOT NULL
ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;

-- PASSO 7: Verificar a estrutura da tabela
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'activities' AND column_name = 'date';

-- PASSO 8: Teste - inserir uma atividade de exemplo (opcional)
-- INSERT INTO public.activities (
--   instructor_id, title, beach, date, time, capacity, price, status
-- ) VALUES (
--   (SELECT id FROM public.users WHERE role = 'instrutor' LIMIT 1),
--   'Teste Beach Tennis',
--   'Icaraí, Niterói',
--   'Segunda-feira',
--   'manhã',
--   10,
--   25.00,
--   'active'
-- );
