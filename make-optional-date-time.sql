-- Torna opcionais (nullable) os campos de horário e dia da semana
-- Compatível com a nova regra de que esses campos não são obrigatórios

BEGIN;

-- Permitir NULL em time
ALTER TABLE activities
ALTER COLUMN time DROP NOT NULL;

-- Permitir NULL em date
ALTER TABLE activities
ALTER COLUMN date DROP NOT NULL;

COMMIT;


