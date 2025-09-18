-- Script para cadastrar todas as atividades em massa para praiativaops@gmail.com
-- Execute este script no SQL Editor do Supabase

-- Primeiro, vamos buscar o UUID do usuário praiativaops@gmail.com
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Buscar o UUID do usuário
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = 'praiativaops@gmail.com';
    
    -- Verificar se o usuário existe
    IF user_uuid IS NULL THEN
        RAISE EXCEPTION 'Usuário praiativaops@gmail.com não encontrado!';
    END IF;
    
    -- Inserir Beach Tennis
    INSERT INTO public.activities (id, instructor_id, title, location_name, beach, time, day_of_week, capacity, price, description, status, enrollments)
    VALUES 
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'Start Beach Tennis', 'São Francisco (Av. Quintino Bocaiúva)', 'manhã', 'Segunda-feira', 12, 0.00, 'Aulas em grupo e particulares; agendamento necessário.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'Set Point Beach Tennis', 'São Francisco, Clube Naval Charitas e Camboinhas', 'tarde', 'Sábado', 10, 0.00, 'Aulas regulares; post indica atividades aos sábados e redes disponíveis nos fins de semana.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'TR Beach Tennis (Tati Roboredo)', 'Praia de São Francisco', 'manhã', 'Terça-feira', 8, 0.00, 'Aulas por agendamento; comunicação pelo site/WhatsApp/Instagram.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'Niterói Team Beach Tennis', 'Icaraí', 'tarde', 'Quarta-feira', 15, 0.00, 'Sem grade pública encontrada; escola ativa no bairro.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'Escola de Beach Tennis Charitas', 'Charitas (quiosque R2, Av. Pref. Silvio Picanço)', 'manhã', 'Quinta-feira', 12, 0.00, 'Sem grade fixa pública; aulas por agendamento.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Beach Tennis', 'Craques do Beach Tennis', 'Charitas', 'tarde', 'Sexta-feira', 10, 0.00, 'Aulas por agendamento (sem horários publicados).', 'active', 0);
    
    -- Inserir Vôlei de Praia
    INSERT INTO public.activities (id, instructor_id, title, location_name, beach, time, day_of_week, capacity, price, description, status, enrollments)
    VALUES 
        (gen_random_uuid(), user_uuid, 'Vôlei de Praia', 'GAVP - Escola de Vôlei Praia Icaraí', 'Av. Jornalista Alberto Francisco Torres, Icaraí', 'tarde', 'Quarta-feira', 16, 0.00, 'Instrutor de vôlei de praia. Telefone: +55 21 97516-2815.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Vôlei de Praia', 'MDC Beach Volley Training Icaraí', 'Av. Jornalista Alberto Francisco Torres, Icaraí', 'manhã', 'Segunda-feira', 12, 0.00, 'Especializada em beach volley training.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Vôlei de Praia', 'NitVolei Mania', 'Praia de Icaraí (em frente à Rua Miguel de Frias)', 'manhã', 'Sábado', 20, 0.00, 'Turmas para iniciantes, intermediários e avançados. Contato: Alexandre. Telefone: 92565730', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Vôlei de Praia', 'Escolinha de Vôlei gratuita da Prefeitura de Niterói', 'Praia de Icaraí (em frente à Rua Pereira da Silva)', 'noite', 'Segunda-feira', 25, 0.00, 'Para crianças a partir de 8 anos. Aulas de iniciação, intermediário e avançado.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Vôlei de Praia', 'AVN – Academia do Vôlei Niterói (Clube Central de Icaraí)', 'Clube Central de Icaraí', 'tarde', 'Quinta-feira', 18, 0.00, 'Escolinha de iniciação para adultos e crianças. Contato: (21) 96910-5323.', 'active', 0);
    
    -- Inserir Futevôlei
    INSERT INTO public.activities (id, instructor_id, title, location_name, beach, time, day_of_week, capacity, price, description, status, enrollments)
    VALUES 
        (gen_random_uuid(), user_uuid, 'Futevôlei', 'MF Futevôlei', 'Praia de Icaraí, em frente à Praça Getúlio Vargas', 'tarde', 'Terça-feira', 8, 0.00, 'Treinos regulares; contato via WhatsApp. Mensalidades disponibilizadas no Wellhub.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Futevôlei', 'Equipe Kaito Futevôlei', 'São Francisco (Av. Quintino Bocaiúva)', 'manhã', 'Quinta-feira', 10, 0.00, 'Aulas para diferentes níveis (iniciante, intermediário/avançado).', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Futevôlei', 'Futevôlei Itacoatiara – São Francisco', 'Praia de São Francisco', 'tarde', 'Sexta-feira', 12, 0.00, 'Centro de Treinamento com equipes para vários níveis, de iniciante a profissional.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Futevôlei', 'Projeto Social "Nós por Nós"', 'Ponta D''Areia / Centro de Niterói', 'manhã', 'Sábado', 20, 0.00, 'Aulas gratuitas para crianças/adolescentes.', 'active', 0);
    
    -- Inserir Canoa Havaiana
    INSERT INTO public.activities (id, instructor_id, title, location_name, beach, time, day_of_week, capacity, price, description, status, enrollments)
    VALUES 
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Lilia Godoi Assessoria Esportiva Canoa Havaiana', 'São Francisco, Rua Caraíbas, 9, Niterói – RJ', 'manhã', 'Segunda-feira', 8, 0.00, 'Oferece modalidades, pacotes mensais, academia de instrutores qualificados. Telefone: (21) 3619-7411', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Clube de Canoa Havaiana Niterói Hoe – Gragoatá / São Domingos', 'Rua Cel. Tamarindo, 78, Gragoatá, Niterói', 'tarde', 'Terça-feira', 12, 0.00, 'Telefone: (21) 98004-9748. Não achei horários divulgados online.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Niteroi Hoe — Base Icaraí', 'Icaraí', 'manhã', 'Quarta-feira', 15, 0.00, 'Telefone: (21) 99586-3628. Horários: Segunda 05:30-08:30; quarta, quinta, sexta 05:30-07:30; sábado 08:00-10:00; domingo fechado.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Hei Hei VA''A Clube de Canoa Havaiana Polinésia', 'Av. Pref. Silvio Picanço — São Francisco, Niterói', 'manhã', 'Quinta-feira', 10, 0.00, 'Telefone: (21) 96432-0902. Horários: seg-sex 05:30-07:00 & 07:15-08:30; sábado 08:30-10:00; domingo fechado.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Ecopaddle Niterói — Clube de Canoa Havaiana (Charitas)', 'Praia de Charitas, Av. Silvio Picanço, 12, Niterói', 'manhã', 'Sexta-feira', 14, 0.00, 'Contatos: WhatsApp (21) 98890-9568 ou (21) 98890-9579. Precisa fazer reserva no dia anterior até às 20h.', 'active', 0),
        (gen_random_uuid(), user_uuid, 'Canoa Havaiana', 'Aloha Nui Wa''a', 'Praia de Camboinhas, Av. Beira-Mar, 16, Niterói', 'manhã', 'Domingo', 12, 0.00, 'Oferece aulas de canoa havaiana (atividades aquáticas). Horário de funcionamento: seg-sábado 05:45-18:00; domingo fechado (não precisa agendar para participar das atividades segundo anúncio).', 'active', 0);
    
    RAISE NOTICE 'Atividades cadastradas com sucesso para o usuário praiativaops@gmail.com!';
END $$;

-- Verificar quantas atividades foram inseridas
SELECT 
    COUNT(*) as total_atividades,
    u.email
FROM public.activities a
JOIN auth.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
GROUP BY u.email;

-- Listar as atividades cadastradas
SELECT 
    a.title,
    a.location_name,
    a.city,
    a.beach,
    a.day_of_week,
    a.time,
    a.capacity,
    a.price,
    LEFT(a.description, 50) || '...' as description_preview
FROM public.activities a
JOIN auth.users u ON a.instructor_id = u.id
WHERE u.email = 'praiativaops@gmail.com'
ORDER BY a.title, a.location_name;
