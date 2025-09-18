import React, { createContext, useContext, useState, useEffect } from 'react';

// Importação dinâmica para evitar problemas de inicialização
let supabase: any = null;
let User: any = null;
let SupabaseUser: any = null;

const initializeSupabase = async () => {
  if (!supabase) {
    try {
      const supabaseModule = await import('@/lib/supabase');
      supabase = supabaseModule.supabase;
    } catch (error) {
      console.error('Erro ao inicializar Supabase:', error);
    }
  }
  return supabase;
};

interface User {
  id: string;
  email: string;
  name: string;
  role: 'aluno' | 'instrutor' | 'admin';
  phone?: string;
  city?: string;
  bio?: string;
  show_name: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar sessão ativa ao inicializar
  useEffect(() => {
    const checkActiveSession = async () => {
      console.log('🔍 Verificando sessão ativa...');
      setIsLoading(true);
      
      try {
        const supabaseClient = await initializeSupabase();
        if (!supabaseClient) {
          console.log('❌ Supabase não disponível');
          setIsLoading(false);
          return;
        }

        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao verificar sessão:', error);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          console.log('✅ Sessão ativa encontrada, carregando perfil...');
          await fetchUserProfile(session.user);
        } else {
          console.log('ℹ️ Nenhuma sessão ativa');
        }
      } catch (error) {
        console.error('💥 Erro ao verificar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkActiveSession();
  }, []);

  const fetchUserProfile = async (supabaseUser: any) => {
    try {
      console.log('🔍 Buscando perfil para usuário:', supabaseUser.id);
      const supabaseClient = await initializeSupabase();
      if (!supabaseClient) return;

      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle(); // Mudança: usar maybeSingle() ao invés de single()

      console.log('📊 Resultado da busca:', { data: !!data, error: error?.code });

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao buscar perfil:', error);
        return;
      }

      if (data) {
        console.log('✅ Perfil encontrado:', data.name);
        setUser(data);
      } else {
        // Usuário não existe na tabela, criar perfil
        console.log('📝 Criando novo perfil...');
        const newUser: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Usuário',
          role: 'instrutor', // Mudança: todos novos usuários são instrutores
          show_name: true, // Valor padrão: mostrar nome
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('📤 Dados do novo perfil:', newUser);

        const { data: insertedData, error: insertError } = await supabaseClient
          .from('users')
          .insert([newUser])
          .select()
          .single();

        if (insertError) {
          console.error('❌ Erro ao criar perfil:', insertError);
          console.error('🔍 Code:', insertError.code);
          console.error('🔍 Message:', insertError.message);
          console.error('🔍 Details:', insertError.details);
          console.error('🔍 Hint:', insertError.hint);
        } else {
          console.log('✅ Perfil criado com sucesso:', insertedData);
          setUser(insertedData);
        }
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao buscar perfil:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔑 LOGIN REAL - Iniciando...', { email });
    setIsLoading(true);
    
    try {
      const supabaseClient = await initializeSupabase();
      console.log('📦 Supabase client:', !!supabaseClient);
      
      if (!supabaseClient) {
        console.error('❌ Supabase não disponível');
        setIsLoading(false);
        return false;
      }

      console.log('🚀 Tentando fazer login real...');
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📊 Resultado do login:', { data: !!data, error: error?.message });

      if (error) {
        console.error('❌ Erro no login:', error.message);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        console.log('✅ Usuário logado, buscando perfil...');
        await fetchUserProfile(data.user);
        setIsLoading(false);
        return true;
      }

      console.log('❌ Nenhum usuário retornado');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('💥 Erro geral no login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    console.log('🚪 LOGOUT SIMPLIFICADO');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    setUser,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
