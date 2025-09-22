-- Script para adicionar atividades de vela baseadas no print
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar se o usuário existe e obter seu ID
SELECT id, email, name, role 
FROM public.users 
WHERE email = 'praiativaops@gmail.com';

-- PASSO 2: Inserir as 4 atividades de vela
-- Automaticamente busca o ID do usuário por email

-- 1ª Atividade: Escola de Vela NIT.SAILING / Escola de Vela Jurujuba
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
    'Segunda-feira', -- Aleatório baseado no "Segunda a domingo"
    'manhã', -- Baseado no horário 08:30 às 17:00
    15, -- Vagas aleatórias
    0, -- Preço não informado = 0
    'Segunda a domingo, das 08:30 às 17:00 (todos os dias de operação). Telefone: (21) 97415-8960. Valor não divulgado nos achados.',
    'active'
);

-- 2ª Atividade: Clube Naval Charitas / NitSailing
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
    'Sábado', -- Aleatório
    'tarde', -- Aleatório
    12, -- Vagas aleatórias
    0, -- Preço não informado = 0
    'Aulas para crianças, jovens e adultos. Horários não específicos públicos. Preço não encontrado.',
    'active'
);

-- 3ª Atividade: CL Vela Escola Náutica
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
    'Domingo', -- Aleatório
    'manhã', -- Aleatório
    8, -- Vagas aleatórias
    0, -- Preço não informado = 0
    'Tem cursos como "Optimist Nível 2", colônia de férias infantil vela, etc. Horários não detalhados nos achados. Site: clvela.com.br. Preço não divulgado nos achados.',
    'active'
);

-- 4ª Atividade: Navegart
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
    'Quarta-feira', -- Aleatório
    'noite', -- Aleatório
    10, -- Vagas aleatórias
    0, -- Preço não informado = 0
    'Curso teórico sábado de manhã; prática sábado ou domingo 08:00-12:00 / 08:30-12:30 (dependendo da atividade). Informações via site Navegart (navegart.eco.br). Preço não listado.',
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
AND a.title = 'Vela'
ORDER BY a.created_at DESC;
