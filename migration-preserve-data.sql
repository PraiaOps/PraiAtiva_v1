-- Script para Migrar Campo Date Preservando Dados Existentes
-- Execute passo a passo no SQL Editor do Supabase

-- PASSO 1: Ver os dados atuais (para você saber o que precisa trocar depois)
SELECT id, date, title, beach FROM public.activities;

-- PASSO 2: Remover constraints que podem estar interferindo
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS check_day_of_week;

-- PASSO 3: Adicionar uma nova coluna temporária para dias da semana
ALTER TABLE public.activities 
ADD COLUMN day_of_week TEXT;

-- PASSO 4: Você pode atualizar manualmente os dados quando quiser
-- Exemplo (não execute agora, apenas para referência):
-- UPDATE public.activities SET day_of_week = 'Segunda-feira' WHERE id = 'ID_DA_ATIVIDADE';
-- UPDATE public.activities SET day_of_week = 'Terça-feira' WHERE id = 'OUTRO_ID';

-- PASSO 5: Após você atualizar todos os registros manualmente, execute este bloco:
-- (NÃO EXECUTE AGORA - Apenas quando todos os dados estiverem atualizados)

/*
-- Remover a coluna date antiga
ALTER TABLE public.activities DROP COLUMN date;

-- Renomear a nova coluna para date
ALTER TABLE public.activities RENAME COLUMN day_of_week TO date;

-- Adicionar constraint para validar dias da semana
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

-- Tornar a coluna obrigatória
ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;
*/

-- PASSO 6: Verificar o resultado
SELECT id, date, day_of_week, title FROM public.activities;
