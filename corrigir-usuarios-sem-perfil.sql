-- ============================================================================
-- CORREÇÃO RÁPIDA: Criar perfis para usuários sem perfil
-- ============================================================================
-- Execute este script no SQL Editor do Supabase
-- Ele vai criar perfis automaticamente para todos os usuários verificados
-- que ainda não têm perfil na tabela public.users
-- ============================================================================

-- PASSO 1: Ver quantos usuários precisam de correção
SELECT 
    'Total de usuários sem perfil' as status,
    COUNT(*) as quantidade
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL  -- Email confirmado
  AND u.id IS NULL;                      -- Mas sem perfil

-- PASSO 2: Ver detalhes dos usuários que serão corrigidos
SELECT 
    au.email,
    au.raw_user_meta_data->>'full_name' as nome,
    au.raw_user_meta_data->>'role' as role,
    au.created_at as cadastrado_em,
    au.email_confirmed_at as email_confirmado_em
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email_confirmed_at IS NOT NULL
  AND u.id IS NULL
ORDER BY au.created_at DESC;

-- PASSO 3: CRIAR PERFIS AUTOMATICAMENTE
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
        SPLIT_PART(au.email, '@', 1),
        'Usuário'
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
WHERE au.email_confirmed_at IS NOT NULL  -- Só usuários com email confirmado
  AND u.id IS NULL                        -- Que não têm perfil
ON CONFLICT (id) DO NOTHING;              -- Ignorar se já existir

-- PASSO 4: Verificar resultado
SELECT 
    '✅ RESULTADO' as status,
    COUNT(*) as perfis_criados
FROM public.users
WHERE updated_at > NOW() - INTERVAL '1 minute';

-- PASSO 5: Verificar usuários que ainda estão aguardando confirmação de email
SELECT 
    '⏳ Usuários aguardando confirmação de email' as status,
    au.email,
    au.created_at,
    EXTRACT(EPOCH FROM (NOW() - au.created_at))/60 as minutos_desde_cadastro
FROM auth.users au
WHERE au.email_confirmed_at IS NULL
ORDER BY au.created_at DESC
LIMIT 10;

-- PASSO 6: Ver todos os usuários e seus status
SELECT 
    au.email,
    CASE 
        WHEN au.email_confirmed_at IS NOT NULL THEN '✅ Email confirmado'
        ELSE '⏳ Aguardando confirmação'
    END as status_email,
    CASE 
        WHEN u.id IS NOT NULL THEN '✅ Perfil criado'
        ELSE '❌ Sem perfil'
    END as status_perfil,
    u.role,
    au.created_at
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
ORDER BY au.created_at DESC
LIMIT 20;

-- ============================================================================
-- 📝 NOTAS IMPORTANTES:
-- ============================================================================
-- 
-- ✅ Este script CORRIGE:
-- - Usuários que confirmaram email mas não têm perfil
-- - Cria perfis automaticamente com role correto
--
-- ⚠️ Este script NÃO CORRIGE:
-- - Problema de redirecionamento para localhost
-- - Isso PRECISA ser configurado no Supabase Dashboard
-- - Veja: PASSO-A-PASSO-CONFIGURAR-SUPABASE.md
--
-- 🔧 PRÓXIMOS PASSOS:
-- 1. Execute este script para criar perfis pendentes
-- 2. Configure URLs no Dashboard (Site URL e Redirect URLs)
-- 3. Faça um NOVO cadastro para testar o redirect
-- 
-- ============================================================================

