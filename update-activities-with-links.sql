-- Script para atualizar as descrições das atividades com links
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar atividades atuais
SELECT 
    a.id,
    a.location_name,
    a.title,
    a.description
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
ORDER BY a.title, a.location_name;

-- PASSO 2: Atualizar descrições com links

-- ============================================
-- BEACH TENNIS ACTIVITIES
-- ============================================

-- Start Beach Tennis
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://wellhub.com/pt-br/search/partners/start-beach-tennis-sao-francisco/'
        WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/start-beach-tennis-sao-francisco/%' THEN description || ' | Links: https://wellhub.com/pt-br/search/partners/start-beach-tennis-sao-francisco/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%start beach tennis%';

-- Set Point Beach Tennis
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.setpointbeachtennisniteroi.com.br/'
        WHEN description NOT LIKE '%setpointbeachtennisniteroi.com.br%' THEN description || ' | Links: https://www.setpointbeachtennisniteroi.com.br/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%set point%';

-- TR Beach Tennis (Tati Roboredo)
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://tatiroboredo.wixsite.com/beachtennis'
        WHEN description NOT LIKE '%tatiroboredo.wixsite.com/beachtennis%' THEN description || ' | Links: https://tatiroboredo.wixsite.com/beachtennis'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND (location_name ILIKE '%tati roboredo%' OR location_name ILIKE '%tr beach tennis%');

-- Niterói Team Beach Tennis
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.facebook.com/niteroiteambeachtennis/, https://www.instagram.com/niteroiteambeachtennis/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%facebook.com/niteroiteambeachtennis%' THEN ' | https://www.facebook.com/niteroiteambeachtennis/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/niteroiteambeachtennis%' THEN ' | https://www.instagram.com/niteroiteambeachtennis/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%niterói team%';

-- Escola de Beach Tennis Charitas
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/escola_de_beach_tenis_charitas/, https://www.facebook.com/BTcharitas/, https://wellhub.com/pt-br/search/partners/escola-de-beach-tennis-charitas-charitas/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/escola_de_beach_tenis_charitas%' THEN ' | https://www.instagram.com/escola_de_beach_tenis_charitas/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/BTcharitas%' THEN ' | https://www.facebook.com/BTcharitas/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/escola-de-beach-tennis-charitas-charitas%' THEN ' | https://wellhub.com/pt-br/search/partners/escola-de-beach-tennis-charitas-charitas/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%escola%beach%tennis%charitas%';

-- Craques do Beach Tennis
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/beachtennis_niteroi/, https://wellhub.com/pt-br/search/partners/craques-do-beach-tennis-niteroi/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/beachtennis_niteroi%' THEN ' | https://www.instagram.com/beachtennis_niteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/craques-do-beach-tennis-niteroi%' THEN ' | https://wellhub.com/pt-br/search/partners/craques-do-beach-tennis-niteroi/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%craques%beach%tennis%';

-- ============================================
-- VÔLEI DE PRAIA ACTIVITIES
-- ============================================

-- GAVP - Escola de Vôlei Praia Icaraí
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/gavpvolei/, https://www.facebook.com/grupoamigosdovoleidepraia/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/gavpvolei%' THEN ' | https://www.instagram.com/gavpvolei/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/grupoamigosdovoleidepraia%' THEN ' | https://www.facebook.com/grupoamigosdovoleidepraia/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%gavp%';

-- MDC Beach Volley Training Icaraí
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.mdcbeachvolleytraining.com/'
        WHEN description NOT LIKE '%mdcbeachvolleytraining.com%' THEN description || ' | Links: https://www.mdcbeachvolleytraining.com/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%mdc%beach%volley%';

-- NitVolei Mania
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/nitvoleimania/, https://www.facebook.com/voleimanianiteroi/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/nitvoleimania%' THEN ' | https://www.instagram.com/nitvoleimania/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/voleimanianiteroi%' THEN ' | https://www.facebook.com/voleimanianiteroi/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%nitvolei%mania%';

-- Escolinha de Vôlei gratuita da Prefeitura de Niterói
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: http://www.gcm.niteroi.rj.gov.br/index.php?option=com_content&view=article&id=855:secretaria-de-esportes-de-niteroi-lanca-escolinha-gratuita-de-volei-de-praia'
        WHEN description NOT LIKE '%gcm.niteroi.rj.gov.br%' THEN description || ' | Links: http://www.gcm.niteroi.rj.gov.br/index.php?option=com_content&view=article&id=855:secretaria-de-esportes-de-niteroi-lanca-escolinha-gratuita-de-volei-de-praia'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%escolinha%gratuita%prefeitura%';

-- AVN - Academia do Vôlei Niterói
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.facebook.com/academiadevoleiniteroi/, https://www.instagram.com/academiadevoleiniteroi/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%facebook.com/academiadevoleiniteroi%' THEN ' | https://www.facebook.com/academiadevoleiniteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/academiadevoleiniteroi%' THEN ' | https://www.instagram.com/academiadevoleiniteroi/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%avn%' OR location_name ILIKE '%academia%volei%niteroi%';

-- Clube Central de Icaraí
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://clubecentral.com.br/'
        WHEN description NOT LIKE '%clubecentral.com.br%' THEN description || ' | Links: https://clubecentral.com.br/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%clube central%icarai%';

-- ============================================
-- FUTEVÔLEI ACTIVITIES
-- ============================================

-- MF Futevôlei
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/mffutevolei/, https://www.facebook.com/MFFutevolei/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/mffutevolei%' THEN ' | https://www.instagram.com/mffutevolei/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/MFFutevolei%' THEN ' | https://www.facebook.com/MFFutevolei/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%mf%futevolei%';

-- Equipe Kaito Futevôlei
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/equipekaitofutevolei/, https://www.facebook.com/equipekaitofutevolei/, https://linktr.ee/equipekaitofutevolei'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/equipekaitofutevolei%' THEN ' | https://www.instagram.com/equipekaitofutevolei/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/equipekaitofutevolei%' THEN ' | https://www.facebook.com/equipekaitofutevolei/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%linktr.ee/equipekaitofutevolei%' THEN ' | https://linktr.ee/equipekaitofutevolei' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%kaito%futevolei%';

-- Futevôlei Itacoatiara - São Francisco
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/futevoleiitacoatiara/, https://www.facebook.com/futevoleiitacoatiara/, https://wellhub.com/pt-br/search/partners/futevolei-itacoatiara-sao-francisco/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/futevoleiitacoatiara%' THEN ' | https://www.instagram.com/futevoleiitacoatiara/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/futevoleiitacoatiara%' THEN ' | https://www.facebook.com/futevoleiitacoatiara/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/futevolei-itacoatiara-sao-francisco%' THEN ' | https://wellhub.com/pt-br/search/partners/futevolei-itacoatiara-sao-francisco/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%itacoatiara%';

-- Projeto Social Nós por Nós
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.atribunarj.com.br/materia/arena-de-futevolei-realiza-projeto-social-na-ponta-dareia-em-parceria-com-a-smel'
        WHEN description NOT LIKE '%atribunarj.com.br/materia/arena-de-futevolei-realiza-projeto-social%' THEN description || ' | Links: https://www.atribunarj.com.br/materia/arena-de-futevolei-realiza-projeto-social-na-ponta-dareia-em-parceria-com-a-smel'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%nós por nós%';

-- ============================================
-- CANOA HAVAIANA ACTIVITIES
-- ============================================

-- Lilia Godoi Assessoria Esportiva Canoa Havaiana
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://liliagodoiae.com.br/, https://www.instagram.com/liliagodoiae/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%liliagodoiae.com.br%' THEN ' | https://liliagodoiae.com.br/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/liliagodoiae%' THEN ' | https://www.instagram.com/liliagodoiae/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%lilia godoi%';

-- Clube de Canoa Havaiana Niterói Hoe - Gragoatá / São Domingos
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/hoeniteroi/, https://www.facebook.com/NiteroiHoe/, https://wellhub.com/pt-br/search/partners/niteroi-hoe-gragoata/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/hoeniteroi%' THEN ' | https://www.instagram.com/hoeniteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/NiteroiHoe%' THEN ' | https://www.facebook.com/NiteroiHoe/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/niteroi-hoe-gragoata%' THEN ' | https://wellhub.com/pt-br/search/partners/niteroi-hoe-gragoata/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%niterói hoe%' AND location_name ILIKE '%gragoatá%';

-- Niteroi Hoe - Base Icaraí
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.facebook.com/niteroihoeicarai/, https://www.instagram.com/hoeniteroi/, https://totalpass.com/br/academias/niteroi-hoe-base-icarai/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%facebook.com/niteroihoeicarai%' THEN ' | https://www.facebook.com/niteroihoeicarai/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/hoeniteroi%' THEN ' | https://www.instagram.com/hoeniteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%totalpass.com/br/academias/niteroi-hoe-base-icarai%' THEN ' | https://totalpass.com/br/academias/niteroi-hoe-base-icarai/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%niterói hoe%' AND location_name ILIKE '%icaraí%';

-- Hei Hei VA'A Clube de Canoa Havaiana Polinésia
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/heihei.vaa/, https://www.facebook.com/heihei.vaa/, https://wellhub.com/pt-br/search/partners/hei-hei-va-a-naturitas/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/heihei.vaa%' THEN ' | https://www.instagram.com/heihei.vaa/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/heihei.vaa%' THEN ' | https://www.facebook.com/heihei.vaa/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/hei-hei-va-a-naturitas%' THEN ' | https://wellhub.com/pt-br/search/partners/hei-hei-va-a-naturitas/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%hei hei%va%';

-- Ecopaddle Niterói – Clube de Canoa Havaiana (Charitas)
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/ecopaddleniteroi/, https://www.facebook.com/ecopaddleniteroi/, https://wellhub.com/pt-br/search/partners/ecopaddle-niteroi-clube-de-canoa-havaiana-niteroi/, https://totalpass.com/br/academias/ecopaddle-niteroi-clube-de-canoa-havaiana/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/ecopaddleniteroi%' THEN ' | https://www.instagram.com/ecopaddleniteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%facebook.com/ecopaddleniteroi%' THEN ' | https://www.facebook.com/ecopaddleniteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/ecopaddle-niteroi-clube-de-canoa-havaiana-niteroi%' THEN ' | https://wellhub.com/pt-br/search/partners/ecopaddle-niteroi-clube-de-canoa-havaiana-niteroi/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%totalpass.com/br/academias/ecopaddle-niteroi-clube-de-canoa-havaiana%' THEN ' | https://totalpass.com/br/academias/ecopaddle-niteroi-clube-de-canoa-havaiana/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%ecopaddle%';

-- Aloha Nui Wa'a
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://www.instagram.com/alohanuiwaa/, https://wellhub.com/pt-br/search/partners/aloha-nui-wa-a-camboinhas-niteroi/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%instagram.com/alohanuiwaa%' THEN ' | https://www.instagram.com/alohanuiwaa/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%wellhub.com/pt-br/search/partners/aloha-nui-wa-a-camboinhas-niteroi%' THEN ' | https://wellhub.com/pt-br/search/partners/aloha-nui-wa-a-camboinhas-niteroi/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%aloha nui%';

-- ============================================
-- VELA ACTIVITIES
-- ============================================

-- Escola de Vela NIT.SAILING / Escola de Vela Jurujuba
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: http://nitsailing.blogspot.com/, https://www.instagram.com/nitsailing/, https://cncharitas.org.br/nautica/atividades/, https://projetograel.org.br/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%nitsailing.blogspot.com%' THEN ' | http://nitsailing.blogspot.com/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/nitsailing%' THEN ' | https://www.instagram.com/nitsailing/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%cncharitas.org.br/nautica/atividades%' THEN ' | https://cncharitas.org.br/nautica/atividades/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%projetograel.org.br%' THEN ' | https://projetograel.org.br/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%nit.sailing%' OR location_name ILIKE '%escola%vela%jurujuba%';

-- Clube Naval Charitas / NitSailing
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://cncharitas.org.br/, https://www.instagram.com/nitsailing/, http://nitsailing.blogspot.com/'
        ELSE description ||
            CASE WHEN description NOT LIKE '%cncharitas.org.br%' THEN ' | https://cncharitas.org.br/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%instagram.com/nitsailing%' THEN ' | https://www.instagram.com/nitsailing/' ELSE '' END ||
            CASE WHEN description NOT LIKE '%nitsailing.blogspot.com%' THEN ' | http://nitsailing.blogspot.com/' ELSE '' END
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%clube naval charitas%' OR location_name ILIKE '%nitsailing%';

-- CL Vela Escola Náutica
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://clvela.com.br/'
        WHEN description NOT LIKE '%clvela.com.br%' THEN description || ' | Links: https://clvela.com.br/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%cl vela%';

-- Navegart
UPDATE public.activities 
SET description = COALESCE(description, '') || 
    CASE 
        WHEN description IS NULL OR description = '' THEN 'Links: https://navegart.eco.br/'
        WHEN description NOT LIKE '%navegart.eco.br%' THEN description || ' | Links: https://navegart.eco.br/'
        ELSE description
    END
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name ILIKE '%navegart%';

-- PASSO 3: Verificar atividades atualizadas
SELECT 
    a.id,
    a.location_name,
    a.title,
    LEFT(a.description, 100) || '...' as description_preview
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
ORDER BY a.title, a.location_name;

-- PASSO 4: Contar quantas atividades foram atualizadas com links
SELECT 
    a.title,
    COUNT(*) as total_activities,
    COUNT(CASE WHEN a.description LIKE '%http%' THEN 1 END) as activities_with_links
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
GROUP BY a.title
ORDER BY a.title;
