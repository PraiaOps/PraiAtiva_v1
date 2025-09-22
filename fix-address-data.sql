-- Script para corrigir os endereços das atividades
-- Baseado na correspondência entre location_name no banco e nomes dos prints

-- PASSO 1: Verificar dados atuais
SELECT id, city, beach, address, location_name, title
FROM public.activities 
ORDER BY location_name;

-- PASSO 2: Atualizar endereços baseado no location_name correspondente aos prints

-- BEACH TENNIS
UPDATE public.activities SET address = 'São Francisco (Av. Quintino Bocaiúva)' 
WHERE location_name = 'Start Beach Tennis';

UPDATE public.activities SET address = 'São Francisco, Clube Naval Charitas e Camboinhas' 
WHERE location_name = 'Set Point Beach Tennis';

UPDATE public.activities SET address = 'Praia de São Francisco' 
WHERE location_name = 'TR Beach Tennis (Tati Roboredo)';

UPDATE public.activities SET address = 'Icaraí' 
WHERE location_name = 'Niterói Team Beach Tennis';

UPDATE public.activities SET address = 'Charitas (quiosque R2, Av. Pref. Silvio Picanço)' 
WHERE location_name = 'Escola de Beach Tennis Charitas';

UPDATE public.activities SET address = 'Charitas' 
WHERE location_name = 'Craques do Beach Tennis';

-- VÔLEI DE PRAIA
UPDATE public.activities SET address = 'Av. Jornalista Alberto Francisco Torres, Icaraí' 
WHERE location_name = 'GAVP - Escola de Vôlei Praia Icaraí';

UPDATE public.activities SET address = 'Av. Jornalista Alberto Francisco Torres, Icaraí' 
WHERE location_name = 'MDC Beach Volley Training Icaraí';

UPDATE public.activities SET address = 'Praia de Icaraí (em frente à Rua Miguel de Frias)' 
WHERE location_name = 'NitVolei Mania';

UPDATE public.activities SET address = 'Praia de Icaraí (em frente à Rua Pereira da Silva)' 
WHERE location_name = 'Escolinha de Vôlei gratuita da Prefeitura de Niterói';

UPDATE public.activities SET address = 'Icaraí / Niterói' 
WHERE location_name = 'AVN – Academia do Vôlei Niterói (Clube Central de Icaraí)';

-- FUTEVÔLEI
UPDATE public.activities SET address = 'Praia de Icaraí, em frente à Praça Getúlio Vargas' 
WHERE location_name = 'MF Futevôlei';

UPDATE public.activities SET address = 'São Francisco (Av. Quintino Bocaiúva)' 
WHERE location_name = 'Equipe Kaito Futevôlei';

UPDATE public.activities SET address = 'Praia de São Francisco' 
WHERE location_name = 'Futevôlei Itacoatiara – São Francisco';

UPDATE public.activities SET address = 'Ponta D''Areia / Centro de Niterói' 
WHERE location_name = 'Projeto Social "Nós por Nós"';

-- CANOA HAVAIANA  
UPDATE public.activities SET address = 'São Francisco, Rua Caraíbas, 9, Niterói – RJ' 
WHERE location_name = 'Lilia Godoi Assessoria Esportiva Canoa Havaiana';

UPDATE public.activities SET address = 'Rua Cel. Tamarindo, 78, Gragoatá, Niterói' 
WHERE location_name = 'Clube de Canoa Havaiana Niterói Hoe — Gragoatá / São Domingos';

UPDATE public.activities SET address = 'Icaraí, Niterói' 
WHERE location_name = 'Niterói Hoe — Base Icaraí';

UPDATE public.activities SET address = 'Av. Pref. Silvio Picanço — São Francisco, Niterói' 
WHERE location_name = 'Hei Hei VA''A Clube de Canoa Havaiana Polinésia';

UPDATE public.activities SET address = 'Praia de Charitas, Av. Silvio Picanço, 12, Niterói' 
WHERE location_name = 'Ecopaddle Niterói — Clube de Canoa Havaiana (Charitas)';

UPDATE public.activities SET address = 'Praia de Camboinhas, Av. Beira-Mar, 16, Camboinhas, Niterói' 
WHERE location_name = 'Aloha Nui Wa''a';

-- PASSO 3: Verificar resultado final
SELECT id, city, beach, address, location_name, title
FROM public.activities 
ORDER BY beach, address;
