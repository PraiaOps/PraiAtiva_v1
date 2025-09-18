-- Solução Simples para Erro de Migração
-- Execute passo a passo no SQL Editor do Supabase

-- PASSO 1: Ver os dados atuais
SELECT id, date, title, beach FROM public.activities;

-- PASSO 2: Limpar todas as atividades existentes (recomendado para desenvolvimento)
-- ATENÇÃO: Isso apagará todas as atividades cadastradas!
DELETE FROM public.activities;

-- PASSO 3: Agora executar a migração original sem problemas
ALTER TABLE public.activities 
ALTER COLUMN date TYPE TEXT,
ALTER COLUMN date DROP NOT NULL;

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

ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;

-- PASSO 4: Verificar se funcionou
\d public.activities
