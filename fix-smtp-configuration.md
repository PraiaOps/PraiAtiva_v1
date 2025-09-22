# 🔧 CORRIGIR CONFIGURAÇÕES SMTP - SUPABASE

## 🎯 Problema Identificado
- **Usuário criado no auth**: ✅ `reclamagest@gmail.com`
- **Usuário NÃO existe na tabela users**: ❌
- **Causa**: Email de verificação não foi enviado
- **Resultado**: Usuário não conseguiu se registrar na tabela users

## 📋 Passos para Corrigir

### 1. **Verificar Configurações SMTP no Supabase Dashboard**

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Authentication** → **Settings**
4. Role para baixo até **SMTP Configuration**

### 2. **Configurações SMTP Necessárias**

```yaml
SMTP Host: smtp.gmail.com (ou seu provedor)
SMTP Port: 587
SMTP User: seu-email@gmail.com
SMTP Pass: sua-senha-de-app
SMTP Sender Name: Praia Ativa
SMTP Sender Email: seu-email@gmail.com
```

### 3. **Para Gmail (Recomendado)**

1. **Ative a verificação em 2 etapas** na sua conta Google
2. **Gere uma senha de app**:
   - Acesse: https://myaccount.google.com/security
   - Vá em "Senhas de app"
   - Gere uma senha para "Supabase"
3. **Use a senha de app** no campo SMTP Pass

### 4. **Para Outlook/Hotmail**

```yaml
SMTP Host: smtp-mail.outlook.com
SMTP Port: 587
SMTP User: seu-email@outlook.com
SMTP Pass: sua-senha
```

### 5. **Testar Configurações**

1. **Salve as configurações** no Supabase
2. **Teste com um novo cadastro**:
   - Use um email diferente
   - Verifique se o email de verificação chega
   - Verifique a pasta de spam

### 6. **Verificar Logs de Email**

1. No Supabase Dashboard
2. Vá para **Logs** → **Auth**
3. Procure por erros relacionados a email

## 🚨 Soluções Alternativas

### **Opção 1: Criar Usuário Manualmente**
```sql
-- Execute no Supabase SQL Editor
INSERT INTO public.users (
    id,
    email,
    name,
    role,
    show_name,
    created_at,
    updated_at
) VALUES (
    '57ccd740-f406-4664-a3ac-5d698473851c',
    'reclamagest@gmail.com',
    'Usuário Teste',
    'aluno',
    true,
    NOW(),
    NOW()
);
```

### **Opção 2: Verificar Email no Spam**
- Peça para o usuário verificar a pasta de spam
- Verificar se o domínio está na lista de permitidos

### **Opção 3: Testar com Email Diferente**
- Gmail, Outlook, Yahoo, etc.
- Verificar se o problema é específico do provedor

## 🔍 Diagnóstico Adicional

### **Verificar se SMTP está funcionando:**
```sql
-- Execute no Supabase SQL Editor
SELECT 
    'Verifique as configurações SMTP no Dashboard' as instrucao,
    'Authentication > Settings > SMTP Configuration' as localizacao,
    'Teste com email diferente se necessário' as dica;
```

## ✅ Próximos Passos

1. **Configure o SMTP** no Supabase Dashboard
2. **Teste com um novo cadastro**
3. **Verifique se o email chega**
4. **Se funcionar, o problema estará resolvido**

## 📞 Suporte

Se o problema persistir:
- Verifique os logs do Supabase
- Teste com diferentes provedores de email
- Considere usar um serviço de email dedicado (SendGrid, Mailgun, etc.)
