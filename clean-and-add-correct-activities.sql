-- Script para limpar e adicionar apenas as 11 atividades corretas do print
-- Execute no SQL Editor do Supabase

-- PASSO 1: Remover TODAS as atividades do usuário praiativaops@gmail.com
DELETE FROM public.activities 
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1);

-- PASSO 2: Inserir as 11 atividades corretas do print

-- 1. 3 Toques Futevôlei (FUTEVÔLEI)
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
    '3 Toques Futevôlei',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'R. Gen. Pereira da Silva, 1 - Icaraí, Niterói - RJ, 24220-031',
    'Segunda-feira',
    'manhã',
    12,
    0,
    'Telefone: (21) 97090-4986. Coordenadas: -43.1143682;-22.905536,0',
    'active'
);

-- 2. CT Arena Futevôlei - Icaraí (FUTEVÔLEI)
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

-- 3. CT FUTEVÔLEI VAI NA FITA (FUTEVÔLEI) - ESTAVA FALTANDO!
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
    'CT FUTEVÔLEI VAI NA FITA',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'ALTURA DA IGREJA SÃO JUDAS TADEU - Av. Jorn. Alberto Francisco Torres - PRAIA DE ICARAÍ, Niterói - RJ, 24230-009',
    'Quarta-feira',
    'noite',
    18,
    0,
    'Telefone: (21) 97119-4446. Coordenadas: -43.1099186;-22.9128682,0',
    'active'
);

-- 4. CT Guanabara Futevôlei (FUTEVÔLEI)
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
    'CT Guanabara Futevôlei',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Praia de Icaraí - Av. Jornalista Alberto Francisco Torres, 315, Av. Jorn. Alberto Francisco Torres, 335, Niterói - RJ, 24230-062',
    'Quinta-feira',
    'manhã',
    20,
    0,
    'Telefone: (21) 98289-6642. Coordenadas: -43.1120543;-22.9079555,0',
    'active'
);

-- 5. CT Negão Futevôlei (FUTEVÔLEI)
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
    'Sexta-feira',
    'tarde',
    18,
    0,
    'Telefone: (21) 98273-7823. Coordenadas: -43.1110949;-22.9087222,0',
    'active'
);

-- 6. ETP Circuito e Funcional de Praia (CIRCUITO FUNCIONAL)
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
    'ETP Circuito e Funcional de Praia',
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 439-417 - Icaraí, Niterói - RJ, 24220-000',
    'Sábado',
    'manhã',
    16,
    0,
    'Telefone: (21) 99754-5225. Coordenadas: -43.1106084;-22.9092701,0',
    'active'
);

-- 7. Futevôlei Beta (FUTEVÔLEI)
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
    'Domingo',
    'tarde',
    16,
    0,
    'Telefone: (21) 96972-0967. Coordenadas: -43.1145354;-22.9054321,0',
    'active'
);

-- 8. IBT - Icaraí Beach Tennis (BEACH TENNIS)
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
    'Segunda-feira',
    'noite',
    12,
    0,
    'Coordenadas: -43.1138827;-22.90604829999999,0',
    'active'
);

-- 9. Niterói Team Beach Tennis - Aula de Tênis (BEACH TENNIS)
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
    'Terça-feira',
    'manhã',
    10,
    0,
    'Telefone: (21) 98665-3297. Coordenadas: -43.1137734;-22.9058751,0',
    'active'
);

-- 10. REDE FUTEVÔLEI COQUEIROS (FUTEVÔLEI)
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
    'REDE FUTEVÔLEI COQUEIROS',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 392 - Icaraí, Niterói - RJ, 24220-000',
    'Quarta-feira',
    'tarde',
    22,
    0,
    'Coordenadas: -43.1107821;-22.9088702,0',
    'active'
);

-- 11. Round for Athletes Circuito Funcional em Icaraí (CIRCUITO FUNCIONAL)
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
    'Round for Athletes Circuito Funcional em Icaraí',
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 447 - Icaraí, Niterói - RJ, 24230-008',
    'Quinta-feira',
    'noite',
    25,
    0,
    'Telefone: (21) 99793-1258. Coordenadas: -43.1102433;-22.9100544,0',
    'active'
);

-- PASSO 3: Verificar as 11 atividades corretas
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
ORDER BY a.title, a.location_name;
