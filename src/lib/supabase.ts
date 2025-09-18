import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  name: string
  role: 'aluno' | 'instrutor' | 'admin'
  phone?: string
  city?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  instructor_id: string
  title: string
  beach: string
  date: string
  time: string
  capacity: number
  price: number
  description?: string
  status: 'active' | 'inactive'
  enrollments: number
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  activity_id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}
