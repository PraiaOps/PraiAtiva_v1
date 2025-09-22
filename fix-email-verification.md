# 🔧 Solução para Problema de Verificação de Email

## 🔍 **Diagnóstico do Problema**

Se o usuário não está recebendo o código de verificação por email, isso pode causar:
- ❌ Usuário não é criado no Supabase Auth
- ❌ Erro de constraint ao tentar inserir na tabela `users`
- ❌ Cadastro não é completado

## 🛠️ **Soluções**

### **1. Verificar Configurações SMTP no Supabase**

1. **Acesse o Supabase Dashboard**
2. **Vá para Authentication > Settings**
3. **Verifique as configurações SMTP:**
   - ✅ **SMTP Host**: Configurado corretamente
   - ✅ **SMTP Port**: Geralmente 587 ou 465
   - ✅ **SMTP User**: Email de envio
   - ✅ **SMTP Pass**: Senha do email
   - ✅ **SMTP Sender Name**: Nome do remetente
   - ✅ **SMTP Sender Email**: Email do remetente

### **2. Verificar Domínio na Lista de Permitidos**

1. **No Supabase Dashboard**
2. **Vá para Authentication > Settings**
3. **Verifique "Site URL"**
4. **Adicione domínios permitidos se necessário**

### **3. Verificar Email de Teste**

1. **Teste com email diferente** (Gmail, Outlook, etc.)
2. **Verifique a pasta de spam**
3. **Aguarde alguns minutos** (pode haver delay)

### **4. Verificar Logs de Email**

1. **No Supabase Dashboard**
2. **Vá para Logs > Auth**
3. **Procure por erros de email**
4. **Verifique se emails estão sendo enviados**

### **5. Configuração Manual de Email**

Se o SMTP não estiver funcionando, configure manualmente:

```sql
-- No Supabase SQL Editor, execute:
UPDATE auth.config 
SET value = 'smtp.gmail.com' 
WHERE key = 'SMTP_HOST';

UPDATE auth.config 
SET value = '587' 
WHERE key = 'SMTP_PORT';

UPDATE auth.config 
SET value = 'seu-email@gmail.com' 
WHERE key = 'SMTP_USER';

UPDATE auth.config 
SET value = 'sua-senha-app' 
WHERE key = 'SMTP_PASS';

UPDATE auth.config 
SET value = 'PraiAtiva' 
WHERE key = 'SMTP_SENDER_NAME';

UPDATE auth.config 
SET value = 'seu-email@gmail.com' 
WHERE key = 'SMTP_SENDER_EMAIL';
```

### **6. Teste de Verificação Manual**

Se necessário, você pode verificar manualmente um usuário:

```sql
-- Verificar usuário específico
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users 
WHERE email = 'email-do-usuario@exemplo.com';

-- Confirmar email manualmente (se necessário)
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'email-do-usuario@exemplo.com';
```

### **7. Verificar Configurações do Frontend**

No arquivo `src/pages/Cadastro.tsx`, verifique se está usando:

```typescript
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: formData.email,
  password: formData.password,
  options: {
    emailRedirectTo: `${window.location.origin}/login`, // URL de redirecionamento
  }
});
```

### **8. Solução Temporária**

Se o problema persistir, você pode:

1. **Desabilitar verificação de email temporariamente**
2. **Permitir login sem verificação**
3. **Verificar usuários manualmente**

## 📋 **Checklist de Verificação**

- [ ] SMTP configurado corretamente
- [ ] Domínio na lista de permitidos
- [ ] Email de teste funcionando
- [ ] Pasta de spam verificada
- [ ] Logs de email sem erros
- [ ] Frontend configurado corretamente
- [ ] Teste com email diferente

## 🚨 **Se Nada Funcionar**

1. **Execute o script de diagnóstico**: `check-email-verification.sql`
2. **Verifique os logs** no Supabase Dashboard
3. **Teste com email diferente**
4. **Contate o suporte do Supabase** se necessário

## 📞 **Próximos Passos**

1. Execute o script `check-email-verification.sql`
2. Verifique as configurações SMTP
3. Teste o cadastro com email diferente
4. Se funcionar, o problema era de configuração de email
5. Se não funcionar, execute os scripts de correção de constraint
