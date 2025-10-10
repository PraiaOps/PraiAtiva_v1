import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Importação dinâmica para evitar problemas de inicialização
let supabase: any = null;

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
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUserIdRef = useRef<string | null>(null);
  const authListenerRef = useRef<any>(null);

  const fetchUserProfile = useCallback(async (supabaseUser: any) => {
    if (currentUserIdRef.current === supabaseUser.id) return;

    try {
      const supabaseClient = await initializeSupabase();
      if (!supabaseClient) return;

      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 is fine, it means no rows found
        throw error;
      }

      if (data) {
        console.log('✅ Perfil encontrado no DB:', data.name);
        setUser(data);
        currentUserIdRef.current = data.id;
      } else {
        // Perfil não existe, vamos criar um.
        console.log('📝 Perfil não encontrado. Criando novo perfil...');
        const newUserProfile: User = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Usuário',
          role: (supabaseUser.user_metadata?.role as 'aluno' | 'instrutor' | undefined) || 'aluno', // Default to 'aluno'
          phone: supabaseUser.user_metadata?.phone || undefined,
          bio: supabaseUser.user_metadata?.bio || undefined,
          show_name: true,
          city: 'Niterói',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: insertedData, error: insertError } = await supabaseClient
          .from('users')
          .insert([newUserProfile])
          .select()
          .single();

        if (insertError) {
          console.error('❌ Erro ao criar perfil de usuário:', insertError);
          throw insertError;
        }

        console.log('✅ Perfil criado com sucesso:', insertedData);
        setUser(insertedData);
        currentUserIdRef.current = insertedData.id;
      }
    } catch (error) {
      console.error('💥 Erro no processo de fetch/criação de perfil:', error);
      setUser(null);
      currentUserIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      console.log('🚀 Inicializando sistema de autenticação...');
      setIsLoading(true);

      try {
        const supabaseClient = await initializeSupabase();
        if (!supabaseClient) {
          console.log('❌ Supabase não disponível');
          setIsLoading(false);
          return;
        }

        // Tenta pegar a sessão inicial
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (isMounted && session?.user) {
          console.log('✅ Sessão ativa inicial encontrada.');
          await fetchUserProfile(session.user); // <-- AWAIT ADICIONADO AQUI
        }

        // Configura o listener para futuras mudanças
        const { data: listener } = supabaseClient.auth.onAuthStateChange(
          async (event, session) => {
            if (!isMounted) return;

            if (event === 'SIGNED_IN' && session?.user) {
              console.log('🔄 Evento: SIGNED_IN');
              await fetchUserProfile(session.user);
            }
            if (event === 'SIGNED_OUT') {
              console.log('🔄 Evento: SIGNED_OUT');
              setUser(null);
              currentUserIdRef.current = null;
            }
          }
        );

        if (authListenerRef.current) {
          authListenerRef.current.unsubscribe();
        }
        authListenerRef.current = listener.subscription;

      } catch (error) {
        console.error('💥 Erro na inicialização da autenticação:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (authListenerRef.current) {
        console.log('🗑️ Removendo listener de autenticação');
        authListenerRef.current.unsubscribe();
      }
    };
  }, [fetchUserProfile]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const supabaseClient = await initializeSupabase();
      if (!supabaseClient) return false;

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('❌ Erro no login:', error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error('💥 Erro geral no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabaseClient = await initializeSupabase();
      if (supabaseClient) {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
          console.error('❌ Erro ao fazer logout:', error.message);
        }
      }
    } catch (error) {
      console.log('ℹ️ Erro durante logout (ignorando):', error);
    } finally {
      setUser(null);
      currentUserIdRef.current = null;
      setIsLoading(false);
    }
  }, []);

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