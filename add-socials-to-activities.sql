-- Adicionar coluna 'socials' à tabela activities para links/handles de redes sociais

BEGIN;

ALTER TABLE activities
ADD COLUMN IF NOT EXISTS socials text;

COMMIT;


