-- Script para corrigir erro de migração: check constraint "check_day_of_week" violated
-- Execute este script no SQL Editor do Supabase

-- 1. Primeiro, vamos ver quais dados existem na tabela
SELECT id, date, title FROM public.activities;

-- 2. Remover a constraint que está causando problema
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS check_day_of_week;

-- 3. Atualizar os dados existentes para usar dias da semana
-- IMPORTANTE: Ajuste estes comandos conforme os dados que você viu no SELECT acima

-- Opção A: Se você quiser manter as atividades existentes, 
-- substitua as datas por dias da semana correspondentes
-- Exemplo (ajuste conforme necessário):

-- UPDATE public.activities 
-- SET date = 'Segunda-feira' 
-- WHERE date = '2024-01-15' OR date LIKE '2024%'; -- Substitua pelas datas reais

-- UPDATE public.activities 
-- SET date = 'Terça-feira' 
-- WHERE date = '2024-01-16'; -- Substitua pelas datas reais

-- Continue para outras datas...

-- Opção B: Se você quiser limpar todas as atividades existentes
-- (CUIDADO: Isso apagará todas as atividades!)
-- DELETE FROM public.activities;

-- 4. Após atualizar/limpar os dados, recriar a constraint
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

-- 5. Verificar se tudo está funcionando
SELECT * FROM public.activities;
