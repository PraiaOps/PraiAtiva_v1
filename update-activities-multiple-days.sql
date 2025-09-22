-- ATUALIZAR ATIVIDADES PARA MÚLTIPLOS DIAS DA SEMANA
-- Execute este script no Supabase SQL Editor

-- ========================================
-- 1. ADICIONAR COLUNA PARA MÚLTIPLOS DIAS
-- ========================================

-- Adicionar nova coluna para armazenar múltiplos dias como array
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS days_of_week TEXT[];

-- ========================================
-- 2. MIGRAR DADOS EXISTENTES
-- ========================================

-- Migrar dados existentes da coluna 'date' para 'days_of_week'
UPDATE public.activities 
SET days_of_week = ARRAY[date] 
WHERE days_of_week IS NULL;

-- ========================================
-- 3. ADICIONAR CONSTRAINT PARA VALIDAR DIAS
-- ========================================

-- Adicionar constraint para validar que os dias são válidos
ALTER TABLE public.activities 
ADD CONSTRAINT check_valid_days_of_week 
CHECK (
  days_of_week IS NULL OR 
  (
    array_length(days_of_week, 1) > 0 AND 
    array_length(days_of_week, 1) <= 7 AND
    days_of_week <@ ARRAY[
      'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
      'Sexta-feira', 'Sábado', 'Domingo'
    ]
  )
);

-- ========================================
-- 4. CRIAR ÍNDICE PARA PERFORMANCE
-- ========================================

-- Criar índice GIN para busca eficiente em arrays
CREATE INDEX IF NOT EXISTS idx_activities_days_of_week 
ON public.activities USING GIN (days_of_week);

-- ========================================
-- 5. ATUALIZAR RLS (ROW LEVEL SECURITY)
-- ========================================

-- Atualizar políticas RLS se necessário
-- (As políticas existentes devem continuar funcionando)

-- ========================================
-- 6. VERIFICAR MIGRAÇÃO
-- ========================================

-- Verificar se a migração foi bem-sucedida
SELECT 
  id,
  title,
  date as old_date,
  days_of_week as new_days,
  array_length(days_of_week, 1) as num_days
FROM public.activities 
LIMIT 10;

-- ========================================
-- 7. EXEMPLO DE COMO USAR A NOVA ESTRUTURA
-- ========================================

-- Inserir atividade com múltiplos dias
-- INSERT INTO public.activities (
--   instructor_id, location_name, title, city, beach, address,
--   days_of_week, time, capacity, price, description, status, enrollments
-- ) VALUES (
--   'instructor_id_aqui',
--   'Local de Exemplo',
--   'Beach Tennis',
--   'Niterói',
--   'Icaraí',
--   'Endereço exemplo',
--   ARRAY['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
--   'manhã',
--   10,
--   50.00,
--   'Aula de Beach Tennis',
--   'active',
--   0
-- );

-- Buscar atividades por múltiplos dias
-- SELECT * FROM public.activities 
-- WHERE 'Segunda-feira' = ANY(days_of_week);

-- Buscar atividades que acontecem em qualquer um dos dias especificados
-- SELECT * FROM public.activities 
-- WHERE days_of_week && ARRAY['Segunda-feira', 'Quarta-feira'];

-- ========================================
-- 8. INSTRUÇÕES PARA O FRONTEND
-- ========================================

-- O frontend deve:
-- 1. Usar days_of_week em vez de date
-- 2. Permitir seleção múltipla de dias
-- 3. Atualizar filtros para trabalhar com arrays
-- 4. Exibir todos os dias da atividade no card
