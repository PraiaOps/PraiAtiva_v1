# 📋 Instruções para Migração do Banco de Dados

## 🎯 Objetivo
Alterar o campo `date` na tabela `activities` de **data específica** para **dia da semana**.

## ⚠️ IMPORTANTE
**Execute estes passos no Supabase SQL Editor na seguinte ordem:**

### 1️⃣ Backup (Recomendado)
```sql
-- Fazer backup das atividades existentes (se houver)
CREATE TABLE activities_backup AS SELECT * FROM public.activities;
```

### 2️⃣ Executar Migração
Copie e execute o conteúdo do arquivo `database-migration-day-of-week.sql` no SQL Editor do Supabase.

**OU execute este comando simplificado:**

```sql
-- Alterar tipo da coluna date para TEXT
ALTER TABLE public.activities 
ALTER COLUMN date TYPE TEXT,
ALTER COLUMN date DROP NOT NULL;

-- Adicionar constraint para dias da semana
ALTER TABLE public.activities 
ADD CONSTRAINT check_day_of_week 
CHECK (date IN (
  'Segunda-feira', 
  'Terça-feira', 
  'Quarta-feira', 
  'Quinta-feira', 
  'Sexta-feira', 
  'Sábado', 
  'Domingo'
));

-- Tornar a coluna obrigatória novamente
ALTER TABLE public.activities 
ALTER COLUMN date SET NOT NULL;
```

### 3️⃣ Atualizar Atividades Existentes (se houver)
```sql
-- Se você tiver atividades existentes, será necessário atualizá-las manualmente
-- Exemplo:
UPDATE public.activities 
SET date = 'Segunda-feira' 
WHERE date = '2024-01-01'; -- Substitua pela data real

-- Repita para cada atividade existente
```

### 4️⃣ Verificar Resultado
```sql
-- Verificar a estrutura da tabela
\d public.activities

-- Verificar se as constraints estão aplicadas
SELECT * FROM public.activities LIMIT 5;
```

## ✅ Resultado Esperado
Após a migração:
- Campo `date` aceita apenas dias da semana em português
- Todas as validações estão funcionando
- Código do frontend continua funcionando normalmente

## 🔧 Em caso de problemas:
1. **Erro de constraint**: Verifique se não há atividades com datas inválidas
2. **Problema de rollback**: Use o backup criado no passo 1
3. **Dúvidas**: Verifique os logs do SQL Editor para detalhes do erro

---

**📝 Nota**: Após executar a migração, teste criando uma nova atividade no dashboard para confirmar que tudo está funcionando!
