-- Script para migrar dados do campo beach e adicionar city/address
-- Execute no SQL Editor do Supabase

-- PASSO 1: Adicionar campos city e address
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;

-- PASSO 2: Migrar dados existentes - extrair endereços do campo beach
UPDATE public.activities 
SET address = beach;

-- PASSO 3: Definir cidade baseada nos dados atuais
UPDATE public.activities 
SET city = 'Niterói';

-- PASSO 4: Atualizar valores específicos da coluna beach por ID
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '1bfb1d5d-b0c0-4877-96ce-9a17e59e9b5e';
UPDATE public.activities SET beach = 'Charitas' WHERE id = '1cb3dd5e-b852-4e75-a886-f00a9b0a5fe1';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = '249e1252-b5e4-4312-815d-7b65ceb8d04c';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '33005acd-3803-42c6-a941-c2e9455583e4';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '4535c593-b29b-4c05-b1a3-99d5c25ea094';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '5c08b5e9-0c12-4573-8ba1-e0cb2635a25f';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '605f1751-0953-41ae-b5d1-0532f55442e8';
UPDATE public.activities SET beach = 'Charitas' WHERE id = '61a6486b-bc95-408c-83fa-0458f64d7943';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = '6e1d7cbe-4838-4f6b-a8a7-15edd914e8bc';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '7207ab6b-f231-4b47-ab62-9d7ab53fab17';
UPDATE public.activities SET beach = 'Ponta D''Areia' WHERE id = '8405639e-21e9-4f05-a296-a1cde5c80d17';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = '891e5369-0b7b-4f35-be41-fa4c45a3a12f';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = '89869e78-e729-4c5b-b5c7-31c37a863a49';
UPDATE public.activities SET beach = 'Charitas' WHERE id = 'a4807014-3352-42ec-81b3-e01291dd7fde';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = 'aaa8adf2-e259-40cd-97ba-dc8a3b395730';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = 'aab61e23-071b-46c7-9031-18491c8ba7f9';
UPDATE public.activities SET beach = 'Camboinhas' WHERE id = 'b6cddb62-0459-4f40-b483-e71d60fc216e';
UPDATE public.activities SET beach = 'Icaraí' WHERE id = 'd589e13b-b830-44d8-8168-2a688deefc26';
UPDATE public.activities SET beach = 'Gragoatá' WHERE id = 'e0db2f81-6c32-48e8-a811-dd631c06128e';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = 'e498de29-6e8a-480e-a13b-cb51ff687e7d';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = 'ea543484-25eb-48e1-a106-b201ad9dad5c';
UPDATE public.activities SET beach = 'São Francisco' WHERE id = 'fc4d8e55-1cac-44e6-8c6b-ec2b1eb1586c';

-- PASSO 5: Adicionar constraint para garantir apenas praias válidas
ALTER TABLE public.activities 
ADD CONSTRAINT check_beach_valid_names 
CHECK (beach IN (
  'Icaraí', 'Charitas', 'São Francisco', 'Ponta D''Areia', 'Camboinhas', 'Gragoatá'
));

-- PASSO 5.1: Adicionar constraint para garantir apenas tipos de atividades válidos
ALTER TABLE public.activities 
ADD CONSTRAINT check_title_valid_types 
CHECK (title IN (
  'Beach Tennis', 'Canoa Havaiana', 'Futevôlei', 'Vôlei de Praia'
));

-- PASSO 6: Verificar tipos de atividades existentes
SELECT DISTINCT title, COUNT(*) as total
FROM public.activities 
GROUP BY title
ORDER BY title;

-- PASSO 7: Verificar resultado final
SELECT id, city, beach, address, location_name, title
FROM public.activities 
ORDER BY beach, title;
