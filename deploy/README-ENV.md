# Variáveis de ambiente necessárias para o frontend

Para que o frontend funcione corretamente e o botão de reenvio funcione após deploy, defina as seguintes variáveis no ambiente (ex.: Vercel or .env):

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_APP_SITE_URL (opcional mas recomendado)
- VITE_RESEND_VERIFY_URL (URL pública da função Vercel)

Exemplo (no painel do Vercel → Environment Variables):
- Key: VITE_RESEND_VERIFY_URL
- Value: https://seu-app.vercel.app/api/resend-verification
- Environment: Production (e Development, se quiser testar em dev)

