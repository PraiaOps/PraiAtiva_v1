# ⚙️ Configurar URL de Redirecionamento de Email - Supabase

## 🎯 Problema
Quando o usuário clica no link de confirmação de email, ele é redirecionado para localhost ao invés do domínio correto.

## 🔧 Solução

### 1. Configurar no Supabase Dashboard

1. **Acesse o Supabase Dashboard**: https://supabase.com/dashboard
2. **Selecione seu projeto**
3. **Vá para Authentication > URL Configuration**
4. **Configure as seguintes URLs:**

#### Em Desenvolvimento:
```
Site URL: http://localhost:8081
Redirect URLs: 
  - http://localhost:8081/**
  - http://localhost:5173/**
```

#### Em Produção:
```
Site URL: https://seu-dominio.com
Redirect URLs: 
  - https://seu-dominio.com/**
  - https://www.seu-dominio.com/**
```

### 2. Verificar no Código

No arquivo `src/pages/Cadastro.tsx`, já adicionamos:

```typescript
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: formData.email,
  password: formData.password,
  options: {
    data: {
      full_name: formData.name,
      role: formData.role,
    },
    emailRedirectTo: `${window.location.origin}/` // ✅ Redireciona para a URL correta
  }
});
```

### 3. Testar

1. **Faça um novo cadastro**
2. **Verifique o email recebido**
3. **Clique no link de confirmação**
4. **Você deve ser redirecionado para a home do site** (não localhost)
5. **O perfil será criado automaticamente no banco de dados**

## 📋 Checklist

- [ ] Site URL configurado no Supabase Dashboard
- [ ] Redirect URLs adicionados no Supabase Dashboard
- [ ] Código atualizado com `emailRedirectTo`
- [ ] Teste de cadastro funcionando
- [ ] Email de confirmação chegando
- [ ] Redirecionamento funcionando corretamente
- [ ] Perfil sendo criado no banco após confirmação

## 🚨 Importante

### Para Produção:
Quando for fazer deploy em produção, lembre-se de:

1. **Atualizar Site URL** para o domínio de produção
2. **Adicionar domínio de produção** nas Redirect URLs
3. **Testar** o fluxo completo em produção

### Múltiplos Ambientes:
Se você tiver staging/development, adicione todos os domínios nas Redirect URLs:
```
http://localhost:8081/**
http://localhost:5173/**
https://staging.seu-dominio.com/**
https://seu-dominio.com/**
```

## 💡 Dica

O `emailRedirectTo` usa `window.location.origin`, então automaticamente:
- Em desenvolvimento: `http://localhost:8081`
- Em produção: `https://seu-dominio.com`

Isso significa que o mesmo código funciona em todos os ambientes! ✨

