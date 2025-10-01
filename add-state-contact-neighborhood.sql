-- Adicionar campos state, contact e neighborhood à tabela activities
-- state: texto curto, padrão 'RJ'
-- contact: texto opcional para telefone/whatsapp/url
-- neighborhood: bairro (texto curto)

BEGIN;

-- Adiciona coluna state com default 'RJ'
ALTER TABLE activities
ADD COLUMN IF NOT EXISTS state text NOT NULL DEFAULT 'RJ';

-- Adiciona coluna contact opcional
ALTER TABLE activities
ADD COLUMN IF NOT EXISTS contact text;

-- Adiciona coluna neighborhood (bairro) opcional
ALTER TABLE activities
ADD COLUMN IF NOT EXISTS neighborhood text;

-- Garantir que registros existentes recebam 'RJ'
UPDATE activities SET state = 'RJ' WHERE state IS NULL OR state = '';

COMMIT;


