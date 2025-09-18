-- TEMPORÁRIO: Desabilitar RLS para debug
-- Execute no SQL Editor do Supabase para permitir inserções

-- Desabilitar RLS temporariamente
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Para reabilitar depois (não execute agora):
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
