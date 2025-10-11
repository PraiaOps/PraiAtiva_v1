/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Importação dinâmica para evitar problemas de inicialização
import type { SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

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
  const authListenerRef = useRef<{ unsubscribe: () => void } | null>(null);
  const processingRef = useRef<boolean>(false);
  const initializationRef = useRef<boolean>(false);
  const lastEventTimeRef = useRef<number>(0);
  const eventDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função memoizada para buscar perfil
  interface AuthUserMinimal {
    id: string;
    email?: string | null;
  user_metadata?: Record<string, unknown>;
  }

  const fetchUserProfile = useCallback(async (supabaseUser: AuthUserMinimal) => {
    // Evitar chamadas duplicadas
    if (processingRef.current || currentUserIdRef.current === supabaseUser.id) {
      console.log('ℹ️ Perfil já sendo processado ou usuário já carregado');
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
          // Perfil não encontrado. Tentar criar uma vez aqui a partir dos user_metadata
          // para casos em que o hook de verificação não esteja ativo ou houve perda de evento.
          console.log('⚠️ Perfil não encontrado para', supabaseUser.id, '- tentando criar a partir de user_metadata');
          try {
            const rawRoleValue = supabaseUser.user_metadata?.role;
            const rawRole = typeof rawRoleValue === 'string' ? rawRoleValue : undefined;
            const allowedRoles = ['aluno', 'instrutor', 'admin'];
            const sanitizedRole = rawRole && allowedRoles.includes(rawRole) ? rawRole : 'aluno';

            const profileData = {
              id: supabaseUser.id,
              email: supabaseUser.email,
              name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Usuário',
              role: sanitizedRole as 'aluno' | 'instrutor' | 'admin',
              phone: supabaseUser.user_metadata?.phone || null,
              bio: supabaseUser.user_metadata?.bio || null,
              show_name: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            // Tentar inserir somente se não existir (checagem adicional)
            const { data: check, error: checkErr } = await supabaseClient
              .from('users')
              .select('id')
              .eq('id', supabaseUser.id)
              .maybeSingle();

            if (!check) {
              const { data: inserted, error: insertErr } = await supabaseClient
                .from('users')
                .insert([profileData])
                .select()
                .single();

              if (insertErr) {
                console.warn('⚠️ Falha ao inserir perfil automaticamente:', insertErr);
              } else if (inserted) {
                console.log('✅ Perfil criado automaticamente:', inserted.id);
                setUser(inserted);
                currentUserIdRef.current = inserted.id;
              }
            } else {
              // Caso tenha sido criado por outro processo entre as chamadas
              console.log('ℹ️ Perfil apareceu durante checagem, atualizando estado');
              const existingUser = check as User;
              setUser(existingUser);
              currentUserIdRef.current = existingUser.id;
            }
          } catch (err) {
            console.error('💥 Erro ao tentar criar perfil automaticamente:', err);
            // Garantir que o estado local não fique com dados inconsistentes
            setUser(null);
            currentUserIdRef.current = null;
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
                  if (session?.user && currentUserIdRef.current !== session.user.id) {
                    console.log('✅ Novo login detectado');
                    // Debounce para evitar múltiplas chamadas
                    eventDebounceTimeoutRef.current = setTimeout(() => {
                      fetchUserProfile(session.user);
                    }, 200);
                  } else if (session?.user && currentUserIdRef.current === session.user.id) {
                    console.log('ℹ️ Mesmo usuário já processado');
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
  }, [fetchUserProfile]); // fetchUserProfile é memoizado via useCallback

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