-- Script para corrigir e adicionar atividades corretas baseadas no print
-- Execute no SQL Editor do Supabase

-- PASSO 1: Remover as atividades incorretas inseridas anteriormente
DELETE FROM public.activities 
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1)
AND location_name IN (
    'IBT - Icaraí Beach Tennis',
    'Icaraí Team Beach Tennis Aula de Tênis', 
    'Praia Elite',
    '2 Toques Futevôlei - Icaraí',
    'Sand for Atlhetes Circuito Funcional em Icaraí'
);

-- PASSO 2: Inserir as atividades corretas que estavam faltando

-- CT Arena Futevôlei - Icaraí (FUTEVÔLEI)
INSERT INTO public.activities (
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
    status
) VALUES (
    (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1),
    'CT Arena Futevôlei - Icaraí',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Avenida Jornalista Alberto Francisco Torres - Niterói - Icaraí, Niterói - RJ, 24230-210',
    'Terça-feira',
    'tarde',
    15,
    0,
    'Telefone: (21) 99689-2340. Coordenadas: -43.110255;-22.9101908,0',
    'active'
);

-- CT Negão Futevôlei (FUTEVÔLEI)
INSERT INTO public.activities (
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
    status
) VALUES (
    (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1),
    'CT Negão Futevôlei',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'em frente ao - Av. Jorn. Alberto Francisco Torres, número 389 - Praia de Icaraí, Niterói - RJ, 24230-006',
    'Quinta-feira',
    'manhã',
    18,
    0,
    'Telefone: (21) 98273-7823. Coordenadas: -43.110949;-22.9087222,0',
    'active'
);

-- Futevôlei Beta (FUTEVÔLEI)
INSERT INTO public.activities (
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
    status
) VALUES (
    (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1),
    'Futevôlei Beta',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 203 - Icaraí, Niterói - RJ, 24230-002',
    'Sexta-feira',
    'tarde',
    16,
    0,
    'Telefone: (21) 96972-0967. Coordenadas: -43.1145354;-22.9054321,0',
    'active'
);

-- IBT - Icaraí Beach Tennis (BEACH TENNIS)
INSERT INTO public.activities (
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
    status
) VALUES (
    (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1),
    'IBT - Icaraí Beach Tennis',
    'Beach Tennis',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 230-260 - Icaraí, Niterói - RJ, 24230-003',
    'Sábado',
    'manhã',
    12,
    0,
    'Coordenadas: -43.1138827;-22.90604829999999,0',
    'active'
);

-- Niterói Team Beach Tennis - Aula de Tênis (BEACH TENNIS)
INSERT INTO public.activities (
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
    status
) VALUES (
    (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1),
    'Niterói Team Beach Tennis - Aula de Tênis',
    'Beach Tennis',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 230-260 - Icaraí, Niterói - RJ, 24220-000',
    'Domingo',
    'tarde',
    10,
    0,
    'Telefone: (21) 98665-3297. Coordenadas: -43.1137734;-22.9058751,0',
    'active'
);

-- Round for Athletes Circuito Funcional em Icaraí (CIRCUITO FUNCIONAL) - corrigindo o nome
UPDATE public.activities 
SET location_name = 'Round for Athletes Circuito Funcional em Icaraí'
WHERE location_name = 'Sand for Atlhetes Circuito Funcional em Icaraí'
AND instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1);

-- PASSO 3: Verificar todas as atividades corrigidas
SELECT 
    a.id,
    a.location_name,
    a.title,
    a.city,
    a.beach,
    a.date,
    a.time,
    a.capacity,
    u.email as instructor_email
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
AND (a.title = 'Futevôlei' OR a.title = 'Circuito Funcional' OR a.title = 'Beach Tennis')
ORDER BY a.title, a.location_name;
