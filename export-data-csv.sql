-- EXPORTAR DADOS PARA CSV
-- Execute este script no SQL Editor do Supabase
-- Os dados serão exportados em formato CSV

-- ========================================
-- 1. EXPORTAR ATIVIDADES
-- ========================================

-- Exportar todas as atividades
COPY (
    SELECT 
        id,
        instructor_id,
        location_name,
        title,
        city,
        beach,
        address,
        date,
        time,
        capacity,
        price,
        description,
        status,
        enrollments,
        created_at,
        updated_at
    FROM public.activities
    ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;

-- ========================================
-- 2. EXPORTAR USUÁRIOS
-- ========================================

-- Exportar todos os usuários
COPY (
    SELECT 
        id,
        email,
        name,
        role,
        created_at,
        updated_at
    FROM public.users
    ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;

-- ========================================
-- 3. EXPORTAR ATIVIDADES COM NOMES DOS INSTRUTORES
-- ========================================

-- Exportar atividades com nomes dos instrutores
COPY (
    SELECT 
        a.id,
        a.location_name,
        a.title,
        a.city,
        a.beach,
        a.address,
        a.date,
        a.time,
        a.capacity,
        a.price,
        a.description,
        a.status,
        a.enrollments,
        u.name as instructor_name,
        u.email as instructor_email,
        a.created_at,
        a.updated_at
    FROM public.activities a
    LEFT JOIN public.users u ON a.instructor_id = u.id
    ORDER BY a.created_at DESC
) TO STDOUT WITH CSV HEADER;

-- ========================================
-- 4. RELATÓRIO DE EXPORTAÇÃO
-- ========================================

-- Contar registros que serão exportados
SELECT 
    'RELATÓRIO DE EXPORTAÇÃO' as categoria,
    'activities' as tabela,
    COUNT(*) as total_registros
FROM public.activities

UNION ALL

SELECT 
    'RELATÓRIO DE EXPORTAÇÃO' as categoria,
    'users' as tabela,
    COUNT(*) as total_registros
FROM public.users;

