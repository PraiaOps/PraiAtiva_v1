import { createClient } from '@supabase/supabase-js'

// Vercel serverless function to generate a confirmation link for a user
// Expects env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VITE_APP_SITE_URL (optional)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    const APP_SITE_URL = process.env.VITE_APP_SITE_URL || null

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase env vars not configured on server' })
    }

    const { email } = req.body || {}
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })

    // Choose redirectTo: prefer APP_SITE_URL if provided
    const redirectTo = APP_SITE_URL ? `${APP_SITE_URL}/login` : undefined

    // Use admin generateLink if available (supabase-js v2+)
    if (supabaseAdmin.auth && supabaseAdmin.auth.admin && typeof supabaseAdmin.auth.admin.generateLink === 'function') {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'signup',
        email,
        options: redirectTo ? { redirectTo } : undefined
      })

      if (error) {
        console.error('Error generating link:', error)
        return res.status(500).json({ error: error.message || 'Failed to generate link' })
      }

      // data usually contains an action_link (SDK may differ by version)
      return res.status(200).json({ ok: true, data })
    }

    // Fallback: if admin.generateLink not available, return informative error
    return res.status(501).json({ error: 'Admin generateLink not available in SDK on server. Update supabase-js or implement alternative.' })
  } catch (err) {
    console.error('Unexpected error in resend-verification:', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}
