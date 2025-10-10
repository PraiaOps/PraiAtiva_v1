import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Check, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import ScrollToTopLink from "@/components/ScrollToTopLink";
import SmoothScrollLink from "@/components/SmoothScrollLink";

const Cadastro = () => {
  // Garantir que a página inicie no topo, sem animação
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    bio: "",
    role: "instrutor" as "aluno" | "instrutor",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<{userId: string, email: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hook para verificar email
  const { isVerified, isChecking } = useEmailVerification({
    userId: pendingVerification?.userId,
    email: pendingVerification?.email,
    onVerified: () => {
      toast({
        title: "Email confirmado!",
        description: "Sua conta foi ativada com sucesso. Redirecionando para login...",
        variant: "default",
      });
      setTimeout(() => navigate('/login'), 2000);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('📝 Iniciando cadastro...', { email: formData.email, role: formData.role });
      
      // Validar senhas
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive",
        });
        return;
      }

      console.log('🚀 Criando usuário no Supabase Auth...');
      // Criar usuário no Supabase Auth
      // Prefer explicit redirect URL for email confirmation. Use env var if provided, otherwise current origin.
      const emailRedirectTo = import.meta.env.VITE_APP_SITE_URL || window.location.origin;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo,
          data: {
            full_name: formData.name,
            role: formData.role,
            phone: formData.phone || null,
            bio: formData.bio || null,
          }
        }
      });

      console.log('📊 Resultado Auth:', { authData: !!authData, error: authError?.message });

      if (authError) {
        console.error('❌ Erro Auth:', authError);
        toast({
          title: "Erro no cadastro",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (authData.user && authData.user.id) {
        console.log('✅ Usuário criado no Auth, fazendo login...');
        console.log('🆔 ID do usuário:', authData.user.id);
        
        // Verificar se o ID é um UUID válido
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(authData.user.id)) {
          console.error('❌ ID do usuário inválido:', authData.user.id);
          toast({
            title: "Erro no cadastro",
            description: "ID do usuário inválido. Tente novamente.",
            variant: "destructive",
          });
          return;
        }
        
        // Aguardar confirmação de email
        console.log('📧 Aguardando confirmação de email...');
        
        // Configurar verificação automática
        setPendingVerification({
          userId: authData.user.id,
          email: authData.user.email!
        });
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email e clique no link de confirmação. Detectaremos automaticamente quando você confirmar.",
          variant: "default",
        });
        
        // Não tentar fazer login automaticamente
        // O usuário precisa confirmar o email primeiro
        return;
        
        // Criar perfil do usuário na tabela users
        const profileData = {
          id: authData.user.id,
          email: formData.email,
          name: formData.name,
          role: formData.role,
          phone: formData.phone || null,
          bio: formData.bio || null,
          city: 'Niterói',
          show_name: true, // Campo obrigatório
          created_at: new Date().toISOString(), // Campo obrigatório
          updated_at: new Date().toISOString(), // Campo obrigatório
        };
        
        console.log('📋 Dados do perfil a inserir:', profileData);
        
        const { data: insertedProfile, error: profileError } = await supabase
          .from('users')
          .insert([profileData])
          .select();

        console.log('📊 Resultado perfil:', { 
          insertedProfile, 
          error: profileError?.message,
          details: profileError?.details,
          hint: profileError?.hint 
        });

        if (profileError) {
          console.error('❌ Erro ao criar perfil:', profileError);
          
          // Tratar erro específico de constraint de chave estrangeira
          if (profileError.code === '23503') {
            toast({
              title: "Erro de Constraint",
              description: "Erro de chave estrangeira. Execute o script SQL de correção e tente novamente.",
              variant: "destructive",
            });
          } else if (profileError.message.includes('row-level security')) {
            toast({
              title: "Erro de Permissão",
              description: "Erro de política RLS. Execute o script SQL de correção e tente novamente.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Aviso",
              description: "Usuário criado, mas houve erro no perfil. Tente fazer login.",
              variant: "destructive",
            });
          }
        } else {
          console.log('✅ Perfil criado com sucesso!');
          toast({
            title: "Cadastro realizado!",
            description: "Conta criada com sucesso! Você pode fazer login agora.",
          });
        }

        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          bio: "",
          role: "instrutor",
        });

        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.log('❌ Nenhum usuário retornado do Auth');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Cadastro</CardTitle>
              <p className="text-muted-foreground">
                Crie sua conta para acessar funcionalidades exclusivas.
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Status de Verificação de Email */}
              {pendingVerification && (
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    {isVerified ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
                    )}
                    <div>
                      <h3 className="font-semibold text-blue-900">
                        {isVerified ? 'Email Confirmado!' : 'Aguardando Confirmação de Email'}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {isVerified 
                          ? 'Sua conta foi ativada com sucesso!'
                          : isChecking 
                            ? 'Verificando automaticamente... Confirme seu email em qualquer dispositivo.'
                            : 'Verifique seu email e clique no link de confirmação.'
                        }
                      </p>
                    </div>
                  </div>
                  {!isVerified && (
                    <div className="text-xs text-blue-600">
                      💡 Dica: Você pode confirmar o email no celular e detectaremos automaticamente aqui!
                    </div>
                  )}
                  {!isVerified && (
                    <div className="mt-3 flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          // Reenvio de verificação
                          try {
                            const endpoint = import.meta.env.VITE_RESEND_VERIFY_URL;
                            if (endpoint) {
                              const res = await fetch(endpoint, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: pendingVerification.email })
                              });
                              if (res.ok) {
                                toast({ title: 'Email reenviado', description: 'Verifique sua caixa de entrada.' });
                              } else {
                                const text = await res.text();
                                toast({ title: 'Erro ao reenviar', description: text || 'Verifique o dashboard.' , variant: 'destructive'});
                              }
                            } else {
                              // Fallback: instruções
                              toast({
                                title: 'Reenvio não disponível',
                                description: 'Nenhum endpoint configurado. Verifique SMTP/Site URL no Supabase ou peça que um admin confirme manualmente.',
                                variant: 'destructive'
                              });
                            }
                          } catch (err) {
                            console.error('Erro ao reenviar verificação', err);
                            toast({ title: 'Erro', description: 'Falha ao tentar reenviar. Veja o console.' , variant: 'destructive'});
                          }
                        }}
                      >
                        Reenviar email de confirmação
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              <div className="mb-8 p-6 bg-muted rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Atividades</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Alunos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Horários</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de usuário *</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: "aluno" | "instrutor") => 
                      setFormData(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instrutor">Ofereço atividades na praia</SelectItem>
                      <SelectItem value="aluno">Busco atividades na praia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(21) 99999-9999"
                  />
                </div>
                
                {formData.role === 'instrutor' && (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Apresentação profissional</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Resuma suas qualificações profissionais"
                      rows={4}
                    />
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já possui uma conta?{" "}
                  <SmoothScrollLink 
                    to="/login" 
                    className="text-primary hover:underline font-medium"
                  >
                    Faça login aqui
                  </SmoothScrollLink>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Cadastro;