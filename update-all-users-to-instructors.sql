-- Script para atualizar todos os usuários para serem instrutores
-- Execute no SQL Editor do Supabase

-- PASSO 1: Verificar usuários atuais
SELECT id, name, email, role FROM public.users;

-- PASSO 2: Atualizar todos os usuários para serem instrutores
UPDATE public.users 
SET role = 'instrutor'
WHERE role != 'instrutor';

-- PASSO 3: Verificar se a atualização foi bem-sucedida
SELECT id, name, email, role FROM public.users;

-- PASSO 4: Contagem por role (todos devem ser 'instrutor' agora)
SELECT role, COUNT(*) as quantidade 
FROM public.users 
GROUP BY role;
