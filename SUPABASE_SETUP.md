# Configuração do Supabase para PraiAtiva

## 🚀 Passo a Passo para Configuração

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name**: praias-ativas
   - **Database Password**: (crie uma senha forte)
   - **Region**: South America (São Paulo)

### 2. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

2. Obtenha as credenciais:
   - No dashboard do Supabase, vá em **Settings** > **API**
   - Copie:
     - **Project URL** → `VITE_SUPABASE_URL`
     - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar Banco de Dados

1. No Supabase, vá em **SQL Editor**
2. Execute o script do arquivo `database-schema.sql`
3. Isso criará todas as tabelas e políticas necessárias

### 4. Configurar Autenticação

1. No Supabase, vá em **Authentication** > **Settings**
2. Configure:
   - **Site URL**: `http://localhost:5173` (desenvolvimento)
   - **Redirect URLs**: `http://localhost:5173/**`
3. Desabilite "Enable email confirmations" para testes (opcional)

### 5. Testar a Aplicação

1. Execute `npm run dev`
2. Acesse `http://localhost:5173`
3. Teste o cadastro e login

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas:

- **users**: Perfis dos usuários
- **activities**: Atividades dos instrutores
- **enrollments**: Inscrições dos alunos
- **events**: Eventos da plataforma

### Políticas de Segurança (RLS):

- Usuários só podem ver/editar seus próprios dados
- Atividades ativas são visíveis para todos
- Instrutores só gerenciam suas próprias atividades
- Admins podem gerenciar eventos

## 🔧 Funcionalidades Implementadas

### ✅ Autenticação Real
- Cadastro com email/senha
- Login com Supabase Auth
- Sessões persistentes
- Logout seguro

### ✅ Gerenciamento de Atividades
- Criação de atividades
- Edição de atividades
- Exclusão de atividades
- Contadores dinâmicos

### ✅ Tipos de Usuário
- **Aluno**: Pode se inscrever em atividades
- **Instrutor**: Pode criar e gerenciar atividades
- **Admin**: Acesso total ao sistema

## 🚨 Próximos Passos

1. **Configurar email de confirmação** (opcional)
2. **Implementar sistema de inscrições**
3. **Adicionar upload de imagens**
4. **Configurar notificações por email**
5. **Implementar sistema de pagamentos**

## 📝 Notas Importantes

- O banco começa vazio (sem atividades padrão)
- Usuários precisam confirmar email (se habilitado)
- Todas as operações são seguras com RLS
- Dados são persistidos no Supabase
- Sistema funciona offline (com limitações)

## 🆘 Solução de Problemas

### Erro de CORS
- Verifique se as URLs estão corretas no Supabase
- Confirme se o projeto está rodando na porta 5173

### Erro de Autenticação
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o email de confirmação está desabilitado (para testes)

### Erro de Banco de Dados
- Execute o script SQL novamente
- Verifique se as políticas RLS estão ativas
