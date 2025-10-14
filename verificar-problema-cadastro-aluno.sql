-- ============================================================================
-- VERIFICAR PROBLEMA ESPECÍFICO NO CADASTRO DE ALUNO
-- ============================================================================
-- Execute este script para descobrir exatamente o que está acontecendo
-- ============================================================================

-- 1. Ver TODOS os usuários cadastrados recentemente (últimas 48 horas)
SELECT 
    '📊 USUÁRIOS RECENTES (48h)' as secao,
    au.email,
    au.raw_user_meta_data->>'role' as role_cadastrada,
    CASE 
        WHEN au.email_confirmed_at IS NOT NULL THEN '✅ Email confirmado'
        ELSE '⏳ Aguardando confirmação'
    END as status_email,
    CASE 
        WHEN u.id IS NOT NULL THEN '✅ Perfil criado'
        ELSE '❌ SEM PERFIL'
    END as status_perfil,
    u.role as role_no_perfil,
    au.created_at as cadastrado_em,
    au.email_confirmed_at as email_confirmado_em,
    u.created_at as perfil_criado_em
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.created_at > NOW() - INTERVAL '48 hours'
ORDER BY au.created_at DESC;

-- 2. Ver quantos instrutores vs alunos existem
SELECT 
    '📈 ESTATÍSTICAS POR ROLE' as secao,
    role,
    COUNT(*) as quantidade
FROM public.users
GROUP BY role
ORDER BY quantidade DESC;

-- 3. Ver se há usuários com email confirmado mas SEM perfil
SELECT 
    '⚠️ USUÁRIOS SEM PERFIL (Email confirmado)' as secao,
    au.email,
    au.raw_user_meta_data->>'role' as role_que_tentou_cadastrar,
    au.raw_user_meta_data->>'full_name' as nome,
    au.created_at as cadastrado_em,
    au.email_confirmed_at as confirmou_email_em,
    EXTRACT(EPOCH FROM (au.email_confirmed_at - au.created_at))/60 as minutos_para_confirmar
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL
  AND u.id IS NULL
ORDER BY au.created_at DESC;

-- 4. Comparar instrutores vs alunos que confirmaram email
SELECT 
    '🔍 CONFIRMAÇÃO POR ROLE' as secao,
    au.raw_user_meta_data->>'role' as role_cadastrada,
    COUNT(*) as total_cadastrados,
    COUNT(au.email_confirmed_at) as confirmaram_email,
    COUNT(u.id) as tem_perfil,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL AND u.id IS NULL) as confirmaram_mas_sem_perfil
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
GROUP BY au.raw_user_meta_data->>'role'
ORDER BY total_cadastrados DESC;

-- 5. Ver se há diferença no metadata entre instrutores e alunos
SELECT 
    '🔬 METADATA DOS USUÁRIOS' as secao,
    au.email,
    au.raw_user_meta_data as metadata_completo,
    CASE 
        WHEN u.id IS NOT NULL THEN '✅ Tem perfil'
        ELSE '❌ Sem perfil'
    END as status
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.created_at > NOW() - INTERVAL '7 days'
ORDER BY au.created_at DESC
LIMIT 10;

-- 6. Verificar se RLS está bloqueando alguma coisa
SELECT 
    '🔒 POLÍTICAS RLS DA TABELA USERS' as secao,
    policyname as nome_politica,
    cmd as tipo_operacao,
    qual as expressao,
    with_check as check_expressao
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'users'
ORDER BY cmd, policyname;

-- 7. Teste específico: Tentar inserir um aluno manualmente
-- (Isso vai falhar se houver problema de RLS ou constraints)
DO $$
DECLARE
    test_result TEXT;
BEGIN
    BEGIN
        -- Tentar criar um usuário de teste
        INSERT INTO public.users (
            id,
            email,
            name,
            role,
            show_name,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            'teste_aluno_' || floor(random() * 10000) || '@teste.com',
            'Teste Aluno',
            'aluno',
            true,
            NOW(),
            NOW()
        );
        test_result := '✅ Conseguiu inserir aluno manualmente';
    EXCEPTION WHEN OTHERS THEN
        test_result := '❌ ERRO ao inserir aluno: ' || SQLERRM;
    END;
    
    RAISE NOTICE '%', test_result;
    
    -- Deletar o teste
    DELETE FROM public.users 
    WHERE email LIKE 'teste_aluno_%@teste.com';
END $$;

-- 8. Ver último erro relacionado a usuários (se houver logs)
SELECT 
    '📋 RESUMO FINAL' as titulo,
    'Execute as consultas acima para entender o problema' as instrucao,
    'Se usuários aparecem em auth.users mas não em public.users,' as diagnostico,
    'então o problema é na criação do perfil, não no redirect' as conclusao;

-- ============================================================================
-- INTERPRETAÇÃO DOS RESULTADOS:
-- ============================================================================
-- 
-- Se você ver:
-- ✅ Instrutores com perfil criado
-- ❌ Alunos SEM perfil criado
-- 
-- Então o problema NÃO é o redirect, é a criação do perfil!
-- Execute: corrigir-usuarios-sem-perfil.sql
-- 
-- Se TODOS (instrutores e alunos) estão sem perfil:
-- Então o problema é a confirmação de email / redirect
-- 
-- ============================================================================

