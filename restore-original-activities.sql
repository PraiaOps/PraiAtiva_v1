-- Script para restaurar as atividades originais que foram perdidas
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar se o usuário existe
SELECT id, email, name, role 
FROM public.users 
WHERE email = 'praiativaops@gmail.com';

-- PASSO 2: Restaurar as atividades de VELA que foram perdidas

-- 1. Escola de Vela NIT.SAILING / Escola de Vela Jurujuba
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
    'Escola de Vela NIT.SAILING / Escola de Vela Jurujuba',
    'Vela',
    'Niterói',
    'Outra',
    'Av. Carlos Ermelindo Marins, 3100 – Jurujuba, Niterói, RJ',
    'Segunda-feira',
    'manhã',
    15,
    0,
    'Segunda a domingo, das 08:30 às 17:00 (todos os dias de operação). Telefone: (21) 97415-8960. Valor não divulgado nos achados.',
    'active'
);

-- 2. Clube Naval Charitas / NitSailing
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
    'Clube Naval Charitas / NitSailing',
    'Vela',
    'Niterói',
    'Charitas',
    'Charitas, Niterói (no Clube Naval Charitas)',
    'Sábado',
    'tarde',
    12,
    0,
    'Aulas para crianças, jovens e adultos. Horários não específicos públicos. Preço não encontrado.',
    'active'
);

-- 3. CL Vela Escola Náutica
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
    'CL Vela Escola Náutica',
    'Vela',
    'Niterói',
    'Outra',
    'Niterói (e região) — escola com cursos de vela para iniciantes, otimistas etc.',
    'Domingo',
    'manhã',
    8,
    0,
    'Tem cursos como "Optimist Nível 2", colônia de férias infantil vela, etc. Horários não detalhados nos achados. Site: clvela.com.br. Preço não divulgado nos achados.',
    'active'
);

-- 4. Navegart
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
    'Navegart',
    'Vela',
    'Niterói',
    'Outra',
    'Niterói / Rio de Janeiro — cursos de Arrais Amador & Motonauta também',
    'Quarta-feira',
    'noite',
    10,
    0,
    'Curso teórico sábado de manhã; prática sábado ou domingo 08:00-12:00 / 08:30-12:30 (dependendo da atividade). Informações via site Navegart (navegart.eco.br). Preço não listado.',
    'active'
);

-- PASSO 3: Restaurar as atividades de BEACH TENNIS que foram perdidas

-- 5. Start Beach Tennis
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
    'Start Beach Tennis',
    'Beach Tennis',
    'Niterói',
    'São Francisco',
    'São Francisco (Av. Quintino Bocaiúva)',
    'Segunda-feira',
    'manhã',
    12,
    0,
    'Telefone: (21) 97415-8960. Valor não divulgado nos achados.',
    'active'
);

-- 6. Set Point Beach Tennis
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
    'Set Point Beach Tennis',
    'Beach Tennis',
    'Niterói',
    'São Francisco',
    'São Francisco, Clube Naval Charitas e Camboinhas',
    'Sábado',
    'tarde',
    10,
    0,
    'Preço não encontrado.',
    'active'
);

-- 7. TR Beach Tennis (Tati Roboredo)
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
    'TR Beach Tennis (Tati Roboredo)',
    'Beach Tennis',
    'Niterói',
    'São Francisco',
    'Praia de São Francisco',
    'Terça-feira',
    'manhã',
    8,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 8. Niterói Team Beach Tennis
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
    'Niterói Team Beach Tennis',
    'Beach Tennis',
    'Niterói',
    'Icaraí',
    'Icaraí',
    'Quarta-feira',
    'tarde',
    15,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 9. Escola de Beach Tennis Charitas
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
    'Escola de Beach Tennis Charitas',
    'Beach Tennis',
    'Niterói',
    'Charitas',
    'Charitas (quiosque R2, Av. Pref. Silvio Picanço)',
    'Quinta-feira',
    'manhã',
    12,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 10. Craques do Beach Tennis
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
    'Craques do Beach Tennis',
    'Beach Tennis',
    'Niterói',
    'Charitas',
    'Charitas',
    'Sexta-feira',
    'tarde',
    10,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- PASSO 4: Restaurar as atividades de FUTEVÔLEI que foram perdidas

-- 11. MF Futevôlei
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
    'MF Futevôlei',
    'Futevôlei',
    'Niterói',
    'Icaraí',
    'Praia de Icaraí, em frente à Praça Getúlio Vargas',
    'Terça-feira',
    'tarde',
    8,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 12. Equipe Kaito Futevôlei
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
    'Equipe Kaito Futevôlei',
    'Futevôlei',
    'Niterói',
    'São Francisco',
    'São Francisco (Av. Quintino Bocaiúva)',
    'Quinta-feira',
    'manhã',
    10,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 13. Futevôlei Itacoatiara – São Francisco
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
    'Futevôlei Itacoatiara – São Francisco',
    'Futevôlei',
    'Niterói',
    'São Francisco',
    'Praia de São Francisco',
    'Sexta-feira',
    'tarde',
    12,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 14. Projeto Social "Nós por Nós"
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
    'Projeto Social "Nós por Nós"',
    'Futevôlei',
    'Niterói',
    'Ponta D''Areia',
    'Ponta D''Areia / Centro de Niterói',
    'Sábado',
    'manhã',
    20,
    0,
    'Valor não divulgado nos achados.',
    'active'
);

-- 15. Nápoles Futevôlei
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
    'Valor não divulgado nos achados.',
    'active'
);

-- PASSO 5: Verificar todas as atividades restauradas
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
