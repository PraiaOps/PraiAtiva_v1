-- Tornar opcionais (nullable) os campos numericos capacity e price em activities
-- capacity possui uma constraint (capacity > 0). Em CHECK, NULL passa como "unknown",
-- então não é necessário alterar a constraint – apenas remover o NOT NULL.

BEGIN;

-- Permitir NULL em capacity
ALTER TABLE activities
ALTER COLUMN capacity DROP NOT NULL;

-- Permitir NULL em price
ALTER TABLE activities
ALTER COLUMN price DROP NOT NULL;

COMMIT;


