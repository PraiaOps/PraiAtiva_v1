-- EXPORTAR DADOS PARA CSV LOCAL
-- Execute este script no Supabase SQL Editor
-- Os dados serão exportados e você pode copiar para arquivos locais

-- ========================================
-- 1. EXPORTAR ATIVIDADES COMPLETAS
-- ========================================

-- Copie o resultado deste comando para um arquivo chamado 'activities_export.csv'
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
-- 2. EXPORTAR USUÁRIOS COMPLETOS
-- ========================================

-- Copie o resultado deste comando para um arquivo chamado 'users_export.csv'
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

-- Copie o resultado deste comando para um arquivo chamado 'activities_with_instructors.csv'
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
-- 4. EXPORTAR RELATÓRIO DE ESTATÍSTICAS
-- ========================================

-- Copie o resultado deste comando para um arquivo chamado 'statistics_report.csv'
COPY (
    SELECT 
        'ATIVIDADES_POR_TIPO' as categoria,
        title as tipo,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as ativas,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inativas
    FROM public.activities
    GROUP BY title
    ORDER BY total DESC
    
    UNION ALL
    
    SELECT 
        'ATIVIDADES_POR_CIDADE' as categoria,
        city as tipo,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as ativas,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inativas
    FROM public.activities
    GROUP BY city
    ORDER BY total DESC
    
    UNION ALL
    
    SELECT 
        'ATIVIDADES_POR_PRAIA' as categoria,
        beach as tipo,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as ativas,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inativas
    FROM public.activities
    GROUP BY beach
    ORDER BY total DESC
    
    UNION ALL
    
    SELECT 
        'USUARIOS_POR_ROLE' as categoria,
        role as tipo,
        COUNT(*) as total,
        0 as ativas,
        0 as inativas
    FROM public.users
    GROUP BY role
    ORDER BY total DESC
) TO STDOUT WITH CSV HEADER;

-- ========================================
-- 5. EXPORTAR ATIVIDADES POR INSTRUTOR
-- ========================================

-- Copie o resultado deste comando para um arquivo chamado 'activities_by_instructor.csv'
COPY (
    SELECT 
        u.name as instructor_name,
        u.email as instructor_email,
        u.role as instructor_role,
        COUNT(a.id) as total_atividades,
        COUNT(CASE WHEN a.status = 'active' THEN 1 END) as atividades_ativas,
        COUNT(CASE WHEN a.status = 'inactive' THEN 1 END) as atividades_inativas,
        SUM(a.capacity) as capacidade_total,
        SUM(a.enrollments) as inscricoes_total,
        AVG(a.price) as preco_medio,
        MIN(a.created_at) as primeira_atividade,
        MAX(a.created_at) as ultima_atividade
    FROM public.users u
    LEFT JOIN public.activities a ON u.id = a.instructor_id
    GROUP BY u.id, u.name, u.email, u.role
    ORDER BY total_atividades DESC
) TO STDOUT WITH CSV HEADER;

-- ========================================
-- 6. INSTRUÇÕES PARA SALVAR LOCALMENTE
-- ========================================

-- Após executar os comandos acima:
-- 1. Copie cada resultado para um arquivo .csv correspondente
-- 2. Salve os arquivos na pasta 'exports/' do projeto
-- 3. Os arquivos serão ignorados pelo Git automaticamente

-- Estrutura de arquivos sugerida:
-- exports/
--   ├── activities_export.csv
--   ├── users_export.csv
--   ├── activities_with_instructors.csv
--   ├── statistics_report.csv
--   └── activities_by_instructor.csv

