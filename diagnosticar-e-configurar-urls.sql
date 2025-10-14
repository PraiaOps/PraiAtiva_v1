-- ============================================================================
-- DIAGNÓSTICO E CONFIGURAÇÃO DE URLs - SUPABASE
-- ============================================================================
-- Este script diagnostica problemas com redirecionamento de email
-- e tenta configurar as URLs corretas quando possível
-- 
-- IMPORTANTE: Algumas configurações só podem ser alteradas pelo Dashboard
-- ============================================================================

-- ============================================================================
-- PARTE 1: DIAGNÓSTICO - Verificar configurações atuais
-- ============================================================================

-- 1.1 Verificar configurações de autenticação (se acessível)
SELECT 
    'Configurações Auth' as secao,
    key as configuracao,
    value as valor_atual
FROM auth.config
WHERE key IN ('SITE_URL', 'URI_ALLOW_LIST', 'REDIRECT_URL')
ORDER BY key;

-- 1.2 Verificar usuários não verificados
SELECT 
    'Usuários Não Verificados' as secao,
    COUNT(*) as total_usuarios,
    STRING_AGG(email, ', ') as emails
FROM auth.users
WHERE email_confirmed_at IS NULL
GROUP BY 1;

-- 1.3 Verificar usuários recentes (últimas 24 horas)
SELECT 
    'Usuários Recentes' as secao,
    id,
    email,
    CASE 
        WHEN email_confirmed_at IS NOT NULL THEN 'Verificado'
        ELSE 'Aguardando verificação'
    END as status,
    created_at,
    email_confirmed_at,
    raw_user_meta_data->>'role' as role_cadastrada
FROM auth.users
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- 1.4 Verificar usuários sem perfil criado (órfãos)
SELECT 
    'Usuários Órfãos (sem perfil)' as secao,
    au.id,
    au.email,
    au.email_confirmed_at,
    au.raw_user_meta_data->>'role' as role_metadata,
    CASE 
        WHEN u.id IS NULL THEN 'SEM PERFIL'
        ELSE 'COM PERFIL'
    END as status_perfil
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL 
  AND u.id IS NULL
ORDER BY au.created_at DESC;

-- 1.5 Verificar todos os usuários e seus perfis
SELECT 
    'Status Geral dos Usuários' as secao,
    au.email,
    CASE 
        WHEN au.email_confirmed_at IS NOT NULL THEN '✅ Verificado'
        ELSE '❌ Não verificado'
    END as email_status,
    CASE 
        WHEN u.id IS NOT NULL THEN '✅ Perfil criado'
        ELSE '❌ Sem perfil'
    END as perfil_status,
    u.role as role_atual,
    au.raw_user_meta_data->>'role' as role_metadata,
    au.created_at as cadastrado_em
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
ORDER BY au.created_at DESC
LIMIT 20;

-- ============================================================================
-- PARTE 2: CORREÇÃO - Criar perfis para usuários órfãos
-- ============================================================================

-- 2.1 Informações sobre usuários órfãos que serão corrigidos
SELECT 
    '🔧 Usuários que terão perfil criado' as acao,
    au.id,
    au.email,
    au.raw_user_meta_data->>'full_name' as nome,
    au.raw_user_meta_data->>'role' as role,
    au.email_confirmed_at
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL 
  AND u.id IS NULL;

-- 2.2 CRIAR PERFIS para usuários verificados que não têm perfil
-- Esta é a correção principal para o problema
INSERT INTO public.users (
    id,
    email,
    name,
    role,
    show_name,
    created_at,
    updated_at
)
SELECT 
    au.id,
    au.email,
    COALESCE(
        au.raw_user_meta_data->>'full_name',
        SPLIT_PART(au.email, '@', 1)
    ) as name,
    COALESCE(
        au.raw_user_meta_data->>'role',
        'aluno'
    )::text as role,
    true as show_name,
    au.created_at,
    NOW() as updated_at
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL  -- Só usuários verificados
  AND u.id IS NULL                        -- Que não têm perfil
ON CONFLICT (id) DO NOTHING;              -- Ignorar se já existir

-- 2.3 Verificar perfis criados
SELECT 
    '✅ Perfis criados com sucesso' as resultado,
    COUNT(*) as total_perfis_criados
FROM public.users u
INNER JOIN auth.users au ON au.id = u.id
WHERE u.created_at > NOW() - INTERVAL '1 minute';

-- ============================================================================
-- PARTE 3: CORREÇÃO MANUAL - Para usuários específicos
-- ============================================================================

-- 3.1 Se você souber o email do usuário com problema, execute isto:
-- SUBSTITUA 'email@exemplo.com' pelo email real do usuário

-- Descomentar as linhas abaixo e substituir o email:
/*
DO $$
DECLARE
    v_user_email TEXT := 'email@exemplo.com'; -- SUBSTITUA AQUI
    v_user_id UUID;
    v_user_name TEXT;
    v_user_role TEXT;
BEGIN
    -- Buscar dados do usuário
    SELECT 
        id,
        COALESCE(raw_user_meta_data->>'full_name', SPLIT_PART(email, '@', 1)),
        COALESCE(raw_user_meta_data->>'role', 'aluno')
    INTO v_user_id, v_user_name, v_user_role
    FROM auth.users
    WHERE email = v_user_email;
    
    IF v_user_id IS NOT NULL THEN
        -- Confirmar email se não estiver confirmado
        UPDATE auth.users
        SET email_confirmed_at = NOW()
        WHERE id = v_user_id
          AND email_confirmed_at IS NULL;
        
        -- Criar perfil se não existir
        INSERT INTO public.users (
            id, email, name, role, show_name, created_at, updated_at
        ) VALUES (
            v_user_id,
            v_user_email,
            v_user_name,
            v_user_role,
            true,
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO NOTHING;
        
        RAISE NOTICE '✅ Usuário % processado com sucesso!', v_user_email;
    ELSE
        RAISE NOTICE '❌ Usuário % não encontrado!', v_user_email;
    END IF;
END $$;
*/

-- ============================================================================
-- PARTE 4: VERIFICAÇÃO FINAL
-- ============================================================================

-- 4.1 Status final de todos os usuários
SELECT 
    '📊 RESUMO FINAL' as titulo,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL) as emails_verificados,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NULL) as emails_pendentes,
    COUNT(*) FILTER (WHERE u.id IS NOT NULL) as perfis_criados,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL AND u.id IS NULL) as usuarios_orfaos,
    COUNT(*) as total_usuarios
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id;

-- 4.2 Listar usuários problemáticos que ainda precisam de atenção
SELECT 
    '⚠️ Usuários que ainda precisam de atenção' as alerta,
    au.email,
    CASE 
        WHEN au.email_confirmed_at IS NULL THEN '❌ Email não verificado'
        WHEN u.id IS NULL THEN '❌ Perfil não criado'
        ELSE '✅ OK'
    END as problema,
    au.created_at
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NULL 
   OR (au.email_confirmed_at IS NOT NULL AND u.id IS NULL)
ORDER BY au.created_at DESC;

-- ============================================================================
-- PARTE 5: INFORMAÇÕES IMPORTANTES
-- ============================================================================

SELECT 
    '📝 INFORMAÇÕES IMPORTANTES' as secao,
    '
    ⚠️ CONFIGURAÇÕES QUE PRECISAM SER FEITAS NO DASHBOARD:
    
    1. Site URL e Redirect URLs NÃO PODEM ser alteradas via SQL
    2. Você DEVE configurar no Supabase Dashboard:
       - Authentication > URL Configuration
       - Site URL: seu domínio de produção
       - Redirect URLs: adicionar todas as URLs com /**
    
    ✅ O que este script FAZ:
    - Diagnostica usuários sem perfil
    - Cria perfis automaticamente para usuários verificados
    - Confirma emails manualmente se necessário
    
    ❌ O que este script NÃO PODE FAZER:
    - Alterar Site URL (precisa do Dashboard)
    - Alterar Redirect URLs (precisa do Dashboard)
    - Reenviar emails de confirmação
    
    📋 PRÓXIMOS PASSOS:
    1. Execute este script para criar perfis pendentes
    2. Configure as URLs no Dashboard (veja PASSO-A-PASSO-CONFIGURAR-SUPABASE.md)
    3. Faça um NOVO cadastro para testar
    4. O código já está configurado com emailRedirectTo correto
    ' as instrucoes;

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- Mensagem final
SELECT 
    '✅ SCRIPT EXECUTADO COM SUCESSO!' as resultado,
    'Verifique os resultados acima' as proximo_passo,
    NOW() as executado_em;

