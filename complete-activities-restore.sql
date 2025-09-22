-- Script completo para restaurar dados antigos + 11 novas atividades
-- Execute no SQL Editor do Supabase

-- PASSO 1: Limpar todas as atividades atuais do usuário
DELETE FROM public.activities 
WHERE instructor_id = (SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1);

-- PASSO 2: Restaurar dados antigos do arquivo cadastrar-atividades-em-massa.sql

-- BEACH TENNIS (6 atividades antigas)
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
) VALUES 
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Start Beach Tennis', 'Beach Tennis', 'Niterói', 'São Francisco', 'São Francisco (Av. Quintino Bocaiúva)', 'Segunda-feira', 'manhã', 12, 0.00, 'Aulas em grupo e particulares; agendamento necessário.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Set Point Beach Tennis', 'Beach Tennis', 'Niterói', 'São Francisco', 'São Francisco, Clube Naval Charitas e Camboinhas', 'Sábado', 'tarde', 10, 0.00, 'Aulas regulares; post indica atividades aos sábados e redes disponíveis nos fins de semana.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'TR Beach Tennis (Tati Roboredo)', 'Beach Tennis', 'Niterói', 'São Francisco', 'Praia de São Francisco', 'Terça-feira', 'manhã', 8, 0.00, 'Aulas por agendamento; comunicação pelo site/WhatsApp/Instagram.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Niterói Team Beach Tennis', 'Beach Tennis', 'Niterói', 'Icaraí', 'Icaraí', 'Quarta-feira', 'tarde', 15, 0.00, 'Sem grade pública encontrada; escola ativa no bairro.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Escola de Beach Tennis Charitas', 'Beach Tennis', 'Niterói', 'Charitas', 'Charitas (quiosque R2, Av. Pref. Silvio Picanço)', 'Quinta-feira', 'manhã', 12, 0.00, 'Sem grade fixa pública; aulas por agendamento.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Craques do Beach Tennis', 'Beach Tennis', 'Niterói', 'Charitas', 'Charitas', 'Sexta-feira', 'tarde', 10, 0.00, 'Aulas por agendamento (sem horários publicados).', 'active');

-- VÔLEI DE PRAIA (5 atividades antigas)
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
) VALUES 
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'GAVP - Escola de Vôlei Praia Icaraí', 'Vôlei de Praia', 'Niterói', 'Icaraí', 'Av. Jornalista Alberto Francisco Torres, Icaraí', 'Quarta-feira', 'tarde', 16, 0.00, 'Instrutor de vôlei de praia. Telefone: +55 21 97516-2815.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'MDC Beach Volley Training Icaraí', 'Vôlei de Praia', 'Niterói', 'Icaraí', 'Av. Jornalista Alberto Francisco Torres, Icaraí', 'Segunda-feira', 'manhã', 12, 0.00, 'Especializada em beach volley training.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'NitVolei Mania', 'Vôlei de Praia', 'Niterói', 'Icaraí', 'Praia de Icaraí (em frente à Rua Miguel de Frias)', 'Sábado', 'manhã', 20, 0.00, 'Turmas para iniciantes, intermediários e avançados. Contato: Alexandre. Telefone: 92565730', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Escolinha de Vôlei gratuita da Prefeitura de Niterói', 'Vôlei de Praia', 'Niterói', 'Icaraí', 'Praia de Icaraí (em frente à Rua Pereira da Silva)', 'Segunda-feira', 'noite', 25, 0.00, 'Para crianças a partir de 8 anos. Aulas de iniciação, intermediário e avançado.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'AVN – Academia do Vôlei Niterói (Clube Central de Icaraí)', 'Vôlei de Praia', 'Niterói', 'Icaraí', 'Clube Central de Icaraí', 'Quinta-feira', 'tarde', 18, 0.00, 'Escolinha de iniciação para adultos e crianças. Contato: (21) 96910-5323.', 'active');

-- FUTEVÔLEI (4 atividades antigas)
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
) VALUES 
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'MF Futevôlei', 'Futevôlei', 'Niterói', 'Icaraí', 'Praia de Icaraí, em frente à Praça Getúlio Vargas', 'Terça-feira', 'tarde', 8, 0.00, 'Treinos regulares; contato via WhatsApp. Mensalidades disponibilizadas no Wellhub.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Equipe Kaito Futevôlei', 'Futevôlei', 'Niterói', 'São Francisco', 'São Francisco (Av. Quintino Bocaiúva)', 'Quinta-feira', 'manhã', 10, 0.00, 'Aulas para diferentes níveis (iniciante, intermediário/avançado).', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Futevôlei Itacoatiara – São Francisco', 'Futevôlei', 'Niterói', 'São Francisco', 'Praia de São Francisco', 'Sexta-feira', 'tarde', 12, 0.00, 'Centro de Treinamento com equipes para vários níveis, de iniciante a profissional.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Projeto Social "Nós por Nós"', 'Futevôlei', 'Niterói', 'Ponta D''Areia', 'Ponta D''Areia / Centro de Niterói', 'Sábado', 'manhã', 20, 0.00, 'Aulas gratuitas para crianças/adolescentes.', 'active');

-- CANOA HAVAIANA (6 atividades antigas)
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
) VALUES 
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Lilia Godoi Assessoria Esportiva Canoa Havaiana', 'Canoa Havaiana', 'Niterói', 'São Francisco', 'São Francisco, Rua Caraíbas, 9, Niterói – RJ', 'Segunda-feira', 'manhã', 8, 0.00, 'Oferece modalidades, pacotes mensais, academia de instrutores qualificados. Telefone: (21) 3619-7411', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Clube de Canoa Havaiana Niterói Hoe – Gragoatá / São Domingos', 'Canoa Havaiana', 'Niterói', 'Gragoatá', 'Rua Cel. Tamarindo, 78, Gragoatá, Niterói', 'Terça-feira', 'tarde', 12, 0.00, 'Telefone: (21) 98004-9748. Não achei horários divulgados online.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Niteroi Hoe — Base Icaraí', 'Canoa Havaiana', 'Niterói', 'Icaraí', 'Icaraí', 'Quarta-feira', 'manhã', 15, 0.00, 'Telefone: (21) 99586-3628. Horários: Segunda 05:30-08:30; quarta, quinta, sexta 05:30-07:30; sábado 08:00-10:00; domingo fechado.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Hei Hei VA''A Clube de Canoa Havaiana Polinésia', 'Canoa Havaiana', 'Niterói', 'São Francisco', 'Av. Pref. Silvio Picanço — São Francisco, Niterói', 'Quinta-feira', 'manhã', 10, 0.00, 'Telefone: (21) 96432-0902. Horários: seg-sex 05:30-07:00 & 07:15-08:30; sábado 08:30-10:00; domingo fechado.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Ecopaddle Niterói — Clube de Canoa Havaiana (Charitas)', 'Canoa Havaiana', 'Niterói', 'Charitas', 'Praia de Charitas, Av. Silvio Picanço, 12, Niterói', 'Sexta-feira', 'manhã', 14, 0.00, 'Contatos: WhatsApp (21) 98890-9568 ou (21) 98890-9579. Precisa fazer reserva no dia anterior até às 20h.', 'active'),
    ((SELECT id FROM public.users WHERE email = 'praiativaops@gmail.com' LIMIT 1), 'Aloha Nui Wa''a', 'Canoa Havaiana', 'Niterói', 'Camboinhas', 'Praia de Camboinhas, Av. Beira-Mar, 16, Niterói', 'Domingo', 'manhã', 12, 0.00, 'Oferece aulas de canoa havaiana (atividades aquáticas). Horário de funcionamento: seg-sábado 05:45-18:00; domingo fechado (não precisa agendar para participar das atividades segundo anúncio).', 'active');

-- PASSO 3: Adicionar as 11 novas atividades do print

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

-- 3. CT FUTEVÔLEI VAI NA FITA (FUTEVÔLEI)
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

-- 6. Futevôlei Beta (FUTEVÔLEI)
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

-- 7. REDE FUTEVÔLEI COQUEIROS (FUTEVÔLEI)
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

-- 10. ETP Circuito e Funcional de Praia (CIRCUITO FUNCIONAL)
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

-- PASSO 4: Verificar todas as atividades
SELECT 
    a.title,
    a.location_name,
    a.beach,
    a.date,
    a.time,
    a.capacity,
    a.price
FROM public.activities a
JOIN public.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
ORDER BY a.title, a.location_name;
