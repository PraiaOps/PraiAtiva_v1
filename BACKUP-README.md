# 📦 Scripts de Backup do Banco de Dados PraiAtiva

Este diretório contém scripts SQL para fazer backup e restauração do banco de dados Supabase.

## 🚀 Como usar

### 1. **Backup Simples** (`backup-simple.sql`)
Execute este script no SQL Editor do Supabase para criar um backup completo:

```sql
-- Execute no Supabase SQL Editor
-- Cria tabelas de backup com data atual
```

**O que faz:**
- Cria `activities_backup_20250121` com todas as atividades
- Cria `users_backup_20250121` com todos os usuários
- Gera relatórios de verificação
- Verifica integridade dos dados

### 2. **Exportar para CSV** (`export-data-csv.sql`)
Execute para exportar dados em formato CSV:

```sql
-- Execute no Supabase SQL Editor
-- Os dados serão exportados em formato CSV
```

**O que faz:**
- Exporta atividades em CSV
- Exporta usuários em CSV
- Exporta atividades com nomes dos instrutores
- Gera relatório de exportação

### 3. **Restaurar Backup** (`restore-backup.sql`)
Execute para restaurar dados de um backup:

```sql
-- Execute no Supabase SQL Editor
-- ⚠️ ATENÇÃO: Substitui dados atuais!
```

**O que faz:**
- Lista backups disponíveis
- Verifica dados atuais
- Restaura atividades e usuários
- Verifica integridade pós-restauração

## 📊 Estrutura dos Backups

### Tabelas de Backup
- `activities_backup_YYYYMMDD` - Backup das atividades
- `users_backup_YYYYMMDD` - Backup dos usuários

### Campos Exportados
**Activities:**
- id, instructor_id, location_name, title
- city, beach, address, date, time
- capacity, price, description, status
- enrollments, created_at, updated_at

**Users:**
- id, email, name, role
- created_at, updated_at

## 🔧 Comandos Úteis

### Verificar Backups Disponíveis
```sql
SELECT table_name, pg_size_pretty(pg_total_relation_size('public.' || table_name)) as tamanho
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%_backup_%'
ORDER BY table_name DESC;
```

### Verificar Integridade
```sql
SELECT 
    'activities' as tabela,
    (SELECT COUNT(*) FROM public.activities) as original,
    (SELECT COUNT(*) FROM activities_backup_20250121) as backup
UNION ALL
SELECT 
    'users' as tabela,
    (SELECT COUNT(*) FROM public.users) as original,
    (SELECT COUNT(*) FROM users_backup_20250121) as backup;
```

### Limpar Backups Antigos
```sql
-- Substitua 'nome_do_backup_antigo' pelo nome real
DROP TABLE IF EXISTS nome_do_backup_antigo;
```

## ⚠️ Avisos Importantes

1. **Sempre faça backup antes de restaurar**
2. **Teste a restauração em ambiente de desenvolvimento primeiro**
3. **Verifique a integridade dos dados após restauração**
4. **Mantenha backups em local seguro**
5. **Documente a data dos backups**

## 📅 Cronograma de Backup Recomendado

- **Diário**: Backup automático (se configurado)
- **Semanal**: Backup manual completo
- **Antes de mudanças**: Backup antes de alterações importantes
- **Mensal**: Limpeza de backups antigos

## 🆘 Em Caso de Problemas

1. **Verifique a integridade** dos backups
2. **Compare contagens** entre original e backup
3. **Teste restauração** em ambiente de desenvolvimento
4. **Contate suporte** se necessário

## 📞 Suporte

Para dúvidas ou problemas com os scripts de backup, consulte:
- Documentação do Supabase
- Logs do SQL Editor
- Relatórios de verificação gerados pelos scripts

