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
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Refs para evitar loops e re-renders desnecessários
  const currentUserIdRef = useRef<string | null>(null);
  const authListenerRef = useRef<any>(null);
  const processingRef = useRef<boolean>(false);
  const initializationRef = useRef<boolean>(false);
  const lastEventTimeRef = useRef<number>(0);
  const eventDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função memoizada para buscar perfil
  const fetchUserProfile = useCallback(async (supabaseUser: any) => {
    // Evitar chamadas duplicadas apenas se já estiver processando
    if (processingRef.current) {
      console.log('ℹ️ Perfil já sendo processado, aguarde...');
      return;
    }

    processingRef.current = true;
    
    try {
      console.log('🔍 Buscando perfil para usuário:', supabaseUser.id);
      const supabaseClient = await initializeSupabase();
      if (!supabaseClient) return;

      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao buscar perfil:', error);
        return;
      }

      if (data) {
        console.log('✅ Perfil encontrado:', data.name);
        setUser(data);
        currentUserIdRef.current = data.id;
      } else {
        // Usuário não existe na tabela users, criar perfil agora
        console.log('📝 Perfil não encontrado. Criando novo perfil...');
        const newUser: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Usuário',
          role: supabaseUser.user_metadata?.role || 'aluno', // Usar role do metadata ou padrão 'aluno'
          show_name: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: insertedData, error: insertError } = await supabaseClient
          .from('users')
          .insert([newUser])
          .select()
          .single();

        if (insertError) {
          // Se o erro for de chave duplicada, significa que o perfil já existe
          // Isso pode acontecer em race conditions, então vamos buscar novamente
          if (insertError.code === '23505') {
            console.log('ℹ️ Perfil já existe (criado em paralelo), buscando...');
            const { data: existingData } = await supabaseClient
              .from('users')
              .select('*')
              .eq('id', supabaseUser.id)
              .maybeSingle();
            
            if (existingData) {
              console.log('✅ Perfil encontrado após race condition:', existingData.name);
              setUser(existingData);
              currentUserIdRef.current = existingData.id;
            }
          } else {
            console.error('❌ Erro ao criar perfil de usuário:', insertError);
          }
        } else {
          console.log('✅ Perfil criado com sucesso:', insertedData);
          setUser(insertedData);
          currentUserIdRef.current = insertedData.id;
        }
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao buscar perfil:', error);
    } finally {
      processingRef.current = false;
    }
  }, []);

  // Inicialização única
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializeAuth = async () => {
      console.log('🚀 Inicializando sistema de autenticação...');
      setIsLoading(true);

      try {
        const supabaseClient = await initializeSupabase();
        if (!supabaseClient) {
          console.log('❌ Supabase não disponível');
          return;
        }

        // 1. Verificar sessão ativa
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao verificar sessão:', error);
          return;
        }

        if (session?.user) {
          console.log('✅ Sessão ativa encontrada');
          
          // Verificar se é uma confirmação de email recente (URL tem tokens)
          const urlParams = new URLSearchParams(window.location.search);
          const hasConfirmationToken = urlParams.has('token') || urlParams.has('type');
          
          if (hasConfirmationToken) {
            console.log('🔐 Confirmação de email detectada, criando perfil...');
            // Forçar criação de perfil após confirmação
            currentUserIdRef.current = null;
          }
          
          await fetchUserProfile(session.user);
        } else {
          console.log('ℹ️ Nenhuma sessão ativa');
        }

        // 2. Configurar listener (apenas uma vez)
        if (!authListenerRef.current) {
          console.log('🔧 Configurando listener de autenticação...');
          
          const { data } = supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
              const currentTime = Date.now();
              
              // Debounce para evitar eventos múltiplos muito próximos
              if (event === 'SIGNED_IN' && currentTime - lastEventTimeRef.current < 1000) {
                console.log('🔄 Evento SIGNED_IN ignorado (debounce)');
                return;
              }
              
              lastEventTimeRef.current = currentTime;
              console.log('🔄 Evento de autenticação:', event);
              
              // Limpar timeout anterior se existir
              if (eventDebounceTimeoutRef.current) {
                clearTimeout(eventDebounceTimeoutRef.current);
              }
              
              switch (event) {
                case 'SIGNED_IN':
                  if (session?.user) {
                    console.log('✅ Login detectado');
                    // Sempre buscar perfil no login, mesmo se for o mesmo usuário
                    // Isso garante que perfis sejam criados após confirmação de email
                    eventDebounceTimeoutRef.current = setTimeout(() => {
                      fetchUserProfile(session.user);
                    }, 200);
                  }
                  break;
                  
                case 'SIGNED_OUT':
                  console.log('👋 Logout detectado');
                  setUser(null);
                  currentUserIdRef.current = null;
                  break;
                  
                case 'TOKEN_REFRESHED':
                  console.log('🔄 Token renovado (ignorando)');
                  break;
                  
                case 'USER_UPDATED':
                  console.log('🔄 Usuário atualizado (possivelmente email confirmado)');
                  if (session?.user) {
                    // Forçar busca de perfil, pode ter sido criado
                    currentUserIdRef.current = null; // Reset para forçar recarga
                    fetchUserProfile(session.user);
                  }
                  break;
                  
                case 'INITIAL_SESSION':
                  console.log('ℹ️ Sessão inicial ignorada (já processada)');
                  break;
                  
                default:
                  console.log('ℹ️ Evento ignorado:', event);
              }
            }
          );

          authListenerRef.current = data.subscription;
        }

      } catch (error) {
        console.error('💥 Erro na inicialização:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Cleanup
    return () => {
      if (authListenerRef.current) {
        console.log('🗑️ Removendo listener de autenticação');
        authListenerRef.current.unsubscribe();
        authListenerRef.current = null;
      }
      
      if (eventDebounceTimeoutRef.current) {
        clearTimeout(eventDebounceTimeoutRef.current);
        eventDebounceTimeoutRef.current = null;
      }
    };
  }, []); // Sem dependências - executa apenas uma vez

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    console.log('🔑 LOGIN - Iniciando...', { email });
    setIsLoading(true);
    
    try {
      const supabaseClient = await initializeSupabase();
      
      if (!supabaseClient) {
        console.error('❌ Supabase não disponível');
        return false;
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erro no login:', error.message);
        return false;
      }

      if (data.user) {
        console.log('✅ Login realizado com sucesso');
        // Aguardar um pouco para o listener processar o SIGNED_IN
        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
      }

      return false;
    } catch (error) {
      console.error('💥 Erro geral no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    console.log('🚪 LOGOUT - Iniciando...');
    setIsLoading(true);
    
    try {
      const supabaseClient = await initializeSupabase();
      if (supabaseClient) {
        // Verificar se há sessão antes de tentar logout
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (session) {
          console.log('🗑️ Removendo sessão do Supabase...');
          const { error } = await supabaseClient.auth.signOut();
          
          if (error && !error.message.includes('Auth session missing')) {
            console.error('❌ Erro ao fazer logout:', error.message);
          } else {
            console.log('✅ Logout realizado com sucesso');
          }
        } else {
          console.log('ℹ️ Nenhuma sessão ativa para remover');
        }
      }
    } catch (error) {
      console.log('ℹ️ Erro durante logout (ignorando):', error);
    } finally {
      // Sempre limpar estado local
      console.log('🧹 Limpando estado local...');
      setUser(null);
      currentUserIdRef.current = null;
      setIsLoading(false);
      
      // Limpar localStorage
      try {
        const keysToRemove = Object.keys(localStorage).filter(key => 
          key.startsWith('supabase.auth.') || 
          key.includes('supabase-auth-token') ||
          key.includes('sb-')
        );
        keysToRemove.forEach(key => localStorage.removeItem(key));
      } catch (error) {
        console.log('ℹ️ Erro ao limpar localStorage:', error);
      }
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