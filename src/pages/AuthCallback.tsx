import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Processando callback de autenticação...');
        
        // Verificar se há uma sessão ativa
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao verificar sessão:', error);
          navigate('/login');
          return;
        }

        if (session?.user) {
          console.log('✅ Sessão encontrada após confirmação de email');
          
          // Aguardar um pouco para o AuthContext processar
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Verificar a role do usuário para redirecionar corretamente
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (userData) {
            console.log('✅ Perfil encontrado, redirecionando...');
            if (userData.role === 'instrutor' || userData.role === 'admin') {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          } else {
            console.log('⏳ Perfil ainda não criado, aguardando...');
            // Aguardar mais um pouco e tentar novamente
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const { data: retryData } = await supabase
              .from('users')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (retryData) {
              if (retryData.role === 'instrutor' || retryData.role === 'admin') {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
            } else {
              // Se ainda não tem perfil, redirecionar para home
              navigate('/');
            }
          }
        } else {
          console.log('❌ Nenhuma sessão encontrada');
          navigate('/login');
        }
      } catch (error) {
        console.error('💥 Erro no callback:', error);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Confirmando seu email...</h2>
        <p className="text-muted-foreground">
          Aguarde enquanto finalizamos seu cadastro.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;

