import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UseEmailVerificationProps {
  userId?: string;
  email?: string;
  onVerified?: () => void;
}

export const useEmailVerification = ({ userId, email, onVerified }: UseEmailVerificationProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!userId || !email) return;

  let interval: any;
    let attempts = 0;
    const maxAttempts = 30; // 5 minutos (30 x 10 segundos)

    const checkEmailVerification = async () => {
      if (attempts >= maxAttempts) {
        console.log('⏰ Tempo limite para verificação de email atingido');
        setIsChecking(false);
        return;
      }

      try {
        setIsChecking(true);
        console.log(`🔍 Verificando confirmação de email... (tentativa ${attempts + 1}/${maxAttempts})`);
        
        // Verificar no auth.users se o email foi confirmado
        const { data: authUser, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('❌ Erro ao verificar usuário:', error);
          return;
        }

        if (authUser?.user?.email_confirmed_at) {
          console.log('✅ Email confirmado! Criando perfil...');
          setIsVerified(true);
          
          // Criar perfil na tabela users quando email for confirmado
          await createUserProfile(authUser.user);
          
          if (onVerified) {
            onVerified();
          }
          
          clearInterval(interval);
          return;
        }

        attempts++;
      } catch (error) {
        console.error('💥 Erro ao verificar email:', error);
      } finally {
        setIsChecking(false);
      }
    };

  const createUserProfile = async (authUser: Record<string, any>) => {
      try {
  console.log('👤 Criando perfil do usuário...', { id: authUser.id, email: authUser.email });
        
        // Verificar se o perfil já existe
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', authUser.id)
          .maybeSingle();

        if (existingUser) {
          console.log('ℹ️ Perfil já existe');
          return;
        }

        // Criar perfil usando metadados enviados no signUp (role/phone/bio)
  // Log completo dos metadados para auditoria (não escreva isso em produção sem filtrar dados sensíveis)
  console.log('🔎 user_metadata recebidos:', authUser.user_metadata);
  const rawRole = authUser.user_metadata?.role;
        const allowedRoles = ['aluno', 'instrutor', 'admin'];
        const sanitizedRole = allowedRoles.includes(rawRole) ? rawRole : 'aluno';
        if (rawRole && rawRole !== sanitizedRole) {
          console.warn('AVISO: role inválido nos user_metadata durante verificação de email:', rawRole, 'forçando para', sanitizedRole);
        }

        const profileData = {
          id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Usuário',
          role: sanitizedRole as 'aluno' | 'instrutor' | 'admin',
          phone: authUser.user_metadata?.phone || null,
          bio: authUser.user_metadata?.bio || null,
          show_name: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: inserted, error: profileError } = await supabase
          .from('users')
          .insert([profileData])
          .select()
          .single();

        if (profileError) {
          console.error('❌ Erro ao criar perfil:', profileError);
        } else {
          console.log('✅ Perfil criado com sucesso:', inserted);
        }
      } catch (error) {
        console.error('💥 Erro ao criar perfil:', error);
      }
    };

    // Iniciar verificação periódica
    interval = setInterval(checkEmailVerification, 10000); // Verificar a cada 10 segundos
    
    // Verificação inicial
    checkEmailVerification();

    return () => {
      clearInterval(interval);
    };
  }, [userId, email, onVerified]);

  return {
    isVerified,
    isChecking,
  };
};
