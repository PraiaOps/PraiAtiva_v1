import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Cadastro = () => {
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
  const navigate = useNavigate();
  const { toast } = useToast();

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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
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
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email e clique no link de confirmação para ativar sua conta.",
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
                Crie sua conta para acessar todas as funcionalidades da plataforma.
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Benefits */}
              <div className="mb-8 p-6 bg-muted rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Criação de atividades</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Gerenciamento de alunos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">Configuração de horários</span>
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
                      <SelectItem value="instrutor">Instrutor - Quero oferecer atividades</SelectItem>
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
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Apresentação profissional</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Conte sobre sua experiência como instrutor..."
                    rows={4}
                  />
                </div>
                
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
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Faça login aqui
                  </Link>
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