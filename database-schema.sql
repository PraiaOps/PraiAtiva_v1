-- Schema do banco de dados para PraiAtiva
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (estende auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'aluno' CHECK (role IN ('aluno', 'instrutor', 'admin')),
  phone TEXT,
  city TEXT DEFAULT 'Niterói',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de atividades
CREATE TABLE public.activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  instructor_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  beach TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL CHECK (time IN ('manhã', 'tarde', 'noite')),
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  enrollments INTEGER DEFAULT 0 CHECK (enrollments >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de inscrições
CREATE TABLE public.enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

-- Tabela de eventos
CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar contador de inscrições
CREATE OR REPLACE FUNCTION update_activity_enrollments()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE public.activities 
    SET enrollments = enrollments + 1 
    WHERE id = NEW.activity_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
      UPDATE public.activities 
      SET enrollments = enrollments + 1 
      WHERE id = NEW.activity_id;
    ELSIF OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
      UPDATE public.activities 
      SET enrollments = enrollments - 1 
      WHERE id = NEW.activity_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'confirmed' THEN
    UPDATE public.activities 
    SET enrollments = enrollments - 1 
    WHERE id = OLD.activity_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger para contador de inscrições
CREATE TRIGGER update_enrollments_count
  AFTER INSERT OR UPDATE OR DELETE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION update_activity_enrollments();

-- RLS (Row Level Security) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para activities
CREATE POLICY "Anyone can view active activities" ON public.activities
  FOR SELECT USING (status = 'active');

CREATE POLICY "Instructors can view own activities" ON public.activities
  FOR SELECT USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can insert activities" ON public.activities
  FOR INSERT WITH CHECK (
    auth.uid() = instructor_id AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('instrutor', 'admin'))
  );

CREATE POLICY "Instructors can update own activities" ON public.activities
  FOR UPDATE USING (
    auth.uid() = instructor_id AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('instrutor', 'admin'))
  );

CREATE POLICY "Instructors can delete own activities" ON public.activities
  FOR DELETE USING (
    auth.uid() = instructor_id AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('instrutor', 'admin'))
  );

-- Políticas para enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view enrollments for their activities" ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.activities 
      WHERE id = activity_id AND instructor_id = auth.uid()
    )
  );

-- Políticas para events
CREATE POLICY "Anyone can view events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Inserir dados de exemplo
INSERT INTO public.events (title, description, date, time, location, category) VALUES
('4ª ETAPA DO CIRCUITO NITEROIENSE DE BEACH TENNIS', 'Participe da 4ª etapa do Circuito Niteroiense de Beach Tennis. Competição aberta para todas as categorias.', '2025-10-11', '7:00 às 16:00', 'Praia de Icaraí - Avenida Jornalista Alberto Francisco Torres', 'Esporte'),
('3ª ETAPA DO SUPER PADDLE (CANOA HAVAIANA)', 'Terceira etapa do Super Paddle de Canoa Havaiana. Venha competir nas águas de Itaipu.', '2025-10-18', '6:00 às 17:00', 'Praia de Itaipu', 'Esporte'),
('BRASIL TOUR DE SURF', 'Campeonato nacional de surf com atletas de todo o Brasil competindo nas ondas de Itacoatiara.', '2025-10-18', '8:00 às 17:00', 'Praia de Itacoatiara', 'Esporte');
