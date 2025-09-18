-- Migration: Alterar campo 'date' para 'day_of_week' na tabela activities
-- Execute este script no SQL Editor do Supabase

-- 1. Adicionar nova coluna para dia da semana
ALTER TABLE public.activities 
ADD COLUMN day_of_week TEXT CHECK (day_of_week IN (
  'Segunda-feira', 
  'Terça-feira', 
  'Quarta-feira', 
  'Quinta-feira', 
  'Sexta-feira', 
  'Sábado', 
  'Domingo'
));

-- 2. Atualizar registros existentes (se houver) - converte data para dia da semana
-- Nota: Se você tiver atividades existentes, elas precisarão ser atualizadas manualmente
-- ou você pode usar uma função para converter as datas existentes

-- 3. Remover a coluna 'date' antiga (descomente após verificar que tudo está funcionando)
-- ALTER TABLE public.activities DROP COLUMN date;

-- 4. Renomear a nova coluna para 'date' (para manter compatibilidade com o código)
-- ALTER TABLE public.activities RENAME COLUMN day_of_week TO date;

-- OU, alternativa mais simples:
-- Alterar diretamente o tipo da coluna existente
ALTER TABLE public.activities 
ALTER COLUMN date TYPE TEXT,
ALTER COLUMN date DROP NOT NULL;

-- Adicionar constraint para dias da semana
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

-- Tornar a coluna obrigatória novamente
ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;

-- Atualizar comentário da tabela
COMMENT ON COLUMN public.activities.date IS 'Dia da semana da atividade (ex: Segunda-feira, Terça-feira, etc.)';
