# Deploy da função `resend-verification` no Vercel

Esta função serverless gera um link de confirmação (signup) usando a Supabase Service Role Key e retorna o link no JSON.

1) Variáveis de ambiente no Vercel (Project Settings → Environment Variables):

- SUPABASE_URL = https://<seu-projeto>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY = <service_role_key_do_projeto>  (mantenha secreto)
- VITE_APP_SITE_URL = https://app.seu-dominio.com  (opcional, melhora redirect nos links)

2) Após deploy, copie a URL da função (ex: https://seu-app.vercel.app/api/resend-verification) e defina no frontend (no Vercel ou em seu build env):

- VITE_RESEND_VERIFY_URL = https://seu-app.vercel.app/api/resend-verification

3) Como testar (frontend):
- No formulário onde você recebe `pendingVerification.email`, clique no botão "Reenviar email de confirmação".
- O frontend fará POST /api/resend-verification { email } e a função retornará o link gerado.

4) Notas de segurança:
- NÃO coloque `SUPABASE_SERVICE_ROLE_KEY` no frontend. Ela deve ficar apenas nas variáveis de ambiente do Vercel.
- A função retorna o link no JSON para facilitar testes; em produção você pode optar por enviar o link por e-mail usando um provedor (SendGrid/Mailgun) no servidor.

5) Problemas comuns:
- `Admin generateLink not available`: atualize `@supabase/supabase-js` para versão >= 2.XX que suporta `auth.admin.generateLink`.
- Se a função retornar erro 500 dizendo que variáveis faltam, confirme as env vars no painel do Vercel.

