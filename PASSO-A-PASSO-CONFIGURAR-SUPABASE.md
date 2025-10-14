# 📝 PASSO A PASSO: Configurar URLs no Supabase

## 🎯 Objetivo
Fazer com que o link de confirmação de email redirecione para o site correto (não localhost)

---

## 📋 PASSO 1: Acessar o Supabase Dashboard

1. Abra o navegador
2. Acesse: **https://supabase.com/dashboard**
3. Faça login com sua conta
4. Selecione o projeto **PraiAtiva** (ou o nome que você deu)

---

## 📋 PASSO 2: Ir para Configurações de Autenticação

1. No menu lateral esquerdo, clique em **⚙️ Authentication**
2. No submenu que aparecer, clique em **⚙️ URL Configuration**

(Fica em: Authentication → URL Configuration)

---

## 📋 PASSO 3: Configurar Site URL

Você verá um campo chamado **"Site URL"**

### Para Desenvolvimento (se estiver testando local):
```
http://localhost:8081
```

### Para Produção (site no ar):
```
https://seu-dominio.com
```

**🚨 IMPORTANTE**: 
- Se o site estiver no ar, use o domínio de produção
- Não use `http://localhost` se quiser que funcione em produção

---

## 📋 PASSO 4: Configurar Redirect URLs

Logo abaixo, você verá um campo chamado **"Redirect URLs"**

### Adicione TODAS estas URLs (uma por linha):

```
http://localhost:8081/**
http://localhost:5173/**
https://seu-dominio.com/**
https://www.seu-dominio.com/**
```

**Substitua** `seu-dominio.com` pelo seu domínio real!

### Exemplo com domínio real:
```
http://localhost:8081/**
http://localhost:5173/**
https://praiativa.com.br/**
https://www.praiativa.com.br/**
```

**📝 Dica**: O `/**` no final significa "e todos os caminhos abaixo"

---

## 📋 PASSO 5: Ativar Wildcard Matching

Role a página um pouco para baixo e encontre:

**"Enable wildcard redirect patterns"** ou **"Redirect pattern matching"**

✅ **MARQUE ESTA OPÇÃO** (deixe o checkbox marcado)

Isso permite que o `/**` funcione corretamente.

---

## 📋 PASSO 6: Salvar Configurações

1. Role até o final da página
2. Clique no botão **"Save"** ou **"Update"**
3. Aguarde a mensagem de confirmação (geralmente aparece no topo)

**⏱️ Aguarde**: Pode levar 1-2 minutos para as configurações propagarem

---

## 📋 PASSO 7: Testar

### Fazer um NOVO cadastro:

1. Acesse seu site
2. Faça um novo cadastro (use um email diferente)
3. Verifique o email recebido
4. **ANTES de clicar**, passe o mouse sobre o link e veja a URL
5. A URL deve ter seu domínio, não localhost
6. Clique no link
7. Você deve ser redirecionado para seu site
8. O perfil deve ser criado no banco automaticamente

---

## 🔍 Verificar se Funcionou

### Quando receber o email, o link deve ter este formato:

✅ **CORRETO**:
```
https://xxxxx.supabase.co/auth/v1/verify?token=...&redirect_to=https://seu-dominio.com/
```

❌ **ERRADO**:
```
https://xxxxx.supabase.co/auth/v1/verify?token=...&redirect_to=http://localhost:8081/
```

---

## 🚨 Problemas Comuns

### Problema 1: "URL not allowed"
**Causa**: A URL não está nas Redirect URLs permitidas
**Solução**: Verifique se adicionou a URL correta e com `/**` no final

### Problema 2: Ainda redireciona para localhost
**Causa**: Site URL ainda está configurado como localhost
**Solução**: Mude para o domínio de produção

### Problema 3: Não salva as configurações
**Causa**: Pode ter algum erro de validação
**Solução**: 
- Verifique se as URLs estão no formato correto (com http:// ou https://)
- Tente remover uma por uma e salvar
- Limpe o cache do navegador e tente novamente

### Problema 4: Email não chega
**Causa**: Configurações SMTP
**Solução**: Vá em Authentication → SMTP Settings e configure

---

## 💡 Dicas Extras

### Trabalhar com múltiplos ambientes:
Se você tem staging, development, production, adicione TODAS as URLs:

```
http://localhost:8081/**
http://localhost:5173/**
https://dev.seu-dominio.com/**
https://staging.seu-dominio.com/**
https://seu-dominio.com/**
https://www.seu-dominio.com/**
```

### Qual URL usar no Site URL?
- **Desenvolvimento**: Use localhost
- **Produção**: Use o domínio principal de produção
- A URL aqui define o **padrão** quando nenhuma outra é especificada

---

## ✅ Checklist Final

Antes de testar, confirme:

- [ ] Fiz login no Supabase Dashboard
- [ ] Selecionei o projeto correto
- [ ] Abri Authentication → URL Configuration
- [ ] Configurei o Site URL (produção ou localhost)
- [ ] Adicionei TODAS as Redirect URLs com `/**`
- [ ] Ativei wildcard matching
- [ ] Salvei as configurações
- [ ] Aguardei 1-2 minutos
- [ ] Vou fazer um NOVO cadastro para testar

---

## 📞 Se Precisar de Ajuda

**Onde está o problema?**
1. ❓ Não encontro a página de configuração → Veja PASSO 2
2. ❓ Não sei qual URL usar → Veja PASSO 3 e 4
3. ❓ Salvei mas não funciona → Aguarde 2 minutos e teste com novo cadastro
4. ❓ Email não chega → Problema diferente (SMTP), veja `fix-smtp-configuration.md`

---

**IMPORTANTE**: Cadastros feitos ANTES de configurar vão continuar com o link antigo. Você precisa fazer um NOVO cadastro para testar!

---

## 🎯 Resumo Ultra Rápido

1. Dashboard → Authentication → URL Configuration
2. Site URL = seu domínio de produção
3. Redirect URLs = todas as URLs (com `/**`)
4. Ativar wildcard matching
5. Salvar
6. Aguardar 2 minutos
7. Fazer NOVO cadastro para testar

**Pronto!** 🎉

