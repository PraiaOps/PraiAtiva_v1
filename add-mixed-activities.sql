-- Script para adicionar atividades mistas baseadas no print
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar se o usuário existe e obter seu ID
SELECT id, email, name, role 
FROM public.users 
WHERE email = 'praiativaops@gmail.com';

-- PASSO 2: Inserir as atividades baseadas no print

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
    'R. Gen. Pereira da Silva, 1 - Icaraí, Niterói - RJ, 24220-051',
    'Segunda-feira',
    'manhã',
    12,
    0,
    'Telefone: (21) 97508-4386. Coordenadas: -43.114384;-22.902555,0',
    'active'
);

-- 2. 2 Toques Futevôlei - Icaraí (FUTEVÔLEI)
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
    '2 Toques Futevôlei - Icaraí',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Avenida Jornalista Alberto Francisco Torres, Icaraí, Niterói - RJ, 24230-210',
    'Terça-feira',
    'tarde',
    15,
    0,
    'Telefone: (21) 99809-3440. Coordenadas: -43.110552;-22.901562,0',
    'active'
);

-- 3. ACADEMIA DO FUTEVÔLEI PTTA (FUTEVÔLEI)
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
    'ACADEMIA DO FUTEVÔLEI PTTA',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Av. Jornalista Alberto Francisco Torres, 415 - Icaraí, Niterói - RJ, 24230-000',
    'Quarta-feira',
    'noite',
    18,
    0,
    'Telefone: (21) 96288-6642. Coordenadas: -43.110643;-22.907965,0',
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
    'Praia de Icaraí - Av. Jornalista Alberto Francisco Torres, 315, Av. Jorn. Alberto Francisco Torres, 335, Niterói - RJ',
    'Quinta-feira',
    'manhã',
    20,
    0,
    'Telefone: (21) 99637-7823. Coordenadas: -43.110949;-22.908722,0',
    'active'
);

-- 5. Nápoles Futevôlei (FUTEVÔLEI)
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
    'Nápoles Futevôlei',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Praia de Icaraí, esquina rua coronel varejão SN - Praia de Icaraí, Niterói - RJ, 24230-000',
    'Sexta-feira',
    'tarde',
    14,
    0,
    'Coordenadas: -43.110949;-22.908722,0',
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
    'Telefone: (21) 99754-5225. Coordenadas: -43.110084;-22.902571,0',
    'active'
);

-- 7. Praia Elite (CIRCUITO FUNCIONAL)
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
    'Praia Elite',
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Praia de Icaraí, Icaraí, Niterói - RJ, 24230-002',
    'Domingo',
    'tarde',
    10,
    0,
    'Telefone: (21) 99972-0687. Coordenadas: -43.108354;-22.905432,0',
    'active'
);

-- 8. IBT - Icaraí Beach Tennis (CIRCUITO FUNCIONAL - baseado no nome, parece ser treinamento funcional)
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
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 230-260 - Icaraí, Niterói - RJ, 24230-003',
    'Segunda-feira',
    'noite',
    12,
    0,
    'Coordenadas: -43.113827;-22.906445209969,0',
    'active'
);

-- 9. Icaraí Team Beach Tennis Aula de Tênis (CIRCUITO FUNCIONAL)
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
    'Icaraí Team Beach Tennis Aula de Tênis',
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 230-260 - Icaraí, Niterói - RJ, 24220-000',
    'Terça-feira',
    'manhã',
    8,
    0,
    'Telefone: (21) 99655-3297. Coordenadas: -43.113734;-22.906375,0',
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
    'Av. Jorn. Alberto Francisco Torres, 362 - Icaraí, Niterói - RJ, 24220-000',
    'Quarta-feira',
    'tarde',
    22,
    0,
    'Coordenadas: -43.110721;-22.908375,0',
    'active'
);

-- 11. Sand for Atlhetes Circuito Funcional em Icaraí (CIRCUITO FUNCIONAL)
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
    'Sand for Atlhetes Circuito Funcional em Icaraí',
    'Circuito Funcional',
    'Niterói',
    'Icaraí',
    'Av. Jorn. Alberto Francisco Torres, 447 - Icaraí, Niterói - RJ, 24230-008',
    'Quinta-feira',
    'noite',
    25,
    0,
    'Telefone: (21) 99783-1258. Coordenadas: -43.110433;-22.910054,0',
    'active'
);

-- PASSO 3: Verificar as atividades inseridas
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
    u.email as instructor_email
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
AND (a.title = 'Futevôlei' OR a.title = 'Circuito Funcional')
ORDER BY a.title, a.created_at DESC;
